import Sidebar from '@components/sidebar';
import defaultImageSrc from '@src/assets/images/avatars/avatar-blank.png';
import { isObjEmpty } from '@utils';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Edit, Upload, XCircle } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { Button, Form, FormFeedback, FormGroup, FormText, Input, Label } from 'reactstrap';
import ButtonGroup from 'reactstrap/lib/ButtonGroup';
import Card from 'reactstrap/lib/Card';
import { selectedCity, selectedCountry, selectedState } from '../../../../utility/enums';
import { selectThemeColors } from '../../../../utility/Utils';
import { getDropDownBuyerAgents } from '../../buyer-agent/store/actions';
import { getDropDownDepartments } from '../../style-master/style-department/store/actions';
import { addBuyer } from '../store/actions';


const BuyerAddForm = ( { open, toggleSidebar, buyerName, addInstantCreate } ) => {
    // ** Store Vars
    const dispatch = useDispatch();
    const { dropDownDepartments } = useSelector( ( { departments } ) => departments );
    const { dropDownBuyerAgents } = useSelector( ( { buyerAgents } ) => buyerAgents );


    //** State */
    const [photo, setPhoto] = useState( { url: '' } );
    const [buyerDepartment, setBuyerDepartment] = useState( null );
    const [buyerAgent, setBuyerAgent] = useState( null );

    useEffect( () => {
        dispatch( getDropDownDepartments() );
        dispatch( getDropDownBuyerAgents() );
    }, [] );
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

    const { register, errors, handleSubmit } = useForm();
    const onSubmit = values => {
        const buyerDepartmentMuted = buyerDepartment.map( i => i.value );
        // const buyerAgentMuted = buyerAgent.map( i => i.value );
        if ( isObjEmpty( errors ) ) {
            toggleSidebar();
            if ( buyerName ) {
                addInstantCreate(
                    {
                        name: values.name,
                        shortName: values.shortName,
                        email: values.email,
                        phoneNumber: values.phoneNumber,
                        fullAddress: values.fullAddress,
                        state: values.state,
                        postalCode: values.postalCode,
                        city: values.city,
                        country: values.country,
                        departmentIds: buyerDepartmentMuted,
                        //  agentIds: buyerAgentMuted,
                        imageUrl: ""
                    }
                );
            } else {
                dispatch(
                    addBuyer( {
                        name: values.name,
                        shortName: values.shortName,
                        email: values.email,
                        phoneNumber: values.phoneNumber,
                        fullAddress: values.fullAddress,
                        state: values.state,
                        postalCode: values.postalCode,
                        city: values.city,
                        country: values.country,
                        departmentIds: buyerDepartmentMuted,
                        // agentIds: buyerAgentMuted,
                        imageUrl: ""
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
            title='New Buyer'
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebar}
        >
            <Form onSubmit={handleSubmit( onSubmit )} autoComplete="off">
                <FormGroup>
                    <Label for='name'>
                        Name <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        name='name'
                        id='name'
                        placeholder='John Doe'
                        defaultValue={buyerName ? buyerName : ''}
                        // value={buyerName ? buyerName : ''}
                        innerRef={register( { required: true } )}
                        invalid={errors.name && true}
                        className={classnames( { 'is-invalid': errors['name'] } )}
                    />
                    {errors && errors.name && <FormFeedback>Name is required!</FormFeedback>}

                </FormGroup>
                <FormGroup>
                    <Label for='shortName'>
                        Short Name <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        name='shortName'
                        id='shortName'
                        placeholder='John Doe'
                        innerRef={register( { required: true } )}
                        invalid={errors.shortName && true}
                        className={classnames( { 'is-invalid': errors['shortName'] } )}
                    />
                    {errors && errors.shortName && <FormFeedback>Short Name is required!</FormFeedback>}

                </FormGroup>
                <FormGroup>
                    <Label className="text-dark font-weight-bold" for='departmentIds'> Select Buyer Department </Label>
                    <CreatableSelect
                        id='departmentIds'
                        isMulti
                        isSearchable
                        isClearable
                        theme={selectThemeColors}
                        options={dropDownDepartments}
                        classNamePrefix='select'
                        innerRef={register( { required: true } )}

                        value={buyerDepartment}
                        onChange={data => {
                            setBuyerDepartment( data );
                        }}
                    />
                    {errors && errors.departmentIds && <FormFeedback>Buyer Department is required!</FormFeedback>}
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
                <FormGroup>
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
                    <Label for='fullAddress'>
                        Address:
                    </Label>
                    <Input
                        name='fullAddress'
                        type="textarea"
                        id='fullAddress'
                        placeholder='Write address'
                        innerRef={register( { required: true } )}
                        invalid={errors.fullAddress && true}
                        className={classnames( { 'is-invalid': errors['fullAddress'] } )}
                    />
                    {errors && errors.fullAddress && <FormFeedback>Address is required!</FormFeedback>}
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
                            selectedState.map( ( item ) => (
                                <option key={item.value} value={item.value}>{item.label}</option>
                            ) )
                        }
                    </Input>
                    {errors && errors.state && <FormFeedback>State is required!</FormFeedback>}
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
                    {errors && errors.city && <FormFeedback>City is required!</FormFeedback>}
                </FormGroup>

                <FormGroup>
                    <Label for='postalCode'>
                        Postal Code <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        name='postalCode'
                        id='postalCode'
                        placeholder='6118'
                        innerRef={register( { required: true } )}
                        invalid={errors.postalCode && true}
                        className={classnames( { 'is-invalid': errors['postalCode'] } )}
                    />
                    {errors && errors.postalCode && <FormFeedback>Postal Code is required!</FormFeedback>}
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
                </FormGroup>
                <Button type='submit' className='mr-1' color='primary'>
                    Submit
                </Button>
                <Button type='reset' className='mr-1' outline color='secondary' >
                    Reset
                </Button>
                <Button type='reset' color='danger' outline onClick={() => { handleCancel(); }}>
                    Cancel
                </Button>
            </Form>
        </Sidebar>
    );
};

export default BuyerAddForm;
