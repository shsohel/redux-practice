import Sidebar from '@components/sidebar';
import { isObjEmpty } from '@utils';
import classnames from 'classnames';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { addStatus, getAllStatusTypes } from '../store/actions';

const StatusAddForm = ( { open, toggleSidebar, statusName, addInstantCreate } ) => {

    const dispatch = useDispatch();
    const { statusTypes } = useSelector( ( { statuses } ) => statuses );


    // ** Vars React HOOK Form
    const { register, errors, handleSubmit } = useForm();
    // ** Function to handle form submit
    const onSubmit = values => {
        if ( isObjEmpty( errors ) ) {
            toggleSidebar();
            if ( statusName ) {
                addInstantCreate(
                    {
                        name: values.name,
                        statusFor: values.statusFor,
                        isActive: values.isActive
                    }
                );
            } else {
                dispatch(
                    addStatus( {
                        name: values.name,
                        statusFor: values.statusFor,
                        isActive: values.isActive
                    } )
                );
            }

        }
    };

    useEffect( () => {
        dispatch(
            getAllStatusTypes()

        );
    }, [] );


    const handleCancel = () => {
        toggleSidebar();
    };
    return (
        <Sidebar

            size='lg'
            open={open}
            title='New Status '
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
                        placeholder='Merchandiser'
                        defaultValue={statusName ? statusName : ''}
                        innerRef={register( { required: true } )}
                        invalid={errors.name && true}
                        className={classnames( { 'is-invalid': errors['name'] } )}
                    />
                    {errors && errors.name && <FormFeedback>Name is required!</FormFeedback>}

                </FormGroup>

                <FormGroup>
                    <Label for="statusFor">Status For</Label>
                    <Input
                        name="statusFor"
                        type="select"
                        id="statusFor"
                        innerRef={register( { required: true } )}
                        invalid={errors.statusFor && true}
                        className={classnames( { "is-invalid": errors["statusFor"] } )}
                    >
                        {statusTypes.map( ( item, index ) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ) )}
                    </Input>
                    {errors && errors.statusFor && (
                        <FormFeedback>Status For is required!</FormFeedback>
                    )}
                </FormGroup>
                {/* <FormGroup>
                    <Label for='statusFor'>
                        Status For <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        type='statusFor'
                        name='statusFor'
                        id='statusFor'
                        placeholder='Write statusFor'
                        innerRef={register( { required: true } )}
                        invalid={errors.statusFor && true}
                        className={classnames( { 'is-invalid': errors['statusFor'] } )}
                    />

                    {errors && errors.statusFor && <FormFeedback>Status For is required!</FormFeedback>}
                </FormGroup> */}

                <FormGroup >
                    <FormGroup check className="mt-1">
                        <Input
                            name="isActive"
                            type="checkbox"
                            id="acceptId"
                            defaultChecked={true}
                            innerRef={register( { required: false } )}

                        />
                        <span> IsActive</span>
                    </FormGroup>

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

export default StatusAddForm;
