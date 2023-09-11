import {useEffect, useState} from "react";
import {UserService} from "../../services";
import {List} from "../general/index";

export const UserList = (props) => {

    const [users, setUsers] = useState(null);

    useEffect(()=>{
        UserService().getUsers().then((data)=>{
            data.users = data.users.filter(function(el) { return el.email != UserService().getCurrentUser().email }); 
            setUsers(data)
        });
    },[])

    async function ListData(user){
        props.invokeTopParent(user);
      }
    return (
  
        <div>
            
            {
                <List invokeUpper={ListData} data = {users} />
            }

        </div>

    )
}


