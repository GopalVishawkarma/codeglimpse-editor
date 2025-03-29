
import React from 'react';
import { FolderOpen, FileText, Github, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isFileSystemAccessSupported } from '@/utils/fileSystem';

interface WelcomePageProps {
  onOpenSampleFile: () => void;
  onOpenLocalFile: () => void;
  onOpenLocalFolder: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ 
  onOpenSampleFile, 
  onOpenLocalFile, 
  onOpenLocalFolder 
}) => {
  const isFileSystemSupported = isFileSystemAccessSupported();
  
  return (
    <div className="flex flex-col items-center justify-center h-full text-editor-foreground">
      <div className="max-w-md w-full p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">CodeGlimpse Editor</h1>
        
        <div className="space-y-4 mb-8">
          <Button 
            variant="outline" 
            className="w-full justify-start px-4 py-6 bg-editor-background border-editor-lineHighlight hover:bg-editor-lineHighlight"
            onClick={onOpenSampleFile}
          >
            <FileText className="mr-4" size={24} />
            <div className="text-left">
              <div className="font-medium">Open Sample File</div>
              <div className="text-sm opacity-70">Explore editor features with our sample code</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start px-4 py-6 bg-editor-background border-editor-lineHighlight hover:bg-editor-lineHighlight"
            onClick={onOpenLocalFile}
            disabled={!isFileSystemSupported}
          >
            <Upload className="mr-4" size={24} />
            <div className="text-left">
              <div className="font-medium">Open File</div>
              <div className="text-sm opacity-70">
                {isFileSystemSupported 
                  ? 'Open a file from your device to edit' 
                  : 'Your browser does not support File System Access API'}
              </div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start px-4 py-6 bg-editor-background border-editor-lineHighlight hover:bg-editor-lineHighlight"
            onClick={onOpenLocalFolder}
            disabled={!isFileSystemSupported}
          >
            <FolderOpen className="mr-4" size={24} />
            <div className="text-left">
              <div className="font-medium">Open Folder</div>
              <div className="text-sm opacity-70">
                {isFileSystemSupported 
                  ? 'Open a project folder to start editing' 
                  : 'Your browser does not support File System Access API'}
              </div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start px-4 py-6 bg-editor-background border-editor-lineHighlight hover:bg-editor-lineHighlight"
            onClick={() => window.open("https://github.com", "_blank")}
          >
            <Github className="mr-4" size={24} />
            <div className="text-left">
              <div className="font-medium">Clone Git Repository</div>
              <div className="text-sm opacity-70">Clone a repository to get started</div>
            </div>
          </Button>
        </div>
        
        <div className="text-center text-sm opacity-70">
          <p>CodeGlimpse Editor - A VS Code-inspired web editor</p>
          <p className="mt-1">Sign in to save your projects and settings</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
