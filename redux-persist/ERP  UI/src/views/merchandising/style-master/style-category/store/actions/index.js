import { notify } from "@custom/notifications";
import { baseAxios } from "@services";
import { merchandisingApi } from '../../../../../../services/api-end-points/merchandising';
import { confirmDialog } from "../../../../../../utility/custom/ConfirmDialog";
import { status } from "../../../../../../utility/enums";
import { convertQueryString } from "../../../../../../utility/Utils";
import { ADD_STYLE_CATEGORY, DELETE_STYLE_CATEGORY, DELETE_STYLE_CATEGORY_BY_RANGE, DROP_DOWN_STYLE_CATEGORIES, GET_STYLE_CATEGORIES, GET_STYLE_CATEGORIES_BY_QUERY, GET_STYLE_CATEGORY_BY_ID, OPEN_STYLE_CATEGORY_SIDEBAR, SELECTED_STYLE_CATEGORY_NULL, UPDATE_STYLE_CATEGORY } from '../actionTypes';


const confirmObj = {
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    confirmButtonText: 'Yes !',
    cancelButtonText: 'No'
};

///Get All Style Category Without Query
export const getAllStyleCategory = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.styleCategory.get_style_categories}` ).then( response => {
            dispatch( {
                type: GET_STYLE_CATEGORIES,
                styleCategories: response.data
            } );
        } );
    };
};

/// Get All Style Category Without Query
export const getDropDownStyleCategories = ( id ) => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.styleCategory.get_style_categories_dropdown}` ).then( response => {
            dispatch( {
                type: DROP_DOWN_STYLE_CATEGORIES,
                dropDownStyleCategories: response.data.data.map( item => ( { value: item.id, label: item.name } ) )
            } );
        } );
    };
};

export const getCascadeDropDownStyleCategories = ( id ) => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.styleCategory.get_style_categories_cascade_dropdown}/${id}/styleCategories` ).then( response => {
            dispatch( {
                type: DROP_DOWN_STYLE_CATEGORIES,
                dropDownStyleCategories: response?.data?.map( item => ( { value: item.id, label: item.name } ) )
            } );
        } );
    };
};

//Get Data by Query 
export const getStyleCategoryByQuery = params => {

    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.styleCategory.get_style_categories_by_query}?${convertQueryString( params )}`, params ).then( ( { data } ) => {
            if ( data.succeeded ) {
                dispatch( {
                    type: GET_STYLE_CATEGORIES_BY_QUERY,
                    styleCategories: data.data,
                    totalPages: data.totalRecords,
                    params
                } );
            }

        } );
    };
};

// ** Get Style Category by Id
export const getStyleCategoryById = id => {
    return async dispatch => {
        await baseAxios
            .get( `${merchandisingApi.styleCategory.get_style_category_by_id}/${id}` )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: GET_STYLE_CATEGORY_BY_ID,
                        selectedStyleCategory: response.data ? response.data : null
                    } );
                } else {
                    notify( 'error', `'The Style Category couldn't find'` );
                }

            } )
            .catch( err => console.log( err ) );
    };
};

/// Selected Style Category Null after Edit or Edit Cancel
export const selectedStyleCategoryNull = () => {
    return async dispatch => {
        await dispatch( {
            type: SELECTED_STYLE_CATEGORY_NULL,
            selectedStyleCategory: null
        } );
    };
};

// ** Add new Style Category
export const addStyleCategory = styleCategory => {
    return async ( dispatch, getState ) => {
        await baseAxios
            .post( `${merchandisingApi.styleCategory.add_style_category}`, styleCategory )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: ADD_STYLE_CATEGORY,
                        lastCreatedId: response.data,
                        styleCategory
                    } );
                    notify( 'success', 'The Style Category has been added Successfully!' );
                } else {
                    notify( 'error', 'The Style Category has been added Failed!' );
                }

            } )
            .then( () => {

                dispatch( getStyleCategoryByQuery( getState().styleCategories.params ) );
                // dispatch( getAllStyleCategory() );
            } )
            .catch( err => console.log( err ) );
    };
};

// ** Update Style Category
export const updateStyleCategory = styleCategory => {
    return ( dispatch, getState ) => {
        baseAxios
            .put( `${merchandisingApi.styleCategory.update_style_category}/${styleCategory.id}`, styleCategory )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: UPDATE_STYLE_CATEGORY,
                        styleCategory
                    } );
                    notify( 'success', 'The Style Category has been updated Successfully!' );
                } else {
                    notify( 'error', 'The Style Category has been updated Failed!' );
                }


            } )
            .then( () => {

                dispatch( getStyleCategoryByQuery( getState().styleCategories.params ) );
                //dispatch( getAllStyleCategory() );
            } )
            .catch( err => console.log( err ) );

    };
};

// ** Delete Style Category
export const deleteStyleCategory = id => {
    return ( dispatch, getState ) => {

        confirmDialog( confirmObj ).then( async e => {
            if ( e.isConfirmed ) {
                await baseAxios
                    .delete( `${merchandisingApi.styleCategory.delete_style_category}`, { id } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_STYLE_CATEGORY
                        } );
                    } )
                    .then( () => {
                        notify( 'success', 'The Style Category has been deleted Successfully!' );
                        dispatch( getStyleCategoryByQuery( getState().styleCategories.params ) );
                        dispatch( getAllStyleCategory() );
                    } );
            }
        } );


    };
};

// ** Delete Style Category by Range
export const deleteRangeStyleCategory = ids => {
    return ( dispatch, getState ) => {
        confirmDialog( confirmObj ).then( e => {
            if ( e.isConfirmed ) {
                baseAxios
                    .delete( `${merchandisingApi.styleCategory.delete_style_category_by_range}`, { ids } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_STYLE_CATEGORY_BY_RANGE
                        } );
                    } )
                    .then( () => {
                        notify( 'success', 'Style Category has been deleted Successfully!' );
                        dispatch( getStyleCategoryByQuery( getState().styleCategories.params ) );
                        dispatch( getAllStyleCategory() );
                    } );
            }
        } );


    };
};

// ** Open  Style Category Sidebar
export const handleOpenStyleCategorySidebar = ( condition ) => {
    return async dispatch => {
        await dispatch( {
            type: OPEN_STYLE_CATEGORY_SIDEBAR,
            openStyleCategorySidebar: condition
        } );
    };
};