/* eslint-env browser */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import GlobalStyle from './components/GlobalStyle/index.jsx'
import './index.css'
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-toastify/dist/ReactToastify.css'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <GlobalStyle>
          <App />
        </GlobalStyle>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
