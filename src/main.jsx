/* eslint-env browser */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import GlobalStyle from './components/GlobalStyle/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <GlobalStyle>
        <App />
      </GlobalStyle>
    </React.StrictMode>
  </BrowserRouter>
)
