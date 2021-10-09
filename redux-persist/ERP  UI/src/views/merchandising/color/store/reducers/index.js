import { ADD_COLOR, DELETE_COLOR, DELETE_COLORS_BY_RANGE, DROP_DOWN_COLORS, GET_COLORS, GET_COLORS_BY_QUERY, GET_COLOR_BY_ID, OPEN_COLOR_SIDEBAR, SELECTED_COLOR_NULL, UPDATE_COLOR } from '../actionTypes';

const initialState = {
    colors: [],
    queryData: [],
    total: 1,
    params: {},
    selectedColor: null,
    openColorSidebar: false,
    dropDownColors: null
};


const colorsReduces = ( state = initialState, action ) => {
    switch ( action.type ) {
        case GET_COLORS:
            return { ...state, colors: action.colors };
        case GET_COLOR_BY_ID:
            return { ...state, selectedColor: action.selectedColor };
        case SELECTED_COLOR_NULL:
            return { ...state, selectedColor: action.selectedColor };
        case OPEN_COLOR_SIDEBAR:
            return { ...state, openColorSidebar: action.openColorSidebar };
        case DROP_DOWN_COLORS:
            return { ...state, dropDownColors: action.dropDownColors };
        case GET_COLORS_BY_QUERY:
            return {
                ...state,
                queryData: action.colors,
                total: action.totalPages,
                params: action.params
            };
        case ADD_COLOR:
            return { ...state };
        case UPDATE_COLOR:
            return { ...state };
        case DELETE_COLOR:
            return { ...state };
        case DELETE_COLORS_BY_RANGE:
            return { ...state };
        default:
            return state;
    }
};
export default colorsReduces;
