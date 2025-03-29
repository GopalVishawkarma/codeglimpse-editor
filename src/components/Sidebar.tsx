
import React, { useState } from 'react';
import FileExplorer from './FileExplorer';
import { Search, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SidebarProps {
  activeView: string;
  selectedFile: string | null;
  onFileSelect: (filePath: string) => void;
  projectFiles?: any[];
  onOpenProjectFile?: (filePath: string, handle: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeView, 
  selectedFile, 
  onFileSelect,
  projectFiles = [],
  onOpenProjectFile = () => {}
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const renderView = () => {
    switch (activeView) {
      case 'explorer':
        return (
          <FileExplorer 
            selectedFile={selectedFile} 
            onFileSelect={onFileSelect} 
            projectFiles={projectFiles}
            onOpenProjectFile={onOpenProjectFile}
          />
        );
      case 'search':
        return (
          <div className="p-4">
            <div className="flex items-center bg-sidebar-active p-2 rounded-md mb-4">
              <Search size={18} className="text-sidebar-foreground opacity-70 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="bg-transparent border-none outline-none text-sidebar-foreground w-full"
              />
            </div>
            <div className="text-sm text-sidebar-foreground opacity-70">
              {searchQuery ? 'No results found' : 'Type to search in files'}
            </div>
          </div>
        );
      case 'git':
        return (
          <div className="p-4 text-sm text-sidebar-foreground">
            <h3 className="font-semibold mb-2">Source Control</h3>
            <p className="opacity-70">No source control providers registered.</p>
          </div>
        );
      case 'extensions':
        return (
          <div className="p-4 text-sm text-sidebar-foreground">
            <h3 className="font-semibold mb-2">Extensions</h3>
            <p className="opacity-70">Search for extensions in the Marketplace</p>
          </div>
        );
      case 'debug':
        return (
          <div className="p-4 text-sm text-sidebar-foreground">
            <h3 className="font-semibold mb-2">Debug</h3>
            <div className="flex flex-col space-y-2 mt-4">
              <p className="opacity-70">No debug configurations found.</p>
              <button className="text-blue-400 hover:underline text-left">Add Configuration...</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (activeView) {
      case 'explorer':
        return 'EXPLORER';
      case 'search':
        return 'SEARCH';
      case 'git':
        return 'SOURCE CONTROL';
      case 'extensions':
        return 'EXTENSIONS';
      case 'debug':
        return 'DEBUG';
      default:
        return '';
    }
  };

  return (
    <div className="h-full bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border flex flex-col">
      <div className="p-2 text-xs font-semibold tracking-wide">{getTitle()}</div>
      <div className="flex-1 overflow-auto">
        {renderView()}
      </div>
    </div>
  );
};

export default Sidebar;
