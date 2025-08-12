import { useEffect, useState } from "react";

const LS_KEY = "pdv-settings-v1";

export type EnabledModules = Record<string, boolean>;

export type AppSettings = {
  businessName?: string;
  slogan?: string;
  cnpj?: string;
  phone?: string;
  address?: string;
  sectorPrinting?: boolean; // legacy flag kept for backward compatibility
  receiptCopies?: number;
  niche?: string; // e.g., Mercado, Padaria, Restaurante/Pizza, Vestuário
  enabledModules?: EnabledModules; // feature toggles by slug
};

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as AppSettings;

    // Migration/compatibility: mirror legacy sectorPrinting into modules.kitchenTickets
    if (!parsed.enabledModules) parsed.enabledModules = {};
    if (typeof parsed.sectorPrinting === "boolean" && parsed.enabledModules.kitchenTickets === undefined) {
      parsed.enabledModules.kitchenTickets = parsed.sectorPrinting;
    }
    return parsed;
  } catch {
    return {};
  }
}

export function saveSettings(s: AppSettings) {
  // Keep legacy sectorPrinting in sync if kitchenTickets toggle exists
  const copy = { ...s };
  if (copy.enabledModules && typeof copy.enabledModules.kitchenTickets === "boolean") {
    copy.sectorPrinting = copy.enabledModules.kitchenTickets;
  }
  localStorage.setItem(LS_KEY, JSON.stringify(copy));
}

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>({});
  useEffect(() => setSettings(loadSettings()), []);
  const update = (patch: Partial<AppSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch } as AppSettings;
      // ensure modules/legacy sync
      if (next.enabledModules && typeof next.enabledModules.kitchenTickets === "boolean") {
        next.sectorPrinting = next.enabledModules.kitchenTickets;
      }
      saveSettings(next);
      return next;
    });
  };
  return { settings, update };
}

