import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useChatAnalytics } from "@/hooks/useChatAnalytics";
import { downloadSanctionLetter } from "@/utils/pdfGenerator";
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2,
  Download
} from "lucide-react";
import AgentProgress from "./AgentProgress";
import MockProfileSelector from "./MockProfileSelector";
import VoiceInput from "./VoiceInput";

type Message = { role: "user" | "assistant"; content: string };
type Stage = "GREETING" | "SALES" | "VERIFICATION" | "UNDERWRITING" | "SANCTION";
type ProfileType = "excellent" | "good" | "borderline" | "rejected" | null;

interface LoanDetails {
  amount: number;
  term: number;
  purpose: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/loan-agent`;

const LoanChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState<Stage>("GREETING");
  const [profileType, setProfileType] = useState<ProfileType>(null);
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({ amount: 25000, term: 36, purpose: "Personal" });
  const [showProfileSelector, setShowProfileSelector] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { 
    startSession, 
    trackStage, 
    trackMessage, 
    endSession, 
    getElapsedTime, 
    resetAnalytics,
    analytics 
  } = useChatAnalytics();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectStageTransition = (content: string): Stage | null => {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes("verify") || lowerContent.includes("confirm your") || lowerContent.includes("your information")) {
      return "VERIFICATION";
    }
    if (lowerContent.includes("evaluate") || lowerContent.includes("assess") || lowerContent.includes("credit") || lowerContent.includes("eligibility")) {
      return "UNDERWRITING";
    }
    if (lowerContent.includes("approved") || lowerContent.includes("rejected") || lowerContent.includes("decision") || lowerContent.includes("sanction")) {
      return "SANCTION";
    }
    if (lowerContent.includes("loan amount") || lowerContent.includes("interest") || lowerContent.includes("how much") || lowerContent.includes("borrow")) {
      return "SALES";
    }
    return null;
  };

  const detectOutcome = (content: string): "approved" | "rejected" | null => {
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes("approved") || lowerContent.includes("congratulations")) {
      return "approved";
    }
    if (lowerContent.includes("rejected") || lowerContent.includes("unfortunately") || lowerContent.includes("not able to approve")) {
      return "rejected";
    }
    return null;
  };

  const streamChat = async (userMessage: string) => {
    setIsLoading(true);
    
    const userMsg: Message = { role: "user", content: userMessage };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

    let assistantContent = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: updatedMessages, 
          stage, 
          profileType,
          loanDetails 
        }),
      });

      if (!resp.ok) {
        const error = await resp.json();
        throw new Error(error.error || "Failed to get response");
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        
        let newlineIndex;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => 
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { role: "assistant", content: assistantContent }];
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // Track message
      trackMessage();

      // Detect stage transition
      const newStage = detectStageTransition(assistantContent);
      if (newStage && newStage !== stage) {
        setStage(newStage);
        trackStage(newStage);
      }

      // Detect outcome for analytics
      const outcome = detectOutcome(assistantContent);
      if (outcome) {
        endSession(outcome);
      }

    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const message = input.trim();
    setInput("");
    trackMessage();
    streamChat(message);
  };

  const startDemo = (profile: ProfileType) => {
    setProfileType(profile);
    setShowProfileSelector(false);
    setStage("GREETING");
    startSession(profile || "unknown");
    
    // Initial greeting
    streamChat("Hello, I'm interested in getting a personal loan.");
  };

  const resetChat = () => {
    setMessages([]);
    setStage("GREETING");
    setProfileType(null);
    setShowProfileSelector(true);
    if (analytics.startTime && !analytics.completed) {
      endSession("abandoned");
    }
    resetAnalytics();
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-md h-[600px] max-h-[80vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Lendora AI</h3>
                  <p className="text-xs opacity-80">
                    {analytics.startTime ? `Demo Time: ${getElapsedTime()}` : "Try the loan journey demo"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={resetChat}
                    className="text-primary-foreground hover:bg-white/20 text-xs cursor-pointer"
                  >
                    Reset
                  </Button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Agent Progress */}
            {!showProfileSelector && <AgentProgress currentStage={stage} />}

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {showProfileSelector ? (
                <MockProfileSelector onSelectProfile={startDemo} />
              ) : (
                <>
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-foreground"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">
                          {msg.content.replace(/\*+/g, '')}
                        </p>
                      </div>
                      {msg.role === "user" && (
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div className="bg-secondary rounded-2xl px-4 py-3">
                        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            {!showProfileSelector && (
              <div className="p-4 border-t border-border space-y-3">
                {/* Download Button - Show when sanction stage is reached */}
                {stage === "SANCTION" && analytics.outcome && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const profile = profileType ? {
                        excellent: { name: "Sarah Johnson", creditScore: 780 },
                        good: { name: "Michael Chen", creditScore: 720 },
                        borderline: { name: "Emily Rodriguez", creditScore: 650 },
                        rejected: { name: "James Wilson", creditScore: 520 },
                      }[profileType] : { name: "Demo User", creditScore: 700 };

                      const approved = analytics.outcome === "approved";
                      const interestRate = profile.creditScore >= 750 ? 8.99 : 
                                          profile.creditScore >= 700 ? 10.99 : 
                                          profile.creditScore >= 650 ? 12.99 : 14.99;
                      const monthlyRate = interestRate / 100 / 12;
                      const emi = (loanDetails.amount * monthlyRate * Math.pow(1 + monthlyRate, loanDetails.term)) / 
                                 (Math.pow(1 + monthlyRate, loanDetails.term) - 1);

                      downloadSanctionLetter({
                        applicantName: profile.name,
                        loanAmount: loanDetails.amount,
                        interestRate,
                        term: loanDetails.term,
                        emi,
                        purpose: loanDetails.purpose,
                        creditScore: profile.creditScore,
                        approved,
                        rejectionReasons: approved ? undefined : [
                          "Credit score below minimum threshold",
                          "Insufficient employment history",
                          "High debt-to-income ratio"
                        ],
                        date: new Date(),
                      });
                    }}
                    className="w-full cursor-pointer"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download {analytics.outcome === "approved" ? "Sanction" : "Decision"} Letter (PDF)
                  </Button>
                )}
                
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <VoiceInput 
                    onTranscript={(text) => {
                      setInput(text);
                    }} 
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !input.trim()}
                    className="cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LoanChatbot;
