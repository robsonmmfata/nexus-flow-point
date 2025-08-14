import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Settings, AlertTriangle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ModuleType,
  MODULE_LABELS,
  NICHE_LABELS,
  NICHE_MODULE_CONFIG,
  useStoreConfig 
} from "@/store/modules";
import { toast } from "sonner";

export default function ModulesSettings() {
  const { config, updateModules, isModuleEnabled } = useStoreConfig();
  const navigate = useNavigate();
  const [pendingChanges, setPendingChanges] = useState<Partial<Record<ModuleType, boolean>>>({});

  if (!config) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Loja não configurada</h2>
          <p className="text-muted-foreground mb-4">
            Você precisa configurar sua loja antes de acessar as configurações de módulos.
          </p>
          <Button asChild>
            <Link to="/store-setup">Configurar Loja</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const allModules: ModuleType[] = ["delivery", "balcao", "mesa", "comanda", "orcamento"];
  const defaultModulesForNiche = NICHE_MODULE_CONFIG[config.niche];
  const hasChanges = Object.keys(pendingChanges).length > 0;

  const handleModuleToggle = (module: ModuleType, enabled: boolean) => {
    setPendingChanges(prev => ({
      ...prev,
      [module]: enabled
    }));
  };

  const handleSave = () => {
    updateModules(pendingChanges);
    setPendingChanges({});
    toast.success("Configurações de módulos atualizadas com sucesso!");
  };

  const handleCancel = () => {
    setPendingChanges({});
  };

  const isModuleCurrentlyEnabled = (module: ModuleType): boolean => {
    if (module in pendingChanges) {
      return pendingChanges[module] ?? false;
    }
    return isModuleEnabled(module);
  };

  const isModuleRecommended = (module: ModuleType): boolean => {
    return defaultModulesForNiche.includes(module);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Configurações de Módulos — {config.businessName}</title>
        <meta name="description" content="Configure quais módulos estão habilitados para sua loja." />
      </Helmet>

      <header className="border-b">
        <div className="container py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/pdv">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao PDV
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <h1 className="text-xl font-semibold">Configurações de Módulos</h1>
          </div>
        </div>
      </header>

      <main className="container py-8 max-w-4xl">
        {/* Informações da Loja */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Informações da Loja</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">Nome da Loja</Label>
              <p className="font-medium">{config.businessName}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Nicho</Label>
              <p className="font-medium">{NICHE_LABELS[config.niche]}</p>
            </div>
          </div>
        </Card>

        {/* Configuração dos Módulos */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Módulos Disponíveis</h2>
              <p className="text-sm text-muted-foreground">
                Configure quais módulos estarão disponíveis no seu PDV
              </p>
            </div>
            {hasChanges && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Salvar Alterações
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {allModules.map((module) => {
              const enabled = isModuleCurrentlyEnabled(module);
              const recommended = isModuleRecommended(module);
              
              return (
                <div key={module} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Label htmlFor={module} className="font-medium cursor-pointer">
                        {MODULE_LABELS[module]}
                      </Label>
                      {recommended && (
                        <Badge variant="secondary" className="text-xs">
                          Recomendado
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {getModuleDescription(module)}
                    </p>
                  </div>
                  <Switch
                    id={module}
                    checked={enabled}
                    onCheckedChange={(checked) => handleModuleToggle(module, checked)}
                  />
                </div>
              );
            })}
          </div>

          {!hasChanges && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Dica:</strong> Módulos não habilitados não aparecerão no PDV, 
                mantendo a interface limpa e focada no seu tipo de negócio.
              </p>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}

function getModuleDescription(module: ModuleType): string {
  const descriptions = {
    delivery: "Gestão de pedidos para entrega",
    balcao: "Vendas diretas no balcão da loja",
    mesa: "Controle de mesas para restaurantes",
    comanda: "Sistema de comandas para bares e restaurantes",
    orcamento: "Criação e gestão de orçamentos"
  };
  return descriptions[module];
}