import {useEffect, useRef, useState} from "react";
import loginStyles from '../../../styles/login.module.css';
import {RatesService} from "../../../services/rates.service";
import Alert from '../../../components/alert';
import { constants } from "../../../constants";

export const CreateMakery = (props) => {
    const [makeryExists, setMakeryExists] = useState(null);
    const item = useRef(null);
    const rate = useRef(null);

    useEffect(()=>{props.view; debugger},[])
    const focusHandler = () => {
      setMakeryExists(false);
      };

    async function createMakeryCall(e) {
        e.preventDefault();
      
        const res = await RatesService().createMakery({
          item: item.current.value,
          rate:   rate.current.value
        });
        if(res.status == 201){
          RatesService().getMakeryList().then(()=>{
            res.status == 201 ? props.invokeParent() : null;
          })
        }else res.status == 409 ? setMakeryExists(true) : null;
      }

  return (

    <div >

        <form onSubmit={createMakeryCall} className={loginStyles.formClass}>
          
          <div className={loginStyles.container}>
            
            <input
              ref={item}
              minLength="5"
              className={loginStyles.inputClass}
              type="text"
              placeholder="Enter item name"
              name="item"
              onFocus={focusHandler}
              required
            />
            {makeryExists ? (
              <Alert type="error">
                <span>Already exists</span>
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

