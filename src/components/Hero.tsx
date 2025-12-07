import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Users, CreditCard } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Subtle background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/3 w-[200px] h-[200px] rounded-full bg-primary/5 blur-[80px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2 mb-8 animate-fade-up border border-border">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              AI-Powered Lending Infrastructure
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight mb-6 animate-fade-up animation-delay-100">
            Transform Your Lending
            <br />
            <span className="text-primary italic">Powered by AI</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-fade-up animation-delay-200 max-w-2xl mx-auto">
            Lendora is the AI-native platform that revolutionizes lending 
            operations by embedding intelligent risk assessment directly 
            into the underwriting process. One-line integration. Developer-first.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-300">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-base px-8 py-6 group rounded-full font-medium"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-secondary border-border hover:bg-secondary/80 text-base px-8 py-6 rounded-full"
            >
              View SDK
            </Button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="max-w-5xl mx-auto animate-fade-up animation-delay-400">
          <div className="bg-card rounded-2xl border border-border p-1 shadow-2xl">
            {/* Browser Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-success" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-secondary rounded-lg px-4 py-1.5 text-xs text-muted-foreground">
                  dashboard.lendora.com
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 grid md:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Total Revenue</div>
                <div className="text-2xl font-serif text-foreground mb-1">$2.4M</div>
                <div className="flex items-center gap-1 text-primary text-sm">
                  <TrendingUp className="w-3 h-3" />
                  <span>+23% this month</span>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Active Loans</div>
                <div className="text-2xl font-serif text-foreground mb-1">12,847</div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Users className="w-3 h-3" />
                  <span>All performing</span>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Approval Rate</div>
                <div className="text-2xl font-serif text-foreground mb-1">98.2%</div>
                <div className="flex items-center gap-1 text-primary text-sm">
                  <CreditCard className="w-3 h-3" />
                  <span>vs 65% industry avg</span>
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="md:col-span-2 bg-secondary/50 rounded-xl p-5 border border-border">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Revenue Overview</div>
                  <div className="text-xs text-primary">Last 30 days</div>
                </div>
                <div className="flex items-end gap-2 h-24">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-primary/20 rounded-sm hover:bg-primary/40 transition-colors"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Recent Approvals</div>
                <div className="space-y-3">
                  {[
                    { id: "0x8f43...a2b1", time: "2 min ago", amount: "+$25,000" },
                    { id: "0x3d21...f4c8", time: "15 min ago", amount: "+$12,500" },
                    { id: "0x9e76...b3d2", time: "1 hr ago", amount: "+$50,000" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div>
                        <div className="text-foreground font-mono text-xs">{item.id}</div>
                        <div className="text-xs text-muted-foreground">{item.time}</div>
                      </div>
                      <div className="text-primary font-medium">{item.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
