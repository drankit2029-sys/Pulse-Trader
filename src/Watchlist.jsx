import { useWatchlistPortfolio } from "./ContextProvider.jsx"
export default function Watchlist(){
    const {watchList, addToWatchlist} = useWatchlistPortfolio();
    return(
        <p onClick={() => addToWatchlist("Nvidia")}> {watchList.length}</p>
    )
}