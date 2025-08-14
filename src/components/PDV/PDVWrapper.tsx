import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { useStoreConfig } from "@/store/modules";

interface PDVWrapperProps {
  children: ReactNode;
}

export default function PDVWrapper({ children }: PDVWrapperProps) {
  const { hasStore } = useStoreConfig();

  if (!hasStore) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Configure sua loja</h2>
          <p className="text-muted-foreground mb-6">
            Antes de usar o PDV, você precisa configurar sua loja e definir quais módulos estarão habilitados.
          </p>
          <Button asChild className="w-full">
            <Link to="/store-setup">Configurar Loja</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}