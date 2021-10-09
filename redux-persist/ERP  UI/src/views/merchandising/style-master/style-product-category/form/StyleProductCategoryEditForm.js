import Sidebar from '@components/sidebar';
import { isObjEmpty } from '@utils';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { selectThemeColors } from '../../../../../utility/Utils';
import { getDropDownStyleCategories } from '../../style-category/store/actions';
import { deleteStyleCategoryFromProductCategory, selectedProductCategoryNull, updateProductCategory } from '../store/actions';


const StyleProductCategoryEditForm = ( { open, toggleSidebar, data } ) => {
    console.log( data );
    // ** Store Vars
    const dispatch = useDispatch();
    const { dropDownStyleCategories } = useSelector( ( { styleCategories } ) => styleCategories );
    const [styleCategory, setStyleCategory] = useState( [] );

    useEffect( () => {
        dispatch( getDropDownStyleCategories() );
        if ( dropDownStyleCategories ) {
            const filterData = dropDownStyleCategories?.filter( i => data.styleCategoryIds.includes( i.value ) );
            setStyleCategory( filterData );
        }
    }, [dispatch, !dropDownStyleCategories] );

    const { register, errors, handleSubmit } = useForm();

    // ** Function to handle form submit
    const onSubmit = values => {
        const styleCategoryMuted = styleCategory.map( i => i.value );
        if ( isObjEmpty( errors ) ) {
            toggleSidebar();
            dispatch(
                updateProductCategory( {
                    id: data.id,
                    name: values.name,
                    styleCategoryIds: styleCategoryMuted,
                    description: values.description
                } )
            );
            dispatch(
                selectedProductCategoryNull() );
        }
    };


    const deleteStyleCategory = () => {
        const styleCategoryDelete = styleCategory.map( i => i.value );
        // const styleCategoryDelete = styleCategory.map( i => ( {
        //     id: i.value,
        //     name: i.label
        // } ) );
        console.log( styleCategoryDelete );
        dispatch( deleteStyleCategoryFromProductCategory( {
            styleCategoryId: styleCategoryDelete
        } ) );
    };


    const handleCancel = () => {
        toggleSidebar();
        dispatch( selectedProductCategoryNull() );
    };
    return (
        <Sidebar
            size='lg'
            open={open}
            title='Edit Style Product Category '
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
                    <Label className="text-dark font-weight-bold" for='styleCategoryIds'> Select Style Category </Label>
                    <CreatableSelect
                        id='styleCategoryIds'
                        isMulti
                        isSearchable
                        isClearable

                        theme={selectThemeColors}
                        options={dropDownStyleCategories}
                        classNamePrefix='select'
                        innerRef={register( { required: true } )}
                        value={styleCategory}
                        onInputChange={deleteStyleCategory}
                        onChange={data => {
                            setStyleCategory( data );
                        }}
                    />
                    {errors && errors.styleCategoryIds && <FormFeedback>Style Category is required!</FormFeedback>}
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
                <Button.Ripple type='submit' className='mr-1' color='primary'>
                    Submit
                </Button.Ripple>
                <Button.Ripple type='reset' className='mr-1' color='danger' outline onClick={() => { handleCancel(); }}>
                    Cancel
                </Button.Ripple>
            </Form>

        </Sidebar>
    );
};

export default StyleProductCategoryEditForm;
