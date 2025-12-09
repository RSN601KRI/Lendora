import { motion } from "framer-motion";
import { Users, Shield, FileCheck, FileText, MessageSquare } from "lucide-react";

type Stage = "GREETING" | "SALES" | "VERIFICATION" | "UNDERWRITING" | "SANCTION";

interface AgentProgressProps {
  currentStage: Stage;
}

const agents = [
  { id: "GREETING", label: "Welcome", icon: MessageSquare, color: "bg-blue-500" },
  { id: "SALES", label: "Sales", icon: Users, color: "bg-purple-500" },
  { id: "VERIFICATION", label: "Verify", icon: Shield, color: "bg-amber-500" },
  { id: "UNDERWRITING", label: "Assess", icon: FileCheck, color: "bg-emerald-500" },
  { id: "SANCTION", label: "Decision", icon: FileText, color: "bg-primary" },
];

const AgentProgress = ({ currentStage }: AgentProgressProps) => {
  const currentIndex = agents.findIndex(a => a.id === currentStage);

  return (
    <div className="px-4 py-3 bg-secondary/50 border-b border-border">
      <div className="flex items-center justify-between">
        {agents.map((agent, idx) => {
          const isActive = agent.id === currentStage;
          const isCompleted = idx < currentIndex;
          const Icon = agent.icon;

          return (
            <div key={agent.id} className="flex flex-col items-center gap-1 flex-1">
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  opacity: isActive || isCompleted ? 1 : 0.4,
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isActive ? agent.color : isCompleted ? "bg-primary/80" : "bg-muted"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive || isCompleted ? "text-white" : "text-muted-foreground"}`} />
              </motion.div>
              <span className={`text-[10px] ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {agent.label}
              </span>
              {idx < agents.length - 1 && (
                <div className="absolute top-4 left-full w-full h-0.5 bg-border -z-10" />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Progress bar */}
      <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentIndex + 1) / agents.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default AgentProgress;
