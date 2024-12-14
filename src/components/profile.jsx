import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../lib/actions/cartActions';
import { useSelector } from 'react-redux';
import { Spinner } from 'flowbite-react';
import { API_URL, ROOT_API } from '../../utils';
import { useRef } from 'react';
import useValidation from './misc/useValidation';
import Product from './misc/product';
function Profile() {
  const [loding,setLoading]=useState(false);

  const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)
const dispatch = useDispatch();
  const [user,setUser]= useState(null);
  const [name,setName]= useState("");
  const [phone,setPhone]=useState(null);
  const [address,setAdress]=useState(null);
  const [email,setEmail]= useState("");
  const [products,setProducts]= useState([]);
  const [err,setErr]=useState(null);
  const navigate = useNavigate();
  const [refr,setRefr] = useState(true);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    

    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      getUser()
    } else {
      setRefr(false);        
    }


   
    // return () => {


      
    // }
  }, [])
  


  const getUser = async ()=>{

    // console.log(cookies.tkn);
   
   setErr(null);
   setLoading(true);
 
   try {
 const response = await axios.get(`${API_URL}/user/me`,{ headers:{
   'Content-Type': 'application/json',
   "Authorization": "Bearer " + udata.token        
 }});
 
 if(response.status==200){
  console.log(response.data.data);
   setEmail(response.data.data.email);
   setName(response.data.data.name);
   setPhone(response.data.data.phone);
   setAdress(response.data.data.address);


 }else{
   toast.warn("somthing went wrong!")
 }
 
 
    console.log(response.data.data.data);
    setRefr(!refr);
    
    setLoading(false);
   } catch (error) {
 
     setLoading(false);
     if(error?.response?.status==422){
       setErr(error.response.data.errors);
        console.log(err)  
     }
 
     
     console.log(error);
   }
   }



   
  const HandleUserUpdate = async (e)=>{

    e.preventDefault();
   
 
      try {
    const  response = await axios.post(`${API_URL}/user/update`,{
      phone:phone,
      name:name,
      address:address
    },{ headers:{
       'Content-Type': 'application/json',
      "Authorization": "Bearer " + udata.token        
    }});
    
      //  console.log( response.data.data.id);
   
       if(response.status==200){
        toast.success("Information updated!");
        dispatch(login(response.data)); 
        console.log(response.data);

         // getUser();
         }else{
           toast.warn("somthing went wrong!")
         }
         
      
      } catch (error) {
       // setLoading(false);
        if(error?.response?.status==422){
         // setErr(error.response.data.errors);
           console.log(err)  
        }  
        console.log(error);}}




  return (
    <div>

      {
        loding?<div className='w-full h-60 flex justify-center items-center' >
        <Spinner size='xl' />
        </div>:
        <div className='' >


<form onSubmit={(e)=>{HandleUserUpdate(e)}}>
     <h2>Update information</h2>

      <label htmlFor="email">name</label>
      <input  value={name} onChange={(e)=>{setName(e.target.value)}}  type="text" name='name'  />
      {useValidation(err,'name')}

  <label htmlFor="email">Email</label>
  <input disabled className='bg-gray-300' value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" name='email'  />
 {useValidation(err,'email')}

 <label htmlFor="phone">Phone</label>
  <input value={phone} onChange={(e)=>{setPhone(e.target.value)}} type="text" name='phone'  />
 {useValidation(err,'phone')}


 <label htmlFor="address">Address</label>
  <input value={address} onChange={(e)=>{setAdress(e.target.value)}} type="text" name='address'  />
 {useValidation(err,'address')}



  <button type='submit'>
    Update
  </button>
</form>

     
        
        </div>
      }



    </div>
  )
}

export default Profile