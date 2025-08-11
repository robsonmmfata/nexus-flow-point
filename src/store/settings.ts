import { useEffect, useState } from "react";

const LS_KEY = "pdv-settings-v1";

export type AppSettings = {
  businessName?: string;
  slogan?: string;
  cnpj?: string;
  phone?: string;
  address?: string;
  sectorPrinting?: boolean;
  receiptCopies?: number;
};

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as AppSettings;
  } catch {
    return {};
  }
}

export function saveSettings(s: AppSettings) {
  localStorage.setItem(LS_KEY, JSON.stringify(s));
}

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>({});
  useEffect(() => setSettings(loadSettings()), []);
  const update = (patch: Partial<AppSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      saveSettings(next);
      return next;
    });
  };
  return { settings, update };
}
