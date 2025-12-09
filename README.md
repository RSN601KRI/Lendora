# **Agentic AI-Powered Digital Loan Sales Assistant**

<img width="1920" height="893" alt="Lendora" src="https://github.com/user-attachments/assets/3588db33-0cbb-4bae-85b8-8b4ebb81457b" />

An AI-driven, conversational, end-to-end personal loan sales assistant designed for NBFCs.
This project leverages **Agentic AI architecture**, enabling seamless automation across customer engagement, KYC verification, credit evaluation and instant sanction-letter generation — all through a web-based chatbot.

## 🚀 **Overview**

Traditional NBFC loan journeys are slow, manual, and impersonal. Customers face long verification steps, unclear eligibility rules, and generic offers — leading to low digital conversion rates.

Our solution introduces an **Agentic AI Loan Sales Assistant** that replicates a human sales officer but operates with the **speed, accuracy, and transparency of AI**.

✔ Conversational & personalized

✔ Automated KYC & credit checks

✔ Real-time underwriting logic

✔ Instant PDF sanction letter generation

✔ Explainable & auditable decisions

## 🧠 **Key Features**

### **1. Master–Worker Agent Architecture**

* **Master Agent**: Handles conversation, identifies intent and orchestrates tasks.
* **Worker Agents**:

  * **Sales Agent** – loan discussion & offer negotiation
  * **KYC Agent** – validates user details from mock CRM
  * **Underwriting Agent** – evaluates credit score & eligibility
  * **Sanction Letter Agent** – generates a PDF instantly

### **2. Web-Based Chat Interface**

Built using **React + Tailwind + shadcn/ui**, providing:

* Smooth chat experience
* Dynamic prompts
* Real-time decisioning

### **3. Backend Intelligence Layer**

* Node.js / Python-based APIs
* Credit Score API (mock)
* CRM API (mock)
* AutoML-enabled scoring logic

## 🏗️ **Project Structure**

```
lendora-launchpad/
│
├── public/                 # Static assets
├── src/
│   ├── components/         # UI components (chat UI, inputs, layouts)
│   ├── agents/             # Master & Worker AI Agents
│   ├── hooks/              # Reusable logic
│   ├── lib/                # Utilities, configs
│   ├── pages/              # Page-level UI
│   ├── services/           # APIs (CRM, Credit Score, Underwriting logic)
│   └── types/              # Typescript interfaces
│
├── supabase/               # DB config (if using Supabase)
│
├── index.html
├── package.json
├── vite.config.ts
└── README.md               
```

## 🗂️ **Tech Stack**

### **Frontend**

* React + TypeScript
* Tailwind CSS
* shadcn/ui
* Vite

### **AI/Backend**

* LangChain
* GPT-based Worker Agents
* Node.js / Python
* PDFKit / ReportLab (PDF generation)

### **Database**

* Supabase / PostgreSQL

### **Cloud**

* Deployed on Vercel / AWS

## 🔄 **Workflow (User Journey)**

1. User visits the NBFC website.
2. Chatbot greets user → collects loan requirements.
3. Master Agent triggers:

   * **Sales Agent** → discusses offer
   * **KYC Agent** → fetches CRM data
   * **Underwriting Agent** → runs eligibility logic
4. If approved → PDF sanction letter generated instantly.
5. User receives next steps and feedback summary.

## 🔧 **Setup Instructions**

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/RSN601KRI/lendora-launchpad.git
cd lendora-launchpad
```

### **2️⃣ Install Dependencies**

```bash
npm install
```

### **3️⃣ Create Environment Variables**

Create a `.env` file:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
OPENAI_API_KEY=
CRM_API_URL=
CREDIT_API_URL=
```

### **4️⃣ Run Development Server**

```bash
npm run dev
```

## 📊 **Architecture Diagram (In Project PDF)**

The system follows a modular, scalable **Agentic Orchestration Architecture** with clear separations between:

* Conversation Layer
* Intelligence Layer
* Decision Layer
* Data Layer
* Output Generation Layer

## 📈 **Impact & Business Value**

✔ **25–30% increase** in conversion rate

✔ **Loan decisions in < 10 minutes**

✔ **30% reduction** in operational effort

✔ **Improved CSAT & trust** through explainable AI

✔ Scalable across geographies and loan products

## 🧪 **Future Enhancements**

* Multilingual agent support
* Voice-enabled interactions
* Federated learning for secure model improvement
* Adaptive emotional intelligence modelling

## 📎 **Project Links**

* [GitHub Repository]()
* [Demo Link](https://lendora-dashboard.vercel.app/)
* Figma Wireframes: https://www.figma.com/board/Hp6zEyCsIR6OeC7FZT9KOM/FinGenie-UX-Flow-Diagram--
Customer-Journey-?node-id=0-1&p=f
* [Architecture PDF]() from EY submission

## 🤝 **Team**

**Algoric Team – EY Techathon 6.0 Finalists**

* [Aryan Panda](https://www.linkedin.com/in/aryan-panda-82baa9256/) – AI, Fullstack, Workflow Design
* [Roshni Kumari](https://www.linkedin.com/in/roshnikumari1/) – Data Science, ML, Feature Engineering
