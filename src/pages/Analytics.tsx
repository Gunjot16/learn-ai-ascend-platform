
import Layout from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Analytics = () => {
  // Mock time spent learning data
  const timeSpentData = [
    { name: "Week 1", hours: 8 },
    { name: "Week 2", hours: 12 },
    { name: "Week 3", hours: 10 },
    { name: "Week 4", hours: 15 },
    { name: "Week 5", hours: 18 },
    { name: "Week 6", hours: 14 },
    { name: "Week 7", hours: 20 },
    { name: "Week 8", hours: 22 },
  ];

  // Mock topic performance data
  const topicPerformanceData = [
    { topic: "Python Basics", score: 92 },
    { topic: "Data Structures", score: 75 },
    { topic: "Algorithms", score: 68 },
    { topic: "OOP Concepts", score: 88 },
    { topic: "Database Design", score: 62 },
    { topic: "Web Development", score: 85 },
  ];

  // Mock skill radar data
  const skillRadarData = [
    { subject: "Problem Solving", A: 85, fullMark: 100 },
    { subject: "Coding Speed", A: 72, fullMark: 100 },
    { subject: "Debugging", A: 68, fullMark: 100 },
    { subject: "Algorithm Design", A: 65, fullMark: 100 },
    { subject: "Code Quality", A: 78, fullMark: 100 },
    { subject: "Documentation", A: 82, fullMark: 100 },
  ];

  // Mock learning style distribution
  const learningStyleData = [
    { name: "Visual", value: 40 },
    { name: "Auditory", value: 25 },
    { name: "Reading/Writing", value: 20 },
    { name: "Kinesthetic", value: 15 },
  ];

  const COLORS = ["#8b5cf6", "#6366f1", "#3b82f6", "#06b6d4"];

  // Mock improvement areas data
  const improvementData = [
    { name: "Recursive Algorithms", value: 35 },
    { name: "Database Indexing", value: 25 },
    { name: "Python Decorators", value: 42 },
    { name: "Binary Trees", value: 48 },
    { name: "API Design", value: 55 },
  ];

  return (
    <Layout title="Analytics">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Your Learning Analytics</h2>
        <p className="text-gray-600">
          Detailed insights based on your assessment results and learning activity
        </p>
      </div>

      <Tabs defaultValue="performance" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="improvement">Areas for Improvement</TabsTrigger>
          <TabsTrigger value="learning-style">Learning Style</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Time Spent Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timeSpentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="hours"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Topic Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topicPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="topic" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="score"
                        fill="#8b5cf6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Skill Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={150} data={skillRadarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Your Skills"
                        dataKey="A"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.6}
                      />
                      <Tooltip />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="improvement" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Areas Needing Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={improvementData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={150}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="value"
                      name="Proficiency"
                      fill="#8b5cf6"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Recommendations</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-600 mt-2"></div>
                    <div>
                      <p className="font-medium">Recursive Algorithms</p>
                      <p className="text-sm text-muted-foreground">
                        Focus on understanding the base case and recursive step pattern
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-600 mt-2"></div>
                    <div>
                      <p className="font-medium">Database Indexing</p>
                      <p className="text-sm text-muted-foreground">
                        Practice creating efficient database indices for different query types
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-600 mt-2"></div>
                    <div>
                      <p className="font-medium">Python Decorators</p>
                      <p className="text-sm text-muted-foreground">
                        Work through practical examples to understand decorator usage patterns
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning-style" className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Learning Style Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={learningStyleData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {learningStyleData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personalized Learning Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Visual Learning (40%)</h3>
                    <p className="text-sm text-muted-foreground">
                      You learn best through visual aids like diagrams, charts, and videos
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="px-3 py-1 bg-brand-100 text-brand-800 text-sm rounded-full">
                        Video tutorials
                      </div>
                      <div className="px-3 py-1 bg-brand-100 text-brand-800 text-sm rounded-full">
                        Infographics
                      </div>
                      <div className="px-3 py-1 bg-brand-100 text-brand-800 text-sm rounded-full">
                        Mind maps
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Auditory Learning (25%)</h3>
                    <p className="text-sm text-muted-foreground">
                      You benefit from listening to explanations and discussions
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        Podcasts
                      </div>
                      <div className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        Group discussions
                      </div>
                      <div className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        Audio lectures
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Reading/Writing (20%)</h3>
                    <p className="text-sm text-muted-foreground">
                      You learn through reading and writing information
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                        Technical articles
                      </div>
                      <div className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                        Note-taking
                      </div>
                      <div className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                        Documentation
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Kinesthetic (15%)</h3>
                    <p className="text-sm text-muted-foreground">
                      You learn through hands-on practice and experience
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full">
                        Coding exercises
                      </div>
                      <div className="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full">
                        Interactive tutorials
                      </div>
                      <div className="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full">
                        Projects
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Analytics;
