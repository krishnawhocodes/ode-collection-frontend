import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductBySlug, getRelatedProducts, Product } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/lib/formatCurrency";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductCard } from "@/components/product/ProductCard";
import { Star, Truck, ShieldCheck, Check, Info } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug || "");

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  // Customization State
  const [customText, setCustomText] = useState("");
  const [selectedFont, setSelectedFont] = useState("Playfair Display");
  const [customPhoto, setCustomPhoto] = useState<File | null>(null);
  const [customNotes, setCustomNotes] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product);

  const handleAddToCart = () => {
    // Validation
    if (product.isCustomizable) {
      if (product.customizationType === "text" || product.customizationType === "both") {
        if (!customText && !customNotes) {
          toast.error("Please add your custom text or notes.");
          return;
        }
      }
      if (product.customizationType === "photo" || product.customizationType === "both") {
        if (!customPhoto && !customNotes) {
          toast.warning("You haven't uploaded a photo. You can add it now, or mention it in notes and we’ll collect it during confirmation.");
        }
      }
    }

    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      customization: product.isCustomizable ? {
        text: customText,
        font: selectedFont,
        hasPhoto: !!customPhoto,
        photoFileName: customPhoto?.name,
        notes: customNotes
      } : undefined
    });

    toast.success("Added to cart successfully!");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setCustomPhoto(file);
      toast.success("Photo uploaded successfully!");
    }
  };

  return (
    <div className="container-narrow py-8 animate-fade-in">
      {/* Breadcrumbs (Simple) */}
      <div className="text-sm text-muted-foreground mb-6">
        <span className="cursor-pointer hover:text-primary" onClick={() => navigate("/")}>Home</span>
        <span className="mx-2">/</span>
        <span className="cursor-pointer hover:text-primary" onClick={() => navigate("/shop")}>Shop</span>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-20">
        {/* Images Column */}
        <div className="space-y-4">
          <div className="aspect-square bg-secondary/10 rounded-2xl overflow-hidden relative group border border-border">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {product.previewEnabled && customText && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div 
                  className="bg-black/30 px-6 py-4 rounded-lg backdrop-blur-sm text-white text-2xl font-bold text-center transform rotate-[-5deg]"
                  style={{ fontFamily: selectedFont }}
                >
                  {customText}
                </div>
              </div>
            )}
            {product.isCustomizable && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 text-primary backdrop-blur">Customizable</Badge>
              </div>
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                  activeImage === idx ? "border-primary ring-2 ring-primary/20" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details Column */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 text-sm mb-4">
              <div className="flex items-center gap-1 text-gold">
                <Star size={16} fill="currentColor" />
                <span className="font-bold text-foreground">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">{product.reviewsCount} Reviews</span>
              <span className="w-1 h-1 bg-muted-foreground rounded-full" />
              <span className="text-primary font-medium">{product.category}</span>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-primary">{formatCurrency(product.price)}</span>
              {product.mrp && (
                <span className="text-xl text-muted-foreground line-through decoration-red-500/50 decoration-2">
                  {formatCurrency(product.mrp)}
                </span>
              )}
            </div>
          </div>

          <Separator />

          <p className="text-muted-foreground leading-relaxed">{product.longDescription}</p>

          {/* Customization Panel */}
          {product.isCustomizable && (
            <div className="bg-secondary/30 p-6 rounded-xl border border-border space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-white">Personalization</Badge>
                <span className="text-xs text-muted-foreground">Customize this gift exactly how you want it.</span>
              </div>

              {(product.customizationType === "text" || product.customizationType === "both") && (
                <div className="space-y-3">
                  <Label htmlFor="custom-text">Enter Name or Message</Label>
                  <Input
                    id="custom-text"
                    placeholder="e.g. Happy Birthday Rahul"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    maxLength={50}
                    className="bg-white"
                  />
                  <div className="space-y-2">
                    <Label>Choose Font Style</Label>
                    <Select value={selectedFont} onValueChange={setSelectedFont}>
                      <SelectTrigger className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Playfair Display"><span style={{ fontFamily: 'Playfair Display' }}>Classic Serif</span></SelectItem>
                        <SelectItem value="DM Sans"><span style={{ fontFamily: 'DM Sans' }}>Modern Sans</span></SelectItem>
                        <SelectItem value="Cursive"><span style={{ fontFamily: 'cursive' }}>Handwritten</span></SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {(product.customizationType === "photo" || product.customizationType === "both") && (
                <div className="space-y-3">
                  <Label>Upload Photo</Label>
                  <div className="flex gap-3 items-center">
                    <Button 
                      variant="outline" 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white w-full border-dashed"
                    >
                      {customPhoto ? "Change Photo" : "Select Image"}
                    </Button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handlePhotoUpload} 
                    />
                  </div>
                  {customPhoto && (
                    <div className="text-xs text-green-600 flex items-center gap-1">
                      <Check size={12} /> {customPhoto.name}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG. Max 5MB.</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes">Special Instructions (Optional)</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any specific requests for the designer?" 
                  className="bg-white h-20"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <div className="w-32 flex items-center border border-input rounded-md">
              <button 
                className="w-10 h-10 flex items-center justify-center hover:bg-secondary"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="flex-1 text-center font-medium">{quantity}</span>
              <button 
                className="w-10 h-10 flex items-center justify-center hover:bg-secondary"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <Button className="flex-1 h-12 text-lg shadow-lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button variant="secondary" className="flex-1 h-12 text-lg border border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground pt-6 border-t border-border">
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-primary" />
              <span>{product.deliveryNote}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-primary" />
              <span>Secure Payments</span>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      {/* Related Products */}
      <section>
        <h2 className="section-heading mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
