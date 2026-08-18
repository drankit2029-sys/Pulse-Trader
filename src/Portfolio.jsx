import { useWatchlistPortfolio } from "./ContextProvider.jsx"
import {useState} from "react"
export default function Portfolio(){
    const{portfolio} = useWatchlistPortfolio();
    return(
        <div className="bg-gray-300 min-h-screen">
            <div className="flex flex-col gap-2 p-2">
            {portfolio.map(ticker => <StockCard key={ticker.ticker} ticker={ticker.ticker}/>) }
            </div>
        </div>
    )
}

function StockCard({ticker}){
    const [price, setPrice] = useState("-- $")
    const {deleteFromPortfolio} = useWatchlistPortfolio();
    async function fetchPrice(){
        setPrice("Loading...");
        try{
        const raw = await fetch(`https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(ticker)}&token=${encodeURIComponent("d9ul9vhr01qs9cmda7d0d9ul9vhr01qs9cmda7dg")}`)
        if (!raw.ok){setPrice("Error1"); return;}
        const data = await raw.json();
        setPrice(data.c + " $")}
        catch(error){
            setPrice("Error2")
        }
    }

    return(
        <div className="flex flex-1 justify-around items-center bg-gray-200 min-h-10 rounded-3xl text-xl font-bold ">
            <p>{ticker}</p>
            <div className="flex gap-2">
                <p>{price}</p>
                <button className=" cursor-pointer bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-sm font-semibold rounded-2xl px-2" onClick={fetchPrice}>Fetch Price</button>
            </div>
            <div className="flex gap-2">
                <button className=" cursor-pointer bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-base font-semibold rounded-2xl px-2 py-0.5">Buy</button>
                <button className=" cursor-pointer bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-base font-semibold rounded-2xl px-2 py-0.5" onClick={() => deleteFromWatchlist(ticker)}>Remove</button>
            </div>
        </div>
    )
}