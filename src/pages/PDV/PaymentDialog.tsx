import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function currency(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export type Payment = { method: string; amount: number };

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  total: number;
  payments: Payment[];
  onAddPayment: (p: Payment) => void;
  onRemovePayment: (index: number) => void;
  onFinalize: () => void;
  onQuickPay?: (method: string) => void;
}

const methods = ["Dinheiro", "Pix", "Crédito", "Débito", "Boleto", "Fiado"];

export default function PaymentDialog({
  open,
  onOpenChange,
  total,
  payments,
  onAddPayment,
  onRemovePayment,
  onFinalize,
  onQuickPay,
}: PaymentDialogProps) {
  const [method, setMethod] = useState<string>(methods[0]);
  const [amount, setAmount] = useState<number>(0);

  const paid = useMemo(() => payments.reduce((s, p) => s + (Number.isFinite(p.amount) ? p.amount : 0), 0), [payments]);
  const remaining = Math.max(total - paid, 0);
  const change = Math.max(paid - total, 0);

  const addPayment = () => {
    if (!method || !Number.isFinite(amount) || amount <= 0) return;
    onAddPayment({ method, amount });
    setAmount(0);
  };

  const quickAmounts = [10, 20, 50, 100];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pagamento</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3 items-end">
            <div className="col-span-1">
              <div className="text-xs text-muted-foreground mb-1">Método</div>
              <Select value={method} onValueChange={setMethod as any}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {methods.map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <div className="text-xs text-muted-foreground mb-1">Valor</div>
              <Input
                type="number"
                inputMode="decimal"
                step={0.01}
                min={0}
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                placeholder="0,00"
                className="h-9"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {quickAmounts.map((v) => (
                  <Button key={v} type="button" variant="outline" size="sm" onClick={() => setAmount(v)}>
                    {currency(v)}
                  </Button>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => setAmount(remaining)} disabled={remaining <= 0}>Exato</Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setAmount(total)}>Total</Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => setAmount(0)}>Limpar</Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button variant="secondary" onClick={addPayment}>Adicionar pagamento</Button>
            <div className="text-sm text-muted-foreground">Total: <span className="font-semibold">{currency(total)}</span></div>
          </div>

          <div className="space-y-2 max-h-48 overflow-auto pr-1">
            {payments.length === 0 ? (
              <div className="text-sm text-muted-foreground">Nenhum pagamento adicionado.</div>
            ) : (
              payments.map((p, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="text-sm">{p.method}</div>
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{currency(p.amount)}</div>
                    <Button size="sm" variant="ghost" onClick={() => onRemovePayment(idx)}>Remover</Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <DialogFooter>
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Pago</span>
              <span className="font-medium">{currency(paid)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Restante</span>
              <span className="font-medium">{currency(remaining)}</span>
            </div>
            {change > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Troco</span>
                <span className="font-medium">{currency(change)}</span>
              </div>
            )}
            <div className="flex items-center justify-between gap-3 pt-2">
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => onQuickPay?.("Dinheiro")}>Exato em Dinheiro</Button>
                <Button type="button" variant="outline" onClick={() => onQuickPay?.("Pix")}>Exato no Pix</Button>
              </div>
              <Button onClick={onFinalize} disabled={remaining > 1e-6}>Finalizar</Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
