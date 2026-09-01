import FullMenu from "@/components/FullMenu";
import AboutContact from "@/components/AboutContact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <FullMenu />
      <AboutContact />

      {/* Delicate Footer */}
      <footer className="py-8 text-center text-[var(--foreground)] text-sm">
        <p>Bolos da Maria. © {new Date().getFullYear()}</p>
        <p className="mt-1">Feito com cuidado e amor.</p>
      </footer>
    </main>
  );
}
