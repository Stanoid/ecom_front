import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { API_URL } from '../../../utils';
import { login } from '../../lib/actions/cartActions';
import { useDispatch } from 'react-redux';
import useValidation from '../misc/useValidation';
function Register() {
  const [loding,setLoading]=useState(false);

  const [name,setName]= useState("");
  const [phone,setPhone]=useState(null);
  const [address,setAdress]=useState(null);
  const [email,setEmail]= useState("");
  
  const dispatch = useDispatch();
  const [password,setPassword]= useState("");
  const [err,setErr]=useState(null);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['tkn']);


  const handleRegister = async (e)=>{
  e.preventDefault();
  setErr(null);
  setLoading(true);
  const data = {name,email,password,phone,address}

  try {
const response = await axios.post(`${API_URL}/user/register`,data);
//console.log(data)
    //setLoading(false); setName(""),setEmail("");setPassword("");
    //toast.success((await response).data.message);
   // navigate('/login')
   //console.log( await response);
//console.log(response)
   if(response.status==201){

    toast.success("Welcome Abroad!");
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
 



  } catch (error) {
    setLoading(false);
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
     <h2>Create a new account</h2>

      <label htmlFor="email">name</label>
      <input value={name} onChange={(e)=>{setName(e.target.value)}}  type="text" name='name'  />
      {useValidation(err,'name')}

  <label htmlFor="email">Email</label>
  <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" name='email'  />
 {useValidation(err,'email')}

 <label htmlFor="phone">Phone</label>
  <input value={phone} onChange={(e)=>{setPhone(e.target.value)}} type="text" name='phone'  />
 {useValidation(err,'phone')}


 <label htmlFor="address">Address</label>
  <input value={address} onChange={(e)=>{setAdress(e.target.value)}} type="text" name='address'  />
 {useValidation(err,'address')}


  <label htmlFor="password">password</label>
  <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" name='password'  />
  {useValidation(err,'password')}

  <button type='submit'>Create account</button>
</form>
    </div>
  )
}

export default Register