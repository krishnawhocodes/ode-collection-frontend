import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { formatCurrency } from "@/lib/formatCurrency";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });
    toast.success("Added to cart!");
  };

  return (
    <Link to={`/product/${product.slug}`} className="group block h-full">
      <div className="h-full glass-card overflow-hidden flex flex-col relative">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.tags.includes("bestseller") && (
            <Badge className="bg-gold text-white border-none shadow-sm">Bestseller</Badge>
          )}
          {product.isCustomizable && (
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">Customizable</Badge>
          )}
        </div>

        {/* Image Container */}
        <div className="aspect-square bg-secondary/20 relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {/* Quick Add Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/50 to-transparent flex justify-center pb-6">
            {!product.isCustomizable && (
              <Button 
                size="sm" 
                className="w-full bg-white text-foreground hover:bg-primary hover:text-white shadow-lg font-semibold transform hover:-translate-y-1 transition-all"
                onClick={handleQuickAdd}
              >
                <ShoppingCart size={16} className="mr-2" /> Quick Add
              </Button>
            )}
            {product.isCustomizable && (
              <Button size="sm" className="w-full bg-primary text-white shadow-lg">
                Customize Now
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {product.category}
          </div>
          <h3 className="font-display font-semibold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-1 mb-3">
            <Star size={14} className="text-gold fill-gold" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewsCount})</span>
          </div>

          <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col">
              <span className="font-bold text-lg">{formatCurrency(product.price)}</span>
              {product.mrp && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(product.mrp)}
                </span>
              )}
            </div>
            {product.mrp && (
              <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded-full">
                {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
