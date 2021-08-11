import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios';

import { Products } from '../interfaces/Products';

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { backEnd } from '../utils/backEnd';
import { Link } from 'react-router-dom';
import { AppContext } from '../context';


const ProductsBySearch: React.FC = (props:any) => {
  const {addToCart} = useContext(AppContext)
  interface Links {
label:(string|null);
url:(string|number);
active:boolean;
  }
    const [loading,setLoading] = useState(false);
    const [products,setProducts] = useState<(Products[] | null)>(null);
    const [perPage,setPerPage] = useState(9)
    const [from,setFrom] = useState(null)
    const [to,setTo] = useState(null)
    const [total,setTotal] = useState(null)
    
    const [lastPage,setLastPage] = useState(0)
   
    const [links,setLinks] = useState<(Links[]|null)>(null)
  
    const [ current_page, set_current_page] = useState(0)
   

   
    useEffect(() => {
        fetchProducts(perPage);
    },[props.match.params.search])
    const fetchProducts = (urlOrPerPage:(number|string)):void => {
        setLoading(true)
        setProducts(null)
        let url;
        if(typeof urlOrPerPage === "string"){
       url =   urlOrPerPage.replace("http", "https");
        } else {
          url = `${backEnd}/products/search/${props.match.params.search}/${urlOrPerPage}`
        }
        axios.get(url)
        .then(response => {
              setLoading(false)
          console.log(response.data)
            setProducts(response.data.products.data)
            setFrom(response.data.products.from)
            setTo(response.data.products.to)
            setTotal(response.data.products.total)
          
            setLastPage(response.data.products.last_page)
         
            setLinks(response.data.products.links)
            set_current_page(response.data.products.current_page)
            
        })
        .catch(err => {
              setLoading(false)
            console.log(err.response)
        })
    }

  const handlePerPage = (e: React.ChangeEvent<HTMLSelectElement
    >) => {
const newValue = parseInt(e.target.value);
setPerPage(newValue)
console.log(newValue)
fetchProducts(newValue)

  }
    
  const setLinksView = (el:Links,index:number,arr:object[]) => {
   if(el.label=="&laquo; Previous") {
     if(el.url) {
      return <li key={index} className="page-item"><button className="page-link" onClick={() =>
       fetchProducts(el.url)} >Previous</button></li>
     } 
     else {
      return <li key={index} className="page-item disabled"><button className="page-link"  >Previous</button></li>
     }
   }
 else if(el.label=="Next &raquo;") {
    if(el.url) {
     return <li key={index} className="page-item"><button onClick={() =>
       fetchProducts(el.url)} className="page-link" >Next</button></li>
    } 
    else {
     return <li key={index} className="page-item disabled"><button className="page-link" >Next</button></li>
    }
  } else {
    if(index === 1) {
      return   <React.Fragment key={index}><li  className="page-item"><button className={`page-link  ${el.active && "text-dark"}`} onClick={() =>
        index == current_page?null:fetchProducts(el.url)} >
          1
          </button></li>
          {
            current_page > 4?(<li  className="page-item"><button className={`page-link `} >
                ....
                </button></li>):null
          }
          </React.Fragment>
    }
   else if(index === lastPage && lastPage > 1  ) {
      return  <React.Fragment key={index}>
         {
            current_page < (lastPage - 3)?(<li  className="page-item">
              <button className={`page-link `} >
                ....
                </button></li>):null
          }
         <li key={index} className="page-item"><button className={`page-link  ${el.active && "text-dark"}`} onClick={() =>
        index == current_page?null:fetchProducts(el.url)} >
       {lastPage}
          </button></li>
         
          </React.Fragment>
    }
    else {
 
      if(index == current_page + 1 || index == current_page + 2 || index == current_page - 1 || index == current_page - 2 || index == current_page){
        return   <li key={index} className="page-item"><button className={`page-link  ${el.active && "text-dark"}`} onClick={() =>
          index == current_page?null:fetchProducts(el.url)} >
                 {el.label}
           </button></li>
           
      }
      


    }
  
  }
  }
   if(!products?.length) {
    const override = css`
    border-color: black;
  `;
return <div   className="noProduct d-flex align-items-center justify-content-center">
    {
        loading?<ClipLoader  loading={loading} css={override} size={150} >loading</ClipLoader>:<h3 className="display-3" >
        No products to show 
        </h3>
    } 

</div>
    }
    
    return (
      <div className="main-content">
  <div className="section-content section-content-p30">
    <div className="container-fluid">
      <div className="row">
        {
           products? products.map((el) => (
<div key={el.id} className="col-md-4">
          <div className="product-box row">
              <div className="col-12 text-center">
              <Link  to={`/products/${el.slug}`}>
              <img src={`../${el.image_url}`} className="img-responsive" />
            </Link>
              </div>
              <div className="col-12 text-center">
              <Link  to={`/products/${el.slug}`}>
              <h1>{el.name}</h1>
            </Link>
            <h2>{el.description.slice(0, 30)} ......</h2>
            <div className="price">{el.unit_price} $</div>
            <a onClick={()=>addToCart(el.id)}   className="primary-btn">Add to cart</a>
          </div>

            
          
          </div>
        </div>
           )):null
        }
  
       
      </div>
      <div className="footer-pagination">
        <div className="row">
          <div className="col-md-4 text-center">
            <div className="items">
              <label>Item per page</label> <select onChange={handlePerPage} value={perPage}>
                <option value={6}>6</option>
                <option value={9}>9</option>
                <option value={12}>12</option>
                <option value={15}>15</option>
               
              </select>
            </div>
        
          </div>
          <div className="col-md-2 text-center">
          <div className="number">{from} - {to} of {total}</div>
        
          </div>
          <div className="col-md-6">

<nav aria-label="Page navigation example   ">
  <ul className="pagination  ">

    {
      links? links.map((el,index,arr) => setLinksView(el,index,arr)):null
    }
    
  
   
  

  </ul>
</nav>

          

          </div>
         
         
         
        </div>
      </div>
    </div>
  </div>
</div>

    )
}

export default ProductsBySearch
