import React,{useState,useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Categories } from '../../interfaces/Categories'

import axios from 'axios'
import { backEnd } from '../../utils/backEnd'

const MenuSideBar :React.FC  = () => {


  const [categories,setCategories] = useState<Categories[]| null>(null)
  
  const location =  useLocation()
  
 
  useEffect(() => {
  
  },[])
  


    return (
     <aside className="menu-sidebar d-none d-lg-block">
  <div className="logo">
    <Link to="/">
      <img src="../../assets/images/logo.png" alt="luv2shop" className="img-responsive" />
    </Link>
  </div>
  <div className="menu-sidebar-content js-scrollbar1">
    <nav className="navbar-sidebar">
      <ul className="list-unstyled navbar-list">
       
        <li>
        <Link to={`/category/mouse_pads`} className={location.pathname.includes("category/mouse_pads")?"text-primary":""}>Mouse Pads</Link>
        </li>
        <li>
        <Link to={`/category/luggage_tags`} className={location.pathname.includes("category/luggage_tags")?"text-primary":""}>Luggage Tags</Link>
        </li>
        <li>
        <Link to={`/category/coffee_mugs`} className={location.pathname.includes("category/coffee_mugs")?"text-primary":""}>Coffee Mugs</Link>
        </li>
        <li>
        <Link to={`/category/books`} className={location.pathname.includes("category/books")?"text-primary":""}>Books</Link>
        </li>
       
      </ul>
    </nav>
  </div>
</aside>

    )
}

export default MenuSideBar
