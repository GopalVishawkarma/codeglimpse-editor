
import React, { useState, useEffect, useCallback } from 'react';
import ActivityBar from '@/components/ActivityBar';
import Sidebar from '@/components/Sidebar';
import EditorTabs from '@/components/EditorTabs';
import MonacoEditor from '@/components/MonacoEditor';
import StatusBar from '@/components/StatusBar';
import WelcomeEditor from '@/components/WelcomeEditor';
import UserProfile from '@/components/Auth/UserProfile';
import { Button } from '@/components/ui/button';
import { Loader, FilePlus, FolderOpen, Save, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { openFile, openFolder, saveFile, readDirectory, readFile, isFileSystemAccessSupported } from '@/utils/fileSystem';

// Import sample files
import { demoFileContent } from '@/utils/sampleFiles';

const Index = () => {
  const [activeView, setActiveView] = useState('explorer');
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [resizing, setResizing] = useState(false);
  
  const [openFiles, setOpenFiles] = useState<string[]>([]);
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [fileHandles, setFileHandles] = useState<Record<string, any>>({});
  
  const [projectFolder, setProjectFolder] = useState<any>(null);
  const [projectFiles, setProjectFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const { user } = useAuth();

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

  // Handle open local file
  const handleOpenLocalFile = async () => {
    try {
      if (!isFileSystemAccessSupported()) {
        toast({
          title: "Not Supported",
          description: "Your browser doesn't support the File System Access API. Try using Chrome, Edge, or Opera.",
          variant: "destructive",
        });
        return;
      }

      const result = await openFile();
      if (result) {
        const { content, name, handle } = result;
        const filePath = `local/${name}`;
        
        setFileContents({
          ...fileContents,
          [filePath]: content,
        });
        
        setFileHandles({
          ...fileHandles,
          [filePath]: handle,
        });
        
        if (!openFiles.includes(filePath)) {
          setOpenFiles([...openFiles, filePath]);
        }
        
        setActiveFile(filePath);
        
        toast({
          title: "File Opened",
          description: `Successfully opened ${name}`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error Opening File",
        description: error.message || "Failed to open file",
        variant: "destructive",
      });
    }
  };

  // Handle open local folder
  const handleOpenLocalFolder = async () => {
    try {
      if (!isFileSystemAccessSupported()) {
        toast({
          title: "Not Supported",
          description: "Your browser doesn't support the File System Access API. Try using Chrome, Edge, or Opera.",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      
      const result = await openFolder();
      if (result) {
        const { directoryHandle } = result;
        setProjectFolder(directoryHandle);
        
        // Read all files from the directory
        const files = await readDirectory(directoryHandle);
        setProjectFiles(files);
        
        toast({
          title: "Folder Opened",
          description: `Successfully opened folder: ${directoryHandle.name}`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error Opening Folder",
        description: error.message || "Failed to open folder",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle open project file
  const handleOpenProjectFile = async (filePath: string, handle: any) => {
    try {
      setIsLoading(true);
      
      if (handle.kind === 'file') {
        const content = await readFile(handle);
        
        setFileContents({
          ...fileContents,
          [filePath]: content,
        });
        
        setFileHandles({
          ...fileHandles,
          [filePath]: handle,
        });
        
        if (!openFiles.includes(filePath)) {
          setOpenFiles([...openFiles, filePath]);
        }
        
        setActiveFile(filePath);
      }
    } catch (error: any) {
      toast({
        title: "Error Opening File",
        description: error.message || "Failed to open file",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle save file
  const handleSaveFile = async () => {
    if (!activeFile || !fileHandles[activeFile]) {
      toast({
        title: "Cannot Save",
        description: "No active file to save or file was not opened from local system",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const content = fileContents[activeFile];
      const fileHandle = fileHandles[activeFile];
      
      const success = await saveFile(fileHandle, content);
      
      if (success) {
        toast({
          title: "File Saved",
          description: `Successfully saved ${activeFile.split('/').pop()}`,
        });
      } else {
        throw new Error("Failed to save file");
      }
    } catch (error: any) {
      toast({
        title: "Error Saving File",
        description: error.message || "Failed to save file",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <div className="h-10 flex items-center justify-between border-b border-editor-lineHighlight bg-editor-background px-2">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleOpenLocalFile}
            title="Open File"
          >
            <FilePlus size={18} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleOpenLocalFolder}
            title="Open Folder"
          >
            <FolderOpen size={18} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSaveFile}
            title="Save File"
            disabled={!activeFile || !fileHandles[activeFile]}
          >
            <Save size={18} />
          </Button>
        </div>
        <UserProfile />
      </div>
      
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
            projectFiles={projectFiles}
            onOpenProjectFile={handleOpenProjectFile}
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
          
          <div className="flex-1 overflow-hidden relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <Loader className="animate-spin text-primary h-8 w-8" />
              </div>
            )}
            
            {activeFile ? (
              <MonacoEditor
                language={activeFile.split('.').pop() || ''}
                value={fileContents[activeFile] || ''}
                onChange={(value) => handleFileChange(value, activeFile)}
              />
            ) : (
              <WelcomeEditor onOpenSampleFile={handleOpenSampleFile} onOpenLocalFile={handleOpenLocalFile} onOpenLocalFolder={handleOpenLocalFolder} />
            )}
          </div>
        </div>
      </div>
      
      <StatusBar activeFile={activeFile} />
    </div>
  );
};

export default Index;
