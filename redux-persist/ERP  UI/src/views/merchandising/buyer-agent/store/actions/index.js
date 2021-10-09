
import { notify } from "@custom/notifications";
import { baseAxios } from "@services";
import { merchandisingApi } from "../../../../../services/api-end-points/merchandising";
import { confirmDialog } from "../../../../../utility/custom/ConfirmDialog";
import { status } from "../../../../../utility/enums";
import { convertQueryString } from "../../../../../utility/Utils";
import {
    ADD_BUYER_AGENT,
    DELETE_BUYER_AGENT,
    DELETE_BUYER_AGENT_BY_RANGE,
    DROP_DOWN_BUYER_AGENTS,
    GET_BUYER_AGENTS, GET_BUYER_AGENTS_BY_QUERY, GET_BUYER_AGENT_BY_ID,
    OPEN_BUYER_AGENT_SIDEBAR,
    SELECTED_BUYER_AGENT_NULL,
    UPDATE_BUYER_AGENT
} from "../actionTypes";


const confirmObj = {
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    confirmButtonText: 'Yes !',
    cancelButtonText: 'No'
};

///Get All without Query
export const getAllBuyerAgents = () => {

    return async ( dispatch ) => {
        await baseAxios
            .get( `${merchandisingApi.buyerAgent.get_buyer_agents}` )
            .then( ( response ) => {
                dispatch( {
                    type: GET_BUYER_AGENTS,
                    buyerAgents: response.data
                } );
            } );
    };
};


///Get All DropDown Buyer Agent without query
export const getDropDownBuyerAgents = () => {
    return async ( dispatch ) => {
        await baseAxios
            .get( `${merchandisingApi.buyerAgent.get_buyer_agents_dropdown}` )
            .then( ( response ) => {
                dispatch( {
                    type: DROP_DOWN_BUYER_AGENTS,
                    dropDownBuyerAgents: response.data.data.map( ( item ) => ( {
                        value: item.id,
                        label: item.name
                    } ) )
                } );
            } );
    };
};

export const getCascadeDropDownBuyerAgents = ( id ) => {
    return async ( dispatch ) => {
        await baseAxios
            .get( `${merchandisingApi.buyerAgent.get_buyer_agents_cascade_dropdown}/${id}/agents` )
            .then( ( response ) => {
                dispatch( {
                    type: DROP_DOWN_BUYER_AGENTS,
                    dropDownBuyerAgents: response.data.map( ( item ) => ( {
                        value: item.id,
                        label: item.name
                    } ) )
                } );
            } );
    };
};


//Get Data by Query
export const getBuyerAgentByQuery = ( params ) => {
    return async ( dispatch ) => {
        await baseAxios
            .get( `${merchandisingApi.buyerAgent.get_buyer_agents_by_query}?${convertQueryString( params )}` )
            .then( ( { data } ) => {
                if ( data.succeeded ) {
                    dispatch( {
                        type: GET_BUYER_AGENTS_BY_QUERY,
                        buyerAgents: data.data,
                        totalPages: data.totalRecords,
                        params
                    } );
                } else {
                    notify( "error", "Something gonna Wrong!" );
                }
            } ).catch( e => {
                notify( "warning", "Server Side ERROR!" );
            } )
            ;
    };
};

//Get BuyerAgent By ID
export const getBuyerAgentById = ( id ) => {
    return async ( dispatch ) => {
        await baseAxios
            .get( `${merchandisingApi.buyerAgent.get_buyer_agent_by_id}/${id}` )
            .then( ( response ) => {
                dispatch( {
                    type: GET_BUYER_AGENT_BY_ID,
                    selectedBuyerAgent: response.data ? response.data : null
                } );
            } )
            .catch( ( err ) => console.log( err ) );
    };
};

///Selected Buyer Agent Null after Edit or Cancel
export const selectedBuyerAgentNull = () => {
    return async ( dispatch ) => {
        await dispatch( {
            type: SELECTED_BUYER_AGENT_NULL,
            selectedBuyerAgent: null
        } );
    };
};

// Add new Buyer Agent
export const addBuyerAgent = ( buyerAgent ) => {
    return async ( dispatch, getState ) => {
        await baseAxios.post( `${merchandisingApi.buyerAgent.add_buyer_agent}`, buyerAgent )
            .then( ( response ) => {

                if ( response.status === status.success ) {
                    dispatch( {
                        type: ADD_BUYER_AGENT,
                        buyerAgent
                    } );
                    notify( "success", "The buyer agent has been added Successfully!" );
                } else {
                    notify( "error", "The buyer agent has been added Failed!" );
                }
            } )
            .then( () => {
                dispatch( getBuyerAgentByQuery( getState().buyerAgents.params ) );
            } )
            .catch( ( err ) => console.log( err ) );
    };
};

// ** Update BuyerAgent
export const updateBuyerAgent = ( buyerAgent ) => {
    return ( dispatch, getState ) => {
        baseAxios
            .put( `${merchandisingApi.buyerAgent.update_buyer_agent}/${buyerAgent.id}`, buyerAgent )
            .then( ( response ) => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: UPDATE_BUYER_AGENT,
                        buyerAgent
                    } );
                    notify( "success", "The buyer Agent has been updated Successfully!" );

                } else {
                    notify( "error", "The buyer Agent has been updated Failed!" );

                }

            } )
            .then( () => {
                dispatch( getBuyerAgentByQuery( getState().buyerAgents.params ) );
                // dispatch( getAllBuyerAgents() );
            } )
            .catch( ( err ) => console.log( err ) );
    };
};

//Delete BuyerAgent
export const deleteBuyerAgent = ( id ) => {
    return ( dispatch, getState ) => {

        confirmDialog( confirmObj ).then( async e => {
            if ( e.isConfirmed ) {
                await baseAxios
                    .delete( `${merchandisingApi.buyerAgent.delete_buyer_agent}`, { id } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_BUYER_AGENT
                        } );
                    } )
                    .then( () => {
                        notify( "success", "The Buyer Agent has been updated Successfully!" );
                        dispatch( getBuyerAgentByQuery( getState().buyerAgents.params ) );
                        // dispatch( getAllBuyerAgents() );
                    } );
            }
        } );

    };
};

//Delete Buyer Agent by Range
export const deleteRangeBuyerAgent = ( ids ) => {
    return ( dispatch, getState ) => {

        confirmDialog( confirmObj ).then( e => {
            if ( e.isConfirmed ) {
                baseAxios
                    .delete( `${merchandisingApi.buyerAgent.delete_buyer_agent_by_range}`, { ids } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_BUYER_AGENT_BY_RANGE
                        } );
                    } )
                    .then( () => {
                        notify( "success", "The buyer Agent has been deleted Successfully!" );
                        dispatch( getBuyerAgentByQuery( getState().buyerAgents.params ) );
                        // dispatch( getAllBuyerAgents() );
                    } );
            }
        } );

    };
};

//Open Buyer Agent Sidebar
export const handleOpenBuyerAgentSidebar = ( condition ) => {
    return async ( dispatch ) => {
        await dispatch( {
            type: OPEN_BUYER_AGENT_SIDEBAR,
            openBuyerAgentSidebar: condition
        } );
    };
};
