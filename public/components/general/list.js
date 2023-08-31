import {useEffect, useState} from "react";

export const List = ({data}) => {
    const [userData, setUserData] = useState(null);

    useEffect(()=>{
        setUserData(data);
    })
    if(!userData || userData === null)
        return null

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
                    <tr>
                        {
                            Object.keys(user).map((keyName, keyIndex)=> {
                            
                                return <td key={keyIndex}>{user[keyName].toString() }</td>

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

