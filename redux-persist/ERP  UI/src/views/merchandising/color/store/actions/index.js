import { notify } from "@custom/notifications";
import { baseAxios } from "@services";
import { merchandisingApi } from '../../../../../services/api-end-points/merchandising';
import { confirmDialog } from "../../../../../utility/custom/ConfirmDialog";
import { confirmObj, status } from "../../../../../utility/enums";
import { convertQueryString } from "../../../../../utility/Utils";
import { ADD_COLOR, DELETE_COLOR, DELETE_COLORS_BY_RANGE, DROP_DOWN_COLORS, GET_COLORS, GET_COLORS_BY_QUERY, GET_COLOR_BY_ID, OPEN_COLOR_SIDEBAR, SELECTED_COLOR_NULL, UPDATE_COLOR } from '../actionTypes';


//Get All Color without Query
export const getAllColors = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.color.get_colors}` ).then( response => {
            dispatch( {
                type: GET_COLORS,
                colors: response.data
            } );
        } );
    };
};

/// Get All Color Without Query
export const getDropDownColors = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.color.get_colors_dropdown}` ).then( response => {
            dispatch( {
                type: DROP_DOWN_COLORS,
                dropDownColors: response.data.data.map( item => ( { value: item.id, label: item.name } ) )
            } );
        } );
    };
};

//Get Data by Query 
export const getColorByQuery = params => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.color.get_colors_by_query}?${convertQueryString( params )}`, params ).then( ( { data } ) => {
            if ( data.succeeded ) {
                dispatch( {
                    type: GET_COLORS_BY_QUERY,
                    colors: data.data,
                    totalPages: data.totalRecords,
                    params
                } );

            } else {
                notify( "error", "Something gonna Wrong!" );

            }

        } ).catch( e => {
            notify( 'warning', 'Server Side ERROR' );
        } );
    };
};

// ** Get Color by Id
export const getColorById = id => {
    return async dispatch => {
        await baseAxios
            .get( `${merchandisingApi.color.get_color_by_id}/${id}` )
            .then( ( response ) => {
                dispatch( {
                    type: GET_COLOR_BY_ID,
                    selectedColor: response.data ? response.data : null
                } );
            } )
            .catch( err => console.log( err ) );
    };
};

/// Selected Color Null after Edit or Edit Cancel
export const selectedColorNull = () => {
    return async dispatch => {
        await dispatch( {
            type: SELECTED_COLOR_NULL,
            selectedColor: null
        } );
    };
};

// ** Add new Color
export const addColor = color => {
    return async ( dispatch, getState ) => {
        await baseAxios
            .post( `${merchandisingApi.color.add_color}`, color )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: ADD_COLOR,
                        color
                    } );
                    notify( 'success', 'The Color has been added Successfully!' );
                } else {
                    notify( 'error', 'The Color has been added Failed!' );
                }

            } )
            .then( () => {

                dispatch( getColorByQuery( getState().colors.params ) );
                //dispatch( getAllColors() );
            } )
            .catch( err => console.log( err ) );
    };
};


// ** Update Color
export const updateColor = color => {
    return ( dispatch, getState ) => {
        baseAxios
            .put( `${merchandisingApi.color.update_color}/${color.id}`, color )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: UPDATE_COLOR,
                        color
                    } );
                    notify( 'success', 'The Color has been updated Successfully!' );
                } else {
                    notify( 'error', 'The Color has been updated Failed!' );
                }


            } )
            .then( () => {

                dispatch( getColorByQuery( getState().colors.params ) );
                //dispatch( getAllColors() );
            } )
            .catch( err => console.log( err ) );

    };
};


// ** Delete Color
export const deleteColor = id => {

    return ( dispatch, getState ) => {
        confirmDialog( confirmObj ).then( async e => {
            if ( e.isConfirmed ) {
                await baseAxios
                    .delete( `${merchandisingApi.color.delete_color}`, { id } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_COLOR
                        } );
                    } )
                    .then( () => {
                        notify( 'success', 'The Color has been deleted Successfully!' );
                        dispatch( getColorByQuery( getState().colors.params ) );
                        dispatch( getAllColors() );
                    } );
            }
        } );

    };


};

// ** Delete Color by Range
export const deleteRangeColor = ids => {

    return ( dispatch, getState ) => {

        confirmDialog( confirmObj ).then( e => {
            if ( e.isConfirmed ) {
                baseAxios
                    .delete( `${merchandisingApi.color.delete_color_by_range}`, { ids } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_COLORS_BY_RANGE
                        } );
                    } )
                    .then( () => {
                        notify( 'success', 'Colors has been deleted Successfully!' );
                        dispatch( getColorByQuery( getState().colors.params ) );
                        dispatch( getAllColors() );
                    } );
            }
        } );

    };
};

// ** Open  Color Sidebar
export const handleOpenColorSidebar = ( condition ) => {
    return async dispatch => {
        await dispatch( {
            type: OPEN_COLOR_SIDEBAR,
            openColorSidebar: condition
        } );
    };
};