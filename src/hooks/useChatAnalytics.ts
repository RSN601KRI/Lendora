import { useState, useCallback } from "react";

export interface ChatAnalytics {
  sessionId: string;
  profileType: string | null;
  startTime: Date | null;
  endTime: Date | null;
  totalMessages: number;
  stagesVisited: string[];
  completed: boolean;
  outcome: "approved" | "rejected" | "abandoned" | null;
  durationSeconds: number | null;
}

export const useChatAnalytics = () => {
  const [analytics, setAnalytics] = useState<ChatAnalytics>({
    sessionId: crypto.randomUUID(),
    profileType: null,
    startTime: null,
    endTime: null,
    totalMessages: 0,
    stagesVisited: [],
    completed: false,
    outcome: null,
    durationSeconds: null,
  });

  const startSession = useCallback((profileType: string) => {
    const now = new Date();
    setAnalytics(prev => ({
      ...prev,
      sessionId: crypto.randomUUID(),
      profileType,
      startTime: now,
      stagesVisited: ["GREETING"],
      totalMessages: 0,
      completed: false,
      outcome: null,
      endTime: null,
      durationSeconds: null,
    }));
    
    console.log("[Analytics] Session started:", {
      sessionId: analytics.sessionId,
      profileType,
      startTime: now.toISOString(),
    });
  }, [analytics.sessionId]);

  const trackStage = useCallback((stage: string) => {
    setAnalytics(prev => {
      if (prev.stagesVisited.includes(stage)) return prev;
      const updated = { ...prev, stagesVisited: [...prev.stagesVisited, stage] };
      console.log("[Analytics] Stage transition:", stage);
      return updated;
    });
  }, []);

  const trackMessage = useCallback(() => {
    setAnalytics(prev => ({
      ...prev,
      totalMessages: prev.totalMessages + 1,
    }));
  }, []);

  const endSession = useCallback((outcome: "approved" | "rejected" | "abandoned") => {
    const now = new Date();
    setAnalytics(prev => {
      const duration = prev.startTime 
        ? Math.floor((now.getTime() - prev.startTime.getTime()) / 1000)
        : null;
      
      const finalAnalytics = {
        ...prev,
        endTime: now,
        completed: outcome !== "abandoned",
        outcome,
        durationSeconds: duration,
      };
      
      console.log("[Analytics] Session completed:", {
        sessionId: finalAnalytics.sessionId,
        profileType: finalAnalytics.profileType,
        outcome,
        durationSeconds: duration,
        totalMessages: finalAnalytics.totalMessages,
        stagesVisited: finalAnalytics.stagesVisited,
        conversionRate: outcome === "approved" ? "100%" : outcome === "rejected" ? "0%" : "N/A",
      });
      
      return finalAnalytics;
    });
  }, []);

  const getElapsedTime = useCallback(() => {
    if (!analytics.startTime) return "0:00";
    const elapsed = Math.floor((new Date().getTime() - analytics.startTime.getTime()) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [analytics.startTime]);

  const resetAnalytics = useCallback(() => {
    setAnalytics({
      sessionId: crypto.randomUUID(),
      profileType: null,
      startTime: null,
      endTime: null,
      totalMessages: 0,
      stagesVisited: [],
      completed: false,
      outcome: null,
      durationSeconds: null,
    });
  }, []);

  return {
    analytics,
    startSession,
    trackStage,
    trackMessage,
    endSession,
    getElapsedTime,
    resetAnalytics,
  };
};
