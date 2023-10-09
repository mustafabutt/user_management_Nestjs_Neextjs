import {useEffect, useRef, useState} from "react";
import loginStyles from '../../../styles/login.module.css';
import {RatesService} from "../../../services/rates.service";
import Alert from '../../../components/alert';


export const ViewFabric = (props) => {
    const [currentFabric, setCurrentFabric] = useState(null);
    const [fabricUpdated, setFabricUpdated] = useState(null);
    const [fabricDeleted, setFabricDeleted] = useState(null);
    
    const [error, setError] = useState(null);
    const [fabirc,setFabric] = useState(null);
    const [fabricRate, setFabricRate] = useState(null);

    useEffect(()=>{
      
      RatesService().getCurrentFabricMaterial(props.material)
      setCurrentFabric(RatesService().getCurrentFabricMaterial(props.material));
      setFabric(RatesService().getCurrentFabricMaterial(props.material).material);
      setFabricRate(RatesService().getCurrentFabricMaterial(props.material).rate);
     
    },[])


    if(!currentFabric)
      return null;

    const focusHandler = () => {
      setError(false);
    };
    const chnageHandlerForFabricMaterial = (e) => {

      setFabricUpdated(false);
      setFabric(e.target.value);
    };
    const chnageHandlerForFabricRate = (e) => {

      setFabricUpdated(false);
      setFabricRate(e.target.value);
    };

    async function updateFabric(e) {
        e.preventDefault();

        const res = await RatesService().editFabric({
          material: fabirc,
          rate: fabricRate,
          previousMaterial: props.material
        });
        
        res.status == 200 ? setFabricUpdated(true) : setError(true);
      }

      async function deleteFabric(e) {
        e.preventDefault();

        const res = await RatesService().DeleteFabric({
          material: fabirc
        });
        res.status == 200 ? setFabricDeleted(true) : setError(true);
        
        if(res.status == 200)
          props.invokeParent();
        
      }
      if(fabricUpdated | fabricDeleted)
        RatesService().getFabricList().then();
        

  return (
  
    <div >
        {fabricUpdated ? (
              <Alert type="success">
                <span>Fabric updated successfully.</span>
              </Alert>
        ) : null}
        {fabricDeleted ? (
              <Alert type="success">
                <span>Fabric deleted successfully.</span>
              </Alert>
        ) : null}
         {error ? (
              <Alert type="error">
                <span>Error occurred! </span>
              </Alert>
            ) : null}
        <img onClick={deleteFabric} style={{cursor: 'grab'}}  title="Delete this user" src="/images/delete.png" className={loginStyles.deleteClass} />
        <form onSubmit={updateFabric} className={loginStyles.formClass}>

          <div className={loginStyles.container}>
            <label htmlFor="uname">
              <b>Material</b>
            </label>
            <input
              value={fabirc}
              onChange={chnageHandlerForFabricMaterial}
              minLength="3"
              className={loginStyles.inputClass}
              type="text"
              name="fabric"
              onFocus={focusHandler}
              required
            />
            
            <hr />
               <label htmlFor="uname">
              <b>Rate</b>
            </label>
            <input
              value={fabricRate}
              onChange={chnageHandlerForFabricRate}
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

