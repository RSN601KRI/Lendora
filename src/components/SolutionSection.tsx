import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Shield, Zap, BarChart3, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Decisioning",
    description: "Machine learning models analyze 1000+ data points for accurate risk assessment in seconds.",
  },
  {
    icon: Zap,
    title: "Instant Underwriting",
    description: "Automated credit scoring and document verification reduces approval time from days to minutes.",
  },
  {
    icon: Shield,
    title: "Built-in Compliance",
    description: "Pre-configured for KYC, AML, and regulatory requirements across jurisdictions.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Comprehensive dashboards provide instant insights into portfolio health and performance.",
  },
];

const benefits = [
  "Reduce loan processing time by 90%",
  "Decrease default rates by up to 35%",
  "Lower operational costs by 60%",
  "Serve 10x more customers without scaling headcount",
  "Achieve 99.9% compliance accuracy",
  "Launch new products in weeks, not months",
];

const SolutionSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="solution" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Our Solution
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Lendora: The{" "}
            <span className="italic gradient-text">Intelligent</span> Way to Lend
          </h2>
          <p className="text-muted-foreground text-lg">
            We've built the complete lending infrastructure that handles everything from 
            application to disbursement, powered by cutting-edge AI.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`p-8 rounded-2xl glass border border-border/50 hover:border-primary/50 transition-all duration-500 card-hover group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100 + 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-background" />
              </div>
              <h3 className="text-xl font-serif mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits & CTA */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h3 className="text-3xl font-serif mb-8">
              Why Teams Choose <span className="gradient-text">Lendora</span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={benefit} 
                  className="flex items-start gap-3"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`relative transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="absolute -inset-2 gradient-bg rounded-3xl blur-xl opacity-30" />
            <div className="relative glass rounded-3xl p-8 border border-border/50">
              <h4 className="text-2xl font-serif mb-4">Ready to transform your lending?</h4>
              <p className="text-muted-foreground mb-6">
                Join leading financial institutions who've already modernized their lending 
                operations with Lendora.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="gradient-bg border-0 hover:opacity-90 group">
                  Get Started Free
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="bg-secondary/50 border-border">
                  Book a Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;