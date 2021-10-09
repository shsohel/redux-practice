
import { ADD_SET_STYLE, DELETE_SET_STYLE, DELETE_SET_STYLES_BY_RANGE, DROP_DOWN_SET_STYLES, GET_SET_STYLES, GET_SET_STYLES_BY_QUERY, GET_SET_STYLE_BY_ID, SELECTED_SET_STYLE_NULL, UPDATE_SET_STYLE } from "../action-types";
const initialState = {
    setStyles: [],
    queryData: [],
    total: 1,
    params: {},
    selectedSetStyle: null,
    dropDownSetStyles: null
};

const styleReducers = ( state = initialState, action ) => {
    switch ( action.type ) {
        case GET_SET_STYLES:
            return { ...state, setStyles: action.setStyles };
        case GET_SET_STYLE_BY_ID:
            return { ...state, selectedSetStyle: action.selectedSetStyle };
        case SELECTED_SET_STYLE_NULL:
            return { ...state, selectedSetStyle: action.selectedSetStyle };
        case DROP_DOWN_SET_STYLES:
            return { ...state, dropDownSetStyles: action.dropDownSetStyles };
        case GET_SET_STYLES_BY_QUERY:
            return {
                ...state,
                queryData: action.setStyles,
                total: action.totalPages,
                params: action.params
            };
        case ADD_SET_STYLE:
            return { ...state };
        case UPDATE_SET_STYLE:
            return { ...state };
        case DELETE_SET_STYLE:
            return { ...state };
        case DELETE_SET_STYLES_BY_RANGE:
            return { ...state };
        default:
            return state;
    }
};

export default styleReducers;