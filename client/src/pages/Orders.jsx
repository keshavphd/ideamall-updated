import React from 'react'
import { useSelector } from 'react-redux'

const Orders = () => {
  const orders = useSelector(state=>state.orders.order)
  console.log(orders);
  
  return (<>
  <div className="px-3 py-2 mb-1 font-mono text-2xl shadow-md">Orders</div>
  <div className='mb-10'>{
!orders[0] && (<p>No Data Found</p>)
}
{
  orders.map((oddr,indexes)=>{
    return(
      <div key={oddr._id+indexes+"oredrs"} className='p-3 rounded order' >
<p>Order No.:{oddr.orderId}</p>
<div className='flex gap-5'>
  <img src={oddr?.productDetails?.image[0]} className='w-16 h-16' alt="product Image" />
  <p>{oddr?.productDetails?.name}</p>
</div>
      </div>
    )
  })
}
</div>
  </>
    
    
  )
}

export default Orders