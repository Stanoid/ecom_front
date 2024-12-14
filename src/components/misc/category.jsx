import React from 'react'
import { ROOT_API } from '../../../utils'
import { FaDotCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
function Category(props) {
  const navigate = useNavigate();

  return (

<div style={{
  backgroundColor:props.data.id==props.catID? "lightgray" :"white"
}} onClick={()=>{props.setGID(props.data.id)}} className="my-3 gap-x-3 min-w-32 flex items-center  shadow-md p-2 rounded-md  ">

<div>
  <FaDotCircle className='text-sm' />
</div>

<div className='text-blue-950 font-semibold' >
  {props.data.name}
</div>

</div>

)
}

export default Category