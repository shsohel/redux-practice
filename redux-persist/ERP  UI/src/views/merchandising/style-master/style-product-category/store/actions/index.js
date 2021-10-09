import { notify } from "@custom/notifications";
import { baseAxios } from "@services";
import { merchandisingApi } from '../../../../../../services/api-end-points/merchandising';
import { confirmDialog } from "../../../../../../utility/custom/ConfirmDialog";
import { status } from "../../../../../../utility/enums";
import { convertQueryString } from "../../../../../../utility/Utils";
import { ADD_PRODUCT_CATEGORY, DELETE_PRODUCT_CATEGORY, DELETE_PRODUCT_CATEGORY_BY_RANGE, DELETE_STYLE_CATEGORY_FROM_PRODUCT_CATEGORY, DROP_DOWN_PRODUCT_CATEGORIES, GET_PRODUCT_CATEGORIES, GET_PRODUCT_CATEGORIES_BY_QUERY, GET_PRODUCT_CATEGORY_BY_ID, OPEN_PRODUCT_CATEGORY_SIDEBAR, SELECTED_PRODUCT_CATEGORY_NULL, UPDATE_PRODUCT_CATEGORY } from '../actionTypes';


const confirmObj = {
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    confirmButtonText: 'Yes !',
    cancelButtonText: 'No'
};

///Get All Product Category Without Query
export const getAllProductCategory = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.productCategory.get_product_categories}` ).then( response => {
            dispatch( {
                type: GET_PRODUCT_CATEGORIES,
                productCategories: response.data
            } );
        } );
    };
};

/// Get All Product Category Without Query
export const getDropDownProductCategories = () => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.productCategory.get_product_categories_dropdown}` ).then( response => {
            console.log( response.data );
            dispatch( {
                type: DROP_DOWN_PRODUCT_CATEGORIES,
                dropDownProductCategories: response?.data?.data?.map( item => ( { value: item.id, label: item.name } ) )
            } );
        } );
    };
};

export const getCascadeDropDownProductCategories = ( id ) => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.productCategory.get_product_categories_cascade_dropdown}/${id}/productCategories` ).then( response => {
            dispatch( {
                type: DROP_DOWN_PRODUCT_CATEGORIES,
                dropDownProductCategories: response?.data?.map( item => ( { value: item.id, label: item.name } ) )
            } );
        } );
    };
};

//Get Data by Query 
export const getProductCategoryByQuery = params => {
    return async dispatch => {
        await baseAxios.get( `${merchandisingApi.productCategory.get_product_categories_by_query}?${convertQueryString( params )}`, params ).then( ( { data } ) => {
            if ( data.succeeded ) {
                dispatch( {
                    type: GET_PRODUCT_CATEGORIES_BY_QUERY,
                    productCategories: data.data,
                    totalPages: data.totalRecords,
                    params
                } );
            } else {
                notify( "error", "Something gonna Wrong!" );

            }

        } );
    };
};

// ** Get Product Category by Id
export const getProductCategoryById = id => {
    return async dispatch => {
        await baseAxios
            .get( `${merchandisingApi.productCategory.get_product_category_by_id}/${id}` )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: GET_PRODUCT_CATEGORY_BY_ID,
                        selectedProductCategory: response.data ? response.data : null
                    } );
                } else {
                    notify( 'error', `'The Style Product Category couldn't find'` );

                }

            } )
            .catch( err => console.log( err ) );
    };
};

/// Selected Product Category Null after Edit or Edit Cancel
export const selectedProductCategoryNull = () => {
    return async dispatch => {
        await dispatch( {
            type: SELECTED_PRODUCT_CATEGORY_NULL,
            selectedProductCategory: null
        } );
    };
};

// ** Add new Product Category
export const addProductCategory = productCategory => {
    return async ( dispatch, getState ) => {
        await baseAxios
            .post( `${merchandisingApi.productCategory.add_product_category}`, productCategory )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: ADD_PRODUCT_CATEGORY,
                        lastCreatedId: response.data,
                        productCategory
                    } );
                    notify( 'success', 'The Product Category has been added Successfully!' );
                } else {
                    notify( 'error', 'The Product Category has been added Failed!' );
                }

            } )
            .then( () => {

                dispatch( getProductCategoryByQuery( getState().productCategories.params ) );
                // dispatch( getAllProductCategory() );
            } )
            .catch( err => console.log( err ) );
    };
};

// ** Update Product Category
export const updateProductCategory = productCategory => {
    return ( dispatch, getState ) => {
        baseAxios
            .put( `${merchandisingApi.productCategory.update_product_category}/${productCategory.id}`, productCategory )
            .then( response => {
                if ( response.status === status.success ) {
                    dispatch( {
                        type: UPDATE_PRODUCT_CATEGORY,
                        productCategory
                    } );
                    notify( 'success', 'The Product Category has been updated Successfully!' );
                } else {
                    notify( 'error', 'The Product Category has been updated Failed!' );
                }


            } )
            .then( () => {

                dispatch( getProductCategoryByQuery( getState().productCategories.params ) );
                // dispatch( getAllProductCategory() );
            } )
            .catch( err => console.log( err ) );

    };
};

// ** Delete Product Category
export const deleteProductCategory = id => {
    return ( dispatch, getState ) => {
        confirmDialog( confirmObj ).then( async e => {
            if ( e.isConfirmed ) {
                await baseAxios
                    .delete( `${merchandisingApi.productCategory.delete_product_category}`, { id } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_PRODUCT_CATEGORY
                        } );
                    } )
                    .then( () => {
                        notify( 'success', 'The Product Category has been deleted Successfully!' );
                        dispatch( getProductCategoryByQuery( getState().productCategories.params ) );
                        dispatch( getAllProductCategory() );
                    } );
            }
        } );
    };
};

// ** Delete Product Category by Range
export const deleteRangeProductCategory = ids => {
    return ( dispatch, getState ) => {
        confirmDialog( confirmObj ).then( e => {
            if ( e.isConfirmed ) {
                baseAxios
                    .delete( `${merchandisingApi.productCategory.delete_product_category_by_range}`, { ids } )
                    .then( response => {
                        dispatch( {
                            type: DELETE_PRODUCT_CATEGORY_BY_RANGE
                        } );
                    } )
                    .then( () => {
                        notify( 'success', 'Product Category has been deleted Successfully!' );
                        dispatch( getProductCategoryByQuery( getState().productCategories.params ) );
                        dispatch( getAllProductCategory() );
                    } );
            }
        } );
    };
};

// /api/merchandising/styles/styleDepartments/{id}/productCategories{styleCategoryId}
// ** Delete Style Category From Product Category
export const deleteStyleCategoryFromProductCategory = ( id, styleCategoryId ) => {
    return ( dispatch, getState ) => {
        confirmDialog( confirmObj ).then( async e => {
            if ( e.isConfirmed ) {
                await baseAxios
                    .delete( `${merchandisingApi.productCategory.delete_style_category_from_product_category}/${id}/styleCategory/${styleCategoryId}` )
                    .then( response => {
                        console.log( response );
                        dispatch( {
                            type: DELETE_STYLE_CATEGORY_FROM_PRODUCT_CATEGORY
                        } );
                    } )
                    .then( () => {
                        notify( 'success', 'The Style Category has been deleted Successfully!' );
                        dispatch( getProductCategoryByQuery( getState().productCategories.params ) );
                        dispatch( getAllProductCategory() );
                    } );
            }
        } );
    };
};
// ** Open  Product Category Sidebar
export const handleOpenProductCategorySidebar = ( condition ) => {
    return async dispatch => {
        await dispatch( {
            type: OPEN_PRODUCT_CATEGORY_SIDEBAR,
            openProductCategorySidebar: condition
        } );
    };
};