import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Spinner } from 'flowbite-react';
import { API_URL, ROOT_API } from '../../utils';
import { useCookies } from 'react-cookie';
import useValidation from './misc/useValidation';
import { useSelector } from 'react-redux';
function Admin() {
  const [loding,setLoading]=useState(false);
  const [refr,setRefr]=useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['tkn']);
  const [name,setName]= useState("");
  const [email,setEmail]= useState(0);
  const [categories,setcategories]= useState([]); 
  const [password,setPassword]= useState(0);
  const [category,setCategory]= useState(null);
  const [image,setImage]= useState(null);
  const [description,setDescription]=useState("");
 
  const [products,setProducts]= useState([]);
  const [err,setErr]=useState(null);
  const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)

  const navigate = useNavigate();


  useEffect(() => {
    
  
    return () => {
getcategories();
    }
  }, [refr])
  

  const handleAddProduct = async (e)=>{

   // console.log(cookies.tkn);
  


  e.preventDefault();
  setErr(null);
  setLoading(true);
  const data = {name,email,password}

  try {
const response = await axios.post(`${API_URL}/products/add`,{price:password
  ,stock:email,
  name:name,
  category:category,
  image:image,
  description:description
},{ headers:{
  'Content-Type': 'multipart/form-data',
  "Authorization": "Bearer " + udata.token        
}});

   console.log(response);

   if(response.status==201){
    toast.success("Product added!");
    setName("");setPassword("");setCategory(null)
    setEmail("");setDescription("");setImage(null)
setLoading(false)
   }else{
    setLoading(false)

     toast.error("somthing went wrong!")
   }


   setRefr(!refr);
  } catch (error) {
    setLoading(false);
    if(error?.response?.status==422){
      setErr(error.response.data.errors);
       console.log(err)  
    }

    
    console.log(error);
  }

  }


  const getcategories = async ()=>{
    setErr(null);
    setLoading(true);
    try {
  const response =  axios.get(`${API_URL}/categories`);
    const data = await response;
    if(data.status==200){
      console.log(data.data.data.data)
    
   setcategories(data.data.data.data)
  
    }
    
    setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }

    }



  return (
    <div>


      <form className='p-4' onSubmit={(e)=>{handleAddProduct(e)}}>
    


      <label htmlFor="email">name</label>
      <input value={name} onChange={(e)=>{setName(e.target.value)}}  type="text" name='name'  />
      {useValidation(err,'name')}

  <label htmlFor="email">stock</label>
  <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="number" name='email'  />
 {useValidation(err,'stock')}
  <label htmlFor="password">price</label>
  <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="number" name='password'  />
  {useValidation(err,'price')}

  <label htmlFor="description">Description</label>
      <textarea rows={5} value={description} onChange={(e)=>{setDescription(e.target.value)}}  type="text" name='name'  />
      {useValidation(err,'description')}


<div className='flex justify-between' >





<div>
  
<label htmlFor="image">image</label>
  <input multiple onChange={(e)=>{setImage(e.target.files);console.log(e.target.files)}} type="file" name='image'  />
  {useValidation(err,'img')}
</div>


  <div>
    
  <label htmlFor="category">category</label>

<select  className='w-full' value={category} onChange={(e)=>{setCategory(e.target.value)}} id="category" name='category'>

  {categories&&categories.map(category=>(
      
      <option value={category.id}>{category.name}</option>
     
      
      ))}
</select>
{useValidation(err,'category')}
  </div>
</div>


  <button type='submit'>
    {loding? <div className='flex justify-center items-center' > <Spinner/> </div>:<span>   Add product </span>}
  </button>
</form>



    </div>
  )
}

export default Admin