import FileSaver from 'file-saver';
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
    const getCurrentOrder =  (id) =>{
        
        let data = JSON.parse(localStorage.getItem('orders-list')).data.find(o => o._id == id);
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
    const editOrder = async (order) => {
        
        order.action = "edit order"
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token'): null;
        return await fetch(constants.ORDER, {
            method: 'PUT',
            body: JSON.stringify(order),
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
    const DeleteOrder = async (order) => {
        order.action = "delete order"
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token'): null;
        return await fetch(constants.ORDER, {
            method: 'Put',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const FetchInvoices = async (email) => {
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token'): null;
        return await fetch(constants.ORDER_INVOICES, {
            method: 'Post',
            body: JSON.stringify(email),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const DeleteInvoice = async (obj) => {
        
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token'): null;
        return await fetch(constants.DELETE_INVOICE, {
            method: 'Post',
            body:  JSON.stringify(obj),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const GenerateInvoice = async (obj) => {
        
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token'): null;
        return await fetch(constants.GENERATE_INVOICE, {
            method: 'Post',
            body:  JSON.stringify(obj.tempOder),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const DownloadInvoice = async (obj) => {
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token'): null;
        return await fetch(constants.DOWNLOAD_INVOICE+obj.file+"&email="+obj.email, {
            method: 'Post',
            body:  JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/octet-stream',
                Authorization: constants.BEARER+token,
        
            },
        }).then(function(response) {
            return response.blob();
          }).then(function(blob) {
            FileSaver.saveAs(blob, obj.file);
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
        getLocalOrderList,
        getCurrentOrder,
        editOrder,
        DeleteOrder,
        FetchInvoices,
        DeleteInvoice,
        DownloadInvoice,
        GenerateInvoice
    }
}

