import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { TraductorApp } from './TraductorApp'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <TraductorApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
