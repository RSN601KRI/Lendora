import { Github, Linkedin, Twitter, Heart } from "lucide-react";
import lendoraLogo from "@/assets/lendora-logo.png";
import { Button } from "@/components/ui/button";

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "API Reference", "Documentation"],
  Resources: ["Case Studies", "Help Center", "Security", "Status", "Changelog"],
};

const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-card">
      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* CTA Section */}
        <div className="text-center mb-16 pb-16 border-b border-border">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Start processing loans in <span className="text-primary">5 minutes.</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Get started with our free tier. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8">
              Get Started Free
            </Button>
            <Button variant="outline" className="border-border hover:bg-secondary rounded-full px-8">
              Contact Sales
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6 group">
              <img 
                src={lendoraLogo} 
                alt="Lendora Logo" 
                className="h-8 w-auto transition-transform group-hover:scale-105"
              />
              <span className="text-xl font-serif">Lendora</span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
              AI-powered lending infrastructure for modern financial institutions. 
              Ship your lending product faster, smarter, and more securely.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-medium mb-4 text-foreground">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>© 2025 Lendora. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline-flex items-center gap-1">
                Made with <Heart className="w-3 h-3 text-destructive fill-destructive" /> in India
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Status indicator */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm border border-border">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-muted-foreground">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
