import type { CartItem } from "@/store/useCartStore";
import { formatCurrency } from "@/lib/formatCurrency";

export interface CheckoutDetails {
  name: string;
  phone: string;
  email?: string;
  address: string;
  pincode: string;
  deliveryMethod: "delivery" | "pickup";
  paymentMethod: "cod" | "upi";
}

export interface OrderTotals {
  subtotal: number;
  shipping: number;
  total: number;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  checkout: CheckoutDetails;
  totals: OrderTotals;
}

export function createOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `ODE-${ts}-${rand}`;
}

export function buildOrderReceipt(order: Order): string {
  const lines: string[] = [];
  lines.push(`Order ID: ${order.id}`);
  lines.push(`Date: ${new Date(order.createdAt).toLocaleString()}`);
  lines.push("");
  lines.push("Customer:");
  lines.push(`- Name: ${order.checkout.name}`);
  lines.push(`- Phone: ${order.checkout.phone}`);
  if (order.checkout.email) lines.push(`- Email: ${order.checkout.email}`);
  lines.push(`- Address: ${order.checkout.address}`);
  lines.push(`- Pincode: ${order.checkout.pincode}`);
  lines.push(`- Delivery: ${order.checkout.deliveryMethod === "pickup" ? "Store Pickup" : "Home Delivery"}`);
  lines.push(`- Payment: ${order.checkout.paymentMethod === "upi" ? "Online Payment" : "Cash on Delivery"}`);
  lines.push("");
  lines.push("Items:");

  order.items.forEach((item, idx) => {
    const lineTotal = item.price * item.quantity;
    lines.push(`${idx + 1}. ${item.name} × ${item.quantity} = ${formatCurrency(lineTotal)}`);
    if (item.customization) {
      if (item.customization.text) lines.push(`   • Text: ${item.customization.text}`);
      if (item.customization.font) lines.push(`   • Font: ${item.customization.font}`);
      if (item.customization.hasPhoto) lines.push(`   • Photo: Uploaded (filename: ${item.customization.photoFileName || ""})`);
      if (item.customization.notes) lines.push(`   • Notes: ${item.customization.notes}`);
    }
  });

  lines.push("");
  lines.push(`Subtotal: ${formatCurrency(order.totals.subtotal)}`);
  lines.push(`Shipping: ${order.totals.shipping === 0 ? "Free" : formatCurrency(order.totals.shipping)}`);
  lines.push(`TOTAL: ${formatCurrency(order.totals.total)}`);

  return lines.join("\n");
}

export function saveLastOrder(order: Order) {
  localStorage.setItem("ode-last-order", JSON.stringify(order));
}

export function getLastOrder(): Order | null {
  try {
    const raw = localStorage.getItem("ode-last-order");
    if (!raw) return null;
    return JSON.parse(raw) as Order;
  } catch {
    return null;
  }
}
