import axios from 'axios'
import React,{useState,useContext} from 'react'
import { backEnd } from '../../utils/backEnd'
import {AppContext} from '../../context'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
interface Login {
    email:string;
    password:string
}
const override = css`
border-color: black;
`;
const LoginForm = () => {
    const {loggedInFunction} = useContext(AppContext)
    const [state,setState] = useState<Login>({
 email:'',
 password:''
    })
    const [loading,setLoading] = useState(false)
    const [err,setErr] = useState('')
    
   const  handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
setState({...state,[e.target.name]:e.target.value})
   }
   const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    setErr('')
    axios.post(`${backEnd}/login`,{
        email:state.email,
        password:state.password
    })
    .then(response => {
        setLoading(false)
        setState({email:'',password:''})
        console.log(response.data)
        localStorage.setItem('user',JSON.stringify(response.data.user))
        localStorage.setItem('token',response.data.token)
        const token =  localStorage.getItem('token')

            loggedInFunction();
        
        

    })
    .catch(err => {
        setLoading(false)
        setErr(err.response.data.message)
        console.log(err.response)
    })
    }
    return (
        <div className="row">
            <div className="col-6 offset-3">
            <form onSubmit={handleSubmit} >
          <div className="form-group" >
              <label htmlFor="email">Email</label>
   <input type="email" required id="email" name="email" onChange={handleChange} value={state.email} className="form-control" placeholder="Email" />
          </div>
          <div className="form-group" >
              <label htmlFor="password">Password</label>
   <input type="password" required id="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} value={state.password} />
          </div>
          {
              loading? <div className="text-center">
              <ClipLoader  loading={loading} css={override} size={35} >loading</ClipLoader>
              </div>:null
          }
           {
              err? <div className="text-center text-danger">
              <small >{err}</small>
              </div>:null
          }
         
          
          <button type="submit" disabled={(!state.email || !state.password)} className="btn btn-block btn-primary">Submit</button>
      </form>
            </div>
        </div>
    )
}

export default LoginForm
