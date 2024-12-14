
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Button } from 'flowbite-react';
import { useCookies } from 'react-cookie';
import { login } from '../../lib/actions/cartActions';
import { API_URL } from '../../../utils';
import useValidation from '../misc/useValidation';
function Login() {
  const [loding,setLoading]=useState(false)
  const [name,setName]= useState("");
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const [err,setErr]=useState(null);
  const navigate = useNavigate();
const dispatch = useDispatch()

  const [cookies, setCookie, removeCookie] = useCookies(['tkn']);


  const handleRegister = async (e)=>{

  e.preventDefault();
  setErr(null);
  setLoading(true);
  const data = {email,password}

  try {
const response = await axios.post(`${API_URL}/user/login`,data);
   console.log( response.data.user.role);

   if(response.status==200){

   toast.success("Welcome back!");
    dispatch(login(response.data)); 
    switch(response.data.user.role){
    case 'admin':
      navigate('/admin')
    break;

    case 'user':
      navigate('/')
    break;

    default :
      navigate('/')
    break;
    }
   }else{
    
   }

   //console.log(cookies);

  } catch (error) {
    setLoading(false);
    if(error?.response?.status==422){
      setErr(error.response.data.errors);
      toast.error("Validation error.");

       //console.log(err)  
    }else{

      toast.error(error.response.data.error);
      //console.log(error.response.data.error);
    }

  }

  }

  return (
    <div>
      
      <form onSubmit={(e)=>{handleRegister(e)}}>
    <h2> Login to your account </h2>
  <label htmlFor="email">Email</label>
  <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" name='email'  />
 {useValidation(err,'email')}
  <label htmlFor="password">password</label>
  <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" name='password'  />
  {useValidation(err,'password')}

  <button type='submit'>login</button>
</form>
    </div>
  )
}

export default Login