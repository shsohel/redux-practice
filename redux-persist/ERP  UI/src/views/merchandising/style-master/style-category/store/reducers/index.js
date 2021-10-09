import { ADD_STYLE_CATEGORY, DELETE_STYLE_CATEGORY, DELETE_STYLE_CATEGORY_BY_RANGE, DROP_DOWN_STYLE_CATEGORIES, GET_STYLE_CATEGORIES, GET_STYLE_CATEGORIES_BY_QUERY, GET_STYLE_CATEGORY_BY_ID, OPEN_STYLE_CATEGORY_SIDEBAR, SELECTED_STYLE_CATEGORY_NULL, UPDATE_STYLE_CATEGORY } from '../actionTypes';

const initialState = {
    styleCategories: [],
    queryData: [],
    total: 1,
    params: {},
    selectedStyleCategory: null,
    openStyleCategorySidebar: false,
    dropDownStyleCategories: null,
    lastCreatedId: null

};


const styleCategoryReduces = ( state = initialState, action ) => {
    switch ( action.type ) {
        case GET_STYLE_CATEGORIES:
            return { ...state, styleCategories: action.styleCategories };
        case GET_STYLE_CATEGORY_BY_ID:
            return { ...state, selectedStyleCategory: action.selectedStyleCategory };
        case SELECTED_STYLE_CATEGORY_NULL:
            return { ...state, selectedStyleCategory: action.selectedStyleCategory };
        case OPEN_STYLE_CATEGORY_SIDEBAR:
            return { ...state, openStyleCategorySidebar: action.openStyleCategorySidebar };
        case DROP_DOWN_STYLE_CATEGORIES:
            return { ...state, dropDownStyleCategories: action.dropDownStyleCategories };
        case GET_STYLE_CATEGORIES_BY_QUERY:
            return {
                ...state,
                queryData: action.styleCategories,
                total: action.totalPages,
                params: action.params
            };
        case ADD_STYLE_CATEGORY:
            return { ...state, lastCreatedId: action.lastCreatedId };
        case UPDATE_STYLE_CATEGORY:
            return { ...state };
        case DELETE_STYLE_CATEGORY:
            return { ...state };
        case DELETE_STYLE_CATEGORY_BY_RANGE:
            return { ...state };
        default:
            return state;
    }
};
export default styleCategoryReduces;