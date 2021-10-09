import { merchandisingApi } from "@api/merchandising";
import { notify } from "@custom/notifications";
import { baseAxios } from "@services";
import { confirmDialog } from "../../../../../utility/custom/ConfirmDialog";
import { status } from "../../../../../utility/enums";
import { convertQueryString } from "../../../../../utility/Utils";
import { ADD_BUYER, DELETE_BUYER, DELETE_BUYERS_BY_RANGE, DROP_DOWN_BUYERS, GET_BUYERS, GET_BUYERS_BY_QUERY, GET_BUYER_BY_ID, IS_ASSIGN_AGENT, IS_ASSIGN_PRODUCT_DEVELOPER, OPEN_BUYER_SIDEBER, SELECTED_BUYER_NULL, UPDATE_BUYER } from "../actionTypes";

const confirmObj = {
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  confirmButtonText: 'Yes !',
  cancelButtonText: 'No'
};

/// Get All wtihout Query
export const getAllBuyers = () => {
  return async dispatch => {
    await baseAxios.get( `${merchandisingApi.buyer.get_buyers}` ).then( response => {
      dispatch( {
        type: GET_BUYERS,
        buyers: response.data
      } );
    } );
  };
};

/// Get All wtihout Query
export const getDropDownBuyers = () => {

  return async dispatch => {
    await baseAxios.get( `${merchandisingApi.buyer.get_buyers_dropdown}` )
      .then( response => {
        dispatch( {
          type: DROP_DOWN_BUYERS,
          dropDownBuyers: response.data.data.map( item => ( { value: item.id, label: item.name } ) )
        } );
      } );
  };
};


//Get Data by Query 
export const getBuyerByQuery = params => {
  return async dispatch => {
    await baseAxios.get( `${merchandisingApi.buyer.get_buyers_by_query}?${convertQueryString( params )}` ).then( ( { data } ) => {
      dispatch( {
        type: GET_BUYERS_BY_QUERY,
        buyers: data.data,
        totalPages: data.totalRecords,
        params
      } );
    } );
  };
};

// ** Get Buyer by Id
export const getBuyerById = id => {
  return async dispatch => {
    await baseAxios
      .get( `${merchandisingApi.buyer.get_buyer_by_id}/${id}` )
      .then( response => {
        if ( response.status === status.success ) {
          {
            dispatch( {
              type: GET_BUYER_BY_ID,
              selectedBuyer: response.data ? response.data : null
            } );
          }

        } else {
          notify( 'error', `'The Buyer Department couldn't find'` );
        }
      } )
      .catch( err => console.log( err ) );
  };
};


/// Selected Buyer Null after Edit or Edit Cancel
export const selectedBuyerNull = () => {
  return async dispatch => {
    await dispatch( {
      type: SELECTED_BUYER_NULL,
      selectedBuyer: null
    } );
  };
};


// ** Add new buyer
export const addBuyer = buyer => {
  return async ( dispatch, getState ) => {
    await baseAxios
      .post( `${merchandisingApi.buyer.add_buyer}`, buyer )
      .then( response => {
        if ( response.status === status.success ) {
          dispatch( {
            type: ADD_BUYER,
            lastBuyerAdded: response.data.data,
            buyer
          } );
          notify( 'success', 'The buyer has been added Successfully!' );

        } else {
          notify( 'error', 'The buyer has been added Failed!' );
        }

      } )
      .then( () => {
        dispatch( getBuyerByQuery( getState().buyers.params ) );
      } )
      .catch( err => console.log( err ) );
  };
};

// ** Update Buyer
export const updateBuyer = buyer => {
  return ( dispatch, getState ) => {
    baseAxios
      .put( `${merchandisingApi.buyer.update_buyer}/${buyer.id}`, buyer )
      .then( response => {
        if ( response.status === status.success ) {
          dispatch( {
            type: UPDATE_BUYER,
            buyer
          } );
          notify( 'success', 'The buyer has been updated Successfully!' );

        } else {
          notify( 'error', 'The buyer has been updated Failed!' );

        }

      } )
      .then( () => {
        dispatch( getBuyerByQuery( getState().buyers.params ) );
        // dispatch( getAllBuyers() );
      } )
      .catch( err => console.log( err ) );

  };
};


export const addBuyerSpecificAgent = AssignAgent => {
  return ( dispatch, getState ) => {
    baseAxios
      .post( `${merchandisingApi.buyer.add_buyer_specific_agent}/${AssignAgent.id}/agents`, AssignAgent )
      .then( response => {
        if ( response.status === status.success ) {
          dispatch( {
            type: UPDATE_BUYER,
            AssignAgent
          } );
          notify( 'success', 'The buyer agent has been added Successfully!' );

        } else {
          notify( 'error', 'The buyer agent has been added Failed!' );
        }
      } )
      .then( () => {
        dispatch( getBuyerByQuery( getState().buyers.params ) );
        // dispatch( getAllBuyers() );
      } )
      .catch( err => console.log( err ) );
  };
};

export const addBuyerSpecificProductDeveloper = assignProductDeveloper => {
  return ( dispatch, getState ) => {
    baseAxios
      .post( `${merchandisingApi.buyer.add_buyer_specific_product_developer}/${assignProductDeveloper.id}/productDevelopers`, assignProductDeveloper )
      .then( response => {
        if ( response.status === status.success ) {
          dispatch( {
            type: UPDATE_BUYER,
            assignProductDeveloper
          } );
          notify( 'success', 'The product developer has been added Successfully!' );

        } else {
          notify( 'error', 'The product developer has been added Failed!' );
        }
      } )
      .then( () => {
        dispatch( getBuyerByQuery( getState().buyers.params ) );
        // dispatch( getAllBuyers() );
      } )
      .catch( err => console.log( err ) );
  };
};

// ** Delete Buyer
export const deleteBuyer = id => {

  return ( dispatch, getState ) => {
    confirmDialog( confirmObj ).then( async e => {
      if ( e.isConfirmed ) {
        await baseAxios
          .delete( `${merchandisingApi.buyer.delete_buyer}`, { id } )
          .then( response => {
            dispatch( {
              type: DELETE_BUYER
            } );
          } )
          .then( () => {
            notify( 'success', 'The Buyer has been deleted Successfully!' );
            dispatch( getBuyerByQuery( getState().buyers.params ) );
            dispatch( getAllBuyers() );
          } );
      }
    } );

  };

};


// ** Delete Buyer by Range
export const deleteRangeBuyer = ids => {
  return ( dispatch, getState ) => {
    confirmDialog( confirmObj ).then( e => {
      if ( e.isConfirmed ) {
        baseAxios
          .delete( `${merchandisingApi.buyer.delete_buyer_by_range}`, { ids } )
          .then( response => {
            dispatch( {
              type: DELETE_BUYERS_BY_RANGE
            } );
          } )
          .then( () => {
            notify( 'success', 'Buyers has been deleted Successfully!' );
            dispatch( getBuyerByQuery( getState().buyers.params ) );
            dispatch( getAllBuyers() );
          } );
      }
    } );

  };
};


// ** Open  Buyer Siderbar
export const handleOpenBuyerSidebar = ( condition ) => {
  return async dispatch => {
    await dispatch( {
      type: OPEN_BUYER_SIDEBER,
      openBuyerSidebar: condition
    } );
  };
};

export const handleAssignAgent = ( assignAgentObj ) => async dispatch => {
  if ( assignAgentObj ) {
    await baseAxios.get( `${merchandisingApi.buyer.get_buyer_specific_agent_by_id}/${assignAgentObj.buyerId}/agents` )
      .then( response => {
        const buyerAgents = response.data?.map( a => ( { value: a.id, label: a.name } ) );
        dispatch( {
          type: IS_ASSIGN_AGENT,
          assignAgentOpen: { ...assignAgentObj, buyerAgents }
        } );
      } );
  } else {
    dispatch( {
      type: IS_ASSIGN_AGENT,
      assignAgentOpen: assignAgentObj
    } );
  }


};

export const handleAssignProductDeveloper = ( assignProductDeveloperObj ) => async dispatch => {
  if ( assignProductDeveloperObj ) {
    await baseAxios.get( `${merchandisingApi.buyer.get_buyer_specific_product_developer_by_id}/${assignProductDeveloperObj.buyerId}/productDevelopers` )
      .then( response => {
        const buyerProductDevelopers = response.data?.map( a => ( { value: a.id, label: a.name } ) );
        dispatch( {
          type: IS_ASSIGN_PRODUCT_DEVELOPER,
          assignProductDeveloperOpen: { ...assignProductDeveloperObj, buyerProductDevelopers }
        } );
      } );
  } else {
    dispatch( {
      type: IS_ASSIGN_PRODUCT_DEVELOPER,
      assignProductDeveloperOpen: assignProductDeveloperObj
    } );
  }

};

