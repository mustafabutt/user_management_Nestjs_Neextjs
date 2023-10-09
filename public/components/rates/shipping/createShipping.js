import {useEffect, useRef, useState} from "react";
import loginStyles from '../../../styles/login.module.css';
import {RatesService} from "../../../services/rates.service";
import Alert from '../../../components/alert';
import { constants } from "../../../constants";

export const CreateShipping = (props) => {
    const [shippingExists, setShippingExists] = useState(null);
    const service = useRef(null);
    const directRate = useRef(null);
    const indirectRate = useRef(null);

    useEffect(()=>{props.view; },[])

    const focusHandler = () => {
      setShippingExists(false);
    };

    async function createShippingCall(e) {
        e.preventDefault();
      
        const res = await RatesService().createShipping({
          service: service.current.value,
          rate: [{
            directRate:   directRate.current.value,
            indirectRate:   indirectRate.current.value
          }]
         
        });
        if(res.status == 201){
          RatesService().getShippingList().then(()=>{
            res.status == 201 ? props.invokeParent() : null;
          })
        }else res.status == 409 ? setShippingExists(true) : null;

      }

  return (

    <div >

        <form onSubmit={createShippingCall} className={loginStyles.formClass}>
          
          <div className={loginStyles.container}>
            
            <input
              ref={service}
              minLength="2"
              className={loginStyles.inputClass}
              type="text"
              placeholder="Enter shipping service"
              name="service"
              onFocus={focusHandler}
              required
            />
            {shippingExists ? (
              <Alert type="error">
                <span>Already exists</span>
              </Alert>
            ) : null}
            
            <input
              ref={directRate}
              className={loginStyles.inputClass}
              type="number"
              placeholder="Enter direct rate"
              name="Drate"
              onFocus={focusHandler}
              required
            />
       
            <input
              ref={indirectRate}
              className={loginStyles.inputClass}
              type="number"
              placeholder="Enter indirect rate"
              name="IDrate"
              onFocus={focusHandler}
              required
            />
            
            
            <button className={loginStyles.buttonClass} type='submit'>
              Save
            </button>
            
          </div>
        </form>

    </div>
  );
};

