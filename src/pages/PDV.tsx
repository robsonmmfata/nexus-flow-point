import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  sku?: string;
}

interface CartItem extends Product {
  qty: number;
  note?: string;
}

const sampleProducts: Product[] = [
  { id: "1", name: "Camiseta Básica", price: 49.9, sku: "CAM-001" },
  { id: "2", name: "Café Espresso", price: 6.0, sku: "CAF-ESP" },
  { id: "3", name: "Pão de Queijo (100g)", price: 3.5, sku: "PDQ-100" },
  { id: "4", name: "Shampoo 300ml", price: 29.9, sku: "SHA-300" },
  { id: "5", name: "Parafusos (10 un)", price: 12.5, sku: "PAR-010" },
  { id: "6", name: "Pizza Mussarela (fatia)", price: 9.9, sku: "PIZ-MUS" },
  { id: "7", name: "Ração Premium 1kg", price: 24.9, sku: "RAC-1KG" },
  { id: "8", name: "Cerveja Artesanal 600ml", price: 19.9, sku: "CER-600" },
];

function currency(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function PDV() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<CartItem[]>([]);
  const [payOpen, setPayOpen] = useState(false);

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sampleProducts;
    return sampleProducts.filter(p =>
      p.name.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q)
    );
  }, [query]);

  const addItem = (p: Product) => {
    setItems(prev => {
      const found = prev.find(i => i.id === p.id);
      if (found) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const inc = (id: string) => setItems(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
  const dec = (id: string) => setItems(prev => prev.flatMap(i => i.id === id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i]));
  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  const finalize = () => {
    setPayOpen(false);
    setItems([]);
    toast.success("Venda finalizada com sucesso!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>PDV Demo — Multi-nicho</title>
        <meta name="description" content="PDV rápido e responsivo com busca, carrinho e pagamento." />
        <link rel="canonical" href="/pdv" />
      </Helmet>

      <header className="border-b sticky top-0 z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center gap-4 py-4">
          <div className="flex-1">
            <h1 className="text-xl font-semibold">PDV — Frente de Loja</h1>
            <p className="text-sm text-muted-foreground">Toque nos produtos ou leia código de barras</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setItems([])}>Nova venda</Button>
            <Button variant="secondary" onClick={() => setPayOpen(true)} disabled={!items.length}>Pagamento</Button>
          </div>
        </div>
      </header>

      <main className="container py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Produtos */}
        <section className="md:col-span-2 space-y-4">
          <div className="flex gap-3">
            <Input placeholder="Buscar por nome, SKU ou código de barras" value={query} onChange={e => setQuery(e.target.value)} />
            <Button onClick={() => setQuery("")}>Limpar</Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(p => (
              <Card key={p.id} className="p-4 cursor-pointer hover:shadow-md transition" onClick={() => addItem(p)}>
                <div className="h-24 rounded-md bg-gradient-to-br from-brand/10 via-brand-2/10 to-brand-3/10" />
                <div className="mt-3">
                  <div className="text-sm text-muted-foreground">{p.sku}</div>
                  <div className="font-medium leading-tight">{p.name}</div>
                  <div className="text-sm mt-1">{currency(p.price)}</div>
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
                  <div>
                    <div className="font-medium leading-tight">{i.name}</div>
                    <div className="text-xs text-muted-foreground">{i.sku}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => dec(i.id)}>-</Button>
                    <span className="w-6 text-center">{i.qty}</span>
                    <Button size="sm" variant="outline" onClick={() => inc(i.id)}>+</Button>
                  </div>
                  <div className="text-right min-w-20">
                    <div className="text-sm">{currency(i.price * i.qty)}</div>
                    <Button variant="ghost" size="sm" onClick={() => remove(i.id)}>Remover</Button>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-3" />
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-medium">{currency(subtotal)}</span>
            </div>
            <Button className="mt-4 w-full" onClick={() => setPayOpen(true)} disabled={!items.length}>Ir para pagamento</Button>
          </Card>
        </aside>
      </main>

      {/* Pagamento */}
      <Dialog open={payOpen} onOpenChange={setPayOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pagamento</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Button variant="secondary" onClick={finalize}>Dinheiro</Button>
            <Button variant="secondary" onClick={finalize}>Pix</Button>
            <Button variant="secondary" onClick={finalize}>Crédito</Button>
            <Button variant="secondary" onClick={finalize}>Débito</Button>
            <Button variant="secondary" onClick={finalize}>Boleto</Button>
            <Button variant="secondary" onClick={finalize}>Fiado</Button>
          </div>
          <DialogFooter>
            <div className="w-full flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Total</div>
              <div className="text-lg font-semibold">{currency(subtotal)}</div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
