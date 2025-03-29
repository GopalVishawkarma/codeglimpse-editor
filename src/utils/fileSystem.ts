
// Type definitions for the File System Access API
interface FileSystemHandlePermissionDescriptor {
  mode?: 'read' | 'readwrite';
}

interface FileSystemHandle {
  kind: 'file' | 'directory';
  name: string;
  getPermission(descriptor?: FileSystemHandlePermissionDescriptor): Promise<PermissionState>;
  requestPermission(descriptor?: FileSystemHandlePermissionDescriptor): Promise<PermissionState>;
}

interface FileSystemFileHandle extends FileSystemHandle {
  kind: 'file';
  getFile(): Promise<File>;
  createWritable(): Promise<FileSystemWritableFileStream>;
}

interface FileSystemDirectoryHandle extends FileSystemHandle {
  kind: 'directory';
  entries(): AsyncIterable<[string, FileSystemHandle]>;
  getDirectoryHandle(name: string, options?: { create?: boolean }): Promise<FileSystemDirectoryHandle>;
  getFileHandle(name: string, options?: { create?: boolean }): Promise<FileSystemFileHandle>;
  removeEntry(name: string, options?: { recursive?: boolean }): Promise<void>;
}

interface FileSystemWritableFileStream extends WritableStream {
  write(data: any): Promise<void>;
  seek(position: number): Promise<void>;
  truncate(size: number): Promise<void>;
}

// Declare the window.showOpenFilePicker function
declare global {
  interface Window {
    showOpenFilePicker: (options?: {
      multiple?: boolean;
      excludeAcceptAllOption?: boolean;
      types?: Array<{
        description?: string;
        accept: Record<string, string[]>;
      }>;
    }) => Promise<FileSystemFileHandle[]>;
    
    showDirectoryPicker: (options?: {
      id?: string;
      startIn?: FileSystemHandle | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos';
      mode?: 'read' | 'readwrite';
    }) => Promise<FileSystemDirectoryHandle>;
  }
}

// Check if browser supports File System Access API
export const isFileSystemAccessSupported = () => {
  return 'showOpenFilePicker' in window && 'showDirectoryPicker' in window;
};

// Open a file from the file system
export const openFile = async (): Promise<{ content: string; name: string; handle: FileSystemFileHandle } | null> => {
  if (!isFileSystemAccessSupported()) {
    throw new Error('File System Access API is not supported in this browser.');
  }

  try {
    const handles = await window.showOpenFilePicker({
      multiple: false,
      types: [
        {
          description: 'Text Files',
          accept: {
            'text/*': ['.txt', '.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.json', '.md'],
          },
        },
      ],
    });

    const fileHandle = handles[0];
    const file = await fileHandle.getFile();
    const content = await file.text();

    return {
      content,
      name: file.name,
      handle: fileHandle,
    };
  } catch (error) {
    console.error('Error opening file:', error);
    return null;
  }
};

// Save content to a file
export const saveFile = async (fileHandle: FileSystemFileHandle, content: string): Promise<boolean> => {
  if (!isFileSystemAccessSupported()) {
    throw new Error('File System Access API is not supported in this browser.');
  }

  try {
    // Request write permission
    const permission = await fileHandle.requestPermission({ mode: 'readwrite' });
    if (permission !== 'granted') {
      throw new Error('Write permission not granted');
    }

    // Get a writable stream
    const writable = await fileHandle.createWritable();
    
    // Write content to the file
    await writable.write(content);
    
    // Close the stream
    await writable.close();
    
    return true;
  } catch (error) {
    console.error('Error saving file:', error);
    return false;
  }
};

// Function to open a folder
export const openFolder = async (): Promise<{ directoryHandle: FileSystemDirectoryHandle } | null> => {
  if (!isFileSystemAccessSupported()) {
    throw new Error('File System Access API is not supported in this browser.');
  }

  try {
    const directoryHandle = await window.showDirectoryPicker();
    return { directoryHandle };
  } catch (error) {
    console.error('Error opening folder:', error);
    return null;
  }
};

// Read files from a directory recursively
export const readDirectory = async (
  directoryHandle: FileSystemDirectoryHandle,
  path: string = ''
): Promise<{ path: string; type: 'file' | 'folder'; handle: FileSystemHandle }[]> => {
  const entries: { path: string; type: 'file' | 'folder'; handle: FileSystemHandle }[] = [];
  
  for await (const [name, handle] of directoryHandle.entries()) {
    const entryPath = path ? `${path}/${name}` : name;
    
    if (handle.kind === 'file') {
      entries.push({ path: entryPath, type: 'file', handle });
    } else if (handle.kind === 'directory') {
      entries.push({ path: entryPath, type: 'folder', handle });
      const subEntries = await readDirectory(handle as FileSystemDirectoryHandle, entryPath);
      entries.push(...subEntries);
    }
  }
  
  return entries;
};

// Read file content
export const readFile = async (fileHandle: FileSystemFileHandle): Promise<string> => {
  const file = await fileHandle.getFile();
  return await file.text();
};

export const createNewFile = async (directoryHandle: FileSystemDirectoryHandle, fileName: string, content: string = ''): Promise<FileSystemFileHandle> => {
  try {
    const fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
    return fileHandle;
  } catch (error) {
    console.error('Error creating file:', error);
    throw error;
  }
};
