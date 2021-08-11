import React,{useState,useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Categories } from '../../interfaces/Categories'

import axios from 'axios'
import { backEnd } from '../../utils/backEnd'

const MenuSideBar :React.FC  = () => {


  const [categories,setCategories] = useState<Categories[]| null>(null)
  
  const location =  useLocation()
  
 
  useEffect(() => {
    fetchCategories()
  },[])
  

  const fetchCategories = ():void => {

    axios.get(`${backEnd}/categories/`)
    .then(response => {
          
   
        setCategories(response.data.categories)
    })
    .catch(err => {
        console.log(err.response)
    })
}
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
        {
          categories?categories.map((el)=> (  <li key={el.id}>
            <Link to={`/category/${el.slug}`} className={location.pathname.includes(`category/${el.slug}`)?"text-primary":""}>{el.name}</Link>
          </li>)):null
        }
      </ul>
    </nav>
  </div>
</aside>

    )
}

export default MenuSideBar
