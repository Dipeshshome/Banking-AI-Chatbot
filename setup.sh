#!/bin/bash

echo "🏦 Setting up Banking AI Chatbot..."

# Create project directory
mkdir banking-ai-chatbot
cd banking-ai-chatbot

# Initialize npm project
npm init -y

# Install dependencies
echo "📦 Installing dependencies..."
npm install react react-dom react-scripts lucide-react
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind CSS
echo "🎨 Setting up Tailwind CSS..."
npx tailwindcss init -p

# Create folder structure
echo "📁 Creating folder structure..."
mkdir -p src/components src/hooks src/utils src/styles public

# Update package.json scripts
cat > package.json << 'EOF'
{
  "name": "banking-ai-chatbot",
  "version": "1.0.0",
  "description": "Advanced AI Banking Assistant Demo",
  "main": "src/index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "keywords": ["banking", "ai", "chatbot", "react", "demo"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "lucide-react": "^0.263.1",
    "web-vitals": "^2.1.4"
  },
  "devDependencies": {
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.24",
    "autoprefixer": "^10.4.14"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
EOF

# Create Tailwind config
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bank-blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
EOF

# Create public/index.html
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Advanced AI Banking Assistant Demo" />
    <title>SecureBank AI Assistant</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
EOF

# Create src/index.css
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

@keyframes typing {
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
}

.typing-indicator {
  animation: typing 1.4s infinite;
}

.typing-indicator:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator:nth-child(3) {
  animation-delay: 0.4s;
}
EOF

# Create src/index.js
cat > src/index.js << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

# Create src/App.js
cat > src/App.js << 'EOF'
import React from 'react';
import BankingChatbot from './components/BankingChatbot';
import './App.css';

function App() {
  return (
    <div className="App">
      <BankingChatbot />
    </div>
  );
}

export default App;
EOF

# Create src/App.css
cat > src/App.css << 'EOF'
.App {
  height: 100vh;
  overflow: hidden;
}

.chat-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.message-animation {
  animation: slideInUp 0.3s ease-out;
}

@keyframes slideInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
EOF

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
EOF

echo "✅ Project structure created!"
echo "📝 Copy the BankingChatbot.js component code into src/components/BankingChatbot.js"
echo "🚀 Run 'npm start' to launch the application!"
echo ""
echo "Next steps:"
echo "1. Copy the BankingChatbot component code from the artifact above"
echo "2. Paste it into src/components/BankingChatbot.js"
echo "3. Run: npm start"
echo "4. Open http://localhost:3000 in your browser"