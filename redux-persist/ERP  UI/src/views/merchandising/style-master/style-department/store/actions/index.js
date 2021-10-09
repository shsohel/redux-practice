import { notify } from "@custom/notifications";
import { baseAxios } from "@services";
import { merchandisingApi } from '../../../../../../services/api-end-points/merchandising';
import { confirmDialog } from "../../../../../../utility/custom/ConfirmDialog";
import { status } from "../../../../../../utility/enums";
import { convertQueryString } from "../../../../../../utility/Utils";
import { ADD_DEPARTMENT, DELETE_DEPARTMENT, DELETE_DEPARTMENTS_BY_RANGE, DROP_DOWN_DEPARTMENTS, GET_DEPARTMENTS, GET_DEPARTMENTS_BY_QUERY, GET_DEPARTMENT_BY_ID, OPEN_DEPARTMENT_SIDEBAR, SELECTED_DEPARTMENT_NULL, UPDATE_DEPARTMENT } from '../actionTypes';


const confirmObj = {
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    confirmButtonText: 'Yes !',
    cancelButtonText: 'No'
};

///Get All Department Without Query
export const getAllDepartments = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.department.get_departments}` ).then( response => {
            dispatch( {
                type: GET_DEPARTMENTS,
                departments: response.data
            } );
        } );
    };
};

/// Get All Department Without Query
export const getDropDownDepartments = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.department.get_departments_dropdown}` ).then( response => {
            // console.log( response.data );
            dispatch( {
                type: DROP_DOWN_DEPARTMENTS,
                dropDownDepartments: response?.data?.data?.map( item => ( { value: item.id, label: item.name } ) )
            } );
        } );
    };
};

export const getCascadeDropDownDepartments = ( id ) => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.department.get_style_departments_cascade_dropdown}/${id}/styleDepartments` ).then( response => {
            // console.log( response.data );
            dispatch( {
                type: DROP_DOWN_DEPARTMENTS,
                dropDownDepartments: response?.data?.map( item => ( { value: item.id, label: item.name } ) )
            } );
        } );
    };
};

//Get Data by Query 
export const getDepartmentByQuery = params => {

    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.department.get_departments_by_query}?${convertQueryString( params )}`, params ).then( ( { data } ) => {
            if ( data.succeeded ) {
                dispatch( {
                    type: GET_DEPARTMENTS_BY_QUERY,
                    departments: data.data,
                    totalPages: data.totalRecords,
                    params
                } );
            }

        } );
    };
};

// ** Get Department by Id
export const getDepartmentById = id => {
    return async dispatch => {
        await baseAxios
            .get( `${merchandisingApi.department.get_department_by_id}/${id}` )
            .then( response => {
                console.log( response );
                if ( response.status === status.success ) {
                    dispatch( {
                        type: GET_DEPARTMENT_BY_ID,
                        selectedDepartment: response.data ? response.data : null
                    } );
                } else {
                    notify( 'error', `'The Style Department couldn't find'` );
                }

            } )
            .catch( err => console.log( err ) );
    };
};

/// Selected Department Null after Edit or Edit Cancel
export const selectedDepartmentNull = () => {
    return async dispatch => {
        await dispatch( {
            type: SELECTED_DEPARTMENT_NULL,
            selectedDepartment: null
        } );
    };
};

// ** Add new Department
export const addDepartment = department => {
    return async ( dispatch, getState ) => {
        await baseAxios
            .post( `${merchandisingApi.department.add_department}`, department )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: ADD_DEPARTMENT,
                        lastCreatedId: response.data,
                        department
                    } );
                    notify( 'success', 'The Department has been added Successfully!' );
                } else {
                    notify( 'error', 'The Department has been added Failed!' );
                }

            } )
            .then( () => {

                dispatch( getDepartmentByQuery( getState().departments.params ) );
                //dispatch( getAllDepartments() );
            } )
            .catch( err => console.log( err ) );
    };
};

// ** Update Department
export const updateDepartment = department => {
    return ( dispatch, getState ) => {
        baseAxios
            .put( `${merchandisingApi.department.update_department}/${department.id}`, department )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: UPDATE_DEPARTMENT,
                        department
                    } );
                    notify( 'success', 'The Department has been updated Successfully!' );
                } else {
                    notify( 'error', 'The Department has been updated Failed!' );
                }


            } )
            .then( () => {

                dispatch( getDepartmentByQuery( getState().departments.params ) );
                //dispatch( getAllDepartments() );
            } )
            .catch( err => console.log( err ) );

    };
};

// ** Delete Department
export const deleteDepartment = id => {
    return ( dispatch, getState ) => {

        confirmDialog( confirmObj ).then( async e => {
            if ( e.isConfirmed ) {
                await baseAxios
                    .delete( `${merchandisingApi.department.delete_department}`, { id } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_DEPARTMENT
                        } );
                    } )
                    .then( () => {
                        notify( 'success', 'The Department has been deleted Successfully!' );
                        dispatch( getDepartmentByQuery( getState().departments.params ) );
                        dispatch( getAllDepartments() );
                    } );
            }
        } );


    };
};

// ** Delete Department by Range
export const deleteRangeDepartment = ids => {
    return ( dispatch, getState ) => {

        confirmDialog( confirmObj ).then( e => {
            if ( e.isConfirmed ) {
                baseAxios
                    .delete( `${merchandisingApi.department.delete_department_by_range}`, { ids } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_DEPARTMENTS_BY_RANGE
                        } );
                    } )
                    .then( () => {
                        notify( 'success', 'The Department has been deleted Successfully!' );
                        dispatch( getDepartmentByQuery( getState().departments.params ) );
                        dispatch( getAllDepartments() );

                    } );
            }
        } );

    };
};

// ** Open  Department Sidebar
export const handleOpenDepartmentSidebar = ( condition ) => {
    return async dispatch => {
        await dispatch( {
            type: OPEN_DEPARTMENT_SIDEBAR,
            openDepartmentSidebar: condition
        } );
    };
};
