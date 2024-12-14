import axios from 'axios';
import React, { useState,useEffect,useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner,Button } from 'flowbite-react';
import { API_URL, ROOT_API } from '../../utils';
import CheckoutModel from './misc/checkoutModel';
import { BiCheckDouble } from 'react-icons/bi';
import { useCookies } from 'react-cookie';
import useValidation from './misc/useValidation';
import { useSelector } from 'react-redux';
function OrderComfirmation() {
  const [loding,setLoading]=useState(false);
  const [refr,setRefr]=useState(false)
  const [orders,setOrders]= useState(null);
  const [order,setOrder]= useState(null);

  const [openModal, setOpenModal] = useState(false);
  const firstRenderRef = useRef(true);
  const [err,setErr]=useState(null);
  const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)

  const navigate = useNavigate();


  useEffect(() => {
    
  
    return () => {

      if (firstRenderRef.current) {
        firstRenderRef.current = false;
        getOrders()

      } else {
        setRefr(false);        
      }

     

    }
  }, [refr]);




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

  

  const getOrders = async ()=>{

   // console.log(cookies.tkn);
  
  setErr(null);
  setLoading(true);

  try {
const response = await axios.get(`${API_URL}/order/${getQueryVariable("id")}`,{ headers:{
  'Content-Type': 'application/json',
  "Authorization": "Bearer " + udata.token        
}});

   console.log(response.data.data);
   setRefr(!refr);
   setOrder(response.data.data);
   setLoading(false);
  } catch (error) {

    setLoading(false);
    if(error?.response?.status==401){
      toast.error("unauthorized");
      navigate("/")
    }

    
    console.log(error);
  }

  }








  return (
    <div className='p-3' >

{
  loding?<div className='flex justify-center items-center h-60 ' >

  <Spinner size={'xl'} />
  
    </div>:

<div className='flex flex-col-reverse sm:flex-col-reverse md:flex-row lg:flex-row xl:flex-row '>






  <div className='flex-1' >
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
 <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
     <tr>
         <th scope="col" className="px-6 py-3 rounded-s-lg">
             Product name
         </th>
         <th scope="col" className="px-6 py-3">
             Qty
         </th>
         <th scope="col" className="px-6 py-3 rounded-e-lg">
             Price
         </th>

         <th scope="col" className="px-6 py-3 rounded-e-lg">
             Image
         </th>
     </tr>
 </thead>
 <tbody>
   
 {order&&order.items.map(item=>(

<tr  key={item.id} className="bg-white dark:bg-gray-800">
<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
{item.product.name}
</th>
<td className="px-6 py-4">
{item.qty}
</td>
<td className="px-6 py-4">
${item.price} 
</td>

<td className="px-6 py-4">
<img

src={
  JSON.parse(item.product.img)[0].includes("https")?JSON.parse(item.product.img)[0]
  :`${ROOT_API}/storage/${JSON.parse(item.product.img)[0]}
  `}


className=' w-16 rounded-md shadow-md ' alt="" />
</td>
</tr>

))}
    
  
 </tbody>
 <tfoot>
     <tr className="font-semibold text-gray-900 dark:text-white">
         <th scope="row" className="px-6 py-3 text-base">Total</th>
         
         <td className="px-6 py-3">$ {order?.total_price}</td>
     </tr>

     <tr className="font-semibold text-gray-900 dark:text-white">
         <th scope="row" className="px-6 py-3 text-base">Phone No.:</th>
         
         <td className="px-6 py-3"> {order?.phone}</td>
     </tr>

     <tr className="font-semibold text-gray-900 dark:text-white">
         <th scope="row" className="px-6 py-3 text-base">Address:</th>
         
         <td className="px-6 py-3"> {order?.address}</td>
     </tr>


     <tr className="font-semibold text-gray-900 dark:text-white">
         <th scope="row" className="px-6 py-3 text-base">Status:</th>
         
         <td className="px-6 py-3"> {order?.status}</td>
     </tr>




    
 </tfoot>
</table>
  </div>


  <div className='flex-1 flex mb-8 justify-center flex-col items-center '>
    <div className='bg-green-500 p-8 rounded-full my-3' >
    <BiCheckDouble className='text-6xl text-white ' />

    </div  >
    
    <p className='text-center' > 
     <span className='text-2xl font-bold text-green-500' > Payment Confirmed</span>
      <br/>
      <span className='text-gray-500'>
      The order will fullfilled within 3-5 business days

      </span>
    </p>


    <div className='flex mt-5 gap-x-3' >

<Button onClick={()=>{navigate("/")}}>
  Continue browsing
</Button>


<Button onClick={()=>{navigate("/orders")}} className=' text-blue-900 hover:text-white   bg-transparent' >
  Your orders 
</Button>

    </div>
  



</div>
</div>

}


<CheckoutModel  data={order} openModal={openModal} setOpenModal={setOpenModal}  />


    </div>
  )
}

export default OrderComfirmation