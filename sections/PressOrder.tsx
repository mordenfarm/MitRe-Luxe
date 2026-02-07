
import React from 'react';
import { HANDBAG_IMAGES, ACCESSORY_IMAGES } from '../constants';

interface PressOrderProps {
  onImageClick: (index: number, images: string[]) => void;
}

const PressOrder: React.FC<PressOrderProps> = ({ onImageClick }) => {
  const allProducts = [...HANDBAG_IMAGES, ...ACCESSORY_IMAGES];
  const WHATSAPP_NUMBER = "263782456936";

  const handleOrder = (imageUrl: string) => {
    const message = `Greetings MitRe Luxe, I would like to initiate an order for this piece: ${imageUrl}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="pt-48 pb-32 px-10 md:px-20 min-h-screen">
      <div className="max-w-screen-2xl mx-auto">
        <header className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-black/5 pb-16">
          <div className="max-w-3xl">
            <span className="text-[10px] font-black tracking-[1em] text-[#FF007F] uppercase mb-8 block">Exclusive Catalog</span>
            <h1 className="text-6xl md:text-9xl serif text-black uppercase leading-[0.8] tracking-tighter">
              Private <br /> <span className="italic">Collection</span>
            </h1>
          </div>
          <p className="text-black/30 text-[10px] md:text-xs font-bold max-w-xs leading-relaxed uppercase tracking-widest">
            Direct orders via our London Atelier. Global shipping available on all items.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-24">
          {allProducts.map((img, i) => (
            <div 
              key={i} 
              className="group flex flex-col"
            >
              <div 
                className="relative aspect-square overflow-hidden bg-[#FBFBFA] mb-8 cursor-pointer shadow-sm group-hover:shadow-2xl transition-all duration-1000"
                onClick={() => onImageClick(i, allProducts)}
              >
                <img 
                  src={img} 
                  alt="" 
                  className="w-full h-full object-contain p-10 transition-transform duration-[2s] ease-out group-hover:scale-110"
                />
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-md px-4 py-2 text-[10px] font-black border border-black/5">
                  $19.99
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-4">
                <button 
                  onClick={() => handleOrder(img)}
                  className="w-full text-[9px] font-black tracking-[0.5em] uppercase py-4 border border-black hover:bg-black hover:text-white transition-all duration-500"
                >
                  Order via WhatsApp
                </button>
                <p className="text-[8px] tracking-[0.6em] text-black/20 uppercase font-black">
                  Product REF: {1000 + i}
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
