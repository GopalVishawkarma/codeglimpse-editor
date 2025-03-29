
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';

interface FileExplorerProps {
  selectedFile: string | null;
  onFileSelect: (filePath: string) => void;
  projectFiles?: any[];
  onOpenProjectFile?: (filePath: string, handle: any) => void;
}

// Demo files and folders structure
const demoFileSystem = {
  'project': {
    type: 'folder',
    children: {
      'src': {
        type: 'folder',
        children: {
          'components': {
            type: 'folder',
            children: {
              'Button.tsx': { type: 'file', content: 'import React from "react";\n\nconst Button = ({ children }) => {\n  return <button className="px-4 py-2 bg-blue-500 text-white rounded">{children}</button>;\n};\n\nexport default Button;' },
              'Card.tsx': { type: 'file', content: 'import React from "react";\n\nconst Card = ({ title, children }) => {\n  return (\n    <div className="border rounded-lg p-4 shadow-sm">\n      {title && <h3 className="text-lg font-bold mb-2">{title}</h3>}\n      {children}\n    </div>\n  );\n};\n\nexport default Card;' },
            }
          },
          'App.tsx': { type: 'file', content: 'import React from "react";\nimport Button from "./components/Button";\nimport Card from "./components/Card";\n\nfunction App() {\n  return (\n    <div className="p-4">\n      <Card title="Welcome">\n        <p className="mb-4">This is a sample React application.</p>\n        <Button>Click me</Button>\n      </Card>\n    </div>\n  );\n}\n\nexport default App;' },
          'index.tsx': { type: 'file', content: 'import React from "react";\nimport ReactDOM from "react-dom";\nimport App from "./App";\n\nReactDOM.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n  document.getElementById("root")\n);' },
        }
      },
      'package.json': { type: 'file', content: '{\n  "name": "sample-project",\n  "version": "1.0.0",\n  "private": true,\n  "dependencies": {\n    "react": "^17.0.2",\n    "react-dom": "^17.0.2"\n  }\n}' },
      'README.md': { type: 'file', content: '# Sample Project\n\nThis is a sample React project for demonstration purposes.\n\n## Getting Started\n\nRun `npm install` followed by `npm start` to launch the development server.' },
    }
  }
};

const FileExplorer: React.FC<FileExplorerProps> = ({ 
  selectedFile, 
  onFileSelect,
  projectFiles = [],
  onOpenProjectFile = () => {}
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'project': true,
    'project/src': true,
  });
  
  const [fileTree, setFileTree] = useState<any>({});
  const [hasLocalFiles, setHasLocalFiles] = useState(false);

  // Process project files into a tree structure
  useEffect(() => {
    if (projectFiles.length > 0) {
      const tree: any = { local: { type: 'folder', children: {} } };
      
      projectFiles.forEach(file => {
        const parts = file.path.split('/');
        let current = tree.local.children;
        
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          
          if (i === parts.length - 1 && file.type === 'file') {
            // This is a file
            current[part] = { type: 'file', handle: file.handle };
          } else {
            // This is a directory
            if (!current[part]) {
              current[part] = { type: 'folder', children: {} };
            }
            current = current[part].children;
          }
        }
      });
      
      setFileTree(tree);
      setHasLocalFiles(true);
      
      // Auto-expand the root folder
      setExpandedFolders(prev => ({ ...prev, 'local': true }));
    } else {
      setFileTree(demoFileSystem);
      setHasLocalFiles(false);
    }
  }, [projectFiles]);

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const handleFileClick = (path: string, item: any) => {
    if (item.type === 'file') {
      if (hasLocalFiles && item.handle) {
        onOpenProjectFile(path, item.handle);
      } else {
        onFileSelect(path);
      }
    }
  };

  const renderFileSystemItem = (
    name: string,
    item: any,
    path: string,
    depth: number = 0
  ) => {
    const isFolder = item.type === 'folder';
    const isExpanded = expandedFolders[path] || false;
    const isSelected = path === selectedFile;

    return (
      <div key={path}>
        <div
          className={`flex items-center py-1 px-2 rounded cursor-pointer text-sm ${
            isSelected
              ? 'bg-editor-selection text-editor-foreground'
              : 'hover:bg-sidebar-hoverBackground'
          }`}
          style={{ paddingLeft: `${depth * 12 + 4}px` }}
          onClick={() => {
            if (isFolder) {
              toggleFolder(path);
            } else {
              handleFileClick(path, item);
            }
          }}
        >
          {isFolder ? (
            <>
              <span className="mr-1">
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </span>
              <Folder size={16} className="mr-1 text-yellow-500" />
              <span>{name}</span>
            </>
          ) : (
            <>
              <span className="w-4 mr-1"></span>
              <File size={16} className="mr-1 text-blue-400" />
              <span>{name}</span>
            </>
          )}
        </div>
        
        {isFolder && isExpanded && (
          <div>
            {Object.entries(item.children).map(([childName, child]) => 
              renderFileSystemItem(childName, child, `${path}/${childName}`, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-1">
      {Object.entries(fileTree).map(([name, item]) => 
        renderFileSystemItem(name, item, name)
      )}
    </div>
  );
};

export default FileExplorer;
