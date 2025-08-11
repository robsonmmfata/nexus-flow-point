import { EscPosBuilder } from "./escpos";

let device: any = null;
let ifaceNumber: number | null = null;
let outEndpointNumber: number | null = null;

function getPrinterInterface(d: any) {
  const config = d.configuration || d.configurations?.[0];
  if (!config) return null;
  for (const iface of config.interfaces) {
    for (const alt of iface.alternates) {
      // 0x07 = printer class
      if (alt.interfaceClass === 0x07 && alt.endpoints?.some((e) => e.direction === "out")) {
        return { iface: iface.interfaceNumber, out: alt.endpoints!.find((e) => e.direction === "out")!.endpointNumber };
      }
    }
  }
  // fallback: any OUT endpoint
  for (const iface of config.interfaces) {
    for (const alt of iface.alternates) {
      const out = alt.endpoints?.find((e) => e.direction === "out");
      if (out) return { iface: iface.interfaceNumber, out: out.endpointNumber };
    }
  }
  return null;
}

export async function requestPrinter(): Promise<boolean> {
  if (!("usb" in navigator)) throw new Error("WebUSB não suportado neste navegador.");
  const d = await (navigator as any).usb.requestDevice({ filters: [{ classCode: 0x07 }] });
  if (!d) return false;
  device = d;
  return openCurrentDevice();
}

export async function openCurrentDevice(): Promise<boolean> {
  if (!device) {
    const list: any[] = await (navigator as any).usb.getDevices();
    device = list[0] || null;
    if (!device) return false;
  }
  if (!device.opened) await device.open();
  if (!device.configuration) await device.selectConfiguration(1);
  const info = getPrinterInterface(device);
  if (!info) throw new Error("Interface de impressora não encontrada.");
  ifaceNumber = info.iface;
  outEndpointNumber = info.out;
  await device.claimInterface(ifaceNumber);
  return true;
}

export async function ensurePrinter(): Promise<boolean> {
  try {
    if (device && device.opened) return true;
    const ok = await openCurrentDevice();
    if (ok) return true;
    return await requestPrinter();
  } catch {
    return await requestPrinter();
  }
}

export async function printRaw(data: Uint8Array) {
  if (!device || !device.opened || outEndpointNumber == null) {
    const ok = await ensurePrinter();
    if (!ok) throw new Error("Impressora não conectada.");
  }
  if (!device) throw new Error("Impressora não encontrada.");
  await device.transferOut(outEndpointNumber!, data);
}

export async function testPrint() {
  const b = new EscPosBuilder()
    .init()
    .align("center").bold(true).ln("TESTE DE IMPRESSÃO")
    .bold(false)
    .separator()
    .align("left")
    .ln("Esta é uma impressão de teste via WebUSB.")
    .ln("Verifique acentos e corte.")
    .feed(2)
    .align("center").ln("Obrigado!")
    .feed(3)
    .cut();
  await printRaw(b.build());
}
