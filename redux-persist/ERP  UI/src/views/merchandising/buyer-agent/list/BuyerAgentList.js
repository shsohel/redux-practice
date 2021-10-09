
import { store } from '@store/storeConfig/store';
import { selectThemeColors } from '@utils';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, PlusSquare, XSquare } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import { Button, Col, CustomInput, Input, Label, Progress, Row } from "reactstrap";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import CardHeader from "reactstrap/lib/CardHeader";
import CardTitle from "reactstrap/lib/CardTitle";
import AutoProgress from '../../../test/practices/ProgressBarTest';
import BuyerAgentAddForm from '../form/BuyerAgentAddForm';
import BuyerAgentEditForm from '../form/BuyerAgentEditForm';
import { deleteRangeBuyerAgent, getBuyerAgentByQuery, handleOpenBuyerAgentSidebar } from '../store/actions';
import BuyerAgentExpandRow from './BuyerAgentExpandRow';
import { BuyerAgentTableColumns } from './BuyerAgentTableColumn';
const Example = ( props ) => {
    return (
        <div>
            {/* <Progress animated value={2 * 5} />
        <Progress animated color="success" value="25" />
        <Progress animated color="info" value={50} />
        <Progress animated color="warning" value={75} />
        <Progress animated color="danger" value="100" /> */}
            <Progress multi>
                <Progress animated bar value="10" />
                <Progress animated bar color="success" value="30" />
                <Progress animated bar color="warning" value="20" />
                <Progress animated bar color="danger" value="20" />
            </Progress>
        </div>
    );
};

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

// ** Buyer Agent Country filter options: Demo Array
const selectedCountry = [
    { value: '', label: 'Select Country', number: 0 },
    { value: 'bangladesh', label: 'Bangladesh', number: 1 },
    { value: 'india', label: 'India', number: 2 },
    { value: 'usa', label: 'USA', number: 3 },
    { value: 'canada', label: 'Canada', number: 4 }
];

// ** Buyer Agent Status filter options: Demo Array
const statusOptions = [
    { value: '', label: 'Select Status', number: 0 },
    { value: true, label: 'Active', number: 1 },
    { value: false, label: 'Inactive', number: 2 }
];

const BuyerAgentList = () => {
    const dispatch = useDispatch();
    // ** Global States
    const { buyerAgents, total, selectedBuyerAgent, openBuyerAgentSidebar, queryData } = useSelector( ( { buyerAgents } ) => buyerAgents );

    // ** buyerAgents States
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
    const toggleSidebar = () => store.dispatch( handleOpenBuyerAgentSidebar( !openBuyerAgentSidebar ) );

    //#Hooks
    useEffect( () => {
        dispatch(
            getBuyerAgentByQuery( {
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
            getBuyerAgentByQuery( {
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
            getBuyerAgentByQuery( {
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
            getBuyerAgentByQuery( {
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
            getBuyerAgentByQuery( {
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
            return buyerAgents.slice( 0, rowsPerPage );
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
            getBuyerAgentByQuery( {
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
        dispatch( deleteRangeBuyerAgent( selectedRowId ) );
        setSelectedRowId( [] );
        handleClearSelected();
    };
    // ** End For Multiple Select and Delete Range

    return <div>
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
                                    getBuyerAgentByQuery( {
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
                                    getBuyerAgentByQuery( {
                                        page: currentPage,
                                        perPage: rowsPerPage
                                        // country: currentCountry.label,
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
                    <CardTitle tag='h2'>Buyer Agent</CardTitle>
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
                    progressPending={!queryData.length}
                    progressComponent={
                        <AutoProgress />
                        // <div style={{ zIndex: 65564545 }}> <Progress animated color="danger" value={100} /> </div>
                    }
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
                    expandableRowsComponent={<BuyerAgentExpandRow data={data => data} />}
                    expandOnRowClicked
                    columns={BuyerAgentTableColumns}
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
            selectedBuyerAgent !== null && openBuyerAgentSidebar ? < BuyerAgentEditForm data={selectedBuyerAgent} open={openBuyerAgentSidebar} toggleSidebar={toggleSidebar} /> : openBuyerAgentSidebar ? <BuyerAgentAddForm open={openBuyerAgentSidebar} toggleSidebar={toggleSidebar} /> : null
        }


    </div>;
};

export default BuyerAgentList;

