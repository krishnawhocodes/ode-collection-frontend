import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { Upload, Move, Type, Image as ImageIcon, Shirt, Coffee, Frame } from "lucide-react";
import { products } from "@/data/products";
import { Separator } from "@/components/ui/separator";

// Mock templates for preview
// Local templates for preview (no external URLs)
const TEMPLATES = {
  frame: '/mockups/frame.png',
  mug: '/mockups/mug.png',
  tshirt: '/mockups/tshirt.png',
};

export default function Customize() {
  const [activeType, setActiveType] = useState<"frame" | "mug" | "tshirt">("frame");
  const [text, setText] = useState("Your Text Here");
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState("Playfair Display");
  const [textColor, setTextColor] = useState("#000000");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  // Interactive positioning state (simplified for demo)
  const [textPos, setTextPos] = useState({ x: 50, y: 50 });
  const [imgPos, setImgPos] = useState({ x: 50, y: 50 });

  const addItem = useCartStore((state) => state.addItem);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    // Find a relevant product based on the active type
    let product;
    if (activeType === "frame") product = products.find(p => p.category === "Photo Frames");
    if (activeType === "mug") product = products.find(p => p.category === "Mugs & Drinkware");
    if (activeType === "tshirt") product = products.find(p => p.category === "T-Shirts & Apparel");

    if (!product) {
      toast.error("Could not find base product.");
      return;
    }

    addItem({
      productId: product.id,
      name: `Custom Designed ${activeType === 'tshirt' ? 'T-Shirt' : activeType.charAt(0).toUpperCase() + activeType.slice(1)}`,
      slug: product.slug,
      price: product.price,
      image: TEMPLATES[activeType],
      quantity: 1,
      customization: {
        text: text,
        font: fontFamily,
        hasPhoto: !!uploadedImage,
        notes: `Custom Design from Studio. Font size: ${fontSize}, Color: ${textColor}`
      }
    });

    toast.success("Custom design added to cart!");
  };

  return (
    <div className="container-narrow py-12 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-display font-bold mb-4">Customization Studio</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Design your perfect gift in real-time. Choose a product, add your photo, personalize the text, and see it come to life.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls Sidebar */}
        <div className="lg:col-span-1 space-y-6 bg-white p-6 rounded-xl border border-border shadow-sm h-fit">
          <div>
            <Label className="mb-2 block font-bold">1. Choose Product</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={activeType === "frame" ? "default" : "outline"} 
                className="flex flex-col gap-1 h-20"
                onClick={() => setActiveType("frame")}
              >
                <Frame size={20} />
                <span className="text-xs">Frame</span>
              </Button>
              <Button 
                variant={activeType === "mug" ? "default" : "outline"} 
                className="flex flex-col gap-1 h-20"
                onClick={() => setActiveType("mug")}
              >
                <Coffee size={20} />
                <span className="text-xs">Mug</span>
              </Button>
              <Button 
                variant={activeType === "tshirt" ? "default" : "outline"} 
                className="flex flex-col gap-1 h-20"
                onClick={() => setActiveType("tshirt")}
              >
                <Shirt size={20} />
                <span className="text-xs">T-Shirt</span>
              </Button>
            </div>
          </div>

          <Separator />

          <div>
            <Label className="mb-2 block font-bold">2. Add Photo</Label>
            <Button 
              variant="secondary" 
              className="w-full border-dashed border-2 h-24 flex flex-col gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={24} />
              <span>{uploadedImage ? "Change Image" : "Upload Image"}</span>
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="block font-bold">3. Add Text</Label>
            <Input 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              placeholder="Enter your text"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs mb-1 block">Font</Label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Playfair Display">Serif</SelectItem>
                    <SelectItem value="DM Sans">Sans</SelectItem>
                    <SelectItem value="cursive">Script</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs mb-1 block">Color</Label>
                <div className="flex items-center gap-2 border rounded-md px-2 h-10">
                  <input 
                    type="color" 
                    value={textColor} 
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-6 h-6 p-0 border-0 rounded-full overflow-hidden cursor-pointer" 
                  />
                  <span className="text-xs opacity-70">{textColor}</span>
                </div>
              </div>
            </div>
            <div>
              <Label className="text-xs mb-1 block">Size: {fontSize}px</Label>
              <input 
                type="range" 
                min="12" 
                max="72" 
                value={fontSize} 
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <Button size="lg" className="w-full shadow-lg mt-4" onClick={handleAddToCart}>
            Add Custom Design to Cart
          </Button>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-2 bg-secondary/20 rounded-xl border border-border flex items-center justify-center p-8 min-h-[500px] relative overflow-hidden">
          <div className="relative w-full max-w-[500px] aspect-square bg-white shadow-2xl rounded-lg overflow-hidden">
            {/* Base Product Image */}
            <img 
              src={TEMPLATES[activeType]} 
              alt="Product Template" 
              className="w-full h-full object-cover pointer-events-none select-none"
            />
            
            {/* Overlay Layer for Customization */}
            <div className="absolute inset-0">
              {/* Image Overlay */}
              {uploadedImage && (
                <div 
                  className="absolute cursor-move border-2 border-dashed border-primary/50 hover:border-primary transition-colors group"
                  style={{ 
                    left: `${imgPos.x}%`, 
                    top: `${imgPos.y}%`, 
                    transform: 'translate(-50%, -50%)',
                    width: '40%',
                    height: '40%'
                  }}
                  onDragEnd={(e) => {
                    // This is a simplified simulation of drag. Real drag requires DnD library.
                    // For this mock, we'll just center it, but in real app use react-draggable
                  }}
                >
                  <img src={uploadedImage} className="w-full h-full object-cover" />
                  <div className="absolute top-0 right-0 bg-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100">
                    <Move size={12} />
                  </div>
                </div>
              )}

              {/* Text Overlay */}
              <div 
                className="absolute cursor-move hover:border border-dashed border-primary p-2 transition-colors"
                style={{ 
                  left: `${textPos.x}%`, 
                  top: `${textPos.y}%`, 
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <p 
                  style={{ 
                    fontFamily: fontFamily, 
                    fontSize: `${fontSize}px`, 
                    color: textColor,
                    textShadow: '0px 0px 2px rgba(255,255,255,0.8)'
                  }}
                  className="font-bold leading-none text-center whitespace-pre-wrap"
                >
                  {text}
                </p>
              </div>
            </div>
            
            {/* Helper Text */}
            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
              <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
                Preview Mode
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
