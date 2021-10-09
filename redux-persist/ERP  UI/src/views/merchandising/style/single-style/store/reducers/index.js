
import { ADD_SINGLE_STYLE, DELETE_SINGLE_STYLE, DELETE_SINGLE_STYLES_BY_RANGE, DROP_DOWN_SINGLE_STYLES, GET_SINGLE_STYLES, GET_SINGLE_STYLES_BY_QUERY, GET_SINGLE_STYLE_BY_ID, GET_SINGLE_STYLE_UPLOAD_IMAGE, IS_FILE_UPLOADED_COMPLETE, OPEN_SINGLE_STYLE_FORM, SELECTED_SINGLE_STYLE_NULL, UPDATE_SINGLE_STYLE } from "../action-types";
const initialState = {
    styles: [],
    queryData: [],
    total: 1,
    params: {},
    selectedStyle: null,
    openStyleForm: false,
    dropDownStyles: null,
    singleStyleImages: [],
    lastStyleId: null,
    isUploadComplete: false
};

const styleReduces = ( state = initialState, action ) => {
    switch ( action.type ) {
        case GET_SINGLE_STYLES:
            return { ...state, styles: action.styles };
        case GET_SINGLE_STYLE_BY_ID:
            return { ...state, selectedStyle: action.selectedStyle };
        case SELECTED_SINGLE_STYLE_NULL:
            return { ...state, selectedStyle: action.selectedStyle };
        case OPEN_SINGLE_STYLE_FORM:
            return { ...state, openStyleForm: action.openStyleForm };
        case DROP_DOWN_SINGLE_STYLES:
            return { ...state, dropDownStyles: action.dropDownStyles };
        case GET_SINGLE_STYLES_BY_QUERY:
            return {
                ...state,
                queryData: action.styles,
                total: action.totalPages,
                params: action.params
            };
        case ADD_SINGLE_STYLE:
            return { ...state, lastStyleId: action.lastStyleId };
        case UPDATE_SINGLE_STYLE:
            return { ...state };
        case DELETE_SINGLE_STYLE:
            return { ...state };
        case DELETE_SINGLE_STYLES_BY_RANGE:
            return { ...state };
        case GET_SINGLE_STYLE_UPLOAD_IMAGE:
            return { ...state, singleStyleImages: action.singleStyleImages };
        case IS_FILE_UPLOADED_COMPLETE:
            return { ...state, isUploadComplete: action.isUploadComplete };
        default:
            return state;
    }


};

export default styleReduces;