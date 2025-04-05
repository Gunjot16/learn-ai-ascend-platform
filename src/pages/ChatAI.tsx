
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, Sparkles, Lightbulb, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const COHERE_API_KEY = "9u0gS3ibTGzstpHCugWtyJHJUIxq67TKLXRNWSYH";

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

  const getCohereResponse = async (message: string) => {
    try {
      const response = await fetch("https://api.cohere.ai/v1/generate", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "command",
          prompt: `You are a helpful computer science tutor. The user is asking: ${message}. Provide a helpful response that is educational and concise.`,
          max_tokens: 300,
          temperature: 0.7,
        })
      });
      
      const data = await response.json();
      return data.generations?.[0]?.text || "I'm sorry, I couldn't generate a response at the moment. Please try again later.";
    } catch (error) {
      console.error("Error calling Cohere API:", error);
      return "I'm having trouble connecting to my knowledge base. Please try again in a moment.";
    }
  };

  // Function to format current time
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: inputMessage,
      timestamp: getCurrentTime(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    try {
      // Get response from Cohere API
      const cohereResponse = await getCohereResponse(inputMessage);
      
      const botMessage = {
        id: messages.length + 2,
        role: "bot",
        content: cohereResponse.trim(),
        timestamp: getCurrentTime(),
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
      
      toast({
        title: "AI Assistant",
        description: "New response from your AI tutor",
      });
    } catch (error) {
      console.error("Error in chat flow:", error);
      
      const errorMessage = {
        id: messages.length + 2,
        role: "bot",
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: getCurrentTime(),
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add keyboard shortcut for sending messages with Enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputMessage]);

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
          <Card className="border-0 shadow-md h-[calc(100vh-12rem)] dark:bg-slate-800/50">
            <CardContent className="p-0 flex flex-col h-full">
              <div className="bg-brand-50 dark:bg-brand-900/20 p-4 border-b">
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
                        <Sparkles className="h-3 w-3 mr-1" /> Powered by Cohere
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
                            : "bg-secondary dark:bg-slate-700/50"
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
                      <div className="rounded-xl p-3 bg-secondary dark:bg-slate-700/50 flex items-center">
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
              
              <div className="p-4 border-t bg-card dark:bg-slate-800/40">
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
          <Card className="dark:bg-slate-800/50">
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
                    className="w-full justify-start text-left h-auto py-2 dark:hover:bg-slate-700/50"
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
          
          <Card className="dark:bg-slate-800/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-5 w-5 text-brand-600" />
                <h3 className="font-semibold">About AI Assistant</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                This AI assistant is powered by Cohere and personalized to your learning journey. It uses your assessment results to provide targeted help and resources for the topics you need to improve.
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
