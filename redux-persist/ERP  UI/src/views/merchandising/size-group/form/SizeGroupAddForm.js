import Sidebar from '@components/sidebar';
import { baseAxios } from "@services";
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { Button, Form, FormFeedback, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { merchandisingApi } from '../../../../services/api-end-points/merchandising';
import { createOption, isObjEmpty, selectThemeColors } from '../../../../utility/Utils';
import { getDropDownSizes } from '../../size/store/actions';
import { addSizeGroup } from '../store/actions';


const SizeGroupAddForm = ( { open, toggleSidebar, sizeGroupName, addInstantCreate } ) => {
    const [isLoading, setIsLoading] = useState( false );
    const [pageLoading, setPageLoading] = useState( false );
    const dispatch = useDispatch();
    const { dropDownSizes, lastCreatedId } = useSelector( ( { sizes } ) => sizes );

    const [size, setSize] = useState( [] );

    useEffect( () => {
        dispatch( getDropDownSizes() );
    }, [] );

    // ** Vars React HOOK Form
    const { register, errors, handleSubmit } = useForm();
    // ** Function to handle form submit
    const onSubmit = values => {
        const sizeMuted = size.map( i => i.value );

        if ( isObjEmpty( errors ) ) {
            toggleSidebar();
            if ( sizeGroupName ) {
                addInstantCreate(
                    {
                        name: values.name,
                        sizeIds: sizeMuted
                    }
                );
            } else {
                dispatch(
                    addSizeGroup( {
                        name: values.name,
                        sizeIds: sizeMuted
                    } )
                );
            }

            setSize( null );
        }
    };

    const handleCancel = () => {
        toggleSidebar();
    };


    const handleSizeCreation = ( newValue ) => {
        baseAxios.post( `${merchandisingApi.size.add_size}`,
            { name: newValue, shortCode: newValue }
        ).then( res => {

            const newOption = createOption( newValue, res.data );

            setSize( [...size, newOption] );
            dispatch( getDropDownSizes() );
        } );
    };

    return (
        <Sidebar
            size='lg'
            open={open}
            title='New Style Size Group '
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
                        defaultValue={sizeGroupName ? sizeGroupName : ''}
                        innerRef={register( { required: true } )}
                        invalid={errors.name && true}
                        className={classnames( { 'is-invalid': errors['name'] } )}
                    />
                    {errors && errors.name && <FormFeedback>Name is required!</FormFeedback>}

                </FormGroup>

                <FormGroup>
                    <Label className="text-dark font-weight-bold" for='sizeIds'> Select Size </Label>
                    {
                        pageLoading ? <Spinner /> : <CreatableSelect
                            id='sizeIds'
                            isMulti
                            isSearchable
                            isClearable
                            isLoading={isLoading}
                            isDisabled={isLoading}
                            theme={selectThemeColors}
                            options={dropDownSizes}
                            isOptionSelected={!lastCreatedId}
                            classNamePrefix='select'
                            innerRef={register( { required: true } )}
                            onCreateOption={data => { handleSizeCreation( data ); }}
                            value={size}
                            onChange={data => {
                                setSize( data );
                            }}
                        />
                    }
                    {errors && errors.sizeIds && <FormFeedback>Size is required!</FormFeedback>}
                </FormGroup>
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

export default SizeGroupAddForm;
