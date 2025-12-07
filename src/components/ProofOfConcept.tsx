import { motion } from "framer-motion";
import { TrendingUp, Users, Clock, Shield, Bot, FileText, BarChart3 } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import StaggerContainer, { itemVariants } from "./animations/StaggerContainer";

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
  return (
    <section id="proof" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Trusted by{" "}
            <span className="text-primary italic">Industry Leaders</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real results from financial institutions that have transformed their 
            lending operations with Lendora.
          </p>
        </ScrollReveal>

        {/* Case Studies */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-24" staggerDelay={0.15}>
          {caseStudies.map((study) => (
            <motion.div
              key={study.company}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-colors duration-300"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  className="text-4xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {study.logo}
                </motion.div>
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
            </motion.div>
          ))}
        </StaggerContainer>

        {/* AI Agents Section */}
        <ScrollReveal delay={0.3}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif mb-4">
              Autonomous <span className="text-primary">Lending Agents</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Delegate the busywork. Our AI agents handle collections, retention, and analytics 24/7.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <motion.div 
              className="bg-card rounded-2xl p-8 border border-border"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="text-5xl font-serif text-primary mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                80%
              </motion.div>
              <div className="text-muted-foreground">Less manual operation time</div>
            </motion.div>
            {agents.map((agent, index) => (
              <motion.div
                key={agent.title}
                className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <agent.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-serif mb-2">{agent.title}</h4>
                <p className="text-muted-foreground text-sm">{agent.description}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProofOfConcept;
