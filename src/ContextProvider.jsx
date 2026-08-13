import { useContext, createContext, useState} from "react";

const WatchlistAndPortfolioContext = createContext(null);

export function WatchlistAndPortfolioProvider( {children}){
    const [portfolio, setPortfolio] = useState([{ticker :"AAPL" , shares: 20}]);
    const [watchList, setWatchlist] = useState(["AAPL"]);

    function addToPortfolio(name, number){
        if(portfolio.some(stock => stock.ticker === name)){
            setPortfolio(portfolio.map(stock => {
                return ((stock.ticker === name) ? {...stock, shares: stock.shares + number} : {...stock})
            }))
        }
        else {
            setPortfolio([...portfolio, {ticker : name, shares : number}])
        }
    }

    function deleteFromPortfolio(name){
        setPortfolio(portfolio.filter( stock => stock.ticker !== name))
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
                addToPortfolio,
                addToWatchlist,
                deleteFromPortfolio,
                deleteFromWatchlist
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