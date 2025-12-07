import { motion } from "framer-motion";
import { Home, Car, GraduationCap, Wallet, Building, ShoppingBag } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import StaggerContainer, { itemVariants } from "./animations/StaggerContainer";

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
  return (
    <section id="use-cases" className="py-32 relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Power Any{" "}
            <span className="text-primary italic">Lending Product</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From consumer loans to enterprise credit facilities, 
            our platform adapts to your unique lending requirements.
          </p>
        </ScrollReveal>

        {/* Use Cases Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {useCases.map((useCase) => (
            <motion.div
              key={useCase.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative group cursor-pointer"
            >
              <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 h-full">
                <div className="relative z-10">
                  <motion.div 
                    className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <useCase.icon className="w-7 h-7 text-primary" />
                  </motion.div>

                  <h3 className="text-xl font-serif mb-3 group-hover:text-primary transition-colors">{useCase.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {useCase.description}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-6 pt-4 border-t border-border">
                    <div>
                      <div className="text-lg font-serif text-primary">
                        {useCase.stats.approval}
                      </div>
                      <div className="text-xs text-muted-foreground">Approval Rate</div>
                    </div>
                    <div>
                      <div className="text-lg font-serif text-primary">
                        {useCase.stats.time}
                      </div>
                      <div className="text-xs text-muted-foreground">Decision Time</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default UseCases;
