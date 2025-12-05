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

const ProblemSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="problem" className="py-32 relative" ref={ref}>
      {/* Background gradient */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-destructive/10 blur-[150px] rounded-full -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <span className="text-destructive text-sm font-medium tracking-wider uppercase mb-4 block">
              The Problem
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Traditional Lending is{" "}
              <span className="italic text-destructive">Broken</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Financial institutions struggle with outdated processes that fail to meet 
              modern customer expectations. Manual underwriting, fragmented data, and 
              legacy systems create bottlenecks that cost time, money, and customers.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
                <span className="text-muted-foreground">60% of loan applications are abandoned due to slow processing</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-destructive animate-pulse animation-delay-200" />
                <span className="text-muted-foreground">Traditional underwriting misses 40% of creditworthy borrowers</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-destructive animate-pulse animation-delay-400" />
                <span className="text-muted-foreground">Compliance costs consume 15-20% of lending revenue</span>
              </div>
            </div>
          </div>

          {/* Right - Problem Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {problems.map((problem, index) => (
              <div
                key={problem.title}
                className={`p-6 rounded-2xl glass border border-border/50 hover:border-destructive/50 transition-all duration-500 card-hover ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
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
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;