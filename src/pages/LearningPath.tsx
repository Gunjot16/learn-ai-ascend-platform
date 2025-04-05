
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import VideoModal from "@/components/ui/VideoModal";
import {
  PlayCircle,
  BookOpen,
  Code,
  CheckCircle,
  Star,
  Youtube,
  FileText,
  Network,
  Cpu
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define video data structure
interface Video {
  id: string;
  title: string;
  channel: string;
  views: string;
  duration: string;
  thumbnail: string;
  difficulty: string;
  recommended: boolean;
  domain: string;
  topic: string;
  videoId: string;
}

// Define module structure
interface Module {
  title: string;
  description: string;
  progress: number;
  domain: string;
  topics: {
    name: string;
    completed: boolean;
    type: string;
  }[];
}

const LearningPath = () => {
  const [assessmentResults, setAssessmentResults] = useState<Record<string, number> | null>(null);
  const [customRecommendations, setCustomRecommendations] = useState<Video[]>([]);
  const [modules, setModules] = useState<Module[]>([]);

  // Mock data for videos with YouTube videoIds
  const allVideos: Video[] = [
    // DSA Videos
    {
      id: "v1",
      title: "Binary Search Tree Implementation & Operations",
      channel: "CS Dojo",
      views: "312K",
      duration: "15:23",
      thumbnail: "https://img.youtube.com/vi/5cPbNCrdotA/maxresdefault.jpg",
      difficulty: "Intermediate",
      recommended: true,
      domain: "dsa",
      topic: "Binary Tree Traversal",
      videoId: "5cPbNCrdotA"
    },
    {
      id: "v2",
      title: "Dynamic Programming Explained - Fibonacci, Knapsack & More",
      channel: "Tech With Tim",
      views: "845K",
      duration: "28:15",
      thumbnail: "https://img.youtube.com/vi/oBt53YbR9Kk/maxresdefault.jpg",
      difficulty: "Advanced",
      recommended: true,
      domain: "dsa",
      topic: "Dynamic Programming",
      videoId: "oBt53YbR9Kk"
    },
    {
      id: "v3",
      title: "Graph Algorithms - BFS, DFS, Dijkstra's Algorithm",
      channel: "Algorithm Explained",
      views: "512K",
      duration: "32:45",
      thumbnail: "https://img.youtube.com/vi/tWVWeAqZ0WU/maxresdefault.jpg",
      difficulty: "Advanced",
      recommended: true,
      domain: "dsa",
      topic: "Graph Algorithms",
      videoId: "tWVWeAqZ0WU"
    },
    // OS Videos
    {
      id: "v4",
      title: "Process Scheduling Algorithms Explained with Examples",
      channel: "Jenny's Lectures",
      views: "428K",
      duration: "19:32",
      thumbnail: "https://img.youtube.com/vi/EWkQl0n0w5M/maxresdefault.jpg",
      difficulty: "Intermediate",
      recommended: true,
      domain: "os",
      topic: "Process Scheduling",
      videoId: "EWkQl0n0w5M"
    },
    {
      id: "v5",
      title: "Virtual Memory, Paging and Swapping in Operating Systems",
      channel: "Gate Smashers",
      views: "503K",
      duration: "24:18",
      thumbnail: "https://img.youtube.com/vi/qlH4-oHnBb8/maxresdefault.jpg",
      difficulty: "Advanced",
      recommended: true,
      domain: "os",
      topic: "Memory Management",
      videoId: "qlH4-oHnBb8"
    },
    {
      id: "v6",
      title: "Understanding Deadlocks - Detection, Prevention & Avoidance",
      channel: "Neso Academy",
      views: "389K",
      duration: "21:05",
      thumbnail: "https://img.youtube.com/vi/UVo9mGARkhQ/maxresdefault.jpg",
      difficulty: "Advanced",
      recommended: true,
      domain: "os",
      topic: "Deadlocks",
      videoId: "UVo9mGARkhQ"
    },
    // CN Videos
    {
      id: "v7",
      title: "OSI Model Explained Layer by Layer with Examples",
      channel: "Network Kings",
      views: "675K",
      duration: "18:49",
      thumbnail: "https://img.youtube.com/vi/LANW3m7UgWs/maxresdefault.jpg",
      difficulty: "Beginner",
      recommended: true,
      domain: "cn",
      topic: "OSI Model",
      videoId: "LANW3m7UgWs"
    },
    {
      id: "v8",
      title: "TCP/IP Protocol Suite - How the Internet Works",
      channel: "PowerCert",
      views: "892K",
      duration: "15:42",
      thumbnail: "https://img.youtube.com/vi/keeqnciDVOE/maxresdefault.jpg",
      difficulty: "Intermediate",
      recommended: true,
      domain: "cn",
      topic: "TCP/IP Stack",
      videoId: "keeqnciDVOE"
    },
    {
      id: "v9",
      title: "Subnet Masking & IP Address Management Made Easy",
      channel: "Sunny Classroom",
      views: "438K",
      duration: "22:37",
      thumbnail: "https://img.youtube.com/vi/uyRtYUg6bnw/maxresdefault.jpg",
      difficulty: "Advanced",
      recommended: true,
      domain: "cn",
      topic: "Subnetting",
      videoId: "uyRtYUg6bnw"
    },
    {
      id: "v10",
      title: "Advanced Sorting Algorithms - Quick Sort, Merge Sort",
      channel: "CS Dojo",
      views: "378K",
      duration: "26:12",
      thumbnail: "https://img.youtube.com/vi/kPRA0W1kECg/maxresdefault.jpg",
      difficulty: "Intermediate",
      recommended: false,
      domain: "dsa",
      topic: "Sorting Algorithms",
      videoId: "kPRA0W1kECg"
    },
    {
      id: "v11",
      title: "File Systems in Operating Systems - FAT, NTFS, ext4",
      channel: "Tech With Tim",
      views: "212K",
      duration: "18:05",
      thumbnail: "https://img.youtube.com/vi/KN8YgJnShPM/maxresdefault.jpg",
      difficulty: "Intermediate",
      recommended: false,
      domain: "os",
      topic: "File Systems",
      videoId: "KN8YgJnShPM"
    },
    {
      id: "v12",
      title: "Network Security Fundamentals - Firewalls & Encryption",
      channel: "Network Kings",
      views: "325K",
      duration: "23:18",
      thumbnail: "https://img.youtube.com/vi/LabVwY2NQio/maxresdefault.jpg",
      difficulty: "Advanced",
      recommended: false,
      domain: "cn",
      topic: "Network Security",
      videoId: "LabVwY2NQio"
    }
  ];

  // Base modules
  const baseModules: Module[] = [
    {
      title: "Data Structures & Algorithms",
      description: "Master essential algorithms and data structures",
      progress: 0,
      domain: "dsa",
      topics: [
        { name: "Binary Tree Traversal", completed: false, type: "video" },
        { name: "Dynamic Programming", completed: false, type: "reading" },
        { name: "Graph Algorithms", completed: false, type: "practice" },
        { name: "Sorting Algorithms", completed: false, type: "quiz" }
      ]
    },
    {
      title: "Operating Systems",
      description: "Understanding fundamental OS concepts",
      progress: 0,
      domain: "os",
      topics: [
        { name: "Process Scheduling", completed: false, type: "video" },
        { name: "Memory Management", completed: false, type: "reading" },
        { name: "Deadlocks", completed: false, type: "practice" },
        { name: "File Systems", completed: false, type: "quiz" }
      ]
    },
    {
      title: "Computer Networks",
      description: "Learn network protocols and architecture",
      progress: 0,
      domain: "cn",
      topics: [
        { name: "OSI Model", completed: false, type: "video" },
        { name: "TCP/IP Stack", completed: false, type: "reading" },
        { name: "Subnetting", completed: false, type: "practice" },
        { name: "Network Security", completed: false, type: "quiz" }
      ]
    }
  ];

  useEffect(() => {
    // Get assessment results from session storage
    const stored = sessionStorage.getItem("assessmentResults");
    let results: Record<string, number> | null = null;
    
    if (stored) {
      results = JSON.parse(stored);
      setAssessmentResults(results);
      
      // Update modules based on assessment results
      const updatedModules = baseModules.map(module => {
        const domain = module.domain;
        let domainScore = results ? results[domain] || 0 : 0;
        
        // Simulate some completed topics based on score
        const updatedTopics = module.topics.map((topic, i) => ({
          ...topic,
          completed: Math.random() * 100 < domainScore && i < 2
        }));
        
        // Calculate progress
        const completedCount = updatedTopics.filter(t => t.completed).length;
        const progress = (completedCount / updatedTopics.length) * 100;
        
        return {
          ...module,
          topics: updatedTopics,
          progress
        };
      });
      
      setModules(updatedModules);
      
      // Generate custom video recommendations based on assessment
      if (results) {
        const weakTopics: Record<string, boolean> = {};
        Object.entries(results).forEach(([domain, score]) => {
          if (score < 70) {
            // Find relevant videos for weak domains
            const domainTopics = baseModules
              .find(m => m.domain === domain)
              ?.topics.map(t => t.name) || [];
              
            domainTopics.forEach(topic => {
              weakTopics[topic] = true;
            });
          }
        });
        
        // Filter videos that match weak topics
        const recommended = allVideos.filter(video => 
          weakTopics[video.topic] || (results && results[video.domain] < 50)
        );
        
        setCustomRecommendations(
          recommended.length > 0 ? recommended : allVideos.slice(0, 6)
        );
      } else {
        setCustomRecommendations(allVideos.slice(0, 6));
      }
    } else {
      // No assessment results, use default modules and recommendations
      setModules(baseModules);
      setCustomRecommendations(allVideos.slice(0, 6));
    }
  }, []);

  const topicTypeIcons = {
    video: <PlayCircle className="h-4 w-4" />,
    reading: <FileText className="h-4 w-4" />,
    practice: <Code className="h-4 w-4" />,
    quiz: <BookOpen className="h-4 w-4" />
  };

  const domainIcons = {
    dsa: <Code className="h-5 w-5" />,
    os: <Cpu className="h-5 w-5" />,
    cn: <Network className="h-5 w-5" />
  };

  return (
    <Layout title="Learning Path">
      <div className="mb-8 animate-fade-in">
        <h2 className="text-2xl font-bold mb-2">Your Personalized Learning Journey</h2>
        <p className="text-muted-foreground mb-4">
          Based on your assessment results, we've tailored a learning path to strengthen your weak areas and help you progress.
        </p>
        
        {!assessmentResults && (
          <Alert className="mb-6">
            <AlertTitle className="flex items-center">
              <Star className="h-4 w-4 mr-2 text-brand-500" />
              Complete an assessment for personalized recommendations
            </AlertTitle>
            <AlertDescription>
              You haven't taken an assessment yet. For fully personalized learning path,
              complete an assessment to identify your strengths and areas for improvement.
            </AlertDescription>
          </Alert>
        )}
      </div>
      
      <Tabs defaultValue="videos" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="videos">
            <Youtube className="h-4 w-4 mr-2" /> 
            Recommended Videos
          </TabsTrigger>
          <TabsTrigger value="path">
            <BookOpen className="h-4 w-4 mr-2" /> 
            Learning Modules
          </TabsTrigger>
          <TabsTrigger value="tests">
            <BookOpen className="h-4 w-4 mr-2" /> 
            Weekly Tests
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="videos" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customRecommendations.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: parseInt(video.id.replace('v', '')) * 0.1 }}
              >
                <Card className="overflow-hidden flex flex-col h-full">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    {assessmentResults && assessmentResults[video.domain] < 50 && (
                      <div className="absolute top-2 left-2 flex items-center bg-brand-600/90 text-white text-xs px-2 py-1 rounded">
                        <Star className="h-3 w-3 mr-1 fill-white" />
                        Highly Recommended
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black/60 text-xs px-2 py-1 rounded flex items-center">
                      {video.domain === 'dsa' ? (
                        <Code className="h-3 w-3 mr-1" />
                      ) : video.domain === 'os' ? (
                        <Cpu className="h-3 w-3 mr-1" />
                      ) : (
                        <Network className="h-3 w-3 mr-1" />
                      )}
                      {video.domain.toUpperCase()}
                    </div>
                  </div>
                  
                  <CardContent className="flex-grow flex flex-col p-4">
                    <h3 className="font-semibold mb-1 line-clamp-2">{video.title}</h3>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <span>{video.channel}</span>
                      <span className="mx-1">•</span>
                      <span>{video.views} views</span>
                    </div>

                    <div className="mt-1 mb-3">
                      <Badge variant="outline" className="bg-muted/50 mr-2">
                        {video.topic}
                      </Badge>
                      <Badge variant="outline" className={`
                        ${video.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                          video.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : 
                          'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                        }
                      `}>
                        {video.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="text-xs text-muted-foreground">
                        {assessmentResults && assessmentResults[video.domain] < 50 
                          ? "Focus area based on assessment" 
                          : "Recommended for your learning path"}
                      </div>
                      
                      <VideoModal videoId={video.videoId} title={video.title}>
                        <Button size="sm" className="flex items-center gap-1">
                          <Youtube className="h-4 w-4" />
                          Watch
                        </Button>
                      </VideoModal>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="path" className="animate-fade-in">
          <div className="space-y-6">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden dark:bg-slate-800/50">
                  <div className="border-l-4 border-brand-500">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div className="flex items-center">
                          <div className="bg-brand-100 dark:bg-brand-900/30 p-2 rounded-full mr-3 text-brand-700 dark:text-brand-400">
                            {domainIcons[module.domain as keyof typeof domainIcons]}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1">{module.title}</h3>
                            <p className="text-sm text-muted-foreground">{module.description}</p>
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0 flex items-center">
                          <span className="text-sm font-medium mr-3">
                            {module.progress}% Complete
                          </span>
                          <Button variant="outline" size="sm">
                            {module.progress === 100 ? "Review" : "Continue"}
                          </Button>
                        </div>
                      </div>
                      
                      <Progress value={module.progress} className="h-2 mb-4" />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        {module.topics.map((topic, topicIndex) => (
                          <div 
                            key={topicIndex} 
                            className={`p-3 rounded-lg border flex items-center ${
                              topic.completed 
                                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" 
                                : "bg-card dark:bg-slate-800/50 border-border"
                            }`}
                          >
                            <div className={`p-2 rounded-full mr-3 ${
                              topic.completed 
                                ? "bg-green-100 dark:bg-green-900/30" 
                                : "bg-muted dark:bg-slate-700/50"
                            }`}>
                              {topic.completed ? (
                                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                              ) : (
                                topicTypeIcons[topic.type as keyof typeof topicTypeIcons]
                              )}
                            </div>
                            <span className="text-sm font-medium">{topic.name}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="tests" className="animate-fade-in">
          <div className="space-y-6">
            <Card className="overflow-hidden dark:bg-slate-800/50">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                      Weekly Challenge
                      <Badge variant="secondary" className="ml-2 bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-400">
                        Active
                      </Badge>
                    </h3>
                    <p className="text-muted-foreground">Complete this week's challenge to earn points and badges</p>
                  </div>
                  <Button className="mt-4 md:mt-0 bg-brand-600 hover:bg-brand-700">Start Test</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 bg-card dark:bg-slate-800/50">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Topics Covered</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Code className="h-4 w-4 mr-2 text-brand-500" />
                        <span>Binary Tree Traversal</span>
                      </li>
                      <li className="flex items-center">
                        <Cpu className="h-4 w-4 mr-2 text-brand-500" />
                        <span>Process Scheduling</span>
                      </li>
                      <li className="flex items-center">
                        <Network className="h-4 w-4 mr-2 text-brand-500" />
                        <span>OSI Model</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-card dark:bg-slate-800/50">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Rewards</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                        <span>50 XP Points</span>
                      </li>
                      <li className="flex items-center">
                        <Badge className="h-4 w-4 mr-2 text-purple-500" />
                        <span>"Weekly Champion" Badge</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-card dark:bg-slate-800/50">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Details</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <span className="font-medium mr-2">Time:</span>
                        <span>30 minutes</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <span className="font-medium mr-2">Questions:</span>
                        <span>20 multiple choice</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <span className="font-medium mr-2">Difficulty:</span>
                        <span>Intermediate</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-2 border-brand-600 dark:bg-slate-800/50">
              <div className="bg-brand-600 text-white px-6 py-3">
                <h3 className="text-xl font-semibold">Mega Challenge</h3>
                <p className="text-sm text-brand-100">Monthly comprehensive test covering all domains</p>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">April Mega Challenge</h3>
                    <p className="text-muted-foreground">Prove your mastery across all computer science domains</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
                    <Button variant="outline">View Details</Button>
                    <Button className="bg-brand-600 hover:bg-brand-700">Register</Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 bg-card dark:bg-slate-800/50">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Grand Prize</h4>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 mr-2 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">Digital Certificate & Badge</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Shareable on LinkedIn and other platforms</p>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-card dark:bg-slate-800/50">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Format</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <span className="font-medium mr-2">Time:</span>
                        <span>2 hours</span>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium mr-2">Questions:</span>
                        <span>50 mixed format</span>
                      </li>
                      <li className="flex items-center">
                        <span className="font-medium mr-2">Level:</span>
                        <span>Advanced</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-card dark:bg-slate-800/50">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Leaderboard</h4>
                    <p className="text-sm">Top performers will be featured on our global leaderboard</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-400">
                        Registration Open
                      </Badge>
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

export default LearningPath;
