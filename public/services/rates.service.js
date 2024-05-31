import {constants} from "../constants";
import {  getCookie } from 'cookies-next';

export const RatesService = () => {
   
    const createFabric = async (fabric) => {
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;

        return await fetch(constants.FABRIC, {
            method: 'POST',
            body: JSON.stringify(fabric),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
   
    const createShipping = async (shipping) => {
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;
        return await fetch(constants.SHIPPING, {
            method: 'POST',
            body: JSON.stringify(shipping),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const createPrinting = async (printing) => {
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;
        return await fetch(constants.PRINTING, {
            method: 'POST',
            body: JSON.stringify(printing),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const createEmbroidery = async (embroidery) => {
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;
        return await fetch(constants.EMBROIDERY, {
            method: 'POST',
            body: JSON.stringify(embroidery),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const createItem = async (item) => {
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;

        return await fetch(constants.ITEM, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const getLocalItemList = async ()=> {
        return JSON.parse(localStorage.getItem('item-list')); 
    }
    const getLocalFabricList = async ()=> {
        return JSON.parse(localStorage.getItem('fabric-list')); 
    }

    const getLocalShippingList = async ()=> {
        
        return JSON.parse(localStorage.getItem('shipping-list')); 
    }
    const getFabricList = async () => {

        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;
        const res = await fetch(constants.FABRIC, {
            method: 'GET',
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
        
        if( res.status == 200 ) {

            let response = await res.json();
            let fabricObject = {
                status:200,
                ...res,
                ...response
            }
            localStorage.setItem('fabric-list', JSON.stringify(fabricObject))
            return fabricObject;
        } else {
            return {
                status:409,
            }
        }
    }
    
    const getShippingList = async (access_token,skip,limit) => {
        
        if(!skip && !limit){
            skip=0; limit=0;
        }
      
        let token;
        if(!access_token)
            token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;
        else token = access_token
        const res = await fetch(constants.SHIPPING+"?skip="+skip+"&limit="+limit, {
            method: 'GET',
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
        if( res.status == 200 ) {
            let response = await res.json();
            let shippingbject = {
                status:200,
                ...res,
                ...response
            }
            localStorage.setItem('shipping-list', JSON.stringify(shippingbject))
            return shippingbject;
        } else {
            return {
                status:409,
            }
        }
    }

    const getPrintingList = async (access_token) => {
        
        let token;
        if(!access_token)
            token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;
        else token = access_token
        const res = await fetch(constants.PRINTING, {
            method: 'GET',
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
        
        if( res.status == 200 ) {
            
            let response = await res.json();
            let printingbject = {
                status:200,
                ...res,
                ...response
            }
        
            localStorage.setItem('printing-list', JSON.stringify(printingbject))
            return printingbject;
        } else {
            return {
                status:409,
            }
        }
    }

    const getEmbroideryList = async (access_token) => {
        let token;
        if(!access_token)
            token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;
        else token = access_token
        const res = await fetch(constants.EMBROIDERY, {
            method: 'GET',
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
        
        if( res.status == 200 ) {
            
            let response = await res.json();
            let embroiderybject = {
                status:200,
                ...res,
                ...response
            }
        
            localStorage.setItem('embroidery-list', JSON.stringify(embroiderybject))
            return embroiderybject;
        } else {
            return {
                status:409,
            }
        }
    }

    const getItemList = async () => {
        
        const token = await JSON.parse(localStorage.getItem('user')) ? getCookie('access_token'): null;
        const res = await fetch(constants.ITEM, {
            method: 'GET',
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
        
        if( res.status == 200 ) {

            let response = await res.json();
            let itemObject = {
                status:200,
                ...res,
                ...response
            }
            
            localStorage.setItem('item-list', JSON.stringify(itemObject))
            return itemObject;
        } else {
            return {
                status:409,
            }
        }
    }

    const getCurrentFabricMaterial =  (material) =>{
        let data = JSON.parse(localStorage.getItem('fabric-list')).data.find(o => o.material === material);
        return data;
    }

    const getCurrentShipping =  (shipping) =>{
        let data = JSON.parse(localStorage.getItem('shipping-list')).data.find(o => o.service === shipping);
        return data;
    }
    const getCurrentPrinting =  (name) =>{
        let data = JSON.parse(localStorage.getItem('printing-list')).data.find(o => o.name === name);
        return data;
    }
    const getCurrentEmbroidery =  (name) =>{
        let data = JSON.parse(localStorage.getItem('embroidery-list')).data.find(o => o.name === name);
        return data;
    }

    const getCurrentItem =  (item) =>{
        
        let data = JSON.parse(localStorage.getItem('item-list')).data.find(o => o.name === item);
        return data;
    }

    const editFabric = async (fabric) => {
        fabric.action = "edit fabric"
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;
        return await fetch(constants.FABRIC+"/"+fabric.material, {
            method: 'PUT',
            body: JSON.stringify(fabric),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
        
    }

    const editShipping = async (shipping) => {
        shipping.action = "edit shipping"
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;
        return await fetch(constants.SHIPPING+"/"+shipping.service, {
            method: 'PUT',
            body: JSON.stringify(shipping),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const editPrinting = async (printing) => {
        printing.action = "edit printing"
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;
        return await fetch(constants.PRINTING+"/"+printing.name, {
            method: 'PUT',
            body: JSON.stringify(printing),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const editEmbroidery = async (embroidery) => {
        embroidery.action = "edit embroidery"
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;
        return await fetch(constants.EMBROIDERY+"/"+embroidery.name, {
            method: 'PUT',
            body: JSON.stringify(embroidery),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }

    const editItem = async (item) => {
        
        item.action = "edit item"
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token'): null;
        return await fetch(constants.ITEM+"/"+item.fabric, {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }

    const DeleteFabric = async (fabric) => {
        fabric.action = "delete fabric"
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;
        return await fetch(constants.FABRIC+"/"+fabric, {
            method: 'Put',
            body: JSON.stringify(fabric),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }

    const DeleteShipping = async (shipping) => {
        
        shipping.action = "delete shipping"
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;
        return await fetch(constants.SHIPPING+"/"+shipping.service, {
            method: 'Put',
            body: JSON.stringify(shipping),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }

    const DeletePrinting = async (printing) => {
        
        printing.action = "delete printing"
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;
        return await fetch(constants.PRINTING+"/"+printing.name, {
            method: 'Put',
            body: JSON.stringify(printing),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const DeleteEmbroidery = async (embroidery) => {
        
        embroidery.action = "delete embroidery"
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token') : null;
        return await fetch(constants.EMBROIDERY+"/"+embroidery.name, {
            method: 'Put',
            body: JSON.stringify(embroidery),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }

    const DeleteItem = async (item) => {
        item.action = "delete item"
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token'): null;
        return await fetch(constants.ITEM+"/"+item, {
            method: 'Put',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const CalculateItemPrice = async (item) => {
        const token = JSON.parse(localStorage.getItem('user')) ? getCookie('access_token'): null;
        return await fetch(constants.CALCULATE, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    return {
        createFabric,
        getFabricList,
        getCurrentFabricMaterial,
        editFabric,
        DeleteFabric,
        getItemList,
        createItem,
        getLocalFabricList,
        getLocalItemList,
        getCurrentItem,
        editItem,
        DeleteItem,
        getShippingList,
        createShipping,
        getLocalShippingList,
        getCurrentShipping,
        editShipping,
        DeleteShipping,
        CalculateItemPrice,
        getPrintingList,
        createPrinting,
        getCurrentPrinting,
        editPrinting,
        DeletePrinting,
        getEmbroideryList,
        createEmbroidery,
        getCurrentEmbroidery,
        editEmbroidery,
        DeleteEmbroidery
    }
}

