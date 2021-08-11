import React, {createContext,useState,useEffect} from 'react';
import { toast } from 'react-toastify';
import { apiClient } from '../utils/apiClient';
import { backEnd } from '../utils/backEnd';

interface Carts {
    id: number,
            product_id: number,
            quantity: number,
            user_id: number,
            order_id: null | number,
            created_at: string | null,
            updated_at: string | null,
            name: string,
            unit_price: string,
            image_url: string
}

const defaultContext = {
    addToCart:(productId:number) => {
       
    },
    setShowLoginFunction:(show:boolean) => {
       
    },
    showLogin:false,
    loggedInFunction:() => {
       
    },
    loggedIn:false,
    loggedOutFunction:() => {
       
    },
    totalPrice:0,
    totalQuantity:0,
    cartsAny :():(Carts[]|null) => {
 return [{
    id: 1,
    product_id: 1,
    quantity: 1,
    user_id: 1,
    order_id: null ,
    created_at: '',
    updated_at: '',
    name: '',
    unit_price: '',
    image_url: ''
 }]
    },
    deleteSingleCart: (id:number) => {
                
    },
    clearCart: () => {

    },
    decrease: (id:number) => {
                
    },
    increase: (id:number) => {
                
    },
    setCartFunction:() => {

    }
    
}

const AppContext = createContext(defaultContext);
const AppProvider :React.FC = ({children}) => {
  ;
  const [showLogin,setShowLogin] = useState(false)
  const [loggedIn,setLoggedIn] = useState(false)
  const [carts,setCarts] = useState<Carts[] | null>(null)
  const [totalPrice,setTotalPrice] = useState(0)
  const [totalQuantity,setTotalQuantity] = useState(0)
  useEffect(()=> {
      initialize()
  },[])
//   @@@@@@@@@@@@@@@@@@@@@ initialize  @@@@@@@@@@@@@@@@@@@@@@@@
  const initialize = () => {
 const token = localStorage.getItem('token');
 if(token) {
    
    loggedInFunction()
   
    
    
 } else {
     setLoggedIn(false)
     setCarts(null)
     setTotalPrice(0)
     setTotalQuantity(0)
 }
  }
//    @@@@@@@@@@@@@@@@@@@@@ get Carts  @@@@@@@@@@@@@@@@@@@@@@@@
  const getCarts = () => {
      apiClient().get(`${backEnd}/user/carts`)
      .then(response => {
          console.log(response)
          setCarts(response.data.carts)
          calculateTotal(response.data.carts)
          
      })
      .catch(err => {
        console.log(err.response)
        if(err.response.status === 401){
            console.log(err.response)
            clear()
        }
          
      })
  }
  // @@@@@@@@@@@@@@@@@@@@@ calculate total  @@@@@@@@@@@@@@@@@@@@@@@@
  const calculateTotal = (carts:(Carts[]|null)) => {
      if(carts){
        let totalPriceC:number = 0, totalQuantityC:number = 0;
        if(carts.length) {
        carts.map(el => {
            totalQuantityC += el.quantity;
            totalPriceC += (parseFloat(el.unit_price) * el.quantity)
            })
        }
        totalPriceC= parseFloat(totalPriceC.toFixed(2));
        setTotalPrice(totalPriceC)
        setTotalQuantity(totalQuantityC)
      } else {
        setTotalPrice(0)
        setTotalQuantity(0)
      }

  }

 // @@@@@@@@@@@@@@@@@@@@@@ add to cart  @@@@@@@@@@@@@@@@@@@@@@@@
    const addToCart = (productId:number):void => {
       const token = window.localStorage.getItem("token");
       if(token){
apiClient().post(`${backEnd}/user/carts`,{
    productId
})
.then(response => {
    console.log(response)
    toast.success("product is added to the cart")
    getCarts()
})
.catch(err => {
    console.log(err.response)
    if(err.response.status === 401){
        console.log(err.response)
       clear()
    }
})
       } else {
        setShowLogin(true)
       }   
    }
     // @@@@@@@@@@@@@@@@@@@@@@ set show login function  @@@@@@@@@@@@@@@@@@@@@@@@
    const setShowLoginFunction = (show:boolean):void => {
setShowLogin(show)
    }
     // @@@@@@@@@@@@@@@@@@@@@@ loggedin function @@@@@@@@@@@@@@@@@@@@@@@@
    const loggedInFunction = () => {
setLoggedIn(true)
setShowLogin(false)
getCarts()

    }
     // @@@@@@@@@@@@@@@@@@@@@@ loggedOut function @@@@@@@@@@@@@@@@@@@@@@@@
    const loggedOutFunction = () => {
        apiClient().post(`${backEnd}/user/logout`)
        .then(response => {
            console.log(response)
          clear()
        })
        .catch(err => {
            console.log(err.response)
            if(err.response.status === 401){
               clear()
            }
            
        })
            }
            const clear = () => {
                localStorage.clear();
                setShowLogin(true)
                setLoggedIn(false)
                setCarts(null)
                setTotalPrice(0)
                setTotalQuantity(0)
              
            }
            const cartsAny = ():(Carts[]|null) => {
                return carts
            }
            const deleteSingleCart = (id:number) => {

apiClient().delete(`${backEnd}/user/carts/${id}`)
.then(response => {
    console.log(response)
const tempCarts = carts;
let indexOfDeletedCart = -1;
 tempCarts?.map((el,index) => {
    if(el.id === id) {
        indexOfDeletedCart = index;
    } 
})
tempCarts?.splice(indexOfDeletedCart,1)
if(tempCarts) {
    setCarts([...tempCarts])
    calculateTotal(tempCarts)
    toast("cart removed successfully");
}

}) .catch(err => {
    console.log(err.response)
    if(err.response.status === 401){
       clear()
    }
})
            }
            const clearCart = () => {
  apiClient().delete(`${backEnd}/user/carts`)
  .then(response => {
setCarts(null)
calculateTotal(null)
toast("cart cleared successfully");
  })
  .catch(err => {
    console.log(err.response)
    if(err.response.status === 401){
       clear()
    }
  })
            }
            const decrease = (id:number) => {
                const tempCarts = carts?.map(el => {
                    if(el.id === id){
                        if(el.quantity > 1) {
                            el.quantity = el.quantity - 1  
                        }
                        return el
                    }
                    else{
                        return el
                    }
                });
                if(tempCarts){
                    setCarts([...tempCarts])
                    calculateTotal([...tempCarts])
                }
                apiClient().put(`${backEnd}/user/carts/${id}`,{
                    incrementDecrement:'decrement'
                })
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err.response)
                    if(err.response.status === 401){
                       clear()
                    }
                  })

                
            }
            const    increase = (id:number) => {
                const tempCarts = carts?.map(el => {
                    if(el.id === id){
                            el.quantity = el.quantity + 1  
                        
                        return el
                    }
                    else{
                        return el
                    }
                });
                if(tempCarts){
                    setCarts([...tempCarts])
                    calculateTotal([...tempCarts])
                }
                apiClient().put(`${backEnd}/user/carts/${id}`,{
                    incrementDecrement:'increment'
                })
                .then(response => {
                    console.log(response)
                   
                })
                .catch(err => {
                    console.log(err.response)
                    if(err.response.status === 401){
                       clear()
                    }
                  })

               
            }
            const setCartFunction = () => {
                setCarts(null);
                calculateTotal(null)

            }
    return (
        <AppContext.Provider value={{ 
            addToCart,
            showLogin,
            setShowLoginFunction,
            loggedInFunction,
            loggedIn,
            loggedOutFunction,
            totalPrice,
            totalQuantity,
            cartsAny,
            deleteSingleCart,
            clearCart,
            decrease,
            increase,setCartFunction
         }}>
            {children}
        </AppContext.Provider>
    )
}

export  {AppProvider , AppContext}
