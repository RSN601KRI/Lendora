import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { User, Session } from "@supabase/supabase-js";
import { LogOut, User as UserIcon, Zap, Database, Code, ArrowRight } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (!session) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const features = [
    {
      icon: Database,
      title: "Knowledge Graph",
      description: "Access and explore your structured financial data",
      action: () => navigate("/#knowledge-graph"),
    },
    {
      icon: Code,
      title: "API Integration",
      description: "Connect with our SDK for seamless automation",
      action: () => window.open("https://github.com/lendora-ai/lendora-sdk", "_blank"),
    },
    {
      icon: Zap,
      title: "Real-time Analytics",
      description: "Monitor lending decisions in real-time",
      action: () => navigate("/#analytics"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">L</span>
            </div>
            <span className="font-semibold text-foreground">Lendora</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UserIcon className="w-4 h-4" />
              <span>{user?.email}</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Welcome back, {user?.user_metadata?.full_name || "User"}!
            </h1>
            <p className="text-lg text-muted-foreground">
              Your Lendora dashboard is ready. Explore the features below to get started.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={feature.action}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8"
          >
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Ready to integrate?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Start building with Lendora's API. Our SDK makes it easy to integrate 
              intelligent lending decisions into your application.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                type="button"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full cursor-pointer"
                onClick={() => window.open("https://docs.lendora.io", "_blank")}
              >
                View Documentation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-full cursor-pointer"
                onClick={() => window.open("https://github.com/lendora-ai/lendora-sdk", "_blank")}
              >
                GitHub Repository
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
