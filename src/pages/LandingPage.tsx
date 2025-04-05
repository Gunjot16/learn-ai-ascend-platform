
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Code, Database, Network, Cpu, Monitor, ChevronRight } from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 overflow-hidden text-white">
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute left-0 top-0 h-full w-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-brand-500 opacity-30"
              style={{
                width: Math.random() * 400 + 100,
                height: Math.random() * 400 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [Math.random() * 100, Math.random() * -100],
                y: [Math.random() * 100, Math.random() * -100],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: Math.random() * 10 + 20,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0">
          <svg
            className="opacity-30 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Circuit board pattern */}
            <pattern
              id="circuit"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0,0 L20,0 L20,20 L0,20 Z"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
              />
              <circle cx="10" cy="10" r="1.5" fill="rgba(255,255,255,0.2)" />
              <circle cx="0" cy="0" r="1" fill="rgba(255,255,255,0.2)" />
              <circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.2)" />
              <path
                d="M10,0 L10,10 L20,10"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.5"
              />
              <path
                d="M0,10 L10,10"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100" height="100" fill="url(#circuit)" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex justify-end py-4">
          <ThemeToggle />
        </div>
        
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-brand-300 to-brand-500 text-transparent bg-clip-text mb-6">
              LearnAscend
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
              Your personalized AI-powered learning platform that adapts to your knowledge level and helps you master Computer Science concepts.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-brand-600 hover:bg-brand-700 animate-pulse"
              onClick={() => navigate("/assessment")}
            >
              Start Your Assessment <ChevronRight className="ml-2" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div className="bg-slate-800/50 border border-slate-700 dark:bg-slate-900/50 dark:border-slate-800 p-8 rounded-xl backdrop-blur-sm shadow-xl hover:shadow-brand-500/10 transition-all hover:scale-105">
            <div className="bg-brand-900/30 p-4 rounded-lg inline-block mb-4">
              <Code size={32} className="text-brand-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Data Structures & Algorithms</h3>
            <p className="text-gray-300 dark:text-gray-400">Master algorithms, data structures, and problem-solving techniques essential for coding interviews and software development.</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 dark:bg-slate-900/50 dark:border-slate-800 p-8 rounded-xl backdrop-blur-sm shadow-xl hover:shadow-brand-500/10 transition-all hover:scale-105">
            <div className="bg-brand-900/30 p-4 rounded-lg inline-block mb-4">
              <Cpu size={32} className="text-brand-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Operating Systems</h3>
            <p className="text-gray-300 dark:text-gray-400">Learn about processes, memory management, file systems, and how modern operating systems function.</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 dark:bg-slate-900/50 dark:border-slate-800 p-8 rounded-xl backdrop-blur-sm shadow-xl hover:shadow-brand-500/10 transition-all hover:scale-105">
            <div className="bg-brand-900/30 p-4 rounded-lg inline-block mb-4">
              <Network size={32} className="text-brand-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Computer Networks</h3>
            <p className="text-gray-300 dark:text-gray-400">Understand networking protocols, architectures, and the principles behind internet communication.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
            <div className="flex flex-col items-center max-w-xs">
              <div className="bg-brand-900/30 p-4 rounded-full mb-4">
                <Monitor size={32} className="text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">1. Take Assessment</h3>
              <p className="text-gray-300 dark:text-gray-400 text-center">Complete our adaptive assessment to identify your knowledge gaps</p>
            </div>
            
            <div className="flex flex-col items-center max-w-xs">
              <div className="bg-brand-900/30 p-4 rounded-full mb-4">
                <Database size={32} className="text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">2. Get Analysis</h3>
              <p className="text-gray-300 dark:text-gray-400 text-center">Our AI analyzes your answers to identify strength and areas for improvement</p>
            </div>
            
            <div className="flex flex-col items-center max-w-xs">
              <div className="bg-brand-900/30 p-4 rounded-full mb-4">
                <Code size={32} className="text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">3. Learn & Improve</h3>
              <p className="text-gray-300 dark:text-gray-400 text-center">Access personalized learning resources tailored to help you improve</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 text-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-brand-600 hover:bg-brand-700"
            onClick={() => navigate("/assessment")}
          >
            Begin Your Learning Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
