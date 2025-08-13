import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Scan } from "lucide-react";

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onEnterSearch: () => void;
  placeholder?: string;
}

export default function SearchBar({ 
  query, 
  onQueryChange, 
  onEnterSearch,
  placeholder = "Buscar por nome, SKU ou código de barras..." 
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <div className={`relative transition-all duration-200 ${isFocused ? 'ring-2 ring-brand/20' : ''} rounded-md`}>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search className="h-4 w-4" />
        </div>
        
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onEnterSearch();
            }
            if (e.key === "Escape") {
              onQueryChange("");
            }
          }}
          className="pl-10 pr-20 h-12 text-base"
        />
        
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onQueryChange("")}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          
          <Button
            size="sm"
            variant="outline"
            onClick={onEnterSearch}
            className="h-8 gap-1"
          >
            <Scan className="h-3 w-3" />
            <span className="hidden sm:inline">Buscar</span>
          </Button>
        </div>
      </div>

      {/* Search Tips */}
      {isFocused && !query && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-card border rounded-lg p-3 shadow-lg z-10">
          <div className="text-xs text-muted-foreground space-y-1">
            <div>💡 <strong>Dicas de busca:</strong></div>
            <div>• Digite o nome do produto ou SKU</div>
            <div>• Cole ou digite código de barras</div>
            <div>• Use Enter para buscar</div>
            <div>• ESC para limpar</div>
          </div>
        </div>
      )}
    </div>
  );
}