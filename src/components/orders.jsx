import axios from 'axios';
import React, { useState,useEffect,useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner,Button } from 'flowbite-react';
import { API_URL, ROOT_API } from '../../utils';
import CheckoutModel from './misc/checkoutModel';
import { useCookies } from 'react-cookie';
import useValidation from './misc/useValidation';
import { useSelector } from 'react-redux';
function Orders() {
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
  }, [refr])
  

  const getOrders = async ()=>{

   // console.log(cookies.tkn);
  
  setErr(null);
  setLoading(true);

  try {
const response = await axios.get(`${API_URL}/order/list`,{ headers:{
  'Content-Type': 'application/json',
  "Authorization": "Bearer " + udata.token        
}});

if(response.status==200){
  setOrders(response.data.data.data);
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








  return (
    <div className='p-3' >

{
  loding?<div className='flex justify-center items-center h-60 ' >

  <Spinner size={'xl'} />
  
    </div>:
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 rounded-s-lg">
                    Order number
                </th>
                <th scope="col" className="px-6 py-3">
                    Details
                </th>
                <th scope="col" className="px-6 py-3 rounded-e-lg">
                    Total price
                </th>

                <th scope="col" className="px-6 py-3 rounded-e-lg">
                    Status
                </th>
            </tr>
        </thead>
        <tbody>
          
        {orders&&orders.map(order=>(

<tr  key={order.id} className="bg-white dark:bg-gray-800">
<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
{order.order_number}
</th>
<td className="px-6 py-4">
<Button onClick={()=>{setOrder(order);setOpenModal(true)}} > Details </Button>
</td>
<td className="px-6 py-4">
${order.total_price} 
</td>

<td className="px-6 py-4">
{order.status}
</td>
</tr>

))}
           
         
        </tbody>
        <tfoot>
            {/* <tr className="font-semibold text-gray-900 dark:text-white">
                <th scope="row" className="px-6 py-3 text-base">Subtotal</th>
                <td className="px-6 py-3">{qty}</td>
                <td className="px-6 py-3">$ {total}</td>
            </tr> */}
           
        </tfoot>
    </table>
}


<CheckoutModel  data={order} openModal={openModal} setOpenModal={setOpenModal}  />


    </div>
  )
}

export default Orders