import Sidebar from '@components/sidebar';
import { isObjEmpty } from '@utils';
import classnames from 'classnames';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import InputGroup from 'reactstrap/lib/InputGroup';
import InputGroupAddon from 'reactstrap/lib/InputGroupAddon';
import { addColor } from '../store/actions';
import './Color.css';


const ColorAddForm = ( { open, toggleSidebar, colorName, addInstantCreate } ) => {


    const dispatch = useDispatch();

    const [color, setColor] = useState( "#67CB3A" );

    const handleInputColorChange = e => {
        setColor( e.target.value );


    };

    // ** Vars React HOOK Form
    const { register, errors, handleSubmit } = useForm();
    // ** Function to handle form submit
    const onSubmit = values => {

        if ( isObjEmpty( errors ) ) {
            toggleSidebar();
            if ( colorName ) {
                addInstantCreate(
                    {
                        name: values.name,
                        hexCode: values.hexCode

                    }
                );
            } else {
                dispatch(
                    addColor( {
                        name: values.name,
                        hexCode: values.hexCode

                    } )
                );
            }

        }
    };


    const handleCancel = () => {
        toggleSidebar();
    };
    return (
        <Sidebar

            size='lg'
            open={open}
            title='New Style Color '
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
                        id='name'
                        type='text'
                        placeholder='Green'
                        defaultValue={colorName ? colorName : ''}

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
                                    value={color}
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
                        innerRef={register( { required: true } )}
                        invalid={errors.description && true}
                        className={classnames( { 'is-invalid': errors['description'] } )}
                    />

                    {errors && errors.description && <FormFeedback>Description is required!</FormFeedback>}
                </FormGroup> */}

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

        </Sidebar >
    );
};

export default ColorAddForm;
