import {
    ADD_BUYER_AGENT, DELETE_BUYER_AGENT, DELETE_BUYER_AGENT_BY_RANGE, DROP_DOWN_BUYER_AGENTS, GET_BUYER_AGENTS, GET_BUYER_AGENTS_BY_QUERY, GET_BUYER_AGENT_BY_ID, OPEN_BUYER_AGENT_SIDEBAR, SELECTED_BUYER_AGENT_NULL, UPDATE_BUYER_AGENT
} from "../actionTypes";

const initialState = {
    buyerAgents: [],
    queryData: [],
    total: 1,
    params: {},
    selectedBuyerAgent: null,
    openBuyerAgentSidebar: false,
    dropDownBuyerAgents: null
};

const buyerAgentReduces = ( state = initialState, action ) => {
    switch ( action.type ) {
        case GET_BUYER_AGENTS:
            return { ...state, buyerAgents: action.buyerAgents };
        case GET_BUYER_AGENT_BY_ID:
            return { ...state, selectedBuyerAgent: action.selectedBuyerAgent };
        case SELECTED_BUYER_AGENT_NULL:
            return { ...state, selectedBuyerAgent: action.selectedBuyerAgent };
        case OPEN_BUYER_AGENT_SIDEBAR:
            return { ...state, openBuyerAgentSidebar: action.openBuyerAgentSidebar };
        case DROP_DOWN_BUYER_AGENTS:
            return { ...state, dropDownBuyerAgents: action.dropDownBuyerAgents };
        case GET_BUYER_AGENTS_BY_QUERY:
            return {
                ...state,
                queryData: action.buyerAgents,
                total: action.totalPages,
                params: action.params
            };
        case ADD_BUYER_AGENT:
            return { ...state };
        case UPDATE_BUYER_AGENT:
            return { ...state };
        case DELETE_BUYER_AGENT:
            return { ...state };
        case DELETE_BUYER_AGENT_BY_RANGE:
            return { ...state };
        default:
            return state;
    }
};
export default buyerAgentReduces;
