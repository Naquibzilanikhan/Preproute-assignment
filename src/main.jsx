import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { TestCreationProvider } from './context/TestCreationContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TestCreationProvider>
          <App />
        </TestCreationProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
