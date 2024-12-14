import React from 'react'
import { ROOT_API } from '../../../utils'
import { FaDotCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
function Category(props) {
  const navigate = useNavigate();

  return (

    <motion.div


    initial={{ opacity: 0, x: -50 }} 
animate={{ opacity: 1, x: 0 }} 
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}


style={{
  backgroundColor:props.data.id==props.catID? "lightgray" :"white"
}} onClick={()=>{props.setGID(props.data.id)}} className="my-3 cursor-pointer gap-x-3 min-w-32 flex items-center  shadow-md p-2 rounded-md  ">

<div>
  <FaDotCircle className='text-sm' />
</div>

<div className='text-blue-950 font-semibold' >
  {props.data.name}
</div>

</motion.div>

)
}

export default Category