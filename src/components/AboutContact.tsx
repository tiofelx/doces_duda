"use client";

import { Heart, MapPin, Instagram, Mail } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function AboutContact() {
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="sobre" className="py-24 px-6 relative overflow-hidden bg-[var(--background)]">
      {/* Decorative leaf/flourish background shape */}
      <div className="absolute top-1/2 left-[-10%] w-[30vw] h-[40vw] max-w-sm bg-[var(--accent)] opacity-20 rounded-full blur-2xl z-0 pointer-events-none transform -translate-y-1/2" />

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
                      src="/images/duda.png"
                      alt="Duda da Duda Doces"
                      fill
                      sizes="(max-width: 768px) 320px, 400px"
                      className="object-cover"
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
              className="absolute -bottom-8 -right-4 sm:bottom-10 sm:-right-10 md:right-10 w-[140px] h-[180px] sm:w-[200px] sm:h-[250px] bg-white p-2 shadow-2xl z-20 transform"
            >
               <div className="w-full h-full bg-[var(--background)] border border-[var(--accent-light)] flex items-center justify-center relative overflow-hidden">
                 <Image 
                    src="/images/detalhe_preparo_v2.png"
                    alt="Detalhe do preparo dos doces"
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
            <motion.div variants={textVariants} className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--accent-light)] text-[var(--foreground)] mb-6">
              <Heart className="w-5 h-5" />
            </motion.div>
            
            <motion.h2 variants={textVariants} className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-6">
              Olá, eu sou a <span className="italic text-[var(--accent)]">Duda</span>
            </motion.h2>
            
            <motion.p variants={textVariants} className="text-lg text-[var(--foreground)]/80 font-sans leading-relaxed mb-6">
              A confeitaria sempre foi mais do que misturar ingredientes para mim; é a arte de celebrar a vida e o amor através do sabor. 
              Cada bolo que sai do meu ateliê carrega um pedacinho da minha dedicação e o desejo de tornar o seu momento inesquecível.
            </motion.p>

            <motion.p variants={textVariants} className="text-lg text-[var(--foreground)]/80 font-sans leading-relaxed mb-10">
              Minhas criações são inteiramente artesanais, feitas sob encomenda para garantir frescor e exclusividade. 
              Espero que meus doces tragam tanta alegria para você quanto a que sinto ao prepará-los.
            </motion.p>

            {/* Contact Info */}
            <motion.div variants={textVariants} className="w-full bg-white p-8 rounded-3xl shadow-xl shadow-[var(--accent-light)]/20 border border-[var(--accent-light)]/40 flex flex-col gap-6 hover:shadow-2xl hover:shadow-[var(--accent-light)]/40 transition-shadow duration-500">
              <h3 className="font-serif text-2xl text-[var(--foreground)] border-b border-[var(--accent-light)]/40 pb-4">
                Fale Comigo
              </h3>
              
              <ul className="flex flex-col gap-4 text-left">
                <li className="flex items-center gap-4 text-[var(--foreground)]/80">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[var(--background)] flex items-center justify-center text-[var(--foreground)]">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <a href="https://instagram.com/duda.doces" target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-colors">
                    @duda.doces
                  </a>
                </li>
                <li className="flex items-center gap-4 text-[var(--foreground)]/80">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[var(--background)] flex items-center justify-center text-[var(--foreground)]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span>Ateliê em São Paulo, SP<br/><span className="text-sm opacity-80">(Apenas Retiradas/Entregas)</span></span>
                </li>
                <li className="flex items-center gap-4 text-[var(--foreground)]/80">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[var(--background)] flex items-center justify-center text-[var(--foreground)]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <a href="mailto:contato@dudadoces.com.br" className="hover:text-[var(--accent)] transition-colors break-all">
                    contato@dudadoces.com.br
                  </a>
                </li>
              </ul>

              <a 
                href="https://wa.me/5517991472183" 
                target="_blank" 
                rel="noreferrer"
                className="mt-2 w-full flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-medium hover:bg-[#20bd5a] transition-all duration-300 shadow-sm hover:scale-[1.02]"
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
