import React, { Fragment } from 'react';
import { MinusSquare, Plus } from 'react-feather';
import { useForm } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import SlideDown from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import { Button, FormGroup, Input, Label, Row } from 'reactstrap';
import Col from 'reactstrap/lib/Col';
import { randomIdGenerator, selectThemeColors } from '../../../../../utility/Utils';
const selectSizeGroups = [
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'X', label: 'X' },
    { value: 'XL', label: 'XL' }
];
const selectColor = [
    { value: 'red', label: 'Red' },
    { value: 'black', label: 'Black' },
    { value: 'blue', label: 'Blue' }
];
const selectStyleNo = [
    { value: '4369SMS32-1', label: '4369SMS32-1' },
    { value: '4369SMS32-2', label: '4369SMS32-2' },
    { value: '4369SMS32-3', label: '4369SMS32-3' }
];
const SetStyleInfoAddForm = ( { colorSizeData, styleCombination, setStyleCombination } ) => {


    const handleStyleRowAdd = () => {
        const newRow = { fieldId: randomIdGenerator(), styleNo: null, size: null, color: null, quantity: '' };
        setStyleCombination(
            [...styleCombination, newRow]
        );
    };
    const handleStyleRowRemove = ( fieldId ) => {
        const updatedData = [...styleCombination];
        updatedData.splice(
            updatedData.findIndex( x => x.fieldId === fieldId ),
            1
        );
        setStyleCombination( updatedData );
    };

    const handleOnChangeOfAddedRow = ( e, fieldId ) => {
        const { name, value } = e.target;
        const updateData = styleCombination.map( i => {
            if ( fieldId === i.fieldId ) {
                i[name] = value;
            }
            return i;
        } );
        setStyleCombination( updateData );
    };

    const handleStyleNoDropDownChange = ( newValue, fieldId ) => {

        const updateData = styleCombination.map( i => {
            if ( fieldId === i.fieldId ) {
                i.styleNo = newValue;
            }
            return i;
        } );

        setStyleCombination( updateData );
    };

    const handleColorDropDownChange = ( newValue, fieldId ) => {
        const updateDate = styleCombination.map( i => {
            if ( fieldId === i.fieldId ) {
                i.color = newValue;
            }
            return i;
        } );
        setStyleCombination( updateDate );
    };

    const handleSizeDropDownChange = ( newValue, fieldId ) => {

        const updateDate = styleCombination.map( i => {
            if ( fieldId === i.fieldId ) {
                i.size = newValue;
            }
            return i;
        } );
        setStyleCombination( updateDate );
    };

    const { register, errors, handleSubmit } = useForm();


    return (
        <Fragment>
            {
                styleCombination.map( ( item, index ) => (
                    <SlideDown key={item.fieldId}>
                        <Row  >
                            <FormGroup tag={Col} xs='6' sm='6' md='3' lg='3' xl='3' className="">
                                <Label for={`styleNoId-${item.id}`}>Style No</Label>
                                <CreatableSelect
                                    id={`styleNoId-${item.id}`}
                                    isSearchable
                                    isClearable
                                    theme={selectThemeColors}
                                    options={selectStyleNo}
                                    classNamePrefix='select'
                                    value={styleCombination.styleNo}
                                    onChange={( data ) => { handleStyleNoDropDownChange( data, item.fieldId ); }}

                                />
                            </FormGroup>
                            <FormGroup tag={Col} xs='6' sm='6' md='3' lg='3' xl='3' className="">
                                <Label for={`sizeRangeId-${item.id}`}>Size</Label>
                                <CreatableSelect
                                    id={`sizeRangeId-${item.id}`}
                                    isDisabled={!colorSizeData?.sizeSpecific}
                                    isSearchable
                                    isClearable
                                    theme={selectThemeColors}
                                    options={selectSizeGroups}
                                    classNamePrefix='select'
                                    value={styleCombination.size}
                                    onChange={( data ) => { handleSizeDropDownChange( data, item.fieldId ); }}
                                />
                            </FormGroup>
                            <FormGroup tag={Col} xs='6' sm='6' md='2' lg='2' xl='2' className="">
                                <Label for={`quantityId-${item.id}`}>Quantity</Label>
                                <Input
                                    id={`quantityId-${item.id}`}
                                    type='number'
                                    name='quantity'
                                    onChange={( e ) => { handleOnChangeOfAddedRow( e, item.fieldId ); }}
                                    placeholder='Quantity'
                                />
                            </FormGroup>
                            <FormGroup tag={Col} xs='6' sm='6' md='3' lg='3' xl='3' className="">
                                <Label for={`colorId-${item.id}`}>Color</Label>
                                <CreatableSelect
                                    isSearchable
                                    isClearable
                                    id={`colorId-${item.id}`}
                                    name='color'
                                    isDisabled={!colorSizeData?.colorSpecific}
                                    theme={selectThemeColors}
                                    options={selectColor}
                                    classNamePrefix='select'
                                    value={styleCombination.color}
                                    onChange={( data ) => { handleColorDropDownChange( data, item.fieldId ); }}
                                />
                            </FormGroup>
                            <FormGroup tag={Col} xs='12' sm='12' md='1' lg='1' xl='1' className="d-flex justify justify-content-start  mt-1">
                                <Button.Ripple id="deleteId" tag={Label} disabled={( styleCombination.length === 1 )} className='btn-icon' color='flat-danger' >
                                    <MinusSquare id="deleteId" color="red" className='d-none d-sm-block' />
                                    <Button.Ripple id="deleteId" outline color='danger' className='d-block d-sm-none' onClick={() => { handleStyleRowRemove( item.fieldId ); }} > Delete </Button.Ripple>
                                </Button.Ripple>
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup tag={Col} xs='12' sm='12' md='6' lg='12' xl='12' >
                                <Button.Ripple
                                    size="sm"
                                    hidden={( index !== ( styleCombination.length - 1 ) )}
                                    className='btn-icon' color='primary'
                                    onClick={() => { handleStyleRowAdd(); }}>
                                    <Plus size={14} />
                                    <span className='align-middle'>Add New</span>
                                </Button.Ripple>
                            </FormGroup>

                        </Row>

                    </SlideDown>

                ) )
            }
        </Fragment>

    );
};

export default SetStyleInfoAddForm;
