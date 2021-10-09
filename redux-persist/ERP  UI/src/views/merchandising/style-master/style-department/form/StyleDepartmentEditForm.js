import Sidebar from '@components/sidebar';
import { isObjEmpty } from '@utils';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { selectThemeColors } from '../../../../../utility/Utils';
import { getDropDownProductCategories } from '../../style-product-category/store/actions';
import { selectedDepartmentNull, updateDepartment } from '../store/actions';

const StyleDepartmentEditForm = ( { open, toggleSidebar, data } ) => {
    // ** Store Vars
    const dispatch = useDispatch();
    const { dropDownProductCategories } = useSelector( ( { productCategories } ) => productCategories );
    const [productCategory, setProductCategory] = useState( [] );
    useEffect( () => {
        dispatch( getDropDownProductCategories() );
        if ( dropDownProductCategories ) {
            const filterData = dropDownProductCategories?.filter( i => data.productCategoryIds.includes( i.value ) );
            setProductCategory( filterData );
        }
    }, [dispatch, !dropDownProductCategories] );

    const { register, errors, handleSubmit } = useForm();
    // ** Function to handle form submit
    const onSubmit = values => {
        const productCategoryMuted = productCategory.map( i => i.value );
        if ( isObjEmpty( errors ) ) {
            toggleSidebar();
            dispatch(
                updateDepartment( {
                    id: data.id,
                    name: values.name,
                    productCategoryIds: productCategoryMuted,
                    description: values.description
                } )
            );
            dispatch(
                selectedDepartmentNull() );
        }
    };

    const handleCancel = () => {
        toggleSidebar();
        dispatch( selectedDepartmentNull() );
    };
    return (
        <Sidebar
            size='lg'
            open={open}
            title='Edit Style Department '
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
                        placeholder='Boys'
                        defaultValue={data.name}

                        innerRef={register( { required: true } )}
                        invalid={errors.name && true}
                        className={classnames( { 'is-invalid': errors['name'] } )}
                    />
                    {errors && errors.name && <FormFeedback>Name is required!</FormFeedback>}

                </FormGroup>

                <FormGroup>

                    <Label className="text-dark font-weight-bold" for='productCategoryIds'> Select Product Category </Label>
                    <CreatableSelect
                        id='productCategoryIds'
                        isMulti
                        isSearchable
                        isClearable
                        theme={selectThemeColors}
                        options={dropDownProductCategories}
                        classNamePrefix='select'
                        innerRef={register( { required: true } )}

                        value={productCategory}
                        onChange={data => {
                            setProductCategory( data );
                        }}
                    />
                    {errors && errors.productCategoryIds && <FormFeedback>Product Category is required!</FormFeedback>}

                </FormGroup>

                <FormGroup>
                    <Label for='description'>
                        Description <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        type='description'
                        name='description'
                        id='description'
                        placeholder='Write Description'
                        defaultValue={data.description}

                        innerRef={register( { required: true } )}
                        invalid={errors.description && true}
                        className={classnames( { 'is-invalid': errors['description'] } )}
                    />

                    {errors && errors.description && <FormFeedback>Description is required!</FormFeedback>}
                </FormGroup>

                {/* <FormGroup >

                    <FormGroup check className="mt-1">
                        <Input
                            name="status"
                            type="checkbox"
                            id="acceptId"
                            defaultChecked={data.status}
                            innerRef={register( { required: false } )}

                        />

                        <span> Active</span>
                    </FormGroup>

                </FormGroup> */}

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

export default StyleDepartmentEditForm;
