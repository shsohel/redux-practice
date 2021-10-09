import Sidebar from '@components/sidebar';
import { isObjEmpty } from '@utils';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap';
import { selectedCity, selectedCountry, selectedState } from '../../../../utility/enums';
import { getDropDownBuyers } from '../../buyer/store/actions';
import { addBuyerProductDeveloper } from '../store/actions';


const defaultImageSrc = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

const BuyerProductDeveloperAddForm = ( { open, toggleSidebar } ) => {
    // ** Store Vars
    const dispatch = useDispatch();

    const { dropDownBuyers } = useSelector( ( { buyers } ) => buyers );

    const [photo, setPhoto] = useState( { url: '' } );
    const [buyer, setBuyer] = useState( null );


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

    useEffect( () => {
        dispatch( getDropDownBuyers() );
    }, [] );


    const { register, errors, handleSubmit } = useForm();
    // ** Function to handle form submit
    const onSubmit = values => {
        if ( isObjEmpty( errors ) ) {
            toggleSidebar();
            dispatch(
                addBuyerProductDeveloper( {

                    name: values.name,
                    shortName: values.shortName,
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                    fullAddress: values.fullAddress,
                    state: values.state,
                    postalCode: values.postalCode,
                    city: values.city,
                    country: values.country
                    // imageUrl: ""


                    // fullName: values.fullName,
                    // email: values.email,
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
                    // buyer: buyer.label,
                    // status: 'active',
                    // photo: photo.url
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
            title='New Buyer Product Developer'
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebar}

        >
            <Form onSubmit={handleSubmit( onSubmit )} autoComplete="off">

                {/* <FormGroup>

                    <Label className="text-dark font-weight-bold" for='buyer'>  Buyer </Label>
                    <CreatableSelect
                        id='buyer'
                        isSearchable
                        isClearable
                        theme={selectThemeColors}
                        options={dropDownBuyers}
                        classNamePrefix='select'
                        innerRef={register( { required: true } )}

                        value={buyer}
                        onChange={data => {
                            setBuyer( data );
                        }}
                    />
                    {errors && errors.buyer && <FormFeedback>Buyer is required!</FormFeedback>}

                </FormGroup> */}

                <FormGroup>
                    <Label for="name">
                        Name <span className="text-danger">*</span>
                    </Label>
                    <Input
                        name="name"
                        id="name"
                        placeholder="Kevin Pietersen"
                        innerRef={register( { required: true } )}
                        invalid={errors.name && true}
                        className={classnames( { "is-invalid": errors["name"] } )}
                    />
                    {errors && errors.name && (
                        <FormFeedback>Name is required!</FormFeedback>
                    )}
                </FormGroup>

                <FormGroup>
                    <Label for="shortName">
                        Short Name <span className="text-danger">*</span>
                    </Label>
                    <Input
                        name="shortName"
                        id="shortName"
                        placeholder="Kevin Pietersen"
                        innerRef={register( { required: true } )}
                        invalid={errors.shortName && true}
                        className={classnames( { "is-invalid": errors["shortName"] } )}
                    />
                    {errors && errors.shortName && (
                        <FormFeedback>Short Name is required!</FormFeedback>
                    )}
                </FormGroup>

                <FormGroup>
                    <Label for="email">
                        Email <span className="text-danger">*</span>
                    </Label>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="kavin@example.com"
                        innerRef={register( { required: true } )}
                        invalid={errors.email && true}
                        className={classnames( { "is-invalid": errors["email"] } )}
                    />
                    <FormText color="muted">
                        You can use letters, numbers & periods
                    </FormText>
                    {errors && errors.email && (
                        <FormFeedback>Email is required!</FormFeedback>
                    )}
                </FormGroup>
                <FormGroup>
                    <Label for="phoneNumber">
                        Phone <span className="text-danger">*</span>
                    </Label>
                    <Input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="(+880) 1811-275653"
                        innerRef={register( { required: true } )}
                        invalid={errors.phoneNumber && true}
                        className={classnames( { "is-invalid": errors["phoneNumber"] } )}
                    />
                    {errors && errors.phoneNumber && (
                        <FormFeedback>Phone is required!</FormFeedback>
                    )}
                </FormGroup>

                <FormGroup>
                    <Label for="fullAddress">Address:</Label>
                    <Input
                        name="fullAddress"
                        type="textarea"
                        id="fullAddress"
                        placeholder="Write fullAddress"
                        innerRef={register( { required: true } )}
                        invalid={errors.fullAddress && true}
                        className={classnames( { "is-invalid": errors["fullAddress"] } )}
                    />
                    {errors && errors.fullAddress && (
                        <FormFeedback>Address is required!</FormFeedback>
                    )}
                </FormGroup>

                <FormGroup>
                    <Label for="country">Country</Label>
                    <Input
                        name="country"
                        type="select"
                        id="country"
                        innerRef={register( { required: true } )}
                        invalid={errors.country && true}
                        className={classnames( { "is-invalid": errors["country"] } )}
                    >
                        {selectedCountry.map( ( item ) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ) )}
                    </Input>
                    {errors && errors.country && (
                        <FormFeedback>Country is required!</FormFeedback>
                    )}
                </FormGroup>

                <FormGroup>
                    <Label for="state">State</Label>
                    <Input
                        name="state"
                        type="select"
                        id="state"
                        innerRef={register( { required: true } )}
                        invalid={errors.state && true}
                        className={classnames( { "is-invalid": errors["state"] } )}
                    >
                        {selectedState.map( ( item ) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ) )}
                    </Input>
                    {errors && errors.state && (
                        <FormFeedback>State is required!</FormFeedback>
                    )}
                </FormGroup>

                <FormGroup>
                    <Label for="city">City</Label>
                    <Input
                        name="city"
                        type="select"
                        id="city"
                        innerRef={register( { required: true } )}
                        invalid={errors.city && true}
                        className={classnames( { "is-invalid": errors["city"] } )}
                    >
                        {selectedCity.map( ( item ) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ) )}
                    </Input>
                    {errors && errors.city && (
                        <FormFeedback>City is required!</FormFeedback>
                    )}
                </FormGroup>

                <FormGroup>
                    <Label for="postalCode">
                        Postal Code <span className="text-danger">*</span>
                    </Label>
                    <Input
                        name="postalCode"
                        id="postalCode"
                        placeholder="6118"
                        innerRef={register( { required: true } )}
                        invalid={errors.postalCode && true}
                        className={classnames( { "is-invalid": errors["postalCode"] } )}
                    />
                    {errors && errors.postalCode && (
                        <FormFeedback>Postal Code is required!</FormFeedback>
                    )}
                </FormGroup>


                {/* <FormGroup>
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
                <Button.Ripple type='reset' className='mr-1' outline color='secondary' >
                    Reset
                </Button.Ripple>
                <Button.Ripple type='reset' color='danger' outline onClick={() => { handleCancel(); }}>
                    Cancel
                </Button.Ripple>
            </Form>
        </Sidebar>
    );
};

export default BuyerProductDeveloperAddForm;
