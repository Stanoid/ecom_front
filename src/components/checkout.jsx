import {React,useEffect,useState} from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../utils';
import { useNavigate } from 'react-router-dom'
import { ROOT_API } from '../../utils';
import { toast } from 'react-toastify';
function Checkout(props) {
  const navigate = useNavigate();
  const [total,setTotal]=useState(0);
  const [qty,setQty]=useState(0);
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState(null);

  const [address,setAdress]=useState(null);


  const cartData = useSelector((state) => state.root.cart.data&&state.root.cart.data)
  const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)

  useEffect(() => {
    
    let ttl=0;
    let qty=0
    cartData.forEach(element => {
        ttl = ttl + (element.data.price*element.qty);
        qty+=element.qty;
    });

    setTotal(ttl);
    setQty(qty);
  
  }, [cartData])



  
  const handlePlaceOrder = async (e)=>{

   
 if(address==null||phone==null){
    toast.warn("Phone and address are requiered");
    return
 }

//    setErr(null);
//    setLoading(true);

let orderItems =[];

cartData.forEach(element => {
   orderItems.push(
    {id:element.selvar,qty:element.qty }
)
});

 
 
   try {
 const  response = await axios.post(`${API_URL}/order/place`,{cart:orderItems,phone:phone,address:address},{ headers:{
    'Content-Type': 'application/json',
   "Authorization": "Bearer " + udata.token        
 }});
 
    console.log( response.data.data.id);

    if(response.status==200){
       navigate(`/orderConfirmation?id=${response.data.data.id}`)
      }else{
        toast.warn("somthing went wrong!")
      }
      
   
   } catch (error) {
    // setLoading(false);
     if(error?.response?.status==422){
      // setErr(error.response.data.errors);
        console.log(err)  
     }
 
     
     console.log(error);
   }
 
   }
  
  return (


    
  <div className='flex w-full flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row '>
    <div  className=' p-3 flex-1'>
    <div className='flex flex-col gap-y-2' >

<div className="relative overflow-x-auto mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 ">

<p className="text-xl mb-2 font-medium">Order summery</p>
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
          
        {cartData&&cartData.map(product=>(

<tr  key={product.selvar} className="bg-white dark:bg-gray-800">
<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
{product.name}
</th>
<td className="px-6 py-4">
{product.qty}
</td>
<td className="px-6 py-4">
${product.data.price} 
</td>

<td className="px-6 py-4">
<img 



src={
  product.img.includes("https")?product.img
  :`${ROOT_API}/storage/${product.img}
  `}


className=' w-16 rounded-md shadow-md ' alt="" />
</td>
</tr>

))}
           
         
        </tbody>
        <tfoot>
            <tr className="font-semibold text-gray-900 dark:text-white">
                <th scope="row" className="px-6 py-3 text-base">Subtotal</th>
                <td className="px-6 py-3">{qty}</td>
                <td className="px-6 py-3">$ {total}</td>
            </tr>
           
        </tfoot>
    </table>
</div>



    </div>
    </div>

<div className='flex-1 ' >
<div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
  <p className="text-xl font-medium">Payment Details</p>
  <p className="text-gray-400">Complete your order by providing your payment details.</p>
  <div className="">
    <label htmlFor="phone" className="mt-4 mb-2 block text-sm font-medium">Phone</label>
    <div className="relative">
      <input type="text" id="phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}} name="phone" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="002499xxxxxx" />
    </div>
    <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">Card Holder</label>
    <div className="relative">
      <input type="text" id="card-holder" name="card-holder" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
      <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
        </svg>
      </div>
    </div>
    <label htmlFor="card-no" className="mt-4 mb-2 block text-sm font-medium">Card Details</label>
    <div className="flex">
      <div className="relative w-7/12 flex-shrink-0">
        <input type="text" id="card-no" name="card-no" className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="xxxx-xxxx-xxxx-xxxx" />
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
          </svg>
        </div>
      </div>
      <input type="text" name="credit-expiry" className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="MM/YY" />
      <input type="text" name="credit-cvc" className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="CVC" />
    </div>
    <label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
    <div className="flex flex-col sm:flex-row">
      <div className="relative flex-shrink-0 sm:w-7/12">
        <input value={address} onChange={(e)=>{setAdress(e.target.value)}}  type="text" id="billing-address" name="billing-address" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address" />
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <img className="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg" alt="" />
        </div>
      </div>
      <select type="text" name="billing-state" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
        <option value="State">State</option>
      </select>
      <input type="text" name="billing-zip" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP" />
    </div>

    
    <div className="mt-6 border-t border-b py-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Subtotal</p>
        <p className="font-semibold text-gray-900">${total}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Shipping - free shipping</p>
        <p className="font-semibold text-gray-900">$0</p>
      </div>
    </div>
    <div className="mt-6 flex items-center justify-between">
      <p className="text-sm font-medium text-gray-900">Total</p>
      <p className="text-2xl font-semibold text-gray-900">${total}</p>
    </div>
  </div>
  <button onClick={()=>{handlePlaceOrder()}} className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
</div>
</div>
  </div>

)
}

export default Checkout