"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Bolos Caseiros",
    description: "Nossos clássicos com sabor de fazenda e afeto. Massas fofinhas e super saborosas, perfeitos para acompanhar o café da tarde em família.",
    price: "A partir de R$ 35",
    imagePlaceholder: "🍰 Clássico", 
    color: "bg-[var(--accent-light)]/20",
    className: "md:col-span-1 md:row-span-1 h-full",
  },
  {
    id: 2,
    name: "Sobremesas",
    description: "Nossas opções geladas e irresistíveis para adoçar ainda mais os seus momentos, feitas com ingredientes selecionados.",
    price: "A partir de R$ 15",
    imagePlaceholder: "🤤 Geladinhos",
    color: "bg-[var(--accent)]/20",
    className: "md:col-span-1 md:row-span-1 h-full",
  },
];

export default function MenuShowcase() {
  return (
    <section id="menu" className="py-24 px-6 bg-[var(--surface)] relative">
      {/* Delicate background accent */}
      <div className="absolute top-20 right-0 w-[40vw] h-[60vw] max-w-lg bg-[var(--accent-light)] opacity-20 rounded-l-full blur-3xl z-0 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6"
        >
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-4">
              Assinatura<br/><span className="italic text-[var(--accent)]">Duda Doces</span>
            </h2>
            <p className="text-[var(--foreground)]/80 font-sans leading-relaxed">
              Cada doce é uma obra de arte pensada para encantar os olhos e o paladar. 
              Trabalhamos de forma artesanal para entregar os melhores sabores da nossa família para a sua.
            </p>
          </div>
          
          <Link href="/cardapio" className="hidden md:inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--foreground)] transition-colors border-b border-[var(--accent)] hover:border-[var(--foreground)] pb-1 font-medium">
            Ver cardápio completo <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* 2-Column Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 auto-rows-[minmax(350px,auto)] md:auto-rows-[minmax(400px,auto)]"
        >
          {products.map((item) => (
            <motion.div 
              key={item.id} 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className={`group flex flex-col overflow-hidden rounded-[2rem] border border-[var(--accent-light)]/20 shadow-md hover:shadow-2xl hover:shadow-[var(--accent-light)]/40 transition-shadow duration-500 bg-[var(--background)] ${item.className}`}
            >
              <div className={`relative w-full flex-grow min-h-[250px] md:min-h-0 flex items-center justify-center overflow-hidden ${item.color}`}>
                 <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/5 to-transparent mix-blend-multiply" />
                 
                 {/* Visual placeholder that fits the aesthetic */}
                 <div className="w-[80%] h-[80%] organic-shape bg-white/40 backdrop-blur-sm border border-white/60 shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-700 ease-out">
                    <span className="font-serif italic text-2xl text-[var(--foreground)] opacity-60">
                      {item.imagePlaceholder}
                    </span>
                 </div>
              </div>

              <div className="p-8 pb-10 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                  <h3 className="text-2xl font-serif text-[var(--foreground)]">{item.name}</h3>
                  <span className="text-sm font-medium text-[var(--foreground)] whitespace-nowrap bg-[var(--accent-light)]/40 px-3 py-1 rounded-full">{item.price}</span>
                </div>
                <p className="text-[var(--foreground)]/80 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center md:hidden">
            <Link href="/cardapio" className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--foreground)] transition-colors border-b border-[var(--accent)] hover:border-[var(--foreground)] pb-1 font-medium">
              Ver cardápio completo <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
      </div>
    </section>
  );
}
