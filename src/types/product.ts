export type ProductType = "unit" | "weight" | "service" | "combo" | "pizza_half";

export type Sector =
  | "balcao"
  | "cozinha"
  | "pizzaria"
  | "bar"
  | "padaria"
  | "bebidas"
  | "expedicao";

export interface CompositionItem {
  productId?: string; // opcional, pode referenciar outro produto
  name?: string; // nome livre para composições rápidas
  qty: number; // quantidade/unidade a baixar
}

export interface CatalogProduct {
  id: string;
  sku?: string;
  barcode?: string; // EAN/código de barras
  name: string;
  description?: string;
  abbreviation?: string; // para impressão/etiqueta
  price: number; // preço de venda
  cost?: number; // custo
  margin?: number; // % calculada (opcional)
  unit?: string; // un, kg, g, lt, etc.
  category?: string;
  type: ProductType;
  visible?: boolean; // visível no PDV
  perishable?: boolean;
  divisible?: boolean;
  weighable?: boolean; // pesável
  scaleEnabled?: boolean; // leitura de balança
  printSector?: Sector; // setor de impressão/produção
  stockSector?: string; // setor de estoque
  image?: string; // data URL
  composition?: CompositionItem[]; // combos/composições
  pizzaPricingRule?: "higher" | "average" | "custom"; // regra de preço para pizza 1/2
  extrasNote?: string; // observações livres
  content?: string; // conteúdo/volume
  chargeService?: boolean; // cobrar serviços
  createdAt: string;
  updatedAt: string;
}
