import { Link, NavLink } from 'react-router-dom'
import './App.css'
import { Routes, Route} from "react-router-dom"
import Home from "./Home.jsx"
import Portfolio from "./Portfolio.jsx"
import Watchlist from "./Watchlist.jsx"
import Navbar from "./Navbar.jsx"
import {useState, useEffect} from "react"
import { useWatchlistPortfolio } from './ContextProvider.jsx'

export default function App() {
  const {setCurrPrice,portfolio} = useWatchlistPortfolio();

  async function fetchPrice(ticker){
        try{
        
        const raw = await fetch(`https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(ticker)}&token=${encodeURIComponent("d9ul9vhr01qs9cmda7d0d9ul9vhr01qs9cmda7dg")}`)
        if (!raw.ok){return(-1);}
        const data = await raw.json();
        return(data.c);}

        catch(error){
            return(-1);
        }
     }

  async function updateOnePrice(ticker){
    let updatedPrice = await fetchPrice(ticker);
    if(updatedPrice !== -1){
    setCurrPrice(ticker, updatedPrice);
    }
    
  }

  async function updateAllPrices(){
    const promises = portfolio.map(stock => fetchPrice(stock.ticker));
    const responses = await Promise.all(promises);
    responses.forEach((element,index) => {
      console.log(element)
      if(element !== -1){
        setCurrPrice(portfolio[index].ticker, element)

    }
      
    });
  }
  useEffect(()=>{

    const intervalId = setInterval(updateAllPrices,30000);
    return ()=> {
      clearInterval(intervalId);
    }
    },[])
  return (
    <>
      <div className="overflow-hidden scrollbar-none ">
      <Navbar/>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/watchlist" element = {<Watchlist/>}/>
        <Route path="/portfolio" element={<Portfolio handleOneRefresh = {updateOnePrice} handleAllRefresh={updateAllPrices} />}/>
        <Route path="*" element= {<h1> 404 Error </h1>}/>
      </Routes>
      </div>
    
    </>
  )
}
