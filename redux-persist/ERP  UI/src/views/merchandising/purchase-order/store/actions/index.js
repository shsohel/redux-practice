// import { merchandisingApi } from "@api/merchandising";
// import { baseAxios } from "@services";
import { notify } from "@custom/notifications";
import axios from "axios";
import { merchandisingApi } from "../../../../../services/api-end-points/merchandising";
import { ADD_PURCHASE_ORDER, CONTROL_SET_PURCHASE_ORDER, CONTROL_SINGLE_PURCHASE_ORDER, DELETE_PURCHASE_ORDER, DELETE_PURCHASE_ORDERS_BY_RANGE, GET_PURCHASE_ORDERS, GET_PURCHASE_ORDERS_BY_QUERY, GET_PURCHASE_ORDER_BY_ID, OPEN_PURCHASE_ORDER_FORM, SELECTED_PURCHASE_ORDER_NULL, TOTAL_SELECTED_STYLES, UPDATE_PURCHASE_ORDER } from "../action-types";


/// Get All wtihout Query
export const getAllPurchaseOrderss = () => {
    return async dispatch => {
        await axios.get( `${merchandisingApi.purchaseOrder.get_purchaseOrders}` ).then( response => {
            dispatch( {
                type: GET_PURCHASE_ORDERS,
                purchaseOrders: response.data
            } );
        } );
    };
};


//Get Data by Query 
export const getPurchaseOrdersByQuery = params => {

    return async dispatch => {
        await axios.get( `${merchandisingApi.purchaseOrder.get_purchaseOrders_by_query}`, params ).then( response => {
            dispatch( {
                type: GET_PURCHASE_ORDERS_BY_QUERY,
                purchaseOrders: response.data.purchaseOrders,
                totalPages: response.data.total,
                params
            } );
        } );
    };
};

// ** Get purchaseOrder by Id
export const getPurchaseOrderById = id => {
    return async dispatch => {
        await axios
            .get( `${merchandisingApi.purchaseOrder.get_purchaseOrder_by_id}`, { id } )
            .then( response => {
                dispatch( {
                    type: GET_PURCHASE_ORDER_BY_ID,
                    selectedPurchaseOrder: response.data.purchaseOrder ? response.data.purchaseOrder : null
                } );
            } )
            .catch( err => console.log( err ) );
    };
};

/// Selected State Null After Edit or Cancel State Null 
export const selectedPurchaseOrderNull = () => {
    return async dispatch => {
        await dispatch( {
            type: SELECTED_PURCHASE_ORDER_NULL,
            selectedPurchaseOrder: null
        } );
    };
};

export const handleOpenPurchaseOrderForm = ( condition ) => {
    return async dispatch => {
        await dispatch( {
            type: OPEN_PURCHASE_ORDER_FORM,
            openPurchaseOrderForm: condition
        } );
    };
};
export const handleSetOrder = ( condition ) => {
    return async dispatch => {
        await dispatch( {
            type: CONTROL_SET_PURCHASE_ORDER,
            isItSetOrder: condition
        } );
    };
};
export const handleSingleOrder = ( condition ) => {
    return async dispatch => {
        await dispatch( {
            type: CONTROL_SINGLE_PURCHASE_ORDER,
            isItSingleOrder: condition
        } );
    };
};
export const handleTotalSelectedStyles = ( styles ) => {
    return async dispatch => {
        await dispatch( {
            type: TOTAL_SELECTED_STYLES,
            totalSelectedStyles: styles
        } );
    };
};


// ** Add new purchaseOrder
export const addPurchaseOrder = purchaseOrder => {
    return async ( dispatch, getState ) => {
        await axios
            .post( `${merchandisingApi.purchaseOrder.add_purchaseOrder}`, purchaseOrder )
            .then( response => {
                dispatch( {
                    type: ADD_PURCHASE_ORDER,
                    purchaseOrder
                } );
            } )
            .then( () => {
                notify( 'success', 'The Purchase Order has been added Successfully!' );
                dispatch( getPurchaseOrdersByQuery( getState().purchaseOrders.params ) );
                dispatch( getAllPurchaseOrderss() );
            } )
            .catch( err => console.log( err ) );
    };
};

// Update purchaseOrder
export const updatePurchaseOrder = purchaseOrder => {
    return ( dispatch, getState ) => {
        axios
            .post( `${merchandisingApi.purchaseOrder.update_purchaseOrder}`, { purchaseOrder } )
            .then( response => {
                dispatch( {
                    type: UPDATE_PURCHASE_ORDER,
                    purchaseOrder
                } );

            } )
            .then( () => {
                notify( 'success', 'The Purchase Order has been updated Successfully!' );
                dispatch( getPurchaseOrdersByQuery( getState().purchaseOrders.params ) );
                dispatch( getAllPurchaseOrderss() );
            } )
            .catch( err => console.log( err ) );
    };
};

// ** Delete purchaseOrder
export const deletePurchaseOrder = id => {
    return ( dispatch, getState ) => {
        axios
            .delete( `${merchandisingApi.purchaseOrder.delete_purchaseOrder}`, { id } )
            .then( response => {
                dispatch( {
                    type: DELETE_PURCHASE_ORDER
                } );
            } )
            .then( () => {
                notify( 'success', 'The Purchase Order has been deleted Successfully!' );
                dispatch( getPurchaseOrdersByQuery( getState().purchaseOrders.params ) );
                dispatch( getAllPurchaseOrderss() );
            } );
    };
};

// Update purchaseOrder Range Delete
export const deleteRangePurchaseOrder = ids => {
    return ( dispatch, getState ) => {
        axios
            .delete( `${merchandisingApi.purchaseOrder.delete_purchaseOrder_by_range}`, { ids } )
            .then( response => {
                dispatch( {
                    type: DELETE_PURCHASE_ORDERS_BY_RANGE
                } );
            } )
            .then( () => {
                notify( 'success', 'Purchase Orders has been deleted Successfully!' );
                dispatch( getPurchaseOrdersByQuery( getState().purchaseOrders.params ) );
                dispatch( getAllPurchaseOrderss() );
            } );
    };
};

