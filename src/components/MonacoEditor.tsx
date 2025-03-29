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
      fontFamily: "'Fira Code', 'JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', monospace",
      tabSize: 2,
      wordWrap: 'on',
      readOnly,
      automaticLayout: true,
      lineNumbers: 'on',
      roundedSelection: true,
      selectOnLineNumbers: true,
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
      smoothScrolling: true,
      bracketPairColorization: {
        enabled: true,
      }
    });

    // Add custom theme that closely resembles VS Code dark theme
    monaco.editor.defineTheme('vscode-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'class', foreground: '4EC9B0' },
        { token: 'function', foreground: 'DCDCAA' },
        { token: 'variable', foreground: '9CDCFE' },
        { token: 'variable.predefined', foreground: '4FC1FF' },
        { token: 'parameter', foreground: '9CDCFE' },
        { token: 'operator', foreground: 'D4D4D4' },
        { token: 'delimiter', foreground: 'D4D4D4' },
        { token: 'delimiter.bracket', foreground: 'D4D4D4' },
        { token: 'tag', foreground: '569CD6' },
        { token: 'attribute.name', foreground: '9CDCFE' },
        { token: 'attribute.value', foreground: 'CE9178' },
      ],
      colors: {
        'editor.background': '#1E1E1E',
        'editor.foreground': '#D4D4D4',
        'editorCursor.foreground': '#AEAFAD',
        'editor.lineHighlightBackground': '#2C313A',
        'editorLineNumber.foreground': '#858585',
        'editor.selectionBackground': '#264F78',
        'editor.selectionHighlightBackground': '#ADD6FF26',
        'editorSuggestWidget.background': '#252526',
        'editorSuggestWidget.border': '#454545',
        'editorSuggestWidget.foreground': '#D4D4D4',
        'editorSuggestWidget.highlightForeground': '#0097FB',
        'editorSuggestWidget.selectedBackground': '#04395E',
        'editorHoverWidget.background': '#252526',
        'editorHoverWidget.border': '#454545',
        'editorIndentGuide.background': '#404040',
        'editorIndentGuide.activeBackground': '#707070',
      }
    });

    monaco.editor.setTheme('vscode-dark');
  };

  const getLanguageFromExtension = (filename: string): string => {
    if (!filename) return 'plaintext';
    
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    
    const languageMap: Record<string, string> = {
      // Web development
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'less': 'less',
      'json': 'json',
      'jsonc': 'jsonc',
      'md': 'markdown',
      'xml': 'xml',
      'svg': 'xml',
      
      // Backend languages
      'py': 'python',
      'java': 'java',
      'c': 'c',
      'cpp': 'cpp',
      'cs': 'csharp',
      'go': 'go',
      'rs': 'rust',
      'php': 'php',
      'rb': 'ruby',
      'pl': 'perl',
      'swift': 'swift',
      'kt': 'kotlin',
      
      // Shell and config
      'sh': 'shell',
      'bash': 'shell',
      'zsh': 'shell',
      'ps1': 'powershell',
      'bat': 'bat',
      'cmd': 'bat',
      'sql': 'sql',
      'yaml': 'yaml',
      'yml': 'yaml',
      'toml': 'ini',
      'ini': 'ini',
      'conf': 'ini',
      'env': 'ini',
      
      // Other
      'graphql': 'graphql',
      'gql': 'graphql',
      'tex': 'latex',
      'dockerfile': 'dockerfile',
      'gitignore': 'ignore',
      'gitattributes': 'ignore',
      'editorconfig': 'ini'
    };
    
    return languageMap[extension] || 'plaintext';
  };

  // Dynamic language detection based on file path and content
  const detectLanguage = (filePath: string, content: string): string => {
    // Try to detect from extension first
    const extensionLanguage = getLanguageFromExtension(filePath);
    if (extensionLanguage !== 'plaintext') {
      return extensionLanguage;
    }
    
    // If no extension or unknown extension, try to detect from content
    if (content.startsWith('<!DOCTYPE html>') || /<html|<body|<head/.test(content)) {
      return 'html';
    }
    
    if (/import .* from|export const|function \w+\s*\(|class \w+ (extends|implements)/.test(content)) {
      // Contains JS/TS syntax
      return /interface |type \w+ =|<\w+>\s*/.test(content) ? 'typescript' : 'javascript';
    }
    
    if (/^import|^from|def \w+\s*\(|class \w+:/.test(content)) {
      return 'python';
    }
    
    return 'plaintext';
  };

  const editorLanguage = detectLanguage(language, value);

  return (
    <div className="w-full h-full">
      <Editor
        defaultLanguage="javascript"
        language={editorLanguage}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        theme="vscode-dark"
        options={{
          automaticLayout: true,
          minimap: { enabled: true },
          fontSize: 14,
          fontFamily: "'Fira Code', 'JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', monospace",
          fontLigatures: true,
          wordWrap: 'on',
          lineNumbers: 'on',
          folding: true,
          foldingStrategy: 'auto',
          formatOnPaste: true,
          formatOnType: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
          bracketPairColorization: { enabled: true },
          guides: { bracketPairs: 'active' },
          readOnly,
        }}
        className="monaco-editor"
      />
    </div>
  );
};

export default MonacoEditor;
