
import React from 'react';
import { HANDBAG_IMAGES, ACCESSORY_IMAGES } from '../constants';

interface PressOrderProps {
  onImageClick: (index: number, images: string[]) => void;
}

const PressOrder: React.FC<PressOrderProps> = ({ onImageClick }) => {
  const allProducts = [...HANDBAG_IMAGES, ...ACCESSORY_IMAGES];
  const WHATSAPP_NUMBER = "263782456936";

  const handleOrder = (imageUrl: string) => {
    const message = `Hello, I would like to order this product from MitRe Luxe: ${imageUrl}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="pt-32 pb-20 px-6 md:px-12 bg-white min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-16 md:mb-24">
          <span className="text-[10px] font-black tracking-[0.8em] text-[#FF007F] uppercase mb-4 block">Quick Catalog</span>
          <h1 className="text-5xl md:text-7xl serif text-black uppercase leading-[0.9] tracking-tighter">
            Press <br /> <span className="italic">Order</span>
          </h1>
          <p className="mt-8 text-black/50 text-xs md:text-sm font-medium max-w-xl leading-relaxed">
            Select an item from our exclusive collection below to start a direct order via WhatsApp. 
            Free delivery on all premium orders this season.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-10">
          {allProducts.map((img, i) => (
            <div 
              key={i} 
              className="group flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div 
                className="relative aspect-[4/5] bg-[#f9f9f9] overflow-hidden rounded-sm mb-4 cursor-pointer"
                onClick={() => onImageClick(i, allProducts)}
              >
                <img 
                  src={img} 
                  alt={`Product ${i}`} 
                  className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="bg-white/90 px-4 py-2 border border-black/10 scale-0 group-hover:scale-100 transition-transform duration-300">
                      <p className="text-[8px] font-black tracking-widest uppercase text-black">Click to View</p>
                   </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="text-[10px] font-black tracking-widest text-black/20 uppercase italic">MitRe Exclusive Item</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl font-black text-black tracking-tighter">$19.99</span>
                  <span className="text-[10px] text-black/20 line-through font-bold">$145.00</span>
                </div>
                
                <button 
                  onClick={() => handleOrder(img)}
                  className="w-full bg-black text-white text-[8px] font-black tracking-[0.3em] uppercase py-3.5 px-4 hover:bg-[#FF007F] transition-colors shadow-lg active:scale-95"
                >
                  Order via WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressOrder;
