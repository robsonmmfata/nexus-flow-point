import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  StoreNiche, 
  NICHE_MODULE_CONFIG, 
  NICHE_LABELS, 
  MODULE_LABELS,
  useStoreConfig 
} from "@/store/modules";

export default function StoreSetup() {
  const [businessName, setBusinessName] = useState("");
  const [selectedNiche, setSelectedNiche] = useState<StoreNiche>("food_service");
  const { createNewStore } = useStoreConfig();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) return;

    createNewStore(businessName.trim(), selectedNiche);
    navigate("/pdv");
  };

  const selectedModules = NICHE_MODULE_CONFIG[selectedNiche];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Helmet>
        <title>Configuração da Loja — PDV Multi-nicho</title>
        <meta name="description" content="Configure sua loja e módulos habilitados baseados no seu nicho de negócio." />
      </Helmet>

      <Card className="w-full max-w-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-brand to-brand-2 flex items-center justify-center">
            <Store className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Configuração da Loja</h1>
            <p className="text-muted-foreground">Configure sua loja e módulos habilitados</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome da Loja */}
          <div className="space-y-2">
            <Label htmlFor="businessName">Nome da Loja</Label>
            <Input
              id="businessName"
              placeholder="Ex: Restaurante do João"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
          </div>

          {/* Nicho do Negócio */}
          <div className="space-y-4">
            <Label>Nicho do Negócio</Label>
            <RadioGroup value={selectedNiche} onValueChange={(value) => setSelectedNiche(value as StoreNiche)}>
              {Object.entries(NICHE_LABELS).map(([niche, label]) => (
                <div key={niche} className="flex items-start space-x-3 space-y-0">
                  <RadioGroupItem value={niche} id={niche} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={niche} className="text-sm font-medium cursor-pointer">
                      {label}
                    </Label>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {NICHE_MODULE_CONFIG[niche as StoreNiche].map((module) => (
                        <Badge key={module} variant="secondary" className="text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1 text-green-600" />
                          {MODULE_LABELS[module]}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Módulos que serão habilitados */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium mb-3">Módulos que serão habilitados:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedModules.map((module) => (
                <Badge key={module} variant="default" className="bg-brand text-white">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  {MODULE_LABELS[module]}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Você poderá alterar essas configurações posteriormente no painel administrativo.
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={!businessName.trim()}>
            Criar Loja e Acessar PDV
          </Button>
        </form>
      </Card>
    </div>
  );
}