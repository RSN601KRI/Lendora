import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bot, Clock, TrendingUp, Users, ArrowRight, Sparkles } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";

interface TryDemoSectionProps {
  onOpenChat: () => void;
}

const TryDemoSection = ({ onOpenChat }: TryDemoSectionProps) => {
  const stats = [
    { icon: Clock, value: "<10 min", label: "Average Processing Time" },
    { icon: TrendingUp, value: "25-30%", label: "Conversion Improvement" },
    { icon: Users, value: "4 Agents", label: "Working Together" },
  ];

  const agents = [
    { name: "Sales Agent", description: "Discusses loan options and terms", color: "bg-purple-500" },
    { name: "Verification Agent", description: "Validates identity and employment", color: "bg-amber-500" },
    { name: "Underwriting Agent", description: "Evaluates credit and eligibility", color: "bg-emerald-500" },
    { name: "Sanction Generator", description: "Creates approval decisions", color: "bg-primary" },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Interactive Demo</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Experience the <span className="text-primary italic">AI Loan Journey</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Test our agentic AI architecture with mock profiles. See how four specialized 
              agents work together to process loans in under 10 minutes.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal delay={0.1}>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-serif text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Agents Grid */}
        <ScrollReveal delay={0.2}>
          <div className="bg-card border border-border rounded-2xl p-8 mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
              Meet Your AI Loan Team
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              {agents.map((agent, idx) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="bg-secondary/50 rounded-xl p-4 h-full">
                    <div className={`w-10 h-10 ${agent.color} rounded-lg flex items-center justify-center mb-3`}>
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-medium text-foreground text-sm mb-1">{agent.name}</h4>
                    <p className="text-xs text-muted-foreground">{agent.description}</p>
                  </div>
                  {idx < agents.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.3}>
          <div className="text-center">
            <Button
              type="button"
              size="lg"
              onClick={onOpenChat}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-lg group cursor-pointer"
            >
              <Bot className="w-5 h-5 mr-2" />
              Try Demo Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              No signup required • Choose from 4 test profiles • Complete in minutes
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TryDemoSection;
