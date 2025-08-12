import { EscPosBuilder } from "./escpos";
import { ensurePrinter, printRaw } from "./webusb";
import { loadSettings } from "@/store/settings";
import { Sector } from "@/types/product";

function currency(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export async function ensurePrinterConnected() {
  return ensurePrinter();
}

type Payment = { method: string; amount: number };

export async function printSaleReceipt(args: {
  items: { name: string; qty: number; price: number; unit?: string }[];
  subtotal: number;
  orderDiscount: number;
  total: number;
  payments: Payment[];
  change: number;
}) {
  const s = loadSettings();
  const b = new EscPosBuilder().init();
  const now = new Date();

  b.align("center").bold(true).ln(s.businessName || "PDV")
    .bold(false)
    .ln(s.slogan || "")
    .ln(s.cnpj ? `CNPJ: ${s.cnpj}` : "")
    .ln(s.phone || "")
    .ln(s.address || "")
    .separator();

  b.align("left");
  b.kv("Data/Hora", now.toLocaleString("pt-BR"));
  for (const it of args.items) {
    b.ln(`${it.name}`);
    const qty = it.qty.toLocaleString("pt-BR", { minimumFractionDigits: it.unit === "kg" ? 3 : 0 });
    b.kv(`${qty} ${it.unit ?? ""} x ${currency(it.price)}`.trim(), currency(it.price * it.qty));
  }
  b.separator();
  b.kv("Itens", String(args.items.length));
  b.kv("Subtotal", currency(args.subtotal));
  if (args.orderDiscount > 0) b.kv("Desconto", `- ${currency(args.orderDiscount)}`);
  b.kv("Total", currency(args.total));
  b.separator();
  for (const p of args.payments) b.kv(p.method, currency(p.amount));
  if (args.change > 0) b.kv("Troco", currency(args.change));
  b.feed(2).align("center").ln("Obrigado pela preferência!").feed(3).cut();

  await ensurePrinter();
  await printRaw(b.build());
}

export async function printSectorTickets(items: { name: string; qty: number; note?: string; printSector?: Sector }[]) {
  const groups = new Map<Sector | "sem_setor", typeof items>();
  for (const it of items) {
    const key = (it.printSector || "sem_setor") as Sector | "sem_setor";
    if (!groups.has(key)) groups.set(key, [] as any);
    (groups.get(key) as any).push(it);
  }
  for (const [sector, arr] of groups) {
    if (sector === "sem_setor") continue; // pule tickets sem setor
    const b = new EscPosBuilder().init();
    b.align("center").bold(true).ln(`SETOR: ${String(sector).toUpperCase()}`).bold(false).separator();
    b.align("left");
    for (const it of arr) {
      b.ln(`${it.name}`);
      b.kv("Qtd", it.qty.toLocaleString("pt-BR"));
      if (it.note) b.ln(`Obs: ${it.note}`);
      b.separator(".");
    }
    b.feed(2).align("center").ln("- FIM -").feed(2).cut();
    await ensurePrinter();
    await printRaw(b.build());
  }
}
