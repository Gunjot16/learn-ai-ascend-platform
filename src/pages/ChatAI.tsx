
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User, Sparkles, Lightbulb, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const ChatAI = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "bot",
      content: "Hi there! I'm your AI learning assistant. How can I help you with your studies today?",
      timestamp: "Just now",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: inputMessage,
      timestamp: "Just now",
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "Based on your learning progress, I'd recommend focusing on recursive algorithms. Would you like me to explain the key concepts?",
        "Looking at your assessment results, I can see you're having trouble with database indexing. Let me explain it with a simple analogy.",
        "I noticed you've been making great progress in Python fundamentals! Ready to move on to more advanced topics like decorators?",
        "You're doing well with your studies! To improve further, try the practice exercises on binary trees - they'll help strengthen your understanding.",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        id: messages.length + 2,
        role: "bot",
        content: randomResponse,
        timestamp: "Just now",
      };
      
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsLoading(false);
      
      toast({
        title: "AI Assistant",
        description: "New suggestion based on your learning profile",
      });
    }, 1500);
  };

  const suggestedQuestions = [
    "Help me understand recursive algorithms",
    "Explain database indexing with examples",
    "What are Python decorators and when should I use them?",
    "Create a practice quiz on data structures",
    "Show my weak areas based on my assessment",
  ];

  return (
    <Layout title="AI Assistant">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="border-0 shadow-md h-[calc(100vh-12rem)]">
            <CardContent className="p-0 flex flex-col h-full">
              <div className="bg-brand-50 p-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-brand-200">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-brand-700 text-white">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      LearnAscend AI
                      <Badge variant="default" className="bg-brand-600">
                        <Sparkles className="h-3 w-3 mr-1" /> Smart Tutor
                      </Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Personalized learning assistant
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex max-w-[75%] gap-3 ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar className="h-8 w-8">
                        {message.role === "user" ? (
                          <>
                            <AvatarImage src="" />
                            <AvatarFallback>JS</AvatarFallback>
                          </>
                        ) : (
                          <AvatarFallback className="bg-brand-700 text-white">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div
                        className={`rounded-xl p-3 ${
                          message.role === "user"
                            ? "bg-brand-600 text-white"
                            : "bg-secondary"
                        }`}
                      >
                        <p>{message.content}</p>
                        <span
                          className={`text-xs block mt-1 ${
                            message.role === "user"
                              ? "text-brand-100"
                              : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex max-w-[75%] gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-brand-700 text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="rounded-xl p-3 bg-secondary flex items-center">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-brand-600 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="w-2 h-2 rounded-full bg-brand-600 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                          <div className="w-2 h-2 rounded-full bg-brand-600 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t bg-card">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-end gap-2"
                >
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask anything about your learning materials..."
                    className="flex-grow"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 text-brand-600" />
                <h3 className="font-semibold">Suggested Questions</h3>
              </div>
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => {
                      setInputMessage(question);
                    }}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-5 w-5 text-brand-600" />
                <h3 className="font-semibold">About AI Assistant</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                This AI assistant is personalized to your learning journey. It uses your assessment results to provide targeted help and resources for the topics you need to improve.
              </p>
              <div className="mt-3 space-y-2">
                <div className="flex gap-2 items-center text-sm">
                  <Sparkles className="h-4 w-4 text-brand-600" />
                  <span>Personalized explanations</span>
                </div>
                <div className="flex gap-2 items-center text-sm">
                  <Sparkles className="h-4 w-4 text-brand-600" />
                  <span>Practice problem generator</span>
                </div>
                <div className="flex gap-2 items-center text-sm">
                  <Sparkles className="h-4 w-4 text-brand-600" />
                  <span>Progress tracking insights</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ChatAI;
