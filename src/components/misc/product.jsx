import React from 'react'
import { ROOT_API } from '../../../utils'
import { useNavigate } from 'react-router-dom'
function Product(props) {
  const navigate = useNavigate();

  return (

    <div onClick={()=>{navigate(`/product?id=${props.data.id}`)}} className="my-3 flex justify-between flex-col shadow-md p-4 rounded-md  "  key={props.data.id}>

<div>
<img className='' src={`${ROOT_API}/storage/${JSON.parse(props.data.img)[0]}`} alt="" />
</div>

<div className='mt-2 flex justify-between'>
<div className='font-bold text-sm ' >{props.data.name}</div>
<div className='text-blue-400' > <span className='text-xs text-red-500 line-through' > {props.data.price-23} </span> <span className='font-bold ml-2' > $ {props.data.price}</span> </div>

</div>


</div>

)
}

export default Product