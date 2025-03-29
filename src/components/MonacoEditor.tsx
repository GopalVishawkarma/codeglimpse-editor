
import React, { useRef, useEffect } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
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

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;
    
    // Configure editor settings
    editor.updateOptions({
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineHeight: 22,
      fontFamily: "'Menlo', 'Monaco', 'Courier New', monospace",
      tabSize: 2,
      wordWrap: 'on',
      readOnly,
    });
  };

  const getLanguageFromFileName = (filename: string) => {
    if (language) {
      return language;
    }
    const ext = filename.split('.').pop()?.toLowerCase();
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
      default:
        return 'plaintext';
    }
  };

  return (
    <div className="w-full h-full">
      <Editor
        defaultLanguage={getLanguageFromFileName(language)}
        language={getLanguageFromFileName(language)}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          automaticLayout: true,
          scrollBeyondLastLine: false,
          minimap: { enabled: true },
          fontFamily: "'Menlo', 'Monaco', 'Courier New', monospace",
          fontSize: 14,
          lineNumbers: 'on',
          folding: true,
          readOnly,
          wordWrap: 'on',
        }}
        className="monaco-editor"
      />
    </div>
  );
};

export default MonacoEditor;
