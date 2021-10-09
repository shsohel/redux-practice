import Sidebar from '@components/sidebar';
import { isObjEmpty } from '@utils';
import classnames from 'classnames';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import InputGroup from 'reactstrap/lib/InputGroup';
import InputGroupAddon from 'reactstrap/lib/InputGroupAddon';
import { selectedColorNull, updateColor } from '../store/actions';

const ColorEditForm = ( { open, toggleSidebar, data } ) => {
    // ** Store Vars
    const dispatch = useDispatch();
    //** State */ 
    const filtered = data.hexCode;

    const [color, setColor] = useState( filtered );

    const handleInputColorChange = e => {
        setColor( e.target.value );
    };
    const { register, errors, handleSubmit } = useForm();
    // ** Function to handle form submit
    const onSubmit = ( values ) => {
        if ( isObjEmpty( errors ) ) {
            toggleSidebar();
            dispatch(
                updateColor( {
                    id: data.id,
                    name: values.name,
                    hexCode: values.hexCode
                    // description: values.description,
                    // status: values.status
                } )
            );
            dispatch(
                selectedColorNull() );
        }

    };

    const handleCancel = () => {
        toggleSidebar();
        dispatch( selectedColorNull() );
    };
    return (
        <Sidebar

            size='lg'
            open={open}
            title='Edit Style Color '
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebar}

        >
            <Form onSubmit={handleSubmit( onSubmit )}>

                <FormGroup>
                    <Label for='name'>
                        Color Name <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        name='name'
                        id='text'
                        placeholder='Green'
                        defaultValue={data.name}
                        innerRef={register( { required: true } )}
                        invalid={errors.name && true}
                        className={classnames( { 'is-invalid': errors['name'] } )}
                    />
                    {errors && errors.name && <FormFeedback>Name is required!</FormFeedback>}

                </FormGroup>
                <FormGroup>
                    <Label for='hexCode'>
                        Color Code <span className='text-danger'>*</span>
                    </Label>

                    <InputGroup>


                        <InputGroupAddon addonType='prepend' style={{
                            padding: "5px",
                            border: "1px solid #0000002e",
                            borderRadius: "5px 0 0 5px"
                        }} >
                            <span className="color-pick" style={{ backgroundColor: color }}>
                                <input className="color-input"
                                    id='colorId'
                                    name='hexCode'
                                    type='color'
                                    value={color.toUpperCase()}
                                    onChange={e => { handleInputColorChange( e ); }}
                                />
                            </span>


                        </InputGroupAddon>
                        <Input type='text'
                            id='colorId'
                            name='hexCode'
                            value={color.toUpperCase()}
                            placeholder='#008000'
                            innerRef={register( { required: true } )}
                            invalid={errors.hexCode && true}
                            className={classnames( { 'is-invalid': errors['hexCode'] } )}
                            onChange={e => { handleInputColorChange( e ); }}
                        />
                        {/* <Input type='text'
                            name='hexCode'
                            // defaultValue={data.hexCode}
                            onChange={e => { handleInputColorChange( e ); }}

                            value={color.toUpperCase()}
                            innerRef={register( { required: true } )}
                            invalid={errors.hexCode && true}
                            className={classnames( { 'is-invalid': errors['hexCode'] } )}
                        /> */}
                        {errors && errors.hexCode && <FormFeedback>Name is required!</FormFeedback>}
                    </InputGroup>


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
                        defaultValue={data.description}

                        innerRef={register( { required: true } )}
                        invalid={errors.description && true}
                        className={classnames( { 'is-invalid': errors['description'] } )}
                    />

                    {errors && errors.description && <FormFeedback>Description is required!</FormFeedback>}
                </FormGroup> */}


                {/* <FormGroup check className="mt-1 mb-1">
                    <Input
                        name="status"
                        type="checkbox"
                        id="acceptId"
                        defaultChecked={data.status}
                        innerRef={register( { required: false } )}
                    />
                    <span> Active</span>

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

export default ColorEditForm;
