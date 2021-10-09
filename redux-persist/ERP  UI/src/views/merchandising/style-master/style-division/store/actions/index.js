import { notify } from "@custom/notifications";
import { baseAxios } from "@services";
import { merchandisingApi } from '../../../../../../services/api-end-points/merchandising';
import { confirmDialog } from "../../../../../../utility/custom/ConfirmDialog";
import { status } from "../../../../../../utility/enums";
import { convertQueryString } from "../../../../../../utility/Utils";
import { ADD_DIVISION, DELETE_DIVISION, DELETE_DIVISIONS_BY_RANGE, DROP_DOWN_DIVISIONS, GET_DIVISIONS, GET_DIVISIONS_BY_QUERY, GET_DIVISION_BY_ID, OPEN_DIVISION_SIDEBAR, SELECTED_DIVISION_NULL, UPDATE_DIVISION } from '../actionTypes';

const confirmObj = {
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    confirmButtonText: 'Yes !',
    cancelButtonText: 'No'
};

///Get All Division Without Query
export const getAllDivisions = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.division.get_divisions}` ).then( response => {
            dispatch( {
                type: GET_DIVISIONS,
                divisions: response.data
            } );
        } );
    };
};

/// Get All Division Without Query
export const getDropDownDivisions = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.division.get_divisions_dropdown}` ).then( response => {
            dispatch( {
                type: DROP_DOWN_DIVISIONS,
                dropDownDivisions: response.data.data.map( item => ( { value: item.id, label: item.name } ) )
            } );
        } );
    };
};
//For Cascade
export const getCascadeDropDownDivisions = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.division.get_style_divisions_cascade_dropdown}` ).then( response => {
            dispatch( {
                type: DROP_DOWN_DIVISIONS,
                dropDownDivisions: response.data.data.map( item => ( { value: item.id, label: item.name } ) )
            } );
        } );
    };
};


//Get Data by Query 
export const getDivisionByQuery = params => {

    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.division.get_divisions_by_query}?${convertQueryString( params )}`, params ).then( ( { data } ) => {
            if ( data.succeeded ) {
                dispatch( {
                    type: GET_DIVISIONS_BY_QUERY,
                    divisions: data.data,
                    totalPages: data.totalRecords,
                    params
                } );
            }

        } );
    };
};


// ** Get Division by Id
export const getDivisionById = id => {
    return async dispatch => {
        await baseAxios
            .get( `${merchandisingApi.division.get_division_by_id}/${id}` )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: GET_DIVISION_BY_ID,
                        selectedDivision: response.data ? response.data : null
                    } );
                } else {
                    notify( 'error', `'The Style Division couldn't find'` );

                }

            } )
            .catch( err => console.log( err ) );
    };
};


/// Selected Division Null after Edit or Edit Cancel
export const selectedDivisionNull = () => {
    return async dispatch => {
        await dispatch( {
            type: SELECTED_DIVISION_NULL,
            selectedDivision: null
        } );
    };
};


// ** Add new Division
export const addDivision = division => {
    return async ( dispatch, getState ) => {
        await baseAxios
            .post( `${merchandisingApi.division.add_division}`, division )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: ADD_DIVISION,
                        division
                    } );
                    notify( 'success', 'The Division has been added Successfully!' );
                } else {
                    notify( 'error', 'The Division has been added Failed!' );
                }

            } )
            .then( () => {

                dispatch( getDivisionByQuery( getState().divisions.params ) );
                // dispatch( getAllDivisions() );
            } )
            .catch( err => console.log( err ) );
    };
};


// ** Update Division
export const updateDivision = division => {
    return ( dispatch, getState ) => {
        baseAxios
            .put( `${merchandisingApi.division.update_division}/${division.id}`, division )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: UPDATE_DIVISION,
                        division
                    } );
                    notify( 'success', 'The Division has been updated Successfully!' );
                } else {
                    notify( 'error', 'The Division has been updated Failed!' );
                }


            } )
            .then( () => {

                dispatch( getDivisionByQuery( getState().divisions.params ) );
                // dispatch( getAllDivisions() );
            } )
            .catch( err => console.log( err ) );

    };
};

// ** Delete Division
export const deleteDivision = id => {
    return ( dispatch, getState ) => {

        confirmDialog( confirmObj ).then( async e => {
            if ( e.isConfirmed ) {
                await baseAxios
                    .delete( `${merchandisingApi.division.delete_division}`, { id } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_DIVISION
                        } );
                    } )
                    .then( () => {
                        notify( 'success', 'The Division has been deleted Successfully!' );
                        dispatch( getDivisionByQuery( getState().divisions.params ) );
                        dispatch( getAllDivisions() );
                    } );
            }
        } );

    };
};


// ** Delete Division by Range
export const deleteRangeDivision = ids => {
    return ( dispatch, getState ) => {
        confirmDialog( confirmObj ).then( e => {
            if ( e.isConfirmed ) {
                baseAxios
                    .delete( `${merchandisingApi.division.delete_division_by_range}`, { ids } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_DIVISIONS_BY_RANGE
                        } );
                    } )
                    .then( () => {
                        notify( 'success', 'The Division has been deleted Successfully!' );
                        dispatch( getDivisionByQuery( getState().divisions.params ) );
                        dispatch( getAllDivisions() );

                    } );
            }
        } );

    };
};


// ** Open  Division Sidebar
export const handleOpenDivisionSidebar = ( condition ) => {
    return async dispatch => {
        await dispatch( {
            type: OPEN_DIVISION_SIDEBAR,
            openDivisionSidebar: condition
        } );
    };
};
