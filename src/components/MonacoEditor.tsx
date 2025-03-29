
import React, { useRef, useEffect } from 'react';
import Editor, { Monaco, OnMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

interface MonacoEditorProps {
  language: string;
  value: string;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({
  language,
  value,
  onChange,
  readOnly = false,
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Configure editor settings
    editor.updateOptions({
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineHeight: 22,
      fontFamily: "'Fira Code', 'Menlo', 'Monaco', 'Courier New', monospace",
      tabSize: 2,
      wordWrap: 'on',
      readOnly,
      automaticLayout: true,
      lineNumbers: 'on',
      roundedSelection: true,
      selectOnLineNumbers: true,
      cursorBlinking: 'smooth',
    });

    // Add custom theme
    monaco.editor.defineTheme('vscode-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#2c313a',
        'editor.selectionBackground': '#264f78',
        'editor.selectionHighlightBackground': '#1b4171',
        'editorCursor.foreground': '#d4d4d4',
        'editorWhitespace.foreground': '#3b3b3b',
        'editorIndentGuide.background': '#404040',
      }
    });

    monaco.editor.setTheme('vscode-dark');
  };

  const getLanguageFromExtension = (filename: string): string => {
    const ext = filename.toLowerCase();
    switch (ext) {
      case 'js':
        return 'javascript';
      case 'jsx':
        return 'javascript';
      case 'ts':
        return 'typescript';
      case 'tsx':
        return 'typescript';
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      case 'py':
        return 'python';
      case 'java':
        return 'java';
      case 'c':
        return 'c';
      case 'cpp':
        return 'cpp';
      case 'go':
        return 'go';
      case 'rs':
        return 'rust';
      case 'php':
        return 'php';
      case 'rb':
        return 'ruby';
      case 'sh':
        return 'shell';
      case 'sql':
        return 'sql';
      case 'yaml':
      case 'yml':
        return 'yaml';
      default:
        return 'plaintext';
    }
  };

  return (
    <div className="w-full h-full">
      <Editor
        defaultLanguage="javascript"
        language={getLanguageFromExtension(language)}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        theme="vscode-dark"
        options={{
          automaticLayout: true,
          minimap: { enabled: true },
          fontSize: 14,
          fontFamily: "'Fira Code', 'Menlo', 'Monaco', 'Courier New', monospace",
          wordWrap: 'on',
          lineNumbers: 'on',
          folding: true,
          foldingStrategy: 'auto',
          formatOnPaste: true,
          formatOnType: true,
          cursorBlinking: 'smooth',
          smoothScrolling: true,
          readOnly,
        }}
        className="monaco-editor"
      />
    </div>
  );
};

export default MonacoEditor;
