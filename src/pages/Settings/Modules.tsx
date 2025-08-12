import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/store/settings";
import { useMemo } from "react";

const NICHES = [
  "Mercado",
  "Padaria",
  "Restaurante/Pizza",
  "Bebidas",
  "Vestuário",
  "Beleza",
  "Pet Shop",
  "Material Construção",
];

type ModuleDef = {
  key: string;
  title: string;
  desc: string;
  niches?: string[];
};

const MODULES: ModuleDef[] = [
  { key: "multipayment", title: "Multipagamento", desc: "Aceitar várias formas no mesmo pedido", niches: ["Mercado", "Padaria", "Restaurante/Pizza", "Bebidas"] },
  { key: "barcodeScanner", title: "Leitor de Código de Barras", desc: "Entrada por EAN/UPC", niches: ["Mercado", "Padaria", "Vestuário", "Material Construção"] },
  { key: "scaleEAN13", title: "Balança (EAN-13)", desc: "Leitura de balança para pesáveis", niches: ["Mercado", "Padaria"] },
  { key: "kitchenTickets", title: "Comandas por Setor", desc: "Imprimir na cozinha/bar com setor", niches: ["Restaurante/Pizza", "Padaria", "Bebidas"] },
  { key: "tables", title: "Mesas/Comandas", desc: "Controle de mesas e comandas", niches: ["Restaurante/Pizza", "Bebidas"] },
  { key: "delivery", title: "Delivery básico", desc: "Endereço/retirada e taxa", niches: ["Restaurante/Pizza", "Padaria"] },
  { key: "inventory", title: "Estoque simples", desc: "Baixa por venda (mock)", niches: ["Mercado", "Vestuário", "Material Construção"] },
  { key: "reports", title: "Relatórios", desc: "Vendas e itens mais vendidos", niches: NICHES },
  { key: "offline", title: "Modo offline (demo)", desc: "Funciona sem internet (localStorage)", niches: NICHES },
];

const recommendedFor = (niche?: string) => {
  const set: Record<string, boolean> = {};
  MODULES.forEach((m) => {
    set[m.key] = niche ? !!m.niches?.includes(niche) : false;
  });
  return set;
};

export default function ModulesSettings() {
  const { settings, update } = useSettings();

  const currentNiche = settings.niche || "Mercado";
  const enabled = useMemo(() => ({ ...(settings.enabledModules || {}) }), [settings.enabledModules]);

  const applyRecommended = () => {
    const rec = recommendedFor(currentNiche);
    update({ enabledModules: rec });
  };

  const toggle = (key: string, on: boolean) => {
    const next = { ...(settings.enabledModules || {}) };
    next[key] = on;
    update({ enabledModules: next });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Configurar nicho e módulos do PDV</title>
        <meta name="description" content="Selecione o nicho e ative módulos para personalizar seu PDV." />
        <link rel="canonical" href="/settings/modules" />
      </Helmet>

      <header className="border-b sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Nicho e Módulos</h1>
            <p className="text-sm text-muted-foreground">Personalize o PDV por segmento e recursos</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <a href="/">Início</a>
            </Button>
            <Button asChild>
              <a href="/pdv">Abrir PDV</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        <Card className="p-4">
          <div className="grid gap-3 md:grid-cols-[320px_1fr] items-start">
            <div>
              <Label className="text-sm">Nicho</Label>
              <Select value={currentNiche} onValueChange={(v) => update({ niche: v })}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione o nicho" />
                </SelectTrigger>
                <SelectContent>
                  {NICHES.map((n) => (
                    <SelectItem key={n} value={n}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="secondary" className="mt-3" onClick={applyRecommended}>
                Aplicar recomendados do nicho
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {MODULES.map((m) => {
                const on = !!enabled[m.key];
                const recommended = !!m.niches?.includes(currentNiche);
                return (
                  <Card key={m.key} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium leading-tight">{m.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">{m.desc}</div>
                        {recommended && (
                          <div className="mt-2 text-[11px] text-muted-foreground">Recomendado para {currentNiche}</div>
                        )}
                      </div>
                      <Switch checked={on} onCheckedChange={(v) => toggle(m.key, v)} />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
