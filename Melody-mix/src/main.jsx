import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import Context from './Context/Context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Context>
      <App />
    </Context>
  </BrowserRouter>
)
