import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor,store } from "./lib/store.js";
import { Provider } from 'react-redux';
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <ToastContainer position='top-left' />

    <Provider store={store} >
    <PersistGate loading={null} persistor={persistor}>

    <App />

    </PersistGate>


  </Provider>
   


  </StrictMode>,
)
