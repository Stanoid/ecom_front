import axios from 'axios';
import React, { useState,useEffect,useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, ROOT_API } from '../../utils';
import { addToCart,removeFromCart } from '../lib/actions/cartActions';
import { Spinner } from 'flowbite-react';
import { useDispatch,useSelector } from 'react-redux';
import useValidation from './misc/useValidation';
import { useSearchParams } from 'react-router-dom';
import Product from './misc/product';
function ProductDetails() {
  const [loding,setLoading]=useState(false);
  const cartData = useSelector((state) => state.root)
  const [ind,setInd]= useState(0);
  const [category,setCategory]= useState(null);
  const [images,setImages]= useState(null);
  const [product,setProduct]= useState(null);
  const [err,setErr]=useState(null);
  const navigate = useNavigate();
  const [refr,setRefr] = useState(true);
  const firstRenderRef = useRef(true);
  const dispatch = useDispatch();
  useEffect(() => {
    

    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      getProduct()
    } else {
      setRefr(false);        
    }
  

    
  }, [])


  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
      }
    } 
  }
  

//   const handleAddProduct = async (e)=>{
//   e.preventDefault();
//   setErr(null);
//   setLoading(true);
//   const data = {name,email,password}

//   try {
// const response = axios.post(`${API_URL}/products/add`,{price:password,stock:email,name:name,category:category,image:image},{ headers:{
//   'Content-Type': 'multipart/form-data',
//   "Authorization": "Bearer 1|0APqmA0czI28Nb0wdaueOzpyjPVeuW50HtejiAfI31c32fcd"        
// }});

//    console.log( await response);
//    setRefr(!refr);
//   } catch (error) {
//     setLoading(false);
//     if(error?.response?.status==422){
//       setErr(error.response.data.errors);
//        console.log(err)  
//     }

    
//     console.log(error);
//   }

//   }




  const getProduct = async ()=>{
   
    setErr(null);
    setLoading(true);

    try {
  const response = axios.get(`${API_URL}/product/${getQueryVariable("id")}`);
    const data = await response;
    setProduct(data.data.data)
    setImages(JSON.parse(data.data.data.img));
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



    const handleAddToCart = ()=>{


    
        dispatch(addToCart({ 
         data: product&&product, 
         selvar: product&&product.id, 
         name:product&&product.name,
         img: images&&images[0],
         qty: 1,
       }))
          
      //console.log(cartData);
       
      toast.success("Product added to cart")
      

    }


  return (
    <div className=' flex flex-col sm:flex-col md:flex-row-reverse lg:flex-row-reverse xl:flex-row-reverse justify-between gap-4 p-4' >

{
  loding? <div className='flex justify-center w-full items-center h-60 ' >

<Spinner size={'xl'} />

  </div>:
<>
<div className='flex flex-col flex-1 items-center justify-center gap-y-4'  >

<div className=' flex justify-center items-center ' >
  <img src={`${ROOT_API}/storage/${images&&images[ind]}`} className='w-1/2 rounded-md shadow-md ' alt="" />
</div>

<div className='flex gap-x-4 ' >
{images&&images.map((img,index)=>(
<img    onClick={()=>{setInd(index)}}  key={index} className={`${index==ind? 'border-4'  : 'border-0' } border-blue-500 shadow-md rounded-md  h-12 `}   src={`${ROOT_API}/storage/${img}`} />

))}</div>
</div>

<div className='flex-1' >

<div className='text-3xl  font-bold' > {product&&product.name} </div>
<p className='font-bold text-xl' > {product&&product.description} </p>
<div> Price: {product&&product.price} </div>
<div> Stock: {product&&product.stock} </div>

      <div className='w-full xl:w-40 lg:w-40 md:w-40 ' >
      <button className='cbtn' onClick={()=>{handleAddToCart()}}  > Add to cart </button>
      </div>

</div>
</>
}







    </div>
  )
}

export default ProductDetails