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
import { getDropDownStyleCategories } from '../../style-category/store/actions';
import { addProductCategory } from '../store/actions';


const StyleProductCategoryAddForm = ( { open, toggleSidebar } ) => {

    const dispatch = useDispatch();
    const { dropDownStyleCategories, lastCreatedId } = useSelector( ( { styleCategories } ) => styleCategories );
    const [styleCategory, setStyleCategory] = useState( [] );

    // ** Vars React HOOK Form

    useEffect( () => {
        dispatch( getDropDownStyleCategories() );
    }, [] );

    const handleStyleCategoryCreation = ( newValue ) => {
        baseAxios.post( `${merchandisingApi.styleCategory.add_style_category}`, { name: newValue, description: newValue } ).then( res => {
            if ( res.status === status.success ) {
                const newOption = createOption( newValue, res.data );
                setStyleCategory( [...styleCategory, newOption] );
                dispatch( getDropDownStyleCategories() );
                notify( 'success', 'The Style Category has been added Successfully!' );
            } else {
                notify( 'error', 'The Style Category has been added Failed!' );
            }
        } );
    };

    const { register, errors, handleSubmit } = useForm();
    // ** Function to handle form submit
    const onSubmit = values => {
        const styleCategoryMuted = styleCategory.map( i => i.value );
        if ( isObjEmpty( errors ) ) {
            toggleSidebar();
            dispatch(
                addProductCategory( {
                    name: values.name,
                    styleCategoryIds: styleCategoryMuted,
                    description: values.description
                    // status: values.status
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
            title='New Style Product Category '
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebar}

        >
            <Form onSubmit={handleSubmit( onSubmit )}>

                <FormGroup>
                    <Label for='name'>
                        Product Category Name <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        name='name'
                        id='name'
                        placeholder='Top'
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
                        onCreateOption={data => { handleStyleCategoryCreation( data ); }}
                        value={styleCategory}
                        //onInputChange={deleteStyleCategory}

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

                <Button.Ripple type='reset' className='mr-1' outline color='secondary' >

                    Reset
                </Button.Ripple>
                <Button.Ripple type='reset' className='mr-1' color='danger' outline onClick={() => { handleCancel(); }}>

                    Cancel
                </Button.Ripple>


            </Form>

        </Sidebar>
    );
};

export default StyleProductCategoryAddForm;
