import React,{useContext,useState} from 'react'
import { AppContext } from '../../context'
import LoginForm from '../Forms/LoginForm'
import RegisterForm from '../Forms/RegisterForm'

enum AuthSwitch {
  LOGIN,
  REGISTER
}
const Auth = () => {
    const {setShowLoginFunction} = useContext(AppContext)
    const [auth,setAuth] = useState(AuthSwitch.LOGIN)
   
    return (
        <div id="myModal" className="modal">
  <div className="modal-content">

    <div className="row  pt-3">
      <div className="col-10 px-5">
      {
        auth === AuthSwitch.LOGIN?    <h3>Welcome! Please Login to continue.</h3>:
        <h3>Create your  Account</h3>
     
      }
   
      {
        auth === AuthSwitch.LOGIN? <p>New member?  <button className="text-primary" onClick={() => setAuth(AuthSwitch.REGISTER)}>Register here.</button> </p>:
        <p> Already member?  <button className="text-primary" onClick={() => setAuth(AuthSwitch.LOGIN)}>Login here.</button> </p>
      }
     
      </div>
      <div className="col-2 d-flex justify-content-center">
      <span className="close" onClick={() => setShowLoginFunction(false)}>×</span>
      </div>
     
    </div>
    <div className="modal-body">
        {
          auth === AuthSwitch.LOGIN?<LoginForm/>:<RegisterForm/>
        }
     
    </div>
  
  </div>
</div>


    )
}

export default Auth
