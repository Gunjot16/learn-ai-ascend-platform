
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar
} from "recharts";
import { BookOpen, Code, Network, ChevronRight, Brain, ChartBar } from "lucide-react";

type Domain = "dsa" | "os" | "cn";

interface DomainResult {
  name: string;
  icon: React.ReactNode;
  score: number;
  weakPoints: string[];
  recommendedTopics: {
    name: string;
    score: number;
  }[];
}

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<Record<Domain, number> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve results from session storage
    const storedResults = sessionStorage.getItem("assessmentResults");
    
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      // If no results, use sample data for development
      setResults({
        dsa: 65,
        os: 42,
        cn: 78
      });
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-2xl">Analyzing your results...</div>
      </div>
    );
  }

  // Determine weak areas based on scores
  const domains: DomainResult[] = [
    {
      name: "Data Structures & Algorithms",
      icon: <Code className="h-5 w-5" />,
      score: results?.dsa || 0,
      weakPoints: results?.dsa && results.dsa < 70 ? [
        "Binary Tree Traversal",
        "Dynamic Programming",
        "Graph Algorithms"
      ] : [],
      recommendedTopics: [
        { name: "Binary Search Trees", score: 30 },
        { name: "Dynamic Programming", score: 25 },
        { name: "Graph Algorithms", score: 35 },
        { name: "Sorting Algorithms", score: 60 }
      ]
    },
    {
      name: "Operating Systems",
      icon: <BookOpen className="h-5 w-5" />,
      score: results?.os || 0,
      weakPoints: results?.os && results.os < 70 ? [
        "Process Scheduling",
        "Memory Management",
        "Deadlocks"
      ] : [],
      recommendedTopics: [
        { name: "Process Scheduling", score: 40 },
        { name: "Memory Management", score: 30 },
        { name: "File Systems", score: 50 },
        { name: "Deadlocks", score: 35 }
      ]
    },
    {
      name: "Computer Networks",
      icon: <Network className="h-5 w-5" />,
      score: results?.cn || 0,
      weakPoints: results?.cn && results.cn < 70 ? [
        "TCP/IP Stack",
        "Network Security",
        "Subnetting"
      ] : [],
      recommendedTopics: [
        { name: "OSI Model", score: 65 },
        { name: "TCP/IP", score: 45 },
        { name: "Routing Protocols", score: 40 },
        { name: "Network Security", score: 30 }
      ]
    }
  ];

  // Format data for charts
  const barChartData = domains.map(domain => ({
    name: domain.name.split(" ").pop(), // Just use last word for brevity
    score: domain.score
  }));

  const radarData = domains.flatMap(domain => 
    domain.recommendedTopics.map(topic => ({
      subject: topic.name,
      score: topic.score
    }))
  );

  const pieData = [
    { name: "Strong Areas", value: domains.filter(d => d.score >= 70).length },
    { name: "Weak Areas", value: domains.filter(d => d.score < 70).length }
  ];

  const COLORS = ["#4ade80", "#f87171"];

  // Find weakest domain
  const weakestDomain = domains.reduce(
    (prev, current) => (prev.score < current.score ? prev : current)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div 
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 10 + 1,
                height: Math.random() * 10 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: Math.random() * 5 + 2,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Assessment Results</h1>
          <p className="text-xl text-gray-300">
            Based on your answers, we've identified your strengths and areas for improvement
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-slate-800/70 border-slate-700 h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ChartBar className="mr-2 h-5 w-5 text-brand-400" />
                  Performance by Domain
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "0.5rem" }}
                      />
                      <Bar dataKey="score" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-slate-800/70 border-slate-700 h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-brand-400" />
                  Knowledge Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "0.5rem" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <Card className="bg-slate-800/70 border-slate-700">
            <CardHeader>
              <CardTitle>Your Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {domains.map((domain, index) => (
                  <div 
                    key={index} 
                    className={`p-6 rounded-lg border ${
                      domain.score >= 70 
                        ? "bg-green-900/20 border-green-700/30" 
                        : "bg-red-900/20 border-red-700/30"
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`p-2 rounded-full mr-3 ${
                        domain.score >= 70 ? "bg-green-900/50" : "bg-red-900/50"
                      }`}>
                        {domain.icon}
                      </div>
                      <h3 className="font-semibold">{domain.name}</h3>
                    </div>
                    
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm text-gray-400">Proficiency</span>
                      <span className="font-mono font-medium">{domain.score}%</span>
                    </div>
                    <Progress 
                      value={domain.score} 
                      className={`h-2 mb-4 ${
                        domain.score >= 70 ? "bg-green-900/30" : "bg-red-900/30"
                      }`} 
                    />
                    
                    {domain.weakPoints.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2 text-gray-300">Areas to Focus On:</h4>
                        <ul className="text-sm space-y-1 text-gray-400">
                          {domain.weakPoints.map((point, i) => (
                            <li key={i} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <Card className="bg-slate-800/70 border-slate-700">
            <CardHeader>
              <CardTitle>Topic-Level Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={150} data={radarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" stroke="#94a3b8" />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.6}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "0.5rem" }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8 text-center"
        >
          <div className="p-6 bg-brand-600/20 rounded-lg border border-brand-500/30 mb-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
            <p className="mb-4">
              Based on your assessment, we recommend focusing on <strong>{weakestDomain.name}</strong> first, 
              particularly on topics like {weakestDomain.weakPoints.join(", ")}.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/learning")}
              className="bg-brand-600 hover:bg-brand-700"
            >
              View Personalized Learning Path <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
            <Button 
              onClick={() => navigate("/learning")}
              className="bg-brand-600 hover:bg-brand-700"
            >
              Start Learning
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;
