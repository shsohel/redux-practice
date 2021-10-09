import { ADD_SAMPLE_ASSIGNEE, DELETE_SAMPLE_ASSIGNEE, DELETE_SAMPLE_ASSIGNEE_BY_RANGE, DROP_DOWN_SAMPLE_ASSIGNEES, GET_SAMPLE_ASSIGNEES, GET_SAMPLE_ASSIGNEES_BY_QUERY, GET_SAMPLE_ASSIGNEE_BY_ID, OPEN_SAMPLE_ASSIGNEE_SIDEBAR, SELECTED_SAMPLE_ASSIGNEE_NULL, UPDATE_SAMPLE_ASSIGNEE } from "../actionTypes";

const initialState = {
    sampleAssignees: [],
    queryData: [],
    total: 1,
    params: {},
    selectedSampleAssignee: null,
    openSampleAssigneeSidebar: false,
    dropDownSampleAssignees: null
};


const sampleAssigneeReduces = ( state = initialState, action ) => {
    switch ( action.type ) {
        case GET_SAMPLE_ASSIGNEES:
            return { ...state, sampleAssignees: action.sampleAssignees };
        case GET_SAMPLE_ASSIGNEE_BY_ID:
            return { ...state, selectedSampleAssignee: action.selectedSampleAssignee };
        case SELECTED_SAMPLE_ASSIGNEE_NULL:
            return { ...state, selectedSampleAssignee: action.selectedSampleAssignee };
        case OPEN_SAMPLE_ASSIGNEE_SIDEBAR:
            return { ...state, openSampleAssigneeSidebar: action.openSampleAssigneeSidebar };
        case DROP_DOWN_SAMPLE_ASSIGNEES:
            return { ...state, dropDownSampleAssignees: action.dropDownSampleAssignees };
        case GET_SAMPLE_ASSIGNEES_BY_QUERY:
            return {
                ...state,
                queryData: action.sampleAssignees,
                total: action.totalPages,
                params: action.params
            };
        case ADD_SAMPLE_ASSIGNEE:
            return { ...state };
        case UPDATE_SAMPLE_ASSIGNEE:
            return { ...state };
        case DELETE_SAMPLE_ASSIGNEE:
            return { ...state };
        case DELETE_SAMPLE_ASSIGNEE_BY_RANGE:
            return { ...state };
        default:
            return state;
    }
};
export default sampleAssigneeReduces;