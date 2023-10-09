import {useEffect, useState} from "react";
import {UserService} from "../../services/user.service";
import {List} from "../general/index";

export const UserList = (props) => {

    const [users, setUsers] = useState(null);

    useEffect(()=>{
        props.view
        
        UserService().getUsers().then((data)=>{
            
            data.users = data.data.filter(function(el) { return el.email != UserService().getCurrentUser().email }); 
            setUsers(data)
        });
    },[])

    async function ListData(user){
        props.invokeTopParent(user.split(".com")[0]+".com");
      }
    
    return (
  
        <div>
            
            {
                <List view = {"users"}  invokeUpper={ListData} data = {users} />
            }

        </div>

    )
}


