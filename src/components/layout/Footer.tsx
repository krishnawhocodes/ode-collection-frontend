import { storeConfig } from "@/config/storeConfig";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/30 pt-16 pb-8 border-t border-border">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-display font-bold text-primary">
              {storeConfig.name}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {storeConfig.tagline}. <br />
              {storeConfig.trustLine}.
              <br />
              Making moments special with premium personalized gifts.
            </p>
            <div className="flex gap-4 pt-2">
              <a href={storeConfig.socialLinks.instagram} target="_blank" rel="noreferrer" className="text-foreground/60 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href={storeConfig.socialLinks.facebook} target="_blank" rel="noreferrer" className="text-foreground/60 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href={storeConfig.socialLinks.twitter} target="_blank" rel="noreferrer" className="text-foreground/60 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/shop" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link to="/shop?sort=bestsellers" className="hover:text-primary transition-colors">Best Sellers</Link></li>
              <li><Link to="/customize" className="hover:text-primary transition-colors">Customization Studio</Link></li>
              <li><Link to="/corporate" className="hover:text-primary transition-colors">Corporate Gifting</Link></li>
              <li><Link to="/cart" className="hover:text-primary transition-colors">My Cart</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg mb-4">Visit Us</h3>
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <MapPin size={18} className="shrink-0 mt-0.5 text-primary" />
              <span>{storeConfig.storeAddress}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone size={18} className="shrink-0 text-primary" />
              <a href={`tel:${storeConfig.phoneNumberTel}`} className="hover:text-foreground">{storeConfig.phoneNumber}</a>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail size={18} className="shrink-0 text-primary" />
              <a href={`mailto:${storeConfig.email}`} className="hover:text-foreground">{storeConfig.email}</a>
            </div>
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <Clock size={18} className="shrink-0 mt-0.5 text-primary" />
              <span>{storeConfig.storeHours}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {storeConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Made with ❤️ in Indore</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
