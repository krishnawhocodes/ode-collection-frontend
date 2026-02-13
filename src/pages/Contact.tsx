import { storeConfig } from "@/config/storeConfig";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <div className="animate-fade-in">
      <div className="container-narrow py-12">
        <h1 className="text-4xl font-display font-bold mb-2 text-center">Contact Us</h1>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
          Have a question about an order or need a custom gift? We're here to help.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info Side */}
          <div className="space-y-8">
            <div className="bg-secondary/20 p-8 rounded-2xl border border-border">
              <h2 className="text-2xl font-bold font-display mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Visit Our Store</h3>
                    <p className="text-muted-foreground">{storeConfig.storeAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Call Us</h3>
                    <p className="text-muted-foreground">
                      <a href={`tel:${storeConfig.phoneNumberTel}`} className="hover:text-primary transition-colors">
                        {storeConfig.phoneNumber}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email Us</h3>
                    <p className="text-muted-foreground">
                      <a href={`mailto:${storeConfig.email}`} className="hover:text-primary transition-colors">
                        {storeConfig.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <Clock className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Opening Hours</h3>
                    <p className="text-muted-foreground">{storeConfig.storeHours}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <a href={`https://wa.me/${storeConfig.whatsappNumber}`} target="_blank" rel="noreferrer">
                  <Button className="w-full h-12 text-lg gap-2 shadow-lg hover:scale-105 transition-transform">
                    <MessageCircle /> Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className="h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg border border-border bg-secondary/10">
            <iframe 
              src={storeConfig.mapEmbedUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Store Location"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
