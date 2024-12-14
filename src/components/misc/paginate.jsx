import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { BiLeftArrowAlt,BiLeftArrowCircle,BiRightArrowCircle } from 'react-icons/bi';
function Paginate(props) {
 const [modLinks,setModLinks]= useState([]);

  useEffect(() => {
console.log(props.data)    

setModLinks(props.data&&props.data.slice(1,-1));
    // if (firstRenderRef.current) {
    //   firstRenderRef.current = false;
    //  //
    // } else {
    //   setRefr(false);        
    // }

  }, [])
  





  return (
  <div className='bg-blue-900 p-4 text-white flex justify-between items-center' >
<div 
   className={`${props.data&&props.data[0].active? ' text-white':' text-white'  } 
`}

onClick={()=>{props.setUrl(props.data&&props.data[0].url)}}
><BiLeftArrowCircle className='text-3xl' / ></div>
<div className=' flex gap-2 flex-wrap items-center ' >

{modLinks&&modLinks.map(link=>(
        
   <div

   onClick={()=>{link&&props.setUrl(link.url)}}
   className={`${link.active? ' text-blue-900 bg-white ':'bg-blue-800 text-white'  } flex justify-center items-center w-10 h-10 font-bold rounded-full `}>

    {link.label}
   </div>
    
    ))}





</div>

<div 
   className={`${props.data&&props.data[props.data.length -1].active? ' text-white':' text-white'  } 
`}

onClick={()=>{props.data&&props.setUrl(props.data[props.data&&props.data.length -1].url)}}
><BiRightArrowCircle className='text-3xl' / ></div>

  </div>
  )
}

export default Paginate