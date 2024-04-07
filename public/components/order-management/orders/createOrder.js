import {useEffect, useRef, useState} from "react";
import {OrderService} from "../../../services/ordersManagement.service";
import { PriceGenerator } from '@/components/PriceGenerator';
import { OrderList } from "./orderList";

export const CreateOrder = (props) => {
  let ordersArray = [];
  const [orders, setOrders] = useState(null);
  const [metaData, setMetaData] = useState(null);

  useEffect(()=>{props.view; },[])

  function getOrderData(obj, metaData){
    setMetaData(metaData);
    ordersArray.push({details:obj});
    setOrders({status:200, data:ordersArray})
  } 
  function pullOrderListData (){}
  async function createOrderCall(e) {
    e.preventDefault();
    OrderService().getLocalOrderList().then(async (data)=>{
      let lastElement;
    
      if(data.data.length == 0)
        lastElement = data.data.length ;
      else if(data.data.length > 0)
        lastElement = data.data[data.data.length - 1].id;
      const res = await OrderService().createOrder({
        id:Number(lastElement)+1,
        delivery_date: metaData.date,
        customer_email: metaData.client,
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

  return (

    <div class="grid grid-cols-2 gap-2 overflow-auto">
        
      <div>
        <PriceGenerator parent={"createOrder"} invokeParent={getOrderData} />
      </div>
      <div className="overflow-auto">
        <OrderList parent = {"createOrders"} list={orders} invokeTopParent = {pullOrderListData} />
      </div>
    
      {orders != null ? <button onClick={createOrderCall} className="w-full bg-black rounded-lg p-2 mt-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create Order</button> :null}

    </div>


  );
};

