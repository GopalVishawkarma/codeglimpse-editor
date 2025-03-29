
import React from 'react';
import { GitBranch, Wifi, Check, Bell, X, AlertCircle, Clock, Globe } from 'lucide-react';

interface StatusBarProps {
  activeFile: string | null;
}

const StatusBar: React.FC<StatusBarProps> = ({ activeFile }) => {
  const getFileExtension = () => {
    if (!activeFile) return '';
    const parts = activeFile.split('.');
    return parts[parts.length - 1].toLowerCase();
  };

  const getLanguage = () => {
    if (!activeFile) return 'Plain Text';
    
    const extension = getFileExtension();
    
    const languageMap: Record<string, string> = {
      'js': 'JavaScript',
      'jsx': 'JavaScript React',
      'ts': 'TypeScript',
      'tsx': 'TypeScript React',
      'html': 'HTML',
      'css': 'CSS',
      'json': 'JSON',
      'md': 'Markdown',
      'py': 'Python',
      'java': 'Java',
      'c': 'C',
      'cpp': 'C++',
      'cs': 'C#',
      'go': 'Go',
      'rs': 'Rust',
      'php': 'PHP',
      'rb': 'Ruby'
    };
    
    return languageMap[extension] || 'Plain Text';
  };

  return (
    <div className="flex items-center justify-between h-6 bg-[#007ACC] text-white text-xs border-t border-[#15416B]">
      <div className="flex items-center">
        <div className="flex items-center px-2 hover:bg-[#1F8AD2] cursor-pointer transition-colors">
          <GitBranch size={14} className="mr-1" />
          <span>main</span>
        </div>
        <div className="flex items-center px-2 hover:bg-[#1F8AD2] cursor-pointer transition-colors">
          <Check size={14} className="mr-1" />
          <span>0</span>
          <X size={14} className="mx-1" />
          <span>0</span>
          <AlertCircle size={14} className="mx-1" />
          <span>0</span>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="px-2 hover:bg-[#1F8AD2] cursor-pointer transition-colors flex items-center">
          <Clock size={14} className="mr-1" />
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
        <div className="px-2 hover:bg-[#1F8AD2] cursor-pointer transition-colors">{getLanguage()}</div>
        <div className="px-2 hover:bg-[#1F8AD2] cursor-pointer transition-colors">
          <Globe size={14} className="mr-1 inline-block" />
          <span>UTF-8</span>
        </div>
        <div className="px-2 hover:bg-[#1F8AD2] cursor-pointer transition-colors">LF</div>
        <div className="px-2 hover:bg-[#1F8AD2] cursor-pointer transition-colors">Spaces: 2</div>
        <div className="px-2 hover:bg-[#1F8AD2] cursor-pointer transition-colors">
          <Wifi size={14} className="mr-1 inline-block" />
          <span>Connected</span>
        </div>
        <div className="px-2 hover:bg-[#1F8AD2] cursor-pointer transition-colors">
          <Bell size={14} />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
