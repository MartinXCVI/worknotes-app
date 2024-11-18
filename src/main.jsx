import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// App import
import App from './App.jsx'
// CSS import
import './css/styles.css'
// React router imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Redux imports
import { store } from './app/store.js'
import { Provider } from 'react-redux'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
