import {useEffect, useState} from "react";
import {UserService} from "../../services";
import {List} from "../general/index";

export const UserList = ({data}) => {

    const [users, setUsers] = useState(null);

    useEffect(()=>{
        UserService().getUsers().then(data => setUsers(data));
    },[])

    return (
        <div>
            {
                <List data = {users} />
            }

        </div>

    )
}


