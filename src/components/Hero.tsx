import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-screen Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroBackground} 
          alt="Professional fintech team" 
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-background/75" />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Subtle animated glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] animate-blob" />
        <div className="absolute bottom-1/3 right-1/3 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[100px] animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-up border border-accent/30">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">
              AI-Powered Lending Infrastructure
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight mb-6 animate-fade-up animation-delay-100">
            Transform Your{" "}
            <br className="hidden md:block" />
            <span className="gradient-text italic text-glow">Lending Operations</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-fade-up animation-delay-200 max-w-2xl">
            Lendora is the AI-native platform that revolutionizes lending 
            operations by embedding intelligent risk assessment directly 
            into the underwriting process.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-up animation-delay-300">
            <Button
              size="lg"
              className="gradient-bg border-0 hover:opacity-90 transition-all hover:scale-105 text-base px-8 py-6 group glow"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-8 md:gap-12 mt-16 pt-8 border-t border-border/30 animate-fade-up animation-delay-400">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <div>
                <div className="text-lg font-semibold text-foreground">98% Approval Rate</div>
                <div className="text-sm text-muted-foreground">vs 65% industry average</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <div>
                <div className="text-lg font-semibold text-foreground">&lt;2 Minutes</div>
                <div className="text-sm text-muted-foreground">Decision generation time</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <div>
                <div className="text-lg font-semibold text-foreground">$2B+ Saved</div>
                <div className="text-sm text-muted-foreground">In operational costs annually</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </div>
      </div>
    </section>
  );
};

export default Hero;