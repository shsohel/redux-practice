import { notify } from "@custom/notifications";
import { baseAxios } from "@services";
import { merchandisingApi } from '../../../../../services/api-end-points/merchandising';
import { confirmDialog } from "../../../../../utility/custom/ConfirmDialog";
import { status } from "../../../../../utility/enums";
import { convertQueryString } from "../../../../../utility/Utils";
import { ADD_SIZE, DELETE_SIZE, DELETE_SIZES_BY_RANGE, DROP_DOWN_SIZES, GET_SIZES, GET_SIZES_BY_QUERY, GET_SIZE_BY_ID, OPEN_SIZE_SIDEBAR, SELECTED_SIZE_NULL, UPDATE_SIZE } from '../actionTypes';

const confirmObj = {
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    confirmButtonText: 'Yes !',
    cancelButtonText: 'No'
};


//Get All Size without Query
export const getAllSizes = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.size.get_sizes}` ).then( response => {
            dispatch( {
                type: GET_SIZES,
                sizes: response.data
            } );
        } );
    };
};


/// Get All Size Without Query
export const getDropDownSizes = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.size.get_size_for_dropdown}` ).then( response => {
            if ( response.status === status.success ) {
                dispatch( {
                    type: DROP_DOWN_SIZES,
                    dropDownSizes: response.data.data.map( item => ( { value: item.id, label: item.shortCode } ) )
                } );
            } else {
                notify( 'warning', 'Sizes Data Not Found!' );
                console.log( 'sfs' );
            }

        } );
    };
};


//Get Data by Query 
export const getSizeByQuery = params => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.size.get_sizes_by_query}?${convertQueryString( params )}` ).then( ( response ) => {
            if ( response.status === status.success ) {
                dispatch( {
                    type: GET_SIZES_BY_QUERY,
                    sizes: response.data.data,
                    totalPages: response.data.totalRecords,
                    params
                } );
            } else {
                notify( "error", "Smoething gonna Wrong!" );
            }

        } ).catch( e => {
            notify( 'warning', 'Server Side ERROR' );
        } );
    };
};

// ** Get Size by Id
export const getSizeById = id => {
    return async dispatch => {
        await baseAxios
            .get( `${merchandisingApi.size.get_size_by_id}/${id}` )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: GET_SIZE_BY_ID,
                        selectedSize: response.data ? response.data : null
                    } );
                } else {
                    notify( 'error', `'The Size couldn't find'` );
                }
            } )
            .catch( err => console.log( err ) );
    };
};


/// Selected Size Null after Edit or Edit Cancel
export const selectedSizeNull = () => {
    return async dispatch => {
        await dispatch( {
            type: SELECTED_SIZE_NULL,
            selectedSize: null
        } );
    };
};


// ** Add new Size
export const addSize = size => {
    return async ( dispatch, getState ) => {
        await baseAxios
            .post( `${merchandisingApi.size.add_size}`, size )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: ADD_SIZE,
                        size
                    } );
                    notify( 'success', 'The Size has been added Successfully!' );
                } else {
                    notify( 'error', 'The Size has been added Failed!' );
                }
            } )
            .then( () => {
                dispatch( getSizeByQuery( getState().sizes.params ) );
            } )
            .catch( err => console.log( err ) );
    };
};
// ** Add new Size
// export const addSizeInstant = ( size ) => async dispatch => {
//     await baseAxios
//         .post( `${merchandisingApi.size.add_size}`, size )
//         .then( response => {
//             if ( response.status === status.success ) {
//                 dispatch( {
//                     type: ADD_SIZE,
//                     lastCreatedId: response.data,
//                     size
//                 } );
//                 notify( 'success', 'The Size has been added Successfully!' );
//             } else {
//                 notify( 'error', 'The Size has been added Failed!' );
//             }
//         } )
//         .then( () => {
//             dispatch( getDropDownSizes() );
//         } )
//         .catch( err => console.log( err ) );
// };
// ** Add new Size
export const addSizeInstant = ( size ) => async dispatch => {
    await baseAxios
        .post( `${merchandisingApi.size.add_size}`, size )
        .then( response => {
            if ( response.status === status.success ) {
                dispatch( {
                    type: ADD_SIZE,
                    lastCreatedId: response.data,
                    size
                } );
                notify( 'success', 'The Size has been added Successfully!' );
                dispatch( getDropDownSizes() );

            } else {
                notify( 'error', 'The Size has been added Failed!' );
            }
        } )
        .catch( err => console.log( err ) );
};


// ** Update Size
export const updateSize = size => {
    return ( dispatch, getState ) => {
        baseAxios
            .put( `${merchandisingApi.size.update_size}/${size.id}`, size )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: UPDATE_SIZE,
                        size
                    } );
                    notify( 'success', 'The Size has been updated Successfully!' );

                } else {
                    notify( 'success', 'The Size has been updated Successfully!' );

                }


            } )
            .then( () => {
                dispatch( getSizeByQuery( getState().sizes.params ) );
                //dispatch( getAllSizes() );
            } )
            .catch( err => console.log( err ) );

    };
};

// ** Delete Size
export const deleteSize = id => {
    return ( dispatch, getState ) => {
        confirmDialog( confirmObj ).then( async e => {
            if ( e.isConfirmed ) {
                baseAxios
                    .delete( `${merchandisingApi.size.delete_size}`, { id } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_SIZE
                        } );
                    } )
                    .then( () => {
                        notify( 'success', 'The Size has been deleted Successfully!' );
                        dispatch( getSizeByQuery( getState().sizes.params ) );
                        dispatch( getAllSizes() );
                    } );
            }
        } );
    };
};


// ** Delete Size by Range
export const deleteRangeSize = ids => {
    return ( dispatch, getState ) => {
        confirmDialog( confirmObj ).then( e => {
            if ( e.isConfirmed ) {
                baseAxios
                    .delete( `${merchandisingApi.size.delete_size_by_range}`, { ids } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_SIZES_BY_RANGE
                        } );
                    } )
                    .then( () => {
                        notify( 'success', 'Size has been deleted Successfully!' );
                        dispatch( getSizeByQuery( getState().sizes.params ) );
                        dispatch( getAllSizes() );
                    } );
            }
        } );
    };
};


// ** Open  Size Sidebar
export const handleOpenSizeSidebar = ( condition ) => {
    return async dispatch => {
        await dispatch( {
            type: OPEN_SIZE_SIDEBAR,
            openSizeSidebar: condition
        } );
    };
};