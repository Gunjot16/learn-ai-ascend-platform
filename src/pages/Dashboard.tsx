
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
  Cell
} from "recharts";
import { Clock, BookOpen, Award, TrendingUp } from "lucide-react";

const Dashboard = () => {
  // Mock data for charts
  const subjectPerformance = [
    { name: "Python", score: 85 },
    { name: "Data Structures", score: 65 },
    { name: "Algorithms", score: 72 },
    { name: "Web Dev", score: 92 },
    { name: "Databases", score: 78 },
  ];
  
  const skillDistribution = [
    { name: "Beginner", value: 20 },
    { name: "Intermediate", value: 45 },
    { name: "Advanced", value: 25 },
    { name: "Expert", value: 10 },
  ];
  
  const COLORS = ['#FF8042', '#0088FE', '#00C49F', '#8884d8'];
  
  const upcomingLessons = [
    { title: "Advanced Python Functions", date: "Today, 2:00 PM", duration: "45 mins", type: "Video" },
    { title: "Data Structures: Trees", date: "Tomorrow, 10:00 AM", duration: "60 mins", type: "Practice" },
    { title: "Algorithm Analysis", date: "Wed, 3:30 PM", duration: "30 mins", type: "Quiz" },
  ];
  
  const weakAreas = [
    { topic: "Recursive Algorithms", level: "Intermediate", progress: 35 },
    { topic: "Database Indexing", level: "Beginner", progress: 25 },
    { topic: "Python Decorators", level: "Advanced", progress: 42 },
  ];

  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 animate-fade-in">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5</div>
            <p className="text-xs text-muted-foreground">
              +2.5 hours from last week
            </p>
            <Progress value={70} className="h-2 mt-4" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Topics</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12/20</div>
            <p className="text-xs text-muted-foreground">
              60% completion rate
            </p>
            <Progress value={60} className="h-2 mt-4" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Silver</div>
            <p className="text-xs text-muted-foreground">
              Top 25% of learners
            </p>
            <Progress value={75} className="h-2 mt-4" />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="col-span-1 animate-fade-in" style={{animationDelay: "0.1s"}}>
          <CardHeader>
            <CardTitle className="text-lg">Performance by Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subjectPerformance}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 animate-fade-in" style={{animationDelay: "0.2s"}}>
          <CardHeader>
            <CardTitle className="text-lg">Skill Level Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {skillDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="animate-fade-in" style={{animationDelay: "0.3s"}}>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingLessons.map((lesson, index) => (
                <div key={index} className="bg-secondary/50 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{lesson.title}</h4>
                    <p className="text-sm text-muted-foreground">{lesson.date} • {lesson.duration}</p>
                  </div>
                  <span className="text-xs bg-brand-100 text-brand-800 px-2 py-1 rounded-full">
                    {lesson.type}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{animationDelay: "0.4s"}}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Areas to Focus On</CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weakAreas.map((area, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{area.topic}</h4>
                    <span className={`badge-progress ${area.level.toLowerCase()}`}>
                      {area.level}
                    </span>
                  </div>
                  <Progress value={area.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground text-right">{area.progress}% mastered</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
