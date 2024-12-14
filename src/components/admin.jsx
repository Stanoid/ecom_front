import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
      getProducts()
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

   }else{
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




  const getProducts = async ()=>{
    setErr(null);
    setLoading(true);

    try {
  const response = axios.get(`${API_URL}/products`);
    const data = await response;
    console.log(data.data.data.data)
    setProducts(data.data.data.data)

    } catch (error) {
      setLoading(false);
      if(error?.response?.status==422){
        setErr(error.response.data.errors);
         console.log(err)  
      } 
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

  <label htmlFor="category">category</label>
  <input value={category} onChange={(e)=>{setCategory(e.target.value)}} type="number" name='category'  />
  {useValidation(err,'category')}


  <label htmlFor="image">image</label>
  <input multiple onChange={(e)=>{setImage(e.target.files);console.log(e.target.files)}} type="file" name='image'  />
  {useValidation(err,'img')}
  <button type='submit'>Add product</button>
</form>

<div className='m-3' >

{products&&products.map(product=>(


<div className="my-3 flex justify-between bg-red-400 p-3 rounded-md"  key={product.id}>
<div>{product.name}</div>
<div>{product.price}</div>
<img className='w-32' src={`${ROOT_API}/storage/${product.img}`} alt="" />

</div>
))}


</div>

    </div>
  )
}

export default Admin