import { useWatchlistPortfolio } from "./ContextProvider.jsx"
export default function Portfolio(){
    const{portfolio, addToPortfolio, deleteFromPortfolio} = useWatchlistPortfolio();
    return(
        <p onClick={()=> {deleteFromPortfolio("nvidia")}}> {portfolio.length}</p>
    )
}