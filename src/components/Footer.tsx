import { Github, Linkedin, Twitter } from "lucide-react";
import lendoraLogo from "@/assets/lendora-logo.png";

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Changelog", "Documentation"],
  Company: ["About", "Blog", "Careers", "Press", "Contact"],
  Resources: ["Case Studies", "API Reference", "Security", "Status", "Support"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
};

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6">
              <img 
                src={lendoraLogo} 
                alt="Lendora Logo" 
                className="h-10 w-auto"
              />
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              AI-powered lending infrastructure for modern financial institutions. 
              Ship your lending product faster with Lendora.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full glass border border-border/50 flex items-center justify-center hover:border-primary/50 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass border border-border/50 flex items-center justify-center hover:border-primary/50 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass border border-border/50 flex items-center justify-center hover:border-primary/50 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-medium mb-4">{category}</h4>
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
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2025 Lendora. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full glass text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-muted-foreground">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
