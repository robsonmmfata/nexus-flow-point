import { useEffect, useState } from "react";
import { CatalogProduct } from "@/types/product";

const LS_KEY = "catalog-products-v1";

function nowISO() {
  return new Date().toISOString();
}

const seed: CatalogProduct[] = [
  {
    id: crypto.randomUUID(),
    sku: "CAM-001",
    barcode: "7890000000011",
    name: "Camiseta Básica",
    description: "Camiseta 100% algodão",
    price: 49.9,
    cost: 25,
    margin: 99, // apenas ilustrativo
    unit: "un",
    category: "Vestuário",
    type: "unit",
    visible: true,
    perishable: false,
    divisible: false,
    weighable: false,
    scaleEnabled: false,
    printSector: "balcao",
    image: undefined,
    composition: [],
    createdAt: nowISO(),
    updatedAt: nowISO(),
  },
  {
    id: crypto.randomUUID(),
    sku: "BAL-BANANA",
    barcode: "2001234567890",
    name: "Banana Prata (kg)",
    description: "Fruta fresca",
    price: 7.99,
    cost: 4.3,
    margin: 86,
    unit: "kg",
    category: "Hortifruti",
    type: "weight",
    visible: true,
    perishable: true,
    divisible: true,
    weighable: true,
    scaleEnabled: true,
    printSector: "balcao",
    createdAt: nowISO(),
    updatedAt: nowISO(),
  },
  {
    id: crypto.randomUUID(),
    sku: "PIZ-MUS",
    barcode: "7890000000097",
    name: "Pizza Mussarela (fatia)",
    description: "Fatia de pizza",
    price: 9.9,
    cost: 4.0,
    margin: 80,
    unit: "un",
    category: "Pizzaria",
    type: "unit",
    visible: true,
    perishable: true,
    divisible: true,
    weighable: false,
    scaleEnabled: false,
    printSector: "pizzaria",
    createdAt: nowISO(),
    updatedAt: nowISO(),
  },
  {
    id: crypto.randomUUID(),
    sku: "PIZ-MEIA",
    barcode: "7890000000103",
    name: "Pizza (1/2 a 1/2)",
    description: "Pizza meia a meia",
    price: 49.9,
    cost: 28,
    margin: 78,
    unit: "un",
    category: "Pizzaria",
    type: "pizza_half",
    visible: true,
    perishable: true,
    divisible: true,
    weighable: false,
    scaleEnabled: false,
    printSector: "pizzaria",
    pizzaPricingRule: "higher",
    composition: [],
    createdAt: nowISO(),
    updatedAt: nowISO(),
  },
  {
    id: crypto.randomUUID(),
    sku: "CAF-ESP",
    barcode: "7890000000028",
    name: "Café Espresso",
    description: "Dose simples",
    price: 6.0,
    cost: 1.5,
    margin: 120,
    unit: "un",
    category: "Bebidas",
    type: "service",
    visible: true,
    perishable: false,
    divisible: false,
    weighable: false,
    scaleEnabled: false,
    printSector: "bar",
    createdAt: nowISO(),
    updatedAt: nowISO(),
  },
];

function load(): CatalogProduct[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) {
      localStorage.setItem(LS_KEY, JSON.stringify(seed));
      return seed;
    }
    const arr = JSON.parse(raw) as CatalogProduct[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function save(items: CatalogProduct[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

export function useProducts() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);

  useEffect(() => {
    setProducts(load());
  }, []);

  const addProduct = (data: Omit<CatalogProduct, "id" | "createdAt" | "updatedAt">) => {
    const item: CatalogProduct = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    setProducts((prev) => {
      const next = [item, ...prev];
      save(next);
      return next;
    });
  };

  const updateProduct = (id: string, updates: Partial<CatalogProduct>) => {
    setProducts((prev) => {
      const next = prev.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: nowISO() } : p
      );
      save(next);
      return next;
    });
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      save(next);
      return next;
    });
  };

  const clearAll = () => {
    save([]);
    setProducts([]);
  };

  return { products, addProduct, updateProduct, removeProduct, clearAll };
}
