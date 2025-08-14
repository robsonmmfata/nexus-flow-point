import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import PaymentDialog from "./PDV/PaymentDialog";
import ProductGrid from "@/components/PDV/ProductGrid";
import CartSidebar from "@/components/PDV/CartSidebar";
import SearchBar from "@/components/PDV/SearchBar";
import QuickActions from "@/components/PDV/QuickActions";
import PDVWrapper from "@/components/PDV/PDVWrapper";
import { useStoreConfig } from "@/store/modules";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useProducts } from "@/store/products";
import { Sector } from "@/types/product";
import { ensurePrinterConnected, printSaleReceipt, printSectorTickets } from "@/features/printing/print";
import { loadSettings } from "@/store/settings";
import imgCamiseta from "@/assets/products/camiseta.jpg";
import imgCafe from "@/assets/products/cafe-espresso.jpg";
import imgPao from "@/assets/products/pao-de-queijo.jpg";
import imgBanana from "@/assets/products/banana.jpg";
import imgPizzaFatia from "@/assets/products/pizza-fatia.jpg";
import imgCerveja from "@/assets/products/cerveja-600.jpg";

interface Product {
  id: string;
  name: string;
  price: number; // unit price or price per kg for weighted items
  sku?: string;
  barcode?: string;
  type?: "unit" | "weight" | "service";
  unit?: string; // ex: un, kg, g, lt
  image?: string;
  category?: string;
}

interface CartItem extends Product {
  qty: number; // units or kg
  note?: string;
  discType?: "amount" | "percent";
  discValue?: number; // amount in BRL or percent
}

const sampleProducts: Product[] = [
  { id: "1", name: "Camiseta Básica", price: 49.9, sku: "CAM-001", type: "unit", unit: "un", category: "Vestuário", image: imgCamiseta },
  { id: "2", name: "Café Espresso", price: 6.0, sku: "CAF-ESP", type: "unit", unit: "un", category: "Bebidas", image: imgCafe },
  { id: "3", name: "Pão de Queijo (100g)", price: 3.5, sku: "PDQ-100", type: "unit", unit: "un", category: "Padaria", image: imgPao },
  { id: "4", name: "Shampoo 300ml", price: 29.9, sku: "SHA-300", type: "unit", unit: "un", category: "Higiene" },
  { id: "5", name: "Parafusos (10 un)", price: 12.5, sku: "PAR-010", type: "unit", unit: "un", category: "Ferragens" },
  { id: "6", name: "Pizza Mussarela (fatia)", price: 9.9, sku: "PIZ-MUS", type: "unit", unit: "un", category: "Pizzaria", image: imgPizzaFatia },
  { id: "7", name: "Ração Premium 1kg", price: 24.9, sku: "RAC-1KG", type: "unit", unit: "kg", category: "Pets" },
  { id: "8", name: "Cerveja Artesanal 600ml", price: 19.9, sku: "CER-600", type: "unit", unit: "un", category: "Bebidas", image: imgCerveja },
  // Pesáveis (por kg)
  { id: "9", name: "Banana Prata (kg)", price: 7.99, sku: "BAL-001", type: "weight", unit: "kg", category: "Hortifruti", image: imgBanana },
  { id: "10", name: "Queijo Mussarela (kg)", price: 39.9, sku: "BAL-QUEIJO", type: "weight", unit: "kg", category: "Frios" },
  { id: "11", name: "Carne Bovina Patinho (kg)", price: 48.9, sku: "BAL-CARNE", type: "weight", unit: "kg", category: "Açougue" },
];

function currency(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function PDV() {
  const { config, isModuleEnabled } = useStoreConfig();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [payOpen, setPayOpen] = useState(false);

  // Pedido - desconto total
  const [orderDiscType, setOrderDiscType] = useState<"amount" | "percent">("amount");
  const [orderDiscValue, setOrderDiscValue] = useState<number>(0);

  // Edição de item (adicionar pesável ou editar existente)
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [editingMode, setEditingMode] = useState<"add" | "edit">("add");
  const [draftItem, setDraftItem] = useState<CartItem | null>(null);

  // Pagamentos
  const [payments, setPayments] = useState<{ method: string; amount: number }[]>([]);

  const { products: catalog } = useProducts();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const isTyping = tag === 'input' || tag === 'textarea' || (e.target as HTMLElement)?.isContentEditable;
      if (isTyping) return;

      if (e.key === 'F2') {
        e.preventDefault();
        setPayOpen(true);
        return;
      }

      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setItems(prev => {
          if (!prev.length) return prev;
          const lastId = prev[prev.length - 1].id;
          return prev.map(i => i.id === lastId ? { ...i, qty: i.qty + 1 } : i);
        });
        return;
      }

      if (e.key === '-') {
        e.preventDefault();
        setItems(prev => {
          if (!prev.length) return prev;
          const last = prev[prev.length - 1];
          if (last.qty <= 1) return prev.slice(0, -1);
          const lastId = last.id;
          return prev.map(i => i.id === lastId ? { ...i, qty: Math.max(i.qty - 1, 0) } : i);
        });
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        setItems(prev => prev.slice(0, -1));
      }
    };
    if (typeof window === "undefined") return;
    
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setItems, setPayOpen]);
  const sourceProducts: Product[] = useMemo(() => {
    if (catalog.length) {
      return catalog
        .filter((p) => p.visible !== false)
        .map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          sku: p.sku,
          barcode: p.barcode,
          type: p.type === "weight" || (p as any).weighable ? "weight" : (p.type === "service" ? "service" : "unit"),
          unit: p.unit || "un",
          image: p.image,
          category: p.category,
        }));
    }
    return sampleProducts;
  }, [catalog]);

  const filteredByCategory = useMemo(() => {
    if (!selectedCategory) return sourceProducts;
    return sourceProducts.filter(p => p.category === selectedCategory);
  }, [sourceProducts, selectedCategory]);

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return filteredByCategory;
    return filteredByCategory.filter(p =>
      p.name.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q) || p.barcode?.toLowerCase().includes(q)
    );
  }, [query, filteredByCategory]);

  const addItem = (p: Product) => {
    setItems(prev => {
      const found = prev.find(i => i.id === p.id);
      if (found) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1, discType: "amount", discValue: 0 }];
    });
  };

  const handleProductClick = (p: Product) => {
    if (p.type === "weight") {
      // Abrir diálogo para informar peso
      setEditingMode("add");
      setDraftItem({ ...p, qty: 0.100, discType: "amount", discValue: 0 });
      setItemDialogOpen(true);
    } else {
      addItem(p);
    }
  };

  const openEditItem = (item: CartItem) => {
    setEditingMode("edit");
    setDraftItem({ ...item });
    setItemDialogOpen(true);
  };

  const saveDraftItem = () => {
    if (!draftItem) return;
    if (draftItem.qty <= 0) {
      toast.error("Quantidade deve ser maior que zero.");
      return;
    }
    if (editingMode === "add") {
      setItems(prev => [...prev, { ...draftItem }]);
    } else {
      setItems(prev => prev.map(i => i.id === draftItem.id ? { ...draftItem } : i));
    }
    setItemDialogOpen(false);
    setDraftItem(null);
  };

  const inc = (id: string) => setItems(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
  const dec = (id: string) => setItems(prev => prev.flatMap(i => i.id === id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i]));
  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  const lineTotal = (i: CartItem) => {
    const gross = i.price * i.qty;
    const dv = i.discValue ?? 0;
    const disc = i.discType === "percent" ? gross * (dv / 100) : dv;
    return Math.max(gross - disc, 0);
  };

  const subtotal = items.reduce((s, i) => s + lineTotal(i), 0);
  const orderDiscount = orderDiscType === "amount" ? orderDiscValue : subtotal * (orderDiscValue / 100);
  const total = Math.max(subtotal - orderDiscount, 0);

  const paid = payments.reduce((s, p) => s + (Number.isFinite(p.amount) ? p.amount : 0), 0);
  const remaining = Math.max(total - paid, 0);
  const change = Math.max(paid - total, 0);

  const handleQuickPay = async (method: string) => {
    // pagamento rápido: assume pagamento integral no método escolhido
    const pay = [{ method, amount: total }];
    await doFinalize(pay);
  };

  const doFinalize = async (payms?: { method: string; amount: number }[]) => {
    const payList = payms ?? payments;
    const paid = payList.reduce((s, p) => s + (Number.isFinite(p.amount) ? p.amount : 0), 0);
    if (paid + 1e-6 < total) {
      toast.error("Pagamento insuficiente. Complete o valor para finalizar.");
      return;
    }

    try {
      // Impressão do recibo
      const receiptItems = items.map(i => ({ name: i.name, qty: i.qty, price: i.price, unit: i.unit }));
      await printSaleReceipt({
        items: receiptItems,
        subtotal,
        orderDiscount,
        total,
        payments: payList,
        change: Math.max(paid - total, 0),
      });

      // Comandas por setor
      const settings = loadSettings();
      if (settings.sectorPrinting) {
        await printSectorTickets(items.map(i => ({ name: i.name, qty: i.qty, note: i.note, printSector: (i as any).printSector as Sector })));
      }

      toast.success("Venda finalizada com sucesso!");
    } catch (e: any) {
      toast.error(e?.message || "Falha na impressão");
    }

    setPayOpen(false);
    setItems([]);
    setPayments([]);
    setOrderDiscType("amount");
    setOrderDiscValue(0);
  };

  const resetSale = () => {
    setItems([]);
    setPayments([]);
    setOrderDiscType("amount");
    setOrderDiscValue(0);
    setQuery("");
    setSelectedCategory(null);
    setDraftItem(null);
    setItemDialogOpen(false);
    setPayOpen(false);
  };

  return (
    <PDVWrapper>
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>PDV — {config?.businessName || "Sistema de Vendas"}</title>
          <meta name="description" content="Sistema de ponto de venda moderno e eficiente." />
          <link rel="canonical" href="https://nexus-flow-point-ehh1.vercel.app/pdv" />
        </Helmet>

      <header className="border-b sticky top-0 z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center gap-4 py-4">
          <div className="flex-1">
            <h1 className="text-xl font-semibold">PDV — {config?.businessName || "Frente de Loja"}</h1>
            <p className="text-sm text-muted-foreground">Toque nos produtos ou leia código de barras</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={resetSale}>Nova venda</Button>
            <Button variant="secondary" onClick={() => setPayOpen(true)} disabled={!items.length}>Pagamento</Button>
            <Button variant="outline" onClick={() => ensurePrinterConnected()}>Conectar impressora</Button>
            <Button variant="ghost" asChild>
              <a href="/settings/modules">Configurações</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar - Quick Actions */}
        <aside className="lg:col-span-1 space-y-4">
          <QuickActions
            onConnectPrinter={() => ensurePrinterConnected()}
            enabledModules={config?.enabledModules || []}
            storeName={config?.businessName || ""}
          />
        </aside>

        {/* Main content - Products */}
        <section className="lg:col-span-2 space-y-4">
          <SearchBar
            query={query}
            onQueryChange={(v) => { setQuery(v); }}
            onEnterSearch={() => {
              const q = query.trim().toLowerCase();
              const list = products;
              const exact = list.find(p => p.sku?.toLowerCase() === q || p.name.toLowerCase() === q || p.barcode?.toLowerCase() === q);
              const pick = exact || (list.length === 1 ? list[0] : undefined);
              if (pick) {
                handleProductClick(pick);
                setQuery("");
              }
            }}
          />

          <ProductGrid
            products={products}
            onProductClick={handleProductClick}
            query={query}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </section>

        {/* Right sidebar - Cart */}
        <aside className="lg:col-span-1">
          <CartSidebar
            items={items}
            onEditItem={(item) => {
              setEditingMode("edit");
              setDraftItem(item);
              setItemDialogOpen(true);
            }}
            onRemoveItem={(id) => {
              setItems(prev => prev.filter(i => i.id !== id));
            }}
            onUpdateQuantity={(id, qty) => {
              setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
            }}
            onPayment={() => setPayOpen(true)}
            onNewSale={resetSale}
            subtotal={subtotal}
            orderDiscType={orderDiscType}
            orderDiscValue={orderDiscValue}
            onOrderDiscTypeChange={setOrderDiscType}
            onOrderDiscValueChange={setOrderDiscValue}
            total={total}
          />
        </aside>
      </main>

      {/* Edição/Adição de Item */}
      <Dialog open={itemDialogOpen} onOpenChange={setItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingMode === "edit" ? "Editar item" : "Adicionar item"}</DialogTitle>
          </DialogHeader>
          {draftItem && (
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">{draftItem.name}</div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Quantidade</div>
                  <Input
                    type="number"
                    inputMode="decimal"
                    step={draftItem.type === "weight" ? 0.001 : 1}
                    min={draftItem.type === "weight" ? 0.001 : 1}
                    value={draftItem.qty}
                    onChange={(e) => setDraftItem((d) => d ? { ...d, qty: parseFloat(e.target.value) || 0 } : d)}
                  />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Observação</div>
                  <Textarea
                    value={draftItem.note || ""}
                    onChange={(e) => setDraftItem((d) => d ? { ...d, note: e.target.value } : d)}
                    placeholder="Ex: sem cebola, ponto da carne..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 items-end">
                <div className="col-span-1">
                  <div className="text-xs text-muted-foreground mb-1">Tipo de desconto</div>
                  <Select value={draftItem.discType} onValueChange={(v: "amount" | "percent") => setDraftItem((d) => d ? { ...d, discType: v } : d)}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amount">R$</SelectItem>
                      <SelectItem value="percent">%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-muted-foreground mb-1">Valor do desconto</div>
                  <Input
                    type="number"
                    inputMode="decimal"
                    step={draftItem.discType === "percent" ? 1 : 0.01}
                    min={0}
                    value={draftItem.discValue ?? 0}
                    onChange={(e) => setDraftItem((d) => d ? { ...d, discValue: parseFloat(e.target.value) || 0 } : d)}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setItemDialogOpen(false)}>Cancelar</Button>
            <Button onClick={saveDraftItem}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pagamento */}
      <PaymentDialog
        open={payOpen}
        onOpenChange={setPayOpen}
        total={total}
        payments={payments}
        onAddPayment={(p) => setPayments((prev) => [...prev, p])}
        onRemovePayment={(idx) => setPayments((prev) => prev.filter((_, i) => i !== idx))}
        onQuickPay={handleQuickPay}
        onFinalize={() => doFinalize()}
      />
      </div>
    </PDVWrapper>
  );
}
