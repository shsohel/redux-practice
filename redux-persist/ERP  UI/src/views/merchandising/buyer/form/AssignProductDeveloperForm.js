import Sidebar from '@components/sidebar';
import { isObjEmpty } from '@utils';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { selectThemeColors } from '../../../../utility/Utils';
import { getDropDownBuyerProductDevelopers } from '../../buyer-product-developer/store/actions';
import { addBuyerSpecificProductDeveloper, handleAssignProductDeveloper } from '../store/actions';


const AssignProductDeveloperForm = ( { open, data } ) => {

    // ** Store Vars
    const dispatch = useDispatch();
    const { dropDownProductDevelopers } = useSelector( ( { productDevelopers } ) => productDevelopers );

    // const [exitingAgent, setExitingAgent] = useState( data?.buyerAgents );

    const [productDeveloper, setProductDeveloper] = useState( dropDownProductDevelopers );

    //#Hook
    useEffect( () => {
        dispatch( getDropDownBuyerProductDevelopers() );
    }, [] );

    const { register, errors, handleSubmit } = useForm();

    const handleCancel = () => {
        dispatch( handleAssignProductDeveloper( null ) );
    };

    const onSubmit = () => {
        const buyerAgentMuted = productDeveloper.map( i => i.value );
        if ( isObjEmpty( errors ) ) {
            dispatch(
                addBuyerSpecificProductDeveloper( {
                    id: data.buyerId,
                    productDeveloperIds: buyerAgentMuted
                } )
            );
            handleCancel();
        }
    };

    // const comparerForDelete = ( inputValue ) => {
    //     return function ( exitingAgents ) {
    //         return inputValue.filter( function ( other ) {
    //             return other.value === exitingAgents.value;
    //         } ).length === 0;
    //     };
    // };

    // const handleAssignAgentDropDown = ( inputValue ) => {
    //     const updateAgents = [...exitingAgent];
    //     setBuyerAgent( inputValue );
    //     const findLastDeletedAgent = updateAgents?.find( comparerForDelete( inputValue ) );
    //     if ( findLastDeletedAgent !== undefined ) {
    //         console.log( findLastDeletedAgent.value );
    //     }
    // };


    return (
        <Sidebar
            size='lg'
            open={open}
            title='Assign Buyer Product Developer'
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={handleCancel}
        >
            <Form onSubmit={handleSubmit( onSubmit )} autoComplete="off">
                <FormGroup>
                    <Label for='name'>
                        Name <span className='text-danger'>*</span>
                    </Label>
                    <Input
                        name='name'
                        id='name'
                        disabled
                        placeholder='John Doe'
                    //defaultValue={data.buyerName}
                    />
                    {errors && errors.name && <FormFeedback>Name is required!</FormFeedback>}

                </FormGroup>

                <FormGroup>
                    <Label className="text-dark font-weight-bold" for='productDeveloperIds'> Select Product Developer </Label>
                    <CreatableSelect
                        id='productDeveloperIds'
                        isMulti
                        isSearchable
                        isClearable
                        theme={selectThemeColors}
                        options={dropDownProductDevelopers}
                        classNamePrefix='select'
                        innerRef={register( { required: true } )}
                        value={productDeveloper}
                        onChange={data => {
                            setProductDeveloper( data );
                        }}
                    />
                    {errors && errors.productDeveloperIds && <FormFeedback>Product Developer is required!</FormFeedback>}
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

export default AssignProductDeveloperForm;
