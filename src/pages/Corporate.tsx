import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Building2, Gift, Users, Trophy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Corporate() {
  const [formData, setFormData] = useState({
    company: "",
    contact: "",
    phone: "",
    quantity: "",
    budget: "",
    deadline: "",
    branding: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("ode-corporate-request", JSON.stringify({ ...formData, createdAt: new Date().toISOString() }));
    toast.success("Request submitted! We'll contact you shortly.");
    setFormData({
      company: "",
      contact: "",
      phone: "",
      quantity: "",
      budget: "",
      deadline: "",
      branding: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero/hero.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="container-narrow text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-semibold mb-6 border border-white/20">
            Corporate Gifting Solutions
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Make a Lasting Impression
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Premium personalized gifts for your employees, clients, and partners. Branding options available.
          </p>
        </div>
      </div>

      <div className="container-narrow py-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="section-heading mb-6">Why Choose Us?</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0">
                  <Gift size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Premium Curated Hampers</h3>
                  <p className="text-muted-foreground">Handpicked luxury items packaged to perfection.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Company Branding</h3>
                  <p className="text-muted-foreground">Your logo on products, ribbons, and cards.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Bulk Order Discounts</h3>
                  <p className="text-muted-foreground">Attractive pricing for large volume orders.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0">
                  <Trophy size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Employee Recognition</h3>
                  <p className="text-muted-foreground">Awards and trophies for your star performers.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl border border-border">
            <h3 className="text-2xl font-bold font-display mb-6 text-center">Request a Quote</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" required value={formData.company} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Person</Label>
                  <Input id="contact" required value={formData.contact} onChange={handleChange} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" required value={formData.phone} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Approx Quantity</Label>
                  <Input id="quantity" placeholder="e.g. 50 hampers" required value={formData.quantity} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Per Unit</Label>
                  <Input id="budget" placeholder="e.g. ₹1000-1500" value={formData.budget} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Required By</Label>
                <Input id="deadline" type="date" value={formData.deadline} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="branding">Requirements / Branding Needs</Label>
                <Textarea id="branding" placeholder="Describe your requirements..." className="h-24" value={formData.branding} onChange={handleChange} />
              </div>

              <Button type="submit" size="lg" className="w-full text-lg shadow-lg">
                Submit Quote Request
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
