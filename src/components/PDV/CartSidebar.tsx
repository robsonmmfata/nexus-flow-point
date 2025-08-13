import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Trash2, Edit3, Plus, Minus } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  unit?: string;
  type?: "unit" | "weight" | "service";
  note?: string;
  discType?: "amount" | "percent";
  discValue?: number;
}

interface CartSidebarProps {
  items: CartItem[];
  onEditItem: (item: CartItem) => void;
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onPayment: () => void;
  onNewSale: () => void;
  subtotal: number;
  orderDiscType: "amount" | "percent";
  orderDiscValue: number;
  onOrderDiscTypeChange: (type: "amount" | "percent") => void;
  onOrderDiscValueChange: (value: number) => void;
  total: number;
}

function currency(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function CartSidebar({
  items,
  onEditItem,
  onRemoveItem,
  onUpdateQuantity,
  onPayment,
  onNewSale,
  subtotal,
  orderDiscType,
  orderDiscValue,
  onOrderDiscTypeChange,
  onOrderDiscValueChange,
  total
}: CartSidebarProps) {
  const orderDiscount = orderDiscType === "amount" ? orderDiscValue : subtotal * (orderDiscValue / 100);

  return (
    <Card className="p-4 sticky top-24 max-h-[calc(100vh-8rem)] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Carrinho</h2>
        <Badge variant="secondary">{items.length} itens</Badge>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {items.map((item, idx) => {
          const itemPrice = item.price * item.qty;
          const itemDiscount = item.discType === "amount" ? (item.discValue || 0) : itemPrice * ((item.discValue || 0) / 100);
          const itemTotal = Math.max(itemPrice - itemDiscount, 0);

          return (
            <div key={`${item.id}-${idx}`} className="bg-muted/50 rounded-lg p-3 space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
                  <div className="text-xs text-muted-foreground">
                    {currency(item.price)} × {item.qty} {item.unit || "un"}
                  </div>
                  {item.note && (
                    <div className="text-xs text-brand italic mt-1">
                      {item.note}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">{currency(itemTotal)}</div>
                  {itemDiscount > 0 && (
                    <div className="text-xs text-destructive line-through">
                      {currency(itemPrice)}
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 w-7 p-0"
                    onClick={() => onUpdateQuantity(item.id, Math.max(item.qty - 1, item.type === "weight" ? 0.001 : 1))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-medium min-w-[2rem] text-center">
                    {item.qty}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 w-7 p-0"
                    onClick={() => onUpdateQuantity(item.id, item.qty + (item.type === "weight" ? 0.1 : 1))}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={() => onEditItem(item)}
                  >
                    <Edit3 className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        {items.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">Carrinho vazio</p>
            <p className="text-xs mt-1">Toque nos produtos para adicionar</p>
          </div>
        )}
      </div>

      {/* Order Summary */}
      {items.length > 0 && (
        <div className="space-y-3 border-t pt-4">
          {/* Order Discount */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Desconto no pedido</div>
            <div className="grid grid-cols-3 gap-2">
              <Select value={orderDiscType} onValueChange={onOrderDiscTypeChange}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amount">R$</SelectItem>
                  <SelectItem value="percent">%</SelectItem>
                </SelectContent>
              </Select>
              <div className="col-span-2">
                <Input
                  type="number"
                  inputMode="decimal"
                  step={orderDiscType === "percent" ? 1 : 0.01}
                  min={0}
                  value={orderDiscValue}
                  onChange={(e) => onOrderDiscValueChange(parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  className="h-8"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Totals */}
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>{currency(subtotal)}</span>
            </div>
            {orderDiscount > 0 && (
              <div className="flex justify-between text-sm text-destructive">
                <span>Desconto:</span>
                <span>-{currency(orderDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-brand">{currency(total)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={onNewSale} size="sm">
              Nova venda
            </Button>
            <Button onClick={onPayment} size="sm" className="bg-brand hover:bg-brand/90">
              Pagamento
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}