import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, CreditCard, Smartphone, Briefcase } from "lucide-react";

const solutions = [
  {
    id: "banks",
    icon: Building2,
    title: "For Banks",
    subtitle: "Enterprise Solutions",
    description: "Transform legacy systems with modern AI infrastructure. Seamlessly integrate with existing core banking systems while unlocking new lending capabilities.",
    features: ["Core banking integration", "Regulatory compliance", "White-label solutions", "24/7 enterprise support"],
    gradient: "from-primary to-purple-500",
  },
  {
    id: "fintechs",
    icon: CreditCard,
    title: "For Fintechs",
    subtitle: "Scale Fast",
    description: "Launch new lending products in weeks, not months. Our API-first platform gives you the flexibility to innovate while we handle compliance.",
    features: ["RESTful APIs", "Webhook events", "Sandbox testing", "Real-time decisioning"],
    gradient: "from-accent to-cyan-400",
  },
  {
    id: "nbfcs",
    icon: Smartphone,
    title: "For NBFCs",
    subtitle: "Digital Lending",
    description: "Go digital with confidence. Complete loan origination system with mobile-first customer experience and automated collections.",
    features: ["Mobile onboarding", "eKYC verification", "Digital agreements", "Auto-debit setup"],
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "enterprise",
    icon: Briefcase,
    title: "Enterprise",
    subtitle: "Custom Solutions",
    description: "Tailored lending solutions for complex use cases. Dedicated team, custom integrations, and on-premise deployment options.",
    features: ["Custom ML models", "On-premise option", "Dedicated success team", "SLA guarantees"],
    gradient: "from-emerald-500 to-teal-500",
  },
];

const Solutions = () => {
  const [activeTab, setActiveTab] = useState("banks");
  const activeSolution = solutions.find((s) => s.id === activeTab)!;

  return (
    <section id="solutions" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Solutions
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Built for every{" "}
            <span className="italic gradient-text">lending business</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Whether you're a traditional bank or a digital-first fintech, 
            we have the right solution for your needs.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {solutions.map((solution) => (
            <button
              key={solution.id}
              onClick={() => setActiveTab(solution.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === solution.id
                  ? "glass border-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              {solution.title}
            </button>
          ))}
        </div>

        {/* Active Solution Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${activeSolution.gradient} bg-opacity-10 mb-6`}>
              <activeSolution.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{activeSolution.subtitle}</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-serif mb-6">
              {activeSolution.title}
            </h3>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {activeSolution.description}
            </p>
            <ul className="space-y-4 mb-8">
              {activeSolution.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${activeSolution.gradient}`} />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="gradient-bg border-0 hover:opacity-90 group">
              Learn More
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Visual Card */}
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${activeSolution.gradient} opacity-20 blur-3xl rounded-3xl`} />
            <div className="relative glass rounded-3xl p-8 border border-border/50">
              <div className="aspect-video rounded-2xl bg-secondary/50 flex items-center justify-center">
                <activeSolution.icon className="w-20 h-20 text-muted-foreground/30" />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="glass rounded-xl p-4">
                  <div className="text-2xl font-serif gradient-text mb-1">98%</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-2xl font-serif gradient-text mb-1">&lt;2s</div>
                  <div className="text-sm text-muted-foreground">Decision Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
