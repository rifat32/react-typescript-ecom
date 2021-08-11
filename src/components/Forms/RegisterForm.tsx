import axios from 'axios'
import React,{useState,useContext} from 'react'
import { backEnd } from '../../utils/backEnd'
import {AppContext} from '../../context'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
interface Login {
    name:string,
    email:string;
    password:string,
    password_confirmation:string
}
const override = css`
border-color: black;
`;
const RegisterForm = () => {
    const {loggedInFunction} = useContext(AppContext)
    const [state,setState] = useState<Login>({
 name:'',
 email:'',
 password:'',
 password_confirmation:''
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
    axios.post(`${backEnd}/register`,{
        name:state.name,
        email:state.email,
        password:state.password,
        password_confirmation:state.password_confirmation
    })
    .then(response => {
        setLoading(false)
        setState({email:'',password:'',name:'',password_confirmation:''})
        console.log(response.data)
        localStorage.setItem('user',JSON.stringify(response.data.user))
        localStorage.setItem('token',response.data.token)
        loggedInFunction();

    })
    .catch(err => {
        setLoading(false)
         setErr(err.response.data.errors[0])
        console.log(err.response)
    })
    }
    return (
        <div className="row">
            <div className="col-6 offset-3">
            <form onSubmit={handleSubmit} >
            <div className="form-group" >
              <label htmlFor="name">Name</label>
   <input type="text" required id="name" name="name" onChange={handleChange} value={state.name} className="form-control" placeholder="Name" />
          </div>
          <div className="form-group" >
              <label htmlFor="email">Email</label>
   <input type="email" required id="email" name="email" onChange={handleChange} value={state.email} className="form-control" placeholder="Email" />
          </div>
          <div className="form-group" >
              <label htmlFor="password">Password</label>
   <input type="password" required id="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} value={state.password} />
          </div>
          <div className="form-group" >
              <label htmlFor="password_confirmation">Confirm Password</label>
   <input type="password" required id="password_confirmation" name="password_confirmation" className="form-control" placeholder="Confirm Password" onChange={handleChange} value={state.password_confirmation} />
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
         
          
          <button type="submit" disabled={(!state.email || !state.password || !state.name || !state.password_confirmation)} className="btn btn-block btn-primary">Submit</button>
      </form>
            </div>
        </div>
    )
}

export default RegisterForm
