import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, AlertTriangle, XCircle, Sparkles } from "lucide-react";

type ProfileType = "excellent" | "good" | "borderline" | "rejected";

interface MockProfileSelectorProps {
  onSelectProfile: (profile: ProfileType) => void;
}

const profiles = [
  {
    type: "excellent" as ProfileType,
    name: "Sarah Johnson",
    creditScore: 780,
    description: "Excellent credit, high income",
    icon: CheckCircle,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10 hover:bg-emerald-500/20",
    borderColor: "border-emerald-500/30",
    outcome: "Instant Approval",
  },
  {
    type: "good" as ProfileType,
    name: "Michael Chen",
    creditScore: 720,
    description: "Good credit, stable employment",
    icon: CheckCircle,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10 hover:bg-blue-500/20",
    borderColor: "border-blue-500/30",
    outcome: "Likely Approved",
  },
  {
    type: "borderline" as ProfileType,
    name: "Emily Rodriguez",
    creditScore: 650,
    description: "Fair credit, limited history",
    icon: AlertTriangle,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10 hover:bg-amber-500/20",
    borderColor: "border-amber-500/30",
    outcome: "Conditional",
  },
  {
    type: "rejected" as ProfileType,
    name: "James Wilson",
    creditScore: 520,
    description: "Poor credit, multiple loans",
    icon: XCircle,
    color: "text-red-500",
    bgColor: "bg-red-500/10 hover:bg-red-500/20",
    borderColor: "border-red-500/30",
    outcome: "Likely Rejected",
  },
];

const MockProfileSelector = ({ onSelectProfile }: MockProfileSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3"
        >
          <Sparkles className="w-8 h-8 text-primary" />
        </motion.div>
        <h3 className="font-semibold text-lg text-foreground">Try the Loan Demo</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Select a test profile to experience the complete AI-powered loan journey
        </p>
      </div>

      <div className="space-y-2">
        {profiles.map((profile, idx) => {
          const Icon = profile.icon;
          return (
            <motion.button
              key={profile.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onSelectProfile(profile.type)}
              className={`w-full p-3 rounded-xl border ${profile.borderColor} ${profile.bgColor} transition-all cursor-pointer text-left`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${profile.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground text-sm">{profile.name}</span>
                    <span className={`text-xs font-medium ${profile.color}`}>{profile.outcome}</span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs text-muted-foreground">{profile.description}</span>
                    <span className="text-xs text-muted-foreground">Score: {profile.creditScore}</span>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <p className="text-xs text-center text-muted-foreground mt-4">
        ⏱️ Complete demo in under 10 minutes • 🤖 4 AI agents working together
      </p>
    </div>
  );
};

export default MockProfileSelector;
