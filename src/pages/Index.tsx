
import React, { useState, useEffect, useCallback } from 'react';
import ActivityBar from '@/components/ActivityBar';
import Sidebar from '@/components/Sidebar';
import EditorTabs from '@/components/EditorTabs';
import MonacoEditor from '@/components/MonacoEditor';
import StatusBar from '@/components/StatusBar';
import WelcomePage from '@/components/WelcomeEditor';

// Import sample files
import { demoFileContent } from '@/utils/sampleFiles';

const Index = () => {
  const [activeView, setActiveView] = useState('explorer');
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [resizing, setResizing] = useState(false);
  
  const [openFiles, setOpenFiles] = useState<string[]>([]);
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [fileContents, setFileContents] = useState<Record<string, string>>({});

  // Load sample file content
  useEffect(() => {
    setFileContents(demoFileContent);
  }, []);

  const handleActivityBarClick = (view: string) => {
    setActiveView(view);
  };

  const handleFileSelect = (filePath: string) => {
    // Check if it's a file path (not a folder)
    if (filePath.includes('.')) {
      if (!openFiles.includes(filePath)) {
        setOpenFiles([...openFiles, filePath]);
      }
      setActiveFile(filePath);
    }
  };

  const handleTabClick = (filePath: string) => {
    setActiveFile(filePath);
  };

  const handleTabClose = (filePath: string) => {
    const newOpenFiles = openFiles.filter((file) => file !== filePath);
    setOpenFiles(newOpenFiles);
    
    if (activeFile === filePath) {
      // Set the next available file as active, or null if none left
      setActiveFile(newOpenFiles.length > 0 ? newOpenFiles[0] : null);
    }
  };

  const handleOpenSampleFile = () => {
    const sampleFile = 'project/src/App.tsx';
    setOpenFiles([sampleFile]);
    setActiveFile(sampleFile);
  };

  const handleFileChange = (value: string | undefined, filePath: string) => {
    if (value !== undefined) {
      setFileContents({
        ...fileContents,
        [filePath]: value,
      });
    }
  };

  const startResize = useCallback((e: React.MouseEvent) => {
    setResizing(true);
    
    const onMouseMove = (e: MouseEvent) => {
      // Set min width to 180px and max to 50% of window width
      const newWidth = Math.max(180, Math.min(window.innerWidth * 0.5, e.clientX));
      setSidebarWidth(newWidth);
    };
    
    const onMouseUp = () => {
      setResizing(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        <ActivityBar activeView={activeView} setActiveView={handleActivityBarClick} />
        
        <div 
          className="h-full overflow-hidden"
          style={{ width: `${sidebarWidth}px`, display: 'flex', flexDirection: 'column' }}
        >
          <Sidebar
            activeView={activeView}
            selectedFile={activeFile}
            onFileSelect={handleFileSelect}
          />
        </div>
        
        <div 
          className="w-1 h-full bg-editor-background cursor-col-resize hover:bg-primary" 
          onMouseDown={startResize}
        />
        
        <div className="flex-1 flex flex-col h-full">
          <EditorTabs
            openFiles={openFiles}
            activeFile={activeFile}
            onTabClick={handleTabClick}
            onTabClose={handleTabClose}
          />
          
          <div className="flex-1 overflow-hidden">
            {activeFile ? (
              <MonacoEditor
                language={activeFile.split('.').pop() || ''}
                value={fileContents[activeFile] || ''}
                onChange={(value) => handleFileChange(value, activeFile)}
              />
            ) : (
              <WelcomePage onOpenSampleFile={handleOpenSampleFile} />
            )}
          </div>
        </div>
      </div>
      
      <StatusBar activeFile={activeFile} />
    </div>
  );
};

export default Index;
