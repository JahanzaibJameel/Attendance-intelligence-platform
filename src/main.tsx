import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Import design tokens (must be first)
import './styles/design-tokens.css'
import './styles/dark-mode.css'
import './styles/index.css'

// Initialize theme before rendering
const initializeTheme = () => {
  const html = document.documentElement;
  
  // Add theme-loaded class for transitions
  html.classList.add('theme-loaded');
  
  // Set initial theme based on localStorage or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    html.classList.add(savedTheme === 'dark' ? 'dark' : 'light');
  } else if (systemPrefersDark) {
    html.classList.add('dark');
  } else {
    html.classList.add('light');
  }
}

// Initialize theme before app renders
initializeTheme()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
