import {BehaviorSubject} from "rxjs";
import {constants} from "../constants";

export const UserService = () => {

    const userSubject = new BehaviorSubject(localStorage.getItem('user'))

    const isUserLoggedIn = () => {
        const user = JSON.parse(userSubject.value);
        if(user != null && user.status == 201)
            return true
        else return false;
    }

    const login = async (user) => {
   
        const res = await fetch(constants.LOGIN, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
            },
        });
        if( res.status == 401 ){
            return res
        }else if( res.status == 201 ) {
      
            let response = await res.json();
            let userObject = {
                status:201,
                ...response,
                ...user
            }
            localStorage.setItem('user', JSON.stringify(userObject))
            userSubject.next(userObject);
            return userObject;
        }
    }

     const callLogout = async (token) => {
        const res = await fetch(constants.LOGOUT, {
            method: 'POST',
            body: JSON.stringify({
                token: token,
            }),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token,
            },
        });
        if( res.status == 201 ) {
         let response = await res.json();
         let userObject = {
             status:201,
             ...res,
             ...response
         }
         localStorage.clear();
         return userObject;
        } else {
            return {
                status:409,
            }
        }

    }

     const signup = async (user) => {
        return await fetch(constants.SIGN_UP_URL, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
            },
        });
    }

    const SendEmail = async (email) => {
        const data =  await fetch(constants.SEND_EMAIL, {
            method: 'POST',
            body: JSON.stringify({"email":email}),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
            },
        });
        return data;
    }

    const getUsers = async () => {
        const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).access_token : null;
        const res = await fetch(constants.GET_USERS, {
            method: 'GET',
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
        if( res.status == 200 ) {

            let response = await res.json();
            let userObject = {
                status:200,
                ...res,
                ...response
            }
            localStorage.setItem('users-list', JSON.stringify(userObject))
            return userObject;
        } else {
            return {
                status:409,
            }
        }
    }

    return {
        isUserLoggedIn,
        login,
        callLogout,
        signup,
        getUsers,
        SendEmail,
    }
}
