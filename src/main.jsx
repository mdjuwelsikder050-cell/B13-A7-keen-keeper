import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import { DataProvider } from './data'
import './index.css'
createRoot(document.getElementById('root')).render(
  <BrowserRouter><DataProvider><App /><Toaster position="top-right" /></DataProvider></BrowserRouter>
)
