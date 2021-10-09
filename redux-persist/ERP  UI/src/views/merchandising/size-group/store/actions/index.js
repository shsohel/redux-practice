import { notify } from "@custom/notifications";
import { baseAxios } from "@services";
import { merchandisingApi } from "../../../../../services/api-end-points/merchandising";
import { confirmDialog } from "../../../../../utility/custom/ConfirmDialog";
import { status } from "../../../../../utility/enums";
import { convertQueryString } from "../../../../../utility/Utils";
import { ADD_SIZE_GROUP, DELETE_SIZE_GROUP, DELETE_SIZE_GROUP_BY_RANGE, DROP_DOWN_SIZE_GROUPS, GET_SIZE_GROUPS, GET_SIZE_GROUPS_BY_QUERY, GET_SIZE_GROUP_BY_ID, OPEN_SIZE_GROUP_SIDEBAR, SELECTED_SIZE_GROUP_NULL, UPDATE_SIZE_GROUP } from "../actionTypes";

const confirmObj = {
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    confirmButtonText: 'Yes !',
    cancelButtonText: 'No'
};


///Get All without Query
export const getAllSizeGroups = () => {
    return async ( dispatch ) => {
        await baseAxios
            .get( `${merchandisingApi.sizeGroup.get_size_groups}` )
            .then( ( response ) => {
                dispatch( {
                    type: GET_SIZE_GROUPS,
                    sizeGroups: response.data
                } );
            } );
    };
};


/// Get All Size Group Without Query
export const getDropDownSizeGroups = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.sizeGroup.get_size_groups_for_dropdown}` ).then( response => {
            dispatch( {
                type: DROP_DOWN_SIZE_GROUPS,
                dropDownSizeGroups: response.data.data.map( item => ( { value: item.id, label: item.name } ) )
            } );
        } );
    };
};

//Get Data by Query 
export const getSizeGroupByQuery = params => {

    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.sizeGroup.get_size_groups_by_query}?${convertQueryString( params )}`, params ).then( ( { data } ) => {
            if ( data.succeeded ) {
                dispatch( {
                    type: GET_SIZE_GROUPS_BY_QUERY,
                    sizeGroups: data.data,
                    totalPages: data.totalRecords,
                    params
                } );
            } else {
                notify( "error", "Something gonna Wrong" );
            }

        } );
    };
};

// ** Get Size Group by Id
export const getSizeGroupById = id => {
    return async dispatch => {
        await baseAxios
            .get( `${merchandisingApi.sizeGroup.get_size_group_by_id}/${id}` )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: GET_SIZE_GROUP_BY_ID,
                        selectedSizeGroup: response.data ? response.data : null
                    } );
                } else {
                    notify( 'error', `'The Size couldn't find'` );

                }

            } )
            .catch( err => console.log( err ) );
    };
};


/// Selected Size Group Null after Edit or Edit Cancel
export const selectedSizeGroupNull = () => {
    return async dispatch => {
        await dispatch( {
            type: SELECTED_SIZE_GROUP_NULL,
            selectedSizeGroup: null
        } );
    };
};


// ** Add new Size Group
export const addSizeGroup = sizeGroup => {
    console.log( sizeGroup );
    return async ( dispatch, getState ) => {
        await baseAxios
            .post( `${merchandisingApi.sizeGroup.add_size_group}`, sizeGroup )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: ADD_SIZE_GROUP,
                        sizeGroup
                    } );
                    notify( 'success', 'The Size Group has been added Successfully!' );
                } else {
                    notify( 'error', 'The Size Group has been added Failed!' );
                }

            } )
            .then( () => {

                dispatch( getSizeGroupByQuery( getState().sizeGroups.params ) );
                //dispatch( getAllSizeGroups() );
            } )
            .catch( err => console.log( err ) );
    };
};

// ** Update Size Group
export const updateSizeGroup = sizeGroup => {
    return ( dispatch, getState ) => {
        baseAxios
            .put( `${merchandisingApi.sizeGroup.update_size_group}/${sizeGroup.id}`, sizeGroup )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: UPDATE_SIZE_GROUP,
                        sizeGroup
                    } );
                    notify( 'success', 'The Size Group has been updated Successfully!' );
                } else {
                    notify( 'error', 'The Size Group has been updated Failed!' );
                }


            } )
            .then( () => {

                dispatch( getSizeGroupByQuery( getState().sizeGroups.params ) );
                // dispatch( getAllSizeGroups() );
            } )
            .catch( err => console.log( err ) );

    };
};

// ** Delete Size Group
export const deleteSizeGroup = id => {
    return ( dispatch, getState ) => {
        confirmDialog( confirmObj ).then( e => {
            if ( e.isConfirmed ) {
                baseAxios
                    .delete( `${merchandisingApi.sizeGroup.delete_size_group}`, { id } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_SIZE_GROUP
                        } );
                    } )
                    .then( () => {
                        notify( 'success', 'The Size Group has been deleted Successfully!' );
                        dispatch( getSizeGroupByQuery( getState().sizeGroups.params ) );
                        dispatch( getAllSizeGroups() );
                    } );
            }
        } );
    };
};


// ** Delete Size Group by Range
export const deleteRangeSizeGroup = ids => {
    return ( dispatch, getState ) => {
        confirmDialog( confirmObj ).then( e => {
            if ( e.isConfirmed ) {
                baseAxios
                    .delete( `${merchandisingApi.sizeGroup.delete_size_group_by_range}`, { ids } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_SIZE_GROUP_BY_RANGE
                        } );
                    } )
                    .then( () => {
                        notify( 'success', 'Size Group has been deleted Successfully!' );
                        dispatch( getSizeGroupByQuery( getState().sizeGroups.params ) );
                        dispatch( getAllSizeGroups() );
                    } );
            }
        } );
    };
};

// ** Open  Size Group Sidebar
export const handleOpenSizeGroupSidebar = ( condition ) => {
    console.log( condition );
    return async dispatch => {
        await dispatch( {
            type: OPEN_SIZE_GROUP_SIDEBAR,
            openSizeGroupSidebar: condition
        } );
    };
};