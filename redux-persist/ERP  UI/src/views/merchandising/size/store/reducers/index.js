import { ADD_SIZE, DELETE_SIZE, DELETE_SIZES_BY_RANGE, DROP_DOWN_SIZES, GET_SIZES, GET_SIZES_BY_QUERY, GET_SIZE_BY_ID, OPEN_SIZE_SIDEBAR, SELECTED_SIZE_NULL, UPDATE_SIZE } from '../actionTypes';

const initialState = {
    sizes: [],
    queryData: [],
    total: 1,
    params: {},
    selectedSize: null,
    openSizeSidebar: false,
    dropDownSizes: null,
    lastCreatedId: null
};


const sizesReduces = ( state = initialState, action ) => {
    switch ( action.type ) {
        case GET_SIZES:
            return { ...state, sizes: action.sizes };
        case GET_SIZE_BY_ID:
            return { ...state, selectedSize: action.selectedSize };
        case SELECTED_SIZE_NULL:
            return { ...state, selectedSize: action.selectedSize };
        case OPEN_SIZE_SIDEBAR:
            return { ...state, openSizeSidebar: action.openSizeSidebar };
        case DROP_DOWN_SIZES:
            return { ...state, dropDownSizes: action.dropDownSizes };
        case GET_SIZES_BY_QUERY:
            return {
                ...state,
                queryData: action.sizes,
                total: action.totalPages,
                params: action.params
            };
        case ADD_SIZE:
            return { ...state, lastCreatedId: action.lastCreatedId };
        case UPDATE_SIZE:
            return { ...state };
        case DELETE_SIZE:
            return { ...state };
        case DELETE_SIZES_BY_RANGE:
            return { ...state };
        default:
            return state;
    }
};
export default sizesReduces;
