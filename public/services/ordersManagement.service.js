import {constants} from "../constants";
import {  getCookie } from 'cookies-next';

export const OrderService = () => {
   


    const createClient = async (item) => {
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;

        return await fetch(constants.CLIENT, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const createOrder = async (order) => {
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;

        return await fetch(constants.ORDER, {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }

    const getLocalClientList = async ()=> {
        return JSON.parse(localStorage.getItem('item-list')); 
    }
    const getLocalOrderList = async ()=> {
        return JSON.parse(localStorage.getItem('orders-list')); 
    }
    const getClientList = async () => {
        
        const token = await JSON.parse(localStorage.getItem('user')) ? getCookie('access_token'): null;
        const res = await fetch(constants.CLIENT, {
            method: 'GET',
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
        
        if( res.status == 200 ) {
            let response = await res.json();
            let clientObject = {
                status:200,
                ...res,
                ...response
            }
            localStorage.setItem('clients-list', JSON.stringify(clientObject))
            return clientObject;
        } else {
            return {
                status:409,
            }
        }
    }
    
    const getOrderList = async () => {
        
        const token = await JSON.parse(localStorage.getItem('user')) ? getCookie('access_token'): null;
        const res = await fetch(constants.ORDER, {
            method: 'GET',
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
        
        if( res.status == 200 ) {
            let response = await res.json();
            let orderObject = {
                status:200,
                ...res,
                ...response
            }
            localStorage.setItem('orders-list', JSON.stringify(orderObject))
            return orderObject;
        } else {
            return {
                status:409,
            }
        }
    }

    const getCurrentClient =  (email) =>{
        let data = JSON.parse(localStorage.getItem('clients-list')).data.find(o => o.email == email);
        return data;
    }
    const editClient = async (item) => {
        
        item.action = "edit client"
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token'): null;
        return await fetch(constants.CLIENT+"/", {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const DeleteClient = async (item) => {
        item.action = "delete client"
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token'): null;
        return await fetch(constants.CLIENT+"/", {
            method: 'Put',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    
    return {
        getClientList,
        createClient,
        getLocalClientList,
        getCurrentClient,
        editClient,
        DeleteClient,
        getOrderList,
        createOrder,
        getLocalOrderList
    }
}

