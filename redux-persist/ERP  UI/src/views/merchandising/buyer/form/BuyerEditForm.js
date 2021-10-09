import Sidebar from '@components/sidebar';
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
import { selectedBuyerNull, updateBuyer } from '../store/actions';


const BuyerEditForm = ( { open, toggleSidebar, data } ) => {
  // ** Store Vars
  const dispatch = useDispatch();

  const { dropDownDepartments } = useSelector( ( { departments } ) => departments );
  // const existingBuyerDepartment = data.buyerDepartment.map( i => ( {
  //   value: i.id,
  //   label: i.name
  // } ) );
  const existingBuyerDepartment = data?.departments ? data?.departments?.map( i => ( { value: i?.id, label: i?.name } ) ) : [];
  const [photo, setPhoto] = useState( { url: data?.photo } );
  const [buyerDepartment, setBuyerDepartment] = useState( existingBuyerDepartment );

  //#Hook
  useEffect( () => {
    // dispatch( getDropDownDepartments() );
  }, [] );


  //# UDF
  const handlePhotoUpload = e => {
    setPhoto( {
      url: URL.createObjectURL( e.target.files[0] )
    } );
  };

  // ** Vars
  const { register, errors, handleSubmit } = useForm();
  // ** Function to handle form submit
  const onSubmit = values => {
    const buyerDepartmentMuted = buyerDepartment.map( i => i.value );
    // const buyerDepartmentMuted = buyerDepartment.map( i => ( {
    //   id: i.value,
    //   name: i.label
    // } ) );
    if ( isObjEmpty( errors ) ) {
      toggleSidebar();

      dispatch(
        updateBuyer(
          {
            id: data.id,
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
        )
      );
      dispatch(
        selectedBuyerNull() );
    }
  };

  const handleCancel = () => {
    toggleSidebar();
    dispatch( selectedBuyerNull() );
  };

  const handlePhotoRemove = () => {
    setPhoto( {
      ...photo,
      url: ''
    } );
  };

  return (
    <Sidebar
      size='lg'
      open={open}
      title='Edit Buyer'
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
            defaultValue={data.name}
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
            defaultValue={data.shortName}

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
            defaultValue={data.email}
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
          <Label for='phone'>
            Phone <span className='text-danger'>*</span>
          </Label>
          <Input
            type='tel'
            name='phoneNumber'
            defaultValue={data.phoneNumber}
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
            id='address'
            placeholder='Write address'
            defaultValue={data.fullAddress}
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
            defaultValue={data.country}
            innerRef={register( { required: true } )}
            invalid={errors.country && true}
            className={classnames( { 'is-invalid': errors['country'] } )}
          >
            {
              selectedCountry.map( ( item ) => (
                <option key={item.value} value={item.label}>{item.label}</option>
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
            defaultValue={data.state}
            innerRef={register( { required: true } )}
            invalid={errors.state && true}
            className={classnames( { 'is-invalid': errors['state'] } )}

          >
            {
              selectedState.map( ( item ) => (
                <option key={item.value} value={item.label}>{item.label}</option>
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
            defaultValue={data.city}

            innerRef={register( { required: true } )}
            invalid={errors.city && true}
            className={classnames( { 'is-invalid': errors['city'] } )}
          >
            {
              selectedCity.map( ( item ) => (
                <option key={item.value} value={item.label}>{item.label}</option>
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
            defaultValue={data.postalCode}
            innerRef={register( { required: true } )}
            invalid={errors.postalCode && true}
          />
          {errors && errors.postalCode && <FormFeedback>Postal Code is required!</FormFeedback>}
        </FormGroup>

        <FormGroup>
          <div className="main-div">
            <Card className="img-holder">

              <img src={photo.url !== "" ? photo?.url : data?.imageUrl} alt="Example" className="image" />

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
        <Button type='reset' color='danger' outline onClick={() => { handleCancel(); }}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  );
};

export default BuyerEditForm;
