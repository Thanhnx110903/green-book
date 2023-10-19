/* eslint-env browser */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import GlobalStyle from './components/GlobalStyle/index.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <GlobalStyle>
        <App />
      </GlobalStyle>
    </React.StrictMode>
  </BrowserRouter>
)
