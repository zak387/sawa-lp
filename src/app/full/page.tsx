import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/sections/Hero";
import ProblemFlows from "@/components/sections/ProblemFlows";
import Results from "@/components/sections/Results";
import StickyServices from "@/components/sections/StickyServices";
import CTA from "@/components/sections/CTA";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <Hero />
        <ProblemFlows />
        <Results />
        <StickyServices />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
