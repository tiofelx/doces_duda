import Hero from "@/components/Hero";
import MenuShowcase from "@/components/MenuShowcase";
import AboutContact from "@/components/AboutContact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Hero />
      <MenuShowcase />
      <AboutContact />
      
      {/* Delicate Footer */}
      <footer className="py-8 text-center text-[#A69B95] text-sm bg-white border-t border-[#F5F0EE]">
        <p>© {new Date().getFullYear()} Duda Doces — Confeitaria Artesanal.</p>
        <p className="mt-1">Feito com cuidado e amor.</p>
      </footer>
    </main>
  );
}
