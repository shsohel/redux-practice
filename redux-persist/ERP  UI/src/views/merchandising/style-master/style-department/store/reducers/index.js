import { ADD_DEPARTMENT, DELETE_DEPARTMENT, DELETE_DEPARTMENTS_BY_RANGE, DROP_DOWN_DEPARTMENTS, GET_DEPARTMENTS, GET_DEPARTMENTS_BY_QUERY, GET_DEPARTMENT_BY_ID, OPEN_DEPARTMENT_SIDEBAR, SELECTED_DEPARTMENT_NULL, UPDATE_DEPARTMENT } from '../actionTypes';

const initialState = {
    departments: [],
    queryData: [],
    total: 1,
    params: {},
    selectedDepartment: null,
    openDepartmentSidebar: false,
    dropDownDepartments: null,
    lastCreatedId: null
};


const departmentsReduces = ( state = initialState, action ) => {
    switch ( action.type ) {
        case GET_DEPARTMENTS:
            return { ...state, departments: action.departments };
        case GET_DEPARTMENT_BY_ID:
            return { ...state, selectedDepartment: action.selectedDepartment };
        case SELECTED_DEPARTMENT_NULL:
            return { ...state, selectedDepartment: action.selectedDepartment };
        case OPEN_DEPARTMENT_SIDEBAR:
            return { ...state, openDepartmentSidebar: action.openDepartmentSidebar };
        case DROP_DOWN_DEPARTMENTS:
            return { ...state, dropDownDepartments: action.dropDownDepartments };
        case GET_DEPARTMENTS_BY_QUERY:
            return {
                ...state,
                queryData: action.departments,
                total: action.totalPages,
                params: action.params
            };
        case ADD_DEPARTMENT:
            return { ...state, lastCreatedId: action.lastCreatedId };
        case UPDATE_DEPARTMENT:
            return { ...state };
        case DELETE_DEPARTMENT:
            return { ...state };
        case DELETE_DEPARTMENTS_BY_RANGE:
            return { ...state };
        default:
            return state;
    }
};
export default departmentsReduces;