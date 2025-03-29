
import React from 'react';
import {
  File,
  FileCode,
  FileText,
  FileJson,
  FileImage,
  FileArchive,
  FileSpreadsheet,
  FileBadge2,
  Package,
  Settings,
  Folder,
  FolderOpen,
  FileX,
  FolderCog,
  FileCheck,
} from 'lucide-react';

interface FileIconProps {
  fileName: string;
  isFolder?: boolean;
  isOpen?: boolean;
}

const FileIcon: React.FC<FileIconProps> = ({ fileName, isFolder = false, isOpen = false }) => {
  if (isFolder) {
    // Special folder cases
    if (fileName === 'node_modules') {
      return <FolderCog size={18} className="text-gray-400" />;
    }
    if (fileName === '.git') {
      return <FolderCog size={18} className="text-gray-400" />;
    }
    
    return isOpen ? 
      <FolderOpen size={18} className="text-yellow-400" /> : 
      <Folder size={18} className="text-yellow-400" />;
  }

  // Get file extension
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  // Special file names (configuration files)
  if (fileName === 'package.json' || fileName === 'package-lock.json' || fileName === 'yarn.lock') {
    return <Package size={18} className="text-orange-400" />;
  }
  
  if (fileName === '.gitignore' || fileName === '.npmignore') {
    return <FileX size={18} className="text-gray-400" />;
  }
  
  if (fileName.includes('tsconfig') || fileName.includes('eslint')) {
    return <Settings size={18} className="text-gray-400" />;
  }
  
  // Check file extension
  switch (extension) {
    // Code files
    case 'js':
      return <FileCode size={18} className="text-yellow-400" />;
    case 'jsx':
      return <FileCode size={18} className="text-yellow-500" />;
    case 'ts':
      return <FileCode size={18} className="text-blue-400" />;
    case 'tsx':
      return <FileCode size={18} className="text-blue-500" />;
    case 'html':
      return <FileCode size={18} className="text-orange-500" />;
    case 'css':
      return <FileCode size={18} className="text-blue-600" />;
    case 'scss':
    case 'sass':
      return <FileCode size={18} className="text-pink-500" />;
    case 'json':
      return <FileJson size={18} className="text-yellow-300" />;
      
    // Document files
    case 'md':
      return <FileText size={18} className="text-blue-300" />;
    case 'txt':
      return <FileText size={18} className="text-gray-300" />;
    case 'pdf':
      return <FileText size={18} className="text-red-500" />;
      
    // Image files
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'svg':
    case 'webp':
      return <FileImage size={18} className="text-purple-400" />;
      
    // Archive files
    case 'zip':
    case 'rar':
    case 'tar':
    case 'gz':
      return <FileArchive size={18} className="text-gray-400" />;
      
    // Data files
    case 'csv':
    case 'xls':
    case 'xlsx':
      return <FileSpreadsheet size={18} className="text-green-500" />;
      
    // Config files
    case 'yml':
    case 'yaml':
    case 'toml':
    case 'ini':
    case 'env':
      return <FileCheck size={18} className="text-teal-400" />;
      
    // Executable files
    case 'exe':
    case 'sh':
    case 'bat':
      return <FileBadge2 size={18} className="text-green-400" />;
      
    default:
      return <File size={18} className="text-gray-400" />;
  }
};

export default FileIcon;
