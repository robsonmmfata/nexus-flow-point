import { useEffect, useState } from "react";

const LS_KEY = "pdv-store-modules-v1";

export type ModuleType = "delivery" | "balcao" | "mesa" | "comanda" | "orcamento";

export type StoreNiche = "food_service" | "clothing" | "tech_support";

export interface StoreConfig {
  id: string;
  businessName: string;
  niche: StoreNiche;
  enabledModules: ModuleType[];
  createdAt: string;
}

// Configuração padrão dos módulos por nicho
export const NICHE_MODULE_CONFIG: Record<StoreNiche, ModuleType[]> = {
  food_service: ["delivery", "balcao", "mesa", "comanda"],
  clothing: ["delivery", "balcao"],
  tech_support: ["delivery", "balcao", "orcamento"]
};

export const NICHE_LABELS: Record<StoreNiche, string> = {
  food_service: "Food Service (restaurantes, lanchonetes, cafés)",
  clothing: "Loja de Roupas",
  tech_support: "Assistência Técnica"
};

export const MODULE_LABELS: Record<ModuleType, string> = {
  delivery: "Delivery",
  balcao: "Balcão",
  mesa: "Mesa",
  comanda: "Comanda",
  orcamento: "Orçamento"
};

export function loadStoreConfig(): StoreConfig | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoreConfig;
  } catch {
    return null;
  }
}

export function saveStoreConfig(config: StoreConfig) {
  localStorage.setItem(LS_KEY, JSON.stringify(config));
}

export function createStore(businessName: string, niche: StoreNiche): StoreConfig {
  const config: StoreConfig = {
    id: `store_${Date.now()}`,
    businessName,
    niche,
    enabledModules: [...NICHE_MODULE_CONFIG[niche]],
    createdAt: new Date().toISOString()
  };
  
  saveStoreConfig(config);
  return config;
}

export function updateStoreModules(moduleUpdates: Partial<Record<ModuleType, boolean>>) {
  const current = loadStoreConfig();
  if (!current) return;

  const updatedModules = [...current.enabledModules];
  
  Object.entries(moduleUpdates).forEach(([module, enabled]) => {
    const moduleType = module as ModuleType;
    if (enabled && !updatedModules.includes(moduleType)) {
      updatedModules.push(moduleType);
    } else if (!enabled) {
      const index = updatedModules.indexOf(moduleType);
      if (index > -1) updatedModules.splice(index, 1);
    }
  });

  const updated = { ...current, enabledModules: updatedModules };
  saveStoreConfig(updated);
  return updated;
}

export function useStoreConfig() {
  const [config, setConfig] = useState<StoreConfig | null>(null);
  
  useEffect(() => {
    setConfig(loadStoreConfig());
  }, []);

  const createNewStore = (businessName: string, niche: StoreNiche) => {
    const newConfig = createStore(businessName, niche);
    setConfig(newConfig);
    return newConfig;
  };

  const updateModules = (moduleUpdates: Partial<Record<ModuleType, boolean>>) => {
    const updated = updateStoreModules(moduleUpdates);
    if (updated) {
      setConfig(updated);
    }
    return updated;
  };

  const isModuleEnabled = (module: ModuleType): boolean => {
    return config?.enabledModules.includes(module) ?? false;
  };

  return {
    config,
    createNewStore,
    updateModules,
    isModuleEnabled,
    hasStore: !!config
  };
}