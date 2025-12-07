import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { TrendingUp, Users, Clock, Shield, Bot, FileText, BarChart3 } from "lucide-react";

const caseStudies = [
  {
    company: "Leading Digital Bank",
    logo: "🏦",
    industry: "Banking",
    results: [
      { label: "Loan Processing Time", value: "-85%", icon: Clock },
      { label: "Customer Acquisition", value: "+120%", icon: Users },
      { label: "Default Rate", value: "-32%", icon: TrendingUp },
    ],
    quote: "Lendora transformed our lending operations. What used to take days now happens in minutes.",
    author: "Chief Digital Officer",
  },
  {
    company: "Fast-Growing NBFC",
    logo: "💳",
    industry: "Financial Services",
    results: [
      { label: "Operational Costs", value: "-55%", icon: TrendingUp },
      { label: "Loan Volume", value: "+300%", icon: Users },
      { label: "Compliance Score", value: "99.8%", icon: Shield },
    ],
    quote: "We scaled from 10K to 50K loans/month without adding underwriting staff. Game changer.",
    author: "VP of Operations",
  },
  {
    company: "Enterprise Fintech",
    logo: "🚀",
    industry: "Technology",
    results: [
      { label: "Time to Market", value: "-70%", icon: Clock },
      { label: "API Response Time", value: "<50ms", icon: TrendingUp },
      { label: "Customer Satisfaction", value: "4.8/5", icon: Users },
    ],
    quote: "Built our entire lending product on Lendora's APIs. Couldn't have launched this fast otherwise.",
    author: "CTO",
  },
];

const agents = [
  {
    icon: FileText,
    title: "Invoice Agent",
    description: "Automatically matches transactions to invoices, detects underpayments, and sends payment reminders via email or SMS.",
  },
  {
    icon: Bot,
    title: "Renewal Agent",
    description: "Predicts loan renewals based on repayment patterns and engages borrowers with personalized retention offers.",
  },
  {
    icon: BarChart3,
    title: "Analytics Agent",
    description: "Natural language queries for your financial data. Ask \"What was my NPA ratio last month?\" and get instant answers.",
  },
];

const ProofOfConcept = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="proof" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Trusted by{" "}
            <span className="text-primary italic">Industry Leaders</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real results from financial institutions that have transformed their 
            lending operations with Lendora.
          </p>
        </div>

        {/* Case Studies */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {caseStudies.map((study, index) => (
            <div
              key={study.company}
              className={`bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">{study.logo}</div>
                <div>
                  <h3 className="font-serif text-lg">{study.company}</h3>
                  <span className="text-sm text-muted-foreground">{study.industry}</span>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-4 mb-6">
                {study.results.map((result) => (
                  <div key={result.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <result.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{result.label}</span>
                    </div>
                    <span className="font-serif text-primary font-medium">{result.value}</span>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground italic mb-3">
                  "{study.quote}"
                </p>
                <span className="text-xs text-muted-foreground/70">— {study.author}</span>
              </div>
            </div>
          ))}
        </div>

        {/* AI Agents Section */}
        <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif mb-4">
              Autonomous <span className="text-primary">Lending Agents</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Delegate the busywork. Our AI agents handle collections, retention, and analytics 24/7.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card rounded-2xl p-8 border border-border md:col-span-1">
              <div className="text-5xl font-serif text-primary mb-4">80%</div>
              <div className="text-muted-foreground">Less manual operation time</div>
            </div>
            {agents.map((agent, index) => (
              <div
                key={agent.title}
                className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <agent.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-serif mb-2">{agent.title}</h4>
                <p className="text-muted-foreground text-sm">{agent.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofOfConcept;
