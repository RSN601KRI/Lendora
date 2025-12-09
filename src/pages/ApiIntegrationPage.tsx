import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Code, Terminal, FileCode, Zap } from "lucide-react";
import { motion } from "framer-motion";

const ApiIntegrationPage = () => {
  const navigate = useNavigate();

  const codeExamples = [
    {
      language: "JavaScript",
      code: `import { Lendora } from '@lendora/sdk';

const client = new Lendora({
  apiKey: process.env.LENDORA_API_KEY
});

const decision = await client.evaluate({
  applicant: { creditScore: 720, income: 85000 },
  loanAmount: 25000,
  purpose: 'home_improvement'
});

console.log(decision.approved); // true`,
    },
    {
      language: "Python",
      code: `from lendora import LendoraClient

client = LendoraClient(api_key=os.environ["LENDORA_API_KEY"])

decision = client.evaluate(
    applicant={"credit_score": 720, "income": 85000},
    loan_amount=25000,
    purpose="home_improvement"
)

print(decision.approved)  # True`,
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Real-time Decisions",
      description: "Get loan decisions in under 100ms with our optimized API",
    },
    {
      icon: Code,
      title: "RESTful API",
      description: "Standard REST endpoints with comprehensive documentation",
    },
    {
      icon: Terminal,
      title: "SDK Support",
      description: "Native SDKs for JavaScript, Python, Go, and more",
    },
    {
      icon: FileCode,
      title: "Webhooks",
      description: "Real-time notifications for decision updates",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">L</span>
            </div>
            <span className="font-semibold text-foreground">API Integration</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              API Integration
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Integrate Lendora's intelligent lending decisions into your application 
              with our powerful SDK and RESTful API.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Code Examples */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {codeExamples.map((example, index) => (
              <motion.div
                key={example.language}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <div className="bg-muted/50 px-4 py-2 border-b border-border flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{example.language}</span>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-muted-foreground">{example.code}</code>
                </pre>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 text-center"
          >
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Ready to get started?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Check out our GitHub repository for the full SDK documentation and examples.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full gap-2"
                onClick={() => window.open("https://github.com/lendora-ai/lendora-sdk", "_blank")}
              >
                View on GitHub
                <ExternalLink className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => window.open("https://docs.lendora.io", "_blank")}
              >
                Read Documentation
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default ApiIntegrationPage;
