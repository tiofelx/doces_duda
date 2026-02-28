"use client";

import { ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[var(--background)] px-6 pt-20 pb-32">
      {/* Decorative organic shapes in background */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[var(--accent-light)] organic-shape blur-3xl z-0 pointer-events-none" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[var(--accent-light)] organic-shape blur-3xl z-0 pointer-events-none" 
        style={{ animationDelay: '-4s' }} 
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20"
      >
        
        {/* Text Content */}
        <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left">
          <motion.span variants={itemVariants} className="text-[var(--accent)] font-medium tracking-widest text-sm uppercase mb-4">
            Confeitaria Artesanal
          </motion.span>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-serif text-[var(--foreground)] leading-[1.1] mb-6">
            Doces finos feitos<br className="hidden md:inline" /> com delicadeza
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg text-[var(--foreground)]/80 font-sans max-w-md mb-8 leading-relaxed">
            Especializada em bolos elegantes e doces artesanais que transformam momentos simples em memórias inesquecíveis.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/cardapio" passHref>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[var(--accent)] text-white px-8 py-4 rounded-full font-medium transition-colors hover:bg-[var(--accent-light)] flex items-center justify-center gap-2 group shadow-lg"
              >
                Ver Menu Completo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link href="/cardapio" passHref>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[var(--foreground)] border-2 border-transparent px-8 py-4 rounded-full font-medium transition-colors hover:border-[var(--accent-light)] hover:text-[var(--accent)] hover:shadow-md flex justify-center w-[220px]"
              >
                Fazer Encomenda
              </motion.button>
            </Link>
          </motion.div>
        </div>

         {/* Image/Visual elements */}
        <motion.div variants={itemVariants} className="flex-1 w-full max-w-md md:max-w-none flex justify-center mt-10 md:mt-0">
          <div className="relative w-[300px] h-[400px] md:w-[380px] md:h-[500px]">
             {/* Instead of a placeholder block, we use CSS for a highly aesthetic presentation */}
            <div className="absolute inset-0 organic-shape bg-gradient-to-tr from-[var(--accent-light)] to-[var(--accent-light)]/40 shadow-[0_20px_60px_-15px_rgba(252,192,197,0.4)] overflow-hidden flex items-center justify-center p-2">
               <div className="w-full h-full organic-shape overflow-hidden bg-[var(--surface)] relative border-4 border-white">
                  <Image 
                    src="/images/menu/bolo_milho_requeijao.png"
                    alt="Bolo de Milho com Requeijão artesanal em destaque"
                    fill
                    sizes="(max-width: 768px) 300px, 380px"
                    className="object-cover hover:scale-105 transition-transform duration-1000"
                    priority
                  />
               </div>
            </div>
            
            {/* Small floating element */}
            <motion.div 
              initial={{ opacity: 0, y: 20, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl shadow-[var(--accent-light)]/30 border border-[var(--accent-light)]/30 flex items-center gap-4 z-20"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--accent-light)] flex items-center justify-center text-xl">
                ✨
              </div>
              <div>
                <p className="font-serif font-bold text-[var(--foreground)]">Feito à mão</p>
                <p className="text-xs text-[var(--foreground)]/80">Com ingredientes premium</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Fluid bottom edge (SVG divider) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 z-20">
        <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="var(--surface)"></path>
        </svg>
      </div>
    </section>
  );
}
