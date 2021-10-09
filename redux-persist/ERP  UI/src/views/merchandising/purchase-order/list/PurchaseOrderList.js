import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, PlusSquare, XSquare } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, CustomInput, Input, Label, Row } from 'reactstrap';
import TableCustomerHeader from '../../../../utility/custom/TableCustomerHeader';
import { deleteRangePurchaseOrder, getPurchaseOrdersByQuery } from '../store/actions';
import PurchaseOrderExpandRow from './PurchaseOrderExpandRow';
import { purchaseOrderTableColumn } from './PurchaseOrderTableColumns';
// ** Table Sub Header
const CustomHeader = ( { handlePerPage, rowsPerPage } ) => {
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
                <Button.Ripple onClick={() => { }} className='btn-icon' color='flat-success'>
                    <PlusSquare size={24} />
                </Button.Ripple>
            </Col>
        </Row>
    );
};

const PurchaseOrderList = ( { purchaseOrders, total, queryData, toggleForm } ) => {
    const dispatch = useDispatch();

    // ** Global States

    // ** Local States
    const [searchTerm, setSearchTerm] = useState( '' );
    const [currentPage, setCurrentPage] = useState( 1 );
    const [rowsPerPage, setRowsPerPage] = useState( 10 );
    const [sortedBy, setSortedBy] = useState( 'asc' );
    const [sortedColumn, setSortedColumn] = useState( 'id' );
    const [currentDepartment, setCurrentDepartment] = useState( { value: '', label: 'Select Division', number: 0 } );
    const [currentStatus, setCurrentStatus] = useState( { value: '', label: 'Select Status', number: 0 } );
    const [selectedRowId, setSelectedRowId] = useState( [] );
    const [clearSelectedRow, setClearSelectedRow] = useState( false );

    useEffect( () => {
        dispatch(
            getPurchaseOrdersByQuery( {
                page: currentPage,
                perPage: rowsPerPage,
                status: currentStatus.value,
                q: searchTerm,
                sortedBy,
                sortedColumn
            } )
        );
    }, [dispatch, queryData.length] );
    // ** Function in get data on page change
    const handlePagination = page => {
        dispatch(
            getPurchaseOrdersByQuery( {
                page: page.selected + 1,
                perPage: rowsPerPage,
                status: currentStatus.value,
                q: searchTerm,
                sortedBy,
                sortedColumn
            } )
        );
        setCurrentPage( page.selected + 1 );
    };

    // ** Function in get data on rows per page
    const handlePerPage = e => {
        const value = parseInt( e.currentTarget.value );
        dispatch(
            getPurchaseOrdersByQuery( {
                page: currentPage,
                perPage: value,
                status: currentStatus.value,
                q: searchTerm,
                sortedBy,
                sortedColumn
            } )
        );
        setRowsPerPage( value );
    };
    // ** Function in get data on search query change
    const handleFilter = val => {
        setSearchTerm( val );
        dispatch(
            getPurchaseOrdersByQuery( {
                page: currentPage,
                perPage: rowsPerPage,
                status: currentStatus.value,
                q: val,
                sortedBy,
                sortedColumn
            } )
        );
    };
    const handleSort = ( column, direction ) => {
        const { selector } = column;
        setSortedBy( direction );
        setSortedColumn( selector );
        dispatch(
            getPurchaseOrdersByQuery( {
                page: currentPage,
                perPage: rowsPerPage,
                status: currentStatus.value,
                q: searchTerm,
                sortedBy: direction,
                sortedColumn: selector
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
            division: currentDepartment.value,
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
            return purchaseOrders.slice( 0, rowsPerPage );
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
            getPurchaseOrdersByQuery( {
                page: currentPage,
                perPage: rowsPerPage,
                division: currentDepartment.value,
                status: currentStatus.value,
                q: searchTerm,
                sortedBy,
                sortedColumn
            } )
        );
    };

    // ** Delete Rang
    const handleDeletePurchaseOrderRange = () => {
        dispatch( deleteRangePurchaseOrder( selectedRowId ) );
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
                        <Col md='4'></Col>
                        <Col md='4'></Col>
                        <Col md='4' >
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
                        <CardTitle tag='h2'>Buyer Purchase Order </CardTitle>
                    </CardHeader>
                    <TableCustomerHeader
                        handlePerPage={handlePerPage}
                        rowsPerPage={rowsPerPage}
                        searchTerm={searchTerm}
                    >
                        <Button.Ripple tag={Link} to='/new-purchase-order' className='btn-icon' color='flat-success'>
                            <PlusSquare size={24} />
                        </Button.Ripple>
                    </TableCustomerHeader>
                    <DataTable
                        onSelectedRowsChange={handleRowSelected}
                        onSort={handleSort}
                        // contextMessage={}
                        contextActions={<Button.Ripple onClick={() => { handleDeletePurchaseOrderRange(); }} className='btn-icon ' color='flat-danger'>
                            <XSquare size={24} />
                        </Button.Ripple>}
                        dense
                        highlightOnHover
                        selectableRows
                        clearSelectedRows={clearSelectedRow}
                        responsive={true}
                        paginationServer
                        expandableRows
                        expandableRowsComponent={<PurchaseOrderExpandRow data={data => data} />}
                        expandOnRowClicked
                        columns={purchaseOrderTableColumn}
                        sortIcon={<ChevronDown />}
                        className='react-dataTable'
                        data={dataToRender()}
                    />
                </div>
                <div>
                    <CustomPagination />
                </div>

            </Card>

        </div>
    );
};

export default PurchaseOrderList;
