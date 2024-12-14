import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from 'flowbite-react';
import { API_URL, ROOT_API } from '../../utils';
import { useRef } from 'react';
import useValidation from './misc/useValidation';
import Category from './misc/category';
import Product from './misc/product';
function Home() {
  const [loding,setLoading]=useState(false);
  const [categories,setCategories]= useState(null);
  const [catID,setCatID]= useState(0);
  const [products,setProducts]= useState([]);
  const [err,setErr]=useState(null);

  const navigate = useNavigate();
  const [refr,setRefr] = useState(true);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    

    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      getProducts()
    } else {
      setRefr(false);        
    }


   
    // return () => {


      
    // }
  }, [])
  


  const getProducts = async (cid)=>{
    setErr(null);
    setLoading(true);

    try {
  const response = axios.get(`${API_URL}/products/${cid?cid:0}`);
    const data = await response;
    if(data.status==200){
      console.log(data)
      setProducts(data.data.products);
      setCategories(data.data.categories.data)
  
    }
    
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


    const handleCatChange =(cid)=>{
 
   getProducts(cid)
    }


  return (
    <div>

      {
        loding?<div className='w-full h-60 flex justify-center items-center' >
        <Spinner size='xl' />
        </div>:
        <div>
          <div className=' flex overflow-x-scroll  gap-x-2  px-2 shadow-lg bg-blue-950' >

          <Category setGID={(cid)=>{handleCatChange(cid)}} key={0} data={{id:0,name:"All"}}  />

          {categories&&categories.map(category=>(
        
       <Category  setGID={(cid)=>{handleCatChange(cid)}}  key={category.id} data={category}  />
        
        ))}
         
          </div>
        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 md:grid-cols-4 xl:grid-cols-5 gap-2 ' >

        {products.data&&products.data.map(product=>(
        
        <Product key={product.id} data={product} / >
        
        ))}
        
        </div>
        </div>
      }



    </div>
  )
}

export default Home