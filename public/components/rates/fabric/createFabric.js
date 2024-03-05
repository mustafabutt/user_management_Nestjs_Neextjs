import {useEffect, useRef, useState} from "react";
import loginStyles from '@/styles/login.module.css';
import {RatesService} from "@/services/rates.service";
import Alert from '@/components/alert';

export const CreateFabric = (props) => {
    const [fabricExists, setFabricExists] = useState(null);
    const material = useRef(null);
    const rate = useRef(null);

    useEffect(()=>{props.view; debugger},[])
    const focusHandler = () => {
      setFabricExists(false);
      };

    async function createFabricCall(e) {
        e.preventDefault();
      
        const res = await RatesService().createFabric({
          material: material.current.value,
          rate:   rate.current.value
        });
        
        if(res.status == 201){
          RatesService().getFabricList().then(()=>{
            res.status == 201 ? props.invokeParent() : null;   
          });
        }else res.status == 409 ? setFabricExists(true) : null;
        
      }

  return (

    <div >

        <form onSubmit={createFabricCall} className={loginStyles.formClass}>
          
          <div className={loginStyles.container}>
            
            <input
              ref={material}
              minLength="5"
              className={loginStyles.inputClass}
              type="text"
              placeholder="Enter material name"
              name="material"
              onFocus={focusHandler}
              required
            />
            {fabricExists ? (
              <Alert type="error">
                <span>material already exists</span>
              </Alert>
            ) : null}
            
            <input
              ref={rate}
              className={loginStyles.inputClass}
              type="number"
              placeholder="Enter rate"
              name="rate"
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

