import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [query, setQuery] = useState("");
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
  const settingsAll = loadSettings();
  const niche = settingsAll.niche || "Geral";
  const enabledModules = settingsAll.enabledModules || {};

  const sourceProducts: Product[] = useMemo(() => {
    if (catalog.length) {
      return catalog
        .filter((p) => p.visible !== false)
        .map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          sku: p.sku,
          type: p.type === "weight" || (p as any).weighable ? "weight" : (p.type === "service" ? "service" : "unit"),
          unit: p.unit || "un",
          image: p.image,
          category: p.category,
        }));
    }
    return sampleProducts;
  }, [catalog]);

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sourceProducts;
    return sourceProducts.filter(p =>
      p.name.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q)
    );
  }, [query, sourceProducts]);

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

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>PDV Completo — Unidade, Peso, Fotos e Multipagamento</title>
        <meta name="description" content="PDV com produtos por unidade e kg, fotos mockadas, edição rápida por item, descontos por item/pedido e multipagamento." />
        <link rel="canonical" href="/pdv" />
      </Helmet>

      <header className="border-b sticky top-0 z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center gap-4 py-4">
          <div className="flex-1">
            <h1 className="text-xl font-semibold">PDV — Frente de Loja</h1>
            <p className="text-sm text-muted-foreground">Toque nos produtos ou leia código de barras</p>
            <div className="text-xs text-muted-foreground mt-1">Nicho: {niche}</div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <a href="/settings/modules">Módulos</a>
            </Button>
            <Button variant="outline" onClick={() => { setItems([]); setPayments([]); setOrderDiscType("amount"); setOrderDiscValue(0); }}>Nova venda</Button>
            <Button variant="secondary" onClick={() => setPayOpen(true)} disabled={!items.length}>Pagamento</Button>
            <Button variant="outline" onClick={() => ensurePrinterConnected()}>Conectar impressora</Button>
          </div>
        </div>
      </header>

      <main className="container py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Produtos */}
        <section className="md:col-span-2 space-y-4">
          <div className="flex gap-3">
            <Input placeholder="Buscar por nome, SKU ou código de barras" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={(e) => {
              if (e.key === "Enter") {
                const q = query.trim().toLowerCase();
                const list = products;
                const exact = list.find(p => p.sku?.toLowerCase() === q || p.name.toLowerCase() === q);
                const pick = exact || (list.length === 1 ? list[0] : undefined);
                if (pick) {
                  handleProductClick(pick);
                  setQuery("");
                }
              }
            }} />
            <Button onClick={() => setQuery("")}>Limpar</Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(p => (
              <Card key={p.id} className="p-4 cursor-pointer hover:shadow-md transition" onClick={() => handleProductClick(p)}>
                {p.image ? (
                  <img src={p.image} alt={`Foto de ${p.name}`} loading="lazy" className="h-24 w-full object-cover rounded-md" />
                ) : (
                  <div className="h-24 rounded-md bg-gradient-to-br from-brand/10 via-brand-2/10 to-brand-3/10" aria-hidden="true" />
                )}
                <div className="mt-3">
                  <div className="text-sm text-muted-foreground">{p.sku}</div>
                  <div className="font-medium leading-tight truncate" title={p.name}>{p.name}</div>
                  <div className="text-sm mt-1">
                    {p.type === "weight" ? `${currency(p.price)} / ${p.unit ?? "kg"}` : currency(p.price)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Carrinho */}
        <aside className="space-y-4">
          <Card className="p-4">
            <h2 className="text-lg font-semibold">Carrinho</h2>
            <Separator className="my-3" />
            <div className="space-y-3 max-h-[50vh] overflow-auto pr-2">
              {items.length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhum item adicionado.</p>
              )}
              {items.map(i => (
                <div key={i.id} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <button
                      className="font-medium leading-tight hover:underline text-left truncate"
                      onClick={() => openEditItem(i)}
                      title="Editar item"
                    >
                      {i.name}
                    </button>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <span>{i.sku}</span>
                      {i.discValue ? (
                        <span>
                          desc: {i.discType === "percent" ? `${i.discValue}%` : currency(i.discValue)}
                        </span>
                      ) : null}
                    </div>
                    {i.note ? <div className="text-xs text-muted-foreground truncate">Obs: {i.note}</div> : null}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => dec(i.id)}>-</Button>
                    <span className="w-12 text-center">
                      {i.qty.toLocaleString("pt-BR", { minimumFractionDigits: i.type === "weight" ? 3 : 0 })}
                      {i.unit ? ` ${i.unit}` : ""}
                    </span>
                    <Button size="sm" variant="outline" onClick={() => inc(i.id)}>+</Button>
                  </div>
                  <div className="text-right min-w-24">
                    <div className="text-sm">{currency(lineTotal(i))}</div>
                    <Button variant="ghost" size="sm" onClick={() => remove(i.id)}>Remover</Button>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-3" />
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-medium">{currency(subtotal)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Select value={orderDiscType} onValueChange={(v: "amount" | "percent") => setOrderDiscType(v)}>
                  <SelectTrigger className="w-28 h-9">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amount">Desc. (R$)</SelectItem>
                    <SelectItem value="percent">Desc. (%)</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  inputMode="decimal"
                  className="h-9"
                  value={orderDiscValue}
                  onChange={(e) => setOrderDiscValue(parseFloat(e.target.value) || 0)}
                  step={orderDiscType === "percent" ? 1 : 0.01}
                  min={0}
                  placeholder="Desconto"
                />
                <div className="ml-auto text-right">
                  <div className="text-xs text-muted-foreground">Desconto</div>
                  <div className="font-medium">
                    {orderDiscType === "percent"
                      ? `${orderDiscValue}% (${currency(orderDiscount)})`
                      : currency(orderDiscount)}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-base">
                <span className="font-medium">Total</span>
                <span className="font-semibold">{currency(total)}</span>
              </div>
            </div>
            <Button className="mt-4 w-full" onClick={() => setPayOpen(true)} disabled={!items.length}>Ir para pagamento</Button>
          </Card>
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
      <Dialog open={payOpen} onOpenChange={setPayOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pagamento</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Button variant="secondary" onClick={() => handleQuickPay("Dinheiro")}>Dinheiro</Button>
            <Button variant="secondary" onClick={() => handleQuickPay("Pix")}>Pix</Button>
            <Button variant="secondary" onClick={() => handleQuickPay("Crédito")}>Crédito</Button>
            <Button variant="secondary" onClick={() => handleQuickPay("Débito")}>Débito</Button>
            <Button variant="secondary" onClick={() => handleQuickPay("Boleto")}>Boleto</Button>
            <Button variant="secondary" onClick={() => handleQuickPay("Fiado")}>Fiado</Button>
          </div>
          <DialogFooter>
            <div className="w-full flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Total</div>
              <div className="text-lg font-semibold">{currency(total)}</div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
