import { store } from '@store/storeConfig/store';
import { selectThemeColors } from '@utils';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, PlusSquare, XSquare } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import { Button, Col, CustomInput, Input, Label, Row } from "reactstrap";
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardTitle from 'reactstrap/lib/CardTitle';
import StyleProductCategoryAddForm from '../form/StyleProductCategoryAddForm';
import StyleProductCategoryEditForm from '../form/StyleProductCategoryEditForm';
import { deleteRangeProductCategory, getProductCategoryByQuery, handleOpenProductCategorySidebar } from '../store/actions';
import StyleProductCategoryExpandRow from './StyleProductCategoryExpandRow';
import { ProductCategoryTableColumns } from './StyleProductCategoryTableColumn';

// ** Table Sub Header
const CustomHeader = ( { handlePerPage, rowsPerPage, toggleSidebar } ) => {
    return (
        <Row className='mx-0'>
            <Col className='d-flex align-items-center mt-1 ml-lg-1'>
                <Label for='rows-per-page'>Show</Label>
                <CustomInput
                    className='form-control mx-50'
                    type='select'
                    id='rows-per-page'
                    value={rowsPerPage}
                    onChange={handlePerPage}
                    style={{
                        width: '5rem',
                        padding: '0 0.8rem',
                        backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                    }}
                >
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                </CustomInput>
                <Label for='rows-per-page'>Entries</Label>

            </Col>
            <Col className="d-flex align-items-end justify-content-end justify-content-xs-start m-xs-0 ">
                <Button.Ripple onClick={() => { toggleSidebar(); }} className='btn-icon' color='flat-success'>
                    <PlusSquare size={24} />
                </Button.Ripple>
            </Col>
        </Row>

    );
};

// ** Product Category Status filter options: Demo Array
const statusOptions = [
    { value: '', label: 'Select Status', number: 0 },
    { value: true, label: 'Active', number: 1 },
    { value: false, label: 'Inactive', number: 2 }
];

const StyleProductCategoryList = () => {

    const dispatch = useDispatch();
    // ** Global States
    const { productCategories, total, selectedProductCategory, openProductCategorySidebar, queryData } = useSelector( ( { productCategories } ) => productCategories );

    // ** Division States
    const [searchTerm, setSearchTerm] = useState( '' );
    const [currentPage, setCurrentPage] = useState( 1 );
    const [rowsPerPage, setRowsPerPage] = useState( 10 );
    const [sortedBy, setSortedBy] = useState( 'asc' );

    const [sortedColumn, setSortedColumn] = useState( 'name' );
    const [currentStatus, setCurrentStatus] = useState( { value: '', label: 'Select Status', number: 0 } );
    const [selectedRowId, setSelectedRowId] = useState( [] );
    const [clearSelectedRow, setClearSelectedRow] = useState( false );

    // ** Global Function to toggle sidebar for Division
    const toggleSidebar = () => store.dispatch( handleOpenProductCategorySidebar( !openProductCategorySidebar ) );

    //#Hooks
    useEffect( () => {
        dispatch(
            getProductCategoryByQuery( {
                page: currentPage,
                perPage: rowsPerPage
                // status: currentStatus.value,
                // q: searchTerm,
                // sortedBy,
                // sortedColumn
            } )
        );
    }, [dispatch, queryData?.length] );

    // ** Function in get data on page change
    const handlePagination = page => {
        dispatch(
            getProductCategoryByQuery( {
                page: page.selected + 1,
                perPage: rowsPerPage
                // status: currentStatus.value,
                // q: searchTerm,
                // sortedBy,
                // sortedColumn
            } )
        );
        setCurrentPage( page.selected + 1 );
    };

    // ** Function in get data on rows per page
    const handlePerPage = e => {
        const value = parseInt( e.currentTarget.value );
        dispatch(
            getProductCategoryByQuery( {
                page: currentPage,
                perPage: value
                // status: currentStatus.value,
                // q: searchTerm,
                // sortedBy,
                // sortedColumn
            } )
        );
        setRowsPerPage( value );
    };

    // ** Function in get data on search query change
    const handleFilter = val => {
        setSearchTerm( val );
        dispatch(
            getProductCategoryByQuery( {
                page: currentPage,
                perPage: rowsPerPage
                // status: currentStatus.value,
                // q: val,
                // sortedBy,
                // sortedColumn
            } )
        );
    };

    const handleSort = ( column, direction ) => {
        const { selector } = column;
        setSortedBy( direction );
        setSortedColumn( selector );
        dispatch(
            getProductCategoryByQuery( {
                page: currentPage,
                perPage: rowsPerPage
                // status: currentStatus.value,
                // q: searchTerm,
                // sortedBy: direction,
                // sortedColumn: selector
            } )
        );
    };


    // ** Custom Pagination
    const CustomPagination = () => {
        const count = Number( Math.ceil( total / rowsPerPage ) );

        return (
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                pageCount={count || 1}
                activeClassName='active'
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                onPageChange={page => handlePagination( page )}
                pageClassName={'page-item'}
                nextLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousClassName={'page-item prev'}
                previousLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
            />
        );
    };


    // ** Table data to render
    const dataToRender = () => {
        const filters = {
            status: currentStatus.value,
            q: searchTerm
        };

        const isFiltered = Object.keys( filters ).some( function ( k ) {
            return filters[k].length > 0;
        } );


        if ( queryData.length > 0 ) {
            return queryData;
        } else if ( queryData.length === 0 && isFiltered ) {
            return [];
        } else {
            return productCategories.slice( 0, rowsPerPage );
        }
    };


    // ** Start For Multiple Rows for Get IDs
    const handleRowSelected = ( rows ) => {
        const rowsId = rows.selectedRows.map( item => item.id );
        setSelectedRowId( rowsId );
        setClearSelectedRow( false );
    };

    // **Clear Delete Ids
    const handleClearSelected = () => {
        setClearSelectedRow( true );
        dispatch(
            getProductCategoryByQuery( {
                page: currentPage,
                perPage: rowsPerPage
                // status: currentStatus.value,
                // q: searchTerm,
                // sortedBy,
                // sortedColumn
            } )
        );
    };

    // ** Delete Rang
    const handleDeleteProductCategoryRange = () => {
        dispatch( deleteRangeProductCategory( selectedRowId ) );
        setSelectedRowId( [] );
        handleClearSelected();
    };
    // ** End For Multiple Select and Delete Range


    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Search Filter</CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>


                        <Col md='6'>
                            <Select
                                theme={selectThemeColors}
                                isClearable={false}
                                className='react-select  mt-50'
                                classNamePrefix='select'
                                options={statusOptions}
                                value={currentStatus}

                                onChange={data => {
                                    setCurrentStatus( data );
                                    dispatch(
                                        getProductCategoryByQuery( {
                                            page: currentPage,
                                            perPage: rowsPerPage
                                            // status: data.value,
                                            // q: searchTerm,
                                            // sortedBy,
                                            // sortedColumn
                                        } )
                                    );
                                }}
                            />
                        </Col>

                        <Col md='6'>
                            <Input
                                id='search-buyer-agent'
                                className='w-100 mt-50'
                                placeholder='Search'
                                type='text'
                                value={searchTerm}
                                onChange={e => handleFilter( e.target.value )}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <Card>
                <div >
                    <CardHeader>
                        <CardTitle tag='h2'>Style Product Category</CardTitle>
                    </CardHeader>
                    <CustomHeader
                        toggleSidebar={toggleSidebar}
                        handlePerPage={handlePerPage}
                        rowsPerPage={rowsPerPage}
                        searchTerm={searchTerm}
                    />

                    <DataTable
                        onSelectedRowsChange={handleRowSelected}
                        onSort={handleSort}
                        // contextMessage={}
                        contextActions={<Button.Ripple onClick={() => { handleDeleteProductCategoryRange(); }} className='btn-icon ' color='flat-danger'>
                            <XSquare size={24} />
                        </Button.Ripple>}
                        dense
                        subHeader={false}
                        highlightOnHover
                        selectableRows
                        clearSelectedRows={clearSelectedRow}
                        responsive={true}
                        paginationServer
                        expandableRows
                        expandableRowsComponent={<StyleProductCategoryExpandRow data={data => data} />}
                        expandOnRowClicked
                        columns={ProductCategoryTableColumns}
                        sortIcon={<ChevronDown />}
                        className='react-dataTable'
                        data={dataToRender()}
                    />
                </div>
                <div>
                    <CustomPagination />
                </div>


            </Card>
            {/* Open Sidebar for Edit and Add */}

            {
                selectedProductCategory !== null && openProductCategorySidebar ? < StyleProductCategoryEditForm data={selectedProductCategory} open={openProductCategorySidebar} toggleSidebar={toggleSidebar} /> : openProductCategorySidebar ? <StyleProductCategoryAddForm open={openProductCategorySidebar} toggleSidebar={toggleSidebar} /> : null
            }
        </div>
    );
};

export default StyleProductCategoryList;
