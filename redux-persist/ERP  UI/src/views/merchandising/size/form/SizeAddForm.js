import Sidebar from '@components/sidebar';
import { isObjEmpty } from '@utils';
import classnames from 'classnames';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { addSize } from '../store/actions';

const SizeAddForm = ( { open, toggleSidebar } ) => {

    const dispatch = useDispatch();


    // ** Vars React HOOK Form
    const { register, errors, handleSubmit } = useForm();
    // ** Function to handle form submit
    const onSubmit = values => {
        if ( isObjEmpty( errors ) ) {
            toggleSidebar();
            dispatch(
                addSize( {
                    name: values.name,
                    shortCode: values.shortCode
                    // description: values.description,
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
            title='New Style Size '
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
                        innerRef={register( { required: true } )}
                        invalid={errors.name && true}
                        className={classnames( { 'is-invalid': errors['name'] } )}
                    />
                    {errors && errors.name && <FormFeedback>Name is required!</FormFeedback>}

                </FormGroup>

                <FormGroup>
                    <Label for='shortCode'>
                        Short Code <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        name='shortCode'
                        id='shortCode'
                        placeholder='XL'
                        innerRef={register( { required: true } )}
                        invalid={errors.shortCode && true}
                        className={classnames( { 'is-invalid': errors['shortCode'] } )}
                    />
                    {errors && errors.shortCode && <FormFeedback>Name is required!</FormFeedback>}

                </FormGroup>
                {/* <FormGroup>
                    <Label for='description'>
                        Description <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        type='description'
                        name='description'
                        id='description'
                        placeholder='Write Description'
                        innerRef={register( { required: true } )}
                        invalid={errors.description && true}
                        className={classnames( { 'is-invalid': errors['description'] } )}
                    />

                    {errors && errors.description && <FormFeedback>Description is required!</FormFeedback>}
                </FormGroup>

                <FormGroup >
                    <FormGroup check className="mt-1">
                        <Input
                            name="status"
                            type="checkbox"
                            id="acceptId"
                            defaultChecked={true}
                            innerRef={register( { required: false } )}

                        />
                        <span> IsActive</span>
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

export default SizeAddForm;
