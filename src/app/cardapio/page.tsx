import FullMenu from "@/components/FullMenu";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CardapioPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Subtle Header */}
      <header className="py-6 px-6 sm:px-12 flex justify-between items-center border-b border-[#F5F0EE] bg-white sticky top-0 z-50">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-[#A69B95] hover:text-[var(--foreground)] transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Home
        </Link>
        <div className="font-serif italic text-lg text-[var(--foreground)]">
          Duda Doces
        </div>
      </header>

      {/* The isolated Menu Component */}
      <div className="flex-1">
        <FullMenu />
      </div>

      <footer className="py-8 text-center text-[#A69B95] text-sm bg-white border-t border-[#F5F0EE] mt-auto">
        <p>© {new Date().getFullYear()} Duda Doces — Confeitaria Artesanal.</p>
      </footer>
    </main>
  );
}
