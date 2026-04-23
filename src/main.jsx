import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap styles loaded first so our custom CSS can override
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

// Mount the app into the #root div in index.html, wrapped in routing support
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
