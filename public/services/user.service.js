
import {BehaviorSubject} from "rxjs";
import {constants} from "../constants";


import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export const UserService = () => {
    const userSubject = new BehaviorSubject(localStorage.getItem('user'))
    
    const isUserLoggedIn = () => {
        const user = JSON.parse(userSubject.value);
        if(user != null && user.status == 201)
            return true
        else return false;
    }

    const isAdmin = () => {
        const user = JSON.parse(userSubject.value);
        
        if(user && user.role == "admin")
            return true;
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
      
            // delete user._doc.password;
            let response = await res.json();
            let userObject = {
                status:201,
                ...response
            }
     
            setCookie('access_token', userObject.access_token,{ maxAge: 60 * 60 * 24 });
            delete userObject.access_token
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
         deleteCookie('access_token');
         return userObject;
        } 
        localStorage.clear();
        deleteCookie('access_token');

    }

    const signUp = async (user) => { 
        return await fetch(constants.SIGN_UP_URL, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
            },
        });
    }
    
    const createUser = async (user) => {
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;
        
        return await fetch(constants.USERS, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }

     const changePassword = async (user) => {
        user.action = "change password"
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token'): null;
        return await fetch(constants.USERS+"/"+user.email, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }

    const postImage = async (image,email) => {
        let formData = new FormData();
        formData.append('file', image.file);
        formData.append('email', email);
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token'): null;
        return await fetch(constants.AVATAR, {
            method: 'Put',
            body:formData,
            headers: {
                 Authorization: constants.BEARER+token
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

    const getCurrentUser = () =>{
        return JSON.parse(localStorage.getItem('user'));
    }
    const getAccessToken = () => {
        return getCookie("access_token")
    }
    const getUsers = async () => {
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;
    
        const res = await fetch(constants.USERS, {
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

    const getSingletUser = (email) =>{
        var user = JSON.parse(localStorage.getItem('users-list')).data.find(o => o.email === email);
        return user;
    }

    const editUser = async (user) => {
        user.action = "edit user"
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;
        return await fetch(constants.USERS+"/"+user.email, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const DeleteUser = async (user) => {
        user.action = "delete user"
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;
        return await fetch(constants.USERS+"/"+user.email, {
            method: 'Put',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const getAvatar = async () => {
        
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;
        let img = await fetch(constants.AVATAR, {
            method: 'Get',
            responseType: 'stream',
            headers: {
                Authorization: constants.BEARER+token,
                'email':JSON.parse(localStorage.getItem('user')).email
            },
        });

        const blob = await img.blob();
        const text = await blob.arrayBuffer();
        const encoded = Buffer.from(text).toString("base64");
        return encoded;
        
    }

    return {
        isUserLoggedIn,
        login,
        callLogout,
        signUp,
        getUsers,
        SendEmail,
        changePassword,
        createUser,
        getCurrentUser,
        isAdmin,
        getSingletUser,
        editUser,
        DeleteUser,
        postImage,
        getAccessToken,
        getAvatar
    }
}

