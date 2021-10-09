import Sidebar from '@components/sidebar';
import { isObjEmpty } from '@utils';
import classnames from 'classnames';
import React from "react";
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { selectedStyleCategoryNull, updateStyleCategory } from '../store/actions';

const StyleCategoryEditForm = ( { open, toggleSidebar, data } ) => {
    // ** Store Vars
    const dispatch = useDispatch();
    //** State */ 


    const { register, errors, handleSubmit } = useForm();
    // ** Function to handle form submit
    const onSubmit = values => {
        if ( isObjEmpty( errors ) ) {
            toggleSidebar();
            dispatch(
                updateStyleCategory( {
                    id: data.id,
                    name: values.name,
                    description: values.description

                    // status: values.status
                } )
            );
            dispatch(
                selectedStyleCategoryNull() );
        }

    };

    const handleCancel = () => {
        toggleSidebar();
        dispatch( selectedStyleCategoryNull() );
    };
    return (
        <Sidebar

            size='lg'
            open={open}
            title='Edit Style Category '
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

export default StyleCategoryEditForm;
