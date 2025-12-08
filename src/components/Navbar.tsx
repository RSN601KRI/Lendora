import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Github } from "lucide-react";
import lendoraLogo from "@/assets/lendora-logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Problem", href: "#problem" },
    { name: "Solution", href: "#solution" },
    { name: "Use Cases", href: "#use-cases" },
    { name: "Proof", href: "#proof" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md py-3 border-b border-border"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <img 
            src={lendoraLogo} 
            alt="Lendora Logo" 
            className="h-8 w-auto transition-transform group-hover:scale-105"
          />
          <span className="text-xl font-serif hidden sm:block">
            Lendora
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button 
            type="button"
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground gap-2 cursor-pointer"
            onClick={() => window.open("https://github.com/lendora-ai", "_blank")}
          >
            <Github className="w-4 h-4" />
            GitHub
          </Button>
          <Button 
            type="button"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full cursor-pointer"
            onClick={() => scrollToSection("#contact")}
          >
            Launch Demo
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-foreground p-2 hover:bg-secondary rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-muted-foreground hover:text-foreground transition-colors py-2 text-left"
            >
              {link.name}
            </button>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-border">
            <Button 
              type="button"
              variant="ghost" 
              className="justify-start gap-2 cursor-pointer"
              onClick={() => window.open("https://github.com/lendora-ai", "_blank")}
            >
              <Github className="w-4 h-4" />
              GitHub
            </Button>
            <Button 
              type="button"
              className="bg-primary text-primary-foreground rounded-full cursor-pointer"
              onClick={() => scrollToSection("#contact")}
            >
              Launch Demo
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
