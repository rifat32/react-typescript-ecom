import React,{useState,useContext} from 'react'
import { withRouter } from 'react-router-dom'
import { AppContext } from '../../context'

const HeaderDesktop:React.FC   = (props:any) => {
  const {setShowLoginFunction,loggedOutFunction,loggedIn,totalPrice,totalQuantity} = useContext(AppContext)
 const [search,setSearch] = useState('')
 
 const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
   e.preventDefault()
  props.history.push(`/search/${search}`)
 }
 const goToCart = () => {
  const token = window.localStorage.getItem("token")
  if(token){
    props.history.push(`/cart-details`)
  } else {
    setShowLoginFunction(true)
  }
  
}
    return (
      <header className="header-desktop">
  <div className="section-content section-content-p30">
    <div className="container-fluid">
      <div className="header-wrap">
        <form className="form-header" onSubmit={handleSubmit} >
          <input className="au-input au-input-xl" onChange={(e) => setSearch(e.target.value)} value={search} type="text" name="search" placeholder="Search for data ..." />
          <button className="au-btn-submit" type="submit">
            Search
          </button>
        </form>
        {
loggedIn? <a className="btn btn-danger text-light" onClick={loggedOutFunction}>
Logout
</a>:<a style={{ background:"#205b8d" }} className="btn btn-primary text-light" onClick={() => setShowLoginFunction(true)}>
Login
</a>
        }
       
        <div onClick={goToCart} className="cart-area d-n">
          <a >
            <div className="total">{totalPrice} <span> {totalQuantity}</span> </div> <i className="fa fa-shopping-cart" aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="account-wrap" />
    </div>
  </div>
</header>

    )
}

export default withRouter(HeaderDesktop)
