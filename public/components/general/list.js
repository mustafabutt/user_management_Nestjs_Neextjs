import {useEffect, useState} from "react";
import globalStyle from '../../styles/utils.module.css';

export const List = (props) => {
    const [userData, setUserData] = useState(null);

    useEffect(()=>{
        setUserData(props.data);
    })
    
    async function fetchData(e){
        e.preventDefault();
        
        if(props.view == "users")
            props.invokeUpper(e.currentTarget.innerText);
        else  props.invokeUpper(e.currentTarget.innerText);
    }
    
    if(!userData || userData === null)
        return "No data"
    if((userData && userData.status != 409) && userData.data.length == 0)
        return "No data"

  return (

    <div >
        {
            userData.status==200 ?
            <table className="table">
                <thead>
                <tr>
                    {
                        Object.keys(userData.data[0]).map((keyName, keyIndex)=> {
                        
                            return <th key={keyIndex}>{keyName}</th>
                        })
                    }
                </tr>

                </thead>
                <tbody>
                {userData && userData.data.map((user, i) => (
                <tr key={i} className={globalStyle.tab} style={{cursor: 'grab'}} onClick={fetchData} >
                    {
                        Object.keys(user).map((keyName, keyIndex)=> {
                        
                            return <td  key={keyIndex}>{user[keyName].toString() }</td>

                        })
                    }
                </tr>
                ))}
                </tbody>
            </table>
            : null
        }

    </div>
  );
};

