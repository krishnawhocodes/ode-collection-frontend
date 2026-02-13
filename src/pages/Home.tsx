import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Truck, ShieldCheck, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductCard } from "@/components/product/ProductCard";
import { getBestSellers, categories, occasions } from "@/data/products";
import { storeConfig } from "@/config/storeConfig";

export default function Home() {
  const bestSellers = getBestSellers();

  const categoryImages: Record<string, string> = {
    'Photo Frames': '/images/products/photo-frames-collage.jpg',
    'Mugs & Drinkware': '/images/products/mugs-king-queen.jpg',
    'T-Shirts & Apparel': '/images/products/tshirt-big-brother.jpg',
    'Cushions & Pillows': '/images/products/mock-cushion.jpg',
    'Keychains & Accessories': '/images/products/custom-name-towel.jpg',
    'Clocks & Wall Art': '/images/products/dryfruit-platter.jpg',
    'Gift Hampers': '/images/products/chocolate-hamper.jpg',
    'Figurines & Showpieces': '/images/products/swan-love-lamp.jpg',
  };
  const instagramImages = [
    '/images/products/mugs-king-queen.jpg',
    '/images/products/teddy-box-roses.jpg',
    '/images/products/tshirt-big-brother.jpg',
    '/images/products/photo-frame-babyhands.jpg',
    '/images/products/chocolate-hamper.jpg',
    '/images/products/rose-bouquet.jpg',
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-rose-soft">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('/images/hero/hero.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white" />
        
        <div className="container-narrow relative z-10 text-center space-y-8 animate-fade-in">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-sm font-semibold text-primary tracking-wider uppercase border border-primary/10 shadow-sm animate-slide-up">
            Premium Gifting Experience
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight tracking-tight drop-shadow-sm">
            Make Every Moment <br />
            <span className="text-primary italic">Unforgettable</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Discover our curated collection of premium personalized gifts. 
            Handcrafted with love in Indore, delivered with care worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/shop">
              <Button size="lg" className="rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/customize">
              <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg bg-white/50 backdrop-blur-sm hover:bg-white border-primary/20 text-primary hover:text-primary">
                Create Custom Gift
              </Button>
            </Link>
          </div>

          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto opacity-80">
            <div className="flex flex-col items-center gap-2">
              <Truck className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Quality Guarantee</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Gift className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Premium Packaging</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Star className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">5-Star Rated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-narrow">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-4">Shop by Category</h2>
          <p className="section-subheading mx-auto">Find the perfect gift for every style and taste.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {categories.slice(0, 4).map((cat, i) => (
            <Link key={cat} to={`/shop?category=${cat}`} className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all">
              <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 transition-opacity duration-300 opacity-80 group-hover:opacity-90`} />
              <img 
                src={categoryImages[cat] || '/images/products/photo-frames-collage.jpg'} 
                alt={cat}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="font-display text-xl font-bold mb-1">{cat}</h3>
                <span className="text-xs font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity delay-100">Explore Collection &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-secondary/20 py-20">
        <div className="container-narrow">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="section-heading mb-2">Best Sellers</h2>
              <p className="section-subheading">Our most loved personalized gifts.</p>
            </div>
            <Link to="/shop?sort=bestsellers" className="hidden md:flex items-center text-primary font-medium hover:underline">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/shop">
              <Button variant="outline" className="rounded-full w-full">View All Best Sellers</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="container-narrow">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-4">Shop by Occasion</h2>
          <p className="section-subheading mx-auto">Celebrate life's special moments.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {occasions.map((occ) => (
            <Link key={occ} to={`/shop?occasion=${occ}`}>
              <Button variant="outline" className="rounded-full px-6 py-6 h-auto text-base hover:bg-primary hover:text-white hover:border-primary transition-all">
                {occ}
              </Button>
            </Link>
          ))}
        </div>
      </section>

      {/* Customization Highlight */}
      <section className="container-narrow my-20">
        <div className="bg-primary text-primary-foreground rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="absolute inset-0 bg-[url('/images/products/rose-bouquet.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay" />
          <div className="grid md:grid-cols-2 gap-12 items-center p-8 md:p-16 relative z-10">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                Create Your Unique Masterpiece
              </h2>
              <p className="text-lg opacity-90 max-w-md">
                Use our interactive Customization Studio to design your own gifts. Preview photos, text, and styles in real-time before you buy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/customize">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto font-bold text-primary">
                    Start Designing Now
                  </Button>
                </Link>
                <Link to="/shop?filter=customizable">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:text-white">
                    Browse Customizable Gifts
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              {/* Abstract decorative elements simulating a preview interface */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-[4/3] bg-black/20 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-white/50 font-display text-2xl">Your Photo Here</span>
                </div>
                <div className="h-4 bg-white/20 rounded w-3/4 mb-2" />
                <div className="h-4 bg-white/20 rounded w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-rose-soft/50 py-20">
        <div className="container-narrow text-center">
          <h2 className="section-heading mb-12">Loved by Thousands</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-center gap-1 text-gold mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-6">"Absolutely stunning quality! The engraving on the wooden frame was perfect. My husband loved his anniversary gift. Highly recommend!"</p>
                <div className="font-bold font-display text-lg">– Priya Sharma</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Indore</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed Placeholder */}
      <section className="container-narrow pb-20">
        <div className="text-center mb-8">
          <h2 className="section-heading mb-2">Follow Us @{storeConfig.name.replace(/\s/g, '').toLowerCase()}</h2>
          <a href={storeConfig.socialLinks.instagram} target="_blank" rel="noreferrer" className="text-primary font-medium hover:underline">
            Join our community on Instagram
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square bg-secondary/30 rounded-lg overflow-hidden group relative">
              <img 
                src={instagramImages[i % instagramImages.length]} 
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Star fill="currentColor" size={24} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
