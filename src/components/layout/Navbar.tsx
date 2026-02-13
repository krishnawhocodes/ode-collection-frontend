import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/useCartStore";
import { categories } from "@/data/products";
import { cn } from "@/lib/utils";
import { storeConfig } from "@/config/storeConfig";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const totalItems = useCartStore((state) => state.totalItems());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          scrolled || isOpen
            ? "bg-white/95 backdrop-blur-md shadow-sm border-border py-2"
            : "bg-transparent py-4",
        )}
      >
        <div className="container-narrow flex items-center justify-between">
          {/* Mobile Menu Button */}
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="lg:hidden p-2 -ml-2 rounded-md text-foreground/80 hover:text-primary hover:bg-secondary/40 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </SheetTrigger>

          {/* Logo */}
          <Link
            to="/"
            className="flex flex-col items-center lg:items-start group"
          >
            <h1 className="text-2xl lg:text-3xl font-display font-bold text-primary tracking-tight transition-transform duration-300 group-hover:scale-105">
              {storeConfig.name}
            </h1>
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground hidden lg:block">
              {storeConfig.trustLine}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-wide"
            >
              Home
            </Link>
            <div className="relative group">
              <Link
                to="/shop"
                className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-wide flex items-center gap-1"
              >
                Shop <ChevronDown size={14} />
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top translate-y-2 group-hover:translate-y-0">
                <div className="w-64 bg-white rounded-xl shadow-xl border border-border p-4 grid gap-2">
                  {categories.slice(0, 6).map((cat) => (
                    <Link
                      key={cat}
                      to={`/shop?category=${encodeURIComponent(cat)}`}
                      className="text-sm text-foreground/80 hover:text-primary hover:bg-secondary/50 px-3 py-2 rounded-lg transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                  <Link
                    to="/shop"
                    className="text-xs font-bold text-primary px-3 py-2 mt-2 border-t border-border/50 uppercase tracking-wider"
                  >
                    View All Categories →
                  </Link>
                </div>
              </div>
            </div>
            <Link
              to="/customize"
              className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-wide"
            >
              Customize
            </Link>
            <Link
              to="/corporate"
              className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-wide"
            >
              Corporate
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-wide"
            >
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/shop">
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex hover:bg-secondary/50"
              >
                <Search size={20} className="text-foreground/80" />
              </Button>
            </Link>
            <Link to="/cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-secondary/50"
                aria-label="Open cart"
              >
                <ShoppingBag size={20} className="text-foreground/80" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full animate-scale-in">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Drawer Menu (Radix Sheet) */}
        <SheetContent side="left" className="w-[85vw] max-w-sm p-0">
          <div className="p-6 border-b border-border bg-white/95">
            <SheetTitle className="text-xl font-display font-bold text-primary tracking-tight">
              {storeConfig.name}
            </SheetTitle>
            <div className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground mt-1">
              {storeConfig.trustLine}
            </div>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto">
            <nav className="flex flex-col gap-5">
              <SheetClose asChild>
                <Link to="/" className="text-lg font-display font-medium">
                  Home
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link to="/shop" className="text-lg font-display font-medium">
                  Shop
                </Link>
              </SheetClose>

              <div className="pl-4 border-l-2 border-border space-y-3">
                {categories.slice(0, 8).map((cat) => (
                  <SheetClose asChild key={cat}>
                    <Link
                      to={`/shop?category=${encodeURIComponent(cat)}`}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {cat}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    to="/shop"
                    className="inline-flex text-xs font-bold text-primary uppercase tracking-wider pt-2"
                  >
                    View all →
                  </Link>
                </SheetClose>
              </div>

              <SheetClose asChild>
                <Link
                  to="/customize"
                  className="text-lg font-display font-medium text-primary"
                >
                  Customization Studio
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  to="/corporate"
                  className="text-lg font-display font-medium"
                >
                  Corporate Orders
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  to="/contact"
                  className="text-lg font-display font-medium"
                >
                  Contact Us
                </Link>
              </SheetClose>
            </nav>
          </div>

          <div className="p-6 border-t border-border bg-secondary/30">
            <div className="text-sm text-muted-foreground mb-2">
              Need help? Call us
            </div>
            <a
              href={`tel:${storeConfig.phoneNumberTel}`}
              className="text-lg font-bold text-foreground block"
            >
              {storeConfig.phoneNumber}
            </a>
          </div>
        </SheetContent>
      </header>
    </Sheet>
  );
}
