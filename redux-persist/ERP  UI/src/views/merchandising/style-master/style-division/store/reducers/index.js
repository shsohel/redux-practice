import { ADD_DIVISION, DELETE_DIVISION, DELETE_DIVISIONS_BY_RANGE, DROP_DOWN_DIVISIONS, GET_DIVISIONS, GET_DIVISIONS_BY_QUERY, GET_DIVISION_BY_ID, OPEN_DIVISION_SIDEBAR, SELECTED_DIVISION_NULL, UPDATE_DIVISION } from '../actionTypes';

const initialState = {
    divisions: [],
    queryData: [],
    total: 1,
    params: {},
    selectedDivision: null,
    openDivisionSidebar: false,
    dropDownDivisions: []
};


const divisionsReduces = ( state = initialState, action ) => {
    switch ( action.type ) {
        case GET_DIVISIONS:
            return { ...state, divisions: action.divisions };
        case GET_DIVISION_BY_ID:
            return { ...state, selectedDivision: action.selectedDivision };
        case SELECTED_DIVISION_NULL:
            return { ...state, selectedDivision: action.selectedDivision };
        case OPEN_DIVISION_SIDEBAR:
            return { ...state, openDivisionSidebar: action.openDivisionSidebar };
        case DROP_DOWN_DIVISIONS:
            return { ...state, dropDownDivisions: action.dropDownDivisions };
        case GET_DIVISIONS_BY_QUERY:
            return {
                ...state,
                queryData: action.divisions,
                total: action.totalPages,
                params: action.params
            };
        case ADD_DIVISION:
            return { ...state };
        case UPDATE_DIVISION:
            return { ...state };
        case DELETE_DIVISION:
            return { ...state };
        case DELETE_DIVISIONS_BY_RANGE:
            return { ...state };
        default:
            return state;
    }
};
export default divisionsReduces;
