
import Sidebar from '@components/sidebar';
import { isObjEmpty } from '@utils';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { selectThemeColors } from '../../../../../utility/Utils';
import { getDropDownDepartments } from '../../style-department/store/actions';
import { selectedDivisionNull, updateDivision } from '../store/actions';


const DivisionEditForm = ( { open, toggleSidebar, data } ) => {

    // ** Store Vars
    const dispatch = useDispatch();
    //** State */ 
    const { dropDownDepartments } = useSelector( ( { departments } ) => departments );

    const exitingDepartment = data?.styleDepartments ? data?.styleDepartments?.map( i => ( { value: i?.id, label: i?.name } ) ) : null;

    // const exitingDepartment = data.department.map( i => ( {
    //     value: i.id,
    //     label: i.name
    // } ) );

    const [department, setDepartment] = useState( exitingDepartment );

    //Hook
    useEffect( () => {
        dispatch( getDropDownDepartments() );
    }, [] );

    const { register, errors, handleSubmit } = useForm();
    // ** Function to handle form submit
    const onSubmit = values => {
        const departmentMuted = department.map( i => i.value );

        // const departmentMuted = department.map( i => ( {
        //     id: i.value,
        //     name: i.label
        // } ) );
        if ( isObjEmpty( errors ) ) {
            toggleSidebar();
            dispatch(
                updateDivision( {
                    id: data.id,
                    name: values.name,
                    styleDepartmentIds: departmentMuted,
                    description: values.description

                    //status: values.status
                } )
            );
            dispatch(
                selectedDivisionNull() );
        }

    };
    //Events
    const handleCancel = () => {
        toggleSidebar();
        dispatch( selectedDivisionNull() );
    };


    return (
        <Sidebar

            size='lg'
            open={open}
            title='Edit Style Division '
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
                        defaultValue={data.name}

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
                        defaultValue={data.description}

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
                            defaultChecked={data.status}
                            innerRef={register( { required: false } )}

                        />

                        <span> Active</span>
                    </FormGroup>

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

export default DivisionEditForm;
