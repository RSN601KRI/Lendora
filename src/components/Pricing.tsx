import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for startups and small lenders",
    price: { monthly: 499, annually: 399 },
    features: [
      "Up to 1,000 loan decisions/month",
      "Basic credit scoring",
      "Standard API access",
      "Email support",
      "Basic analytics dashboard",
    ],
    popular: false,
  },
  {
    name: "Growth",
    description: "For scaling lending operations",
    price: { monthly: 1499, annually: 1199 },
    features: [
      "Up to 10,000 loan decisions/month",
      "Advanced ML models",
      "Full API access",
      "Priority support",
      "Custom risk rules",
      "Portfolio analytics",
      "Webhook integrations",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large-scale operations",
    price: { monthly: null, annually: null },
    features: [
      "Unlimited loan decisions",
      "Custom ML models",
      "Dedicated infrastructure",
      "24/7 phone support",
      "On-premise deployment",
      "Custom integrations",
      "SLA guarantees",
      "Dedicated success manager",
    ],
    popular: false,
  },
];

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-32 relative">
      {/* Background */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-primary/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent/10 blur-[150px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Simple,{" "}
            <span className="italic gradient-text">transparent</span> pricing
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 glass rounded-full p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !isAnnual
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                isAnnual
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annually
              <span className="ml-2 text-xs text-accent">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl transition-all duration-500 hover:scale-105 ${
                plan.popular
                  ? "glass border-2 border-primary glow"
                  : "glass border border-border/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-bg text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-serif mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                {plan.price.monthly ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-serif">
                      ${isAnnual ? plan.price.annually : plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                ) : (
                  <div className="text-4xl font-serif">Custom</div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "gradient-bg border-0 hover:opacity-90"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {plan.price.monthly ? "Start Free Trial" : "Contact Sales"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
