import {useEffect, useState} from "react";
import globalStyle from '../../styles/utils.module.css';

export const List = (props) => {
    const [userData, setUserData] = useState(null);

    useEffect(()=>{
        setUserData(props.data);
    })
    if(!userData || userData === null)
        return null
    async function fetchData(e){
        e.preventDefault();
        props.invokeUpper(e.currentTarget.innerText.toString().split(".com")[0]+".com")
    }

  return (

    <div >
        {

            userData.status==200 ?
                <table className="table">
                    <thead>
                    <tr>
                        {
                            Object.keys(userData.users[0]).map((keyName, keyIndex)=> {
                           
                                return <th key={keyIndex}>{keyName}</th>
                            })
                        }
                    </tr>

                    </thead>
                    <tbody>
                    {userData && userData.users.map((user) => (
                    <tr className={globalStyle.tab} style={{cursor: 'grab'}} onClick={fetchData} >
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

