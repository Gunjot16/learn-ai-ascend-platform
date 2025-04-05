
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Code, Network, ChevronRight, ChevronLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Domain-specific question data
const questions = {
  dsa: [
    {
      id: "dsa1",
      question: "Explain how a binary search tree works and its time complexity for search operations.",
      keywords: ["binary search tree", "o(log n)", "balanced", "left child", "right child", "comparison", "recursion"]
    },
    {
      id: "dsa2",
      question: "Describe the differences between a stack and a queue data structure, with real-world examples.",
      keywords: ["lifo", "fifo", "push", "pop", "enqueue", "dequeue", "last in first out", "first in first out"]
    },
    {
      id: "dsa3",
      question: "Explain how hash tables work and discuss collision resolution strategies.",
      keywords: ["hash function", "collision", "chaining", "open addressing", "load factor", "lookup", "o(1)"]
    }
  ],
  os: [
    {
      id: "os1",
      question: "Explain process scheduling algorithms and their impact on system performance.",
      keywords: ["fcfs", "sjf", "round robin", "priority", "scheduling", "cpu utilization", "throughput", "turnaround time"]
    },
    {
      id: "os2",
      question: "Describe virtual memory and its advantages in modern operating systems.",
      keywords: ["paging", "swapping", "page fault", "tlb", "address space", "physical memory", "hard disk", "memory management"]
    },
    {
      id: "os3",
      question: "Explain deadlocks in operating systems and methods to prevent them.",
      keywords: ["deadlock", "mutual exclusion", "hold and wait", "circular wait", "prevention", "avoidance", "detection", "recovery"]
    }
  ],
  cn: [
    {
      id: "cn1",
      question: "Explain the OSI model layers and their functions in computer networks.",
      keywords: ["physical", "data link", "network", "transport", "session", "presentation", "application", "protocol"]
    },
    {
      id: "cn2",
      question: "Describe how TCP ensures reliable data transfer over unreliable networks.",
      keywords: ["handshake", "acknowledgment", "sequence number", "flow control", "congestion control", "retransmission", "timeout", "window"]
    },
    {
      id: "cn3",
      question: "Explain IP addressing, subnetting, and the difference between IPv4 and IPv6.",
      keywords: ["subnet mask", "cidr", "private address", "public address", "ipv4", "ipv6", "nat", "routing"]
    }
  ]
};

type Domain = "dsa" | "os" | "cn";
type DomainInfo = { name: string; icon: React.ReactNode };

const domainInfo: Record<Domain, DomainInfo> = {
  dsa: { name: "Data Structures & Algorithms", icon: <Code className="h-5 w-5" /> },
  os: { name: "Operating Systems", icon: <BookOpen className="h-5 w-5" /> },
  cn: { name: "Computer Networks", icon: <Network className="h-5 w-5" /> }
};

const Assessment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentDomain, setCurrentDomain] = useState<Domain>("dsa");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate which domains are completed
  const domains: Domain[] = ["dsa", "os", "cn"];
  const domainCompleted = domains.map(domain => {
    const domainQuestions = questions[domain];
    const answeredQuestions = domainQuestions.filter(q => answers[q.id]?.trim().length > 0);
    return answeredQuestions.length === domainQuestions.length;
  });

  const totalQuestions = Object.values(questions).flat().length;
  const answeredQuestions = Object.keys(answers).filter(key => answers[key]?.trim().length > 0).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const currentQuestion = questions[currentDomain][currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < questions[currentDomain].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Find next incomplete domain
      const nextDomainIndex = domains.findIndex((domain, i) => 
        domain !== currentDomain && !domainCompleted[i]
      );
      
      if (nextDomainIndex !== -1) {
        setCurrentDomain(domains[nextDomainIndex]);
        setCurrentQuestionIndex(0);
      } else {
        // All questions answered, check if can submit
        const allAnswered = Object.values(questions).flat().every(q => answers[q.id]?.trim().length > 0);
        
        if (allAnswered) {
          handleSubmit();
        } else {
          // Find first unanswered question
          for (const domain of domains) {
            const unansweredIndex = questions[domain].findIndex(q => !answers[q.id]?.trim().length > 0);
            if (unansweredIndex !== -1) {
              setCurrentDomain(domain);
              setCurrentQuestionIndex(unansweredIndex);
              break;
            }
          }
        }
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      // Find previous domain
      const currentDomainIndex = domains.indexOf(currentDomain);
      if (currentDomainIndex > 0) {
        const prevDomain = domains[currentDomainIndex - 1];
        setCurrentDomain(prevDomain);
        setCurrentQuestionIndex(questions[prevDomain].length - 1);
      }
    }
  };

  const analyzeAnswers = () => {
    // This would normally be sent to a server for NLP analysis
    // Here we'll simulate a simple keyword-based analysis
    
    const results = domains.reduce((acc, domain) => {
      const domainQuestions = questions[domain];
      let score = 0;
      
      domainQuestions.forEach(q => {
        const userAnswer = (answers[q.id] || "").toLowerCase();
        let keywordsFound = 0;
        
        for (const keyword of q.keywords) {
          if (userAnswer.includes(keyword.toLowerCase())) {
            keywordsFound++;
          }
        }
        
        // Calculate percentage of keywords found
        const questionScore = (keywordsFound / q.keywords.length) * 100;
        score += questionScore;
      });
      
      // Average score for the domain
      acc[domain] = Math.round(score / domainQuestions.length);
      return acc;
    }, {} as Record<Domain, number>);
    
    return results;
  };

  const handleSubmit = () => {
    const allAnswered = Object.values(questions).flat().every(q => answers[q.id]?.trim().length > 0);
    
    if (!allAnswered) {
      toast({
        title: "Incomplete Assessment",
        description: "Please answer all questions before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Analyze answers and generate results
    const results = analyzeAnswers();
    
    // In a real app, we'd send these to a server
    // For now, we'll store in session storage
    sessionStorage.setItem("assessmentResults", JSON.stringify(results));
    
    // Redirect to results page
    setTimeout(() => {
      navigate("/results");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Animated pattern background */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute inset-0 grid grid-cols-20 grid-rows-20">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white" />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Assessment</h1>
            <p className="text-xl text-gray-300 mb-8">
              Answer the following questions about your knowledge in each domain
            </p>
            
            <div className="mb-8">
              <Progress value={progress} className="h-2 mb-2" />
              <div className="text-sm text-gray-400">
                {answeredQuestions} of {totalQuestions} questions answered
              </div>
            </div>

            <div className="flex justify-center space-x-3 mb-8">
              {domains.map((domain, index) => (
                <Button
                  key={domain}
                  variant={currentDomain === domain ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setCurrentDomain(domain);
                    setCurrentQuestionIndex(0);
                  }}
                  className="flex items-center gap-2"
                >
                  {domainInfo[domain].icon}
                  {domainInfo[domain].name}
                  {domainCompleted[index] && (
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  )}
                </Button>
              ))}
            </div>
          </motion.div>

          <motion.div
            key={`${currentDomain}-${currentQuestionIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-slate-800/70 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-brand-900/50 p-2 rounded-full">
                    {domainInfo[currentDomain].icon}
                  </div>
                  <span className="text-sm font-medium text-brand-300">
                    {domainInfo[currentDomain].name} - Question {currentQuestionIndex + 1}/{questions[currentDomain].length}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-4">
                  {currentQuestion.question}
                </h3>

                <div className="mb-6">
                  <Textarea
                    placeholder="Type your answer here..."
                    className="min-h-[200px] bg-slate-900 border-slate-700 text-white"
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) =>
                      setAnswers({ ...answers, [currentQuestion.id]: e.target.value })
                    }
                  />
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentDomain === domains[0] && currentQuestionIndex === 0}
                    className="flex items-center"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  
                  <Button 
                    onClick={handleNext}
                    className="flex items-center"
                  >
                    {progress === 100 ? "Submit" : "Next"} 
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {progress === 100 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <Button 
                size="lg" 
                variant="default"
                className="bg-brand-600 hover:bg-brand-700"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Analyzing Responses..." : "Submit Assessment"}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
