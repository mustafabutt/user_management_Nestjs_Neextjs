
import {useEffect, useState} from "react";
 const Dropdown = (props) => {
  const [userData, setUserData] = useState(null);

  useEffect( ()=>{
    setUserData(props.list);
  },[])

  function changeValue(e){
    props.getData(e.target.value, props.data)
  }

  return (
    <div>
      <select onChange={changeValue} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-4 px-6 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
      <option>Choose {props.data}</option>
        {userData && userData.map((keyName,keyIndex) => {
          
          if(props.data == "cleints")
            return <option key={keyIndex}>{keyName.email}</option>
          return <option key={keyIndex}>{keyName.service || keyName.item || keyName.material || keyName.name || keyName || keyName.email}</option>
            }
          )
        } 
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg class="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>    
    </div>
  )
}
export default Dropdown;