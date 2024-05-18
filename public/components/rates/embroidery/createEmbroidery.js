import {useEffect, useRef, useState} from "react";
import loginStyles from '@/styles/login.module.css';
import {RatesService} from "@/services/rates.service";
import Alert from '@/components/alert';

export const CreateEmbroidery = (props) => {
    const [embroideryExists, setEmbroideryExists] = useState(null);
    const name = useRef(null);
    const rate = useRef(null);

    useEffect(()=>{props.view; },[])

    const focusHandler = () => {
      setEmbroideryExists(false);
    };

    async function createEmbroideryCall(e) {
        e.preventDefault();
      
        const res = await RatesService().createEmbroidery({
          name: name.current.value,
          base_rate: rate.current.value,
        });
        
        if(res.status == 201){
          RatesService().getEmbroideryList().then(()=>{
            res.status == 201 ? props.invokeParent() : null;
          })
        }else res.status == 409 ? setEmbroideryExists(true) : null;

      }

  return (

    <div >

        <form onSubmit={createEmbroideryCall} className={loginStyles.formClass}>
          
          <div className={loginStyles.container}>
            
            <input
              ref={name}
              minLength="2"
              className={loginStyles.inputClass}
              type="text"
              placeholder="Enter embroidery type ED, Normal"
              name="print"
              onFocus={focusHandler}
              required
            />
            {embroideryExists ? (
              <Alert type="error">
                <span>Already exists</span>
              </Alert>
            ) : null}
            
            <input
              ref={rate}
              className={loginStyles.inputClass}
              type="number"
              placeholder="Enter base rate"
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

