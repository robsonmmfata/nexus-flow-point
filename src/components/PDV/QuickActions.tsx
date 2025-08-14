import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Printer, Wifi, Settings, History, Calculator, Truck, ShoppingCart, Utensils, ScrollText, FileText } from "lucide-react";
import { ModuleType, MODULE_LABELS } from "@/store/modules";
import { Link } from "react-router-dom";

interface QuickActionsProps {
  onConnectPrinter: () => void;
  onShowHistory?: () => void;
  onOpenSettings?: () => void;
  onOpenCalculator?: () => void;
  enabledModules: ModuleType[];
  storeName: string;
}

const moduleIcons: Record<ModuleType, React.ElementType> = {
  delivery: Truck,
  balcao: ShoppingCart,
  mesa: Utensils,
  comanda: ScrollText,
  orcamento: FileText
};

export default function QuickActions({ 
  onConnectPrinter, 
  onShowHistory, 
  onOpenSettings,
  onOpenCalculator,
  enabledModules,
  storeName
}: QuickActionsProps) {
  return (
    <div className="space-y-4">
      {/* Store Info */}
      <Card className="p-4">
        <h3 className="font-semibold mb-2">{storeName}</h3>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Módulos ativos:</div>
          <div className="flex flex-wrap gap-1">
            {enabledModules.map((module) => {
              const Icon = moduleIcons[module];
              return (
                <Badge key={module} variant="secondary" className="text-xs">
                  <Icon className="h-3 w-3 mr-1" />
                  {MODULE_LABELS[module]}
                </Badge>
              );
            })}
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-medium mb-3">Ações rápidas</h3>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onConnectPrinter}
          className="gap-2 h-12"
        >
          <Printer className="h-4 w-4" />
          <div className="text-left">
            <div className="text-xs">Conectar</div>
            <div className="text-xs text-muted-foreground">Impressora</div>
          </div>
        </Button>

        {onShowHistory && (
          <Button
            variant="outline"
            size="sm"
            onClick={onShowHistory}
            className="gap-2 h-12"
          >
            <History className="h-4 w-4" />
            <div className="text-left">
              <div className="text-xs">Ver</div>
              <div className="text-xs text-muted-foreground">Histórico</div>
            </div>
          </Button>
        )}

        {onOpenCalculator && (
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenCalculator}
            className="gap-2 h-12"
          >
            <Calculator className="h-4 w-4" />
            <div className="text-left">
              <div className="text-xs">Abrir</div>
              <div className="text-xs text-muted-foreground">Calculadora</div>
            </div>
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          asChild
          className="gap-2 h-12"
        >
          <Link to="/settings/modules">
            <Settings className="h-4 w-4" />
            <div className="text-left">
              <div className="text-xs">Configurar</div>
              <div className="text-xs text-muted-foreground">Módulos</div>
            </div>
          </Link>
        </Button>
      </div>

      {/* Keyboard Shortcuts Info */}
      <div className="mt-4 pt-3 border-t">
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="font-medium">⌨️ Atalhos:</div>
          <div><kbd className="text-xs">F2</kbd> - Pagamento</div>
          <div><kbd className="text-xs">+</kbd> - Adicionar último</div>
          <div><kbd className="text-xs">-</kbd> - Remover último</div>
          <div><kbd className="text-xs">Del</kbd> - Limpar carrinho</div>
        </div>
      </div>
      </Card>

      {/* Module-specific actions */}
      {enabledModules.length > 0 && (
        <Card className="p-4">
          <h3 className="font-medium mb-3">Módulos</h3>
          <div className="space-y-2">
            {enabledModules.includes("delivery") && (
              <Button variant="ghost" size="sm" className="w-full justify-start text-left">
                <Truck className="h-4 w-4 mr-2" />
                Pedidos Delivery
              </Button>
            )}
            {enabledModules.includes("mesa") && (
              <Button variant="ghost" size="sm" className="w-full justify-start text-left">
                <Utensils className="h-4 w-4 mr-2" />
                Controle de Mesas
              </Button>
            )}
            {enabledModules.includes("comanda") && (
              <Button variant="ghost" size="sm" className="w-full justify-start text-left">
                <ScrollText className="h-4 w-4 mr-2" />
                Comandas
              </Button>
            )}
            {enabledModules.includes("orcamento") && (
              <Button variant="ghost" size="sm" className="w-full justify-start text-left">
                <FileText className="h-4 w-4 mr-2" />
                Orçamentos
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}