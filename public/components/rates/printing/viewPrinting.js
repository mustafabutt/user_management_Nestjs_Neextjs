import {useEffect, useState} from "react";
import loginStyles from '@/styles/login.module.css';
import {RatesService} from "@/services/rates.service";
import Alert from '@/components/alert';


export const ViewPrinting = (props) => {
    const [deleteModel, setDeleteModel] = useState(false);
    const [currentPrinting, setCurrentPrinting] = useState(null);
    const [printingUpdated, setPrintingUpdated] = useState(null);
    const [printingDeleted, setPrintingDeleted] = useState(null);
    
    const [error, setError] = useState(null);
    const [printing,setPrinting] = useState(null);
    const [rate, setRate] = useState(null);

    useEffect(()=>{
      setCurrentPrinting(RatesService().getCurrentPrinting(props.item));
      setPrinting(RatesService().getCurrentPrinting(props.item).name);
      setRate(RatesService().getCurrentPrinting(props.item).base_rate);
     
    },[])

    if(!currentPrinting)
      return null;

    const focusHandler = () => {
      setError(false);
    };
    const chnageHandlerForService = (e)=>{

      setPrintingUpdated(false);
      setPrinting(e.target.value);
    }
    const focusHandlerForIRate = (e)=>{
      setPrintingUpdated(false);
      setRate(e.target.value);
    }
    const focusHandlerForDRate = (e)=>{

      setPrintingUpdated(false);
      setRate(e.target.value);
    }
    const showModel=()=>{
      setDeleteModel(true);
    }
    const hideModel=()=>{
      setDeleteModel(false);
    }
    async function updatePrinting(e) {
        e.preventDefault();

        const res = await RatesService().editPrinting({
          name: printing,
          base_rate: rate,
          previousPrinting: props.item
        });
        res.status == 200 ? setPrintingUpdated(true) : setError(true);
      }

      async function deletePrinting(e) {
        e.preventDefault();
        const res = await RatesService().DeletePrinting({
          name: printing
        });
        res.status == 200 ? setPrintingDeleted(true) : setError(true);
        
        if(res.status == 200)
          props.invokeParent();
        
      }
      if(printingUpdated | printingDeleted)
        RatesService().getPrintingList().then();

  return (
  
    <div >
      {deleteModel?
        <div tabindex="-1" class=" flex items-center justify-center h-screen modal-backdrop"  >
                
          <div class="relative max-w-md ">
            
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button  onClick={hideModel} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span class="sr-only">Close modal</span>
                  </button>
                  <div class="p-4 md:p-5 text-center">
                  {printingDeleted ? (
                        <Alert type="success">
                          <span>Printing deleted successfully.</span>
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
                      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this printing?</h3>
                      <button onClick={deletePrinting} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                          Yes, I'm sure
                      </button>
                      <button onClick={hideModel} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                  </div>
              </div>
          </div>
      </div>
      :null}
        

        <img onClick={showModel} style={{cursor: 'grab'}}  title="Delete this printing" src="/images/delete.png" className={loginStyles.deleteClass} />
        <form onSubmit={updatePrinting} className={loginStyles.formClass}>

        {printingUpdated ? (
                          <Alert type="success">
                            <span>Printing updated successfully.</span>
                          </Alert>
                    ) : null}
                    
                    {error ? (
                          <Alert type="error">
                            <span>Error occurred! </span>
                          </Alert>
                        ) : null}
          <div className={loginStyles.container}>
            <label htmlFor="uname">
              <b>Printing type</b>
            </label>
            <input
              value={printing}
              onChange={chnageHandlerForService}
              className={loginStyles.inputClass}
              type="text"
              name="printing"
              onFocus={focusHandler}
              required
            />
            <label htmlFor="uname">
              <b>Base Rate</b>
            </label>
            <input
              value={rate}
              className={loginStyles.inputClass}
              type="number"
              name="rate"
              onChange={focusHandlerForDRate}
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

