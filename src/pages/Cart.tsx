import { Link } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/lib/formatCurrency";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const total = totalPrice();
  const shipping = total > 999 ? 0 : 99;

  if (items.length === 0) {
    return (
      <div className="container-narrow py-20 text-center min-h-[60vh] flex flex-col items-center justify-center animate-fade-in">
        <div className="w-24 h-24 bg-secondary/30 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} className="text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md">Looks like you haven't added anything yet. Discover our premium collection of personalized gifts.</p>
        <Link to="/shop">
          <Button size="lg" className="rounded-full px-8">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-narrow py-12 animate-fade-in">
      <h1 className="text-3xl font-display font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={`${item.productId}-${JSON.stringify(item.customization)}`} className="flex gap-4 sm:gap-6 bg-white p-4 rounded-xl border border-border shadow-sm">
              <div className="w-24 h-24 bg-secondary/20 rounded-lg overflow-hidden shrink-0 border border-border/50">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg leading-tight mb-1">{item.name}</h3>
                    <p className="text-sm text-primary font-medium mb-2">{formatCurrency(item.price)}</p>
                  </div>
                  <button 
                    onClick={() => removeItem(item.productId)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {item.customization && (
                  <div className="text-xs text-muted-foreground bg-secondary/30 p-2 rounded-md mb-3">
                    {item.customization.text && <p>Text: <span className="font-medium">{item.customization.text}</span></p>}
                    {item.customization.hasPhoto && <p>Photo: <span className="font-medium">Attached</span></p>}
                  </div>
                )}

                <div className="mt-auto flex items-center gap-3">
                  <div className="flex items-center border border-input rounded-md h-8">
                    <button 
                      className="w-8 h-full flex items-center justify-center hover:bg-secondary rounded-l-md"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      className="w-8 h-full flex items-center justify-center hover:bg-secondary rounded-r-md"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="ml-auto font-bold">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-border shadow-md sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{formatCurrency(total + shipping)}</span>
              </div>
            </div>
            <Link to="/checkout">
              <Button className="w-full h-12 text-lg shadow-lg">
                Proceed to Checkout <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <div className="mt-4 text-xs text-center text-muted-foreground">
              Secure checkout. Online payment gateway will be added in the final website.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
