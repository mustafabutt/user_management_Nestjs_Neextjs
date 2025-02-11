import {useEffect, useState} from "react";
import {OrderService} from "@/services/ordersManagement.service";
import { PriceGenerator } from '@/components/PriceGenerator';
import { OrderList } from "./orderList";

export const CreateOrder = (props) => {
  let ordersArray = [];
  const [orders, setOrders] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [metaData, setMetaData] = useState({date:null, client:null,shipping:null});

  const [key, setKey] = useState(null);

  useEffect(()=>{
    if(props.parent == "orders"){ 
      let data = OrderService().getCurrentOrder(props.id);
      ordersArray.push({details:data.details});
      setOrders({status:200, data:ordersArray})
    }
  },[])

  function getOrderData(obj, metaData){
    setMetaData(metaData);
    ordersArray.push({details:obj});
    if(props.parent == "orders"){ 
      orders.data[0].details.push(obj[0])
      orders=orders;
      setKey({ key: Math.random() });
    }else {
      setOrders({status:200, data:ordersArray})
    }
  } 
  
  async function createOrderCall(e) {
    e.preventDefault();
    setShowLoader(true);
    
    OrderService().getLocalOrderList().then(async (data)=>{
      let lastElement;
      if(data.data.length == 0)
        lastElement = data.data.length ;
      else if(data.data.length > 0)
        lastElement = data.data[data.data.length - 1].id;
      const res = await OrderService().createOrder({
        id:Number(lastElement)+1,
        delivery_date: metaData.date,
        client: metaData.client,
        shipping: metaData.shipping,
        details: orders.data[0].details
      });
      
      if(res.status == 201){
        OrderService().getOrderList().then(()=>{
          
          res.status == 201 ? props.invokeParent() : null;
        })
      }
    })
  }
  if(showLoader)
    return (<div class="text-center">
        <div role="status">
            <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
    </div>)
  async function updateOrderCall(e){
    e.preventDefault();

    const res = await OrderService().editOrder({
      _id:props.id,
      delivery_date: metaData.date || null,
      client: metaData.client || null,
      shipping: metaData.shipping || null,
      details: orders.data[0].details
    });
    res.status == 200 ? props.invokeParent() : null;
  }
  return (

    <div class="grid grid-cols-2 gap-2 overflow-auto">
        
      <div>
        <PriceGenerator parent={"createOrder"} invokeParent={getOrderData} />
      </div>
      <div className="overflow-auto">
        <OrderList parent = {"createOrders"} list={orders}  />
      </div>
    
      {orders != null && props.parent == "orders" ? <button onClick={updateOrderCall} className="w-full bg-black rounded-lg p-2 mt-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update Order</button> :null}
      {orders != null && props.parent != "orders" ? <button onClick={ createOrderCall} className="w-full bg-black rounded-lg p-2 mt-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create Order</button> :null}

    </div>


  );
};

