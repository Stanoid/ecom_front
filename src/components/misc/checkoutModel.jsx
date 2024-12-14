import {Reac,useState,useEffect} from 'react'
import { ROOT_API } from '../../../utils'
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle,FaMinusCircle } from 'react-icons/fa';
import { Modal,Button } from 'flowbite-react';
import { FaTrash } from 'react-icons/fa';
function CheckoutModel(props) {


const navigate = useNavigate();
const [total,setTotal]=useState(0);
const [items,setItems]=useState(null);


useEffect(() => {

  console.log(props.data)
    // let ttl=0;
    setItems(props.data&&props.data.items);
    props.data&&props.data.items.forEach(element => {
 // console.log(element)
       // ttl = ttl + (element.data.price*element.qty);
    });

    // setTotal(ttl);

 
}, [props.openModal])



  return (

    <Modal show={props.openModal} onClose={() => props.setOpenModal(false)}>

     <div> 
    <Modal.Header>
      Order No. {props?.data?.order_number}
    </Modal.Header>
    <Modal.Body>

    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 rounded-s-lg">
                    Product name
                </th>
                <th data-testid="test_price" scope="col" className="px-6 py-3">
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
          
        {items&&items.map(item=>(

<tr  key={item.id} className="bg-white dark:bg-gray-800">
<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
{item?.product?.name}

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
          
        </tfoot>
    </table>


    </Modal.Body>

    <Modal.Footer>
      <div className='flex w-full items-center justify-between' >

      <div className='text-xl font-bold text-blue-500' >
            Total: ${props.data?.total_price} 
        </div>
        <div className='flex gap-x-2' >

        <Button color="gray" onClick={() => props.setOpenModal(false)}>
        Hide
      </Button>

      
      
        </div>

      

      </div>
      
    </Modal.Footer>
    </div>  
  </Modal>
  

)
}

export default CheckoutModel