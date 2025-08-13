import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Printer, Wifi, Settings, History, Calculator } from "lucide-react";

interface QuickActionsProps {
  onConnectPrinter: () => void;
  onShowHistory?: () => void;
  onOpenSettings?: () => void;
  onOpenCalculator?: () => void;
}

export default function QuickActions({ 
  onConnectPrinter, 
  onShowHistory, 
  onOpenSettings,
  onOpenCalculator 
}: QuickActionsProps) {
  return (
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

        {onOpenSettings && (
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenSettings}
            className="gap-2 h-12"
          >
            <Settings className="h-4 w-4" />
            <div className="text-left">
              <div className="text-xs">Abrir</div>
              <div className="text-xs text-muted-foreground">Configurações</div>
            </div>
          </Button>
        )}
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
  );
}