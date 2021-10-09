import Sidebar from '@components/sidebar';
import { notify } from "@custom/notifications";
import { baseAxios } from "@services";
import { isObjEmpty } from '@utils';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { merchandisingApi } from '../../../../../services/api-end-points/merchandising';
import { status } from '../../../../../utility/enums';
import { createOption, selectThemeColors } from '../../../../../utility/Utils';
import { getDropDownProductCategories } from '../../style-product-category/store/actions';
import { addDepartment } from '../store/actions';

const StyleDepartmentAddForm = ( { open, toggleSidebar } ) => {

    const dispatch = useDispatch();
    const { dropDownProductCategories, lastCreatedId } = useSelector( ( { productCategories } ) => productCategories );
    console.log( lastCreatedId );
    const [productCategory, setProductCategory] = useState( [] );

    // ** Vars React HOOK Form

    useEffect( () => {
        dispatch( getDropDownProductCategories() );
    }, [] );


    const handleProductCategoryCreation = ( newValue ) => {
        baseAxios.post( `${merchandisingApi.productCategory.add_product_category}`, { name: newValue, description: newValue } ).then( res => {
            console.log( res.data );
            if ( res.status === status.success ) {
                const newOption = createOption( newValue, res.data );
                setProductCategory( [...productCategory, newOption] );
                dispatch( getDropDownProductCategories() );
                notify( 'success', 'The Product Category has been added Successfully!' );

            } else {
                notify( 'error', 'The Product Category  has been added Failed!' );

            }

        } );


    };

    const { register, errors, handleSubmit } = useForm();
    // ** Function to handle form submit
    const onSubmit = values => {
        const productCategoryMuted = productCategory.map( i => i.value );
        if ( isObjEmpty( errors ) ) {
            toggleSidebar();
            dispatch(
                addDepartment( {
                    name: values.name,
                    productCategoryIds: productCategoryMuted,
                    description: values.description
                } )
            );
        }
    };


    const handleCancel = () => {
        toggleSidebar();
    };
    return (
        <Sidebar

            size='lg'
            open={open}
            title='New Style Department '
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
                        onCreateOption={data => { handleProductCategoryCreation( data ); }}
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
                        placeholder=' Description'
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
                            defaultChecked={true}
                            innerRef={register( { required: false } )}

                        />

                        <span> Active</span>
                    </FormGroup>

                </FormGroup> */}


                <Button.Ripple type='submit' className='mr-1' color='primary'>

                    Submit
                </Button.Ripple>

                <Button type='reset' className='mr-1' outline color='secondary' >

                    Reset
                </Button>
                <Button type='reset' className='mr-1' color='danger' outline onClick={() => { handleCancel(); }}>

                    Cancel
                </Button>


            </Form>

        </Sidebar>
    );
};

export default StyleDepartmentAddForm;
