import {useEffect, useState} from "react";
import { OrderListData } from "@/utils/orderUtils";
import { UserService } from "@/services/user.service";

export const OrderList = (props) => {

    const [orders, setOrders] = useState(null);

    useEffect( ()=>{
      debugger
        if(props.parent == "createOrders" && props.list){
          debugger
          setOrders(props.list);
        } else if(props.parent == "orders" ){
            (async function(){
              setOrders(await OrderListData(UserService().getAccessToken()));
              }
            )()
          }

      },[])
    function deleteEntry(data){
      // delete orders.data[0].details[data]
      orders.data[0].details.splice(data, 1)
      setOrders(orders);
    }

    function decorationData(decoration){
      debugger
      return decoration.value != "" ?
              <td className="border-solid border-2">{decoration.type} {decoration.value } {decoration.size.width}x{decoration.size.height }</td>              
            : <td className="border-solid border-2"></td>
    }
    function detailsData(order){
      return order ?
            <>
            
              <tr>
                      <th className="border-solid border-2">Item</th>
                      <th className="border-solid border-2">Quantity</th>
                      <th className="border-solid border-2">Fabric</th>
                      <th className="border-solid border-2">Decoration</th>
                     
                    </tr>
                  {
                    
                    order.details.map((keyName, keyIndex) => (
                    
                      <tr className="group hover:bg-gray-300">
                      <td  className="border-solid border-2">{keyName.item}</td>
                      <td  className="border-solid border-2">{keyName.qty}</td>
                      <td  className="border-solid border-2">{keyName.fabric}</td>
                      
                      { decorationData(keyName.decoration)}
                      {props.parent == "createOrders"? <span id={keyIndex} className="text-red-500 cursor-pointer hidden group-hover:block" data-toggle="tooltip" title="Remove this entry" onClick= {() => deleteEntry(keyIndex)} >X</span>:null}
                     
                      </tr>
          
                  ))
                  }
              </>
           : null
    }
   
  if(props.parent == "orders" && !orders)
    return null 
 if(props.parent == "createOrders" ){
    if(!props.list)
      return <p className="p-40">Bucket Empty</p>
      else  {
        console.log("helll")
        console.log(props.list)
        orders=props.list;
      }
  }
  debugger

  if(props.parent == "orders" && orders.data.length === 0)
    return <p>No orders found.</p> 

    return (
  
        <div>
            
            {
            orders.status==200 ?
            
            <table className="table-auto overflow-scroll w-full"   >
                <tbody>
                    {orders && orders.data.map((order) => (
                    <p  className={props.parent == "orders"? "border-2 border-purple-100 hover:border-purple-500 cursor-pointer": "border-2 border-purple-100 hover:border-purple-500"}  >
                      
                        {props.parent == "orders"? 
                         <><tr >
                         <th className="border-solid border-2">delivery date</th>
                         <th className="border-solid border-2">Shipping</th>
                         <th className="border-solid border-2">Status</th>
                         <th className="border-solid border-2">Customer</th>
                           
                           
                       </tr>
                        <tr >
                          <td className="border-solid border-2">{order.delivery_date}</td>
                          <td className="border-solid border-2">{order.shipping}</td>
                          <td className="border-solid border-2">{order.status.toString()}</td>
                          <td className="border-solid border-2">{order.customer_email}</td>
                        </tr>
                        <tr >
                        <td><b>Order Details</b> </td>
                        </tr></>:null}
                       
                        <tr>
                        {
                          
                          detailsData(order)
 
                        }
                        </tr>
                    </p>
                    ))
                    }
                </tbody>
            </table>
            : null
        }

        </div>

    )
}

// {
//   "status": 200,
//   "data": [
//       {
//           "details": {
//               "shipping": "DHL(indirect)",
//               "item": "t-shirts",
//               "fabric": "jersey",
//               "qty": "20",
//               "profit_margin": "55%",
//               "production_time": "9",
//               "usdRate": "213",
//               "decoration": {
//                   "value": "Printing",
//                   "type": "DTG",
//                   "size": {
//                       "width": "2",
//                       "height": "4"
//                   }
//               }
//           }
//       }
//   ]
// }



// {
//   "status": 200,
//   "data": [
//       {
//           "status": "",
//           "id": "1",
//           "start_date": "13/2/22",
//           "end_date": "19/2/24",
//           "isCancelled": "delivered",
//           "customer_id": "65fc9311759ec2dd71f8f2b8",
//           "details": [
//               {
//                   "item": "hoodie",
//                   "qty": 20,
//                   "fabric": "fleece",
//                   "decoration": {
//                       "value": "Printing",
//                       "type": "DTG",
//                       "size": {
//                           "width": "2",
//                           "height": "3"
//                       }
//                   }
//               },
//               {
//                   "item": "t-shirts",
//                   "qty": 10,
//                   "fabric": "jersey",
//                   "decoration": {
//                       "value": "Printing",
//                       "type": "DTF",
//                       "size": {
//                           "width": "4",
//                           "height": "3"
//                       }
//                   }
//               }
//           ]
//       },
//       {
//           "id": "2",
//           "start_date": "13/2/12",
//           "end_date": "19/2/13",
//           "status": "",
//           "customer_id": "65fc9311759ec2dd71f8f2b8",
//           "details": [
//               {
//                   "item": "hoodie",
//                   "qty": 300
//               },
//               {
//                   "item": "t-shirts",
//                   "qty": 200
//               }
//           ]
//       },
//       {
//           "id": "3",
//           "start_date": "13/2/19",
//           "end_date": "19/2/22",
//           "status": "",
//           "customer_id": "65fc9311759ec2dd71f8f2b8",
//           "details": [
//               {
//                   "item": "hoodie",
//                   "qty": 300
//               }
//           ]
//       }
//   ]
// }