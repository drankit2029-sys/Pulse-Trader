import { Link, NavLink } from 'react-router-dom'
import './App.css'
import { Routes, Route} from "react-router-dom"
import Home from "./Home.jsx"
import Portfolio from "./Portfolio.jsx"
import Profile from "./Profile.jsx"
import Wishlist from "./Wishlist.jsx"
import Login from "./Login.jsx"
import Navbar from "./Navbar.jsx"
export default function App() {


  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/wishlist" element = {<Wishlist/>}/>
        <Route path="/portfolio" element={<Portfolio/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element= {<h1> 404 Error </h1>}/>
      </Routes>
    </>
  )
}
