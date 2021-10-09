import { ADD_MERCHANDISER, DELETE_MERCHANDISER, DELETE_MERCHANDISER_BY_RANGE, DROP_DOWN_MERCHANDISER, GET_MERCHANDISER, GET_MERCHANDISER_BY_ID, GET_MERCHANDISER_BY_QUERY, OPEN_MERCHANDISER_SIDEBAR, SELECTED_MERCHANDISER_NULL, UPDATE_MERCHANDISER } from "../actionTypes";


const initialState = {
    merchandisers: [],
    queryData: [],
    total: 1,
    params: {},
    selectedMerchandiser: null,
    openMerchandiserSidebar: false,
    dropDownMerchandisers: null
};


const merchandiserReduces = ( state = initialState, action ) => {
    switch ( action.type ) {
        case GET_MERCHANDISER:
            return { ...state, merchandisers: action.merchandisers };
        case GET_MERCHANDISER_BY_ID:
            return { ...state, selectedMerchandiser: action.selectedMerchandiser };
        case SELECTED_MERCHANDISER_NULL:
            return { ...state, selectedMerchandiser: action.selectedMerchandiser };
        case OPEN_MERCHANDISER_SIDEBAR:
            return { ...state, openMerchandiserSidebar: action.openMerchandiserSidebar };
        case DROP_DOWN_MERCHANDISER:
            return { ...state, dropDownMerchandiser: action.dropDownMerchandiser };
        case GET_MERCHANDISER_BY_QUERY:
            return {
                ...state,
                queryData: action.merchandisers,
                total: action.totalPages,
                params: action.params
            };
        case ADD_MERCHANDISER:
            return { ...state };
        case UPDATE_MERCHANDISER:
            return { ...state };
        case DELETE_MERCHANDISER:
            return { ...state };
        case DELETE_MERCHANDISER_BY_RANGE:
            return { ...state };
        default:
            return state;
    }
};
export default merchandiserReduces;
