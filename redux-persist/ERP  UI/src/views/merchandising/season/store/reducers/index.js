import { ADD_SEASON, DELETE_SEASON, DELETE_SEASONS_BY_RANGE, DROP_DOWN_SEASONS, GET_SEASONS, GET_SEASONS_BY_QUERY, GET_SEASON_BY_ID, OPEN_SEASON_SIDEBAR, SELECTED_SEASON_NULL, UPDATE_SEASON } from '../actionTypes';

const initialState = {
    seasons: [],
    queryData: [],
    total: 1,
    params: {},
    selectedSeason: null,
    openSeasonSidebar: false,
    dropDownSeasons: []
};


const seasonsReduces = ( state = initialState, action ) => {
    switch ( action.type ) {
        case GET_SEASONS:
            return { ...state, seasons: action.seasons };
        case GET_SEASON_BY_ID:
            return { ...state, selectedSeason: action.selectedSeason };
        case SELECTED_SEASON_NULL:
            return { ...state, selectedSeason: action.selectedSeason };
        case OPEN_SEASON_SIDEBAR:
            return { ...state, openSeasonSidebar: action.openSeasonSidebar };
        case DROP_DOWN_SEASONS:
            return { ...state, dropDownSeasons: action.dropDownSeasons };
        case GET_SEASONS_BY_QUERY:
            return {
                ...state,
                queryData: action.seasons,
                total: action.totalPages,
                params: action.params
            };
        case ADD_SEASON:
            return { ...state };
        case UPDATE_SEASON:
            return { ...state };
        case DELETE_SEASON:
            return { ...state };
        case DELETE_SEASONS_BY_RANGE:
            return { ...state };
        default:
            return state;
    }
};
export default seasonsReduces;
