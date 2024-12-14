import {Reac,useState,useEffect} from 'react'
import { ROOT_API } from '../../../utils'
import { decrement,increment } from '../../lib/actions/cartActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle,FaMinusCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Modal,Button } from 'flowbite-react';
import { FaTrash } from 'react-icons/fa';
function Cart(props) {


const navigate = useNavigate();
const dispatch = useDispatch();
const [total,setTotal]=useState(0);
useEffect(() => {
    let ttl=0;
    props.data.forEach(element => {
        ttl = ttl + (element.data.price*element.qty);
    });

    setTotal(ttl);

 
}, [props.data])



  return (

    <Modal show={props.openModal} onClose={() => props.setOpenModal(false)}>

     <div> 
    <Modal.Header>Cart</Modal.Header>
    <Modal.Body>
    <div className='flex flex-col gap-y-2' >
    {props.data&&props.data.map(product=>(
<div key={product.selvar} className='flex justify-between items-center' >
  
<div>
{product.name}
</div>


<div>
{product.data.price} $
</div>


<div className='flex gap-x-3 items-center text-blue-500 ' >

<div  onClick={()=>{
    dispatch(increment({id:product.selvar,stock:product.data.stock}));
}} className='text-2xl' >
    <FaPlusCircle/>
</div>
<div className='text-xl ' >
{product.qty}
</div>

<div onClick={()=>{
    dispatch(decrement({id:product.selvar,stock:product.data.stock}));
}}  className='text-2xl'  >
    <FaMinusCircle/>
</div>
</div>



<div className='flex gap-x-3 items-center ' >
<img src={`${ROOT_API}/storage/${product.img}`} className=' w-12 rounded-md shadow-md ' alt="" />

<div onClick={()=>{ props.handleCartRemove(product)}}  className='bg-red-400  rounded-full flex justify-center items-center shadow-md w-10  h-10' >
<FaTrash className='text-white text-xs ' />
</div>

</div>





</div>

))}
    </div>
    </Modal.Body>

    <Modal.Footer>
      <div className='flex w-full items-center justify-between' >

      <div className='text-xl font-bold text-blue-500' >
            Total: ${total}
        </div>
        <div className='flex gap-x-2' >

        <Button color="gray" onClick={() => props.setOpenModal(false)}>
        Hide
      </Button>
        {props.udata&&props.udata.user&&props.udata.user?  <Button onClick={() => {
          if(props.data.length==0){ toast.warn("Empty cart, add products to continue");return }
          props.setOpenModal(false);navigate("/checkout")}}> Checkout</Button> :
         <Button onClick={() => {props.setOpenModal(false);navigate("/login")}}> Sign in to complete checkout</Button>}
        </div>

      









      </div>
      
    </Modal.Footer>
    </div>  
  </Modal>
  

)
}

export default Cart