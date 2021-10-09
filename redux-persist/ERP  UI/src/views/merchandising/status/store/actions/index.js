import { notify } from "@custom/notifications";
import { baseAxios } from "@services";
import { merchandisingApi } from '../../../../../services/api-end-points/merchandising';
import { confirmDialog } from "../../../../../utility/custom/ConfirmDialog";
import { confirmObj, status } from "../../../../../utility/enums";
import { convertQueryString } from "../../../../../utility/Utils";
import { ADD_STATUS, DELETE_STATUS, DELETE_STATUSES_BY_RANGE, DROP_DOWN_STATUSES, GET_STATUSES, GET_STATUSES_BY_QUERY, GET_STATUS_BY_ID, GET_STATUS_TYPES, OPEN_STATUS_SIDEBAR, SELECTED_STATUS_NULL, UPDATE_STATUS } from '../actionTypes';


//Get All Color without Query
export const getAllStatuses = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.status.get_statuses}` ).then( response => {
            dispatch( {
                type: GET_STATUSES,
                statuses: response.data
            } );
        } );
    };
};

//Get All Status Types
export const getAllStatusTypes = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.status.get_status_types}` ).then( response => {
            dispatch( {
                type: GET_STATUS_TYPES,
                statusTypes: response.data
            } );
        } );
    };
};
/// Get All Color Without Query
export const getDropDownStatuses = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.status.get_statuses_dropdown}` ).then( response => {
            dispatch( {
                type: DROP_DOWN_STATUSES,
                dropDownStatuses: response.data.data.map( item => ( { value: item.id, label: item.name } ) )
            } );
        } );
    };
};

//Get Data by Query 
export const getStatusByQuery = params => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.status.get_statuses_by_query}?${convertQueryString( params )}`, params ).then( ( { data } ) => {
            dispatch( {
                type: GET_STATUSES_BY_QUERY,
                statuses: data.data,
                totalPages: data.totalRecords,
                params
            } );
        } );
    };
};

// ** Get Status by Id
export const getStatusById = id => {
    return async dispatch => {
        await baseAxios
            .get( `${merchandisingApi.status.get_status_by_id}/${id}` )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: GET_STATUS_BY_ID,
                        selectedStatus: response.data ? response.data : null
                    } );
                } else {
                    notify( 'error', `'The Status couldn't find` );
                }
            } )
            .catch( err => console.log( err ) );
    };
};

/// Selected Status Null after Edit or Edit Cancel
export const selectedStatusNull = () => {
    return async dispatch => {
        await dispatch( {
            type: SELECTED_STATUS_NULL,
            selectedStatus: null
        } );
    };
};

// ** Add new Status
export const addStatus = status => {
    return async ( dispatch, getState ) => {
        await baseAxios
            .post( `${merchandisingApi.status.add_status}`, status )
            .then( ( { data } ) => {
                if ( data.status === status.success ) {
                    dispatch( {
                        type: ADD_STATUS,
                        status
                    } );
                    notify( 'success', 'The Status has been added Successfully!' );
                } else {
                    notify( 'error', 'The Status has been added Failed!' );
                }

            } )
            .then( () => {

                dispatch( getStatusByQuery( getState().statuses.params ) );
                //dispatch( getAllStatuses() );
            } )
            .catch( err => console.log( err ) );
    };
};

// ** Update Status
export const updateStatus = status => {
    return ( dispatch, getState ) => {
        baseAxios
            .put( `${merchandisingApi.status.update_status}/${status.id}`, status )
            .then( response => {
                dispatch( {
                    type: UPDATE_STATUS,
                    status
                } );

            } )
            .then( () => {
                notify( 'success', 'The Status has been updated Successfully!' );
                dispatch( getStatusByQuery( getState().statuses.params ) );
                // dispatch( getAllStatuses() );
            } )
            .catch( err => console.log( err ) );

    };
};

// ** Delete Status
export const deleteStatus = id => {
    return ( dispatch, getState ) => {
        confirmDialog( confirmObj ).then( async e => {
            if ( e.isConfirmed ) {
                baseAxios
                    .delete( `${merchandisingApi.status.delete_status}`, { id } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_STATUS
                        } );
                    } )
                    .then( () => {
                        notify( 'success', 'The Status has been deleted Successfully!' );
                        dispatch( getStatusByQuery( getState().statuses.params ) );
                        dispatch( getAllStatuses() );
                    } );
            }
        } );
    };
};

// ** Delete Status by Range
export const deleteRangeStatus = ids => {
    return ( dispatch, getState ) => {
        confirmDialog( confirmObj ).then( e => {
            if ( e.isConfirmed ) {
                baseAxios
                    .delete( `${merchandisingApi.status.delete_status_by_range}`, { ids } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_STATUSES_BY_RANGE
                        } );
                    } )
                    .then( () => {
                        notify( 'success', 'Status has been deleted Successfully!' );
                        dispatch( getStatusByQuery( getState().statuses.params ) );
                        dispatch( getAllStatuses() );
                    } );
            }
        } );
    };
};

// ** Open  Status Sidebar
export const handleOpenStatusSidebar = ( condition ) => {
    return async dispatch => {
        await dispatch( {
            type: OPEN_STATUS_SIDEBAR,
            openStatusSidebar: condition
        } );
    };
};