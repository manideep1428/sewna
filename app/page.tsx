import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ScrollIndicator from "@/components/ScrollIndicator";
import AnimatedBackground from "@/components/AnimatedBackground";
import FluidBackground from "@/components/FluidBackground";
import ImageCarousel from "@/components/ImageCarousel";
import LiquidLines from "@/components/LiquidLines";
import DualJourney from "@/components/DualJourney";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf9] via-[#e6f9f3] to-[#d4f4e8] overflow-hidden relative">
      <FluidBackground />
      {/* <LiquidLines /> */}
      {/* <AnimatedBackground /> */}
      <div className="h-[10px]">
         <Header />
      </div>
      <Hero />
      <DualJourney />
      <ImageCarousel />
    </div>
  );
}
