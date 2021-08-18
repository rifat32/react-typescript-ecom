import axios from 'axios'
import React,{useState,useEffect,useContext} from 'react'
import { Products } from '../interfaces/Products';
import { backEnd } from '../utils/backEnd'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';
import { AppContext } from '../context';

const ProductDetails = (props:any) => {
  const [loading,setLoading] = useState(false);
  const [product,setProduct] = useState<(Products | null)>(null);
  const {addToCart} = useContext(AppContext)
    useEffect(()=>{
 fetchProduct()
    },[props.match.params.slug])
    const fetchProduct = () => {
      setLoading(true)
      setProduct(null)
      axios.get(`${backEnd}/products/single/${props.match.params.slug}`)
 .then(response => {
  setLoading(false)
     console.log(response.data.product)
     setProduct(response.data.product)
 })
 .catch(err => {
  setLoading(false)
     console.log(err.response)
 })
    }
    if(!product) {
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
        <div >
          <img src={`../${product.image_url}`} className="img-responsive" width="200px" />
          <h3>{product.name}</h3>
          <div className="price">${product.unit_price}</div>
          <a  onClick={()=> addToCart(product.id)} className="primary-btn">Add to cart</a>
          <h4 className="mt-3 mb-2">Product Description</h4>
          <p>{product.description}
          </p>
          <Link to="/">Back to Product List</Link>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}

export default ProductDetails

