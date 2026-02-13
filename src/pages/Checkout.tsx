import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCartStore } from "@/store/useCartStore";
import { CheckoutDetails, createOrderId, saveLastOrder } from "@/lib/orders";
import { formatCurrency } from "@/lib/formatCurrency";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { MapPin, CreditCard } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().min(10, "Full address is required"),
  pincode: z.string().min(6, "Valid pincode is required"),
  deliveryMethod: z.enum(["delivery", "pickup"]),
  paymentMethod: z.enum(["cod", "upi"]),
});

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isPlacing, setIsPlacing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deliveryMethod: "delivery",
      paymentMethod: "upi",
    },
  });

  const total = totalPrice();
  const shipping = total > 999 ? 0 : 99;

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsPlacing(true);

    const checkoutData: CheckoutDetails = {
      name: values.name,
      phone: values.phone,
      address: values.address,
      pincode: values.pincode,
      deliveryMethod: values.deliveryMethod,
      paymentMethod: values.paymentMethod,
      email: values.email || undefined,
    };

    const subtotal = total;
    const orderId = createOrderId();
    const order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items,
      checkout: checkoutData,
      totals: {
        subtotal,
        shipping,
        total: subtotal + shipping,
      },
    };

    saveLastOrder(order);
    clearCart();
    toast.success("Order created! (Demo)");
    navigate(`/order-success/${orderId}`);
    setIsPlacing(false);
  }

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="container-narrow py-12 animate-fade-in">
      <h1 className="text-3xl font-display font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="bg-white p-6 rounded-xl border border-border shadow-sm space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <MapPin size={20} className="text-primary" /> Delivery Details
                </h2>
                
                <FormField
                  control={form.control}
                  name="deliveryMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="delivery" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex-1">
                              Home Delivery (Standard Shipping)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="pickup" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex-1">
                              Store Pickup (MG Road, Indore)
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="col-span-2 sm:col-span-1">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="col-span-2 sm:col-span-1">
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl><Input placeholder="9876543210" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (Optional)</FormLabel>
                      <FormControl><Input placeholder="john@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Address</FormLabel>
                      <FormControl><Textarea placeholder="House No, Street, Area" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pincode</FormLabel>
                      <FormControl><Input placeholder="452001" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-white p-6 rounded-xl border border-border shadow-sm space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <CreditCard size={20} className="text-primary" /> Payment Method
                </h2>
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0 border p-3 rounded-md has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors">
                            <FormControl>
                              <RadioGroupItem value="upi" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex-1">
                              Online Payment (Gateway coming soon)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 border p-3 rounded-md has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors">
                            <FormControl>
                              <RadioGroupItem value="cod" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex-1">
                              Cash on Delivery
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold shadow-xl" disabled={isPlacing}>
                {isPlacing ? "Creating Order..." : "Place Order"}
              </Button>
            </form>
          </Form>
        </div>

        <div>
          <div className="bg-secondary/20 p-6 rounded-xl border border-border sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3 text-sm">
                  <div className="w-16 h-16 bg-white rounded border overflow-hidden shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium line-clamp-2">{item.name}</p>
                    <p className="text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-medium">{formatCurrency(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span className="text-primary">{formatCurrency(total + shipping)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
