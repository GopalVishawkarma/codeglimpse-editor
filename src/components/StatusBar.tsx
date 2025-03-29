
import React from 'react';
import { GitBranch, Wifi } from 'lucide-react';

interface StatusBarProps {
  activeFile: string | null;
}

const StatusBar: React.FC<StatusBarProps> = ({ activeFile }) => {
  const getFileExtension = () => {
    if (!activeFile) return '';
    const parts = activeFile.split('.');
    return parts[parts.length - 1].toUpperCase();
  };

  const getLanguage = () => {
    if (!activeFile) return 'Plain Text';
    
    const extension = getFileExtension().toLowerCase();
    
    switch (extension) {
      case 'js':
        return 'JavaScript';
      case 'jsx':
        return 'JSX';
      case 'ts':
        return 'TypeScript';
      case 'tsx':
        return 'TSX';
      case 'html':
        return 'HTML';
      case 'css':
        return 'CSS';
      case 'json':
        return 'JSON';
      case 'md':
        return 'Markdown';
      default:
        return 'Plain Text';
    }
  };

  return (
    <div className="flex items-center justify-between h-6 bg-statusBar-background text-statusBar-foreground text-xs px-2">
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <GitBranch size={14} className="mr-1" />
          <span>main</span>
        </div>
        <div className="flex items-center">
          <Wifi size={14} className="mr-1" />
          <span>Connected</span>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="px-2 ml-2">{getLanguage()}</div>
        <div className="px-2 ml-2">UTF-8</div>
        <div className="px-2 ml-2">LF</div>
      </div>
    </div>
  );
};

export default StatusBar;
