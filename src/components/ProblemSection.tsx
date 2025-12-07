import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { AlertTriangle, Clock, FileWarning, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Slow Loan Processing",
    description: "Traditional lending takes days or weeks for approval, losing customers to faster competitors.",
  },
  {
    icon: AlertTriangle,
    title: "High Default Rates",
    description: "Manual underwriting misses risk signals, leading to poor lending decisions and increased NPAs.",
  },
  {
    icon: FileWarning,
    title: "Compliance Burden",
    description: "Navigating complex regulations manually is expensive, error-prone, and slows down operations.",
  },
  {
    icon: TrendingDown,
    title: "Limited Scalability",
    description: "Legacy systems cannot handle growing loan volumes without proportional cost increases.",
  },
];

const stats = [
  { value: "60%", label: "of loan applications abandoned due to slow processing" },
  { value: "40%", label: "creditworthy borrowers missed by traditional underwriting" },
  { value: "15-20%", label: "of lending revenue consumed by compliance costs" },
];

const ProblemSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="problem" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Traditional Lending is{" "}
            <span className="text-destructive italic">Broken</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Financial institutions struggle with outdated processes that fail to meet 
            modern customer expectations.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className={`p-6 rounded-2xl bg-card border border-border hover:border-destructive/30 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100 + 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-serif mb-2">{problem.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className={`grid md:grid-cols-3 gap-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-6 rounded-xl bg-card border border-border"
            >
              <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
              <div>
                <span className="text-2xl font-serif text-destructive">{stat.value}</span>
                <span className="text-muted-foreground text-sm ml-2">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
