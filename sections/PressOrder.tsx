
import React from 'react';
import { HANDBAG_IMAGES, ACCESSORY_IMAGES } from '../constants';

interface PressOrderProps {
  onImageClick: (index: number, images: string[]) => void;
}

const PressOrder: React.FC<PressOrderProps> = ({ onImageClick }) => {
  const allProducts = [...HANDBAG_IMAGES, ...ACCESSORY_IMAGES];
  const WHATSAPP_NUMBER = "263786001055"; // Updated as requested

  const handleOrder = (imageUrl: string) => {
    const message = `Greetings MitRe Luxe, I would like to initiate an order for this piece: ${imageUrl}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="pt-48 pb-32 px-10 md:px-20 min-h-screen bg-white">
      <div className="max-w-screen-2xl mx-auto">
        <header className="mb-24">
          <span className="text-[10px] font-black tracking-[1em] text-[#FF007F] uppercase mb-8 block">Inventory MMXXIV</span>
          <h1 className="text-6xl md:text-9xl serif text-black uppercase leading-[0.8] tracking-tighter">
            Full <span className="italic">Catalog</span>
          </h1>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-12">
          {allProducts.map((img, i) => (
            <div key={i} className="group flex flex-col">
              <div 
                className="relative aspect-square overflow-hidden bg-neutral-50 mb-6 cursor-pointer border border-black/5"
                onClick={() => onImageClick(i, allProducts)}
              >
                <img 
                  src={img} 
                  alt="" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-4 py-2 text-[10px] font-black shadow-lg">
                  $19.99
                </div>
              </div>
              
              <div className="space-y-4">
                <button 
                  onClick={() => handleOrder(img)}
                  className="w-full text-[8px] md:text-[9px] font-black tracking-[0.4em] uppercase py-4 border border-black hover:bg-black hover:text-white transition-all duration-500"
                >
                  Quick Order
                </button>
                <p className="text-[8px] tracking-[0.4em] text-black/30 uppercase font-black text-center">
                  REF-{1000 + i}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressOrder;
