import { notify } from "@custom/notifications";
import { baseAxios } from "@services";
import { merchandisingApi } from '@services/api-end-points/merchandising';
import { confirmDialog } from "../../../../../utility/custom/ConfirmDialog";
import { confirmObj, status } from "../../../../../utility/enums";
import { convertQueryString } from "../../../../../utility/Utils";
// import { merchandisingApi } from '../../../../../services/api-end-points/merchandising';
import { ADD_SEASON, DELETE_SEASON, DELETE_SEASONS_BY_RANGE, DROP_DOWN_SEASONS, GET_SEASONS, GET_SEASONS_BY_QUERY, GET_SEASON_BY_ID, OPEN_SEASON_SIDEBAR, SELECTED_SEASON_NULL, UPDATE_SEASON } from '../actionTypes';


//Get All Season without Query
export const getAllSeasons = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.season.get_seasons}` ).then( response => {
            dispatch( {
                type: GET_SEASONS,
                seasons: response.data
            } );
        } );
    };
};


/// Get All Season Without Query
export const getDropDownSeasons = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.season.get_seasons_dropdown}` ).then( response => {
            dispatch( {
                type: DROP_DOWN_SEASONS,
                dropDownSeasons: response.data.data.map( item => ( { value: item.id, label: item.name } ) )
            } );
        } );
    };
};


//Get Data by Query 
export const getSeasonByQuery = params => {

    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.season.get_seasons_by_query}?${convertQueryString( params )}`, params ).then( ( { data } ) => {
            if ( data.succeeded ) {
                dispatch( {
                    type: GET_SEASONS_BY_QUERY,
                    seasons: data.data,
                    totalPages: data.totalRecords,
                    params
                } );
            } else {
                notify( "error", "Something gonna Wrong!" );

            }

        } ).catch( e => {
            notify( 'warning', 'Server Side ERROR' );

        } );
    };
};


// ** Get Season by Id
export const getSeasonById = id => {
    return async dispatch => {
        await baseAxios
            .get( `${merchandisingApi.season.get_season_by_id}/${id}` )
            .then( ( response ) => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: GET_SEASON_BY_ID,
                        selectedSeason: response.data ? response.data : null
                    } );
                } else {
                    notify( 'error', `'The Season couldn't find'` );
                }
            } )
            .catch( err => console.log( err ) );
    };
};


/// Selected Season Null after Edit or Edit Cancel
export const selectedSeasonNull = () => {
    return async dispatch => {
        await dispatch( {
            type: SELECTED_SEASON_NULL,
            selectedSeason: null
        } );
    };
};


// ** Add new Season
export const addSeason = season => {
    return async ( dispatch, getState ) => {
        await baseAxios
            .post( `${merchandisingApi.season.add_season}`, season )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: ADD_SEASON,
                        season
                    } );
                    notify( 'success', 'The Season has been added Successfully!' );
                } else {
                    notify( 'error', 'The Season has been added Failed!' );
                }

            } )
            .then( () => {

                dispatch( getSeasonByQuery( getState().seasons.params ) );
                //dispatch( getAllSeasons() );
            } )
            .catch( err => console.log( err ) );
    };
};


// ** Update Season
export const updateSeason = season => {
    return ( dispatch, getState ) => {
        baseAxios
            .put( `${merchandisingApi.season.update_season}/${season.id}`, season )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: UPDATE_SEASON,
                        season
                    } );
                    notify( 'success', 'The Season has been updated Successfully!' );
                } else {
                    notify( 'error', 'The Season has been updated Failed!' );
                }

            } )
            .then( () => {

                dispatch( getSeasonByQuery( getState().seasons.params ) );
                //dispatch( getAllSeasons() );
            } )
            .catch( err => console.log( err ) );

    };
};

// ** Delete Season
export const deleteSeason = id => {
    return ( dispatch, getState ) => {
        confirmDialog( confirmObj ).then( async e => {
            if ( e.isConfirmed ) {
                baseAxios
                    .delete( `${merchandisingApi.season.delete_season}`, { id } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_SEASON
                        } );
                    } )
                    .then( () => {
                        notify( 'success', 'The Season has been deleted Successfully!' );
                        dispatch( getSeasonByQuery( getState().seasons.params ) );
                        dispatch( getAllSeasons() );
                    } );
            }
        } );
    };
};


// ** Delete Season by Range
export const deleteRangeSeason = ids => {
    return ( dispatch, getState ) => {
        confirmDialog( confirmObj ).then( e => {
            if ( e.isConfirmed ) {
                baseAxios
                    .delete( `${merchandisingApi.season.delete_season_by_range}`, { ids } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_SEASONS_BY_RANGE
                        } );
                    } )
                    .then( () => {
                        notify( 'success', 'Season has been deleted Successfully!' );
                        dispatch( getSeasonByQuery( getState().seasons.params ) );
                        dispatch( getAllSeasons() );
                    } );
            }
        } );
    };
};


// ** Open  Season Sidebar
export const handleOpenSeasonSidebar = ( condition ) => {
    return async dispatch => {
        await dispatch( {
            type: OPEN_SEASON_SIDEBAR,
            openSeasonSidebar: condition
        } );
    };
};