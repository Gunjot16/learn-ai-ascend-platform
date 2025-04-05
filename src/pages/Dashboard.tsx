
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/layout/Layout";
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
import { motion } from "framer-motion";
import { 
  Clock, BookOpen, Award, TrendingUp, 
  Brain, Code, Cpu, Network, Youtube,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const [assessmentResults, setAssessmentResults] = useState<Record<string, number> | null>(null);
  const [hasAnimation, setHasAnimation] = useState(true);

  useEffect(() => {
    // Load assessment results if available
    const stored = sessionStorage.getItem("assessmentResults");
    if (stored) {
      setAssessmentResults(JSON.parse(stored));
    }
    
    // Disable animations after first load
    const timeout = setTimeout(() => setHasAnimation(false), 2000);
    return () => clearTimeout(timeout);
  }, []);
  
  // Mock data for charts
  const subjectPerformance = [
    { name: "Data Structures", score: assessmentResults?.dsa || 65 },
    { name: "Algorithms", score: assessmentResults?.dsa ? Math.min(assessmentResults.dsa + 10, 100) : 75 },
    { name: "Operating Systems", score: assessmentResults?.os || 45 },
    { name: "Computer Networks", score: assessmentResults?.cn || 70 },
    { name: "Databases", score: 60 },
  ];
  
  const skillDistribution = [
    { name: "Beginner", value: 20 },
    { name: "Intermediate", value: 45 },
    { name: "Advanced", value: 25 },
    { name: "Expert", value: 10 },
  ];
  
  const COLORS = ['#FF8042', '#0088FE', '#00C49F', '#8884d8'];
  
  const upcomingLessons = [
    { 
      title: "Binary Tree Traversal Techniques",
      date: "Today, 2:00 PM", 
      duration: "45 mins", 
      type: "Video",
      domain: "dsa",
      thumbnail: "https://placehold.co/640x360/8b5cf6/FFFFFF/png?text=Binary+Trees"
    },
    { 
      title: "Process Scheduling in OS", 
      date: "Tomorrow, 10:00 AM", 
      duration: "60 mins", 
      type: "Practice",
      domain: "os",
      thumbnail: "https://placehold.co/640x360/4f46e5/FFFFFF/png?text=Process+Scheduling"
    },
    { 
      title: "TCP/IP Protocol Suite", 
      date: "Wed, 3:30 PM", 
      duration: "30 mins", 
      type: "Quiz",
      domain: "cn",
      thumbnail: "https://placehold.co/640x360/6366f1/FFFFFF/png?text=TCP/IP"
    },
  ];
  
  const weakAreas = [
    { 
      topic: "Dynamic Programming", 
      domain: "dsa",
      level: "Intermediate", 
      progress: 35,
      icon: <Code className="h-4 w-4 text-brand-600" />
    },
    { 
      topic: "Memory Management", 
      domain: "os",
      level: "Beginner", 
      progress: 25,
      icon: <Cpu className="h-4 w-4 text-brand-600" />
    },
    { 
      topic: "Subnetting", 
      domain: "cn",
      level: "Advanced", 
      progress: 42,
      icon: <Network className="h-4 w-4 text-brand-600" />
    },
  ];

  // Learning progress over time
  const learningProgressData = [
    { day: "Mon", hours: 1.2 },
    { day: "Tue", hours: 2.5 },
    { day: "Wed", hours: 1.8 },
    { day: "Thu", hours: 3.2 },
    { day: "Fri", hours: 2.7 },
    { day: "Sat", hours: 4.1 },
    { day: "Sun", hours: 3.5 },
  ];

  // Topic completion rate
  const topicCompletionData = [
    { month: "Jun", completion: 18 },
    { month: "Jul", completion: 27 },
    { month: "Aug", completion: 42 },
    { month: "Sep", completion: 53 },
    { month: "Oct", completion: 69 },
    { month: "Nov", completion: 78 },
  ];

  // Recommended videos based on weak areas
  const recommendedVideos = [
    {
      title: "Dynamic Programming for Beginners",
      channel: "Tech With Tim",
      views: "485K",
      duration: "32:15",
      thumbnail: "https://placehold.co/640x360/8b5cf6/FFFFFF/png?text=Dynamic+Programming",
      domain: "dsa"
    },
    {
      title: "Memory Management in Operating Systems",
      channel: "Jenny's Lectures",
      views: "327K",
      duration: "28:42",
      thumbnail: "https://placehold.co/640x360/4f46e5/FFFFFF/png?text=Memory+Management",
      domain: "os"
    },
    {
      title: "Subnetting Made Simple",
      channel: "Network Kings",
      views: "614K",
      duration: "23:18",
      thumbnail: "https://placehold.co/640x360/6366f1/FFFFFF/png?text=Subnetting",
      domain: "cn"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <Layout title="Dashboard">
      {/* Animated background pattern for tech/CS feel */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg className="absolute left-0 top-0 h-full w-full opacity-5" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0M0 0L40 40" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </pattern>
            <pattern id="circles" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#circles)" />
        </svg>
      </div>

      <motion.div 
        className="relative z-10"
        variants={hasAnimation ? containerVariants : {}}
        initial={hasAnimation ? "hidden" : "visible"}
        animate="visible"
      >
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
          variants={hasAnimation ? containerVariants : {}}
        >
          <motion.div variants={hasAnimation ? itemVariants : {}}>
            <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-300 to-brand-500"></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
                <Clock className="h-4 w-4 text-brand-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.5</div>
                <p className="text-xs text-muted-foreground">
                  +2.5 hours from last week
                </p>
                <Progress value={70} className="h-2 mt-4 bg-slate-200" />
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={hasAnimation ? itemVariants : {}}>
            <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-300 to-indigo-500"></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Completed Topics</CardTitle>
                <BookOpen className="h-4 w-4 text-indigo-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12/20</div>
                <p className="text-xs text-muted-foreground">
                  60% completion rate
                </p>
                <Progress value={60} className="h-2 mt-4 bg-slate-200" />
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={hasAnimation ? itemVariants : {}}>
            <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-300 to-purple-500"></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
                <Award className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Silver</div>
                <p className="text-xs text-muted-foreground">
                  Top 25% of learners
                </p>
                <Progress value={75} className="h-2 mt-4 bg-slate-200" />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          variants={hasAnimation ? containerVariants : {}}
        >
          <motion.div variants={hasAnimation ? itemVariants : {}}>
            <Card className="col-span-1 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-300 to-brand-500"></div>
              <CardHeader className="bg-slate-50 border-b border-slate-200">
                <CardTitle className="text-lg flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-brand-600" />
                  Performance by Subject
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={subjectPerformance}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
                      <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "white", 
                          borderRadius: "0.5rem", 
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          border: "none"
                        }}
                      />
                      <Bar 
                        dataKey="score" 
                        fill="url(#barGradient)" 
                        radius={[4, 4, 0, 0]} 
                        barSize={30}
                        animationDuration={hasAnimation ? 1500 : 0}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={hasAnimation ? itemVariants : {}}>
            <Card className="col-span-1 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-300 to-indigo-500"></div>
              <CardHeader className="bg-slate-50 border-b border-slate-200">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-indigo-600" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={learningProgressData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <defs>
                        <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 12 }} />
                      <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "white", 
                          borderRadius: "0.5rem", 
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          border: "none"
                        }}
                        formatter={(value: any) => [`${value} hours`, "Learning Time"]}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="hours" 
                        stroke="#4f46e5" 
                        fillOpacity={1} 
                        fill="url(#colorHours)"
                        animationDuration={hasAnimation ? 1500 : 0}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          variants={hasAnimation ? containerVariants : {}}
        >
          <motion.div variants={hasAnimation ? itemVariants : {}}>
            <Card className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-300 to-purple-500"></div>
              <CardHeader className="bg-slate-50 border-b border-slate-200">
                <CardTitle className="text-lg flex items-center">
                  <Youtube className="h-5 w-5 mr-2 text-red-600" />
                  Recommended Videos
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 divide-y divide-slate-100">
                <div className="space-y-4">
                  {recommendedVideos.map((video, index) => (
                    <div key={index} className="flex gap-4 pb-4">
                      <div className="relative flex-shrink-0">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="w-32 h-18 object-cover rounded-md shadow-md" 
                        />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-sm line-clamp-2">{video.title}</h3>
                        <div className="flex items-center text-xs text-slate-500 mt-1">
                          <span>{video.channel}</span>
                          <span className="mx-1">•</span>
                          <span>{video.views} views</span>
                        </div>
                        <div className="mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {video.domain === 'dsa' ? 'DSA' : video.domain === 'os' ? 'OS' : 'Networks'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="ghost" size="sm" className="w-full mt-2 text-brand-600">
                    View All Recommendations <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={hasAnimation ? itemVariants : {}}>
            <Card className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-300 to-green-500"></div>
              <CardHeader className="bg-slate-50 border-b border-slate-200 flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  Areas to Focus On
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {weakAreas.map((area, index) => (
                    <div key={index} className="space-y-2 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="p-1.5 rounded-full bg-slate-100 mr-2.5">
                            {area.icon}
                          </div>
                          <h4 className="font-medium">{area.topic}</h4>
                        </div>
                        <Badge className={`
                          ${area.level.toLowerCase() === 'beginner' ? 'bg-green-100 text-green-800' : 
                            area.level.toLowerCase() === 'intermediate' ? 'bg-blue-100 text-blue-800' : 
                            'bg-purple-100 text-purple-800'
                          } border-none
                        `}>
                          {area.level}
                        </Badge>
                      </div>
                      <Progress value={area.progress} className="h-2 bg-slate-200" />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Progress: {area.progress}%</span>
                        <Button variant="ghost" size="sm" className="h-6 text-brand-600 p-0">
                          Start Learning
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={hasAnimation ? containerVariants : {}}
        >
          <motion.div variants={hasAnimation ? itemVariants : {}}>
            <Card className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-300 to-blue-500"></div>
              <CardHeader className="bg-slate-50 border-b border-slate-200">
                <CardTitle className="text-lg flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                  Topic Completion Over Time
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={topicCompletionData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={1}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} />
                      <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "white", 
                          borderRadius: "0.5rem", 
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          border: "none"
                        }} 
                        formatter={(value: any) => [`${value} topics`, 'Completed']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="completion" 
                        stroke="url(#lineGradient)" 
                        strokeWidth={2}
                        dot={{ stroke: '#8b5cf6', strokeWidth: 2, fill: 'white', r: 4 }}
                        activeDot={{ stroke: '#8b5cf6', strokeWidth: 2, fill: '#8b5cf6', r: 6 }}
                        animationDuration={hasAnimation ? 1500 : 0}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={hasAnimation ? itemVariants : {}}>
            <Card className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-300 to-amber-500"></div>
              <CardHeader className="bg-slate-50 border-b border-slate-200">
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-amber-600" />
                  Upcoming Lessons
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {upcomingLessons.map((lesson, index) => (
                    <div key={index} className="flex gap-4 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0">
                      <div className="relative flex-shrink-0">
                        <img 
                          src={lesson.thumbnail} 
                          alt={lesson.title} 
                          className="w-32 h-18 object-cover rounded-md shadow-md" 
                        />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                          {lesson.duration}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-sm">{lesson.title}</h3>
                        <p className="text-xs text-slate-500 mt-1">{lesson.date}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <Badge className={`
                            ${lesson.type === 'Video' ? 'bg-blue-100 text-blue-800' : 
                              lesson.type === 'Practice' ? 'bg-green-100 text-green-800' : 
                              'bg-purple-100 text-purple-800'
                            } border-none
                          `}>
                            {lesson.type}
                          </Badge>
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            {lesson.type === 'Video' ? 'Watch' : lesson.type === 'Practice' ? 'Practice' : 'Take Quiz'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
