import { useEffect, useRef, useState } from "react";
import { Home, Car, GraduationCap, Wallet, Building, ShoppingBag } from "lucide-react";

const useCases = [
  {
    icon: Wallet,
    title: "Personal Loans",
    description: "Instant personal loan approvals with AI-driven credit assessment and dynamic pricing.",
    stats: { approval: "85%", time: "< 5 min" },
  },
  {
    icon: Home,
    title: "Home Loans",
    description: "Streamlined mortgage processing with automated document verification and property valuation.",
    stats: { approval: "78%", time: "< 48 hrs" },
  },
  {
    icon: Car,
    title: "Auto Finance",
    description: "End-to-end vehicle financing with dealer integrations and instant loan disbursement.",
    stats: { approval: "82%", time: "< 30 min" },
  },
  {
    icon: Building,
    title: "Business Loans",
    description: "SME lending powered by cash flow analysis and alternative data sources.",
    stats: { approval: "72%", time: "< 24 hrs" },
  },
  {
    icon: GraduationCap,
    title: "Education Loans",
    description: "Student financing with income-share agreements and flexible repayment options.",
    stats: { approval: "90%", time: "< 2 hrs" },
  },
  {
    icon: ShoppingBag,
    title: "Buy Now Pay Later",
    description: "Instant checkout financing with real-time credit decisions and merchant integrations.",
    stats: { approval: "88%", time: "< 3 sec" },
  },
];

const UseCases = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

    const cards = sectionRef.current?.querySelectorAll(".usecase-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="use-cases" className="py-32 relative" ref={sectionRef}>
      {/* Background gradient */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Use Cases
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Power any{" "}
            <span className="italic gradient-text">lending product</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From consumer loans to enterprise credit facilities, 
            our platform adapts to your unique lending requirements.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.title}
              data-index={index}
              className={`usecase-card relative group cursor-pointer ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms`, transition: "all 0.5s ease" }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative p-8 rounded-2xl glass border border-border/50 hover:border-accent/50 transition-all duration-500 h-full">
                {/* Glow effect on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-accent/5 transition-opacity duration-300 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-all group-hover:scale-110 transform duration-300">
                    <useCase.icon className="w-7 h-7 text-accent" />
                  </div>

                  <h3 className="text-xl font-serif mb-3">{useCase.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {useCase.description}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-6 pt-4 border-t border-border/50">
                    <div>
                      <div className="text-lg font-serif text-accent">
                        {useCase.stats.approval}
                      </div>
                      <div className="text-xs text-muted-foreground">Approval Rate</div>
                    </div>
                    <div>
                      <div className="text-lg font-serif text-accent">
                        {useCase.stats.time}
                      </div>
                      <div className="text-xs text-muted-foreground">Decision Time</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
