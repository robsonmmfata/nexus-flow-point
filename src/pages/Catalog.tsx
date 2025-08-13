import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProducts } from "@/store/products";
import { CatalogProduct, ProductType, Sector } from "@/types/product";

function currency(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const sectors: Sector[] = [
  "balcao",
  "cozinha",
  "pizzaria",
  "bar",
  "padaria",
  "bebidas",
  "expedicao",
];

const types: ProductType[] = ["unit", "weight", "service", "combo", "pizza_half"];

export default function Catalog() {
  const { products, addProduct, updateProduct, removeProduct } = useProducts();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CatalogProduct | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const src = products;
    const filtered = src.filter((p) =>
      [p.name, p.sku, p.barcode, p.category]
        .filter(Boolean)
        .some((f) => (f as string).toLowerCase().includes(q))
    );
    // ordena por atualização
    return filtered.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [products, query]);

  const startNew = () => {
    setEditing({
      id: "temp",
      name: "",
      description: "",
      abbreviation: "",
      sku: "",
      barcode: "",
      price: 0,
      cost: 0,
      margin: 0,
      unit: "un",
      category: "",
      type: "unit",
      visible: true,
      perishable: false,
      divisible: false,
      weighable: false,
      scaleEnabled: false,
      printSector: "balcao",
      image: undefined,
      composition: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setOpen(true);
  };

  const onEdit = (p: CatalogProduct) => {
    setEditing({ ...p });
    setOpen(true);
  };

  const onDelete = (id: string) => {
    if (confirm("Remover produto?")) removeProduct(id);
  };

  const onSubmit = () => {
    if (!editing) return;
    const { id, ...data } = editing;

    // margem automática
    const price = Number(data.price || 0);
    const cost = Number(data.cost || 0);
    const margin = cost > 0 ? ((price - cost) / cost) * 100 : 0;
    (data as any).margin = Math.round(margin * 100) / 100;

    if (id === "temp") {
      const { createdAt, updatedAt, ...rest } = data as CatalogProduct;
      addProduct({ ...rest, createdAt: "", updatedAt: "" } as any);
    } else {
      updateProduct(id, data);
    }
    setOpen(false);
    setEditing(null);
  };

  const onImagePick = (file: File) => {
    if (!editing) return;
    const reader = new FileReader();
    reader.onload = () => {
      setEditing({ ...editing, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Catálogo de Produtos — PDV</title>
        <meta
          name="description"
          content="Cadastro de produtos, combos e pizza 1/2 com setores, imagens, EAN e visibilidade no PDV."
        />
        <link rel="canonical" href={`${window.location.origin}/catalog`} />
      </Helmet>

      <header className="border-b sticky top-0 z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between py-4">
          <div>
            <h1 className="text-xl font-semibold">Catálogo e Cardápio</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie produtos, setores de impressão, combos e pizza meia a meia.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/">Início</Link>
            </Button>
            <Button onClick={startNew}>Novo produto</Button>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="flex-1 flex gap-3">
              <Input
                placeholder="Buscar por nome, SKU, EAN ou categoria"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => window.location.reload()}>Recarregar</Button>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Imagem</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>SKU/EAN</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Unid.</TableHead>
                  <TableHead>Setor</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Visível</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={`Imagem do produto ${p.name}`}
                          loading="lazy"
                          className="h-12 w-12 object-cover rounded"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded bg-muted" aria-hidden />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        {p.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{p.sku}</div>
                      <div className="text-xs text-muted-foreground">{p.barcode}</div>
                    </TableCell>
                    <TableCell className="uppercase text-xs">{p.type}</TableCell>
                    <TableCell>{p.unit || "un"}</TableCell>
                    <TableCell className="capitalize">{p.printSector || "-"}</TableCell>
                    <TableCell>{currency(p.price)}</TableCell>
                    <TableCell>{p.visible ? "Sim" : "Não"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="outline" onClick={() => onEdit(p)}>
                          Editar
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => onDelete(p.id)}>
                          Remover
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </main>

      {/* Dialogo de edição/criação */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editing?.id === "temp" ? "Novo produto" : "Editar produto"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Nome</Label>
                    <Input
                      value={editing.name}
                      onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                      placeholder="Ex: Pizza Calabresa"
                    />
                  </div>
                  <div>
                    <Label>Categoria</Label>
                    <Input
                      value={editing.category || ""}
                      onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                      placeholder="Ex: Pizzaria"
                    />
                  </div>
                  <div>
                    <Label>SKU</Label>
                    <Input
                      value={editing.sku || ""}
                      onChange={(e) => setEditing({ ...editing, sku: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>EAN/Código de barras</Label>
                    <Input
                      value={editing.barcode || ""}
                      onChange={(e) => setEditing({ ...editing, barcode: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Descrição</Label>
                  <Textarea
                    value={editing.description || ""}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    placeholder="Detalhes para impressão e vitrine"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <Label>Preço de venda</Label>
                    <Input
                      type="number"
                      inputMode="decimal"
                      step="0.01"
                      value={editing.price}
                      onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label>Custo</Label>
                    <Input
                      type="number"
                      inputMode="decimal"
                      step="0.01"
                      value={editing.cost || 0}
                      onChange={(e) => setEditing({ ...editing, cost: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <Label>Margem (%)</Label>
                    <Input disabled value={editing.cost ? Math.round((((editing.price - (editing.cost||0)) / (editing.cost||1)) * 100) * 100) / 100 : 0} />
                  </div>
                  <div>
                    <Label>Unidade</Label>
                    <Input
                      value={editing.unit || "un"}
                      onChange={(e) => setEditing({ ...editing, unit: e.target.value })}
                      placeholder="un, kg, g, lt"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <Label>Tipo</Label>
                    <Select
                      value={editing.type}
                      onValueChange={(v: ProductType) => setEditing({ ...editing, type: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {types.map((t) => (
                          <SelectItem key={t} value={t} className="uppercase">
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Setor de impressão</Label>
                    <Select
                      value={editing.printSector || "balcao"}
                      onValueChange={(v: Sector) => setEditing({ ...editing, printSector: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Setor" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectors.map((s) => (
                          <SelectItem key={s} value={s} className="capitalize">
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Visível no PDV</Label>
                    <div className="h-10 flex items-center">
                      <Switch
                        checked={!!editing.visible}
                        onCheckedChange={(v) => setEditing({ ...editing, visible: v })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Habilitar balança</Label>
                    <div className="h-10 flex items-center">
                      <Switch
                        checked={!!editing.scaleEnabled}
                        onCheckedChange={(v) => setEditing({ ...editing, scaleEnabled: v, weighable: v })}
                      />
                    </div>
                  </div>
                </div>

                {editing.type === "pizza_half" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Regra de preço (1/2)</Label>
                      <Select
                        value={editing.pizzaPricingRule || "higher"}
                        onValueChange={(v: any) => setEditing({ ...editing, pizzaPricingRule: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Regra" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="higher">Maior valor</SelectItem>
                          <SelectItem value="average">Média</SelectItem>
                          <SelectItem value="custom">Personalizada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Abreviação (cupom)</Label>
                      <Input
                        value={editing.abbreviation || ""}
                        onChange={(e) => setEditing({ ...editing, abbreviation: e.target.value })}
                        placeholder="Ex: PZ 1/2"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label>Composição/combos (nome e qtd.)</Label>
                  <div className="space-y-2">
                    {(editing.composition || []).map((c, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-2">
                        <Input
                          className="col-span-7"
                          placeholder="Nome do item"
                          value={c.name || ""}
                          onChange={(e) => {
                            const comp = [...(editing.composition || [])];
                            comp[idx] = { ...comp[idx], name: e.target.value };
                            setEditing({ ...editing, composition: comp });
                          }}
                        />
                        <Input
                          className="col-span-3"
                          type="number"
                          inputMode="decimal"
                          step="0.01"
                          placeholder="Qtd"
                          value={c.qty}
                          onChange={(e) => {
                            const comp = [...(editing.composition || [])];
                            comp[idx] = { ...comp[idx], qty: parseFloat(e.target.value) || 0 };
                            setEditing({ ...editing, composition: comp });
                          }}
                        />
                        <Button
                          className="col-span-2"
                          variant="outline"
                          onClick={() => {
                            const comp = (editing.composition || []).filter((_, i) => i !== idx);
                            setEditing({ ...editing, composition: comp });
                          }}
                        >
                          Remover
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="secondary"
                      onClick={() =>
                        setEditing({
                          ...editing,
                          composition: [...(editing.composition || []), { qty: 1 }],
                        })
                      }
                    >
                      Adicionar item
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label>Imagem</Label>
                  <div className="aspect-square rounded-md overflow-hidden bg-muted flex items-center justify-center">
                    {editing.image ? (
                      <img
                        src={editing.image}
                        alt={`Imagem do produto ${editing.name}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-muted-foreground">Sem imagem</span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-2"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onImagePick(f);
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Perecível</Label>
                    <div className="h-10 flex items-center">
                      <Switch
                        checked={!!editing.perishable}
                        onCheckedChange={(v) => setEditing({ ...editing, perishable: v })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Divisível</Label>
                    <div className="h-10 flex items-center">
                      <Switch
                        checked={!!editing.divisible}
                        onCheckedChange={(v) => setEditing({ ...editing, divisible: v })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Pesável</Label>
                    <div className="h-10 flex items-center">
                      <Switch
                        checked={!!editing.weighable}
                        onCheckedChange={(v) => setEditing({ ...editing, weighable: v, type: v ? "weight" : editing.type })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Cobrar serviço</Label>
                    <div className="h-10 flex items-center">
                      <Switch
                        checked={!!editing.chargeService}
                        onCheckedChange={(v) => setEditing({ ...editing, chargeService: v })}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Abreviações/detalhes</Label>
                  <Textarea
                    value={editing.abbreviation || ""}
                    onChange={(e) => setEditing({ ...editing, abbreviation: e.target.value })}
                    placeholder="Texto para impressão/etiqueta"
                  />
                </div>

                <Separator />
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={onSubmit}>Salvar</Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter />
        </DialogContent>
      </Dialog>
    </div>
  );
}
