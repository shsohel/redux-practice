// import { merchandisingApi } from "@api/merchandising";
// import { baseAxios } from "@services";
import { notify } from "@custom/notifications";
import { baseAxios } from "@services";
import { merchandisingApi } from "../../../../../../services/api-end-points/merchandising";
import { status } from "../../../../../../utility/enums";
import { ADD_SINGLE_STYLE, DELETE_SINGLE_STYLE, DELETE_SINGLE_STYLES_BY_RANGE, DROP_DOWN_SINGLE_STYLES, GET_SINGLE_STYLES, GET_SINGLE_STYLES_BY_QUERY, GET_SINGLE_STYLE_BY_ID, GET_SINGLE_STYLE_UPLOAD_IMAGE, IS_FILE_UPLOADED_COMPLETE, OPEN_SINGLE_STYLE_FORM, SELECTED_SINGLE_STYLE_NULL, UPDATE_SINGLE_STYLE } from "../action-types";

/// Get All wtihout Query
export const getAllStyless = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.style.get_styles}` ).then( response => {
            dispatch( {
                type: GET_SINGLE_STYLES,
                styles: response.data
            } );
        } );
    };
};

/// Get All wtihout Query
export const getDropDownStyles = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.style.get_styles}` ).then( response => {
            dispatch( {
                type: DROP_DOWN_SINGLE_STYLES,
                dropDownStyles: response.data.map( item => ( { value: item.id, label: item.modelNo, buyer: item.buyer, data: item } ) )
            } );
        } );
    };
};


//Get Data by Query 
export const getStylesByQuery = params => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.style.get_styles_by_query}`, params ).then( response => {
            dispatch( {
                type: GET_SINGLE_STYLES_BY_QUERY,
                styles: response.data.styles,
                totalPages: response.data.total,
                params
            } );
        } );
    };
};

// ** Get Style by Id
export const getStyleById = id => async dispatch => {
    await baseAxios
        .get( `${merchandisingApi.style.get_style_by_id}/${id}` )
        .then( response => {
            console.log( response.data );
            dispatch( {
                type: GET_SINGLE_STYLE_BY_ID,
                selectedStyle: response?.data ? response?.data : null
            } );
        } )
        .catch( err => console.log( err ) );
};

/// Selected State Null After Edit or Cancel State Null 
export const selectedStyleNull = () => {
    return async dispatch => {
        await dispatch( {
            type: SELECTED_SINGLE_STYLE_NULL,
            selectedStyle: null
        } );
    };
};

export const handleOpenStyleForm = ( condition ) => {
    return async dispatch => {
        await dispatch( {
            type: OPEN_SINGLE_STYLE_FORM,
            openStyleForm: condition
        } );
    };
};


// ** Add new Style
export const addStyle = style => {
    //    console.log( JSON.stringify( style, null, 2 ) );
    return async ( dispatch, getState ) => {
        await baseAxios
            .post( `${merchandisingApi.style.add_style}`, style )
            .then( response => {
                console.log( response.data );
                if ( response.status === status.success ) {
                    dispatch( {
                        type: ADD_SINGLE_STYLE,
                        lastStyleId: response.data,
                        style
                    } );
                    notify( 'success', 'The style has been added Successfully!' );
                    // const styleId = response.data;
                    // getStyleById( styleId );
                } else {
                    notify( 'error', 'The style has been added Failed!' );

                }

            } )
            .then( () => {
                dispatch( getStylesByQuery( getState().styles.params ) );
                //dispatch( getAllStyless() );
            } )
            .catch( err => console.log( err ) );
    };
};

// Update Style
export const updateStyle = style => {
    return ( dispatch, getState ) => {
        baseAxios
            .post( `${merchandisingApi.style.update_style}`, { style } )
            .then( response => {
                dispatch( {
                    type: UPDATE_SINGLE_STYLE,
                    style
                } );

            } )
            .then( () => {
                notify( 'success', 'The style has been updated Successfully!' );
                dispatch( getStylesByQuery( getState().styles.params ) );
                dispatch( getAllStyless() );
            } )
            .catch( err => console.log( err ) );
    };
};

// ** Delete Style
export const deleteStyle = id => {
    return async ( dispatch, getState ) => {
        await baseAxios
            .delete( `${merchandisingApi.style.delete_style}`, { id } )
            .then( response => {
                dispatch( {
                    type: DELETE_SINGLE_STYLE
                } );
            } )
            .then( () => {
                notify( 'success', 'The style has been deleted Successfully!' );
                dispatch( getStylesByQuery( getState().styles.params ) );
                dispatch( getAllStyless() );
            } );
    };
};

// Update Style Range Delete
export const deleteRangeStyle = ids => {
    return ( dispatch, getState ) => {
        baseAxios
            .delete( `${merchandisingApi.style.delete_styles_by_range}`, { ids } )
            .then( response => {
                dispatch( {
                    type: DELETE_SINGLE_STYLES_BY_RANGE
                } );
            } )
            .then( () => {
                notify( 'success', 'Styles has been deleted Successfully!' );
                dispatch( getStylesByQuery( getState().styles.params ) );
                dispatch( getAllStyless() );
            } );
    };
};

export const getUploadedImagesBySingleStyleId = ( styleId ) => async dispatch => {
    const path = `/api/merchandising/styles/${styleId}/images`;
    await baseAxios.get( path ).then( res => {
        dispatch( {
            type: GET_SINGLE_STYLE_UPLOAD_IMAGE,
            singleStyleImages: res.data
        } );
    } );
};

export const singleStylePhotoUpload = ( photoArray, lastStyleId ) => async dispatch => {
    const styleId = "5279bb25-c916-4385-b862-3a20f58eb55e";
    const path = `/api/merchandising/styles/${lastStyleId}/imageUpload`;
    dispatch( {
        type: IS_FILE_UPLOADED_COMPLETE,
        isUploadComplete: false
    } );
    for ( let index = 0; index < photoArray.length; index++ ) {
        const formData = new FormData();
        const photoByIndex = photoArray[index];
        formData.append( "File", photoByIndex );
        await baseAxios.post( path, formData ).then(
            res => {
                console.log( res );
                dispatch( {
                    type: IS_FILE_UPLOADED_COMPLETE,
                    isUploadComplete: true
                } );
            }
        );
    }

    dispatch( getUploadedImagesBySingleStyleId( lastStyleId ) );


};

