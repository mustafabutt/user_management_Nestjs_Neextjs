import {BehaviorSubject} from "rxjs";
import {constants} from "../constants";

export const RatesService = () => {
    
    const createFabric = async (fabric) => {
        const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).access_token : null;

        return await fetch(constants.FABRIC, {
            method: 'POST',
            body: JSON.stringify(fabric),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const createMakery = async (makery) => {
        const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).access_token : null;

        return await fetch(constants.MAKERY, {
            method: 'POST',
            body: JSON.stringify(makery),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const createShipping = async (shipping) => {
        const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).access_token : null;

        return await fetch(constants.SHIPPING, {
            method: 'POST',
            body: JSON.stringify(shipping),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const createItem = async (item) => {
        const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).access_token : null;

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
    const getLocalMakeryList = async ()=> {
        
        return JSON.parse(localStorage.getItem('makery-list')); 
    }
    const getLocalShippingList = async ()=> {
        
        return JSON.parse(localStorage.getItem('shipping-list')); 
    }
    const getFabricList = async () => {

        const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).access_token : null;
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
    const getMakeryList = async () => {
        const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).access_token : null;
        const res = await fetch(constants.MAKERY, {
            method: 'GET',
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
        
        if( res.status == 200 ) {
            
            let response = await res.json();
            let makeryObject = {
                status:200,
                ...res,
                ...response
            }
            
            localStorage.setItem('makery-list', JSON.stringify(makeryObject))
            return makeryObject;
        } else {
            return {
                status:409,
            }
        }
    }
    const getShippingList = async () => {
        const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).access_token : null;
        const res = await fetch(constants.SHIPPING, {
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

    const getItemList = async () => {
        const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).access_token : null;
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

    const getCurrentMakeryItem =  (item) =>{
        let data = JSON.parse(localStorage.getItem('makery-list')).data.find(o => o.item === item);
        return data;
    }
    const getCurrentShipping =  (shipping) =>{
        debugger
        let data = JSON.parse(localStorage.getItem('shipping-list')).data.find(o => o.service === shipping);
        return data;
    }

    const getCurrentItem =  (item) =>{
        
        let data = JSON.parse(localStorage.getItem('item-list')).data.find(o => o.name === item);
        return data;
    }

    const editFabric = async (fabric) => {
        fabric.action = "edit fabric"
        const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).access_token : null;
        return await fetch(constants.FABRIC+"/"+fabric.material, {
            method: 'PUT',
            body: JSON.stringify(fabric),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
        
    }
    const editMakery = async (makery) => {
        makery.action = "edit makery"
        const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).access_token : null;
        return await fetch(constants.MAKERY+"/"+makery.item, {
            method: 'PUT',
            body: JSON.stringify(makery),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const editShipping = async (shipping) => {
        shipping.action = "edit shipping"
        const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).access_token : null;
        return await fetch(constants.SHIPPING+"/"+shipping.service, {
            method: 'PUT',
            body: JSON.stringify(shipping),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }

    const editItem = async (item) => {
        
        item.action = "edit item"
        const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).access_token : null;
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
        const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).access_token : null;
        return await fetch(constants.FABRIC+"/"+fabric, {
            method: 'Put',
            body: JSON.stringify(fabric),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const DeleteMakery = async (item) => {
        
        item.action = "delete makery"
        const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).access_token : null;
        return await fetch(constants.MAKERY+"/"+item, {
            method: 'Put',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }
    const DeleteShipping = async (shipping) => {
        
        shipping.action = "delete shipping"
        const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).access_token : null;
        return await fetch(constants.SHIPPING+"/"+shipping.service, {
            method: 'Put',
            body: JSON.stringify(shipping),
            headers: {
                'Content-Type': constants.CONTENT_TYPE,
                Authorization: constants.BEARER+token
            },
        });
    }

    const DeleteItem = async (item) => {
        item.action = "delete item"
        const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).access_token : null;
        return await fetch(constants.ITEM+"/"+item, {
            method: 'Put',
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
        getMakeryList,
        createMakery,
        getCurrentMakeryItem,
        editMakery,
        DeleteMakery,
        getItemList,
        createItem,
        getLocalFabricList,
        getLocalMakeryList,
        getLocalItemList,
        getCurrentItem,
        editItem,
        DeleteItem,
        getShippingList,
        createShipping,
        getLocalShippingList,
        getCurrentShipping,
        editShipping,
        DeleteShipping
    }
}

