
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

  // Sample structure for demo purposes
  const demoFiles = [
    {
      name: 'project',
      type: 'folder',
      path: 'project',
      children: [
        {
          name: 'src',
          type: 'folder',
          path: 'project/src',
          children: [
            { name: 'App.tsx', type: 'file', path: 'project/src/App.tsx' },
            { name: 'index.tsx', type: 'file', path: 'project/src/index.tsx' },
            { name: 'styles.css', type: 'file', path: 'project/src/styles.css' },
            {
              name: 'components',
              type: 'folder',
              path: 'project/src/components',
              children: [
                { name: 'Button.tsx', type: 'file', path: 'project/src/components/Button.tsx' },
                { name: 'Header.tsx', type: 'file', path: 'project/src/components/Header.tsx' },
                { name: 'Footer.tsx', type: 'file', path: 'project/src/components/Footer.tsx' },
              ],
            },
          ],
        },
        {
          name: 'public',
          type: 'folder',
          path: 'project/public',
          children: [
            { name: 'index.html', type: 'file', path: 'project/public/index.html' },
            { name: 'favicon.ico', type: 'file', path: 'project/public/favicon.ico' },
          ],
        },
        { name: 'package.json', type: 'file', path: 'project/package.json' },
        { name: 'tsconfig.json', type: 'file', path: 'project/tsconfig.json' },
        { name: 'README.md', type: 'file', path: 'project/README.md' },
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
