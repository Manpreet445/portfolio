import Providers from "@/components/Providers";
import HeroDesk from "@/components/Desk/HeroDesk";
import SketchbookStage from "@/components/Sketchbook/SketchbookStage";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <Providers>
      <main className="relative">
        <HeroDesk />
        <SketchbookStage />
        <Footer />
      </main>
    </Providers>
  );
}
