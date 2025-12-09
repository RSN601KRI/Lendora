import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import UseCases from "@/components/UseCases";
import ProofOfConcept from "@/components/ProofOfConcept";
import TryDemoSection from "@/components/TryDemoSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LoanChatbot from "@/components/chat/LoanChatbot";

const Index = () => {
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    document.title = "Lendora - AI-Powered Lending Infrastructure";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Transform your lending operations with Lendora's AI-powered risk assessment, automated underwriting, and real-time portfolio analytics. Ship your lending product in days, not months.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Global mesh gradient background */}
      <div className="fixed inset-0 mesh-gradient opacity-30 pointer-events-none" />
      
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <KnowledgeGraph />
        <UseCases />
        <ProofOfConcept />
        <TryDemoSection onOpenChat={() => setChatOpen(true)} />
        <ContactSection />
      </main>
      <Footer />
      
      {/* AI Loan Chatbot */}
      <LoanChatbot />
    </div>
  );
};

export default Index;