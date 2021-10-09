import { ADD_BUYER, DELETE_BUYER, DELETE_BUYERS_BY_RANGE, DROP_DOWN_BUYERS, GET_BUYERS, GET_BUYERS_BY_QUERY, GET_BUYER_BY_ID, IS_ASSIGN_AGENT, IS_ASSIGN_PRODUCT_DEVELOPER, OPEN_BUYER_SIDEBER, SELECTED_BUYER_NULL, UPDATE_BUYER } from "../actionTypes";


const initialState = {
  buyers: [],
  queryData: [],
  total: 1,
  params: {},
  selectedBuyer: null,
  openBuyerSidebar: false,
  dropDownBuyers: [],
  assignAgentOpen: null,
  assignProductDeveloperOpen: null
};

const buyerReduces = ( state = initialState, action ) => {
  switch ( action.type ) {
    case DROP_DOWN_BUYERS:
      return { ...state, dropDownBuyers: action.dropDownBuyers };
    case GET_BUYERS:
      return { ...state, buyers: action.buyers };
    case GET_BUYER_BY_ID:
      return { ...state, selectedBuyer: action.selectedBuyer };
    case SELECTED_BUYER_NULL:
      return { ...state, selectedBuyer: action.selectedBuyer };
    case OPEN_BUYER_SIDEBER:
      return { ...state, openBuyerSidebar: action.openBuyerSidebar };
    case IS_ASSIGN_AGENT:
      return { ...state, assignAgentOpen: action.assignAgentOpen };
    case IS_ASSIGN_PRODUCT_DEVELOPER:
      return { ...state, assignProductDeveloperOpen: action.assignProductDeveloperOpen };
    case GET_BUYERS_BY_QUERY:
      return {
        ...state,
        queryData: action.buyers,
        total: action.totalPages,
        params: action.params
      };
    case ADD_BUYER:
      return { ...state };
    case UPDATE_BUYER:
      return { ...state };
    case DELETE_BUYER:
      return { ...state };
    case DELETE_BUYERS_BY_RANGE:
      return { ...state };
    default:
      return state;
  }


};

export default buyerReduces;