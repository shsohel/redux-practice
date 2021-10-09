import { ADD_SIZE_GROUP, DELETE_SIZE_GROUP, DELETE_SIZE_GROUP_BY_RANGE, DROP_DOWN_SIZE_GROUPS, GET_SIZE_GROUPS, GET_SIZE_GROUPS_BY_QUERY, GET_SIZE_GROUP_BY_ID, OPEN_SIZE_GROUP_SIDEBAR, SELECTED_SIZE_GROUP_NULL, UPDATE_SIZE_GROUP } from '../actionTypes';

const initialState = {
    sizeGroups: [],
    queryData: [],
    total: 1,
    params: {},
    selectedSizeGroup: null,
    openSizeGroupSidebar: false,
    dropDownSizeGroups: null
};


const sizeGroupReduces = ( state = initialState, action ) => {
    switch ( action.type ) {
        case GET_SIZE_GROUPS:
            return { ...state, sizeGroups: action.sizeGroups };
        case GET_SIZE_GROUP_BY_ID:
            return { ...state, selectedSizeGroup: action.selectedSizeGroup };
        case SELECTED_SIZE_GROUP_NULL:
            return { ...state, selectedSizeGroup: action.selectedSizeGroup };
        case OPEN_SIZE_GROUP_SIDEBAR:
            return { ...state, openSizeGroupSidebar: action.openSizeGroupSidebar };
        case DROP_DOWN_SIZE_GROUPS:
            return { ...state, dropDownSizeGroups: action.dropDownSizeGroups };
        case GET_SIZE_GROUPS_BY_QUERY:
            return {
                ...state,
                queryData: action.sizeGroups,
                total: action.totalPages,
                params: action.params
            };
        case ADD_SIZE_GROUP:
            return { ...state };
        case UPDATE_SIZE_GROUP:
            return { ...state };
        case DELETE_SIZE_GROUP:
            return { ...state };
        case DELETE_SIZE_GROUP_BY_RANGE:
            return { ...state };
        default:
            return state;
    }
};
export default sizeGroupReduces;
