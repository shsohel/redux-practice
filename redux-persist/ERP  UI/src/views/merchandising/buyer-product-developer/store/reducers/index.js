import { ADD_BUYER_PRODUCT_DEVELOPER, DELETE_BUYER_PRODUCT_DEVELOPER, DELETE_BUYER_PRODUCT_DEVELOPER_BY_RANGE, DROP_DOWN_BUYER_PRODUCT_DEVELOPERS, GET_BUYER_PRODUCT_DEVELOPERS, GET_BUYER_PRODUCT_DEVELOPERS_BY_QUERY, GET_BUYER_PRODUCT_DEVELOPER_BY_ID, OPEN_BUYER_PRODUCT_DEVELOPER_SIDEBAR, SELECTED_BUYER_PRODUCT_DEVELOPER_NULL, UPDATE_BUYER_PRODUCT_DEVELOPER } from "../actionTypes";

const initialState = {
    productDevelopers: [],
    queryData: [],
    total: 1,
    params: {},
    selectedProductDeveloper: null,
    openProductDeveloperSidebar: false,
    dropDownProductDevelopers: null
};


const productDeveloperReduces = ( state = initialState, action ) => {
    switch ( action.type ) {
        case GET_BUYER_PRODUCT_DEVELOPERS:
            return { ...state, productDevelopers: action.productDevelopers };
        case GET_BUYER_PRODUCT_DEVELOPER_BY_ID:
            return { ...state, selectedProductDeveloper: action.selectedProductDeveloper };
        case SELECTED_BUYER_PRODUCT_DEVELOPER_NULL:
            return { ...state, selectedProductDeveloper: action.selectedProductDeveloper };
        case OPEN_BUYER_PRODUCT_DEVELOPER_SIDEBAR:
            return { ...state, openProductDeveloperSidebar: action.openProductDeveloperSidebar };
        case DROP_DOWN_BUYER_PRODUCT_DEVELOPERS:
            return { ...state, dropDownProductDevelopers: action.dropDownProductDevelopers };
        case GET_BUYER_PRODUCT_DEVELOPERS_BY_QUERY:
            return {
                ...state,
                queryData: action.productDevelopers,
                total: action.totalPages,
                params: action.params
            };
        case ADD_BUYER_PRODUCT_DEVELOPER:
            return { ...state };
        case UPDATE_BUYER_PRODUCT_DEVELOPER:
            return { ...state };
        case DELETE_BUYER_PRODUCT_DEVELOPER:
            return { ...state };
        case DELETE_BUYER_PRODUCT_DEVELOPER_BY_RANGE:
            return { ...state };
        default:
            return state;
    }
};
export default productDeveloperReduces;