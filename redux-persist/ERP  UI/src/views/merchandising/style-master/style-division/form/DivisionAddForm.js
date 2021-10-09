import Sidebar from '@components/sidebar';
import { isObjEmpty } from '@utils';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { createOption, selectThemeColors } from '../../../../../utility/Utils';
import { addDepartment, getDropDownDepartments } from '../../style-department/store/actions';
import { addDivision } from '../store/actions';


const DivisionAddForm = ( { open, toggleSidebar } ) => {
    const dispatch = useDispatch();
    const { dropDownDepartments, lastCreatedId } = useSelector( ( { departments } ) => departments );
    console.log( dropDownDepartments );
    const [department, setDepartment] = useState( [] );

    useEffect( () => {
        dispatch( getDropDownDepartments() );
    }, [] );

    const handleStyleDepartmentCreation = ( newValue ) => {
        dispatch( addDepartment( {
            name: newValue,
            description: newValue
        } ) );

        setTimeout( () => {
            const newOption = createOption( newValue, lastCreatedId );
            console.log( newOption );
            setDepartment( [...department, newOption] );
        }, 3000 );
    };

    // ** Vars React HOOK Form
    const { register, errors, handleSubmit } = useForm();
    // ** Function to handle form submit
    const onSubmit = values => {
        const departmentMuted = department.map( i => i.value );
        if ( isObjEmpty( errors ) ) {
            toggleSidebar();
            dispatch(
                addDivision( {
                    name: values.name,
                    styleDepartmentIds: departmentMuted,
                    description: values.description
                    //status: values.status
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
            title='New Style Division '
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
                        placeholder='Knit'
                        innerRef={register( { required: true } )}
                        invalid={errors.name && true}
                        className={classnames( { 'is-invalid': errors['name'] } )}
                    />
                    {errors && errors.name && <FormFeedback>Name is required!</FormFeedback>}

                </FormGroup>

                <FormGroup>

                    <Label className="text-dark font-weight-bold" for='styleDepartmentIds'> Select Department </Label>
                    <CreatableSelect
                        id='styleDepartmentIds'
                        isMulti
                        isSearchable
                        isClearable
                        theme={selectThemeColors}
                        options={dropDownDepartments}
                        classNamePrefix='select'
                        innerRef={register( { required: true } )}
                        onCreateOption={data => { handleStyleDepartmentCreation( data ); }}
                        value={department}
                        onChange={data => {
                            setDepartment( data );
                        }}
                    />
                    {errors && errors.styleDepartmentIds && <FormFeedback>department is required!</FormFeedback>}

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

        </Sidebar>
    );
};

export default DivisionAddForm;
