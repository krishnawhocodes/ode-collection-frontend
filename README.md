# Ode Collection - Premium Gift Shop

A production-ready React frontend for a premium gift shop, built with Vite, Tailwind CSS, Shadcn UI, and Framer Motion.

## Features

- **Premium Design System:** Custom colors (Rose/Gold/Charcoal), typography (Playfair Display/DM Sans), and animations.
- **Product Catalog:** Categories, search, filters, and detailed product pages.
- **Customization Studio:** Live preview for customizable items (Frames, Mugs, T-shirts) with photo/text overlays.
- **Cart & Checkout:** Persistent cart (localStorage) with a complete demo checkout flow (ready for payment gateway integration).
- **Corporate Gifting:** Dedicated section for bulk inquiries.
- **Responsive:** Mobile-first design for all pages.

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or bun

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

### Building for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist` folder, ready to be deployed to Vercel, Netlify, or any static host.

## Configuration

- **Store Details:** Edit `src/config/storeConfig.ts` to update the store name, phone, WhatsApp (optional), address, etc.
- **Products:** Edit `src/data/products.ts` to manage inventory.
- **Images:** Replace placeholder images in `src/data/products.ts` or add new ones to `public/` or `src/assets/`.

## Deployment

This project is optimized for Vercel.

1. Push to GitHub
2. Import project in Vercel
3. Framework Preset: Vite
4. Deploy

## License

Private - Ode Collection
