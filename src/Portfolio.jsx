import { useWatchlistPortfolio } from "./ContextProvider.jsx"
import {useState} from "react"
import {BuyButton , SellButton} from "./BuyButton.jsx"
import {useRef} from "react"
import {useEffect} from "react"
export default function Portfolio({handleOneRefresh,handleAllRefresh}){
const {portfolioValue, portfolio} = useWatchlistPortfolio();
let currentValue = portfolio.reduce((sum,stock) => sum + (stock.currPrice * stock.shares), 0);
let profit = `${((100 * (currentValue - portfolioValue.invested))/portfolioValue.invested).toFixed(2)}%`;

    return(
        <div className="min-h-screen bg-gray-300 p-2 flex flex-col">
            <div className="bg-gray-300 flex justify-around p-5 shadow-lg rounded-3xl ">

                <div className="flex flex-col items-center self-center gap-2">
                    <div className="bg-gray-200 p-7 rounded-3xl text-center shadow-md">
                        <p className="text-gray-500 text-xs font-extralight">Balance</p>
                        <p className="text-xl font-semibold">{(portfolioValue.remaining).toFixed(2)}$</p>
                    </div>
                    <AddFunds/>
                </div>
                <div className=" gap-2 flex flex-col items-center self-center">
                    <div className="flex flex-col items-center bg-gray-200 p-7 rounded-3xl gap-3 text-center shadow-md">
                        <div className="flex gap-7">
                            <div>
                                <p className="text-gray-500 text-xs font-extralight">Invested</p>
                                <p className="text-xl font-semibold">{portfolioValue.invested.toFixed(2)}$</p>
                                
                            </div>

                            <div>
                                <p className="text-gray-500 text-xs font-extralight">Current Value</p>
                                <p className="text-xl font-semibold">{currentValue.toFixed(2)}$</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-gray-500 text-xs font-extralight">Profit/Loss</p>
                            <p className={`text-xl font-semibold ${parseFloat(profit) > 0 ? "text-green-500" : "text-red-500"}`}>{profit}</p>
                        </div>
                    </div>
                    <div>
                        <button className=" shadow-sm bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-xl text-sm font-semibold text-white px-2 py-0.5" onClick={handleAllRefresh}>Refresh</button>
                    </div>
                </div>


            </div>


            <div className="p-2 flex flex-col gap-2">
                {portfolio.map((stock, index) => <StockCard key={stock.ticker} stockIndex={index} handleRefresh={handleOneRefresh}/>)}
            </div>
        
        </div>
    )
}

function StockCard({stockIndex, handleRefresh}){
    
const{portfolio} = useWatchlistPortfolio();
const stock = portfolio[stockIndex];
    const profit = +((((stock.currPrice * stock.shares) - (stock.avgBuyPrice * stock.shares)) * 100)/(stock.avgBuyPrice * stock.shares)).toFixed(2)
    return(
        <div className="flex bg-gray-300 px-3 py-2 rounded-2xl shadow-lg justify-around items-center">
            <h1 className="font-bold">{stock.ticker}</h1>
            <div className="flex flex-col items-center bg-gray-200 p-4 text-center gap-2 rounded-3xl shadow-lg">
                <div className="flex gap-3">
                    <div>
                        <p className="text-gray-500 text-xs font-extralight">Current Price</p>
                        <p className="text-lg font-semibold">{(stock.currPrice).toFixed(2)}$</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs font-extralight">Shares</p>
                        <p className="text-lg font-semibold">{stock.shares}</p>
                    </div>
                </div>
                <div>
                    <p className="text-gray-500 text-xs font-extralight">Current Value</p>
                    <p className="text-lg font-semibold">{(stock.currPrice * stock.shares).toFixed(2)}$</p>
                </div>
            </div>
            <div className="flex flex-col items-center bg-gray-200 p-4 text-center gap-2 rounded-3xl shadow-lg">
                <div className="flex gap-3 items-center">
                    <div>
                        <p className="text-gray-500 text-xs font-extralight">Invested</p>
                        <p className="text-lg font-semibold">{(stock.avgBuyPrice * stock.shares).toFixed(2)}$</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs font-extralight">Average Buy <br/> Price </p>
                        <p className="text-lg font-semibold">{stock.avgBuyPrice.toFixed(2)}$</p>
                    </div>
                </div>
                <div>
                    <p className="text-gray-500 text-xs font-extralight">Profit/Loss</p>
                    <p className={`text-lg font-semibold ${ (profit > 0) ? "text-green-500" : "text-red-500"}`}>{profit}%</p>
                </div>    
            </div>
            <div className=" flex flex-col items-center gap-2 bg-gray-300 p-0">
                <div className="flex gap-2">
                    <BuyButton ticker={stock.ticker}/>
                    <SellButton ticker={stock.ticker} shares={stock.shares}/>
                </div>
                <div>
                    <button className=" shadow-sm bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-xl text-sm font-semibold text-white px-2 py-0.5" onClick={()=> handleRefresh(stock.ticker)}>Refresh</button>
                </div>
            </div>
        </div>
    )
}

function AddFunds(){
    const{addFunds} = useWatchlistPortfolio();
    const[isAddingFunds, SetIsAddingFunds] = useState(false);
    const[value, setValue] = useState('');
    const popUpRef = useRef(null);
    useEffect(()=>{
        function handleClickOutside(e){
            if (popUpRef.current && !popUpRef.current.contains(e.target)){
                setValue(null);
                SetIsAddingFunds(false);
            } 
        }
        if(isAddingFunds){
            document.addEventListener("mousedown", handleClickOutside)
        }
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isAddingFunds])
    return(
    <div ref={popUpRef} className="relative">
        <button onClick={()=>{SetIsAddingFunds(true)}} className=" shadow-sm bg-green-500 hover:bg-green-600 active:bg-green-700 rounded-xl text-sm font-semibold text-white px-2 py-0.5">Add Funds</button>
        {
            isAddingFunds && (
                <div className="bg-gray-300 absolute rounded-3xl shadow-lg p-3">
                    <form className="flex shadow-lg rounded-lg " onSubmit={(e)=>{e.preventDefault(); addFunds(parseFloat(value)); SetIsAddingFunds(false); setValue(null);}} >
                        <input value={value} onChange={(e) => {e.stopPropagation(); setValue(e.target.value)}} className="bg-gray-200 rounded-l-lg px-2 py-1 " placeholder="Enter amount" type="number" min="0" step="0.01" required/>
                        <button type="submit" className="bg-green-500 hover:bg-green-600 active:bg-green-700 rounded-r-xl text-sm font-semibold text-white px-2 py-0.5">Add</button>
                    </form>

                </div>
            )
        }
    </div>
    )
}