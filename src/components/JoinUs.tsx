import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { Github, Code2, Users, Heart, ArrowRight, Star } from "lucide-react";

const contributions = [
  {
    icon: Code2,
    title: "Open Source SDKs",
    description: "Contribute to our open-source client libraries and help improve developer experience.",
    link: "#",
  },
  {
    icon: Users,
    title: "Community Forum",
    description: "Join discussions, share knowledge, and help fellow developers build better lending products.",
    link: "#",
  },
  {
    icon: Heart,
    title: "Partner Program",
    description: "Become a certified Lendora partner and grow your business with our ecosystem.",
    link: "#",
  },
];

const openPositions = [
  { title: "Senior ML Engineer", location: "Remote", type: "Full-time" },
  { title: "Product Designer", location: "San Francisco", type: "Full-time" },
  { title: "DevRel Engineer", location: "Remote", type: "Full-time" },
  { title: "Solutions Architect", location: "New York", type: "Full-time" },
];

const JoinUs = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="join" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 blur-[150px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Join Us
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Build the Future of{" "}
            <span className="italic gradient-text">Lending</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Whether you want to contribute code, join our community, or build your career, 
            there's a place for you at Lendora.
          </p>
        </div>

        {/* Contribution Options */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {contributions.map((item, index) => (
            <div
              key={item.title}
              className={`p-8 rounded-3xl glass border border-border/50 hover:border-accent/50 transition-all duration-500 card-hover group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors group-hover:scale-110 transform duration-300">
                <item.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-serif mb-3">{item.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {item.description}
              </p>
              <Button variant="outline" className="bg-secondary/50 border-border group/btn">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>

        {/* Open Positions */}
        <div className={`grid lg:grid-cols-2 gap-12 items-start transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Careers */}
          <div className="glass rounded-3xl p-8 border border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 text-accent" />
              <h3 className="text-2xl font-serif">Open Positions</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Join a team of talented engineers, designers, and operators building 
              the next generation of lending infrastructure.
            </p>
            <div className="space-y-4">
              {openPositions.map((position) => (
                <div 
                  key={position.title}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group"
                >
                  <div>
                    <h4 className="font-medium group-hover:text-accent transition-colors">{position.title}</h4>
                    <span className="text-sm text-muted-foreground">{position.location} • {position.type}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
            <Button className="w-full mt-6 gradient-bg border-0 hover:opacity-90">
              View All Positions
            </Button>
          </div>

          {/* GitHub */}
          <div className="glass rounded-3xl p-8 border border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <Github className="w-6 h-6 text-foreground" />
              <h3 className="text-2xl font-serif">Open Source</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              We believe in open source. Our client SDKs, documentation, and developer 
              tools are available on GitHub.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="font-medium">lendora-js</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="w-4 h-4" />
                  <span>2.4k</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="font-medium">lendora-python</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="w-4 h-4" />
                  <span>1.8k</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span className="font-medium">lendora-examples</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="w-4 h-4" />
                  <span>890</span>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full bg-secondary/50 border-border">
              <Github className="mr-2 w-4 h-4" />
              Visit GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;