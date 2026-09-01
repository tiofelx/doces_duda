"use client";

import { Heart, MapPin, Instagram } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { MARCA, INSTAGRAM, WHATSAPP, CIDADE } from "@/lib/site";

export default function AboutContact() {
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="sobre" className="py-24 px-6 relative overflow-hidden">

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Photos/Collage side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative flex justify-center lg:justify-start"
          >
            <div className="relative w-[320px] h-[420px] md:w-[400px] md:h-[500px] z-10">
              <div className="absolute inset-0 organic-shape bg-white shadow-2xl shadow-[var(--accent-light)]/50 overflow-hidden border-8 border-white p-2 flex items-center justify-center">
                 <div className="w-full h-full organic-shape bg-[var(--accent-light)]/30 flex items-center justify-center relative overflow-hidden">
                    <Image 
                      src="/images/maria.jpg"
                      alt={`Maria, confeiteira da ${MARCA}`}
                      fill
                      sizes="(max-width: 768px) 320px, 400px"
                      className="object-cover object-top"
                      priority
                    />
                 </div>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1, ease: "backOut" }}
              className="absolute -bottom-8 -right-4 sm:bottom-10 sm:-right-10 md:-right-8 md:bottom-4 w-[150px] h-[118px] sm:w-[220px] sm:h-[170px] bg-white p-2 shadow-2xl z-20 transform"
            >
               <div className="w-full h-full bg-[var(--background)] border border-[var(--accent-light)] flex items-center justify-center relative overflow-hidden">
                 <Image 
                    src="/images/menu/bolo_glace_gotas.jpg"
                    alt="Bolo com glacê e gotas de chocolate"
                    fill
                    sizes="200px"
                    className="object-cover"
                 />
               </div>
            </motion.div>
          </motion.div>

          {/* Text/Contact side */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <motion.h2 variants={textVariants} className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2">
              <span>Olá, eu sou a <span className="italic text-[var(--brand)]">Maria</span></span>
              <span className="inline-flex shrink-0 items-center justify-center w-12 h-12 rounded-full bg-[var(--accent-light)] text-[var(--foreground)]">
                <Heart className="w-5 h-5" />
              </span>
            </motion.h2>
            
            <motion.p variants={textVariants} className="text-lg text-[var(--foreground)]/80 font-sans leading-relaxed mb-6">
              Desde pequena eu sempre amei cozinhar e, de algum jeitinho, esse amor me trouxe até aqui.
            </motion.p>

            <motion.p variants={textVariants} className="text-lg text-[var(--foreground)]/80 font-sans leading-relaxed mb-6">
              Estou começando agora, dando meus primeiros passos e aprendendo a cada dia, mas meu coração já se enche de orgulho de ver tudo isso tomando forma.
            </motion.p>

            <motion.p variants={textVariants} className="text-lg text-[var(--foreground)]/80 font-sans leading-relaxed mb-10">
              Cada bolinho é feito com muito carinho, amor e um pouquinho de mim.
            </motion.p>

            {/* Contact Info */}
            <motion.div variants={textVariants} className="w-full max-w-[360px] mx-auto bg-white p-6 rounded-3xl shadow-xl shadow-[var(--accent-light)]/20 border border-[var(--accent-light)]/40 flex flex-col gap-4 hover:shadow-2xl hover:shadow-[var(--accent-light)]/40 transition-shadow duration-500">
              <h3 className="font-serif text-2xl text-center text-[var(--foreground)] border-b border-[var(--accent-light)]/40 pb-3">
                Fale Comigo
              </h3>
              
              <ul className="flex flex-col gap-3 text-left">
                <li className="flex items-center gap-4 text-[var(--foreground)]/80">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[var(--background)] flex items-center justify-center text-[var(--foreground)]">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <a href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noreferrer" className="hover:text-[var(--brand)] transition-colors">
                    @{INSTAGRAM}
                  </a>
                </li>
                <li className="flex items-center gap-4 text-[var(--foreground)]/80">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[var(--background)] flex items-center justify-center text-[var(--foreground)]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span>Ateliê em {CIDADE}<br/><span className="text-sm opacity-80">(Apenas Retiradas/Entregas)</span></span>
                </li>
              </ul>

              <a 
                href={`https://wa.me/${WHATSAPP}`} 
                target="_blank" 
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-xl font-medium text-sm lg:text-base hover:bg-[#20bd5a] transition-all duration-300 shadow-sm hover:scale-[1.02]"
              >
                Fazer Encomenda pelo WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
