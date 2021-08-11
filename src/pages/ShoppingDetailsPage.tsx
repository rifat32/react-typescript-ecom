import React,{useContext} from 'react';
import { AppContext } from '../context';
import { Link } from 'react-router-dom';

const ShoppingDetailsPage = () => {
  const {cartsAny,totalPrice,totalQuantity,deleteSingleCart,clearCart,increase,decrease} = useContext(AppContext)
  const carts = cartsAny();
 
    return (
        <div className="main-content">
          
  <div className="section-content section-content-p30">
    <div className="container-fluid">
      <table className="table table-bordered">
        <tbody><tr>
            <th >Product Image</th>
            <th >Product Detail</th>
            <th  />
          </tr>
          {carts? (carts.length?(
carts.map(el => ( 
  <tr key={el.id}>
  <td><img src={`../${el.image_url}`} className="img-responsive" width="150px" /></td>
  <td>
    <p>{el.name}</p>
    
    <p>${el.unit_price}</p>
  </td>
  <td>
    <div className="items">
      <label>Quantity</label>
      <a onClick={() => decrease(el.id)} className="primary-btn-2 mx-3">-</a>
      {el.quantity}
      <a onClick={() => increase(el.id)} className="primary-btn-2 mx-3">+</a>
    </div>
    <p>Sub-total ${el.unit_price}</p>
    <a onClick={() => deleteSingleCart(el.id)} className="primary-btn">Remove</a>
  </td>
</tr>
          ))

          ):null):null}
         
          {carts?(carts.length?(  <tr>
            <td colSpan={2} />
            <td><b>Total Quantity:{totalQuantity}</b>
              <p>Shipping FREE</p>
              <b>Total Price: ${totalPrice}</b><br />
              <a  className="primary-btn mr-3" onClick={clearCart}>Clear Cart</a>
              <Link to="/checkout" className="primary-btn">Checkout</Link>
            </td>
          </tr>):null):(null)}
        
        </tbody></table>
    </div>
  </div>
</div>

    )
}

export default ShoppingDetailsPage
