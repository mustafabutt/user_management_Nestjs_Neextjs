import {useEffect, useRef, useState} from "react";
import loginStyles from '@/styles/login.module.css';
import {OrderService} from "@/services/ordersManagement.service";
import Alert from '@/components/alert';

export const CreateClient = (props) => {
    const [clientExists, setClientExists] = useState(null);
    const name = useRef(null);
    const email = useRef(null);
    const contact = useRef(null);
    const country = useRef(null);
    const city = useRef(null);
    const state = useRef(null);
    const adress = useRef(null);

    useEffect(()=>{props.view; },[])

    const focusHandler = () => {
      setClientExists(false);
    };

    async function createClientCall(e) {
        e.preventDefault();
      
        const res = await OrderService().createClient({
          email: email.current.value,
          name: name.current.value,
          contact_no: contact.current.value,
          country: country.current.value,
          city: city.current.value,
          state:state.current.value,
          adress:adress.current.value
        });
        
        if(res.status == 201){
          OrderService().getClientList().then(()=>{
            res.status == 201 ? props.invokeParent() : null;
          })
        }else res.status == 409 ? setClientExists(true) : null;

      }

  return (

    <div >

        <form onSubmit={createClientCall} className={loginStyles.formClass}>
          
          <div className={loginStyles.container}>
            
            <input
              ref={email}
              className={loginStyles.inputClass}
              type="email"
              placeholder="Enter email"
              name="email"
              onFocus={focusHandler}
              required
            />
            {clientExists ? (
              <Alert type="error">
                <span>email already exists</span>
              </Alert>
            ) : null}
            
            <input
              ref={name}
              minLength="2"
              className={loginStyles.inputClass}
              type="string"
              placeholder="Enter name"
              name="name"
              onFocus={focusHandler}
              required
            />
            <input
              ref={contact}
              className={loginStyles.inputClass}
              type="string"
              placeholder="Enter contact number"
              name="contact"
              onFocus={focusHandler}
              required
            />
             <input
              ref={country}
              className={loginStyles.inputClass}
              type="country"
              placeholder="Enter country name"
              name="country"
              onFocus={focusHandler}
              required
            />
            <input
              ref={city}
              className={loginStyles.inputClass}
              type="city"
              placeholder="Enter city name"
              name="city"
              onFocus={focusHandler}
              required
            />
            <input
              ref={state}
              className={loginStyles.inputClass}
              type="state"
              placeholder="Enter state name"
              name="state"
              onFocus={focusHandler}
              required
            />
            <input
              ref={adress}
              className={loginStyles.inputClass}
              type="adress"
              placeholder="Enter adress name"
              name="adress"
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

