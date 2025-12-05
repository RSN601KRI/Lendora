import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import heroTeam from "@/assets/hero-team.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Gradient Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[128px] animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/20 blur-[128px] animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px] animate-pulse-glow" />
      </div>

      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-up">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">
                AI-Powered Lending Infrastructure
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight mb-6 animate-fade-up animation-delay-100">
              Lending Made{" "}
              <span className="gradient-text italic text-glow">Intelligent</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-fade-up animation-delay-200 text-balance">
              Transform your lending operations with AI-powered risk assessment, 
              automated underwriting, and real-time portfolio analytics. 
              Ship your lending product in days, not months.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-up animation-delay-300">
              <Button
                size="lg"
                className="gradient-bg border-0 hover:opacity-90 transition-all hover:scale-105 text-base px-8 py-6 group glow"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-secondary/50 border-border hover:bg-secondary text-base px-8 py-6 group"
              >
                <Play className="mr-2 w-4 h-4" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/50 animate-fade-up animation-delay-400">
              <div className="text-center sm:text-left">
                <div className="text-3xl md:text-4xl font-serif gradient-text mb-2">$2B+</div>
                <div className="text-sm text-muted-foreground">Loans Processed</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl md:text-4xl font-serif gradient-text mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime SLA</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl md:text-4xl font-serif gradient-text mb-2">40%</div>
                <div className="text-sm text-muted-foreground">Faster Approvals</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-fade-left animation-delay-300 hidden lg:block">
            <div className="relative">
              {/* Glowing border effect */}
              <div className="absolute -inset-1 gradient-bg rounded-3xl blur-xl opacity-50 animate-pulse-glow" />
              
              {/* Image container */}
              <div className="relative rounded-3xl overflow-hidden border border-border/50">
                <img 
                  src={heroTeam} 
                  alt="Lendora team working on financial analytics" 
                  className="w-full h-auto object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                
                {/* Floating stats card */}
                <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4 animate-float">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">Real-time Analytics</div>
                      <div className="text-2xl font-serif gradient-text">Active Now</div>
                    </div>
                    <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-background" />
                    </div>
                  </div>
                </div>
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