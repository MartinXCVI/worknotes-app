import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// App import
import App from './App.js'
// CSS import
import './css/styles.css'
// React router imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Redux imports
import { store } from './app/store.js'
import { Provider } from 'react-redux'

// Disable react dev tools import
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if(process.env.NODE_ENV === 'production') disableReactDevTools()


createRoot(document.getElementById('root') as HTMLElement).render(
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
