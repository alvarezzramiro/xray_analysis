import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { WorkflowSection } from "@/components/landing/WorkflowSection";
import { XrayVisual } from "@/components/landing/XrayVisual";
import { PacsViewer } from "@/components/landing/PacsViewer";
import { ThreeDSection } from "@/components/landing/ThreeDSection";
import { DropzoneSection } from "@/components/landing/DropzoneSection";
import { Footer } from "@/components/landing/Footer";     

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      {/* Navegación superior */}
      <Navbar />

      {/* Contenido principal de la landing */}
      <main className="flex-1">
        <HeroSection />
        <WorkflowSection />
        
        {/* Secciones visuales interactivas */}
        <XrayVisual />
        <PacsViewer />
        <ThreeDSection />
        
        {/* Llamado a la acción (CTA) y pruebas sociales */}
        <DropzoneSection />
      </main>

      {/* Pie de página */}
      <Footer />
    </div>
  );
}