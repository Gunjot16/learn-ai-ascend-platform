
import { cn } from "@/lib/utils";
import { 
  BarChart3, BookOpen, Home, Users, 
  MessageSquare, Settings, LogOut 
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div className={cn("w-64 h-screen bg-white border-r border-gray-200 flex flex-col", className)}>
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-brand-600 flex items-center">
          <BookOpen className="h-6 w-6 mr-2" />
          LearnAscend
        </h1>
      </div>
      
      <div className="flex-grow p-4">
        <nav className="space-y-1">
          <NavLink to="/" className={({isActive}) => 
            cn("nav-link", isActive && "active")
          }>
            <Home className="h-5 w-5" />
            Dashboard
          </NavLink>
          
          <NavLink to="/learning" className={({isActive}) => 
            cn("nav-link", isActive && "active")
          }>
            <BookOpen className="h-5 w-5" />
            Learning Path
          </NavLink>
          
          <NavLink to="/community" className={({isActive}) => 
            cn("nav-link", isActive && "active")
          }>
            <Users className="h-5 w-5" />
            Community
          </NavLink>
          
          <NavLink to="/chat" className={({isActive}) => 
            cn("nav-link", isActive && "active")
          }>
            <MessageSquare className="h-5 w-5" />
            AI Assistant
          </NavLink>
          
          <NavLink to="/analytics" className={({isActive}) => 
            cn("nav-link", isActive && "active")
          }>
            <BarChart3 className="h-5 w-5" />
            Analytics
          </NavLink>
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <nav className="space-y-1">
          <NavLink to="/settings" className={({isActive}) => 
            cn("nav-link", isActive && "active")
          }>
            <Settings className="h-5 w-5" />
            Settings
          </NavLink>
          
          <button className="nav-link w-full text-left text-gray-600 hover:text-gray-900">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
