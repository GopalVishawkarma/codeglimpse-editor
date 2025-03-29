
import React from 'react';
import { X } from 'lucide-react';
import { 
  SiJavascript, SiTypescript, SiHtml5, SiCss3, SiJson, 
  SiMarkdown, SiPython, SiJava, SiReact
} from 'react-icons/si';
import { VscFile, VscFileCode } from 'react-icons/vsc';

<lov-add-dependency>react-icons@4.12.0</lov-add-dependency>

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
        return <SiJson size={16} className="text-yellow-500" />;
      case 'js':
        return <SiJavascript size={16} className="text-yellow-400" />;
      case 'jsx':
        return <SiReact size={16} className="text-blue-400" />;
      case 'ts':
        return <SiTypescript size={16} className="text-blue-600" />;
      case 'tsx':
        return <SiReact size={16} className="text-blue-500" />;
      case 'html':
        return <SiHtml5 size={16} className="text-orange-500" />;
      case 'css':
      case 'scss':
        return <SiCss3 size={16} className="text-blue-400" />;
      case 'md':
        return <SiMarkdown size={16} className="text-white" />;
      case 'py':
        return <SiPython size={16} className="text-blue-500" />;
      case 'java':
        return <SiJava size={16} className="text-red-500" />;
      default:
        return extension ? <VscFileCode size={16} /> : <VscFile size={16} />;
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
          className={`vscode-tab group flex items-center h-full px-3 border-t border-transparent transition-colors ${
            activeFile === file 
              ? 'bg-[#1E1E1E] text-white border-t-[#0078D4]' 
              : 'bg-[#2D2D2D] text-[#969696] hover:text-white'
          }`}
          onClick={() => onTabClick(file)}
        >
          <div className="flex items-center">
            <span className="mr-2">{getFileIcon(file)}</span>
            <span className="truncate max-w-[120px]">{getFileName(file)}</span>
          </div>
          <button
            className="ml-2 p-0.5 rounded hover:bg-[#383838] focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity"
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
