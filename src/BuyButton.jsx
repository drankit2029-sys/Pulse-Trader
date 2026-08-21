import {useState, useEffect,useEffectEvent, useLayoutEffect, useRef} from "react"
import { useWatchlistPortfolio } from "./ContextProvider";
import {useForm} from "react-hook-form";
export function BuyButton({ticker}){
    const [isBuying, setIsBuying] = useState(false);
    const {portfolioValue,buy} = useWatchlistPortfolio();
    const [price, setPrice] = useState("-- $")
    const [position, setPosition] = useState({ vertical: "top", horizontal: "left" });
    const containerRef = useRef(null);
    const popupRef = useRef(null);
    const {register, handleSubmit,resetField,watch,trigger, formState: {errors}} = useForm({mode: "onChange"});
    const [isDisabled, setIsdisabled] = useState(true) 
    const toggleBuying = () => {setIsBuying((prev) => !prev); setPosition({vertical: "top", horizontal: "left"})};

    function onSubmit(data){
      setIsBuying(false);
      resetField("nOfStocks")
      buy(ticker,parseFloat(data.nOfStocks),parseFloat(price));
    }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsBuying(false);
        setIsdisabled(true);
        resetField("nOfStocks");
      }
    };

    if (isBuying) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    if(isBuying){
      setPrice("Loading...")
      fetchPrice();
    }

    let timerID;
    async function fetchPrice(){
        try{
        const raw = await fetch(`https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(ticker)}&token=${encodeURIComponent("d9ul9vhr01qs9cmda7d0d9ul9vhr01qs9cmda7dg")}`)
        if (!raw.ok){setPrice("Error1"); return;}
        const data = await raw.json();
        setPrice(data.c + " $");
        setIsdisabled(false);
        sessionStorage.setItem(`stock_price_${ticker}`, data.c + " $")}
        catch(error){
            setPrice("Error2")
        }
        if(isBuying){
          console.log(isBuying)
          timerID = setTimeout(fetchPrice,5000)
        }
     }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearInterval(timerID);
    };
  }, [isBuying]);

  useLayoutEffect(() => {
    if (!isBuying || !popupRef.current) return;

    const rect = popupRef.current.getBoundingClientRect();
    const margin = 8;

    // Check vertical boundaries
    const overflowsBottom = rect.bottom > window.innerHeight;
    
    // Check horizontal boundaries
    const overflowsRight = rect.right > window.innerWidth;

    setPosition({
      vertical: overflowsBottom ? "bottom" : "top",
      horizontal: overflowsRight ? "right" : "left",
    });
  }, [isBuying]);

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Trigger Button */}
      <button
        type="button"
        className="cursor-pointer bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-center font-semibold text-sm px-2 rounded-2xl py-0.5"
        onClick={toggleBuying}
      >
        Buy
      </button>

      {/* Dynamic Popup */}
      {isBuying && (
       <form onSubmit={handleSubmit(onSubmit)}>
        <div
          ref={popupRef}
          className={`absolute z-50 w-72 flex flex-col gap-2 bg-gray-300 rounded-2xl p-3 text-black shadow-xl 
        ${position.vertical === 'top' ? 'top-full mt-2' : 'bottom-full mb-2'} ${position.horizontal === 'left' ? 'left-0' : 'right-0'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col">
          <input
            min="0"
            type="number"
            placeholder="Enter Number of Stocks"
            className="border-2 bg-gray-200 rounded-xl px-2 py-1 text-black outline-none"
            {...register("nOfStocks",{
              validate: (value) => {
                if(isNaN(parseFloat(price))){
                  return price;
                }
                else{
                  if(value.trim() === ""){
                  return "No of stocks required"
                }
                  if(value > Math.floor(portfolioValue.remaining/parseFloat(price))){
                    return "Not enough balance";
                  }
                  else{
                    
                    return true;
                  }
                }
              }
            })}
          />
          <p className="self-start px-3">Max: {isNaN(parseFloat(price)) ? "--" : Math.floor(portfolioValue.remaining/parseFloat(price))}</p>
          </div>
        

          <div className="flex flex-1 flex-col bg-gray-200 p-3 rounded-2xl gap-3">
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-gray-500">Strike Price</p>
                <p className="font-semibold">{price}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Balance</p>
                <p className="font-semibold">{+portfolioValue?.remaining.toFixed(2)} $</p>
              </div>
            </div>
          </div>

          <div className="flex justify-around items-center">
            {(() => {
              if(isNaN(parseFloat(price))){
                  return (<p>{price}</p>)}
              else{
                if(errors.nOfStocks){
              return(<p>{errors.nOfStocks.message}</p>)}
                
                else{
              return(<p className="text-2xl font-bold">{ isNaN(parseFloat(watch("nOfStocks"))) ? "--" : (+(parseFloat(watch("nOfStocks")) * parseFloat(price)).toFixed(3))} $</p>)
            }
              }
            }) ()
              }

            <button
              type="submit"
              disabled={isDisabled}
              className={`${isDisabled ? "bg-red-400" : "cursor-pointer bg-red-500 hover:bg-red-600 active:bg-red-700"} text-white text-center font-semibold text-lg px-3 rounded-2xl py-0.5`}
            >
              Buy
            </button>
          </div>
        </div>
      </form>
      )}
    </div>
  );
}



export function SellButton({ticker, shares}){
    const [isSelling, setIsSelling] = useState(false);
    const {portfolioValue,sell} = useWatchlistPortfolio();
    const [price, setPrice] = useState("-- $")
    const [position, setPosition] = useState({ vertical: "top", horizontal: "left" });
    const containerRef = useRef(null);
    const popupRef = useRef(null);
    const {register, handleSubmit,resetField,watch,trigger, formState: {errors}} = useForm({mode: "onChange"});
    const [isDisabled, setIsdisabled] = useState(true) 
    const toggleSelling = () => {setIsSelling((prev) => !prev); setPosition({vertical: "top", horizontal: "left"})};

    function onSubmit(data){
      setIsSelling(false);
      resetField("nOfStocks")
      sell(ticker,parseFloat(data.nOfStocks),parseFloat(price));
    }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsSelling(false);
        setIsdisabled(true);
        resetField("nOfStocks");
      }
    };

    if (isSelling) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    if(isSelling){
      setPrice("Loading...")
      fetchPrice();
    }

    let timerID;
    async function fetchPrice(){
        try{
        const raw = await fetch(`https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(ticker)}&token=${encodeURIComponent("d9ul9vhr01qs9cmda7d0d9ul9vhr01qs9cmda7dg")}`)
        if (!raw.ok){setPrice("Error1"); return;}
        const data = await raw.json();
        setPrice(data.c + " $");
        setIsdisabled(false);
        sessionStorage.setItem(`stock_price_${ticker}`, data.c + " $")}
        catch(error){
            setPrice("Error2")
        }
        if(isBuying){
          console.log(isSelling)
          timerID = setTimeout(fetchPrice,5000)
        }
     }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearInterval(timerID);
    };
  }, [isSelling]);

  useLayoutEffect(() => {
    if (!isSelling || !popupRef.current) return;

    const rect = popupRef.current.getBoundingClientRect();
    const margin = 8;

    // Check vertical boundaries
    const overflowsBottom = rect.bottom > window.innerHeight;
    
    // Check horizontal boundaries
    const overflowsRight = rect.right > window.innerWidth;

    setPosition({
      vertical: overflowsBottom ? "bottom" : "top",
      horizontal: overflowsRight ? "right" : "left",
    });
  }, [isSelling]);

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Trigger Button */}
      <button
        type="button"
        className="cursor-pointer bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-center font-semibold text-sm px-2 rounded-2xl py-0.5"
        onClick={toggleSelling}
      >
        Sell
      </button>

      {/* Dynamic Popup */}
      {isSelling && (
       <form onSubmit={handleSubmit(onSubmit)}>
        <div
          ref={popupRef}
          className={`absolute z-50 w-72 flex flex-col gap-2 bg-gray-300 rounded-2xl p-3 text-black shadow-xl 
        ${position.vertical === 'top' ? 'top-full mt-2' : 'bottom-full mb-2'} ${position.horizontal === 'left' ? 'left-0' : 'right-0'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col">
          <input
            min="0"
            type="number"
            placeholder="Enter Number of Stocks"
            className="border-2 bg-gray-200 rounded-xl px-2 py-1 text-black outline-none"
            {...register("nOfStocks",{
              validate: (value) => {
                if(isNaN(parseFloat(price))){
                  return price;
                }
                else{
                  if(value.trim() === ""){
                  return "No of stocks required"
                }
                  if(value > shares){
                    return "Not enough Shares";
                  }
                  else{
                    
                    return true;
                  }
                }
              }
            })}
          />
          <p className="self-start px-3">Shares: {isNaN(parseFloat(price)) ? "--" : shares}</p>
          </div>
        

          <div className="flex flex-1 flex-col bg-gray-200 p-3 rounded-2xl gap-3">
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-gray-500">Strike Price</p>
                <p className="font-semibold">{price}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Balance</p>
                <p className="font-semibold">{+portfolioValue?.remaining.toFixed(2)} $</p>
              </div>
            </div>
          </div>

          <div className="flex justify-around items-center">
            {(() => {
              if(isNaN(parseFloat(price))){
                  return (<p>{price}</p>)}
              else{
                if(errors.nOfStocks){
              return(<p>{errors.nOfStocks.message}</p>)}
                
                else{
              return(<p className="text-2xl font-bold">{ isNaN(parseFloat(watch("nOfStocks"))) ? "--" : (+(parseFloat(watch("nOfStocks")) * parseFloat(price)).toFixed(3))} $</p>)
            }
              }
            }) ()
              }

            <button
              type="submit"
              disabled={isDisabled}
              className={`${isDisabled ? "bg-green-400" : "cursor-pointer bg-green-500 hover:bg-green-600 active:bg-green-700"} text-white text-center font-semibold text-lg px-3 rounded-2xl py-0.5`}
            >
              Sell
            </button>
          </div>
        </div>
      </form>
      )}
    </div>
  );
}