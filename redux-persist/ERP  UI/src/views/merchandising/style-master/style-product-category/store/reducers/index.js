import { ADD_PRODUCT_CATEGORY, DELETE_PRODUCT_CATEGORY, DELETE_PRODUCT_CATEGORY_BY_RANGE, DROP_DOWN_PRODUCT_CATEGORIES, GET_PRODUCT_CATEGORIES, GET_PRODUCT_CATEGORIES_BY_QUERY, GET_PRODUCT_CATEGORY_BY_ID, OPEN_PRODUCT_CATEGORY_SIDEBAR, SELECTED_PRODUCT_CATEGORY_NULL, UPDATE_PRODUCT_CATEGORY } from '../actionTypes';

const initialState = {
    productCategories: [],
    queryData: [],
    total: 1,
    params: {},
    selectedProductCategory: null,
    openProductCategorySidebar: false,
    dropDownProductCategories: null,
    lastCreatedId: null
};


const productCategoryReduces = ( state = initialState, action ) => {
    switch ( action.type ) {
        case GET_PRODUCT_CATEGORIES:
            return { ...state, productCategories: action.productCategories };
        case GET_PRODUCT_CATEGORY_BY_ID:
            return { ...state, selectedProductCategory: action.selectedProductCategory };
        case SELECTED_PRODUCT_CATEGORY_NULL:
            return { ...state, selectedProductCategory: action.selectedProductCategory };
        case OPEN_PRODUCT_CATEGORY_SIDEBAR:
            return { ...state, openProductCategorySidebar: action.openProductCategorySidebar };
        case DROP_DOWN_PRODUCT_CATEGORIES:
            return { ...state, dropDownProductCategories: action.dropDownProductCategories };
        case GET_PRODUCT_CATEGORIES_BY_QUERY:
            return {
                ...state,
                queryData: action.productCategories,
                total: action.totalPages,
                params: action.params
            };
        case ADD_PRODUCT_CATEGORY:
            return { ...state, lastCreatedId: action.lastCreatedId };
        case UPDATE_PRODUCT_CATEGORY:
            return { ...state };
        case DELETE_PRODUCT_CATEGORY:
            return { ...state };
        case DELETE_PRODUCT_CATEGORY_BY_RANGE:
            return { ...state };
        default:
            return state;
    }
};
export default productCategoryReduces;