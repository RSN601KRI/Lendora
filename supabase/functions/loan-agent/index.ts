import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Mock user profiles for testing
const mockProfiles = {
  "excellent": {
    name: "Sarah Johnson",
    creditScore: 780,
    income: 120000,
    employmentYears: 8,
    existingLoans: 0,
    email: "sarah.johnson@email.com",
    phone: "+1-555-0123",
    employerVerified: true,
    addressVerified: true,
  },
  "good": {
    name: "Michael Chen",
    creditScore: 720,
    income: 85000,
    employmentYears: 4,
    existingLoans: 1,
    email: "michael.chen@email.com",
    phone: "+1-555-0456",
    employerVerified: true,
    addressVerified: true,
  },
  "borderline": {
    name: "Emily Rodriguez",
    creditScore: 650,
    income: 55000,
    employmentYears: 2,
    existingLoans: 2,
    email: "emily.r@email.com",
    phone: "+1-555-0789",
    employerVerified: true,
    addressVerified: false,
  },
  "rejected": {
    name: "James Wilson",
    creditScore: 520,
    income: 35000,
    employmentYears: 0.5,
    existingLoans: 4,
    email: "james.w@email.com",
    phone: "+1-555-0321",
    employerVerified: false,
    addressVerified: false,
  }
};

// Agent system prompts
const masterAgentPrompt = `You are the Master Agent for Lendora, an AI-powered lending platform. Your role is to orchestrate the loan application journey by coordinating with specialized Worker Agents.

You are warm, professional, and empathetic. You guide users through the loan process efficiently while being transparent about each step.

Current conversation stage determines which agent handles the response:
- GREETING: Welcome user, introduce Lendora, ask about loan needs
- SALES: Discuss loan options, amounts, terms, answer questions (Sales Agent)
- VERIFICATION: Collect and verify user information (Verification Agent)
- UNDERWRITING: Evaluate eligibility and credit assessment (Underwriting Agent)
- SANCTION: Generate approval/rejection decision (Sanction Letter Generator)

Always be emotion-aware:
- If user seems hesitant, provide reassurance
- If user is excited, match their enthusiasm professionally
- If user is frustrated, be understanding and helpful

CRITICAL FORMATTING RULES:
- NEVER use asterisks (*) for emphasis or bullet points
- Use plain text without markdown formatting
- Use dashes (-) for lists instead of asterisks
- Do not use bold (**) or italic (*) formatting

Response format: Be conversational and helpful. Keep responses concise but informative.`;

const salesAgentPrompt = `You are the Sales Agent for Lendora. You specialize in:
- Explaining loan products and terms
- Understanding customer needs
- Recommending appropriate loan amounts and terms
- Answering questions about interest rates, EMI, and repayment

Be enthusiastic but not pushy. Focus on finding the right solution for the customer.
Lendora offers personal loans from $5,000 to $100,000 with competitive rates starting at 8.99% APR.
Loan terms available: 12, 24, 36, 48, or 60 months.`;

const verificationAgentPrompt = `You are the Verification Agent for Lendora. You handle:
- Collecting user information (name, email, phone)
- Verifying employment status
- Confirming address and identity
- CRM validation simulation

Be thorough but efficient. Explain why each piece of information is needed.
When verifying, simulate checking against our CRM system.`;

const underwritingAgentPrompt = `You are the Underwriting Agent for Lendora. You evaluate:
- Credit score analysis
- Debt-to-income ratio
- Employment stability
- Risk assessment

Eligibility Rules:
- Minimum credit score: 580
- Maximum debt-to-income ratio: 43%
- Minimum employment: 6 months
- Maximum existing loans: 3

Provide clear, transparent explanations of your evaluation.`;

const sanctionAgentPrompt = `You are the Sanction Letter Generator for Lendora. You:
- Generate approval or rejection decisions
- Provide detailed explanations
- Create official sanction letter content
- Offer next steps and recommendations

For approvals: Include loan amount, interest rate, EMI, term, and conditions.
For rejections: Provide clear reasons and improvement suggestions.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, stage, profileType, loanDetails } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Get mock profile if specified
    const userProfile = profileType ? mockProfiles[profileType as keyof typeof mockProfiles] : null;

    // Build context-aware system prompt based on stage
    let systemPrompt = masterAgentPrompt + "\n\n";
    
    switch (stage) {
      case "SALES":
        systemPrompt += `Current Agent: Sales Agent\n${salesAgentPrompt}`;
        break;
      case "VERIFICATION":
        systemPrompt += `Current Agent: Verification Agent\n${verificationAgentPrompt}`;
        if (userProfile) {
          systemPrompt += `\n\nUser Profile (from CRM):\n${JSON.stringify(userProfile, null, 2)}`;
        }
        break;
      case "UNDERWRITING":
        systemPrompt += `Current Agent: Underwriting Agent\n${underwritingAgentPrompt}`;
        if (userProfile) {
          systemPrompt += `\n\nUser Profile for Assessment:\n${JSON.stringify(userProfile, null, 2)}`;
          if (loanDetails) {
            systemPrompt += `\n\nRequested Loan:\n${JSON.stringify(loanDetails, null, 2)}`;
          }
        }
        break;
      case "SANCTION":
        systemPrompt += `Current Agent: Sanction Letter Generator\n${sanctionAgentPrompt}`;
        if (userProfile && loanDetails) {
          const approved = userProfile.creditScore >= 580 && 
                          userProfile.employmentYears >= 0.5 &&
                          userProfile.existingLoans <= 3;
          
          const interestRate = userProfile.creditScore >= 750 ? 8.99 : 
                              userProfile.creditScore >= 700 ? 10.99 : 
                              userProfile.creditScore >= 650 ? 12.99 : 14.99;
          
          systemPrompt += `\n\nDecision: ${approved ? 'APPROVED' : 'REJECTED'}`;
          systemPrompt += `\nUser Profile:\n${JSON.stringify(userProfile, null, 2)}`;
          systemPrompt += `\nLoan Details:\n${JSON.stringify(loanDetails, null, 2)}`;
          if (approved) {
            systemPrompt += `\nApproved Interest Rate: ${interestRate}% APR`;
            const monthlyRate = interestRate / 100 / 12;
            const months = loanDetails.term || 36;
            const principal = loanDetails.amount || 25000;
            const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                       (Math.pow(1 + monthlyRate, months) - 1);
            systemPrompt += `\nMonthly EMI: $${emi.toFixed(2)}`;
          }
        }
        break;
      default:
        systemPrompt += "Current Stage: GREETING - Welcome the user warmly and introduce Lendora's loan services.";
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });

  } catch (error) {
    console.error("Loan agent error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
