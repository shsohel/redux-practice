
import '@custom-styles/merchandising/others/po-details-table.scss';
import '@custom-styles/merchandising/select/po-details-select.scss';
import classnames from 'classnames';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Maximize2, Minimize2, MinusSquare, MoreVertical, PlusSquare, Settings } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import CreatableSelect from 'react-select/creatable';
import { Badge, Button, Card, CardBody, CardHeader, CardTitle, Col, Collapse, CustomInput, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import Table from 'reactstrap/lib/Table';
import ResizableTable from '../../../../utility/custom/ResizableTable';
import { selectActionStatus, selectCurrency, selectDestination, selectExporter, selectShipmentMode, selectUnit, selectYear } from '../../../../utility/enums';
import { isObjEmpty, randomIdGenerator, selectThemeColors } from '../../../../utility/Utils';
import { getDropDownBuyers } from '../../buyer/store/actions';
import { getDropDownSeasons } from '../../season/store/actions';
import { getDropDownSizeGroups } from '../../size-group/store/actions';
import { getDropDownStyles } from '../../style/single-style/store/actions';
import ColorSizeCombination from './ColorSizeCombination';
import POStyleDetailsForm from './POStyleDetailsForm';
import SizeRatio from './SizeRatio';

const PurchaseOrderAddForm = () => {
    const { replace } = useHistory();

    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState( false );
    const { dropDownBuyers } = useSelector( ( { buyers } ) => buyers );
    const { dropDownSeasons } = useSelector( ( { seasons } ) => seasons );
    const { dropDownStyles } = useSelector( ( { styles } ) => styles );
    const { dropDownSizeGroups } = useSelector( ( { sizeGroups } ) => sizeGroups );
    const [buyer, setBuyer] = useState( null );
    const [season, setSeason] = useState( null );
    const [year, setYear] = useState( null );
    const [currency, setCurrency] = useState( null );
    // State For Checking SET ORDER
    const [isItSetOrder, setIsItSetOrder] = useState( false );
    const [isSizeRationOpen, setIsSizeRationOpen] = useState( false );
    const [isColorSizeCombinationOpen, setIsColorSizeCombinationOpen] = useState( false );

    ///State for Order Details Table
    const [orderDetails, setOrderDetails] = useState( [
        {
            fieldId: randomIdGenerator(),
            style: null,
            sizeGroups: null,
            destination: null,
            orderQuantity: 0,
            orderUOM: null,
            shipmentMode: null,
            shipmentDate: moment( new Date() ).format( 'yy-MM-DD' ),
            inspectionDate: moment( new Date() ).format( 'yy-MM-DD' ),
            rate: 0,
            amount: 0,
            excessQuantity: 0,
            wastageQuantity: 0,
            exporter: null,
            ColorSize: null,
            SizeColor: null,
            ColorRation: null,
            status: null
        }
    ] );
    ///State for Open Collapsible Table
    const [isOpen, setIsOpen] = useState( [
        {
            rowId: orderDetails[0].fieldId,
            yes: false
        }
    ] );

    //For Run Time 
    useEffect( () => {
        dispatch( getDropDownBuyers() );
        dispatch( getDropDownSeasons() );
        dispatch( getDropDownStyles() );
        dispatch( getDropDownSizeGroups() );
    }, [] );

    // For Error Handling and Form Submission 
    const { register, errors, control, handleSubmit } = useForm();

    //Form Submit 
    const onSubmit = ( values ) => {
        if ( isObjEmpty( errors ) ) {
            console.log( values );
        }
    };

    ///For Details a Row Add
    const handleAddOrderDetailsRow = () => {
        const newRow = {
            fieldId: randomIdGenerator(),
            style: null,
            sizeGroups: null,
            destination: null,
            orderQuantity: 0,
            orderUOM: null,
            shipmentMode: null,
            shipmentDate: moment( new Date() ).format( 'yy-MM-DD' ),
            inspectionDate: moment( new Date() ).format( 'yy-MM-DD' ),
            rate: 0,
            amount: 0,
            excessQuantity: 0,
            wastageQuantity: 0,
            exporter: null,
            ColorSize: null,
            scss: false,
            colorRation: null,
            status: null
        };
        const newIsOpenRow = {
            rowId: newRow.fieldId,
            yes: false
        };
        setIsOpen( [...isOpen, newIsOpenRow] );
        setOrderDetails( [...orderDetails, newRow] );
    };
    ///For Details a Row Remove
    const handleRemoveOrderDetailsRow = ( fieldId ) => {
        const updatedData = [...orderDetails];
        updatedData.splice(
            updatedData.findIndex( x => x.fieldId === fieldId ),
            1
        );
        setOrderDetails( updatedData );
    };

    const handleCollapsibleTableOpen = ( fieldId ) => {
        const updatedIsOpen = isOpen.map( i => {
            if ( fieldId === i.rowId ) {
                i.yes = !i.yes;
            }
            return i;
        } );
        setIsOpen( updatedIsOpen );
    };

    const handleStyleDropdown = ( newValue, fieldId ) => {
        const updatedData = orderDetails.map( i => {
            if ( fieldId === i.fieldId ) {
                i.style = newValue;
            }
            return i;
        } );
        setOrderDetails( updatedData );
    };
    const handleSizeGroupsDropdown = ( newValue, fieldId ) => {
        const updatedData = orderDetails.map( i => {
            if ( fieldId === i.fieldId ) {
                i.sizeGroups = newValue;
            }
            return i;
        } );
        setOrderDetails( updatedData );
    };
    const handleDestinationDropdown = ( newValue, fieldId ) => {
        const updatedData = orderDetails.map( i => {
            if ( fieldId === i.fieldId ) {
                i.destination = newValue;
            }
            return i;
        } );
        setOrderDetails( updatedData );
    };
    const handleUnitDropdown = ( newValue, fieldId ) => {
        const updatedData = orderDetails.map( i => {
            if ( fieldId === i.fieldId ) {
                i.orderUOM = newValue;
            }
            return i;
        } );
        setOrderDetails( updatedData );
    };
    const handleShipmentModeDropdown = ( newValue, fieldId ) => {
        const updatedData = orderDetails.map( i => {
            if ( fieldId === i.fieldId ) {
                i.shipmentMode = newValue;
            }
            return i;
        } );
        setOrderDetails( updatedData );
    };
    const handleExporterDropdown = ( newValue, fieldId ) => {
        const updatedData = orderDetails.map( i => {
            if ( fieldId === i.fieldId ) {
                i.exporter = newValue;
            }
            return i;
        } );
        setOrderDetails( updatedData );
    };
    const handleActionStatusDropdown = ( newValue, fieldId ) => {
        const updatedData = orderDetails.map( i => {
            if ( fieldId === i.fieldId ) {
                i.status = newValue;
            }
            return i;
        } );
        setOrderDetails( updatedData );
    };

    const handleOnChangeForOrderDetails = ( e, fieldId ) => {
        const { name, value, type } = e.target;
        const updateData = orderDetails.map( i => {
            if ( fieldId === i.fieldId ) {
                // eslint-disable-next-line no-constant-condition
                i[name] = type === "number" ? Number( value ) : "date" ? moment( value ).format( 'yy-MM-DD' ) : value;
            }
            return i;
        } );
        setOrderDetails( updateData );
    };


    const handleOpenStyleDetailsForm = () => {
        setOpenModal( !openModal );
    };

    const handleOpenColorSizeCombination = () => {
        setIsColorSizeCombinationOpen( !isColorSizeCombinationOpen );
    };

    const handleOpenSizeRation = ( params ) => {
        setIsSizeRationOpen( !isSizeRationOpen );
    };


    const handleCancel = () => {
        replace( '/purchase-order' );
    };

    const handleAddNewPackaging = () => {
        if ( isItSetOrder ) {
            replace( '/new-set-packaging' );
        } else {
            replace( '/new-single-packaging' );
        }
    };

    return (
        <div>
            <Card className="p-1">
                <CardHeader>
                    <CardTitle tag='h4'>New Purchase Order</CardTitle>
                </CardHeader>

                <CardBody>
                    <Form onSubmit={handleSubmit( onSubmit )} >
                        <Row className="border rounded rounded-3 ">
                            <FormGroup tag={Col} xs={12} sm={12} md={12} lg={12} xl={12} className="mt-n1">
                                <Badge color='primary'>
                                    {`Master Info`}
                                </Badge>
                            </FormGroup>
                            <FormGroup tag={Col} xs={12} sm={12} md={6} lg={3} xl={3} >
                                <Label className="text-dark font-weight-bold" for='buyerOrderNoId'>Buyer PO No.</Label>
                                <Input
                                    id="buyerOrderNoId"
                                    type="text"
                                    name="buyerOrderNo"
                                    placeholder="Buyer Purchase Order No"
                                    innerRef={register( { required: true } )}
                                    className={classnames( { 'is-invalid': errors['buyerOrderNo'] } )}
                                />
                                {errors && errors.buyerOrderNo && <FormFeedback>Buyer PO No is required!</FormFeedback>}
                            </FormGroup>
                            <FormGroup tag={Col} xs={12} sm={12} md={6} lg={3} xl={3} >
                                <Label className="text-dark font-weight-bold" for='purchaseOrderDateId'>Purchase Order Date</Label>
                                <Input
                                    id="purchaseOrderDateId"
                                    type="date"
                                    name="purchaseOrderDate"
                                    placeholder="Purchase Order Date"
                                    defaultValue={moment( new Date() ).format( 'yy-MM-DD' )}
                                    innerRef={register( { required: true } )}
                                    className={classnames( { 'is-invalid': errors['purchaseOrderDate'] } )}
                                />
                                {errors && errors.purchaseOrderDate && <FormFeedback>Purchase Order Date is required!</FormFeedback>}
                            </FormGroup>
                            <FormGroup tag={Col} xs={12} sm={12} md={6} lg={6} xl={6} >
                                <Label className="text-dark font-weight-bold" for='descriptionId'>Description</Label>
                                <Input
                                    id="descriptionId"
                                    type="text"
                                    name="description"
                                    placeholder="Description"
                                    innerRef={register( { required: true } )}
                                    className={classnames( { 'is-invalid': errors['description'] } )}
                                />
                                {errors && errors.purchaseOrderDate && <FormFeedback>Purchase Order Date is required!</FormFeedback>}
                            </FormGroup>
                            <FormGroup tag={Col} xs={12} sm={12} md={6} lg={3} xl={3} >
                                <Label className="text-dark font-weight-bold" for='buyerId'>Buyer</Label>
                                <CreatableSelect
                                    id='buyerId'
                                    name="buyer"
                                    isSearchable
                                    menuPosition={'fixed'}
                                    control={control}
                                    isClearable
                                    theme={selectThemeColors}
                                    options={dropDownBuyers}
                                    classNamePrefix='select'
                                    innerRef={register( { required: true } )}
                                    // className={classnames( 'react-select', { 'is-invalid': buyer !== null } )}
                                    value={buyer}
                                    onChange={data => {
                                        setBuyer( data );
                                    }}
                                />
                                {/* <Controller
                                    isSearchable
                                    menuPosition={'fixed'}
                                    isClearable
                                    as={CreatableSelect}
                                    id='buyerId'
                                    control={control}
                                    name='buyer'
                                    options={dropDownBuyers}
                                    innerRef={register( { required: true } )}
                                    className={classnames( 'react-select', { 'is-invalid': errors['buyer' === null] } )}
                                    classNamePrefix='select'
                                    theme={selectThemeColors}
                                />
                                {errors && errors.buyer === null && <FormFeedback>Buyer is required!</FormFeedback>} */}
                            </FormGroup>
                            <FormGroup tag={Col} xs={12} sm={12} md={6} lg={3} xl={3} >
                                <Label className="text-dark font-weight-bold" for='seasonId'>Season</Label>
                                <CreatableSelect
                                    id='seasonId'
                                    name="season"
                                    isSearchable
                                    menuPosition={'fixed'}
                                    isClearable
                                    theme={selectThemeColors}
                                    options={dropDownSeasons}
                                    classNamePrefix='select'
                                    innerRef={register( { required: true } )}
                                    // className={classnames( 'react-select', { 'is-invalid': season === null } )}
                                    value={season}
                                    onChange={data => {
                                        setSeason( data );
                                    }}
                                />
                            </FormGroup>
                            <FormGroup tag={Col} xs={12} sm={12} md={6} lg={3} xl={3} >
                                <Label className="text-dark font-weight-bold" for='yearId'>Year</Label>
                                <CreatableSelect
                                    id='yearId'
                                    name="year"
                                    isSearchable
                                    menuPosition={'fixed'}
                                    isClearable
                                    theme={selectThemeColors}
                                    options={selectYear}
                                    classNamePrefix='select'
                                    innerRef={register( { required: true } )}
                                    // className={classnames( 'react-select', { 'is-invalid': year === null } )}
                                    value={year}
                                    onChange={data => {
                                        setYear( data );
                                    }}
                                />
                            </FormGroup>
                            <FormGroup tag={Col} xs={12} sm={12} md={6} lg={3} xl={3} >
                                <Label className="text-dark font-weight-bold" for='currencyId'>Currency</Label>
                                <CreatableSelect
                                    id='currencyId'
                                    name="currency"
                                    isSearchable
                                    menuPosition={'fixed'}
                                    isClearable
                                    theme={selectThemeColors}
                                    options={selectCurrency}
                                    classNamePrefix='select'
                                    innerRef={register( { required: true } )}
                                    // className={classnames( 'react-select', { 'is-invalid': currency === null } )}
                                    value={currency}
                                    onChange={data => {
                                        setCurrency( data );
                                    }}
                                />
                            </FormGroup>
                            <FormGroup tag={Col} xs={12} sm={12} md={6} lg={3} xl={3} >
                                <Label className="text-dark font-weight-bold" for='totalOrderQuantityId'>Total Order Quantity</Label>
                                <Input
                                    id="totalOrderQuantityId"
                                    type="number"
                                    name="totalOrderQuantity"
                                    placeholder="0.00"
                                    onFocus={e => { e.target.select(); }}
                                    innerRef={register( { required: true } )}
                                    className={classnames( { 'is-invalid': errors['totalOrderQuantity'] }, 'text-right' )}
                                />
                                {errors && errors.totalOrderQuantity && <FormFeedback>Total Order Quantity No is required!</FormFeedback>}

                            </FormGroup>
                            <FormGroup tag={Col} xs={12} sm={12} md={6} lg={3} xl={3} >
                                <Label className="text-dark font-weight-bold" for='totalAmountId'>Total Amount</Label>
                                <Input
                                    id="totalAmountId"
                                    type="number"
                                    name="totalAmount"
                                    placeholder="0.00"
                                    onFocus={e => { e.target.select(); }}
                                    innerRef={register( { required: true } )}
                                    className={classnames( { 'is-invalid': errors['totalAmount'] }, 'text-right' )}
                                />
                                {errors && errors.totalAmount && <FormFeedback>Total Amount No is required!</FormFeedback>}
                            </FormGroup>
                            <FormGroup tag={Col} xs={12} sm={12} md={6} lg={3} xl={3} >
                                <div className="po-set-switch">
                                    <CustomInput
                                        // classNamePrefix="switch"
                                        type='switch'
                                        id='set-order-Id'
                                        label='Is Set Order?'
                                        value={isItSetOrder}
                                        onChange={e => { setIsItSetOrder( e.target.checked ); }}
                                    />
                                </div>
                            </FormGroup>
                            <FormGroup tag={Col} xs={12} sm={12} md={12} lg={12} xl={12} >
                                <Label className="text-dark font-weight-bold" for='remarksId'>Remarks</Label>
                                <Input
                                    id="remarksId"
                                    type="textarea"
                                    name="remarks"
                                    placeholder="Remarks"
                                    innerRef={register( { required: true } )}
                                    className={classnames( { 'is-invalid': errors['remarks'] } )}
                                />
                                {errors && errors.remarks && <FormFeedback>Remarks No is required!</FormFeedback>}

                            </FormGroup>
                        </Row>
                        <Row className="border rounded rounded-3 mt-2 ">
                            <FormGroup tag={Col} xs={12} sm={12} md={12} lg={12} xl={12} className="mt-n1">
                                <Badge color='primary'>
                                    {`Order Details`}
                                </Badge>
                            </FormGroup>
                            <FormGroup tag={Col} xs={12} sm={12} md={12} lg={12} xl={12} >
                                <div className="po-details-table">
                                    <ResizableTable mainClass="purchaseTable" tableId="purchaseTableId" className="po-details-table" size="sm" responsive={true} >
                                        <thead className='thead-dark table-bordered' >
                                            <tr >
                                                <th className=' text-center'><strong></strong></th>
                                                <th className=' text-center'><strong>Style</strong></th>
                                                <th className={isItSetOrder ? 'd-none' : 'text-center'}><strong>Size Range</strong></th>
                                                <th className='text-center'><strong>Destination</strong></th>
                                                <th className='text-center'><strong>Order Qty</strong></th>
                                                <th className='text-center'><strong>Order UOM</strong></th>
                                                <th className='text-center'><strong>Shipment Mode</strong></th>
                                                <th className='text-center'><strong>Shipment Date</strong></th>
                                                <th className=' text-center'><strong>Inspection Date</strong></th>
                                                <th className=' text-center'><strong>Rate</strong></th>
                                                <th className=' text-center'><strong>Amount</strong></th>
                                                <th className=' text-center'><strong>Excess Qty</strong></th>
                                                <th className=' text-center'><strong>Wastage Qty</strong></th>
                                                <th className=' text-center'><strong>Exporter</strong></th>
                                                <th style={{ width: '19px' }} className="text-center" ><strong>CS</strong></th>
                                                <th className="text-center" ><strong>SCSS</strong></th>
                                                <th className="text-center" ><strong>RC</strong></th>
                                                <th className=' text-center'><strong>Status</strong></th>
                                                <th className='text-center'><strong>Action</strong></th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                            {
                                                orderDetails.map( i => (
                                                    <Fragment key={i.fieldId + i.fieldId} >
                                                        <tr key={i.fieldId}>
                                                            <td>
                                                                <Button.Ripple for="collapseId" tag={Label} onClick={() => { handleCollapsibleTableOpen( i.fieldId ); }} className='btn-icon' color='flat-primary' >
                                                                    <Maximize2 className={( isOpen.find( ( item => item.rowId === i.fieldId ) )?.yes ) ? 'd-none' : 'd'} id="collapseId" size={15} color="#7367f0" />
                                                                    <Minimize2 className={( ( isOpen.find( ( item => item.rowId === i.fieldId ) )?.yes ) ) ? 'd' : 'd-none'} id="collapseId" size={15} color="#28c76f" />
                                                                </Button.Ripple>

                                                            </td>
                                                            <td>
                                                                <CreatableSelect
                                                                    id='styleId'
                                                                    name="style"
                                                                    isSearchable
                                                                    menuPosition={'fixed'}
                                                                    theme={selectThemeColors}
                                                                    options={dropDownStyles}
                                                                    classNamePrefix='po-select'
                                                                    innerRef={register( { required: true } )}
                                                                    className={classnames( 'po-details-select', { 'is-invalid': i.style === null } )}
                                                                    value={i.style}
                                                                    onChange={data => {
                                                                        handleStyleDropdown( data, i.fieldId );
                                                                    }}
                                                                />
                                                            </td>
                                                            <td className={isItSetOrder ? 'd-none' : 'text-center'}>
                                                                <CreatableSelect
                                                                    id='sizeGroupId'
                                                                    name="sizeGroup"
                                                                    isSearchable
                                                                    menuPosition={'fixed'}
                                                                    theme={selectThemeColors}
                                                                    options={dropDownSizeGroups}
                                                                    classNamePrefix='po-select'
                                                                    innerRef={register( { required: true } )}
                                                                    className={classnames( 'po-details-select', { 'is-invalid': i.sizeGroups === null } )}
                                                                    value={i.sizeGroups}
                                                                    onChange={data => {
                                                                        handleSizeGroupsDropdown( data, i.fieldId );
                                                                    }}
                                                                />
                                                            </td>
                                                            <td>
                                                                <CreatableSelect
                                                                    id='destinationId'
                                                                    name="destination"
                                                                    isSearchable
                                                                    menuPosition={'fixed'}
                                                                    theme={selectThemeColors}
                                                                    options={selectDestination}
                                                                    classNamePrefix='po-select'
                                                                    innerRef={register( { required: true } )}
                                                                    className={classnames( 'po-details-select', { 'is-invalid': i.destination === null } )}
                                                                    value={i.destination}
                                                                    onChange={data => {
                                                                        handleDestinationDropdown( data, i.fieldId );
                                                                    }}
                                                                />
                                                            </td>
                                                            <td>
                                                                <Input
                                                                    id="orderQuantityId"
                                                                    bsSize="sm"
                                                                    className="text-right"
                                                                    type="number"
                                                                    name="orderQuantity"
                                                                    placeholder="0.00"
                                                                    value={i.orderQuantity}
                                                                    onChange={e => { handleOnChangeForOrderDetails( e, i.fieldId ); }}
                                                                    onFocus={e => { e.target.select(); }}
                                                                />
                                                            </td>
                                                            <td>
                                                                <CreatableSelect
                                                                    id='unitsId'
                                                                    name="unit"
                                                                    isSearchable
                                                                    menuPosition={'fixed'}
                                                                    theme={selectThemeColors}
                                                                    options={selectUnit}
                                                                    classNamePrefix='po-select'
                                                                    innerRef={register( { required: true } )}
                                                                    className={classnames( 'po-details-select', { 'is-invalid': i.orderUOM === null } )}
                                                                    value={i.orderUOM}
                                                                    onChange={data => {
                                                                        handleUnitDropdown( data, i.fieldId );
                                                                    }}
                                                                />
                                                            </td>
                                                            <td>
                                                                <CreatableSelect
                                                                    id='shipmentModeId'
                                                                    name="shipmentMode"
                                                                    isSearchable
                                                                    menuPosition={'fixed'}
                                                                    theme={selectThemeColors}
                                                                    options={selectShipmentMode}
                                                                    classNamePrefix='po-select'
                                                                    innerRef={register( { required: true } )}
                                                                    className={classnames( 'po-details-select', { 'is-invalid': i.shipmentMode === null } )}
                                                                    value={i.shipmentMode}
                                                                    onChange={data => {
                                                                        handleShipmentModeDropdown( data, i.fieldId );
                                                                    }}
                                                                />
                                                            </td>
                                                            <td>
                                                                <Input
                                                                    id="shipmentDateId"
                                                                    bsSize="sm"
                                                                    className="text-right"
                                                                    name="shipmentDate"
                                                                    type="date"
                                                                    value={i.shipmentDate}
                                                                    onChange={e => { handleOnChangeForOrderDetails( e, i.fieldId ); }}
                                                                />
                                                            </td>
                                                            <td>
                                                                <Input
                                                                    id="inspectionDateId"
                                                                    bsSize="sm"
                                                                    className="text-right"
                                                                    type="date"
                                                                    name="inspectionDate"
                                                                    value={i.inspectionDate}
                                                                    onChange={e => { handleOnChangeForOrderDetails( e, i.fieldId ); }}

                                                                />
                                                            </td>
                                                            <td>
                                                                <Input
                                                                    id="rateId"
                                                                    bsSize="sm"
                                                                    className="text-right"
                                                                    type="number"
                                                                    name="rate"
                                                                    value={i.rate}
                                                                    placeholder="0.00"
                                                                    onFocus={e => { e.target.select(); }}
                                                                    onChange={e => { handleOnChangeForOrderDetails( e, i.fieldId ); }}

                                                                />
                                                            </td>
                                                            <td>
                                                                <Input
                                                                    id="amountId"
                                                                    bsSize="sm"
                                                                    className="text-right"
                                                                    type="number"
                                                                    name="amount"
                                                                    value={i.amount}
                                                                    placeholder="0.00"
                                                                    onFocus={e => { e.target.select(); }}
                                                                    onChange={e => { handleOnChangeForOrderDetails( e, i.fieldId ); }}

                                                                />
                                                            </td>
                                                            <td>
                                                                <Input
                                                                    id="excessQuantityId"
                                                                    bsSize="sm"
                                                                    className="text-right"
                                                                    type="number"
                                                                    name="excessQuantity"
                                                                    placeholder="0.00"
                                                                    value={i.excessQuantity}
                                                                    onFocus={e => { e.target.select(); }}
                                                                    onChange={e => { handleOnChangeForOrderDetails( e, i.fieldId ); }}
                                                                />
                                                            </td>
                                                            <td>
                                                                <Input
                                                                    id="wastageQuantityId"
                                                                    bsSize="sm"
                                                                    className="text-right"
                                                                    type="number"
                                                                    name="wastageQuantity"
                                                                    placeholder="0.00"
                                                                    value={i.wastageQuantity}
                                                                    onFocus={e => { e.target.select(); }}
                                                                    onChange={e => { handleOnChangeForOrderDetails( e, i.fieldId ); }}
                                                                />
                                                            </td>
                                                            <td>
                                                                <CreatableSelect
                                                                    id='exporterId'
                                                                    name="exporter"
                                                                    isSearchable
                                                                    menuPosition={'fixed'}
                                                                    theme={selectThemeColors}
                                                                    options={selectExporter}
                                                                    classNamePrefix='po-select'
                                                                    innerRef={register( { required: true } )}
                                                                    className={classnames( 'po-details-select', { 'is-invalid': i.exporter === null } )}
                                                                    value={i.exporter}
                                                                    onChange={data => {
                                                                        handleExporterDropdown( data, i.fieldId );
                                                                    }}
                                                                />
                                                            </td>
                                                            <td style={{ width: '19px' }}>
                                                                <Button.Ripple id="rcId" tag={Label} className='btn-icon' color='flat-danger' onClick={() => { handleOpenColorSizeCombination(); }} >
                                                                    <MoreVertical size={18} id="rcId" color="purple" />
                                                                </Button.Ripple>
                                                            </td>
                                                            <td className="text-center">
                                                                <input type="checkbox" />
                                                            </td>
                                                            <td >
                                                                <Button.Ripple
                                                                    id="rcIds" tag={Label}
                                                                    className='btn-icon'
                                                                    color='flat-danger'
                                                                    onClick={() => { handleOpenSizeRation(); }}
                                                                >
                                                                    <MoreVertical size={18} id="rcIds" color="purple" />
                                                                </Button.Ripple>

                                                            </td>
                                                            <td>
                                                                <CreatableSelect
                                                                    id='statusId'
                                                                    name="status"
                                                                    isSearchable
                                                                    menuPosition={'fixed'}
                                                                    theme={selectThemeColors}
                                                                    options={selectActionStatus}
                                                                    classNamePrefix='po-select'
                                                                    innerRef={register( { required: true } )}
                                                                    className={classnames( 'po-details-select', { 'is-invalid': i.status === null } )}
                                                                    value={i.status}
                                                                    onChange={data => {
                                                                        handleActionStatusDropdown( data, i.fieldId );
                                                                    }}
                                                                />
                                                            </td>
                                                            <td>
                                                                <span>
                                                                    <Button.Ripple id="deleteFabId" tag={Label} disabled={( orderDetails.length === 1 )} onClick={() => { handleRemoveOrderDetailsRow( i.fieldId ); }} className='btn-icon' color='flat-danger' >
                                                                        <MinusSquare size={18} id="deleteFabId" color="red" />
                                                                    </Button.Ripple>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr >
                                                            <td colSpan={7}>
                                                                {
                                                                    orderDetails.some( ( i => i.fieldId === i.fieldId ) ) && (
                                                                        <Collapse isOpen={isOpen.find( ( item => item.rowId === i.fieldId ) )?.yes}>
                                                                            <Table>
                                                                                <thead className='thead-dark table-bordered'>
                                                                                    <tr>
                                                                                        <th>#</th>
                                                                                        <th>Style No</th>
                                                                                        <th>Product Category</th>
                                                                                        <th>Style Category</th>
                                                                                        <th>Size Range</th>
                                                                                        <th>Colors</th>
                                                                                        <th>Total Quantity</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>

                                                                                    <tr >
                                                                                        <th scope="row">
                                                                                            <span>
                                                                                                <Button.Ripple
                                                                                                    onClick={() => { handleOpenStyleDetailsForm(); }}
                                                                                                    className='btn-icon'
                                                                                                    color='flat-primary'>
                                                                                                    <Settings size={16} />
                                                                                                </Button.Ripple>
                                                                                            </span>
                                                                                        </th>
                                                                                        <td>{i.style?.label}</td>
                                                                                        <td>Top</td>
                                                                                        <td>DRESS</td>
                                                                                        <td>2T-3T-4T-5-6-7</td>
                                                                                        <td>PINK</td>
                                                                                        <td>120725</td>
                                                                                    </tr>

                                                                                </tbody>
                                                                            </Table>

                                                                        </Collapse>
                                                                    )
                                                                }
                                                            </td>
                                                        </tr>
                                                    </Fragment>
                                                ) )
                                            }
                                        </tbody>
                                    </ResizableTable>
                                </div>
                                <Button.Ripple id="addFabId" tag={Label} onClick={() => { handleAddOrderDetailsRow(); }} className='btn-icon' color='flat-success' >
                                    <PlusSquare id="addFabId" color="green" />
                                </Button.Ripple>
                            </FormGroup>
                        </Row>
                        <Row>
                            <Col className="d-flex flex-row-reverse">
                                <div className='d-inline-block mb-1 mt-1'>
                                    <Button.Ripple className="ml-1 " outline color="secondary" size="sm" onClick={() => { handleAddNewPackaging(); }}>Add New Packaging</Button.Ripple>
                                    <Button.Ripple type="reset" className="ml-1 " outline color="secondary" size="sm">Reset</Button.Ripple>
                                    <Button.Ripple onClick={() => { handleCancel(); }} className="ml-1 " outline color="danger" size="sm">Cancel</Button.Ripple>
                                    <Button.Ripple type="submit" className="ml-1" outline color="success" size="sm">Submit</Button.Ripple>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
            <POStyleDetailsForm
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
            <ColorSizeCombination
                openModal={isColorSizeCombinationOpen}
                setOpenModal={setIsColorSizeCombinationOpen}
            />
            <SizeRatio
                openModal={isSizeRationOpen}
                setOpenModal={setIsSizeRationOpen}
            />
        </div >
    );
};

export default PurchaseOrderAddForm;
