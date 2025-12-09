import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
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
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area
} from "recharts";
import { 
  ArrowLeft, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Users,
  Timer,
  Target,
  Activity
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock analytics data
const dailyCompletions = [
  { date: "Mon", completed: 45, abandoned: 12 },
  { date: "Tue", completed: 52, abandoned: 8 },
  { date: "Wed", completed: 49, abandoned: 15 },
  { date: "Thu", completed: 63, abandoned: 10 },
  { date: "Fri", completed: 58, abandoned: 7 },
  { date: "Sat", completed: 38, abandoned: 5 },
  { date: "Sun", completed: 32, abandoned: 4 },
];

const processingTimeData = [
  { time: "0-2 min", count: 15 },
  { time: "2-4 min", count: 35 },
  { time: "4-6 min", count: 45 },
  { time: "6-8 min", count: 38 },
  { time: "8-10 min", count: 22 },
  { time: "10+ min", count: 8 },
];

const conversionData = [
  { name: "Approved", value: 68, color: "hsl(142, 76%, 36%)" },
  { name: "Rejected", value: 22, color: "hsl(0, 84%, 60%)" },
  { name: "Abandoned", value: 10, color: "hsl(220, 9%, 46%)" },
];

const weeklyTrends = [
  { week: "Week 1", conversions: 62, avgTime: 7.2 },
  { week: "Week 2", conversions: 68, avgTime: 6.8 },
  { week: "Week 3", conversions: 71, avgTime: 6.1 },
  { week: "Week 4", conversions: 75, avgTime: 5.5 },
];

const stageDropoff = [
  { stage: "Greeting", users: 100, percentage: 100 },
  { stage: "Sales", users: 95, percentage: 95 },
  { stage: "Verification", users: 88, percentage: 88 },
  { stage: "Underwriting", users: 82, percentage: 82 },
  { stage: "Sanction", users: 78, percentage: 78 },
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");

  const stats = [
    {
      title: "Total Demo Sessions",
      value: "1,247",
      change: "+12.5%",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Completion Rate",
      value: "78%",
      change: "+5.2%",
      icon: Target,
      color: "text-green-500",
    },
    {
      title: "Avg. Processing Time",
      value: "5.8 min",
      change: "-18.3%",
      icon: Timer,
      color: "text-blue-500",
    },
    {
      title: "Conversion Rate",
      value: "68%",
      change: "+8.7%",
      icon: TrendingUp,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Demo Analytics</h1>
              <p className="text-muted-foreground text-sm">Track loan chatbot performance and conversion metrics</p>
            </div>
          </div>
          <div className="flex gap-2">
            {["24h", "7d", "30d", "90d"].map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="cursor-pointer"
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    <span className={`text-sm font-medium ${
                      stat.change.startsWith("+") ? "text-green-500" : "text-red-500"
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-muted-foreground text-sm">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="conversions">Conversions</TabsTrigger>
            <TabsTrigger value="timing">Processing Time</TabsTrigger>
            <TabsTrigger value="funnel">Funnel Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Completions */}
              <Card>
                <CardHeader>
                  <CardTitle>Daily Demo Sessions</CardTitle>
                  <CardDescription>Completed vs abandoned sessions over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailyCompletions}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="date" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="completed" name="Completed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="abandoned" name="Abandoned" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Conversion Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Outcome Distribution</CardTitle>
                  <CardDescription>Breakdown of demo session outcomes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={conversionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {conversionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Performance Trends</CardTitle>
                <CardDescription>Conversion rate and average processing time over 4 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyTrends}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="week" className="text-muted-foreground" />
                    <YAxis yAxisId="left" className="text-muted-foreground" />
                    <YAxis yAxisId="right" orientation="right" className="text-muted-foreground" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }} 
                    />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="conversions" 
                      name="Conversion %" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="avgTime" 
                      name="Avg Time (min)" 
                      stroke="hsl(142, 76%, 36%)" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(142, 76%, 36%)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Conversion Metrics</CardTitle>
                  <CardDescription>Detailed breakdown of loan application outcomes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-500/10 rounded-lg">
                      <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-500">68%</p>
                      <p className="text-sm text-muted-foreground">Approved</p>
                    </div>
                    <div className="text-center p-4 bg-destructive/10 rounded-lg">
                      <XCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
                      <p className="text-2xl font-bold text-destructive">22%</p>
                      <p className="text-sm text-muted-foreground">Rejected</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <Activity className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-2xl font-bold">10%</p>
                      <p className="text-sm text-muted-foreground">Abandoned</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Target vs Actual</CardTitle>
                  <CardDescription>Conversion goal progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Conversion Rate</span>
                        <span>68% / 70%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: "97%" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Processing Time</span>
                        <span>5.8m / 6m</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full" 
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Completion Rate</span>
                        <span>78% / 80%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{ width: "97.5%" }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Processing Time Distribution</CardTitle>
                <CardDescription>How long users take to complete the demo</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={processingTimeData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="time" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="count" 
                      name="Sessions"
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary) / 0.2)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
                  <p className="text-3xl font-bold">4.2 min</p>
                  <p className="text-muted-foreground">Fastest Completion</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Timer className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                  <p className="text-3xl font-bold">5.8 min</p>
                  <p className="text-muted-foreground">Average Time</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Activity className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                  <p className="text-3xl font-bold">8.5 min</p>
                  <p className="text-muted-foreground">90th Percentile</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="funnel" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Funnel Analysis</CardTitle>
                <CardDescription>Drop-off rates at each stage of the loan journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stageDropoff.map((stage, index) => (
                    <div key={stage.stage} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{stage.stage}</span>
                        <span className="text-muted-foreground">{stage.users} users ({stage.percentage}%)</span>
                      </div>
                      <div className="h-8 bg-muted rounded-lg overflow-hidden relative">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-lg"
                          initial={{ width: 0 }}
                          animate={{ width: `${stage.percentage}%` }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                        />
                      </div>
                      {index < stageDropoff.length - 1 && (
                        <div className="text-xs text-muted-foreground mt-1 text-right">
                          -{stageDropoff[index].percentage - stageDropoff[index + 1].percentage}% drop-off
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Analytics;
