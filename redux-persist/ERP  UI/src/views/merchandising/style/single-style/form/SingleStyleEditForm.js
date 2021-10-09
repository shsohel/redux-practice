import '@styles/react/merchandising/merchandising-style.scss';
import { isObjEmpty } from '@utils';
import classnames from 'classnames';
import React, { Fragment, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Delete } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import { randomIdGenerator, selectThemeColors } from '../../../../../utility/Utils';
import { selectedStyleNull, updateStyle } from '../store/actions';

//Division Array Demo
const selectDivision = [
    { value: 'boys', label: 'Boys' },
    { value: 'girls', label: 'Girls' },
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' }
];
//Merchandising Style Array Demo
const selectMerchandisingStyle = [
    { value: 'merchansingStyle 01', label: 'Merchandising Style 01' },
    { value: 'merchansingStyle 02', label: 'Merchandising Style 02' },
    { value: 'merchansingStyle 03', label: 'Merchandising Style 03' },
    { value: 'merchansingStyle 04', label: 'Merchandising Style 04' }
];
const SingleStyleEditForm = ( { data } ) => {

    const dispatch = useDispatch();

    const divisionDefault = selectDivision.find( item => item.label === data.division );
    const merchandisingStyleDefault = selectMerchandisingStyle.find( item => item.label === data.merchandisingStyle );

    const [division, setDivision] = useState( divisionDefault );
    const [merchandisingStyle, setMerchandisingStyle] = useState( merchandisingStyleDefault );

    const [uploadFiles, setuploadFiles] = useState( {
        images: data?.images
    } );

    const handlePhotoChange = async files => {
        const updatedPhotos = await files.map( file => ( {
            id: randomIdGenerator(),
            urls: URL.createObjectURL( file )
        } ) );
        setuploadFiles( {
            ...uploadFiles,
            images: [...uploadFiles.images, ...updatedPhotos]
        } );
    };

    const handlePhotoRemove = imageId => {
        const imagesFiles = [...uploadFiles.images];
        imagesFiles.splice(
            imagesFiles.findIndex( value => value.id === imageId ),
            1
        );
        setuploadFiles( {
            ...uploadFiles,
            images: imagesFiles
        } );
    };

    const { getRootProps, getInputProps } = useDropzone( {
        accept: 'image/*',
        onDrop: ( acceptedFiles ) => {
            handlePhotoChange( acceptedFiles );
        }
    } );

    const { register, errors, handleSubmit } = useForm();

    const onSubmit = ( values ) => {
        if ( isObjEmpty( errors ) ) {
            dispatch(
                updateStyle( {
                    id: data.id,
                    modelNo: values.styleModelNo,
                    merchandisingStyle: merchandisingStyle?.label,
                    division: division?.label,
                    description: values.description,
                    images: uploadFiles.images,
                    status: 'active'
                } )
            );
            dispatch( selectedStyleNull() );
        }
    };
    const handleCancel = () => {
        dispatch( selectedStyleNull() );
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>New Style</CardTitle>
                </CardHeader>

                <CardBody>
                    <Form onSubmit={handleSubmit( onSubmit )}>
                        <Row>
                            <Col md='4' sm='12'>
                                <FormGroup>
                                    <Label for='styleModelNo'>Style Model No</Label>
                                    <Input
                                        type='text'
                                        name='styleModelNo'
                                        defaultValue={data.modelNo}
                                        id='styleModelNo'
                                        innerRef={register( { required: true } )}
                                        invalid={errors.descriotion && true}
                                        className={classnames( { 'is-invalid': errors['styleModelNo'] } )}
                                    />
                                    {errors && errors.styleModelNo && <FormFeedback>Style Model No is required!</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col md='4' sm='12'>
                                <FormGroup>
                                    <Label for='sDivsion'>Division</Label>
                                    <CreatableSelect
                                        isSearchable
                                        isClearable
                                        id='sDivsio'
                                        theme={selectThemeColors}
                                        // defaultValue={selectDivision.find( item => item.value === data.division )}
                                        options={selectDivision}
                                        classNamePrefix='select'
                                        innerRef={register( { required: true } )}
                                        // className={classnames( 'react-select', { 'is-invalid': division === null } )}
                                        value={division}
                                        onChange={data => {
                                            setDivision( data );
                                        }}
                                    />
                                    {/* {division === null && <FormFeedback>Divsion is required!</FormFeedback>} */}
                                </FormGroup>
                            </Col>
                            <Col md='4' sm='12'>
                                <FormGroup>
                                    <Label for='mStyle'>Merchandising Style</Label>
                                    <CreatableSelect
                                        id='mStyle'
                                        isClearable
                                        isSearchable
                                        name='merchandsingStyle'
                                        theme={selectThemeColors}
                                        options={selectMerchandisingStyle}
                                        className='react-select'
                                        innerRef={register( { required: true } )}
                                        classNamePrefix='select'
                                        value={merchandisingStyle}
                                        onChange={data => {
                                            setMerchandisingStyle( data );
                                        }}
                                    />
                                    {errors && errors.merchandsingStyle && <FormFeedback>Merchandising Style</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col md='12' sm='12'>
                                <FormGroup>
                                    <Label for='description'>Description</Label>
                                    <Input
                                        name='description'
                                        type="textarea"
                                        id='description'
                                        defaultValue={data.description}
                                        placeholder='Write a short description'
                                        innerRef={register( { required: true } )}
                                        invalid={errors.description && true}
                                        className={classnames( { 'is-invalid': errors['description'] } )}
                                    />
                                    {errors && errors.description && <FormFeedback>Description is required!</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col md="12">
                                <CardHeader>
                                    <CardTitle tag='h4'>Sample Images</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div >
                                        <div  {...getRootProps( { className: 'style-upload-main ' } )}>
                                            <input {...getInputProps()} />
                                            <p>Drop the files here ...</p>
                                        </div>
                                    </div>
                                </CardBody>
                                {
                                    uploadFiles?.images.length > 0 &&
                                    <CardBody className='mt-1'>
                                        <div className='style-upload-images-show'>
                                            {
                                                uploadFiles?.images?.map( file => (
                                                    <Fragment key={file.id}>
                                                        <img className='style-upload-image border border-primary img-thumbnail p-2' src={file.urls} alt="" />
                                                        <Delete className='upload-image-remove-btn' color='red' onClick={() => { handlePhotoRemove( file.id ); }} />
                                                    </Fragment>
                                                ) )
                                            }
                                        </div>
                                    </CardBody>

                                }
                            </Col>
                            <Col sm='12'>
                                <FormGroup className='d-flex mb-0'>
                                    <Button.Ripple className='mr-1' color='success' type='submit' >
                                        Submit
                                    </Button.Ripple>
                                    <Button.Ripple color='danger' type='reset' onClick={() => { handleCancel(); }}>
                                        Cancel
                                    </Button.Ripple>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>


        </div >
    );
};

export default SingleStyleEditForm;
