import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Detail from './detail.jsx'

function Router(){
  const isDetail = location.pathname.endsWith('/article')
  return isDetail ? <Detail /> : <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
