import {useEffect, useRef, useState} from "react";
import loginStyles from '../../../styles/login.module.css';
import {RatesService} from "../../../services/rates.service";
import Alert from '../../../components/alert';
import $ from 'jquery';

export const ViewItem = (props) => {
    const [currentItem, setCurrentItem] = useState(null);
    const [itemUpdated, setItemUpdated] = useState(null);
    const [itemDeleted, setItemDeleted] = useState(null);
    
    const [error, setError] = useState(null);
    const [item,setItem] = useState(null);
    const [itemFabricAverage, setItemFabricAverage] = useState(null);

    useEffect(()=>{
      debugger
      setCurrentItem(RatesService().getCurrentItem(props.item));
      setItemFabricAverage(RatesService().getCurrentItem(props.item).fabricAverage);
      setItem(props.item);
    },[])


    if(!currentItem)
      return null;

    const focusHandler = () => {
      setError(false);
    };
    const chnageHandlerForItem = (e) => {

      setItemUpdated(false);
      setItem(e.target.value);
    };


    async function updateMakery(e) {
        e.preventDefault();
        let finalArray = [];
        const tempObj={};
        itemFabricAverage
        itemFabricAverage.map((fabricName)=>{
          
          tempObj={};
          tempObj['fabric'] = fabricName.fabric;
          tempObj['quantity'] = $("input[name="+fabricName.fabric+"]").val();
          finalArray.push(tempObj);
        })
        
        const res = await RatesService().editItem({
          name: item,
          fabricAverage: finalArray,
          previousItem: props.item
        });
        res.status == 200 ? setItemUpdated(true) : setError(true);
      }

      async function deleteItem(e) {
        e.preventDefault();

        const res = await RatesService().DeleteItem({
          name: item
        });
        res.status == 200 ? setItemDeleted(true) : setError(true);
        
        if(res.status == 200)
          props.invokeParent();
        
      }
     
  return (
  
    <div >
        {itemUpdated ? (
              <Alert type="success">
                <span>Item updated successfully.</span>
              </Alert>
        ) : null}
        {itemDeleted ? (
              <Alert type="success">
                <span>Item deleted successfully.</span>
              </Alert>
        ) : null}
         {error ? (
              <Alert type="error">
                <span>Error occurred! </span>
              </Alert>
            ) : null}
        <img onClick={deleteItem} style={{cursor: 'grab'}}  title="Delete this makery" src="/images/delete.png" className={loginStyles.deleteClass} />
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
            {
                 itemFabricAverage ?
                 itemFabricAverage.map((item)=> {
               
                  return <tr key={item}>
                            <td>Avg. in {item.fabric}</td>
                            <td> <input name={item.fabric} defaultValue={item.quantity} type="text" size={5}  /></td>
                         </tr>
                  }):null
                }
            
            <hr />
            
            <button className={loginStyles.buttonClass} type='submit'>
              Save changes
            </button>
            
          </div>
        </form>

    </div>
  );
};

