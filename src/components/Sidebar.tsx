import React, { useState } from 'react';
import FileExplorer from './FileExplorer';
import { Search, Terminal, Filter, MoreHorizontal } from 'lucide-react';
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
          <div className="p-2">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center bg-[#3C3C3C] p-1 rounded-sm">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="bg-transparent border-none text-sm h-6 py-1 px-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <button className="p-1 text-gray-400 hover:text-white">
                    <Terminal size={14} />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-white">
                    <Filter size={14} />
                  </button>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button className="p-1 text-gray-400 hover:text-white">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-400">
              {searchQuery ? 'No results found' : 'Type to search in files'}
            </div>
          </div>
        );
      case 'git':
        return (
          <div className="p-2">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold">Source Control</h3>
              <div className="flex items-center space-x-1">
                <button className="p-1 text-gray-400 hover:text-white">
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-400">No source control providers registered.</p>
            <button className="mt-2 text-xs text-blue-400 hover:underline">Initialize Repository</button>
          </div>
        );
      case 'debug':
        return (
          <div className="p-2">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold">Run and Debug</h3>
              <div className="flex items-center space-x-1">
                <button className="p-1 text-gray-400 hover:text-white">
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-400">No configurations found.</p>
            <button className="mt-2 text-xs text-blue-400 hover:underline">Add Configuration...</button>
          </div>
        );
      case 'extensions':
        return (
          <div className="p-2">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center bg-[#3C3C3C] p-1 rounded-sm">
                <Input
                  type="text"
                  placeholder="Search Extensions in Marketplace"
                  className="bg-transparent border-none text-sm h-6 py-1 px-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-xs font-semibold uppercase text-gray-400 mb-2">Recommended</h4>
              <div className="space-y-2">
                <div className="p-2 hover:bg-[#2A2D2E] cursor-pointer">
                  <div className="text-sm font-medium">ESLint</div>
                  <div className="text-xs text-gray-400">Microsoft</div>
                </div>
                <div className="p-2 hover:bg-[#2A2D2E] cursor-pointer">
                  <div className="text-sm font-medium">Prettier - Code formatter</div>
                  <div className="text-xs text-gray-400">Prettier</div>
                </div>
              </div>
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
        return 'RUN AND DEBUG';
      default:
        return '';
    }
  };

  return (
    <div className="h-full bg-[#252526] border-r border-[#383838] flex flex-col">
      <div className="px-2 py-1 text-xs font-semibold tracking-wide text-gray-400">{getTitle()}</div>
      <div className="flex-1 overflow-auto">
        {renderView()}
      </div>
    </div>
  );
};

export default Sidebar;
