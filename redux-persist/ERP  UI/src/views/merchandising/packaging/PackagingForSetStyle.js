/* eslint-disable no-unused-expressions */

import '@custom-styles/merchandising/others/packaging-sc-combination-table.scss';
import _ from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { Maximize2, Minimize2, MinusSquare } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import CreatableSelect from 'react-select/creatable';
import { Badge, Button, Card, CardBody, CardHeader, CardTitle, Col, Collapse, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import { selectSetStyles, selectSize, selectSizeType, sizeTypeEnumObj } from '../../../utility/enums';
import { randomIdGenerator, selectThemeColors } from '../../../utility/Utils';
import { getDropDownStyles } from '../style/single-style/store/actions';

const PackagingForSetStyle = () => {
    const { replace } = useHistory();
    const defaultValueSizeStyleDetails = [];
    const defaultPackagingInfoObject = {
        purchaseOrderNo: '45591',
        buyerName: 'Richlu',
        style: null,
        cartoonSeriesNo: '',
        totalPackSize: 0
    };
    const dispatch = useDispatch();
    const { dropDownStyles } = useSelector( ( { styles } ) => styles );
    const { dropDownSizes } = useSelector( ( { sizes } ) => sizes );
    const { register, errors, control, handleSubmit } = useForm();
    const [size, setSize] = useState( [] );
    const [style, setStyle] = useState( [] );
    const [sizeType, setSizeType] = useState( null );
    ///State for Open Collapsible Table
    const [isOpen, setIsOpen] = useState( [] );

    const [packagingInfo, setPackagingInfo] = useState( defaultPackagingInfoObject );

    const [sizeStyleDetails, setSizeStyleDetails] = useState( defaultValueSizeStyleDetails );

    const [packagingDetails, setPackagingDetails] = useState( [] );

    const getStyleSizeFieldId = sizeStyleDetails.map( i => i.fieldId );

    //For Run Time 
    useEffect( () => {
        dispatch( getDropDownStyles() );
        // dispatch( getDropDownSizes() );
    }, [] );

    const handleChangeSizeType = ( data ) => {
        setSize( [] );
        setSizeType( data );
        const updateData = sizeStyleDetails?.map( s => ( {
            fieldId: s.fieldId,
            styleName: s.styleName,
            size: []
        } ) );
        setSizeStyleDetails( updateData );
    };


    ///When Color Dropdown Onchange
    const handleStyleDropdownChange = ( data ) => {
        setStyle( data );
        ///New Color Data Checking
        const comparerForAdd = ( otherArray ) => {
            return function ( current ) {
                return otherArray.filter( function ( other ) {
                    return other.styleName === current.label;
                } ).length === 0;
            };
        };
        ///Delete Color Data Checking
        const comparerForDelete = ( otherArray ) => {
            return function ( current ) {
                return otherArray.filter( function ( other ) {
                    return other.label === current.styleName;
                } ).length === 0;
            };
        };
        //New Color Object
        const findLastSelectedStyle = data.find( comparerForAdd( sizeStyleDetails ) );
        //Delete Color Object
        const findLastDeletedStyle = sizeStyleDetails.find( comparerForDelete( data ) );

        //New Color Data Entry
        if ( findLastSelectedStyle !== undefined ) {
            const lastObjModified = {
                fieldId: randomIdGenerator(),
                styleName: findLastSelectedStyle.label,
                size: sizeStyleDetails?.some( c => c.size ) ? ( sizeStyleDetails?.map( ( cs => cs.size.map( s => ( {
                    sizeId: randomIdGenerator(),
                    sizeName: s.sizeName,
                    inputValue: 0
                } ) ) )
                ) )[0] : []
            };
            sizeStyleDetails.push( lastObjModified );
        }
        //Remove Color Data 
        if ( findLastDeletedStyle !== undefined ) {
            if ( data.length === 0 ) {
                const lastUpdated = [...sizeStyleDetails];
                lastUpdated.splice(
                    lastUpdated.findIndex(
                        x => x.styleName === findLastDeletedStyle.styleName
                    )
                );
                setSizeStyleDetails( lastUpdated );
                setSize( [] );
            } else {
                const lastUpdated = [...sizeStyleDetails];
                lastUpdated.splice(
                    lastUpdated.findIndex(
                        x => x.styleName === findLastDeletedStyle.styleName
                    ), 1
                );
                setSizeStyleDetails( lastUpdated );
            }
        }
    };

    // When Size Dropdown Change
    const handleSizeDropdownChange = ( data ) => {
        let dataManipulation = [];
        if ( data === null || data === [] ) {
            dataManipulation = [];
        } else if ( Array.isArray( data ) ) {
            dataManipulation = data;
        } else {
            dataManipulation.push( data );
        }
        setSize( dataManipulation );
        //For Entry and  Delete Size Checking
        const getAllModifiedSize = ( sizeStyleDetails?.map( c => ( {
            size: c.size
        } ) ) );
        const getOldSizeArray = getAllModifiedSize[0]?.size;

        //Find New Size Entry 
        const comparerForAdd = ( otherArray ) => {
            return function ( current ) {
                return otherArray?.filter( function ( other ) {
                    return other.sizeName === current.label;
                } ).length === 0;
            };
        };
        //Find Deleted Size Entry 
        const comparerForDelete = ( otherArray ) => {
            return function ( current ) {
                return otherArray?.filter( function ( other ) {
                    return other.label === current.sizeName;
                } ).length === 0;
            };
        };
        const findLastSelectedSize = dataManipulation?.find( comparerForAdd( getOldSizeArray ) );
        const findLastDeletedSize = getOldSizeArray?.find( comparerForDelete( dataManipulation ) );

        /// New Entry Push 
        if ( findLastSelectedSize !== undefined ) {
            const updateInputValue = sizeStyleDetails?.map( ii => {
                if ( getStyleSizeFieldId.some( i => ii.fieldId === i ) ) {
                    ii.fieldId;
                    ii.styleName;
                    ii.size.push( {
                        sizeId: randomIdGenerator(),
                        sizeName: findLastSelectedSize.label,
                        inputValue: 0
                    } );
                }
                return ii;
            } );
            setSizeStyleDetails( updateInputValue );
        }

        /// After Deleted
        if ( findLastDeletedSize !== undefined ) {
            if ( dataManipulation.length === 0 ) {
                const updateInputValue = sizeStyleDetails?.map( ii => {
                    if ( getStyleSizeFieldId.some( i => ii.fieldId === i ) ) {
                        ii?.size.splice(
                            ii.size.findIndex( s => s.sizeName === findLastDeletedSize.sizeName ) );
                    }
                    return ii;
                } );
                setSizeStyleDetails( updateInputValue );
            } else {
                const updateInputValue = sizeStyleDetails?.map( ii => {
                    if ( getStyleSizeFieldId.some( i => ii.fieldId === i ) ) {
                        ii?.size.splice(
                            ii.size.findIndex(
                                s => s.sizeName === findLastDeletedSize.sizeName
                            ), 1
                        );
                    }
                    return ii;
                } );
                setSizeStyleDetails( updateInputValue );
            }

        }
    };

    const handleSizeInputValueOnChange = ( e, fieldId, sizeId ) => {
        const updateInputValue = sizeStyleDetails?.map( i => {
            if ( fieldId === i.fieldId ) {
                i?.size.map( is => {
                    if ( ( ( sizeId === is.sizeId ) ) ) {
                        is.inputValue = e.target.value;
                    }
                    return is;
                } );
            }
            return i;
        } );
        setSizeStyleDetails( updateInputValue );
    };

    const handleAddToPackagingDetails = () => {
        const fieldIdForPackagingDetails = randomIdGenerator();
        const unitPerPackSum = _.sum( sizeStyleDetails.map( i => _.sum( i.size.map( s => Number( s.inputValue ) ) ) ) );
        const obj = {
            fieldId: fieldIdForPackagingDetails,
            purchaseOrderNo: packagingInfo.purchaseOrderNo,
            buyerName: packagingInfo.buyerName,
            cartoonSeriesNo: packagingInfo.cartoonSeriesNo,
            totalPackSize: packagingInfo.totalPackSize,
            packNo: `Pack-${packagingDetails.length + 1}`,
            sizeStyleDetails,
            unitPerPack: unitPerPackSum,
            totalUnit: unitPerPackSum * packagingInfo.totalPackSize
        };
        const newIsOpenRow = {
            rowId: fieldIdForPackagingDetails,
            yes: false
        };
        setIsOpen( [...isOpen, newIsOpenRow] );
        setPackagingDetails( [...packagingDetails, obj] );
        setSizeStyleDetails( defaultValueSizeStyleDetails );
        setPackagingInfo( defaultPackagingInfoObject );
        setSize( [] );
        setStyle( [] );
        setSizeType( null );
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
    const handleRemovePackagingDetailsRow = ( fieldId ) => {
        const updatedData = [...packagingDetails];
        updatedData.splice(
            updatedData.findIndex( x => x.fieldId === fieldId ),
            1
        );
        setPackagingDetails( updatedData );
    };
    const handleCancel = () => {
        replace( '/purchase-order' );
    };
    const handlePackagingInfoClear = () => {
        setSizeStyleDetails( defaultValueSizeStyleDetails );
        setPackagingInfo( defaultPackagingInfoObject );
        setSize( [] );
        setStyle( [] );
        setSizeType( null );
    };
    // showJsonHtml( 'Preview', sizeStyleDetails );
    return (
        <div>
            <Card className="p-1">
                <CardHeader>
                    <CardTitle tag='h4'>New Set Packaging</CardTitle>
                </CardHeader>
                <CardBody >
                    <Row className="border rounded rounded-3 mt-2">
                        <FormGroup tag={Col} xs={12} sm={12} md={12} lg={12} xl={12} className="mt-n1">
                            <Badge color='primary'>
                                {`Packaging Info`}
                            </Badge>
                        </FormGroup>
                        <FormGroup tag={Col} xs={12} sm={12} md={3} lg={3} xl={3} >
                            <Label className="text-dark font-weight-bold" for='buyerOrderNoId'> PO Number</Label>
                            <Input
                                readOnly
                                defaultValue={packagingInfo.purchaseOrderNo}
                            />
                        </FormGroup>
                        <FormGroup tag={Col} xs={12} sm={12} md={3} lg={3} xl={3}>
                            <Label className="text-dark font-weight-bold" for='buyerOrderNoId'>Buyer Name</Label>
                            <Input readOnly defaultValue={packagingInfo.buyerName} />
                        </FormGroup>
                        <FormGroup tag={Col} xs={12} sm={12} md={3} lg={3} xl={3}>
                            <Label className="text-dark font-weight-bold" for='cartoonNoId'>{`Carton's No Series`}</Label>
                            <Input
                                id='cartoonNoId'
                                name="cartoonSeriesNo"
                                type="text"
                                value={packagingInfo.cartoonSeriesNo}
                                innerRef={register( { required: true } )}
                                onChange={e => { setPackagingInfo( { ...packagingInfo, cartoonSeriesNo: e.target.value } ); }}
                            />
                        </FormGroup>
                        <FormGroup tag={Col} xs={12} sm={12} md={3} lg={3} xl={3}>
                            <Label className="text-dark font-weight-bold" for='totalPackSizeId'>Total Pack Size</Label>
                            <Input
                                className="text-right"
                                id='totalPackSizeId'
                                name="totalPackSize"
                                type="number"
                                value={packagingInfo.totalPackSize}
                                onFocus={e => { e.target.select(); }}
                                onChange={e => { setPackagingInfo( { ...packagingInfo, totalPackSize: Number( e.target.value ) } ); }}

                            />
                        </FormGroup>
                        <FormGroup tag={Col} xs={12} sm={12} md={2} lg={2} xl={2}>
                            <Label className="text-dark font-weight-bold" for='sizeTypeId'>Size Type</Label>
                            <CreatableSelect
                                id='sizeTypeId'
                                name="sizeType"
                                isSearchable
                                menuPosition={'fixed'}
                                isClearable
                                theme={selectThemeColors}
                                options={selectSizeType}
                                value={sizeType}
                                classNamePrefix='select'
                                onChange={data => { handleChangeSizeType( data ); }}
                            />
                        </FormGroup>
                        <FormGroup tag={Col} xs={12} sm={12} md={5} lg={5} xl={5}>
                            <Label className="text-dark font-weight-bold" for='colorId'>Style</Label>
                            <CreatableSelect
                                id='styleId'
                                name="style"
                                isMulti
                                isSearchable
                                menuPosition={'fixed'}
                                isClearable
                                theme={selectThemeColors}
                                options={selectSetStyles}
                                value={style}
                                classNamePrefix='select'
                                onChange={data => { handleStyleDropdownChange( data ); }}
                            />
                        </FormGroup>
                        <FormGroup tag={Col} xs={12} sm={12} md={5} lg={5} xl={5}>
                            <Label className="text-dark font-weight-bold" for='sizeId'>Sizes</Label>
                            <CreatableSelect
                                id='sizeId'
                                name="size"
                                isMulti={sizeType?.label === sizeTypeEnumObj.assortSize}
                                isSearchable
                                isDisabled={style.length === 0 || !sizeType}
                                menuPosition={'fixed'}
                                // control={control}
                                isClearable
                                theme={selectThemeColors}
                                options={selectSize}
                                classNamePrefix='select'
                                // innerRef={register( { required: true } )}
                                value={size}
                                onChange={data => { handleSizeDropdownChange( data ); }}
                            />
                        </FormGroup>

                        {
                            ( size?.length > 0 ) &&
                            <FormGroup tag={Col} xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Label className="text-dark font-weight-bold" for='totalPackSizeId'>Details</Label>
                                <div className="packing-scc-table">
                                    <Table size="sm" bordered >
                                        <thead className='thead-dark  text-center'>
                                            <tr>
                                                <th style={{ width: '15px' }} className="text-nowrap">SL.</th >
                                                <th style={{ width: '120px' }} className="text-nowrap">Style</th>
                                                {
                                                    sizeStyleDetails?.map( i => (
                                                        i?.size?.map( is => (
                                                            <Fragment key={is.sizeName}>
                                                                <th>{is.sizeName}</th>
                                                            </Fragment>
                                                        ) )
                                                    ) )[0]
                                                }
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                            {
                                                sizeStyleDetails?.map( ( i, idx ) => (
                                                    <tr key={i.fieldId}>
                                                        <td className="text-nowrap">{idx + 1}</td>
                                                        <td className="text-nowrap">{i.styleName}</td>
                                                        {
                                                            i?.size?.map( ( is ) => (
                                                                <Fragment key={is.sizeName}>
                                                                    <td>
                                                                        <Input
                                                                            className="text-right"
                                                                            type="number"
                                                                            bsSize="sm"
                                                                            onFocus={e => e.target.select()}
                                                                            value={is.inputValue}
                                                                            onChange={e => {
                                                                                handleSizeInputValueOnChange( e, i.fieldId, is.sizeId );
                                                                            }}
                                                                        />
                                                                    </td>
                                                                </Fragment>
                                                            ) )
                                                        }
                                                    </tr>
                                                ) )
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </FormGroup>
                        }
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <pre id='Preview'></pre>
                        </Col>

                        <Col className="d-flex flex-row-reverse">
                            <div className='d-inline-block mb-1 mt-1'>
                                <Button.Ripple
                                    disabled={( !size.length > 0 || !style.length > 0 )}
                                    className="ml-1"
                                    color='primary'
                                    size='sm'
                                    onClick={() => { handleAddToPackagingDetails(); }}
                                >
                                    Add
                                </Button.Ripple>
                                <Button.Ripple
                                    className="ml-1"
                                    color='secondary'
                                    size='sm'
                                    onClick={() => { handlePackagingInfoClear(); }}
                                >
                                    Clear
                                </Button.Ripple>
                            </div>
                        </Col>
                    </Row>
                    <Row className="border rounded rounded-3 mt-3">
                        <FormGroup tag={Col} xs={12} sm={12} md={12} lg={12} xl={12} className="mt-n1">
                            <Badge color='primary'>
                                {`Packaging Details`}
                            </Badge>
                        </FormGroup>
                        <FormGroup tag={Col} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="packing-scc-table">
                                <Table size="sm" bordered >
                                    <thead className='thead-dark  text-center'>
                                        <tr>
                                            <th className="text-nowrap">#</th >
                                            <th className="text-nowrap">Pack. NO.</th >
                                            <th className="text-nowrap">{`Carton's No Series`}</th>
                                            <th>Units Per Pack.</th>
                                            <th>Total Pack. Size</th>
                                            <th>Total Units</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {
                                            packagingDetails.length > 0 && (
                                                packagingDetails.map( ( i, idx ) => (
                                                    <Fragment key={idx + 1}>
                                                        <tr>
                                                            <td>
                                                                <Button.Ripple for="collapseId" tag={Label} onClick={() => { handleCollapsibleTableOpen( i.fieldId ); }} className='btn-icon' color='flat-primary' >
                                                                    <Maximize2 className={( isOpen.find( ( item => item.rowId === i.fieldId ) )?.yes ) ? 'd-none' : 'd'} id="collapseId" size={15} color="#7367f0" />
                                                                    <Minimize2 className={( ( isOpen.find( ( item => item.rowId === i.fieldId ) )?.yes ) ) ? 'd' : 'd-none'} id="collapseId" size={15} color="#28c76f" />
                                                                </Button.Ripple>
                                                            </td>
                                                            <td>{i.packNo}</td>
                                                            <td>{i.cartoonSeriesNo}</td>
                                                            <td>{i.unitPerPack}</td>
                                                            <td>{i.totalPackSize}</td>
                                                            <td>{i.totalUnit}</td>
                                                            <td>
                                                                <span>
                                                                    <Button.Ripple id="deleteFabId" tag={Label} onClick={() => { handleRemovePackagingDetailsRow( i.fieldId ); }} className='btn-icon' color='flat-danger' >
                                                                        <MinusSquare size={18} id="deleteFabId" color="red" />
                                                                    </Button.Ripple>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={4}>
                                                                <Collapse isOpen={isOpen.find( ( item => item.rowId === i.fieldId ) )?.yes}>
                                                                    <Table id="tableId">
                                                                        <thead className='thead-dark table-bordered'>
                                                                            <tr>
                                                                                <th className="text-nowrap" >Style</th>
                                                                                {
                                                                                    i.sizeStyleDetails?.map( i => (
                                                                                        i?.size?.map( is => (
                                                                                            <Fragment key={is.sizeName}>
                                                                                                <th>{is.sizeName}</th>
                                                                                            </Fragment>
                                                                                        ) )
                                                                                    ) )[0]
                                                                                }
                                                                                <th>Total Unit</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                i.sizeStyleDetails.map( cs => (
                                                                                    <tr key={cs.fieldId} >
                                                                                        <td>
                                                                                            {cs.styleName}
                                                                                        </td>
                                                                                        {
                                                                                            cs?.size?.map( ( is ) => (
                                                                                                <Fragment key={is.sizeName}>
                                                                                                    <td style={{ minWidth: '29px' }}>
                                                                                                        {is.inputValue}
                                                                                                    </td>
                                                                                                </Fragment>
                                                                                            ) )
                                                                                        }
                                                                                        <td>
                                                                                            {_.sum( cs.size.map( s => Number( s.inputValue ) ) )}
                                                                                        </td>
                                                                                    </tr>
                                                                                ) )
                                                                            }
                                                                        </tbody>
                                                                    </Table>
                                                                </Collapse>
                                                            </td>
                                                        </tr>
                                                    </Fragment>
                                                ) )
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </FormGroup>
                    </Row>
                    <Row>
                        <Col className="d-flex flex-row-reverse">
                            <div className='d-inline-block mb-1 mt-1'>
                                <Button.Ripple className="ml-1" color='primary' size='sm'>
                                    Submit
                                </Button.Ripple>
                                <Button.Ripple className="ml-1" color='secondary' size='sm' onClick={() => { handleCancel(); }}>
                                    Cancel
                                </Button.Ripple>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default PackagingForSetStyle;
