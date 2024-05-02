import {useEffect, useState} from "react";
import { OrderListData } from "@/utils/orderUtils";
import { UserService } from "@/services/user.service";
import { OrderService } from "@/services/ordersManagement.service";
import loginStyles from '@/styles/login.module.css';
import Alert from '@/components/alert';
import $ from 'jquery';

export const OrderList = (props) => {

    const [orders, setOrders] = useState(null);
    const [orderDelete, setOrderDelete] = useState(null);
    const [error, setError] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [invoiceDeleted, setInvoiceDeleted] = useState(null);
    const [invoiceList, setInvoiceList] = useState(null);
    const [currentEmail, setCurrentEmail] = useState(null);  
    const [orderIdForInvoice, setOrderIdForInvoice] = useState(null);

    useEffect( ()=>{
        if(props.parent == "createOrders" && props.list){ 
          setOrders(props.list);
        } else if(props.parent == "orders" ){
            (async function(){
              setOrders(await OrderListData(UserService().getAccessToken()));
              }
            )()
          }

      },[])
    function deleteEntry(data){
      orders.data[0].details.splice(data, 1)
      setOrders(orders);
    }
    async function fetchData(id){
      if(props.parent == "orders" )
        props.invokeTopParent(id);
    }

    const saveFile = async (invoice) => {
      await OrderService().DownloadInvoice({
        "email": currentEmail,
        file:invoice
      })
    }
    const generateInvoice = async () => {
        let tempOder ={};
        await Promise.all(orders.data.map(async (obj) => {
          if(obj._id == orderIdForInvoice)
            tempOder = obj;
        }));
        let res = await OrderService().GenerateInvoice({
          tempOder
        })
        if( res.status == 201)
        {
        const res = await OrderService().FetchInvoices({
          "email": currentEmail
        })
        setInvoiceList(await res.json());
      }
    }

    function decorationData(decoration){
      
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
                  {props.parent == "createOrders"? <span id={keyIndex} className="text-red-500 hidden group-hover:block" data-toggle="tooltip" title="Remove this entry" onClick= {() => deleteEntry(keyIndex)} >X</span>:null}
                  
                  </tr>
      
                ))
              }
          </>
        : null
    }

    async function deleteInvoice(invoice){
      let res = await OrderService().DeleteInvoice({
        "email": currentEmail,
        file:invoice.invoice
      })
      res.status == 200 ? setInvoiceDeleted(true) : setError(true);
      setTimeout(()=>{setInvoiceDeleted(false)},2000)
      if( res.status == 200)
       {
        const res = await OrderService().FetchInvoices({
          "email": currentEmail
        })
        setInvoiceList(await res.json());
       }
    
    }
    async function showInvoiceModel(orderId,email){
      const res = await OrderService().FetchInvoices({
        "email": email
      })
      
      setOrderIdForInvoice(orderId);
      setCurrentEmail(email);
      setInvoiceList(await res.json());
      
      $("#invoiceModal").show();
    }
    const showModel=(id,model)=>{
      
      if(model == "#deleteInvoice")
        currentFile = id
      else 
        setOrderId(id)
      $("deleteInvoice").show();
    }
    const closeModal=(id)=>{
      $(id).hide();
    }
    async function deleteOrder(e) {
      e.preventDefault();
      const res = await OrderService().DeleteOrder({
        _id: orderId
      });
      res.status == 200 ? setOrderDelete(true) : setError(true);
      setTimeout(()=>{setOrderDelete(false), $("#deleteModal").hide();},2000)
      if( res.status == 200)
        setOrders(await OrderListData(UserService().getAccessToken()));
    }

  if(props.parent == "orders" && !orders)
    return null 
  if(props.parent == "createOrders" ){
      if(!props.list)
        return <p className="p-40">Bucket Empty</p>
        else  {
          orders=props.list;
        }
    }


  if(props.parent == "orders" && (orders && orders.status != 409) && orders.data.length === 0)
    return <p>No orders found.</p> 

    return (
  
        <div>
          

          <div id="deleteModal" tabIndex="-1" className=" flex items-center justify-center h-screen modal-backdrop" style={{display:"none"}} >
          
            <div className="relative max-w-md ">
              
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={(value) => closeModal(value="#deleteModal")}  type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                    {orderDelete ? (
                          <Alert type="success">
                            <span>Order deleted successfully.</span>
                          </Alert>
                    ) : null}
                    {error ? (
                          <Alert type="error">
                            <span>Error occurred! </span>
                          </Alert>
                        ) : null}
                    
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this order?</h3>
                        <button onClick={deleteOrder} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                            Yes, I'm sure
                        </button>
                        <button onClick={(value) => closeModal(value="#deleteModal")}  data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                    </div>
                </div>
            </div>
          </div>

        

          <div id="invoiceModal"  aria-hidden="true" className="flex items-center justify-center h-screen modal-backdrop" style={{display:"none"}}   >
            <div className="relative p-6 min-h-full max-h-full overflow-auto" >
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 " style={{  width: "fit-content"}} >
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 overflow-inherit">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Invoices
                        </h3>
                        {invoiceDeleted ? (
                          <Alert type="success">
                            <span>Invoice deleted successfully.</span>
                          </Alert>
                        ) : null}
                        <button onClick={(value) => closeModal(value="#invoiceModal")}  type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className={loginStyles.container} >

                    {invoiceList && invoiceList.data.length == 0 ? <button type="button" onClick= {() => generateInvoice()}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Generate invoice</button>: 
                    <table className="table-auto overflow-scroll w-full">
                      <tbody>
                    {invoiceList && invoiceList.data.map((invoice, ind) => (
                      <>
                        <tr>
                          <th className="border-solid border-2">Invoices</th>
                          <th className="border-solid border-2">Actions</th>
                        </tr>
                        <tr>
                            <td className="border-solid border-2 hover:bg-sky-100">{invoice}</td>
                            <td className="border-solid border-2">
                            <div className="grid grid-cols-2 gap-2 overflow-auto">
                            <div onClick= {() => deleteInvoice({invoice})} className="cursor-pointer hover:animate-spin col-span-1 p-0" data-toggle="tooltip" title="Delete this invoice" >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                              </svg>
                            </div>
                            
                            <div className="cursor-pointer hover:animate-spin col-span-1 p-0" data-toggle="tooltip" onClick= {() => saveFile(invoice)}  title="Download this invoices"  >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                              </svg>
                           
                            </div>
                          </div>  
                            </td>
                        </tr>
                      </>
                       
                    ))
                    }
                </tbody>
                </table>}

                    </div>
                    {/* <!-- Modal footer --> */}
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 ">
                    {/* {showCreateEmbroideryButton ? <span><button type="button" onClick={createEmbroidery}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Embroidery</button></span> : null } */}
                    </div>
                </div>
            </div>
          </div>

            {
              orders.status==200 ?
              
              <table className="table-auto overflow-scroll w-full"   >
                {orders && orders.data.map((order, i) => (
                
                  <tbody className={props.parent == "orders"? "border-2 border-purple-100 hover:border-purple-500 ": "border-2 border-purple-100 hover:border-purple-500"} >
                    
                          {props.parent == "orders"? 
                          <><tr>
                          <th className="border-solid border-2">delivery date</th>
                          <th className="border-solid border-2">Shipping</th>
                          <th className="border-solid border-2">Status</th>
                          <th className="border-solid border-2">Customer</th>
                          <th className="border-solid border-2">Actions</th>
                            
                        </tr>
                          <tr>
                            <td className="border-solid border-2">{order.delivery_date}</td>
                            <td className="border-solid border-2">{order.shipping}</td>
                            <td className="border-solid border-2">{order.status.toString()}</td>
                            <td className="border-solid border-2">{order.customer_email}</td>
                            <td className="border-solid border-2"> 
                            <div className="grid grid-cols-3 gap-3 overflow-auto">
                              <div onClick= {() => showModel(order._id,'#deleteModal')} className="cursor-pointer hover:animate-pulse col-span-1 p-0" data-toggle="tooltip" title="Delete this order" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg>
                              </div>
                              <div className="cursor-pointer hover:animate-pulse col-span-1 p-0" onClick= {() => fetchData(order._id)} data-toggle="tooltip" title="Edit this order"  >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                </svg>
                              </div>
                              <div className="cursor-pointer hover:animate-pulse col-span-1 p-0" onClick= {() => showInvoiceModel(order._id, order.customer_email)} data-toggle="tooltip" title="View invoices"  >
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                                </svg> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" fill="currentColor" className="bi bi-view-list" viewBox="0 0 16 16">
                                  <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2m0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14"/>
                                </svg>
                              </div>
                            </div>             
                            </td>
                          </tr>
                          <tr>
                          <td><b>Order Details</b> </td>
                          </tr>
                          </>:null}
                        
                          <tr>
                          {
                            
                            detailsData(order)
  
                          }
                          </tr>
              
                      </tbody>
                      ))
                    }
                
              </table>
            : null
        }

        </div>

    )
}
