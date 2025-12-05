import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Solutions from "@/components/Solutions";
import UseCases from "@/components/UseCases";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "Lendora - AI-Powered Lending Infrastructure";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Solutions />
      <UseCases />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
