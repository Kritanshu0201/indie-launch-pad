
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ProjectProvider } from './contexts/ProjectContext.tsx'

createRoot(document.getElementById("root")!).render(
  <ProjectProvider>
    <App />
  </ProjectProvider>
);
