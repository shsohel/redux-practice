/* eslint-disable no-unused-expressions */
import '@custom-styles/merchandising/others/packaging-sc-combination-table.scss';
import _ from 'lodash';
import React, { Fragment, useState } from 'react';
import { Maximize2, Minimize2, MinusSquare } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import CreatableSelect from 'react-select/creatable';
import { Badge, Button, Card, CardBody, CardHeader, CardTitle, Col, Collapse, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import { selectColor, selectSize, selectSizeColorType, selectStyles, sizeColorTypeEnumObj } from '../../../utility/enums';
import { randomIdGenerator, selectThemeColors } from '../../../utility/Utils';

const PackagingForSingleStyle = () => {
    const defaultValueSizeColorDetails = [];
    const defaultPackagingInfo = {
        purchaseOrderNo: '45591',
        buyerName: 'Richlu',
        style: null,
        cartoonSeriesNo: '',
        totalPackSize: 0
    };
    const { replace } = useHistory();
    const dispatch = useDispatch();
    const { dropDownStyles } = useSelector( ( { styles } ) => styles );
    const { dropDownColors } = useSelector( ( { colors } ) => colors );
    const { dropDownSizes } = useSelector( ( { sizes } ) => sizes );

    const { register, errors, control, handleSubmit } = useForm();
    const [color, setColor] = useState( [] );
    const [size, setSize] = useState( [] );
    const [sizeColorDetails, setSizeColorDetails] = useState( defaultValueSizeColorDetails );
    const getSizeColorFieldId = sizeColorDetails.map( i => i.fieldId );
    const [colorSizeType, setColorSizeType] = useState( null );
    ///State for Open Collapsible Table
    const [isOpen, setIsOpen] = useState( [] );

    const [packagingInfo, setPackagingInfo] = useState( defaultPackagingInfo );
    const [packagingDetails, setPackagingDetails] = useState( [] );

    const handleChangeSizeColorType = ( data ) => {
        // if ( !data ) {
        //     setSize( [] );
        //     setColor( [] );
        //     setColorSizeType( null );
        // } else {
        //     setColorSizeType( data );
        // }
        setSize( [] );
        setColor( [] );
        setColorSizeType( data );
        setSizeColorDetails( [] );
    };

    const handleColorDropDownChange = ( data ) => {
        //Color Dropdown Data on color State
        let dataManipulation = [];
        if ( data === null || data === [] ) {
            dataManipulation = [];
        } else if ( Array.isArray( data ) ) {
            dataManipulation = data;
        } else {
            dataManipulation.push( data );
        }
        setColor( dataManipulation );
        ///New Color Data Checking
        const comparerForAdd = ( otherArray ) => {
            return function ( current ) {
                return otherArray.filter( function ( other ) {
                    return other.colorName === current.label;
                } ).length === 0;
            };
        };
        ///Delete Color Data Checking
        const comparerForDelete = ( otherArray ) => {
            return function ( current ) {
                return otherArray.filter( function ( other ) {
                    return other.label === current.colorName;
                } ).length === 0;
            };
        };
        // //New Color Object
        const findLastSelectedColor = dataManipulation?.find( comparerForAdd( sizeColorDetails ) );
        // //Delete Color Object
        const findLastDeletedColor = sizeColorDetails?.find( comparerForDelete( dataManipulation ) );

        // //New Color Data Entry
        if ( findLastSelectedColor !== undefined ) {
            const lastObjModified = {
                fieldId: randomIdGenerator(),
                colorName: findLastSelectedColor.label,
                size: sizeColorDetails?.some( c => c.size ) ? ( sizeColorDetails?.map( ( cs => cs.size.map( s => ( {
                    sizeId: randomIdGenerator(),
                    sizeName: s.sizeName,
                    inputValue: 0
                } ) ) )
                ) )[0] : []
            };
            sizeColorDetails.push( lastObjModified );
        }
        // //Remove Color Data 
        if ( findLastDeletedColor !== undefined ) {
            if ( dataManipulation.length === 0 ) {
                const lastUpdated = [...sizeColorDetails];
                lastUpdated.splice(
                    lastUpdated.findIndex(
                        x => x.colorName === findLastDeletedColor.colorName
                    )
                );
                setSizeColorDetails( lastUpdated );
                setSize( [] );
            } else {
                const lastUpdated = [...sizeColorDetails];
                lastUpdated.splice(
                    lastUpdated.findIndex(
                        x => x.colorName === findLastDeletedColor.colorName
                    ), 1
                );
                setSizeColorDetails( lastUpdated );
            }
        }
    };

    ///While Size Dropdown
    const handleSizeDropDownChange = ( data ) => {

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
        const getAllModifiedSize = ( sizeColorDetails?.map( c => ( {
            size: c.size
        } ) ) );
        const getOldSizeArray = getAllModifiedSize[0].size;

        //Find New Size Entry 
        const comparerForAdd = ( otherArray ) => {
            return function ( current ) {
                return otherArray.filter( function ( other ) {
                    return other.sizeName === current.label;
                } ).length === 0;
            };
        };
        //Find Deleted Size Entry 
        const comparerForDelete = ( otherArray ) => {
            return function ( current ) {
                return otherArray.filter( function ( other ) {
                    return other.label === current.sizeName;
                } ).length === 0;
            };
        };
        const findLastSelectedSize = dataManipulation?.find( comparerForAdd( getOldSizeArray ) );
        const findLastDeletedSize = getOldSizeArray.find( comparerForDelete( dataManipulation ) );

        /// New Entry Push 
        if ( findLastSelectedSize !== undefined ) {
            const updateInputValue = sizeColorDetails?.map( ii => {
                if ( getSizeColorFieldId.some( i => ii.fieldId === i ) ) {
                    ii.fieldId;
                    ii.colorName;
                    ii.size.push( {
                        sizeId: randomIdGenerator(),
                        sizeName: findLastSelectedSize.label,
                        inputValue: 0
                    } );
                }
                return ii;
            } );
            setSizeColorDetails( updateInputValue );
        }

        /// After Deleted
        if ( findLastDeletedSize !== undefined ) {
            if ( dataManipulation.length === 0 ) {
                const updateInputValue = sizeColorDetails?.map( ii => {
                    if ( getSizeColorFieldId.some( i => ii.fieldId === i ) ) {
                        ii?.size.splice(
                            ii.size.findIndex( s => s.sizeName === findLastDeletedSize.sizeName ) );
                    }
                    return ii;
                } );
                setSizeColorDetails( updateInputValue );
            } else {
                const updateInputValue = sizeColorDetails?.map( ii => {
                    if ( getSizeColorFieldId.some( i => ii.fieldId === i ) ) {
                        ii?.size.splice(
                            ii.size.findIndex( s => s.sizeName === findLastDeletedSize.sizeName ), 1 );
                    }
                    return ii;
                } );
                setSizeColorDetails( updateInputValue );
            }
        }
    };


    ///Input Value Onchange
    const handleSizeInputValueOnChange = ( e, fieldId, sizeId ) => {
        const updateInputValue = sizeColorDetails?.map( i => {
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
        setSizeColorDetails( updateInputValue );
    };

    const handleAddToPackagingDetails = () => {
        const fieldIdForPackagingDetails = randomIdGenerator();
        const unitPerPackSum = _.sum( sizeColorDetails.map( i => _.sum( i.size.map( s => Number( s.inputValue ) ) ) ) );
        const obj = {
            fieldId: fieldIdForPackagingDetails,
            purchaseOrderNo: packagingInfo.purchaseOrderNo,
            buyerName: packagingInfo.buyerName,
            styleNo: packagingInfo.style.label,
            cartoonSeriesNo: packagingInfo.cartoonSeriesNo,
            totalPackSize: packagingInfo.totalPackSize,
            packNo: `Pack-${packagingDetails.length + 1}`,
            sizeColorDetails,
            unitPerPack: unitPerPackSum,
            totalUnit: unitPerPackSum * packagingInfo.totalPackSize
        };
        const newIsOpenRow = {
            rowId: fieldIdForPackagingDetails,
            yes: false
        };
        setIsOpen( [...isOpen, newIsOpenRow] );
        setPackagingDetails( [...packagingDetails, obj] );
        setSizeColorDetails( defaultValueSizeColorDetails );
        setPackagingInfo( defaultPackagingInfo );
        setSize( [] );
        setColor( [] );
        setColorSizeType( null );
    };

    const handlePackingInfoClear = () => {
        setPackagingInfo( defaultPackagingInfo );
        setSize( [] );
        setColor( [] );
        setColorSizeType( null );
        setSizeColorDetails( defaultValueSizeColorDetails );
    };


    // showJsonHtml( 'Preview', sizeColorDetails );

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
        updatedData.splice( updatedData.findIndex( x => x.fieldId === fieldId ), 1 );
        setPackagingDetails( updatedData );
    };
    const handleCancel = () => {
        replace( '/purchase-order' );
    };

    return (
        <div>
            <Card className="p-1">
                <CardHeader>
                    <CardTitle tag='h4'>New Single Packaging</CardTitle>
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
                            <Label className="text-dark font-weight-bold" for='StyleId'>Style No.</Label>
                            <CreatableSelect
                                id='StyleId'
                                name="style"
                                isSearchable
                                menuPosition={'fixed'}
                                isClearable
                                theme={selectThemeColors}
                                options={selectStyles}
                                classNamePrefix='select'
                                value={packagingInfo.style}
                                onChange={data => { setPackagingInfo( { ...packagingInfo, style: data } ); }}
                            />
                        </FormGroup>
                        <FormGroup tag={Col} xs={12} sm={12} md={3} lg={3} xl={3}>
                            <Label className="text-dark font-weight-bold" for='sizeColorTypeId'>Size Color Types</Label>
                            <CreatableSelect
                                id='sizeColorTypeId'
                                name="sizeColorType"
                                isSearchable
                                menuPosition={'fixed'}
                                isClearable
                                theme={selectThemeColors}
                                options={selectSizeColorType}
                                classNamePrefix='select'
                                value={colorSizeType}
                                onChange={data => { handleChangeSizeColorType( data ); }}
                            />
                        </FormGroup>
                        <FormGroup tag={Col} xs={12} sm={12} md={4} lg={4} xl={4}>
                            <Label className="text-dark font-weight-bold" for='colorId'>Color</Label>
                            <CreatableSelect
                                id='colorId'
                                name="color"
                                isMulti={colorSizeType?.label === sizeColorTypeEnumObj.assortColorAndSolidSize || colorSizeType?.label === sizeColorTypeEnumObj.assortColorAndAssortSize}
                                isSearchable
                                menuPosition={'fixed'}
                                isDisabled={!packagingInfo.style || !colorSizeType}
                                // control={control}
                                isClearable
                                theme={selectThemeColors}
                                options={selectColor}
                                value={color}
                                classNamePrefix='select'
                                onChange={data => { handleColorDropDownChange( data ); }}
                            />
                        </FormGroup>
                        <FormGroup tag={Col} xs={12} sm={12} md={4} lg={4} xl={4}>
                            <Label className="text-dark font-weight-bold" for='sizeId'>Sizes</Label>
                            <CreatableSelect
                                id='sizeId'
                                name="size"
                                isMulti={colorSizeType?.label === sizeColorTypeEnumObj.solidColorAndAssortSize || colorSizeType?.label === sizeColorTypeEnumObj.assortColorAndAssortSize}
                                isSearchable
                                isDisabled={!color.length}
                                menuPosition={'fixed'}
                                // control={control}
                                isClearable
                                theme={selectThemeColors}
                                options={selectSize}
                                classNamePrefix='select'
                                // innerRef={register( { required: true } )}
                                value={size}
                                onChange={data => { handleSizeDropDownChange( data ); }}
                            />
                        </FormGroup>
                        <FormGroup tag={Col} xs={12} sm={12} md={2} lg={2} xl={2}>
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
                        <FormGroup tag={Col} xs={12} sm={12} md={2} lg={2} xl={2}>
                            <Label className="text-dark font-weight-bold" for='totalPackSizeId'>Total Pack Size</Label>
                            <Input
                                className="text-right"
                                id='totalPackSizeId'
                                name="totalPackSize"
                                type="number"
                                value={packagingInfo.totalPackSize}
                                innerRef={register( { required: true } )}
                                onFocus={e => { e.target.select(); }}
                                onChange={e => { setPackagingInfo( { ...packagingInfo, totalPackSize: Number( e.target.value ) } ); }}

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
                                                <th style={{ width: '95px' }} className="text-nowrap">Color</th>
                                                {
                                                    sizeColorDetails?.map( i => (
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
                                                sizeColorDetails?.map( ( i, idx ) => (
                                                    <tr key={i.fieldId}>
                                                        <td className="text-nowrap">{idx + 1}</td>
                                                        <td className="text-nowrap">{i.colorName}</td>
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
                                    disabled={( !sizeColorDetails.length > 0 || !packagingInfo.style || !size.length > 0 || !color.length > 0 )}
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
                                    onClick={() => { handlePackingInfoClear(); }}
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
                                            <th className="text-nowrap">Style No</th >
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
                                                packagingDetails.map( i => (
                                                    <Fragment key={i.fieldId}>
                                                        <tr>
                                                            <td>
                                                                <Button.Ripple for="collapseId" tag={Label} onClick={() => { handleCollapsibleTableOpen( i.fieldId ); }} className='btn-icon' color='flat-primary' >
                                                                    <Maximize2 className={( isOpen.find( ( item => item.rowId === i.fieldId ) )?.yes ) ? 'd-none' : 'd'} id="collapseId" size={15} color="#7367f0" />
                                                                    <Minimize2 className={( ( isOpen.find( ( item => item.rowId === i.fieldId ) )?.yes ) ) ? 'd' : 'd-none'} id="collapseId" size={15} color="#28c76f" />
                                                                </Button.Ripple>
                                                            </td>
                                                            <td>{i.styleNo}</td>
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
                                                            <td colSpan={5}>
                                                                <Collapse isOpen={isOpen.find( ( item => item.rowId === i.fieldId ) )?.yes}>
                                                                    <Table id="tableId">
                                                                        <thead className='thead-dark table-bordered'>
                                                                            <tr>
                                                                                <th className="text-nowrap" >Color</th>
                                                                                {
                                                                                    i.sizeColorDetails?.map( i => (
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
                                                                                i.sizeColorDetails.map( cs => (
                                                                                    <tr key={cs.fieldId} >
                                                                                        <td>
                                                                                            {cs.colorName}
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

export default PackagingForSingleStyle;
