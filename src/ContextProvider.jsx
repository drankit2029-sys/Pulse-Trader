import { useContext, createContext, useState} from "react";

const WatchlistAndPortfolioContext = createContext(null);

export function WatchlistAndPortfolioProvider( {children}){
    const [portfolio, setPortfolio] = useState([{ticker :"AAPL" , shares: 20 , avgBuyPrice: 400, currPrice: 300},{ticker:"MSFT", shares:30 , avgBuyPrice: 300, currPrice: 400}]);
    const [watchList, setWatchlist] = useState(["AAPL"]);
    const [portfolioValue,setPortfolioValue] = useState({invested: 5000, remaining: 5000})

    function buy(name, number, price){
        let bought = false;
        setPortfolio(portfolio.map((stock) => {
            if(stock.ticker === name){
                bought = true;
                return({...stock, shares : stock.shares + number, avgBuyPrice: (stock.avgBuyPrice*stock.shares + number*price)/(stock.shares+number), currPrice: price})
            }
            else{
                return({...stock})
            }
        }))
        !bought && setPortfolio([...portfolio, {ticker: name, shares: number, avgBuyPrice: price, currPrice: price}])
        setPortfolioValue({invested: portfolioValue.invested + number*price , remaining: portfolioValue.remaining - number*price})
    }

    function sell(name, number, price){
        setPortfolio(portfolio.flatMap((stock) => {
            if(stock.ticker === name){
                if(stock.shares === number){
                    setPortfolioValue({invested: portfolioValue.invested - number*stock.avgBuyPrice , remaining: portfolioValue.remaining + number*price})
                    return [];
                }
                else{
                    setPortfolioValue({invested: portfolioValue.invested - number*stock.avgBuyPrice , remaining: portfolioValue.remaining + number*price})
                    return([{...stock, shares : stock.shares - number, currPrice: price}])
                }
                
            }
            else{
                return([{...stock}])
            }
        }))

    }
    function addFunds(price){
        setPortfolioValue({...portfolioValue, remaining: portfolioValue.remaining + price})
    }



    function addToWatchlist(name) {
        if (!watchList.includes(name)) {
             setWatchlist([...watchList, name]);
        }
    }
    function deleteFromWatchlist(name){
        setWatchlist(watchList.filter(stock => stock !== name))
    }
    return(
        <>
        <WatchlistAndPortfolioContext.Provider value={
            {
                portfolio,
                watchList,
                buy,
                addToWatchlist,
                sell,
                deleteFromWatchlist,
                portfolioValue,
                addFunds
            }
        }>
            {children}
        </WatchlistAndPortfolioContext.Provider>
        
        </>
    );

}

export function useWatchlistPortfolio(){
    const watchListPortfolio = useContext(WatchlistAndPortfolioContext)
    if (!watchListPortfolio){
        throw new Error(" Watchlist and Portfolio context not provided");
    }
    return watchListPortfolio;
}