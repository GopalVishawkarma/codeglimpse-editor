
export const demoFileContent: Record<string, string> = {
  'project/src/components/Button.tsx': `import React from "react";

const Button = ({ children }) => {
  return <button className="px-4 py-2 bg-blue-500 text-white rounded">{children}</button>;
};

export default Button;`,
  'project/src/components/Card.tsx': `import React from "react";

const Card = ({ title, children }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      {title && <h3 className="text-lg font-bold mb-2">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;`,
  'project/src/App.tsx': `import React from "react";
import Button from "./components/Button";
import Card from "./components/Card";

function App() {
  return (
    <div className="p-4">
      <Card title="Welcome">
        <p className="mb-4">This is a sample React application.</p>
        <Button>Click me</Button>
      </Card>
    </div>
  );
}

export default App;`,
  'project/src/index.tsx': `import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);`,
  'project/package.json': `{
  "name": "sample-project",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  }
}`,
  'project/README.md': `# Sample Project

This is a sample React project for demonstration purposes.

## Getting Started

Run \`npm install\` followed by \`npm start\` to launch the development server.
`,
};
