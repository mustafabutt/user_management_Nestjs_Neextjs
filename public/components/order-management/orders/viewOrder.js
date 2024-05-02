import {useEffect, useState} from "react";
import loginStyles from '../../../styles/login.module.css';
import {OrderService} from "../../../services/ordersManagement.service";
import Alert from '../../../components/alert';
import $ from 'jquery';

export const ViewOrder = (props) => {

    const [currentOrder, setCurrentOrder] = useState(null);
    const [orderUpdated, setOrderUpdated] = useState(null);
    const [orderDeleted, setOrderDeleted] = useState(null);
    
    const [error, setError] = useState(null);


    useEffect(()=>{
      setCurrentOrder(OrderService().getCurrentOrder(props.id));

    },[])

    if(!currentOrder)
      return null;
      else debugger
    const showModel=()=>{
      $("#deleteModal").show();
    }
    const hideModel=()=>{
      $("#deleteModal").hide();
    }
    async function updateOrder(e) {
        e.preventDefault();

        const res = await OrderService().editClient({
          email: email,
          name: name,
          contact_no: contact,
          country: country,
          city: city,
          state:state,
          adress:adress,
          previousEmail: props.email
        });
        res.status == 200 ? setClientUpdated(true) : setError(true);
      }

      async function deleteClient(e) {
        e.preventDefault();
        const res = await OrderService().DeleteClient({
          email: email
        });
        res.status == 200 ? setClientDeleted(true) : setError(true);
        
        if(res.status == 200)
          props.invokeParent();
        
      }
      if(orderUpdated | orderDeleted)
        OrderService().getClientList().then();

  return (
  
    // <div >

    //     <div id="deleteModal" tabindex="-1" class=" flex items-center justify-center h-screen modal-backdrop" style={{display:"none"}} >
            
    //         <div class="relative max-w-md ">
              
    //             <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
    //                 <button  onClick={hideModel} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
    //                     <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
    //                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
    //                     </svg>
    //                     <span class="sr-only">Close modal</span>
    //                 </button>
    //                 <div class="p-4 md:p-5 text-center">
    //                 {orderDeleted ? (
    //                       <Alert type="success">
    //                         <span>Order deleted successfully.</span>
    //                       </Alert>
    //                 ) : null}
    //                 {error ? (
    //                       <Alert type="error">
    //                         <span>Error occurred! </span>
    //                       </Alert>
    //                     ) : null}
                   
    //                     <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    //                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    //                     </svg>
    //                     <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this client?</h3>
    //                     <button onClick={deleteClient} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
    //                         Yes, I'm sure
    //                     </button>
    //                     <button onClick={hideModel} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>

    //     <img onClick={showModel} style={{cursor: 'grab'}}  title="Delete this client" src="/images/delete.png" className={loginStyles.deleteClass} />
    //     <form onSubmit={updateOrder} className={loginStyles.formClass}>

    //     {orderUpdated ? (
    //                       <Alert type="success">
    //                         <span>Order updated successfully.</span>
    //                       </Alert>
    //                 ) : null}
                    
    //                 {error ? (
    //                       <Alert type="error">
    //                         <span>Error occurred! </span>
    //                       </Alert>
    //                     ) : null}
    //       <div className={loginStyles.container}>
    //         <label htmlFor="uname">
    //           <b>Printing type</b>
    //         </label>
    //         <input
    //           value={email}
    //           className={loginStyles.inputClass}
    //           type="email"
    //           placeholder="Enter email"
    //           name="email"
    //           onFocus={focusHandler}
              
    //         />
            
            
    //         <input
    //           value={name}
    //           minLength="2"
    //           className={loginStyles.inputClass}
    //           type="string"
    //           placeholder="Enter name"
    //           name="name"
    //           onFocus={focusHandler}
    //           onChange={chnageHandlerForName}
    //           required
    //         />
    //         <input
    //           value={contact}
    //           className={loginStyles.inputClass}
    //           type="string"
    //           placeholder="Enter contact number"
    //           name="contact"
    //           onFocus={focusHandler}
    //           onChange={changeHandlerForContact}
    //           required
    //         />
    //          <input
    //           value={country}
    //           className={loginStyles.inputClass}
    //           type="country"
    //           placeholder="Enter country name"
    //           name="country"
    //           onFocus={focusHandler}
    //           onChange={changeHandlerForCountry}
    //           required
    //         />
    //         <input
    //           value={city}
    //           className={loginStyles.inputClass}
    //           type="city"
    //           placeholder="Enter city name"
    //           name="city"
    //           onFocus={focusHandler}
    //           onChange={changeHandlerForForCity}
    //           required
    //         />
    //         <input
    //           value={state}
    //           className={loginStyles.inputClass}
    //           type="state"
    //           placeholder="Enter state name"
    //           name="state"
    //           onFocus={focusHandler}
    //           onChange={changeHandlerForForState}
    //           required
    //         />
    //         <input
    //           value={adress}
    //           className={loginStyles.inputClass}
    //           type="adress"
    //           placeholder="Enter adress name"
    //           name="adress"
    //           onFocus={focusHandler}
    //           onChange={changeHandlerForForAdress}
    //           required
    //         />
            
    //         <button className={loginStyles.buttonClass} type='submit'>
    //           Save changes
    //         </button>
            
    //       </div>
    //     </form>
    // </div>



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

