
import React from 'react';
import { X, File, FileJson, FileCode, FileText, Folder } from 'lucide-react';

interface EditorTabsProps {
  openFiles: string[];
  activeFile: string | null;
  onTabClick: (filePath: string) => void;
  onTabClose: (filePath: string) => void;
}

const EditorTabs: React.FC<EditorTabsProps> = ({
  openFiles,
  activeFile,
  onTabClick,
  onTabClose,
}) => {
  const getFileIcon = (filePath: string) => {
    const extension = filePath.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'json':
        return <FileJson size={16} />;
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return <FileCode size={16} className="text-yellow-400" />;
      case 'html':
        return <FileCode size={16} className="text-orange-400" />;
      case 'css':
      case 'scss':
        return <FileCode size={16} className="text-blue-400" />;
      case 'md':
        return <FileText size={16} />;
      default:
        return <File size={16} />;
    }
  };

  const getFileName = (filePath: string) => {
    return filePath.split('/').pop();
  };

  return (
    <div className="flex h-9 bg-[#252526] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
      {openFiles.map((file) => (
        <div
          key={file}
          className={`vscode-tab ${activeFile === file ? 'active' : ''}`}
          onClick={() => onTabClick(file)}
        >
          <div className="flex items-center">
            <span className="mr-2">{getFileIcon(file)}</span>
            <span className="truncate max-w-[120px]">{getFileName(file)}</span>
          </div>
          <button
            className="ml-2 p-0.5 rounded hover:bg-[#383838] focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(file);
            }}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default EditorTabs;
