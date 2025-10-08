import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './lib/i18n/i18n' // Import i18next configuration

createRoot(document.getElementById("root")!).render(<App />);
