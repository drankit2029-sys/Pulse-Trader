import {useState} from "react" 
import { useWatchlistPortfolio } from "./ContextProvider"
import {BuyButton} from "./BuyButton"
export default function Home(){
    const symbolList = ["AAPL", "MSFT", "NVDA", "GOOGL", "AMZN", "META", "TSLA", "JPM", "V", "UNH", "XOM", "MA", "JNJ", "PG", "HD", "COST", "ABBV", "MRK", "AVGO", "AMD", "CRM", "NFLX", "WMT", "BAC", "CVX", "LLY", "PEP", "KO", "TMO", "CSCO", "ADBE", "QCOM", "INTC", "TXN", "AMAT", "IBM", "ORCL", "NOW", "INTU", "ACN", "CAT", "GE", "DE", "DIS", "NKE", "SBUX", "MCD", "CMG", "LOW", "TJX", "PYPL", "SQ", "UBER", "ABNB", "PLTR", "SNOW", "PANW", "CRWD", "COIN", "PFE", "BMY", "GILD", "AMGN", "VZ", "T", "MS", "GS", "BLK", "ISRG", "SPY"]
    return(
        <>
        <div className="bg-gray-300 min-h-screen">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2 p-2 bg-gray-300">
        {symbolList.map(ticker => <StockCard key={ticker} ticker={ticker}/>)}
        </div>
        </div>
        <div>

        </div>
        </>
    )
}

function StockCard({ticker}){
    const [price,setPrice] = useState(() => sessionStorage.getItem(`stock_price_${ticker}`) || "-- $")
    const {addToWatchlist} = useWatchlistPortfolio();
    async function fetchPrice(){
        setPrice("Loading...");
        try{
        const raw = await fetch(`https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(ticker)}&token=${encodeURIComponent("d9ul9vhr01qs9cmda7d0d9ul9vhr01qs9cmda7dg")}`)
        if (!raw.ok){setPrice("Error1"); return;}
        const data = await raw.json();
        setPrice(data.c + " $");
        sessionStorage.setItem(`stock_price_${ticker}`, data.c + " $")}
        catch(error){
            setPrice("Error2")
        }
    }

    return(
        <div className = "flex flex-col text-center gap-2  py-3 rounded-3xl bg-gray-200 h-fit shadow-md">
            <h2 className="text-xl font-bold">{ticker}</h2>
            <div className="flex flex-col items-center gap-3">
                <h2 className="text-lg font-semibold">{price}</h2>
                <button className=" cursor-pointer bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-center font-semibold text-sm px-2 rounded-2xl py-0.5" onClick={fetchPrice}>Fetch price</button>
            </div>
            <div className = "flex justify-center gap-1">
            <BuyButton ticker={ticker} />
            <button className="cursor-pointer bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-center font-semibold text-sm px-2 rounded-2xl py-0.5" onClick={()=> addToWatchlist(ticker)}>Watchlist</button>
            </div>
        </div>
    )
}
