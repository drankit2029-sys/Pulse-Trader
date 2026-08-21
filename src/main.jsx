import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import {WatchlistAndPortfolioProvider} from "./ContextProvider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WatchlistAndPortfolioProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </WatchlistAndPortfolioProvider>
  </StrictMode>,
)
