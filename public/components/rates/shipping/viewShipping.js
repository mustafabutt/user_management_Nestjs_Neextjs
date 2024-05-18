import {useEffect, useState} from "react";
import loginStyles from '@/styles/login.module.css';
import {RatesService} from "@/services/rates.service";
import Alert from '@/components/alert';

export const ViewShipping = (props) => {
    const [deleteModel, setDeleteModel] = useState(false);
    const [currentShipping, setCurrentShipping] = useState(null);
    const [shippingUpdated, setShippingUpdated] = useState(null);
    const [shippingDeleted, setShippingDeleted] = useState(null);
    
    const [error, setError] = useState(null);
    const [service,setService] = useState(null);
    const [shippingIRate, setShippingIRate] = useState(null);
    const [shippingDRate, setShippingDRate] = useState(null);

    useEffect(()=>{
    
      setCurrentShipping(RatesService().getCurrentShipping(props.item));
      setService(RatesService().getCurrentShipping(props.item).service);
      setShippingIRate(RatesService().getCurrentShipping(props.item).rate[0].indirectRate);
      setShippingDRate(RatesService().getCurrentShipping(props.item).rate[0].directRate);
     
    },[])

    if(!currentShipping)
      return null;

    const focusHandler = () => {
      setError(false);
    };
    const chnageHandlerForService = (e)=>{

      setShippingUpdated(false);
      setService(e.target.value);
    }
    const focusHandlerForIRate = (e)=>{
      setShippingUpdated(false);
      setShippingIRate(e.target.value);
    }
    const focusHandlerForDRate = (e)=>{

      setShippingUpdated(false);
      setShippingDRate(e.target.value);
    }
    const showModel=()=>{
      setDeleteModel(true);
    }
    const hideModel=()=>{
      setDeleteModel(false);
    }
    async function updateShipping(e) {
        e.preventDefault();

        const res = await RatesService().editShipping({
          service: service,
          rate: [{directRate:shippingDRate, indirectRate: shippingIRate}],
          previousService: props.item
        });
        res.status == 200 ? setShippingUpdated(true) : setError(true);
      }

      async function deleteShipping(e) {
        e.preventDefault();

        const res = await RatesService().DeleteShipping({
          service: service
        });
        res.status == 200 ? setShippingDeleted(true) : setError(true);
        
        if(res.status == 200)
          props.invokeParent();
        
      }
      if(shippingUpdated | shippingDeleted)
        RatesService().getShippingList().then();

  return (
  
    <div >
      {deleteModel?
        <div tabindex="-1" class=" flex items-center justify-center h-screen modal-backdrop" >
                
          <div class="relative max-w-md ">
            
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button  onClick={hideModel} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span class="sr-only">Close modal</span>
                  </button>
                  <div class="p-4 md:p-5 text-center">
                  
                  {shippingUpdated ? (
                        <Alert type="success">
                          <span>Shipping updated successfully.</span>
                        </Alert>
                  ) : null}
                  {shippingDeleted ? (
                        <Alert type="success">
                          <span>Shipping deleted successfully.</span>
                        </Alert>
                  ) : null}
                  {error ? (
                        <Alert type="error">
                          <span>Error occurred! </span>
                        </Alert>
                      ) : null}
                      <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                      </svg>
                      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this shipping?</h3>
                      <button onClick={deleteShipping} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                          Yes, I'm sure
                      </button>
                      <button onClick={hideModel} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                  </div>
              </div>
          </div>
      </div>
      :null}
        

        <img onClick={showModel} style={{cursor: 'grab'}}  title="Delete this shipping" src="/images/delete.png" className={loginStyles.deleteClass} />
        <form onSubmit={updateShipping} className={loginStyles.formClass}>

          <div className={loginStyles.container}>
            <label htmlFor="uname">
              <b>Service</b>
            </label>
            <input
              value={service}
              onChange={chnageHandlerForService}
              minLength="3"
              className={loginStyles.inputClass}
              type="text"
              name="shipping"
              onFocus={focusHandler}
              required
            />
            <label htmlFor="uname">
              <b>Direct Rate</b>
            </label>
            <input
              value={shippingDRate}
              className={loginStyles.inputClass}
              type="number"
              name="DRate"
              onChange={focusHandlerForDRate}
              onFocus={focusHandler}
              required
            />
            <label htmlFor="uname">
              <b>In-Direct Rate</b>
            </label>
            <input
              value={shippingIRate}
              className={loginStyles.inputClass}
              type="number"
              name="IDrate"
              onChange={focusHandlerForIRate}
              onFocus={focusHandler}
              required
            />
            
            
            <button className={loginStyles.buttonClass} type='submit'>
              Save changes
            </button>
            
          </div>
        </form>
    </div>
  );
};

