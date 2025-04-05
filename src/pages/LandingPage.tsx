
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Code, Database, Network, Cpu, Monitor, ChevronRight } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
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
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white/5" />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-brand-200 to-brand-400 text-transparent bg-clip-text mb-6">
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
          <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-xl backdrop-blur-sm shadow-xl hover:shadow-brand-500/10 transition-all hover:scale-105">
            <div className="bg-brand-900/30 p-4 rounded-lg inline-block mb-4">
              <Code size={32} className="text-brand-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Data Structures & Algorithms</h3>
            <p className="text-gray-400">Master algorithms, data structures, and problem-solving techniques essential for coding interviews and software development.</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-xl backdrop-blur-sm shadow-xl hover:shadow-brand-500/10 transition-all hover:scale-105">
            <div className="bg-brand-900/30 p-4 rounded-lg inline-block mb-4">
              <Cpu size={32} className="text-brand-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Operating Systems</h3>
            <p className="text-gray-400">Learn about processes, memory management, file systems, and how modern operating systems function.</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-xl backdrop-blur-sm shadow-xl hover:shadow-brand-500/10 transition-all hover:scale-105">
            <div className="bg-brand-900/30 p-4 rounded-lg inline-block mb-4">
              <Network size={32} className="text-brand-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Computer Networks</h3>
            <p className="text-gray-400">Understand networking protocols, architectures, and the principles behind internet communication.</p>
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
              <p className="text-gray-400 text-center">Complete our adaptive assessment to identify your knowledge gaps</p>
            </div>
            
            <div className="flex flex-col items-center max-w-xs">
              <div className="bg-brand-900/30 p-4 rounded-full mb-4">
                <Database size={32} className="text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">2. Get Analysis</h3>
              <p className="text-gray-400 text-center">Our AI analyzes your answers to identify strength and areas for improvement</p>
            </div>
            
            <div className="flex flex-col items-center max-w-xs">
              <div className="bg-brand-900/30 p-4 rounded-full mb-4">
                <Code size={32} className="text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">3. Learn & Improve</h3>
              <p className="text-gray-400 text-center">Access personalized learning resources tailored to help you improve</p>
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
