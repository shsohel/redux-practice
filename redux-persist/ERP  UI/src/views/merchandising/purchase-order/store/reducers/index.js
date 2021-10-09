import { ADD_PURCHASE_ORDER, CONTROL_SET_PURCHASE_ORDER, CONTROL_SINGLE_PURCHASE_ORDER, DELETE_PURCHASE_ORDER, DELETE_PURCHASE_ORDERS_BY_RANGE, GET_PURCHASE_ORDERS, GET_PURCHASE_ORDERS_BY_QUERY, GET_PURCHASE_ORDER_BY_ID, OPEN_PURCHASE_ORDER_FORM, SELECTED_PURCHASE_ORDER_NULL, TOTAL_SELECTED_STYLES, UPDATE_PURCHASE_ORDER } from "../action-types";


const initialState = {
    purchaseOrders: [],
    queryData: [],
    total: 1,
    params: {},
    selectedPurchaseOrder: null,
    openPurchaseOrderForm: false,
    isItSetOrder: false,
    isItSingleOrder: false,
    totalSelectedStyles: null
};

const purchaseOrderReduces = ( state = initialState, action ) => {
    switch ( action.type ) {
        case GET_PURCHASE_ORDERS:
            return { ...state, purchaseOrders: action.purchaseOrders };
        case GET_PURCHASE_ORDER_BY_ID:
            return { ...state, selectedPurchaseOrder: action.selectedPurchaseOrder };
        case SELECTED_PURCHASE_ORDER_NULL:
            return { ...state, selectedPurchaseOrder: action.selectedPurchaseOrder };
        case OPEN_PURCHASE_ORDER_FORM:
            return { ...state, openPurchaseOrderForm: action.openPurchaseOrderForm };
        case CONTROL_SET_PURCHASE_ORDER:
            return { ...state, isItSetOrder: action.isItSetOrder };
        case CONTROL_SINGLE_PURCHASE_ORDER:
            return { ...state, isItSingleOrder: action.isItSingleOrder };
        case TOTAL_SELECTED_STYLES:
            return { ...state, totalSelectedStyles: action.totalSelectedStyles };
        case GET_PURCHASE_ORDERS_BY_QUERY:
            return {
                ...state,
                queryData: action.purchaseOrders,
                total: action.totalPages,
                params: action.params
            };
        case ADD_PURCHASE_ORDER:
            return { ...state };
        case UPDATE_PURCHASE_ORDER:
            return { ...state };
        case DELETE_PURCHASE_ORDER:
            return { ...state };
        case DELETE_PURCHASE_ORDERS_BY_RANGE:
            return { ...state };
        default:
            return state;
    }


};

export default purchaseOrderReduces;