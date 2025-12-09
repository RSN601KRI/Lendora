import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Users, Clock, CheckCircle, Download, FileText, FileSpreadsheet } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import jsPDF from "jspdf";
import { toast } from "sonner";

const RealTimeAnalyticsPage = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const applicationData = [
    { time: "00:00", applications: 45, approvals: 38 },
    { time: "04:00", applications: 32, approvals: 28 },
    { time: "08:00", applications: 78, approvals: 65 },
    { time: "12:00", applications: 120, approvals: 102 },
    { time: "16:00", applications: 145, approvals: 125 },
    { time: "20:00", applications: 89, approvals: 76 },
  ];

  const processingTimeData = [
    { name: "Mon", time: 4.2 },
    { name: "Tue", time: 3.8 },
    { name: "Wed", time: 5.1 },
    { name: "Thu", time: 3.5 },
    { name: "Fri", time: 4.0 },
    { name: "Sat", time: 3.2 },
    { name: "Sun", time: 2.9 },
  ];

  const loanPurposeData = [
    { name: "Home Loan", value: 35, color: "#22c55e" },
    { name: "Business Loan", value: 28, color: "#3b82f6" },
    { name: "Personal Loan", value: 22, color: "#f59e0b" },
    { name: "Education Loan", value: 15, color: "#ec4899" },
  ];

  const stats = [
    {
      icon: TrendingUp,
      label: "Total Applications",
      value: "12,847",
      change: "+12.5%",
      positive: true,
    },
    {
      icon: CheckCircle,
      label: "Approval Rate",
      value: "84.2%",
      change: "+3.2%",
      positive: true,
    },
    {
      icon: Clock,
      label: "Avg. Processing Time",
      value: "3.8 min",
      change: "-18%",
      positive: true,
    },
    {
      icon: Users,
      label: "Active Users",
      value: "2,341",
      change: "+8.7%",
      positive: true,
    },
  ];

  const exportToCSV = () => {
    const headers = ["Metric", "Value", "Change"];
    const rows = stats.map(stat => [stat.label, stat.value, stat.change]);
    
    const applicationHeaders = ["Time", "Applications", "Approvals"];
    const applicationRows = applicationData.map(d => [d.time, d.applications.toString(), d.approvals.toString()]);
    
    const processingHeaders = ["Day", "Processing Time (min)"];
    const processingRows = processingTimeData.map(d => [d.name, d.time.toString()]);
    
    const loanHeaders = ["Purpose", "Percentage"];
    const loanRows = loanPurposeData.map(d => [d.name, `${d.value}%`]);
    
    let csvContent = "Real-time Analytics Report\n\n";
    csvContent += "Key Metrics\n";
    csvContent += headers.join(",") + "\n";
    csvContent += rows.map(r => r.join(",")).join("\n");
    csvContent += "\n\nApplications Today\n";
    csvContent += applicationHeaders.join(",") + "\n";
    csvContent += applicationRows.map(r => r.join(",")).join("\n");
    csvContent += "\n\nProcessing Time\n";
    csvContent += processingHeaders.join(",") + "\n";
    csvContent += processingRows.map(r => r.join(",")).join("\n");
    csvContent += "\n\nLoan Purpose Distribution\n";
    csvContent += loanHeaders.join(",") + "\n";
    csvContent += loanRows.map(r => r.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `lendora-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    toast.success("CSV report downloaded successfully!");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFillColor(34, 197, 94);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("Lendora Analytics Report", 20, 25);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 35);
    
    // Key Metrics
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Key Performance Metrics", 20, 55);
    
    let yPos = 65;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    stats.forEach((stat) => {
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(20, yPos, pageWidth - 40, 15, 3, 3, 'F');
      doc.setTextColor(80, 80, 80);
      doc.text(stat.label, 25, yPos + 10);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.text(stat.value, 120, yPos + 10);
      doc.setTextColor(stat.positive ? 34 : 239, stat.positive ? 197 : 68, stat.positive ? 94 : 68);
      doc.text(stat.change, 160, yPos + 10);
      doc.setFont("helvetica", "normal");
      yPos += 20;
    });
    
    // Applications Summary
    yPos += 10;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Applications Summary", 20, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setFillColor(34, 197, 94);
    doc.rect(20, yPos, pageWidth - 40, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text("Time", 25, yPos + 7);
    doc.text("Applications", 80, yPos + 7);
    doc.text("Approvals", 130, yPos + 7);
    
    yPos += 10;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    applicationData.forEach((row, index) => {
      doc.setFillColor(index % 2 === 0 ? 255 : 245, index % 2 === 0 ? 255 : 245, index % 2 === 0 ? 255 : 245);
      doc.rect(20, yPos, pageWidth - 40, 8, 'F');
      doc.text(row.time, 25, yPos + 6);
      doc.text(row.applications.toString(), 80, yPos + 6);
      doc.text(row.approvals.toString(), 130, yPos + 6);
      yPos += 8;
    });
    
    // Loan Purpose Distribution
    yPos += 15;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Loan Purpose Distribution", 20, yPos);
    
    yPos += 10;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    loanPurposeData.forEach((item) => {
      const rgb = hexToRgb(item.color);
      doc.setFillColor(rgb.r, rgb.g, rgb.b);
      doc.circle(25, yPos + 3, 4, 'F');
      doc.setTextColor(0, 0, 0);
      doc.text(`${item.name}: ${item.value}%`, 35, yPos + 5);
      yPos += 12;
    });
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("© 2024 Lendora AI - Confidential Report", pageWidth / 2, 285, { align: "center" });
    
    doc.save(`lendora-analytics-${new Date().toISOString().split('T')[0]}.pdf`);
    toast.success("PDF report downloaded successfully!");
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
          <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm text-foreground flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-medium">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { color: string } }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
          <p className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].payload.color }} />
            {payload[0].name}
          </p>
          <p className="text-lg font-bold text-foreground">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLegend = ({ payload }: { payload?: Array<{ value: string; color: string }> }) => {
    if (!payload) return null;
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-sm font-medium text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="gap-2 text-foreground hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">L</span>
              </div>
              <span className="font-semibold text-foreground">Real-time Analytics</span>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={exportToCSV} className="gap-2 cursor-pointer">
                <FileSpreadsheet className="w-4 h-4" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToPDF} className="gap-2 cursor-pointer">
                <FileText className="w-4 h-4" />
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Real-time Analytics
            </h1>
            <p className="text-lg text-muted-foreground">
              Monitor your lending operations with live data and insights.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      stat.positive 
                        ? "bg-green-500/10 text-green-500" 
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Applications Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Applications Today</h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-muted-foreground">Applications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-muted-foreground">Approvals</span>
                  </div>
                </div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={applicationData}>
                    <defs>
                      <linearGradient id="applicationGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="approvalsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                    <XAxis 
                      dataKey="time" 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="applications"
                      stroke="#22c55e"
                      fill="url(#applicationGradient)"
                      strokeWidth={3}
                      dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "#22c55e", strokeWidth: 2, fill: "hsl(var(--card))" }}
                      name="Applications"
                    />
                    <Area
                      type="monotone"
                      dataKey="approvals"
                      stroke="#3b82f6"
                      fill="url(#approvalsGradient)"
                      strokeWidth={3}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2, fill: "hsl(var(--card))" }}
                      name="Approvals"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Processing Time Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Avg. Processing Time</h3>
                <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">Minutes</span>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={processingTimeData} barCategoryGap="20%">
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity={1} />
                        <stop offset="100%" stopColor="#16a34a" stopOpacity={1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 6]}
                    />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
                              <p className="text-sm font-semibold text-foreground">{label}</p>
                              <p className="text-lg font-bold text-primary">{payload[0].value} min</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar 
                      dataKey="time" 
                      fill="url(#barGradient)" 
                      radius={[8, 8, 0, 0]}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Loan Purpose Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
          >
            <h3 className="font-semibold text-foreground mb-6 text-center">Loan Purpose Distribution</h3>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="h-80 w-full md:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      {loanPurposeData.map((entry, index) => (
                        <linearGradient key={index} id={`pieGradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                          <stop offset="100%" stopColor={entry.color} stopOpacity={0.7} />
                        </linearGradient>
                      ))}
                    </defs>
                    <Pie
                      data={loanPurposeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={activeIndex !== null ? 120 : 110}
                      paddingAngle={4}
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                      onMouseLeave={onPieLeave}
                      animationDuration={1000}
                      animationBegin={0}
                    >
                      {loanPurposeData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={`url(#pieGradient-${index})`}
                          stroke={activeIndex === index ? entry.color : "transparent"}
                          strokeWidth={activeIndex === index ? 3 : 0}
                          style={{
                            filter: activeIndex === index ? `drop-shadow(0 0 8px ${entry.color})` : "none",
                            transform: activeIndex === index ? "scale(1.05)" : "scale(1)",
                            transformOrigin: "center",
                            transition: "all 0.3s ease"
                          }}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                    <Legend content={renderCustomLegend} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-1/2">
                {loanPurposeData.map((item, index) => (
                  <motion.div 
                    key={item.name} 
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-all cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                      style={{ 
                        backgroundColor: item.color,
                        boxShadow: `0 4px 15px ${item.color}40`
                      }}
                    >
                      {item.value}%
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">of total loans</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default RealTimeAnalyticsPage;
