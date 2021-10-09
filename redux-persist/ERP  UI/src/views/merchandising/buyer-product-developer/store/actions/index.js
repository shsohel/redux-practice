import { notify } from "@custom/notifications";
import { baseAxios } from "@services";
// import { axios } from "@services";
import { merchandisingApi } from "../../../../../services/api-end-points/merchandising";
import { confirmDialog } from "../../../../../utility/custom/ConfirmDialog";
import { confirmObj, status } from "../../../../../utility/enums";
import { convertQueryString } from "../../../../../utility/Utils";
import { ADD_BUYER_PRODUCT_DEVELOPER, DELETE_BUYER_PRODUCT_DEVELOPER, DELETE_BUYER_PRODUCT_DEVELOPER_BY_RANGE, DROP_DOWN_BUYER_PRODUCT_DEVELOPERS, GET_BUYER_PRODUCT_DEVELOPERS, GET_BUYER_PRODUCT_DEVELOPERS_BY_QUERY, GET_BUYER_PRODUCT_DEVELOPER_BY_ID, OPEN_BUYER_PRODUCT_DEVELOPER_SIDEBAR, SELECTED_BUYER_PRODUCT_DEVELOPER_NULL, UPDATE_BUYER_PRODUCT_DEVELOPER } from "../actionTypes";

///Get All without Query
export const getAllBuyerProductDevelopers = () => {
    return async ( dispatch ) => {
        await baseAxios
            .get( `${merchandisingApi.productDeveloper.get_product_developers}` )
            .then( ( response ) => {
                dispatch( {
                    type: GET_BUYER_PRODUCT_DEVELOPERS,
                    productDevelopers: response.data
                } );
            } );
    };
};


///Get All DropDown Product Developer without query
export const getDropDownBuyerProductDevelopers = () => {
    return async ( dispatch ) => {
        await baseAxios
            .get( `${merchandisingApi.productDeveloper.get_product_developers_dropdown}` )
            .then( ( response ) => {
                dispatch( {
                    type: DROP_DOWN_BUYER_PRODUCT_DEVELOPERS,
                    dropDownProductDevelopers: response.data.data.map( ( item ) => ( {
                        value: item.id,
                        label: item.name
                    } ) )
                } );
            } );
    };
};
//Cascade
export const getCascadeDropDownBuyerProductDevelopers = ( id ) => {
    return async ( dispatch ) => {
        await baseAxios
            .get( `${merchandisingApi.productDeveloper.get_product_developers_cascade_dropdown}/${id}/productDevelopers` )
            .then( ( response ) => {
                dispatch( {
                    type: DROP_DOWN_BUYER_PRODUCT_DEVELOPERS,
                    dropDownProductDevelopers: response.data.map( ( item ) => ( {
                        value: item.id,
                        label: item.name
                    } ) )
                } );
            } );
    };
};

//Get Data by Query
export const getBuyerProductDeveloperByQuery = ( params ) => {
    return async ( dispatch ) => {
        await baseAxios
            .get( `${merchandisingApi.productDeveloper.get_product_developers_by_query}?${convertQueryString( params )}`, params )
            .then( ( { data } ) => {
                if ( data.succeeded ) {
                    dispatch( {
                        type: GET_BUYER_PRODUCT_DEVELOPERS_BY_QUERY,
                        productDevelopers: data.data,
                        totalPages: data.totalRecords,
                        params
                    } );
                } else {
                    notify( "error", "Something gonna Wrong!" );

                }

            } );
    };
};

//Get Product Developer By ID
export const getBuyerProductDeveloperById = ( id ) => {
    return async ( dispatch ) => {
        await baseAxios
            .get( `${merchandisingApi.productDeveloper.get_product_developer_by_id}`, { id } )
            .then( ( response ) => {
                dispatch( {
                    type: GET_BUYER_PRODUCT_DEVELOPER_BY_ID,
                    selectedProductDeveloper: response.data ? response.data : null
                } );
            } )
            .catch( ( err ) => console.log( err ) );
    };
};

///Selected Product Developer Null after Edit or Cancel
export const selectedBuyerProductDeveloperNull = () => {
    return async ( dispatch ) => {
        await dispatch( {
            type: SELECTED_BUYER_PRODUCT_DEVELOPER_NULL,
            selectedProductDeveloper: null
        } );
    };
};

// Add new Product Developer
export const addBuyerProductDeveloper = ( productDeveloper ) => {
    return async ( dispatch, getState ) => {
        await baseAxios
            .post( `${merchandisingApi.productDeveloper.add_product_developer}`, productDeveloper )
            .then( ( response ) => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: ADD_BUYER_PRODUCT_DEVELOPER,
                        productDeveloper
                    } );
                    notify( "success", "The Product Developer has been added Successfully!" );
                } else {
                    notify( "error", "The Product Developer has been added Successfully!" );
                }

            } )
            .then( () => {

                dispatch( getBuyerProductDeveloperByQuery( getState().productDevelopers.params ) );
                //dispatch( getAllBuyerProductDevelopers() );
            } )
            .catch( ( err ) => console.log( err ) );
    };
};

// ** Update BuyerAgent
export const updateBuyerProductDeveloper = ( productDeveloper ) => {
    return ( dispatch, getState ) => {
        baseAxios
            .put( `${merchandisingApi.productDeveloper.update_product_developer}`, { productDeveloper } )
            .then( ( response ) => {
                dispatch( {
                    type: UPDATE_BUYER_PRODUCT_DEVELOPER,
                    productDeveloper
                } );
            } )
            .then( () => {
                notify( "success", "The Product Developer has been updated Successfully!" );
                dispatch( getBuyerProductDeveloperByQuery( getState().productDevelopers.params ) );
                dispatch( getAllBuyerProductDevelopers() );
            } )
            .catch( ( err ) => console.log( err ) );
    };
};

//Delete BuyerAgent
export const deleteBuyerProductDeveloper = ( id ) => {
    return ( dispatch, getState ) => {

        confirmDialog( confirmObj ).then( async e => {
            if ( e.isConfirmed ) {
                await baseAxios
                    .delete( `${merchandisingApi.productDeveloper.delete_product_developer}`, { id } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_BUYER_PRODUCT_DEVELOPER
                        } );
                    } )
                    .then( () => {
                        notify( "success", "The Product Developer has been updated Successfully!" );
                        dispatch( getBuyerProductDeveloperByQuery( getState().productDevelopers.params ) );
                        dispatch( getAllBuyerProductDevelopers() );
                    } );
            }
        } );

    };
};

//Delete Product Developer by Range
export const deleteRangeBuyerProductDeveloper = ( ids ) => {
    return ( dispatch, getState ) => {

        confirmDialog( confirmObj ).then( e => {
            if ( e.isConfirmed ) {
                baseAxios
                    .delete( `${merchandisingApi.productDeveloper.delete_product_developer_by_range}`, { ids } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_BUYER_PRODUCT_DEVELOPER_BY_RANGE
                        } );
                    } )
                    .then( () => {
                        notify( "success", "The Product Developer has been deleted Successfully!" );
                        dispatch( getBuyerProductDeveloperByQuery( getState().productDevelopers.params ) );
                        dispatch( getAllBuyerProductDevelopers() );
                    } );
            }
        } );

    };
};

//Open Product Developer Sidebar
export const handleOpenBuyerProductDeveloperSidebar = ( condition ) => {
    return async ( dispatch ) => {
        await dispatch( {
            type: OPEN_BUYER_PRODUCT_DEVELOPER_SIDEBAR,
            openProductDeveloperSidebar: condition
        } );
    };
};