import {useEffect, useRef, useState} from "react";
import loginStyles from '../../../styles/login.module.css';
import {RatesService} from "../../../services/rates.service";
import Alert from '../../../components/alert';


export const ViewShipping = (props) => {
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
        <img onClick={deleteShipping} style={{cursor: 'grab'}}  title="Delete this shipping" src="/images/delete.png" className={loginStyles.deleteClass} />
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

