import Sidebar from '@components/sidebar';
import { isObjEmpty } from '@utils';
import classnames from 'classnames';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, Form, FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap';
import { addMerchandiser } from '../store/actions';


const defaultImageSrc = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';


const MerchandiserAddForm = ( { open, toggleSidebar } ) => {
    const dispatch = useDispatch();
    const [photo, setPhoto] = useState( { url: '' } );


    const handlePhotoUpload = e => {
        setPhoto( {
            url: URL.createObjectURL( e.target.files[0] )
        } );
    };


    const handlePhotoChange = e => {

        setPhoto( {
            url: URL.createObjectURL( e.target.files[0] )

        } );

    };

    const handlePhotoRemove = () => {
        setPhoto( {
            ...photo,
            url: ''
        } );
    };


    // ** Vars React HOOK Form
    const { register, errors, handleSubmit } = useForm();
    // ** Function to handle form submit
    const onSubmit = values => {
        if ( isObjEmpty( errors ) ) {
            toggleSidebar();
            dispatch(
                addMerchandiser( {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    name: values.name,
                    login: values.login,
                    email: values.email
                    // phoneNumber: values.phoneNumber,
                    // fax: values.fax,
                    // address: {
                    //     address: values.address,
                    //     country: values.country,

                    //     state: values.state,
                    //     city: values.city,
                    //     zipCode: values.zipCode,
                    //     street: values.street
                    // },

                    // status: 'active',
                    // photo: photo.url
                } )
            );
        }
    };


    const handleCancel = () => {
        toggleSidebar();
    };


    return <Sidebar

        size='lg'
        open={open}
        title='New Merchandiser '
        headerClassName='mb-1'
        contentClassName='pt-0'
        toggleSidebar={toggleSidebar}

    >
        <Form onSubmit={handleSubmit( onSubmit )}>

            <FormGroup>
                <Label for='firstName'>
                    First Name <span className='text-danger'>*</span>
                </Label>
                <Input
                    name='firstName'
                    id='firstName'
                    placeholder='John Doe'
                    innerRef={register( { required: true } )}
                    invalid={errors.firstName && true}
                    className={classnames( { 'is-invalid': errors['firstName'] } )}
                />
                {errors && errors.firstName && <FormFeedback>First Name is required!</FormFeedback>}

            </FormGroup>

            <FormGroup>
                <Label for='lastName'>

                    Last Name <span className='text-danger'>*</span>
                </Label>

                <Input
                    name='lastName'
                    id='lastName'
                    placeholder='John Doe'
                    innerRef={register( { required: true } )}
                    invalid={errors.lastName && true}
                    className={classnames( { 'is-invalid': errors['lastName'] } )}
                />
                {errors && errors.lastName && <FormFeedback>Last Name is required!</FormFeedback>}

            </FormGroup>

            <FormGroup>
                <Label for='name'>
                    Name <span className='text-danger'>*</span>
                </Label>
                <Input
                    name='name'
                    id='name'
                    placeholder='John Doe'
                    innerRef={register( { required: true } )}
                    invalid={errors.name && true}
                    className={classnames( { 'is-invalid': errors['name'] } )}
                />
                {errors && errors.name && <FormFeedback> Name is required!</FormFeedback>}

            </FormGroup>

            <FormGroup>
                <Label for='login'>
                    Login <span className='text-danger'>*</span>
                </Label>
                <Input
                    name='login'
                    id='login'
                    placeholder='John Doe'
                    innerRef={register( { required: true } )}
                    invalid={errors.login && true}
                    className={classnames( { 'is-invalid': errors['login'] } )}
                />
                {errors && errors.login && <FormFeedback> Login is required!</FormFeedback>}

            </FormGroup>

            <FormGroup>
                <Label for='email'>
                    Email <span className='text-danger'>*</span>
                </Label>
                <Input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='john.doe@example.com'
                    innerRef={register( { required: true } )}
                    invalid={errors.email && true}
                    className={classnames( { 'is-invalid': errors['email'] } )}
                />
                <FormText color='muted'>You can use letters, numbers & periods</FormText>
                {errors && errors.email && <FormFeedback>Email is required!</FormFeedback>}
            </FormGroup>
            {/* <FormGroup>
                <Label for='phoneNumber'>
                    Phone <span className='text-danger'>*</span>
                </Label>
                <Input
                    type='tel'
                    name='phoneNumber'
                    id='phoneNumber'
                    placeholder='(+880) 1811-275653'
                    innerRef={register( { required: true } )}
                    invalid={errors.phoneNumber && true}
                    className={classnames( { 'is-invalid': errors['phoneNumber'] } )}
                />
                {errors && errors.phoneNumber && <FormFeedback>Phone is required!</FormFeedback>}
            </FormGroup>
            <FormGroup>
                <Label for='fax'>
                    Fax <span className='text-danger'>*</span>
                </Label>
                <Input
                    name='fax'
                    id='fax'
                    placeholder='22-21421411'
                    innerRef={register( { required: true } )}
                    invalid={errors.fax && true}
                    className={classnames( { 'is-invalid': errors['fax'] } )}
                />
                {errors && errors.fax && <FormFeedback>Fax is required!</FormFeedback>}
            </FormGroup>


            <FormGroup>
                <Label for='address'>
                    Address:
                </Label>
                <Input
                    name='address'
                    type="textarea"
                    id='address'
                    placeholder='Write address'
                    innerRef={register( { required: true } )}
                    invalid={errors.address && true}
                    className={classnames( { 'is-invalid': errors['address'] } )}
                />
                {errors && errors.address && <FormFeedback>Address is required!</FormFeedback>}

            </FormGroup>

            <FormGroup>
                <Label for='country'>
                    Country
                </Label>
                <Input
                    name='country'
                    type="select"
                    id='country'
                    innerRef={register( { required: true } )}
                    invalid={errors.country && true}
                    className={classnames( { 'is-invalid': errors['country'] } )}

                >
                    {
                        selectedCountry.map( ( item ) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ) )
                    }
                </Input>
                {errors && errors.country && <FormFeedback>Country is required!</FormFeedback>}

            </FormGroup>


            <FormGroup>
                <Label for='state'>
                    State
                </Label>
                <Input
                    name='state'
                    type="select"
                    id='state'
                    innerRef={register( { required: true } )}
                    invalid={errors.state && true}
                    className={classnames( { 'is-invalid': errors['state'] } )}

                >
                    {
                        selectedCState.map( ( item ) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ) )
                    }
                </Input>
                {errors && errors.country && <FormFeedback>Country is required!</FormFeedback>}

            </FormGroup>


            <FormGroup>
                <Label for='city'>
                    City
                </Label>
                <Input
                    name='city'
                    type="select"
                    id='city'
                    innerRef={register( { required: true } )}
                    invalid={errors.city && true}
                    className={classnames( { 'is-invalid': errors['city'] } )}

                >
                    {
                        selectedCity.map( ( item ) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ) )
                    }
                </Input>
                {errors && errors.country && <FormFeedback>Country is required!</FormFeedback>}

            </FormGroup>

            <FormGroup>
                <Label for='zipCode'>
                    Zip Code <span className='text-danger'>*</span>
                </Label>
                <Input
                    name='zipCode'
                    id='zipCode'
                    placeholder='6118'
                    innerRef={register( { required: true } )}
                    invalid={errors.zipCode && true}
                    className={classnames( { 'is-invalid': errors['zipCode'] } )}
                />
                {errors && errors.zipCode && <FormFeedback>Zip Code is required!</FormFeedback>}

            </FormGroup>


            <FormGroup>
                <Label for='street'>
                    Street  <span className='text-danger'>*</span>
                </Label>
                <Input
                    name='street'
                    id='street'
                    placeholder='201,Nasirabad'
                    innerRef={register( { required: true } )}
                    invalid={errors.street && true}
                    className={classnames( { 'is-invalid': errors['street'] } )}
                />
                {errors && errors.street && <FormFeedback>Street is required!</FormFeedback>}

            </FormGroup>

            <FormGroup>


                <div className="main-div">
                    <Card className="img-holder">

                        <img src={photo.url !== "" ? photo?.url : defaultImageSrc} alt="Example" className="image" />

                        {

                            photo.url !== '' ? <div className="overlay" >
                                <div className="text">
                                    <ButtonGroup size="sm" >
                                        <Button.Ripple id='change-img' tag={Label} className='btn-icon ' color='relief-success'


                                        >
                                            <Edit size={20} />

                                            <input type='file' hidden id='change-img' onChange={handlePhotoUpload} accept='image/*' />
                                        </Button.Ripple>
                                        <Button.Ripple tag={Label} className='btn-icon ' color='relief-danger'>
                                            <XCircle size={20} onClick={() => { handlePhotoRemove(); }} />

                                        </Button.Ripple>
                                    </ButtonGroup>


                                </div>
                            </div> : <div className="overlay" >
                                <div className="text">
                                    <Button.Ripple id='change-img' tag={Label} className='btn-icon ' color='relief-primary'


                                    >

                                        <Upload size={20} />
                                        <input type='file' hidden id='change-img' onChange={handlePhotoUpload} accept='image/*' />
                                    </Button.Ripple>

                                </div>
                            </div>
                        }

                    </Card>


                </div>


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

    </Sidebar>;
};

export default MerchandiserAddForm;
