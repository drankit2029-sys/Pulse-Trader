import {NavLink} from "react-router-dom"
export default function Navbar(){
    return(
    <>
    <div className="bg-gray-300 min-h-14 py-2 px-3">
    <div className="bg-gray-300 min-h-12 flex p-2 fixed z-100 rounded-3xl shadow-md min-w-[calc(100vw-24px)] px-2.5">
        <div className="bg-gray-200 rounded-2xl flex-1 flex items-center justify-around shadow-md">
        <NavLink to="/" className={({isActive}) => {return((isActive ? "bg-gray-300" : "") + " font-bold rounded-2xl px-2" )}} >Home</NavLink>
        <NavLink to="/watchlist" className={({isActive}) => {return((isActive ? "bg-gray-300" : "") + " font-bold rounded-2xl px-2" )}} >Watchlist</NavLink>
        <NavLink to="/portfolio" className={({isActive}) => {return((isActive ? "bg-gray-300" : "") + " font-bold rounded-2xl px-2" )}} >Portfolio</NavLink>
        </div>
       
    </div>
    </div>
    </>
    )
}