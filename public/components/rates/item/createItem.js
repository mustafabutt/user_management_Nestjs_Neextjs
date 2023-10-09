import {useEffect, useRef, useState} from "react";
import loginStyles from '../../../styles/login.module.css';
import {RatesService} from "../../../services/rates.service";
import Alert from '../../../components/alert';
import $ from 'jquery';

export const CreateItem = (props) => {
    const [makeryExists, setMakeryExists] = useState(null);
    const [fabricList, setFabricList] = useState(null);
    const item = useRef(null);
    const rate = useRef(null);

    useEffect(()=>{props.view; 
      RatesService().getLocalFabricList().then((data)=>{
        let tempArray = [];
        data.data.map((keyName)=> {
          let fabricName = keyName.material;
          tempArray.push(fabricName);
      })

      const obj = {};
      tempArray.forEach((element) => {
          obj[`${element}`] = "";
          });
setFabricList(obj)
      })
    },[])
    const focusHandler = () => {
      setMakeryExists(false);
      };

    async function createItemCall(e) {
      e.preventDefault();
      let finalArray = [];
      const tempObj={};
        Object.keys(fabricList).map((fabricName)=>{
          tempObj={};
          tempObj['fabric'] = fabricName;
          tempObj['quantity'] = $("input[name="+fabricName+"]").val();
          finalArray.push(tempObj);
        })
       
        const res = await RatesService().createItem({ 
          name: item.current.value,
          fabricAverage:  finalArray
        });
        
        res.status == 201 ? props.invokeParent() : null;
        
        res.status == 409 ? setMakeryExists(true) : null;
      }
     
  return (

    <div >

        <form onSubmit={createItemCall} className={loginStyles.formClass}>
          
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
            
         
            <table className="table">
                
                <tbody>
                <p>Insert avergaes in grams.</p>
                {
                 fabricList ?
                 Object.keys(fabricList).map((keyName, keyIndex)=> {
               
                  return <tr key={keyIndex}>
               
                    <td>Avg. in {keyName}</td>
                    <td> <input name={keyName} type="text" size={5}  /></td>
                  </tr>
                  }):null
                }
                </tbody>
            </table>
          
            
            <button className={loginStyles.buttonClass} type='submit'>
              Save
            </button>
            
          </div>
        </form>

    </div>
  );
};

