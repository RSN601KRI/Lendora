import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Shield, Zap, BarChart3, Code, Webhook } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import StaggerContainer, { itemVariants } from "./animations/StaggerContainer";

const features = [
  {
    icon: Brain,
    title: "Smart Decisioning",
    description: "Machine learning models analyze 1000+ data points for accurate risk assessment. Handles wallet connection and gas estimation automatically.",
  },
  {
    icon: BarChart3,
    title: "Merchant Dashboard",
    description: "Real-time analytics, customer management, and transaction history in a unified dark-mode view. Brand it with your own logo and colors.",
  },
  {
    icon: Zap,
    title: "Revenue Analytics",
    description: "Track MRR, churn, and LTV with built-in visualization tools designed for lending metrics.",
  },
  {
    icon: Webhook,
    title: "Webhooks & API",
    description: "Reliable event delivery for payment success, failed renewals, and dispute resolutions via webhooks.",
  },
  {
    icon: Code,
    title: "Cross-Platform SDK",
    description: "Create checkout experiences that look stunning on any device. React, Vue, and vanilla JS supported.",
  },
  {
    icon: Shield,
    title: "Built-in Compliance",
    description: "Pre-configured for KYC, AML, and regulatory requirements across jurisdictions.",
  },
];

const SolutionSection = () => {
  return (
    <section id="solution" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Powerful features to{" "}
            <span className="text-primary italic">simplify your lending</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Infrastructure grade tools for the next generation of lending, designed for scale.
          </p>
        </ScrollReveal>

        {/* Features Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-serif mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Developer Experience Section */}
        <ScrollReveal delay={0.2}>
          <div className="bg-card rounded-2xl border border-border p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                  Developer Experience
                </span>
                <h3 className="text-3xl font-serif mb-4">
                  Integrated in minutes, <span className="text-primary">not weeks.</span>
                </h3>
                <p className="text-muted-foreground mb-6">
                  Our SDK abstracts away the complexity of underwriting, risk assessment, and compliance. 
                  Just drop in the component and start processing loans.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-secondary px-4 py-2 rounded-full text-sm border border-border">
                    Type-safe SDK
                  </span>
                  <span className="bg-secondary px-4 py-2 rounded-full text-sm border border-border">
                    3-minute integration
                  </span>
                  <span className="bg-secondary px-4 py-2 rounded-full text-sm border border-border">
                    Zero backend required
                  </span>
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full group">
                  Read the documentation
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              {/* Code Preview */}
              <motion.div 
                className="bg-background rounded-xl border border-border overflow-hidden"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/50">
                  <span className="text-sm text-muted-foreground font-mono">App.tsx</span>
                  <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Copy
                  </button>
                </div>
                <div className="p-4 font-mono text-sm">
                  <div className="text-muted-foreground">
                    <span className="text-primary">1</span>  <span className="text-muted-foreground">npm install lendora-sdk</span>
                  </div>
                  <div className="text-muted-foreground mt-1">
                    <span className="text-primary">2</span>  
                  </div>
                  <div className="text-muted-foreground mt-1">
                    <span className="text-primary">3</span>  <span className="text-blue-400">import</span> {"{ LoanButton }"} <span className="text-blue-400">from</span> <span className="text-green-400">"lendora-sdk"</span>;
                  </div>
                  <div className="text-muted-foreground mt-1">
                    <span className="text-primary">4</span>  
                  </div>
                  <div className="text-muted-foreground mt-1">
                    <span className="text-primary">5</span>  <span className="text-blue-400">function</span> <span className="text-yellow-400">LoanPage</span>() {"{"}
                  </div>
                  <div className="text-muted-foreground mt-1">
                    <span className="text-primary">6</span>    <span className="text-blue-400">return</span> (
                  </div>
                  <div className="text-muted-foreground mt-1">
                    <span className="text-primary">7</span>      {"<"}<span className="text-cyan-400">LoanButton</span>
                  </div>
                  <div className="text-muted-foreground mt-1">
                    <span className="text-primary">8</span>        <span className="text-purple-400">amount</span>={"{"}<span className="text-orange-400">25000</span>{"}"}
                  </div>
                  <div className="text-muted-foreground mt-1">
                    <span className="text-primary">9</span>        <span className="text-purple-400">currency</span>=<span className="text-green-400">"USD"</span>
                  </div>
                  <div className="text-muted-foreground mt-1">
                    <span className="text-primary">10</span>      {"/>"}
                  </div>
                  <div className="text-muted-foreground mt-1">
                    <span className="text-primary">11</span>    );
                  </div>
                  <div className="text-muted-foreground mt-1">
                    <span className="text-primary">12</span>  {"}"}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SolutionSection;
