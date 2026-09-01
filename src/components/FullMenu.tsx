"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Plus, Minus, Send, CakeSlice } from "lucide-react";
import { WHATSAPP } from "@/lib/site";

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
  /** Rotulo curto para a aba no mobile, onde os tres nomes cheios nao cabem. */
  short?: string;
  items: MenuItem[];
};

const menuData: Category[] = [
  {
    id: "bolos-caseiros",
    label: "Bolos Caseiros",
    short: "Caseiros",
    items: [
      { id: "bc1", name: "Bolo de Banana", description: "Massa fofinha com rodelas de banana caramelizada por cima.", price: "Sob consulta", image: "/images/menu/bolo_banana.jpg" },
      { id: "bc3", name: "Bolo de Coco", description: "Molhadinho, com calda que encharca a massa e coco ralado por cima.", price: "Sob consulta", image: "/images/menu/bolo_coco_2.jpg" },
      { id: "bc4", name: "Bolo de Maçã", description: "Macio e perfumado, com fatias de maçã caramelizadas por cima.", price: "Sob consulta", image: "/images/menu/bolo_maca.jpg" },
      { id: "bc5", name: "Bolo de Laranja", description: "Perfumado, dourado e sem cobertura, do jeitinho que combina com café.", price: "Sob consulta", image: "/images/menu/bolo_laranja_liso.jpg" },
      { id: "bc6", name: "Bolo de Cenoura com Chocolate", description: "Massa de cenoura macia com cobertura de chocolate e granulado.", price: "Sob consulta", image: "/images/menu/bolo_cenoura.jpg" },
    ]
  },
  {
    id: "bolos-chocolate",
    label: "Bolos de Chocolate",
    short: "Chocolate",
    items: [
      { id: "ch1", name: "Bolo de Chocolate com Granulado", description: "Cobertura cremosa de chocolate com granulado por cima.", price: "Sob consulta", image: "/images/menu/bolo_chocolate_granulado.jpg" },
      { id: "ch2", name: "Bolo de Chocolate com Gotas", description: "Ganache brilhante finalizada com gotas de chocolate ao leite.", price: "Sob consulta", image: "/images/menu/bolo_chocolate_gotas.jpg" },
      { id: "ch3", name: "Bolo de Prestígio", description: "Massa de chocolate com recheio de coco, calda e coco ralado por cima.", price: "Sob consulta", image: "/images/menu/bolo_prestigio.jpg" },
      { id: "ch5", name: "Bolo de Brigadeiro", description: "Alto, com brigadeiro cremoso e uma camada generosa de granulado.", price: "Sob consulta", image: "/images/menu/bolo_brigadeiro.jpg" },
    ]
  },
  {
    id: "sobremesas",
    label: "Sobremesas",
    items: [
      { id: "sb1", name: "Bombom de Morango", description: "Morangos frescos no creme, cobertos de brigadeiro e granulado.", price: "Sob consulta", image: "/images/menu/bombom_morango.jpg" },
      { id: "sb2", name: "Bombom de Uva", description: "Uvas verdes no creme gelado, cobertas com chocolate. Leve e refrescante.", price: "Sob consulta", image: "/images/menu/bombom_uva.jpg" },
      { id: "sb3", name: "Pudim", description: "Pudim clássico, cremoso, com calda de caramelo caseira.", price: "Sob consulta", image: "/images/menu/pudim.jpg" },
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
      className="group flex flex-col p-4 bg-white rounded-3xl border border-transparent hover:border-[#F5F0EE] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-xl hover:shadow-[#FCC0C5]/10 transition-all duration-500"
    >
      <div className="flex gap-4 h-full">
        {/* Aesthetic Image or Placeholder */}
        <div className="shrink-0 w-28 sm:w-32 self-stretch min-h-[7rem] rounded-2xl bg-gradient-to-br from-[#FDF9F7] to-[#F5E6E8] flex items-center justify-center text-[var(--accent)] relative overflow-hidden">
          {item.image ? (
            <Image 
              src={item.image} 
              alt={`Foto de ${item.name}`} 
              fill 
              sizes="(max-width: 640px) 112px, 128px"
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
            <h3 className="text-lg sm:text-xl font-medium text-[var(--foreground)] leading-tight">
              {item.name}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed line-clamp-2 md:line-clamp-3 mb-3 font-light">
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
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--muted)] hover:bg-white hover:text-[var(--foreground)] hover:shadow-sm transition-all duration-200"
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
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--muted)] hover:bg-white hover:text-[var(--foreground)] hover:shadow-sm transition-all duration-200"
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
    // Enquanto não houver preço cadastrado o total fica zerado; não mandar "R$ 0".
    const valor = cartInfo.totalPrice > 0 ? `\n\nValor estimado: R$ ${cartInfo.totalPrice}` : "";
    const message = `Oiii, Maria, gostaria de encomendar:\n\n${cartInfo.orderItems.map(item => `- ${item}`).join('\n')}${valor}\n`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="cardapio" className="py-16 sm:py-24 px-6 relative overflow-hidden flex-1">

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative mx-auto mb-6 w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56"
          >
            <Image
              src="/images/logo.jpg"
              alt="Bolos da Maria — bolos e doces feitos com amor"
              fill
              sizes="(max-width: 640px) 176px, 224px"
              priority
              className="rounded-full object-cover"
            />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[var(--foreground)] text-2xl sm:text-3xl md:text-4xl leading-tight text-balance max-w-2xl mx-auto"
          >
            Monte sua encomenda e me mande pelo{" "}
            <span className="italic text-[var(--brand)]">WhatsApp!</span>
          </motion.h2>
        </div>

        {/* Elegant Tabs */}
        <div className="mb-10 sm:mb-14 relative z-20 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex justify-center min-w-max">
            <div className="flex bg-white/60 backdrop-blur-md p-1.5 rounded-full border border-white/80 shadow-sm">
              {menuData.map((category) => (
                <button
                   key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`relative whitespace-nowrap px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${
                    activeTab === category.id 
                      ? "text-[var(--foreground)]" 
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {activeTab === category.id && (
                    <motion.div
                      layoutId="pill-tab"
                      className="absolute inset-0 bg-white rounded-full -z-10 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-[#F5F0EE]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="sm:hidden">{category.short ?? category.label}</span>
                  <span className="hidden sm:inline">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="min-h-[500px] mb-24 sm:mb-32">
          <AnimatePresence mode="wait">
            {activeCategory && (
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="menu-grid grid grid-cols-1 md:grid-cols-2 gap-6"
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
                <div className="font-semibold text-lg text-[var(--foreground)] tracking-tight">
                  <span className="text-sm font-sans font-normal text-[var(--muted)] mr-2">Total</span>
                  {cartInfo.totalPrice > 0 ? `R$ ${cartInfo.totalPrice}` : "A combinar"}
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
