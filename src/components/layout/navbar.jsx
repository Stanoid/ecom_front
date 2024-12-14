import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ROOT_API } from '../../../utils'
import { useDispatch } from 'react-redux'
import { BiStoreAlt } from 'react-icons/bi'
import { Dropdown } from 'flowbite-react'
import { FaShoppingBag } from 'react-icons/fa'
import { FaSignOutAlt,FaUserAlt,FaListAlt } from 'react-icons/fa'
import { CgAdd } from 'react-icons/cg'
import { toast } from 'react-toastify'
import { login } from '../../lib/actions/cartActions'
import Cart from '../misc/cart'
import { API_URL } from '../../../utils'
import axios from 'axios'
import { Button, Modal } from "flowbite-react";
import { removeFromCart } from '../../lib/actions/cartActions'

function NavBar() {

  const navigate = useNavigate();
  const udata = useSelector((state) => state.root.auth.data&&state.root.auth.data)
  const cartData = useSelector((state) => state.root.cart.data&&state.root.cart.data)
  const [openModal, setOpenModal] = useState(false);
const dispatch = useDispatch();
  const handleCartRemove=(prd)=>{

    dispatch(removeFromCart(
      {id: prd.selvar}
     ));

     toast.success("Product removed from cart")

  }

  
  const handleLogOut = async ()=>{

  
    try {
  const response = await axios.post(`${API_URL}/user/logout`,{},{ headers:{
    'Content-Type': 'application/json',
    "Authorization": "Bearer " + udata.token        
  }});


     console.log(response);

     if(response.status==200){
  
     toast.success("Logged out!");
     dispatch(login({})); 
     navigate("/login")

      
     }else{
      toast.error("Something went wrong!");
     }
  
  
    } catch (error) {
   
  
      //  toast.error(error.response.data.error);
      toast.error("Somthing went wrong  with your logout")
      dispatch(login({})); 
      navigate("/")
        console.log(error);
      
  
    }
  
    }


 
  return (
  <div className='bg-blue-400 py-4 flex justify-between items-center px-2'>
    <div className='px-4' >
    <Link className='text-5xl text-white '  to={'/'}> 
    <BiStoreAlt/>
    </Link>
    </div>


     <div className='flex items-center gap-x-2' >
     
     <div onClick={()=>{setOpenModal(true)}} className=' p-3 rounded-full bg-white shadow-lg ' >
        <FaShoppingBag className='text-xl' />
        <div className='absolute top-2 flex justify-center items-center text-xs font-bold -ml-5 w-5 h-5 rounded-full bg-red-600 text-white ' >
          {cartData.length}
        </div>
      </div>


      {udata.user?<div className='flex flex-row-reverse items-center  gap-x-2' >
      
   
     
        <Dropdown label={`${udata.user.name}`} dismissOnClick={false}>
        <Dropdown.Header>
        <span className="block text-sm">{udata.user.name}</span>
        <span className="block truncate text-sm font-medium"> {udata.user.email} 
        {
          udata.user?.role=='admin'?
           <span> ({ udata.user.role})</span>
          :
          <span></span>
        }
         </span>    
      </Dropdown.Header>

      {
         udata.user?.role=='admin'?
          <>
          <Dropdown.Item onClick={()=>{navigate("/admin")}}  icon={CgAdd} >Add Product</Dropdown.Item>
        
          </>
         :
         <>
        <Dropdown.Item onClick={()=>{navigate("/profile")}}  icon={FaUserAlt} >Profile</Dropdown.Item>
        <Dropdown.Item onClick={()=>{navigate("/orders")}}  icon={FaListAlt} >Orders</Dropdown.Item>



         </>


      }





      <Dropdown.Divider />
  

      <Dropdown.Item onClick={()=>{handleLogOut()}} icon={FaSignOutAlt} className='text-red-600'  >Sign out</Dropdown.Item>
    </Dropdown>


 

    
      </div>:<div >
        <Link className='navtab' to={'/login'}> login</Link>
        <Link className='navtab' to={'/register'}> register</Link>
      </div>  }

   
   
     </div>

<Cart udata={udata} data={cartData} openModal={openModal} handleCartRemove={handleCartRemove}  setOpenModal={setOpenModal}  />
   
   
  </div>


  )
}

export default NavBar