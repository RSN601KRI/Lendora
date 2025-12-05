import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Lendora transformed our lending operations. We went from 3-day approvals to instant decisions. Our conversion rates doubled within the first quarter.",
    author: "Sarah Chen",
    role: "CTO, FinNext Capital",
    company: "FinNext Capital",
  },
  {
    quote: "The AI-powered risk assessment is incredibly accurate. We've seen a 35% reduction in default rates while increasing our approval volume by 50%.",
    author: "Michael Rodriguez",
    role: "Head of Credit, Urban Bank",
    company: "Urban Bank",
  },
  {
    quote: "Integration was seamless. Their team understood our legacy systems and delivered a custom solution that works perfectly with our existing infrastructure.",
    author: "Priya Sharma",
    role: "VP Engineering, LendEasy",
    company: "LendEasy",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-16">
            Trusted by{" "}
            <span className="italic gradient-text">industry leaders</span>
          </h2>

          {/* Testimonial Card */}
          <div className="relative">
            <Quote className="w-16 h-16 text-primary/20 mx-auto mb-8" />

            <div
              className={`transition-all duration-500 ${
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              <blockquote className="text-2xl md:text-3xl font-serif leading-relaxed mb-10 text-balance">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4 flex items-center justify-center text-2xl font-serif">
                  {testimonials[currentIndex].author[0]}
                </div>
                <div className="font-medium text-lg">
                  {testimonials[currentIndex].author}
                </div>
                <div className="text-muted-foreground">
                  {testimonials[currentIndex].role}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full glass border border-border/50 flex items-center justify-center hover:border-primary/50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-12 h-12 rounded-full glass border border-border/50 flex items-center justify-center hover:border-primary/50 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
