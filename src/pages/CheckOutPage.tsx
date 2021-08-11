import React,{useEffect,useState,useContext} from 'react';
import { toast } from 'react-toastify';
import {AppContext} from '../context'
import { apiClient } from '../utils/apiClient';
import { backEnd } from '../utils/backEnd';

interface User {
    name:string,
    email:string,
}
interface Address {
    
        street:string,
        city:string,
        zipcode:string
    
}
const CheckOutPage = (props:any) => {
    const {totalPrice,totalQuantity,cartsAny,setShowLoginFunction,setCartFunction} = useContext(AppContext)
    const [user,setUser] = useState<User|null>(null)
    const [checked,setChacked] = useState(false);
    const [address,setAddress] = useState<Address>({
        street:'',
        city:'',
        zipcode:''
    })
    useEffect(() => {
        const localUser = localStorage.getItem("user")
        if(localUser){
            const tempUser = JSON.parse(localUser)
            setUser({name:tempUser.name,email:tempUser.email})
        } else {
setShowLoginFunction(true)
        }

    },[])

    const handleChecked = (e:React.ChangeEvent<HTMLInputElement>) => {
    setChacked(e.target.checked)
        
    }
    const handleAddress = (e:React.ChangeEvent<HTMLInputElement>) => {
        setAddress({...address,[e.target.name]:e.target.value})
    }
    const handleSubmit = () => {
     apiClient().post(`${backEnd}/user/orders`,address)
     .then(response => {
         console.log(response)
         setCartFunction()
         props.history.push("/")
         toast('Order has been placed')
         
     })
     .catch(err => {
         console.log(err.response)
     })

    }
    const carts = cartsAny();
    if((!carts?.length) && user){
return  <div   className="noProduct d-flex align-items-center justify-content-center">

   <h3 className="display-3" >
   You have no products in your cart
    </h3>


</div>
    } 
    
    else  {
        return (
            <div className="main-content page-m">
      <div className="section-content section-content-p30 e-spc">
        <div className="container-fluid">
          <div className="form-area">
            <h3>Customer</h3>
            <div className="row">
              <div className="col-md-6">
                <div className="input-space">
                  <input type="text" value={user?.name} readOnly />
                </div>
              </div>
              <div className="col-md-6">
              <div className="input-space">
                  <input type="text" value={user?.email} readOnly />
                </div>
              </div>
           
             
           
       
             
            </div>
          </div>
         
          <div className="form-area">
            <h3>Shipping Address</h3>
            <div className="row">
              <div className="col-md-12">
                <div className="input-space">
                  <input type="text" placeholder="Street" name="street" value={address.street} onChange={handleAddress} />
                </div>
              </div>
              <div className="col-md-12">
                <div className="input-space">
                  <input type="text" placeholder="City" name="city" value={address.city} onChange={handleAddress} />
                </div>
              </div>
             
              <div className="col-md-12">
                <div className="input-space">
                  <input type="text" placeholder="Zip Code / Postal Code" name="zipcode" value={address.zipcode} onChange={handleAddress} />
                </div>
              </div>
            </div>
          </div>
          <div className="input-space">
            <label className="au-checkbox">
              <input type="checkbox" checked={checked} onChange={handleChecked}  />
              <span className="au-checkmark" /> Bill Address same as Shipping Adress
            </label>
          </div>
        
          <div className="form-area">
            <h3>Review Your Order</h3>
            <b>Total Quantity: {totalQuantity}</b>
            <h4>Shipping: FREE</h4>
            <b>Total Price: ${totalPrice}</b>
          </div>
          <div className="text-center">
            <button onClick={handleSubmit} className="btn btn-primary" disabled={(!checked || !address.city || !address.street || !address.zipcode)} >Purchase </button>
          </div>
        </div>
      </div>
    </div>
    
        )
    }
    
}

export default CheckOutPage
