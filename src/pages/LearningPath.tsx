
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  PlayCircle,
  BookOpen,
  Code,
  CheckCircle,
  Star,
  Youtube,
  FileText
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LearningPath = () => {
  const videoRecommendations = [
    {
      title: "Python Decorators: Advanced Concepts",
      channel: "CodeWithTim",
      views: "245K",
      duration: "18:23",
      thumbnail: "https://placehold.co/640x360/8b5cf6/FFFFFF/png?text=Python+Decorators",
      difficulty: "Advanced",
      recommended: true
    },
    {
      title: "Understanding Recursive Algorithms",
      channel: "CS Simplified",
      views: "512K",
      duration: "22:15",
      thumbnail: "https://placehold.co/640x360/4f46e5/FFFFFF/png?text=Recursive+Algorithms",
      difficulty: "Intermediate",
      recommended: true
    },
    {
      title: "Database Indexing for Beginners",
      channel: "DatabasePro",
      views: "128K",
      duration: "15:42",
      thumbnail: "https://placehold.co/640x360/6366f1/FFFFFF/png?text=Database+Indexing",
      difficulty: "Beginner",
      recommended: true
    },
    {
      title: "Comprehensive Guide to Binary Trees",
      channel: "Algorithm Expert",
      views: "325K",
      duration: "31:08",
      thumbnail: "https://placehold.co/640x360/3730a3/FFFFFF/png?text=Binary+Trees",
      difficulty: "Intermediate"
    },
    {
      title: "RESTful API Design Best Practices",
      channel: "WebDevMastery",
      views: "189K",
      duration: "24:57",
      thumbnail: "https://placehold.co/640x360/4f46e5/FFFFFF/png?text=API+Design",
      difficulty: "Intermediate"
    }
  ];
  
  const modules = [
    {
      title: "Foundations of Python Programming",
      description: "Core concepts and syntax of the Python programming language",
      progress: 100,
      topics: [
        { name: "Variables and Data Types", completed: true, type: "video" },
        { name: "Control Flow", completed: true, type: "reading" },
        { name: "Functions and Modules", completed: true, type: "practice" },
        { name: "Error Handling", completed: true, type: "quiz" }
      ]
    },
    {
      title: "Data Structures in Python",
      description: "Understanding fundamental data structures for efficient programming",
      progress: 75,
      topics: [
        { name: "Lists and Tuples", completed: true, type: "video" },
        { name: "Dictionaries and Sets", completed: true, type: "reading" },
        { name: "Stacks and Queues", completed: true, type: "practice" },
        { name: "Trees and Graphs", completed: false, type: "quiz" }
      ]
    },
    {
      title: "Algorithms and Problem Solving",
      description: "Techniques for designing efficient algorithms and solving complex problems",
      progress: 30,
      topics: [
        { name: "Search Algorithms", completed: true, type: "video" },
        { name: "Sorting Algorithms", completed: false, type: "practice" },
        { name: "Recursive Algorithms", completed: false, type: "reading" },
        { name: "Dynamic Programming", completed: false, type: "quiz" }
      ]
    },
    {
      title: "Database Systems",
      description: "Working with databases and understanding data management",
      progress: 25,
      topics: [
        { name: "SQL Basics", completed: true, type: "video" },
        { name: "Database Design", completed: false, type: "reading" },
        { name: "Indexing and Optimization", completed: false, type: "practice" },
        { name: "NoSQL Databases", completed: false, type: "quiz" }
      ]
    }
  ];
  
  const topicTypeIcons = {
    video: <PlayCircle className="h-4 w-4" />,
    reading: <FileText className="h-4 w-4" />,
    practice: <Code className="h-4 w-4" />,
    quiz: <BookOpen className="h-4 w-4" />
  };

  return (
    <Layout title="Learning Path">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Your Personalized Learning Journey</h2>
        <p className="text-gray-600">
          Based on your assessment results, we've tailored a learning path to strengthen your weak areas and help you progress.
        </p>
      </div>
      
      <Tabs defaultValue="path" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="path">Learning Modules</TabsTrigger>
          <TabsTrigger value="videos">Recommended Videos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="path" className="animate-fade-in">
          <div className="space-y-6">
            {modules.map((module, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="border-l-4 border-brand-500">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{module.title}</h3>
                        <p className="text-sm text-gray-600">{module.description}</p>
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
                              ? "bg-green-50 border-green-200" 
                              : "bg-white border-gray-200"
                          }`}
                        >
                          <div className={`p-2 rounded-full mr-3 ${
                            topic.completed ? "bg-green-100" : "bg-gray-100"
                          }`}>
                            {topic.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
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
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="videos" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoRecommendations.map((video, index) => (
              <Card key={index} className="overflow-hidden flex flex-col">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  {video.recommended && (
                    <div className="absolute top-2 left-2 flex items-center bg-brand-600/90 text-white text-xs px-2 py-1 rounded">
                      <Star className="h-3 w-3 mr-1 fill-white" />
                      Recommended
                    </div>
                  )}
                </div>
                
                <CardContent className="flex-grow flex flex-col p-4">
                  <h3 className="font-semibold mb-1 line-clamp-2">{video.title}</h3>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <span>{video.channel}</span>
                    <span className="mx-1">•</span>
                    <span>{video.views} views</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <Badge variant="outline" className="bg-gray-100">
                      {video.difficulty}
                    </Badge>
                    
                    <Button size="sm" className="flex items-center gap-1">
                      <Youtube className="h-4 w-4" />
                      Watch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default LearningPath;
