
import React from 'react';
import { 
  Files, Search, GitBranch, PackageOpen, Play, Database, 
  Settings, User, Bug, Puzzle 
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ActivityBarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const ActivityBar: React.FC<ActivityBarProps> = ({ activeView, setActiveView }) => {
  const items = [
    { id: 'explorer', icon: <Files size={24} />, tooltip: 'Explorer' },
    { id: 'search', icon: <Search size={24} />, tooltip: 'Search' },
    { id: 'git', icon: <GitBranch size={24} />, tooltip: 'Source Control' },
    { id: 'debug', icon: <Bug size={24} />, tooltip: 'Run and Debug' },
    { id: 'extensions', icon: <Puzzle size={24} />, tooltip: 'Extensions' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#333333] text-white py-2 border-r border-[#252526] w-12">
      <TooltipProvider>
        <div className="flex flex-col items-center space-y-4">
          {items.map((item) => (
            <Tooltip key={item.id} delayDuration={300}>
              <TooltipTrigger asChild>
                <button
                  className={`w-12 h-12 flex items-center justify-center relative focus:outline-none transition-colors ${
                    activeView === item.id
                      ? 'text-white before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-[#0078D4]'
                      : 'text-[#858585] hover:text-white'
                  }`}
                  onClick={() => setActiveView(item.id)}
                >
                  {item.icon}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-[#252526] text-white border-[#454545]">
                <p>{item.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
      
      <div className="mt-auto">
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <button className="w-12 h-12 flex items-center justify-center text-[#858585] hover:text-white transition-colors">
                <Settings size={24} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-[#252526] text-white border-[#454545]">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ActivityBar;
