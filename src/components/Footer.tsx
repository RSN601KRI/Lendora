import { Github, Linkedin, Twitter, Heart } from "lucide-react";
import lendoraLogo from "@/assets/lendora-logo.png";

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "API Reference", "Documentation"],
  Company: ["About Us", "Careers", "Blog", "Press", "Partners"],
  Resources: ["Case Studies", "Help Center", "Security", "Status", "Changelog"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR Compliance"],
};

const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 bg-card/30">
      {/* Background gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[150px] rounded-full" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6 group">
              <img 
                src={lendoraLogo} 
                alt="Lendora Logo" 
                className="h-10 w-auto transition-transform group-hover:scale-105"
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
                className="w-10 h-10 rounded-xl glass border border-border/50 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl glass border border-border/50 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl glass border border-border/50 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all"
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
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-primary after:transition-all hover:after:w-full"
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
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>© 2025 Lendora. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline-flex items-center gap-1">
                Made with <Heart className="w-3 h-3 text-destructive fill-destructive" /> in San Francisco
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Status indicator */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass text-sm border border-border/50">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
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