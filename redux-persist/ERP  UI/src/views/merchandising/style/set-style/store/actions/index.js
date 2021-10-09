import { notify } from "@custom/notifications";
import { baseAxios } from "@services";
import { merchandisingApi } from "../../../../../../services/api-end-points/merchandising";
import { status } from "../../../../../../utility/enums";
import { ADD_SET_STYLE, DELETE_SET_STYLE, DELETE_SET_STYLES_BY_RANGE, DROP_DOWN_SET_STYLES, GET_SET_STYLES, GET_SET_STYLES_BY_QUERY, GET_SET_STYLE_BY_ID, SELECTED_SET_STYLE_NULL, UPDATE_SET_STYLE } from "../action-types";

/// Get All wtihout Query
export const getAllSetStyless = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.setStyle.get_setStyles}` ).then( response => {
            dispatch( {
                type: GET_SET_STYLES,
                setStyles: response.data
            } );
        } );
    };
};


export const getDropDownSetStyles = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.setStyle.get_setStyles_by_query}` ).then( response => {
            dispatch( {
                type: DROP_DOWN_SET_STYLES,
                dropDownSetStyles: response.data.map( item => ( { value: item.id, label: item.modelNo } ) )
            } );
        } );
    };
};


//Get Data by Query 
export const getSetStylesByQuery = params => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.setStyle.get_setStyles_by_query}`, params ).then( response => {
            dispatch( {
                type: GET_SET_STYLES_BY_QUERY,
                setStyles: response.data.setStyles,
                totalPages: response.data.total,
                params
            } );
        } );
    };
};

// ** Get SET Style by Id
export const getSetStyleById = id => {
    return async dispatch => {
        await baseAxios
            .get( `${merchandisingApi.setStyle.get_setStyle_by_id}`, { id } )
            .then( response => {
                dispatch( {
                    type: GET_SET_STYLE_BY_ID,
                    selectedSetStyle: response.data.setStyle ? response.data.setStyle : null
                } );
            } )
            .catch( err => console.log( err ) );
    };
};

/// Selected State Null After Edit or Cancel State Null 
export const selectedSetStyleNull = () => {
    return async dispatch => {
        await dispatch( {
            type: SELECTED_SET_STYLE_NULL,
            selectedSetStyle: null
        } );
    };
};


// ** Add new  Set Style
export const addSetStyle = setStyle => {
    console.log( JSON.stringify( setStyle, null, 2 ) );
    return async ( dispatch, getState ) => {
        await baseAxios
            .post( `${merchandisingApi.setStyle.add_setStyle}`, setStyle )
            .then( response => {
                if ( response.status === status.success ) {
                    console.log( response );
                    dispatch( {
                        type: ADD_SET_STYLE,
                        setStyle
                    } );
                    notify( 'success', 'The style has been added Successfully!' );

                } else {
                    notify( 'error ', 'The style has been added Failed!' );
                }
            } )
            .then( () => {
                dispatch( getSetStylesByQuery( getState().setStyles.params ) );
                //dispatch( getAllSetStyless() );
            } )
            .catch( err => console.log( err ) );
    };
};

// Update Set Style
export const updateSetStyle = setStyle => {
    return ( dispatch, getState ) => {
        baseAxios
            .post( `${merchandisingApi.setStyle.update_setStyle}`, { setStyle } )
            .then( response => {
                dispatch( {
                    type: UPDATE_SET_STYLE,
                    setStyle
                } );

            } )
            .then( () => {
                notify( 'success', 'The style has been updated Successfully!' );
                dispatch( getSetStylesByQuery( getState().setStyles.params ) );
                dispatch( getAllSetStyless() );
            } )
            .catch( err => console.log( err ) );
    };
};

// ** Delete SET Style
export const deleteSetStyle = id => {
    return ( dispatch, getState ) => {
        baseAxios
            .delete( `${merchandisingApi.setStyle.delete_setStyle}`, { id } )
            .then( response => {
                dispatch( {
                    type: DELETE_SET_STYLE
                } );
            } )
            .then( () => {
                notify( 'success', 'The style has been deleted Successfully!' );
                dispatch( getSetStylesByQuery( getState().setStyles.params ) );
                dispatch( getAllSetStyless() );
            } );
    };
};

// Update SET Style Range Delete
export const deleteRangeSetStyle = ids => {
    return ( dispatch, getState ) => {
        baseAxios
            .delete( `${merchandisingApi.setStyle.delete_setStyles_by_range}`, { ids } )
            .then( response => {
                dispatch( {
                    type: DELETE_SET_STYLES_BY_RANGE
                } );
            } )
            .then( () => {
                notify( 'success', 'Styles has been deleted Successfully!' );
                dispatch( getSetStylesByQuery( getState().setStyles.params ) );
                dispatch( getAllSetStyless() );
            } );
    };
};

