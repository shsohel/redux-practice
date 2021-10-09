import { store } from '@store/storeConfig/store';
import { selectThemeColors } from '@utils';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, PlusSquare, XSquare } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, CustomInput, Input, Label, Row, Spinner } from 'reactstrap';
import AssignAgentForm from '../form/AssignAgentForm';
import AssignProductDeveloperForm from '../form/AssignProductDeveloperForm';
import BuyerAddForm from '../form/BuyerAddForm';
import BuyerEditForm from '../form/BuyerEditForm';
import { deleteRangeBuyer, getBuyerByQuery, handleOpenBuyerSidebar } from '../store/actions';
import BuyerExpandRow from './BuyerExpandRow';
import { buyerTableColumn } from './BuyerTableColumns';


// ** Buyer Country filter options: Demo Array
const selectedCountry = [
    { value: '', label: 'Select Country', number: 0 },
    { value: 'united States', label: 'United States', number: 1 },
    { value: 'canada', label: 'Canada', number: 2 },
    { value: 'united Kingdom', label: 'United Kingdom', number: 3 },
    { value: 'australia', label: 'Australia', number: 3 }
];

// ** Buyer Status filter options: Demo Array
const statusOptions = [
    { value: '', label: 'Select Status', number: 0 },
    { value: true, label: 'Active', number: 1 },
    { value: false, label: 'Inactive', number: 2 }
];


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
const BuyerList = () => {
    const dispatch = useDispatch();
    // ** Global States
    const {
        buyers,
        total,
        selectedBuyer,
        openBuyerSidebar,
        queryData,
        assignAgentOpen,
        assignProductDeveloperOpen
    } = useSelector( ( { buyers } ) => buyers );
    // ** Local States
    const [searchTerm, setSearchTerm] = useState( '' );
    const [currentPage, setCurrentPage] = useState( 1 );
    const [rowsPerPage, setRowsPerPage] = useState( 10 );
    const [sortedBy, setSortedBy] = useState( 'asc' );
    const [sortedColumn, setSortedColumn] = useState( 'fullName' );
    const [currentCountry, setCurrentCountry] = useState( { value: '', label: 'Select Country', number: 0 } );

    const [currentStatus, setCurrentStatus] = useState( { value: '', label: 'Select Status', number: 0 } );
    const [selectedRowId, setSelectedRowId] = useState( [] );
    const [clearSelectedRow, setClearSelectedRow] = useState( false );
    // ** Global Function to toggle sidebar for Buyer
    const toggleSidebar = () => store.dispatch( handleOpenBuyerSidebar( !openBuyerSidebar ) );
    useEffect( () => {
        // dispatch( getAllBuyers() );
        dispatch(
            getBuyerByQuery( {
                page: currentPage,
                perPage: rowsPerPage
                // country: currentCountry.value,
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
            getBuyerByQuery( {
                page: page.selected + 1,
                perPage: rowsPerPage
                // country: currentCountry.value,
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
            getBuyerByQuery( {
                page: currentPage,
                perPage: value
                // country: currentCountry.value,
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
            getBuyerByQuery( {
                page: currentPage,
                perPage: rowsPerPage
                // country: currentCountry.value,
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
            getBuyerByQuery( {
                page: currentPage,
                perPage: rowsPerPage
                // country: currentCountry.value,
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
            country: currentCountry.value,
            q: searchTerm
        };

        const isFiltered = Object.keys( filters ).some( function ( k ) {
            return filters[k].length > 0;
        } );


        if ( queryData?.length > 0 ) {
            return queryData;
        } else if ( queryData?.length === 0 && isFiltered ) {
            return [];
        } else {
            return buyers.slice( 0, rowsPerPage );
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
            getBuyerByQuery( {
                page: currentPage,
                perPage: rowsPerPage
                // country: currentCountry.value,
                // status: currentStatus.value,
                // q: searchTerm,
                // sortedBy,
                // sortedColumn
            } )
        );
    };

    // ** Delete Rang
    const handleDeleteBuyerRange = () => {
        dispatch( deleteRangeBuyer( selectedRowId ) );
        setSelectedRowId( [] );
        handleClearSelected();
    };
    // ** End For Multiple Select and Delete Range


    return (
        <div className="buyer-list-wrapper">
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Search Filter</CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md='4'>
                            <Select
                                isClearable={false}
                                theme={selectThemeColors}
                                className='react-select  mt-50'
                                classNamePrefix='select'
                                options={selectedCountry}
                                value={currentCountry}
                                onChange={data => {
                                    setCurrentCountry( data );
                                    dispatch(
                                        getBuyerByQuery( {
                                            page: currentPage,
                                            perPage: rowsPerPage
                                            // country: data.value,
                                            // status: currentStatus.value,
                                            // q: searchTerm,
                                            // sortedBy,
                                            // sortedColumn
                                        } )
                                    );
                                }}
                            />
                        </Col>

                        <Col md='4'>
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
                                        getBuyerByQuery( {
                                            page: currentPage,
                                            perPage: rowsPerPage
                                            // country: currentCountry.value,
                                            // status: data.value,
                                            // q: searchTerm,
                                            // sortedBy,
                                            // sortedColumn
                                        } )
                                    );
                                }}
                            />
                        </Col>
                        <Col md='4'>
                            <Input
                                id='search-buyer'
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
                        <CardTitle tag='h2'>Buyers</CardTitle>
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
                        progressPending={queryData === []}
                        progressComponent={<Spinner />}
                        // contextMessage={}
                        contextActions={<Button.Ripple onClick={() => { handleDeleteBuyerRange(); }} className='btn-icon ' color='flat-danger'>
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
                        expandableRowsComponent={<BuyerExpandRow data={data => data} />}
                        expandOnRowClicked
                        columns={buyerTableColumn}
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
                selectedBuyer !== null ? < BuyerEditForm data={selectedBuyer} open={openBuyerSidebar} toggleSidebar={toggleSidebar} /> : <BuyerAddForm open={openBuyerSidebar} toggleSidebar={toggleSidebar} />
            }
            {
                assignAgentOpen ? <AssignAgentForm data={assignAgentOpen} open={assignAgentOpen.isAgentAssign} /> : assignProductDeveloperOpen ? <AssignProductDeveloperForm data={assignProductDeveloperOpen} open={assignProductDeveloperOpen.isProductDeveloperAssign} /> : null
            }

        </div>
    );
};

export default BuyerList;
