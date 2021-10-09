import Sidebar from '@components/sidebar';
import { isObjEmpty } from '@utils';
import classnames from 'classnames';
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { selectThemeColors } from '../../../../utility/Utils';
import { getDropDownSizes } from '../../size/store/actions';
import { selectedSizeGroupNull, updateSizeGroup } from '../store/actions';


//Size Array Demo
const selectedSize = [
    { value: 'XL', label: 'XL' },
    { value: 'X', label: 'X' },
    { value: '4XL', label: '4XL' },
    { value: 'M', label: 'M' }
];
const SizeGroupEditForm = ( { open, toggleSidebar, data } ) => {

    const dispatch = useDispatch();
    const { dropDownSizes } = useSelector( ( { sizes } ) => sizes );

    const existingSize = data?.sizes ? data?.sizes?.map( i => ( { value: i?.id, label: i?.name } ) ) : null;
    console.log( existingSize );
    const [size, setSize] = useState( existingSize );
    useEffect( () => {

        dispatch( getDropDownSizes() );
    }, [] );

    const { register, errors, handleSubmit } = useForm();

    useEffect( () => {
        getDropDownSizes();
        if ( dropDownSizes ) {
            const filteredData = selectedSize.filter( i => data.sizes.includes( i.label ) );
            setSize( filteredData );
        }
    }, [dispatch, !dropDownSizes] );
    const onSubmit = ( values ) => {
        const sizeMuted = size.map( i => i.label );
        if ( isObjEmpty( errors ) ) {
            toggleSidebar();
            dispatch(
                updateSizeGroup( {
                    id: data.id,
                    name: values.name,
                    sizeIds: sizeMuted

                } )
            );
            dispatch(
                selectedSizeGroupNull() );
        }

    };

    const handleCancel = () => {
        toggleSidebar();
        dispatch( selectedSizeGroupNull() );
    };

    return (
        <Sidebar

            size='lg'
            open={open}
            title='Edit Style Size Group'
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebar}

        >
            <Form onSubmit={handleSubmit( onSubmit )}>

                <FormGroup>
                    <Label for='name'>
                        Name <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        name='name'
                        id='name'
                        placeholder='XL'
                        defaultValue={data.name}

                        innerRef={register( { required: true } )}
                        invalid={errors.name && true}
                        className={classnames( { 'is-invalid': errors['name'] } )}
                    />
                    {errors && errors.name && <FormFeedback>Name is required!</FormFeedback>}

                </FormGroup>
                <FormGroup>
                    <Label className="text-dark font-weight-bold" for='sizeRangeId'> Select Size </Label>
                    <CreatableSelect
                        id='sizeRangeId'
                        isMulti
                        isSearchable
                        isClearable
                        theme={selectThemeColors}
                        options={selectedSize}
                        classNamePrefix='select'
                        innerRef={register( { required: true } )}
                        value={size}
                        onChange={data => {
                            setSize( data );
                        }}
                    />
                    {errors && errors.sizeRangeId && <FormFeedback>Size is required!</FormFeedback>}

                </FormGroup>
                <Button.Ripple type='submit' className='mr-1' color='primary'>

                    Submit
                </Button.Ripple>

                <Button type='reset' className='mr-1' color='danger' outline onClick={() => { handleCancel(); }}>

                    Cancel
                </Button>
            </Form>

        </Sidebar>
    );
};

export default SizeGroupEditForm;
