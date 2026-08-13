import { Link, NavLink } from 'react-router-dom'
import './App.css'
import { Routes, Route} from "react-router-dom"
import Home from "./Home.jsx"
import Portfolio from "./Portfolio.jsx"
import Profile from "./Profile.jsx"
import Watchlist from "./Watchlist.jsx"
import Login from "./Login.jsx"
import Navbar from "./Navbar.jsx"
import StockDetail from "./StockDetail.jsx"
import {useState} from "react"
import {WatchlistAndPortfolioProvider} from "./ContextProvider.jsx"
export default function App() {

  return (
    <><WatchlistAndPortfolioProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/watchlist" element = {<Watchlist/>}/>
        <Route path="/portfolio" element={<Portfolio/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/watchlist/:ticker" element={<StockDetail/>}/>
        <Route path="/:ticker" element={<StockDetail/>}/>
        <Route path="/portfolio/:ticker" element={<StockDetail/>}/>
        <Route path="*" element= {<h1> 404 Error </h1>}/>
      </Routes>
      </WatchlistAndPortfolioProvider>
    </>
  )
}
