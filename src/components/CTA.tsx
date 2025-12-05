import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 gradient-bg opacity-90" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />

          {/* Glowing orbs */}
          <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-white/20 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[200px] h-[200px] bg-white/10 blur-[80px] rounded-full" />

          <div className="relative px-8 py-20 md:px-16 md:py-28 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-background mb-6 max-w-3xl mx-auto">
              Ready to transform your lending business?
            </h2>
            <p className="text-lg md:text-xl text-background/80 mb-10 max-w-2xl mx-auto">
              Join 500+ lenders who have already modernized their operations with Lendora. 
              Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 text-base px-8 py-6 group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-background/30 text-background hover:bg-background/10 text-base px-8 py-6"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
