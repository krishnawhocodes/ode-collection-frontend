import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories, occasions } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Filter, Search, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialOccasion = searchParams.get("occasion");
  const initialSearch = searchParams.get("search");

  const [searchQuery, setSearchQuery] = useState(initialSearch || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>(
    initialOccasion ? [initialOccasion] : []
  );
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [customizableOnly, setCustomizableOnly] = useState(false);
  const [sortBy, setSortBy] = useState("popular");

  // Reset filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedOccasions([]);
    setPriceRange([0, 5000]);
    setCustomizableOnly(false);
    setSortBy("popular");
    setSearchParams({});
  };

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              p.tags.some(t => t.includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
        const matchesOccasion = selectedOccasions.length === 0 || p.occasion.some(o => selectedOccasions.includes(o));
        const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
        const matchesCustomizable = !customizableOnly || p.isCustomizable;

        return matchesSearch && matchesCategory && matchesOccasion && matchesPrice && matchesCustomizable;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.price - b.price;
        if (sortBy === "price_desc") return b.price - a.price;
        if (sortBy === "newest") return parseInt(b.id) - parseInt(a.id); // Mock logic for newest
        return b.reviewsCount - a.reviewsCount; // Popular by default
      });
  }, [searchQuery, selectedCategories, selectedOccasions, priceRange, customizableOnly, sortBy]);

  const FilterSidebar = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-display font-bold mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox 
                id={`cat-${cat}`} 
                checked={selectedCategories.includes(cat)}
                onCheckedChange={(checked) => {
                  setSelectedCategories(prev => 
                    checked ? [...prev, cat] : prev.filter(c => c !== cat)
                  );
                }}
              />
              <Label htmlFor={`cat-${cat}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                {cat}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display font-bold mb-4">Occasions</h3>
        <div className="space-y-2">
          {occasions.map((occ) => (
            <div key={occ} className="flex items-center space-x-2">
              <Checkbox 
                id={`occ-${occ}`}
                checked={selectedOccasions.includes(occ)}
                onCheckedChange={(checked) => {
                  setSelectedOccasions(prev => 
                    checked ? [...prev, occ] : prev.filter(o => o !== occ)
                  );
                }}
              />
              <Label htmlFor={`occ-${occ}`} className="text-sm font-medium leading-none cursor-pointer">
                {occ}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display font-bold mb-4">Price Range</h3>
        <Slider
          defaultValue={[0, 5000]}
          max={5000}
          step={100}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}+</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="custom-only" 
          checked={customizableOnly}
          onCheckedChange={(checked) => setCustomizableOnly(!!checked)}
        />
        <Label htmlFor="custom-only" className="font-medium cursor-pointer">Customizable Products Only</Label>
      </div>

      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="container-narrow min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Shop Collection</h1>
          <p className="text-muted-foreground">{filteredProducts.length} items found</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-8">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Popularity</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <FilterSidebar />
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-secondary/20 rounded-2xl">
              <h3 className="text-xl font-bold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or search query.</p>
              <Button onClick={clearFilters}>View All Products</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
