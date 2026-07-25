import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

import { AuthProvider } from './context/AuthContext.jsx'
import { CarProvider } from './context/CarContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <CarProvider>
            <App />
          </CarProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
