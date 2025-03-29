
import React from 'react';
import { X } from 'lucide-react';

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
  const getFileName = (path: string) => {
    const parts = path.split('/');
    return parts[parts.length - 1];
  };

  if (openFiles.length === 0) {
    return null;
  }

  return (
    <div className="flex bg-tab-inactiveBackground overflow-x-auto">
      {openFiles.map((file) => {
        const isActive = file === activeFile;
        return (
          <div
            key={file}
            className={`flex items-center px-3 py-1 border-r border-tab-border cursor-pointer group ${
              isActive ? 'bg-tab-activeBackground text-tab-activeForeground' : 'bg-tab-inactiveBackground text-tab-inactiveForeground'
            }`}
            onClick={() => onTabClick(file)}
          >
            <span className="truncate max-w-[150px]">{getFileName(file)}</span>
            <button
              className="ml-2 opacity-0 group-hover:opacity-100 hover:bg-editor-background rounded p-0.5"
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(file);
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default EditorTabs;
