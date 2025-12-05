import { useEffect, useRef, useState } from "react";
import { Brain, Shield, Zap, BarChart3, Users, Lock } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Underwriting",
    description: "Advanced machine learning models analyze thousands of data points to make accurate lending decisions in seconds.",
  },
  {
    icon: Shield,
    title: "Fraud Detection",
    description: "Real-time fraud detection using behavioral analytics and anomaly detection to protect your portfolio.",
  },
  {
    icon: Zap,
    title: "Instant Decisions",
    description: "Reduce approval times from days to minutes with automated credit scoring and risk assessment.",
  },
  {
    icon: BarChart3,
    title: "Portfolio Analytics",
    description: "Comprehensive dashboards with real-time insights into your lending portfolio performance.",
  },
  {
    icon: Users,
    title: "Customer 360°",
    description: "Unified customer view combining credit history, transaction data, and behavioral patterns.",
  },
  {
    icon: Lock,
    title: "Bank-Grade Security",
    description: "SOC 2 Type II certified with end-to-end encryption and compliance with global regulations.",
  },
];

const Features = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current?.querySelectorAll(".feature-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-32 relative" ref={sectionRef}>
      {/* Background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[150px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Everything you need to{" "}
            <span className="italic gradient-text">scale lending</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Built by lending experts, powered by cutting-edge AI. 
            Our platform handles the complexity so you can focus on growth.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              data-index={index}
              className={`feature-card group p-8 rounded-2xl glass border border-border/50 hover:border-primary/50 transition-all duration-500 cursor-pointer ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors group-hover:scale-110 transform duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif mb-3 group-hover:gradient-text transition-all">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
