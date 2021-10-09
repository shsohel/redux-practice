import { notify } from "@custom/notifications";
import { baseAxios } from "@services";
// import { axios } from "@services";
import { merchandisingApi } from "../../../../../services/api-end-points/merchandising";
import { confirmDialog } from "../../../../../utility/custom/ConfirmDialog";
import { status } from "../../../../../utility/enums";
import { convertQueryString } from "../../../../../utility/Utils";
import { ADD_BUYER_DEPARTMENT, DELETE_BUYER_DEPARTMENT, DELETE_BUYER_DEPARTMENTS_BY_RANGE, DROP_DOWN_BUYER_DEPARTMENTS, GET_BUYER_DEPARTMENTS, GET_BUYER_DEPARTMENTS_BY_QUERY, GET_BUYER_DEPARTMENT_BY_ID, OPEN_BUYER_DEPARTMENT_SIDEBAR, SELECTED_BUYER_DEPARTMENT_NULL, UPDATE_BUYER_DEPARTMENT } from "../actionTypes";


const confirmObj = {
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    confirmButtonText: 'Yes !',
    cancelButtonText: 'No'
};

///Get All without Query
export const getAllBuyerDepartments = () => {
    return async ( dispatch ) => {
        await baseAxios
            .get( `${merchandisingApi.buyerDepartment.get_buyer_departments}` )
            .then( ( response ) => {
                dispatch( {
                    type: GET_BUYER_DEPARTMENTS,
                    buyerDepartments: response.data
                } );
            } );
    };
};


///Get All DropDown Buyer Department without query
export const getDropDownBuyerDepartments = () => {
    return async ( dispatch ) => {
        await baseAxios.get( `${merchandisingApi.buyerDepartment.get_buyer_departments_dropdown}` )
            .then( ( response ) => {
                dispatch( {
                    type: DROP_DOWN_BUYER_DEPARTMENTS,
                    dropDownBuyerDepartments: response.data.data.map( ( item ) => ( {
                        value: item.id,
                        label: item.name
                    } ) )
                } );
            } );
    };
};
//For Cascade
export const getCascadeDropDownBuyerDepartments = ( id ) => {
    return async ( dispatch ) => {
        await baseAxios.get( `${merchandisingApi.buyerDepartment.get_buyers_departments_cascade_dropdown}/${id}/departments` )
            .then( ( response ) => {
                dispatch( {
                    type: DROP_DOWN_BUYER_DEPARTMENTS,
                    dropDownBuyerDepartments: response.data.map( ( item ) => ( {
                        value: item.id,
                        label: item.name
                    } ) )
                } );
            } );
    };
};

//Get Data by Query
export const getBuyerDepartmentByQuery = ( params ) => {
    return async ( dispatch ) => {
        await baseAxios
            .get( `${merchandisingApi.buyerDepartment.get_buyer_departments_by_query}?${convertQueryString( params )}`, params )
            .then( ( { data } ) => {
                if ( data.succeeded ) {
                    dispatch( {
                        type: GET_BUYER_DEPARTMENTS_BY_QUERY,
                        buyerDepartments: data.data,
                        totalPages: data.totalRecords,
                        params
                    } );
                } else {
                    notify( 'error', 'Something gonna wrong!' );
                }

            } ).catch( e => {
                notify( 'warning', 'Server Side ERROR' );

            } );
    };
};

//Get Buyer Department By ID
export const getBuyerDepartmentById = ( id ) => {
    return async ( dispatch ) => {
        await baseAxios
            .get( `${merchandisingApi.buyerDepartment.get_buyer_department_by_id}/${id}` )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: GET_BUYER_DEPARTMENT_BY_ID,
                        selectedBuyerDepartment: response.data ? response.data : null
                    } );
                } else {
                    notify( 'error', `'The Buyer Department couldn't find'` );
                }

            } )
            .catch( ( err ) => console.log( err ) );
    };
};

///Selected Buyer Department Null after Edit or Cancel
export const selectedBuyerDepartmentNull = () => {
    return async ( dispatch ) => {
        await dispatch( {
            type: SELECTED_BUYER_DEPARTMENT_NULL,
            selectedBuyerDepartment: null
        } );
    };
};

// Add new Buyer Department
export const addBuyerDepartment = ( buyerDepartment ) => {
    return async ( dispatch, getState ) => {
        await baseAxios
            .post( `${merchandisingApi.buyerDepartment.add_buyer_department}`, buyerDepartment )
            .then( ( response ) => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: ADD_BUYER_DEPARTMENT,
                        buyerDepartment
                    } );
                    notify( "success", "The Buyer Department has been added Successfully!" );
                } else {
                    notify( "error", "The Buyer Department has been added Failed!" );
                }

            } )
            .then( () => {

                dispatch( getBuyerDepartmentByQuery( getState().buyerDepartments.params ) );
                //dispatch( getAllBuyerDepartments() );
            } )
            .catch( ( err ) => console.log( err ) );
    };
};

// ** Update BuyerAgent
export const updateBuyerDepartment = ( buyerDepartment ) => {
    return ( dispatch, getState ) => {
        baseAxios
            .put( `${merchandisingApi.buyerDepartment.update_buyer_department}/${buyerDepartment.id}`, buyerDepartment )
            .then( ( response ) => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: UPDATE_BUYER_DEPARTMENT,
                        buyerDepartment
                    } );
                    notify( "success", "The Buyer Department has been updated Successfully!" );
                } else {
                    notify( "error", "The Buyer Department has been updated Failed!" );
                }

            } )
            .then( () => {

                dispatch( getBuyerDepartmentByQuery( getState().buyerDepartments.params ) );
                //dispatch( getAllBuyerDepartments() );
            } )
            .catch( ( err ) => console.log( err ) );
    };
};

//Delete BuyerAgent
export const deleteBuyerDepartment = ( id ) => {
    return ( dispatch, getState ) => {

        confirmDialog( confirmObj ).then( async e => {
            if ( e.isConfirmed ) {
                await baseAxios
                    .delete( `${merchandisingApi.buyerDepartment.delete_buyer_department}`, { id } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_BUYER_DEPARTMENT
                        } );
                    } )
                    .then( () => {
                        notify( "success", "The Buyer Department has been updated Successfully!" );
                        dispatch( getBuyerDepartmentByQuery( getState().buyerDepartments.params ) );
                        dispatch( getAllBuyerDepartments() );
                    } );
            }
        } );

    };
};

//Delete Buyer Department by Range
export const deleteRangeBuyerDepartment = ( ids ) => {
    return ( dispatch, getState ) => {

        confirmDialog( confirmObj ).then( e => {
            if ( e.isConfirmed ) {
                baseAxios
                    .delete( `${merchandisingApi.buyerDepartment.delete_buyer_department_by_range}`, { ids } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_BUYER_DEPARTMENTS_BY_RANGE
                        } );
                    } )
                    .then( () => {
                        notify( "success", "The Buyer Department has been deleted Successfully!" );
                        dispatch( getBuyerDepartmentByQuery( getState().buyerDepartments.params ) );
                        dispatch( getAllBuyerDepartments() );
                    } );
            }
        } );

    };
};

//Open Buyer Department Sidebar
export const handleOpenBuyerDepartmentSidebar = ( condition ) => {
    return async ( dispatch ) => {
        await dispatch( {
            type: OPEN_BUYER_DEPARTMENT_SIDEBAR,
            openBuyerDepartmentSidebar: condition
        } );
    };
};