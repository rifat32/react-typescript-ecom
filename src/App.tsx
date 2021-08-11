import React,{useContext} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import HeaderDesktop from './components/Navs/HeaderDesktop';
import MenuSideBar from './components/Navs/MenuSideBar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer/Footer';
import ProductsByCategory from './pages/ProductsByCategory';
import ProductsBySearch from './pages/ProductsBySearch';
import './App.css'
import ProductDetails from './pages/ProductDetails';
import Auth from './components/Modal/Auth';
import {AppContext} from './context'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import ShoppingDetailsPage from './pages/ShoppingDetailsPage';
import CheckOutPage from './pages/CheckOutPage';


function App() {
 
    const {showLogin} = useContext(AppContext)
  
   
 
  return (
    <Router >
    <div className="page-wrapper">
<MenuSideBar/>
<div className="page-container">
<HeaderDesktop/>

  

    

  <Switch>
  <Route exact path="/" component={HomePage}/>
  <Route  path="/category/:slug" component={ProductsByCategory}/>
  <Route  path="/search/:search" component={ProductsBySearch}/>
  <Route  path="/products/:slug" component={ProductDetails}/>
  <Route   path="/cart-details" component={ShoppingDetailsPage}/>
  <Route   path="/checkout" component={CheckOutPage}/>

  {/* <Route exact path="/" component={HomePage}/>
  <Route  path="/about" component={AboutPage}/>
  <Route  path="/contact" comsponent={ContactPage}/>
  <Route  path="/products" component={ProductPage}/>
  <Route  path="/services" component={ServicesPage}/>
  <Route  path="/terms-conditions" component={TermsPAge}/> */}
  
 
  
  </Switch>
 

  {/* <a href="#" className="back-to-top d-flex align-items-center justify-content-center"> <AiOutlineArrowUp/></a> */}
  </div>
  </div>
  <Footer/>
  {
    showLogin? <Auth/>:null
  }
  <ToastContainer position="top-center"/>
 
  </Router>
  );
}

export default App;
