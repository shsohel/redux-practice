import { notify } from "@custom/notifications";
import { baseAxios } from "@services";
import { merchandisingApi } from '../../../../../services/api-end-points/merchandising';
import { confirmDialog } from "../../../../../utility/custom/ConfirmDialog";
import { status } from "../../../../../utility/enums";
import { convertQueryString } from "../../../../../utility/Utils";
import { ADD_MERCHANDISER, DELETE_MERCHANDISER, DELETE_MERCHANDISER_BY_RANGE, DROP_DOWN_MERCHANDISER, GET_MERCHANDISER, GET_MERCHANDISER_BY_ID, GET_MERCHANDISER_BY_QUERY, OPEN_MERCHANDISER_SIDEBAR, SELECTED_MERCHANDISER_NULL, UPDATE_MERCHANDISER } from "../actionTypes";


const confirmObj = {
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    confirmButtonText: 'Yes !',
    cancelButtonText: 'No'
};

///Get All without Query
export const getAllMerchandisers = () => {
    return async ( dispatch ) => {
        await baseAxios
            .get( `${merchandisingApi.merchandiser.get_merchandisers}` )
            .then( ( response ) => {
                dispatch( {
                    type: GET_MERCHANDISER,
                    merchandisers: response.data
                } );
            } );
    };
};


///Get All DropDown Merchandiser without query
export const getDropDownMerchandisers = () => {
    return async ( dispatch ) => {
        await baseAxios
            .getAllMerchandisers( `${merchandisingApi.merchandiser.get_merchandisers}` )
            .then( ( response ) => {
                dispatch( {
                    type: DROP_DOWN_MERCHANDISER,
                    dropDownMerchandisers: response.data.map( ( item ) => ( {
                        value: item.id,
                        label: item.fullName
                    } ) )
                } );
            } );
    };
};


//Get Data by Query
export const getMerchandiserByQuery = ( params ) => {
    return async ( dispatch ) => {
        await baseAxios
            .get( `${merchandisingApi.merchandiser.get_merchandisers_by_query}?${convertQueryString( params )}` )
            .then( ( { data } ) => {
                dispatch( {
                    type: GET_MERCHANDISER_BY_QUERY,
                    merchandisers: data.data,
                    totalPages: data.totalRecords,
                    params
                } );
            } );
    };
};


//Get Merchandiser By ID
export const getMerchandiserById = ( id ) => {
    return async ( dispatch ) => {
        await baseAxios
            .get( `${merchandisingApi.merchandiser.get_merchandiser_by_id}`, { id } )
            .then( ( response ) => {
                dispatch( {
                    type: GET_MERCHANDISER_BY_ID,
                    selectedMerchandiser: response.data.merchandiser ? response.data.merchandiser : null
                } );
            } )
            .catch( ( err ) => console.log( err ) );
    };
};


///Selected Merchandiser Null after Edit or Cancel
export const selectedMerchandiserNull = () => {
    return async ( dispatch ) => {
        await dispatch( {
            type: SELECTED_MERCHANDISER_NULL,
            selectedMerchandiser: null
        } );
    };
};


// Add new Merchandiser
export const addMerchandiser = ( merchandiser ) => {
    return async ( dispatch, getState ) => {
        await baseAxios
            .post( `${merchandisingApi.merchandiser.add_merchandiser}`, merchandiser )
            .then( ( response ) => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: ADD_MERCHANDISER,
                        merchandiser
                    } );
                    notify( "success", "The merchandiser  has been added Successfully!" );
                } else {
                    notify( "error", "The merchandiser  has been added Failed!" );
                }
            } )
            .then( () => {
                dispatch( getMerchandiserByQuery( getState().merchandisers.params ) );
                // dispatch( getAllMerchandisers() );
            } )
            .catch( ( err ) => console.log( err ) );
    };
};


// ** Update Merchandiser
export const updateMerchandiser = ( merchandiser ) => {
    return ( dispatch, getState ) => {
        baseAxios
            .post( `${merchandisingApi.merchandiser.update_merchandiser}`, { merchandiser } )
            .then( ( response ) => {
                dispatch( {
                    type: UPDATE_MERCHANDISER,
                    merchandiser
                } );
            } )
            .then( () => {
                notify( "success", "The merchandiser has been updated Successfully!" );
                dispatch( getMerchandiserByQuery( getState().merchandisers.params ) );
                // dispatch( getAllMerchandisers() );
            } )
            .catch( ( err ) => console.log( err ) );
    };
};


//Delete Merchandiser
export const deleteMerchandiser = ( id ) => {
    return ( dispatch, getState ) => {

        confirmDialog( confirmObj ).then( async e => {
            if ( e.isConfirmed ) {
                await baseAxios
                    .delete( `${merchandisingApi.merchandiser.delete_merchandiser}`, { id } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_MERCHANDISER
                        } );
                    } )
                    .then( () => {
                        notify( "success", "The merchandiser has been updated Successfully!" );
                        dispatch( getMerchandiserByQuery( getState().merchandisers.params ) );
                        // dispatch( getAllMerchandisers() );
                    } );
            }
        } );

    };
};


//Delete Merchandiser by Range
export const deleteRangeMerchandiser = ( ids ) => {
    return ( dispatch, getState ) => {
        confirmDialog( confirmObj ).then( e => {
            if ( e.isConfirmed ) {
                baseAxios
                    .delete( `${merchandisingApi.merchandiser.delete_merchandiser_by_range}`, { ids } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_MERCHANDISER_BY_RANGE
                        } );
                    } )
                    .then( () => {
                        notify( "success", "The merchandiser has been deleted Successfully!" );
                        dispatch( getMerchandiserByQuery( getState().merchandisers.params ) );
                        //dispatch( getAllMerchandisers() );
                    } );
            }
        } );

    };
};


//Open Merchandiser Sidebar
export const handleOpenMerchandiserSidebar = ( condition ) => {
    return async ( dispatch ) => {
        await dispatch( {
            type: OPEN_MERCHANDISER_SIDEBAR,
            openMerchandiserSidebar: condition
        } );
    };
};