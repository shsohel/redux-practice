import { ADD_BUYER_DEPARTMENT, DELETE_BUYER_DEPARTMENT, DELETE_BUYER_DEPARTMENTS_BY_RANGE, DROP_DOWN_BUYER_DEPARTMENTS, GET_BUYER_DEPARTMENTS, GET_BUYER_DEPARTMENTS_BY_QUERY, GET_BUYER_DEPARTMENT_BY_ID, OPEN_BUYER_DEPARTMENT_SIDEBAR, SELECTED_BUYER_DEPARTMENT_NULL, UPDATE_BUYER_DEPARTMENT } from "../actionTypes";

const initialState = {
    buyerDepartments: [],
    queryData: [],
    total: 1,
    params: {},
    selectedBuyerDepartment: null,
    openBuyerDepartmentSidebar: false,
    dropDownBuyerDepartments: null
};


const buyerDepartmentReduces = ( state = initialState, action ) => {
    switch ( action.type ) {
        case GET_BUYER_DEPARTMENTS:
            return { ...state, buyerDepartments: action.buyerDepartments };
        case GET_BUYER_DEPARTMENT_BY_ID:
            return { ...state, selectedBuyerDepartment: action.selectedBuyerDepartment };
        case SELECTED_BUYER_DEPARTMENT_NULL:
            return { ...state, selectedBuyerDepartment: action.selectedBuyerDepartment };
        case OPEN_BUYER_DEPARTMENT_SIDEBAR:
            return { ...state, openBuyerDepartmentSidebar: action.openBuyerDepartmentSidebar };
        case DROP_DOWN_BUYER_DEPARTMENTS:
            return { ...state, dropDownBuyerDepartments: action.dropDownBuyerDepartments };
        case GET_BUYER_DEPARTMENTS_BY_QUERY:
            return {
                ...state,
                queryData: action.buyerDepartments,
                total: action.totalPages,
                params: action.params
            };
        case ADD_BUYER_DEPARTMENT:
            return { ...state };
        case UPDATE_BUYER_DEPARTMENT:
            return { ...state };
        case DELETE_BUYER_DEPARTMENT:
            return { ...state };
        case DELETE_BUYER_DEPARTMENTS_BY_RANGE:
            return { ...state };
        default:
            return state;
    }
};
export default buyerDepartmentReduces;