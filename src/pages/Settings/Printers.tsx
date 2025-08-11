import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/store/settings";
import { testPrint, ensurePrinter } from "@/features/printing/webusb";
import { toast } from "sonner";

export default function Printers() {
  const { settings, update } = useSettings();

  const onConnect = async () => {
    try {
      await ensurePrinter();
      toast.success("Impressora conectada (WebUSB)");
    } catch (e: any) {
      toast.error(e?.message || "Falha ao conectar");
    }
  };

  const onTest = async () => {
    try {
      await testPrint();
      toast.success("Teste enviado para a impressora");
    } catch (e: any) {
      toast.error(e?.message || "Erro ao imprimir teste");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Configurar Impressoras — PDV Multi-nicho</title>
        <meta name="description" content="Conecte impressoras POS-80 via WebUSB e personalize o cabeçalho." />
        <link rel="canonical" href="/settings/printers" />
      </Helmet>

      <header className="container py-6 border-b">
        <h1 className="text-2xl font-semibold">Impressoras (WebUSB/Chrome)</h1>
        <p className="text-sm text-muted-foreground">Conecte a impressora térmica e personalize o layout do recibo e comandas.</p>
      </header>

      <main className="container py-6 grid md:grid-cols-2 gap-6">
        <Card className="p-4 space-y-3">
          <h2 className="font-semibold">Conexão</h2>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={onConnect}>Conectar via WebUSB</Button>
            <Button variant="outline" onClick={onTest}>Imprimir teste</Button>
          </div>
          <p className="text-xs text-muted-foreground">Dica: a solicitação do WebUSB precisa de um clique do usuário.</p>
        </Card>

        <Card className="p-4 space-y-3">
          <h2 className="font-semibold">Cabeçalho do Recibo</h2>
          <div className="grid gap-3">
            <Input placeholder="Nome fantasia" value={settings.businessName || ""} onChange={(e) => update({ businessName: e.target.value })} />
            <Input placeholder="Slogan" value={settings.slogan || ""} onChange={(e) => update({ slogan: e.target.value })} />
            <Input placeholder="CNPJ" value={settings.cnpj || ""} onChange={(e) => update({ cnpj: e.target.value })} />
            <Input placeholder="Telefone" value={settings.phone || ""} onChange={(e) => update({ phone: e.target.value })} />
            <Input placeholder="Endereço" value={settings.address || ""} onChange={(e) => update({ address: e.target.value })} />
          </div>
        </Card>

        <Card className="p-4 space-y-3">
          <h2 className="font-semibold">Comandas por setor</h2>
          <div className="flex items-center justify-between">
            <span className="text-sm">Imprimir comandas por setor</span>
            <Switch checked={!!settings.sectorPrinting} onCheckedChange={(v) => update({ sectorPrinting: v })} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Cópias do recibo</span>
            <Input type="number" min={1} className="w-24" value={settings.receiptCopies ?? 1} onChange={(e) => update({ receiptCopies: Math.max(1, parseInt(e.target.value || "1")) })} />
          </div>
          <Button onClick={() => toast.success("Configurações salvas")}>Salvar</Button>
        </Card>
      </main>
    </div>
  );
}
