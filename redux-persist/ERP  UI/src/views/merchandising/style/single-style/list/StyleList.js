

import { selectThemeColors } from '@utils';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, Delete, PlusSquare } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, CustomInput, Input, Label, Row } from 'reactstrap';
import { deleteRangeStyle, getStylesByQuery } from '../store/actions';
import StyleExpandRow from './StyleExpandRow';
import { stylesTableColumn } from './StyleTableColumn';


// ** Table Sub Header
const CustomHeader = ( { handlePerPage, rowsPerPage } ) => {
    return (
        <div>
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
                    <Button.Ripple tag={Link} to='/new-single-style' className='btn-icon' color='flat-success'>
                        <PlusSquare size={24} />
                    </Button.Ripple>
                </Col>
            </Row>
        </div>
    );
};
const StyleList = ( { styles, total, queryData, toggleForm } ) => {
    const dispatch = useDispatch();
    // ** Local States
    const [searchTerm, setSearchTerm] = useState( '' );
    const [currentPage, setCurrentPage] = useState( 1 );
    const [rowsPerPage, setRowsPerPage] = useState( 10 );
    const [sortedBy, setSortedBy] = useState( 'asc' );
    const [sortedColumn, setSortedColumn] = useState( 'fullName' );
    const [currentDepartment, setCurrentDepartment] = useState( { value: '', label: 'Select Division', number: 0 } );
    const [currentStatus, setCurrentStatus] = useState( { value: '', label: 'Select Status', number: 0 } );
    const [selectedRowId, setSelectedRowId] = useState( [] );
    const [clearSelectedRow, setClearSelectedRow] = useState( false );
    // ** Global Function to toggle sidebar for Buyer


    useEffect( () => {
        // dispatch( getAllStyles() );
        dispatch(
            getStylesByQuery( {
                page: currentPage,
                perPage: rowsPerPage,
                division: currentDepartment.value,
                status: currentStatus.value,
                q: searchTerm,
                sortedBy,
                sortedColumn
            } )
        );
    }, [dispatch, queryData.length] );


    // **  Department filter options: Demo Array
    const selectDeparments = [
        { value: '', label: 'Select Department', number: 0 },
        { value: 'boys', label: 'Boys', number: 1 },
        { value: 'girls', label: 'Girls', number: 2 },
        { value: 'men', label: 'Men', number: 3 },
        { value: 'women', label: 'Women', number: 4 }
    ];

    // **  Status filter options: Demo Array
    const statusOptions = [
        { value: '', label: 'Select Status', number: 0 },
        { value: 'pending', label: 'Pending', number: 1 },
        { value: 'active', label: 'Active', number: 2 },
        { value: 'inactive', label: 'Inactive', number: 3 }
    ];

    // ** Function in get data on page change
    const handlePagination = page => {
        dispatch(
            getStylesByQuery( {
                page: page.selected + 1,
                perPage: rowsPerPage,
                division: currentDepartment.value,
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
            getStylesByQuery( {
                page: currentPage,
                perPage: value,
                division: currentDepartment.value,
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
            getStylesByQuery( {
                page: currentPage,
                perPage: rowsPerPage,
                division: currentDepartment.value,
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
            getStylesByQuery( {
                page: currentPage,
                perPage: rowsPerPage,
                division: currentDepartment.value,
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
            return styles.slice( 0, rowsPerPage );
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
            getStylesByQuery( {
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
    const handleDeleteStyleRange = () => {
        dispatch( deleteRangeStyle( selectedRowId ) );
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
                        <Col md='4'>
                            <Select
                                isClearable={false}
                                theme={selectThemeColors}
                                className='react-select  mt-50'
                                classNamePrefix='select'
                                options={selectDeparments}
                                value={currentDepartment}
                                onChange={data => {
                                    setCurrentDepartment( data );
                                    dispatch(
                                        getStylesByQuery( {
                                            page: currentPage,
                                            perPage: rowsPerPage,
                                            division: data.value,
                                            status: currentStatus.value,
                                            q: searchTerm,
                                            sortedBy,
                                            sortedColumn
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
                                        getStylesByQuery( {
                                            page: currentPage,
                                            perPage: rowsPerPage,
                                            division: currentDepartment.value,
                                            status: data.value,
                                            q: searchTerm,
                                            sortedBy,
                                            sortedColumn
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
                <div>
                    <CardHeader>
                        <CardTitle tag='h2'>Single Styles</CardTitle>
                    </CardHeader>
                    <CustomHeader
                        handlePerPage={handlePerPage}
                        rowsPerPage={rowsPerPage}
                        searchTerm={searchTerm}
                    />
                    <DataTable
                        className='react-dataTable'
                        dense
                        highlightOnHover
                        selectableRows
                        responsive
                        paginationServer
                        expandableRows
                        sortIcon={<ChevronDown />}
                        expandOnRowClicked
                        clearSelectedRows={clearSelectedRow}
                        onSelectedRowsChange={handleRowSelected}
                        contextActions={<Delete color='red' size={28} onClick={() => { handleDeleteStyleRange(); }} />}
                        expandableRowsComponent={<StyleExpandRow data={data => data} />}
                        onSort={handleSort}
                        columns={stylesTableColumn}
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

export default StyleList;
