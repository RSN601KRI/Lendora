import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ExternalLink, TrendingUp, Users, Clock, Shield } from "lucide-react";
import partnershipImg from "@/assets/partnership.jpg";

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

const integrations = [
  { name: "Jira", description: "Project Management" },
  { name: "Confluence", description: "Documentation" },
  { name: "Trello", description: "Task Boards" },
  { name: "Bitbucket", description: "Code Repository" },
  { name: "Opsgenie", description: "Incident Management" },
  { name: "Statuspage", description: "System Status" },
];

const ProofOfConcept = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="proof" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <img 
          src={partnershipImg} 
          alt="Partnership" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Proof of Concept
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Trusted by{" "}
            <span className="italic gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real results from financial institutions that have transformed their 
            lending operations with Lendora.
          </p>
        </div>

        {/* Case Studies */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {caseStudies.map((study, index) => (
            <div
              key={study.company}
              className={`glass rounded-3xl p-8 border border-border/50 hover:border-primary/50 transition-all duration-500 card-hover ${
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
                      <result.icon className="w-4 h-4 text-accent" />
                      <span className="text-sm text-muted-foreground">{result.label}</span>
                    </div>
                    <span className="font-serif gradient-text font-medium">{result.value}</span>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground italic mb-3">
                  "{study.quote}"
                </p>
                <span className="text-xs text-muted-foreground/70">— {study.author}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Atlassian Integration Section */}
        <div className={`glass rounded-3xl p-8 md:p-12 border border-border/50 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
                Enterprise Integrations
              </span>
              <h3 className="text-3xl font-serif mb-4">
                Works with Your <span className="gradient-text">Existing Tools</span>
              </h3>
              <p className="text-muted-foreground mb-6">
                Lendora integrates seamlessly with Atlassian products and other enterprise 
                tools your team already uses, ensuring smooth workflows and collaboration.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="glass px-4 py-2 rounded-full text-sm border border-border/50">
                  SOC 2 Certified
                </span>
                <span className="glass px-4 py-2 rounded-full text-sm border border-border/50">
                  GDPR Compliant
                </span>
                <span className="glass px-4 py-2 rounded-full text-sm border border-border/50">
                  ISO 27001
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {integrations.map((integration, index) => (
                <div
                  key={integration.name}
                  className="glass rounded-xl p-4 border border-border/50 hover:border-accent/50 transition-all duration-300 hover:scale-105 cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{integration.name}</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-xs text-muted-foreground">{integration.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofOfConcept;