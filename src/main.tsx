// @ts-ignore
import './index.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './login.js'
import Square from './square.jsx'

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/square" element={<Square />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>,
  )
}
