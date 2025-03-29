
import React from 'react';
import { File, Folder, Settings, Search, Code } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ActivityBarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const ActivityBar: React.FC<ActivityBarProps> = ({ activeView, setActiveView }) => {
  const items = [
    { id: 'explorer', icon: <Folder size={24} />, tooltip: 'Explorer' },
    { id: 'search', icon: <Search size={24} />, tooltip: 'Search' },
    { id: 'git', icon: <Code size={24} />, tooltip: 'Source Control' },
    { id: 'extensions', icon: <File size={24} />, tooltip: 'Extensions' },
  ];

  return (
    <div className="flex flex-col h-full bg-activityBar-background text-activityBar-foreground py-2">
      <TooltipProvider>
        <div className="flex flex-col items-center space-y-4">
          {items.map((item) => (
            <Tooltip key={item.id} delayDuration={300}>
              <TooltipTrigger asChild>
                <button
                  className={`w-12 h-12 flex items-center justify-center relative focus:outline-none ${
                    activeView === item.id
                      ? 'text-activityBar-foreground before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-activityBar-activeBorder'
                      : 'text-activityBar-inactiveForeground hover:text-activityBar-foreground'
                  }`}
                  onClick={() => setActiveView(item.id)}
                >
                  {item.icon}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
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
              <button className="w-12 h-12 flex items-center justify-center text-activityBar-inactiveForeground hover:text-activityBar-foreground">
                <Settings size={24} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ActivityBar;
