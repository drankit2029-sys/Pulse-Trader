import { useWatchlistPortfolio } from "./ContextProvider.jsx"
import {useState} from "react"
export default function Portfolio(){
const {portfolioValue, addFunds, portfolio} = useWatchlistPortfolio();
let currentValue = 4000;
let profit = "10%";
    return(
        <div className="min-h-screen bg-gray-300 p-2 flex flex-col">
            <div className="bg-gray-300 flex justify-around p-5 shadow-lg rounded-3xl ">

                <div className="flex flex-col items-center self-center gap-2">
                    <div className="bg-gray-200 p-7 rounded-3xl text-center shadow-md">
                        <p className="text-gray-500 text-xs font-extralight">Balance</p>
                        <p className="text-xl font-semibold">{portfolioValue.remaining}$</p>
                    </div>
                    <div>
                        <button className=" shadow-sm bg-green-500 hover:bg-green-600 active:bg-green-700 rounded-xl text-sm font-semibold text-white px-2 py-0.5">Add Funds</button>
                    </div>
                </div>
                <div className=" gap-2 flex flex-col items-center self-center">
                    <div className="flex flex-col items-center bg-gray-200 p-7 rounded-3xl gap-3 text-center shadow-md">
                        <div className="flex gap-7">
                            <div>
                                <p className="text-gray-500 text-xs font-extralight">Invested</p>
                                <p className="text-xl font-semibold">{portfolioValue.invested}$</p>
                                
                            </div>

                            <div>
                                <p className="text-gray-500 text-xs font-extralight">Current Value</p>
                                <p className="text-xl font-semibold">{currentValue}$</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-gray-500 text-xs font-extralight">Profit/Loss</p>
                            <p className="text-xl font-semibold">{profit}</p>
                        </div>
                    </div>
                    <div>
                        <button className=" shadow-sm bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-xl text-sm font-semibold text-white px-2 py-0.5">Refresh</button>
                    </div>
                </div>


            </div>


            <div className="p-2 flex flex-col gap-2">
                {portfolio.map(stock => <StockCard key={stock.ticker} stock={stock}/>)}
            </div>
        
        </div>
    )
}

function StockCard({stock}){
    
    
    const profit = +((((stock.currPrice * stock.shares) - (stock.avgBuyPrice * stock.shares)) * 100)/(stock.avgBuyPrice * stock.shares)).toFixed(2)
    return(
        <div className="flex bg-gray-300 px-3 py-2 rounded-2xl shadow-lg justify-around items-center">
            <h1 className="font-bold">{stock.ticker}</h1>
            <div className="flex flex-col items-center bg-gray-200 p-4 text-center gap-2 rounded-3xl shadow-lg">
                <div className="flex gap-3">
                    <div>
                        <p className="text-gray-500 text-xs font-extralight">Current Price</p>
                        <p className="text-lg font-semibold">{stock.currPrice}$</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs font-extralight">Shares</p>
                        <p className="text-lg font-semibold">{stock.shares}$</p>
                    </div>
                </div>
                <div>
                    <p className="text-gray-500 text-xs font-extralight">Current Value</p>
                    <p className="text-lg font-semibold">{stock.currPrice * stock.shares}$</p>
                </div>
            </div>
            <div className="flex flex-col items-center bg-gray-200 p-4 text-center gap-2 rounded-3xl shadow-lg">
                <div className="flex gap-3 items-center">
                    <div>
                        <p className="text-gray-500 text-xs font-extralight">Invested</p>
                        <p className="text-lg font-semibold">{stock.avgBuyPrice * stock.shares}$</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs font-extralight">Average Buy <br/> Price </p>
                        <p className="text-lg font-semibold">{stock.avgBuyPrice}$</p>
                    </div>
                </div>
                <div>
                    <p className="text-gray-500 text-xs font-extralight">Profit/Loss</p>
                    <p className={`text-lg font-semibold ${ (profit > 0) ? "text-green-500" : "text-red-500"}`}>{profit}%</p>
                </div>


                
            </div>
            <div className=" flex flex-col items-center gap-2 bg-gray-300 p-0">
                <div className="flex gap-2">
                    <button className=" shadow-sm bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-xl text-sm font-semibold text-white px-2 py-0.5">Buy</button>
                    <button className=" shadow-sm bg-green-500 hover:bg-green-600 active:bg-green-700 rounded-xl text-sm font-semibold text-white px-2 py-0.5">Sell</button>
                </div>
                <div>
                    <button className=" shadow-sm bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-xl text-sm font-semibold text-white px-2 py-0.5">Refresh</button>
                </div>
            </div>
        </div>
    )
}