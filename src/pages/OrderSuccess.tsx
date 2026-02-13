import { useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getLastOrder, buildOrderReceipt } from "@/lib/orders";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Receipt, ShoppingBag, CreditCard } from "lucide-react";
import { toast } from "sonner";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const order = useMemo(() => getLastOrder(), []);

  const isValid = !!order && !!orderId && order.id === orderId;

  if (!isValid) {
    return (
      <div className="container-narrow py-20 text-center min-h-[60vh] flex flex-col items-center justify-center animate-fade-in">
        <div className="w-20 h-20 bg-secondary/30 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-3">Order not found</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          This is a demo checkout. If you refreshed or opened a new tab, the demo order may not be available.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/shop")}>Back to Shop</Button>
          <Button onClick={() => navigate("/cart")}>Go to Cart</Button>
        </div>
      </div>
    );
  }

  const receiptText = buildOrderReceipt(order);

  const handleCopyReceipt = async () => {
    try {
      await navigator.clipboard.writeText(receiptText);
      toast.success("Order receipt copied");
    } catch {
      toast.error("Couldn't copy. Please select and copy manually.");
    }
  };

  const handlePayNow = () => {
    toast.message("Payment gateway will be integrated in the final website.");
  };

  return (
    <div className="container-narrow py-16 animate-fade-in">
      <div className="text-center mb-10">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-4xl font-display font-bold mb-3">Order Placed</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          This is a fully working frontend demo. In the final build, we’ll connect payment + order management.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <Receipt size={18} className="text-primary" /> Order Details
          </h2>

          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-mono font-semibold">{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-medium">
                {order.checkout.deliveryMethod === "pickup" ? "Store Pickup" : "Home Delivery"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment</span>
              <span className="font-medium">
                {order.checkout.paymentMethod === "upi" ? "Online Payment" : "Cash on Delivery"}
              </span>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="w-16 h-16 bg-secondary/20 rounded-lg overflow-hidden border border-border/50 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold leading-tight">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  {item.customization?.text && (
                    <p className="text-xs text-muted-foreground">Text: {item.customization.text}</p>
                  )}
                  {item.customization?.hasPhoto && (
                    <p className="text-xs text-muted-foreground">Photo: uploaded</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-secondary/20 rounded-2xl border border-border p-6">
          <h2 className="text-xl font-bold mb-4">Next Step</h2>

          <div className="bg-white rounded-xl border border-border p-5 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <CreditCard size={18} />
              </div>
              <div>
                <p className="font-bold">Payment Gateway Integration</p>
                <p className="text-sm text-muted-foreground">
                  In the production website we will integrate Razorpay / Cashfree / Stripe and an admin panel to manage orders.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1 h-12" onClick={handlePayNow}>
              Pay Now (Demo)
            </Button>
            <Button variant="outline" className="h-12" onClick={handleCopyReceipt}>
              Copy Receipt
            </Button>
          </div>

          <div className="mt-6 text-sm text-muted-foreground">
            Want to explore more? <Link to="/shop" className="text-primary font-semibold hover:underline">Continue shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
