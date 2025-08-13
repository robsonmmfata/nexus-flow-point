import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  price: number;
  sku?: string;
  type?: "unit" | "weight" | "service";
  unit?: string;
  image?: string;
  category?: string;
}

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  query: string;
}

export default function ProductGrid({ products, onProductClick, query }: ProductGridProps) {
  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

  return (
    <div className="space-y-4">
      {/* Categories Filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => {}}>
            Todas
          </Button>
          {categories.map(category => (
            <Button key={category} variant="ghost" size="sm" onClick={() => {}}>
              {category}
            </Button>
          ))}
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {products.map(p => (
          <Card 
            key={p.id} 
            className="group p-3 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-2 hover:border-brand/20" 
            onClick={() => onProductClick(p)}
          >
            <div className="space-y-2">
              {/* Product Image */}
              {p.image ? (
                <div className="relative overflow-hidden rounded-md">
                  <img 
                    src={p.image} 
                    alt={`Foto de ${p.name}`} 
                    loading="lazy" 
                    className="h-20 w-full object-cover group-hover:scale-110 transition-transform duration-200" 
                  />
                  {p.type === "weight" && (
                    <Badge variant="secondary" className="absolute top-1 right-1 text-xs">
                      Por {p.unit}
                    </Badge>
                  )}
                </div>
              ) : (
                <div className="h-20 rounded-md bg-gradient-to-br from-brand/10 via-brand-2/10 to-brand-3/10 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">{p.category}</span>
                </div>
              )}

              {/* Product Info */}
              <div className="space-y-1">
                <h3 className="font-medium text-sm line-clamp-2 group-hover:text-brand transition-colors">
                  {p.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-brand">
                    {p.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </span>
                  {p.unit && (
                    <Badge variant="outline" className="text-xs">
                      {p.unit}
                    </Badge>
                  )}
                </div>
                {p.sku && (
                  <div className="text-xs text-muted-foreground">
                    SKU: {p.sku}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>Nenhum produto encontrado{query && ` para "${query}"`}</p>
        </div>
      )}
    </div>
  );
}