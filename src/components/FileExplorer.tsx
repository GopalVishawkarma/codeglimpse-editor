
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, FolderPlus, FilePlus, RefreshCw, MoreHorizontal } from 'lucide-react';
import FileIcon from './FileIcon';

interface FileExplorerProps {
  selectedFile: string | null;
  onFileSelect: (filePath: string) => void;
  projectFiles?: any[];
  onOpenProjectFile?: (filePath: string, handle: any) => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({
  selectedFile,
  onFileSelect,
  projectFiles = [],
  onOpenProjectFile = () => {},
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'project': true,
    'project/src': true,
    'project/public': false,
  });

  // Sample structure that looks more like the reference image
  const demoFiles = [
    {
      name: 'CREATE-REACT-APP',
      type: 'folder',
      path: 'project',
      children: [
        {
          name: 'github',
          type: 'folder',
          path: 'project/github',
          children: [],
        },
        {
          name: 'vscode',
          type: 'folder',
          path: 'project/vscode',
          children: [],
        },
        {
          name: 'node_modules',
          type: 'folder',
          path: 'project/node_modules',
          children: [],
        },
        {
          name: 'public',
          type: 'folder',
          path: 'project/public',
          children: [],
        },
        {
          name: 'src',
          type: 'folder',
          path: 'project/src',
          children: [
            { name: 'App.css', type: 'file', path: 'project/src/App.css' },
            { name: 'App.js', type: 'file', path: 'project/src/App.js' },
            { name: 'App.test.js', type: 'file', path: 'project/src/App.test.js' },
            { name: 'index.css', type: 'file', path: 'project/src/index.css' },
            { name: 'index.js', type: 'file', path: 'project/src/index.js' },
            { name: 'logo.svg', type: 'file', path: 'project/src/logo.svg' },
            { name: 'serviceWorker.js', type: 'file', path: 'project/src/serviceWorker.js' },
          ],
        },
        { name: '.gitignore', type: 'file', path: 'project/.gitignore' },
        { name: 'package-lock.json', type: 'file', path: 'project/package-lock.json' },
        { name: 'package.json', type: 'file', path: 'project/package.json' },
        { name: 'README.md', type: 'file', path: 'project/README.md' },
        { name: 'yarn.lock', type: 'file', path: 'project/yarn.lock' },
      ],
    },
  ];

  // Use provided project files or demo files if none provided
  const files = projectFiles.length > 0 ? projectFiles : demoFiles;

  const toggleFolder = (path: string) => {
    setExpandedFolders({
      ...expandedFolders,
      [path]: !expandedFolders[path],
    });
  };

  const renderTree = (items: any[], level = 0) => {
    return items.map((item) => {
      const isFolder = item.type === 'folder' || (item.children && item.children.length > 0);
      const isExpanded = expandedFolders[item.path] || false;

      return (
        <div key={item.path}>
          <div
            className={`flex items-center px-2 py-1 cursor-pointer hover:bg-[#2A2D2E] ${
              selectedFile === item.path ? 'bg-[#37373D]' : ''
            }`}
            style={{ paddingLeft: `${level === 0 ? 8 : level * 8 + 8}px` }}
            onClick={() => {
              if (isFolder) {
                toggleFolder(item.path);
              } else {
                if (item.handle) {
                  onOpenProjectFile(item.path, item.handle);
                } else {
                  onFileSelect(item.path);
                }
              }
            }}
          >
            {isFolder ? (
              <span className="mr-1">
                {isExpanded ? (
                  <ChevronDown size={16} className="text-gray-400" />
                ) : (
                  <ChevronRight size={16} className="text-gray-400" />
                )}
              </span>
            ) : (
              <span className="ml-4" />
            )}
            <span className="mr-1">
              <FileIcon 
                fileName={item.name} 
                isFolder={isFolder} 
                isOpen={isExpanded} 
              />
            </span>
            <span className="text-sm truncate">{item.name}</span>
          </div>
          
          {isFolder && isExpanded && item.children && (
            <div>{renderTree(item.children, level + 1)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="h-full overflow-auto">
      <div className="flex items-center justify-between p-2 text-xs uppercase font-semibold text-gray-400">
        <span>Explorer</span>
        <div className="flex items-center space-x-1">
          <button className="p-1 hover:bg-[#2A2D2E] rounded">
            <FolderPlus size={16} />
          </button>
          <button className="p-1 hover:bg-[#2A2D2E] rounded">
            <FilePlus size={16} />
          </button>
          <button className="p-1 hover:bg-[#2A2D2E] rounded">
            <RefreshCw size={16} />
          </button>
          <button className="p-1 hover:bg-[#2A2D2E] rounded">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
      
      <div className="text-sm">
        {renderTree(files)}
      </div>
    </div>
  );
};

export default FileExplorer;
