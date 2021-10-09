
import { notify } from "@custom/notifications";
import axios from "axios";
import { merchandisingApi } from "../../../../../services/api-end-points/merchandising";
import { confirmDialog } from "../../../../../utility/custom/ConfirmDialog";
import { convertQueryString } from "../../../../../utility/Utils";
import { ADD_SAMPLE_ASSIGNEE, DELETE_SAMPLE_ASSIGNEE, DELETE_SAMPLE_ASSIGNEE_BY_RANGE, DROP_DOWN_SAMPLE_ASSIGNEES, GET_SAMPLE_ASSIGNEES, GET_SAMPLE_ASSIGNEES_BY_QUERY, GET_SAMPLE_ASSIGNEE_BY_ID, OPEN_SAMPLE_ASSIGNEE_SIDEBAR, SELECTED_SAMPLE_ASSIGNEE_NULL, UPDATE_SAMPLE_ASSIGNEE } from "../actionTypes";


const confirmObj = {
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    confirmButtonText: 'Yes !',
    cancelButtonText: 'No'
};

///Get All without Query
export const getAllSampleAssignees = () => {
    return async ( dispatch ) => {
        await axios
            .get( `${merchandisingApi.sampleAssignee.get_sample_assignees}` )
            .then( ( response ) => {
                dispatch( {
                    type: GET_SAMPLE_ASSIGNEES,
                    sampleAssignees: response.data
                } );
            } );

    };

};

///Get All DropDown Sample Assignee without query
export const getDropDownSampleAssignees = () => {
    return async ( dispatch ) => {
        await axios
            .getAllBuyerAgents( `${merchandisingApi.sampleAssignee.get_sample_assignees}` )
            .then( ( response ) => {
                dispatch( {
                    type: DROP_DOWN_SAMPLE_ASSIGNEES,
                    dropDownSampleAssignees: response.data.map( ( item ) => ( {
                        value: item.id,
                        label: item.fullName
                    } ) )
                } );
            } );
    };
};

//Get Data by Query
export const getBuyerSampleAssigneeByQuery = ( params ) => {
    return async ( dispatch ) => {
        await axios
            .get( `${merchandisingApi.sampleAssignee.get_sample_assignees_by_query}?${convertQueryString( params )}` )
            .then( ( response ) => {
                dispatch( {
                    type: GET_SAMPLE_ASSIGNEES_BY_QUERY,
                    sampleAssignees: response.data.data,
                    totalPages: response.data.total,
                    params
                } );
            } );
    };
};

//Get Sample Assignee By ID
export const getSampleAssigneeById = ( id ) => {
    return async ( dispatch ) => {
        await axios
            .get( `${merchandisingApi.sampleAssignee.get_sample_assignee_by_id}/${id}` )
            .then( ( response ) => {
                dispatch( {
                    type: GET_SAMPLE_ASSIGNEE_BY_ID,
                    selectedSampleAssignee: response.data ? response.data : null
                } );
            } )
            .catch( ( err ) => console.log( err ) );
    };
};

///Selected Sample Assignee Null after Edit or Cancel
export const selectedSampleAssigneeNull = () => {
    return async ( dispatch ) => {
        await dispatch( {
            type: SELECTED_SAMPLE_ASSIGNEE_NULL,
            selectedSampleAssignee: null
        } );
    };
};

// Add new Sample Assignee
export const addSampleAssignee = ( sampleAssignee ) => {
    return async ( dispatch, getState ) => {
        await axios
            .post( `${merchandisingApi.sampleAssignee.add_sample_assignee}`, sampleAssignee )
            .then( ( response ) => {
                dispatch( {
                    type: ADD_SAMPLE_ASSIGNEE,
                    sampleAssignee
                } );
            } )
            .then( () => {
                notify( "success", "The Sample Assignee has been added Successfully!" );
                dispatch( getBuyerSampleAssigneeByQuery( getState().sampleAssignees.params ) );
            } )
            .catch( ( err ) => console.log( err ) );
    };
};

// ** Update BuyerAgent
export const updateSampleAgent = ( sampleAssignee ) => {
    return ( dispatch, getState ) => {
        axios
            .put( `${merchandisingApi.sampleAssignee.update_sample_assignee}`, sampleAssignee )
            .then( ( response ) => {
                dispatch( {
                    type: UPDATE_SAMPLE_ASSIGNEE,
                    sampleAssignee
                } );
            } )
            .then( () => {
                notify( "success", "The Sample Assignee has been updated Successfully!" );
                dispatch( getBuyerSampleAssigneeByQuery( getState().sampleAssignees.params ) );
            } )
            .catch( ( err ) => console.log( err ) );
    };
};

//Delete BuyerAgent
export const deleteSampleAssignee = ( id ) => {
    return ( dispatch, getState ) => {

        confirmDialog( confirmObj ).then( async e => {
            if ( e.isConfirmed ) {
                await axios
                    .delete( `${merchandisingApi.sampleAssignee.delete_sample_assignee}`, { id } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_SAMPLE_ASSIGNEE
                        } );
                    } )
                    .then( () => {
                        notify( "success", "The Sample Assignee has been updated Successfully!" );
                        dispatch( getBuyerSampleAssigneeByQuery( getState().sampleAssignees.params ) );
                    } );
            }
        } );

    };
};

//Delete Sample Assignee by Range
export const deleteRangeSampleAssignee = ( ids ) => {
    return ( dispatch, getState ) => {

        confirmDialog( confirmObj ).then( e => {
            if ( e.isConfirmed ) {
                axios
                    .delete( `${merchandisingApi.sampleAssignee.delete_sample_assignee_by_range}`, { ids } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_SAMPLE_ASSIGNEE_BY_RANGE
                        } );
                    } )
                    .then( () => {
                        notify( "success", "The Sample Assignee has been deleted Successfully!" );
                        dispatch( getBuyerSampleAssigneeByQuery( getState().sampleAssignee.params ) );
                        dispatch( getAllSampleAssignees() );
                    } );
            }
        } );

    };
};

//Open Sample Assignee Sidebar
export const handleOpenSampleAssigneeSidebar = ( condition ) => {
    return async ( dispatch ) => {
        await dispatch( {
            type: OPEN_SAMPLE_ASSIGNEE_SIDEBAR,
            openSampleAssigneeSidebar: condition
        } );
    };
};