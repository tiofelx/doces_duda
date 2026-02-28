"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Plus, Minus, Send, CakeSlice } from "lucide-react";

// --- Types ---

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  numericPrice?: number;
  image?: string;
};

type Category = {
  id: string;
  label: string;
  items: MenuItem[];
};

// --- Data ---

const menuData: Category[] = [
  {
    id: "bolos-tradicionais",
    label: "Bolos Caseiros",
    items: [
      { id: "bt1", name: "Bolo de Chocolate", description: "Massa fofinha de cacau com uma cobertura cremosa e irresistível.", price: "R$ 45", numericPrice: 45, image: "/images/menu/bolo_de_chocolate.png" },
      { id: "bt2", name: "Bolo de Cenoura", description: "O clássico imbatível, macio e com farta cobertura de chocolate.", price: "R$ 40", numericPrice: 40, image: "/images/menu/bolo_de_cenoura.png" },
      { id: "bt3", name: "Bolo de Milho", description: "Sabor de fazenda, com textura macia que desmancha na boca.", price: "R$ 35", numericPrice: 35, image: "/images/menu/bolo_de_milho.png" },
      { id: "bt4", name: "Bolo de Mandioca", description: "Cremoso, feito com mandioca fresca. Perfeito para o café da tarde.", price: "R$ 45", numericPrice: 45, image: "/images/menu/bolo_de_mandioca.png" },
      { id: "bt5", name: "Bolo de Milho com Requeijão", description: "A combinação perfeita entre o docinho do milho e a cremosidade salgadinha do requeijão.", price: "R$ 50", numericPrice: 50, image: "/images/menu/bolo_milho_requeijao.png" },
      { id: "bt6", name: "Bolo de Prestígio", description: "Massa escura e rica em cacau com recheio úmido de coco.", price: "R$ 55", numericPrice: 55, image: "/images/menu/bolo_prestigio.png" },
      { id: "bt7", name: "Bolo de Maça", description: "Perfumado e reconfortante, com pedaços macios da fruta e toque de canela.", price: "R$ 40", numericPrice: 40, image: "/images/menu/bolo_maca.png" },
    ]
  },
  {
    id: "bolos-gelados",
    label: "Bolos Gelados",
    items: [
      { id: "bg1", name: "Doce de Leite c/ Coco", description: "Pedaço bem molhadinho, recheado com doce de leite suave e envolto em coco ralado.", price: "R$ 15/un", numericPrice: 15, image: "/images/menu/bolo_doce_leite_coco.png" },
      { id: "bg2", name: "Chocolate", description: "Massa de cacau super úmida com calda rica de chocolate trufado.", price: "R$ 15/un", numericPrice: 15, image: "/images/menu/bolo_gelado_chocolate.png" },
      { id: "bg3", name: "Morango", description: "Massa leve e refrescante com calda especial e toque de morango.", price: "R$ 18/un", numericPrice: 18, image: "/images/menu/bolo_gelado_morango.png" },
    ]
  }
];

// --- Sub-components (React UI Patterns) ---

const MenuItemCard = ({ 
  item, 
  quantity, 
  onAdd, 
  onRemove,
  index 
}: { 
  item: MenuItem; 
  quantity: number; 
  onAdd: (id: string) => void; 
  onRemove: (id: string) => void;
  index: number;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
      className="group flex flex-col p-5 bg-white rounded-3xl border border-transparent hover:border-[#F5F0EE] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-xl hover:shadow-[#FCC0C5]/10 transition-all duration-500"
    >
      <div className="flex gap-4 h-full">
        {/* Aesthetic Image or Placeholder */}
        <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#FDF9F7] to-[#F5E6E8] flex items-center justify-center text-[var(--accent)] relative overflow-hidden">
          {item.image ? (
            <Image 
              src={item.image} 
              alt={`Foto de ${item.name}`} 
              fill 
              sizes="(max-width: 640px) 96px, 112px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/5 to-transparent mix-blend-multiply" />
              <motion.div 
                 whileHover={{ scale: 1.1, rotate: 5 }}
                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <CakeSlice className="w-8 h-8 opacity-60 drop-shadow-sm" strokeWidth={1.5} />
              </motion.div>
            </>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col pt-1">
          <div className="flex justify-between items-start gap-2 mb-1.5">
            <h3 className="text-lg sm:text-xl font-serif text-[var(--foreground)] leading-tight tracking-tight">
              {item.name}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#8A7B72] leading-relaxed line-clamp-2 md:line-clamp-3 mb-4 font-light">
            {item.description}
          </p>
          
          <div className="mt-auto flex items-center justify-between">
            <span className="font-sans font-medium text-[var(--foreground)] text-sm tracking-wide">
              {item.price}
            </span>

            {/* Smart Add to Cart Actions */}
            <div className="flex items-center">
              <AnimatePresence mode="popLayout">
                {quantity > 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center bg-[#FDF9F7] rounded-full border border-[#EBE3DF] p-1 shadow-sm"
                  >
                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onRemove(item.id)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[#7A6B62] hover:bg-white hover:text-[var(--foreground)] hover:shadow-sm transition-all duration-200"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </motion.button>
                    <motion.span 
                      key={quantity}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="w-6 text-center text-xs font-semibold text-[var(--foreground)]"
                    >
                      {quantity}
                    </motion.span>
                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onAdd(item.id)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[#7A6B62] hover:bg-white hover:text-[var(--foreground)] hover:shadow-sm transition-all duration-200"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAdd(item.id)}
                    className="w-9 h-9 rounded-full bg-white border border-[#EBE3DF] text-[var(--foreground)] flex items-center justify-center hover:bg-[var(--foreground)] hover:text-white hover:border-[var(--foreground)] shadow-sm transition-colors duration-300"
                    aria-label="Adicionar ao carrinho"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Component ---

export default function FullMenu() {
  const [activeTab, setActiveTab] = useState(menuData[0].id);
  const [cart, setCart] = useState<Record<string, number>>({});

  const activeCategory = menuData.find(c => c.id === activeTab);

  const handleAdd = (id: string) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  
  const handleRemove = (id: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id] > 1) newCart[id] -= 1;
      else delete newCart[id];
      return newCart;
    });
  };

  // React Best Practice: useMemo for derived state to avoid unnecessary recalculations
  const cartInfo = useMemo(() => {
    let totalItems = 0;
    let totalPrice = 0;
    const orderItems: string[] = [];

    menuData.forEach(cat => {
      cat.items.forEach(item => {
        if (cart[item.id]) {
          totalItems += cart[item.id];
          if (item.numericPrice) totalPrice += item.numericPrice * cart[item.id];
          orderItems.push(`${cart[item.id]}x ${item.name}`);
        }
      });
    });

    return { totalItems, totalPrice, orderItems };
  }, [cart]);

  const handleWhatsAppOrder = () => {
    const message = `Olá! Gostaria de encomendar:\n\n${cartInfo.orderItems.map(item => `- ${item}`).join('\n')}\n\nValor estimado: R$ ${cartInfo.totalPrice}\n\nPodemos confirmar a disponibilidade?`;
    window.open(`https://wa.me/5517991472183?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="cardapio" className="py-24 px-6 bg-[var(--background)] relative overflow-hidden flex-1">
      {/* Soft organic background accents */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[var(--accent-light)] opacity-20 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[#E9BC8B] opacity-10 blur-[80px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-4 tracking-tight"
          >
            Nosso Cardápio
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#8A7B72] font-sans font-light"
          >
            Monte sua encomenda e envie diretamente para nosso WhatsApp.
          </motion.p>
        </div>

        {/* Elegant Tabs */}
        <div className="flex justify-center gap-2 mb-14 relative z-20">
          <div className="flex bg-white/60 backdrop-blur-md p-1.5 rounded-full border border-white/80 shadow-sm">
            {menuData.map((category) => (
              <button
                 key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${
                  activeTab === category.id 
                    ? "text-[var(--foreground)]" 
                    : "text-[#A69B95] hover:text-[var(--foreground)]"
                }`}
              >
                {activeTab === category.id && (
                  <motion.div
                    layoutId="pill-tab"
                    className="absolute inset-0 bg-white rounded-full -z-10 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-[#F5F0EE]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="min-h-[500px] mb-32">
          <AnimatePresence mode="wait">
            {activeCategory && (
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {activeCategory.items.map((item, index) => (
                  <MenuItemCard 
                    key={item.id} 
                    item={item} 
                    quantity={cart[item.id] || 0}
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                    index={index}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Glassmorphism Floating Cart Checkout */}
      <AnimatePresence>
        {cartInfo.totalItems > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-2 pr-2 pl-6 shadow-2xl shadow-[#FCC0C5]/30 border border-white flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-[var(--foreground)] py-2">
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-[var(--accent)]" />
                  <span className="absolute -top-2 -right-2 bg-[var(--foreground)] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartInfo.totalItems}
                  </span>
                </div>
                <div className="font-serif font-bold text-lg text-[var(--foreground)] tracking-tight">
                  <span className="text-sm font-sans font-normal text-[#8A7B72] mr-2">Total</span>
                  R$ {cartInfo.totalPrice}
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppOrder}
                className="bg-[var(--foreground)] text-white px-6 py-3.5 rounded-full flex items-center justify-center gap-2 font-medium hover:bg-[#3d2719] transition-colors duration-300 shadow-md"
              >
                Continuar
                <Send className="w-4 h-4 ml-1" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
