import {useEffect, useRef, useState} from "react";
import loginStyles from '../../../styles/login.module.css';
import {RatesService} from "../../../services/rates.service";
import Alert from '../../../components/alert';


export const ViewMakery = (props) => {
    const [currentMakery, setCurrentMakery] = useState(null);
    const [makeryUpdated, setMakeryUpdated] = useState(null);
    const [makeryDeleted, setMakeryDeleted] = useState(null);
    
    const [error, setError] = useState(null);
    const [item,setItem] = useState(null);
    const [itemRate, setItemRate] = useState(null);

    useEffect(()=>{
      
      RatesService().getCurrentMakeryItem(props.item)
      setCurrentMakery(RatesService().getCurrentMakeryItem(props.item));
      setItem(RatesService().getCurrentMakeryItem(props.item).item);
      setItemRate(RatesService().getCurrentMakeryItem(props.item).rate);
     
    },[])


    if(!currentMakery)
      return null;

    const focusHandler = () => {
      setError(false);
    };
    const chnageHandlerForItem = (e) => {

      setMakeryUpdated(false);
      setMakery(e.target.value);
    };
    const chnageHandlerForRate = (e) => {

      setMakeryUpdated(false);
      setItemRate(e.target.value);
    };

    async function updateMakery(e) {
        e.preventDefault();

        const res = await RatesService().editMakery({
          item: item,
          rate: itemRate,
          previousItem: props.item
        });
        res.status == 200 ? setMakeryUpdated(true) : setError(true);
      }

      async function deleteMakery(e) {
        e.preventDefault();

        const res = await RatesService().DeleteMakery({
          item: item
        });
        res.status == 200 ? setMakeryDeleted(true) : setError(true);
        
        if(res.status == 200)
          props.invokeParent();
        
      }
      if(makeryUpdated | makeryDeleted)
        RatesService().getMakeryList().then();

  return (
  
    <div >
        {makeryUpdated ? (
              <Alert type="success">
                <span>Makery updated successfully.</span>
              </Alert>
        ) : null}
        {makeryDeleted ? (
              <Alert type="success">
                <span>Makery deleted successfully.</span>
              </Alert>
        ) : null}
         {error ? (
              <Alert type="error">
                <span>Error occurred! </span>
              </Alert>
            ) : null}
        <img onClick={deleteMakery} style={{cursor: 'grab'}}  title="Delete this makery" src="/images/delete.png" className={loginStyles.deleteClass} />
        <form onSubmit={updateMakery} className={loginStyles.formClass}>

          <div className={loginStyles.container}>
            <label htmlFor="uname">
              <b>Item</b>
            </label>
            <input
              value={item}
              onChange={chnageHandlerForItem}
              minLength="3"
              className={loginStyles.inputClass}
              type="text"
              name="item"
              onFocus={focusHandler}
              required
            />
            
            <hr />
               <label htmlFor="uname">
              <b>Rate</b>
            </label>
            <input
              value={itemRate}
              onChange={chnageHandlerForRate}
              minLength="3"
              className={loginStyles.inputClass}
              type="number"
              name="rate"
              onFocus={focusHandler}
              required
            />
            <hr />
            
            
            <button className={loginStyles.buttonClass} type='submit'>
              Save changes
            </button>
            
          </div>
        </form>

    </div>
  );
};

