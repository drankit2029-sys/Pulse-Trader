import {NavLink} from "react-router-dom"
export default function Navbar(){
    return(
    <>
    <div className="flex min-w-screen min-h-10 justify-around bg-indigo-500">
        <NavLink to="/" className={({isActive}) => `text-lg font-[arial] font-semibold ${isActive ? "bg-indigo-800" : ""} text-center pt-2 flex-1 rounded-sm`}> Home </NavLink>
        <NavLink to="/watchlist" className={({isActive}) => `text-lg font-[arial] font-semibold ${isActive ? "bg-indigo-800" : ""} text-center pt-2 flex-1 rounded-sm`}> Watchlist </NavLink>
        <NavLink to="/portfolio" className={({isActive}) => `text-lg font-[arial] font-semibold ${isActive ? "bg-indigo-800" : ""} text-center pt-2 flex-1 rounded-sm`}> Portfolio </NavLink>
        <NavLink to="/profile" className={({isActive}) => `text-lg font-[arial] font-semibold ${isActive ? "bg-indigo-800" : ""} text-center pt-2 flex-1 rounded-sm`}> Profile </NavLink>
    </div>
    </>
    )
}