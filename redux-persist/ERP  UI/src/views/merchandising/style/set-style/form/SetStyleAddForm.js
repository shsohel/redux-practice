import Avatar from '@components/avatar';
import '@custom-styles/merchandising/merchandising-core.scss';
import { notify } from "@custom/notifications";
import { baseAxios } from "@services";
import { store } from '@store/storeConfig/store';
import classnames from 'classnames';
import React, { Fragment, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Check, CheckSquare, Plus, Square, Upload, X, XSquare } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import CreatableSelect from 'react-select/creatable';
import { Badge, Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Col, CustomInput, Form, FormFeedback, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import { merchandisingApi } from '../../../../../services/api-end-points/merchandising';
import { status as insertStatus } from "../../../../../utility/enums";
import { createOption, formatDate, isObjEmpty, randomIdGenerator, selectThemeColors } from '../../../../../utility/Utils';
import { getCascadeDropDownBuyerAgents } from '../../../buyer-agent/store/actions';
import { getCascadeDropDownBuyerDepartments } from '../../../buyer-department/store/actions';
import { getCascadeDropDownBuyerProductDevelopers } from '../../../buyer-product-developer/store/actions';
import BuyerAddForm from '../../../buyer/form/BuyerAddForm';
import { getDropDownBuyers, handleOpenBuyerSidebar } from '../../../buyer/store/actions';
import ColorAddForm from '../../../color/form/ColorAddForm';
import { getDropDownColors, handleOpenColorSidebar } from '../../../color/store/actions';
import { getDropDownSeasons } from '../../../season/store/actions';
import SizeGroupAddForm from '../../../size-group/form/SizeGroupAddForm';
import { getDropDownSizeGroups, handleOpenSizeGroupSidebar } from '../../../size-group/store/actions';
import StatusAddForm from '../../../status/form/StatusAddForm';
import { getDropDownStatuses, handleOpenStatusSidebar } from '../../../status/store/actions';
import { addSetStyle } from '../store/actions';
import SetStyleDetailsAddForm from './SetStyleDetailsAddForm';
import SetStyleDocumentTable from "./SetStyleDocumentTable";
import SetStylePhoto from "./SetStylePhoto";


const Label2 = () => (
    <Fragment>
        <span className='switch-icon-left'>
            <Check size={14} />
        </span>
        <span className='switch-icon-right'>
            <X size={14} />
        </span>
    </Fragment>
);
const selectSizeGroups = [
    { value: 'S-M', label: 'S-M' },
    { value: 'S-X', label: 'S-X' },
    { value: 'S-XXL', label: 'S-XXK' },
    { value: 'M-XLL', label: 'M-XLL' }
];
const selectColor = [
    { value: 'red', label: 'Red' },
    { value: 'black', label: 'Black' },
    { value: 'blue', label: 'Blue' }
];

//season Array Demo
const selectSession = [
    { value: 'winter-22', label: 'Winter-22' },
    { value: 'autumn-20', label: 'Autumn-20' },
    { value: 'autumn-21', label: 'Autumn-21' },
    { value: 'autumn-22', label: 'Autumn-22' }
];

///Year 
const selectYear = [
    { value: '2019', label: '2019' },
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' }
];


const selectBuyer = [
    {
        value: 'youngLimited',
        label: 'Young Ltd',
        buyerAgent: [{ value: 'youngagent', label: 'Young Agent' }],
        buyerDepartment: [{ value: 'wildfox', label: 'Wild Fox' }],
        buyerProductdeveloper: [{ value: 'abdulKarim', label: 'Abdul Karim' }]
    }
];


const selectStatus = [
    { value: 'Inquiry', label: 'Inquiry' },
    { value: 'Confirm', label: 'Confirm' },
    { value: 'Closed', label: 'Closed' },
    { value: 'InProduction', label: 'In Production' }
];
const selectDocCategory = [
    { value: 'ApprovalLetter', label: 'Approval Letter' },
    { value: 'StyleArtwork', label: 'Style Artwork' },
    { value: 'StyleSampleDoc', label: 'Style Sample Doc' }
];

const selectSampleAssignee = [
    { value: 'SohagAbdullah', label: 'Sohag Abdullah' },
    { value: 'MilonMahmud', label: 'Milon Mahmud' }
];
const selectProductionProcess = [
    { value: 'CSF', label: 'CSF(Cutting, Swing, Finishing)' },
    { value: 'CSDF', label: 'CSDF(Cutting, Swing,Dyeing, Finishing)' }
];

const initialFilesUpload = {
    id: 0,
    name: '',
    type: '',
    uploadDate: '',
    revisionNo: 1,
    documentCategory: null
};

const SetStyleAddForm = () => {
    const { replace } = useHistory;
    const dispatch = useDispatch();
    const { dropDownSeasons } = useSelector( ( { seasons } ) => seasons );
    const { dropDownBuyerDepartments } = useSelector( ( { buyerDepartments } ) => buyerDepartments );
    const { dropDownBuyerAgents } = useSelector( ( { buyerAgents } ) => buyerAgents );
    const { dropDownProductDevelopers } = useSelector( ( { productDevelopers } ) => productDevelopers );


    const [buyerName, setBuyerName] = useState( null );
    const { dropDownBuyers, openBuyerSidebar } = useSelector( ( { buyers } ) => buyers );
    const buyerToggleSidebar = () => store.dispatch( handleOpenBuyerSidebar( !openBuyerSidebar ) );

    const [sizeGroupName, setSizeGroupName] = useState( null );
    const { dropDownSizeGroups, openSizeGroupSidebar } = useSelector( ( { sizeGroups } ) => sizeGroups );
    const sizeGroupToggleSidebar = () => store.dispatch( handleOpenSizeGroupSidebar( !openSizeGroupSidebar ) );

    const [colorName, setColorName] = useState( null );
    const { dropDownColors, openColorSidebar } = useSelector( ( { colors } ) => colors );
    const colorToggleSidebar = () => store.dispatch( handleOpenColorSidebar( !openColorSidebar ) );

    const [statusName, setStatusName] = useState( null );
    const { dropDownStatuses, openStatusSidebar } = useSelector( ( { statuses } ) => statuses );
    const statusToggleSidebar = () => store.dispatch( handleOpenStatusSidebar( !openStatusSidebar ) );


    const [season, setSeason] = useState( null );

    const [year, setYear] = useState( null );
    const [buyer, setBuyer] = useState( null );
    const [buyerDepartment, setbuyerDepartment] = useState( null );
    const [buyerAgent, setBuyerAgent] = useState( null );
    const [buyerProductdeveloper, setBuyerProductdeveloper] = useState( null );

    const [status, setStatus] = useState( null );
    const [sampleAssignee, setSampleAssignee] = useState( null );
    const [productionProcess, setProductionProcess] = useState( null );
    ///For Document Upload
    const [filesTable, setFilesTable] = useState( [] );
    const [uploadFiles, setuploadFiles] = useState( initialFilesUpload );

    ///For Photo Upload
    const [photos, setPhotos] = useState( [] );
    const [uploadedPhoto, setUploadedPhoto] = useState( [] );

    /// Color Size Spacification
    const [colorSizeSpecification, setColorSizeSpecification] = useState( {
        colorSpecific: false,
        sizeSpecific: false
    } );
    const [sizeGroups, setSizeGroups] = useState( null );
    const [colors, setColors] = useState( null );
    const [styleCombination, setStyleCombination] = useState( [
        {
            fieldId: randomIdGenerator(),
            styleNo: null,
            size: null,
            color: null,
            quantity: ''
        }
    ] );


    useEffect( () => {
        dispatch( getDropDownSeasons() );
        dispatch( getDropDownBuyers() );

        dispatch( getDropDownSizeGroups() );
        dispatch( getDropDownColors() );
        dispatch( getDropDownStatuses() );

    }, [] );

    //Function for Document Upload Start
    const handleFileUpload = async files => {
        const singleFile = files[0];
        setuploadFiles( {
            ...uploadFiles,
            id: randomIdGenerator(),
            name: singleFile.name,
            type: singleFile.type,
            uploadDate: formatDate( new Date() )
        } );
    };

    const handleAddFileToTable = () => {
        const uploadArray = [];
        if ( uploadFiles ) {
            uploadArray.unshift( uploadFiles );
        }
        for ( let index = 0; index < uploadArray.length; index++ ) {
            const obj = uploadArray[index];
            setFilesTable( [...filesTable, obj] );
        }
        setuploadFiles( initialFilesUpload );
    };


    const handleFileRemoveFromTable = fileId => {
        const files = [...filesTable];
        files.splice(
            files.findIndex( value => value.id === fileId ), 1 );
        setFilesTable( files );
    };

    const { getRootProps, getInputProps } = useDropzone( {
        accept: 'image/*, application/pdf, .pdf, .doc, .docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        maxFiles: 1,
        onDrop: ( acceptedFiles, fileRejections ) => {
            if ( acceptedFiles.length ) {
                handleFileUpload( acceptedFiles );
            } else {
                const message = fileRejections[0]?.errors[0]?.message;
                notify( 'error', `${message}` );
            }
        }
    } );

    const handleSeasonCreate = ( newValue ) => {
        baseAxios.post( `${merchandisingApi.season.add_season}`, { name: newValue, description: newValue } ).then( res => {
            console.log( res );
            if ( res.status === insertStatus.success ) {
                const newOption = createOption( newValue, res.data );
                setSeason( newOption );
                dispatch( getDropDownSeasons() );
                notify( 'success', 'The Season has been added Successfully!' );
            } else {
                notify( 'error', 'The Season has been added Failed!' );
            }
        } );
    };


    const handleBuyerChange = ( data ) => {
        if ( data ) {
            setBuyer( data );
            dispatch( getCascadeDropDownBuyerDepartments( data.value ) );
            dispatch( getCascadeDropDownBuyerAgents( data.value ) );
            dispatch( getCascadeDropDownBuyerProductDevelopers( data.value ) );


        } else {
            setBuyer( null );
            setbuyerDepartment( null );
            setBuyerAgent( null );
            setBuyerProductdeveloper( null );
        }

    };


    const handleBuyerInstantCreate = ( inputValue ) => {
        if ( inputValue !== undefined ) {
            setBuyerName( inputValue );
            buyerToggleSidebar();
        }
    };


    const handleBuyerInstantAdd = ( values ) => {
        baseAxios.post( `${merchandisingApi.buyer.add_buyer}`, values ).then(
            response => {
                const newOption = createOption( values.name, response.data );
                setBuyer( newOption );
            }
        );
    };
    //For Size Group Instant Create
    const handleSizeGroupInstantCreate = ( inputValue ) => {
        if ( inputValue !== undefined ) {
            setSizeGroupName( inputValue );
            sizeGroupToggleSidebar();
        }
    };

    const handleSizeGroupInstantAdd = ( values ) => {
        baseAxios.post( `${merchandisingApi.sizeGroup.add_size_group}`, values ).then(
            response => {
                const newOption = createOption( values.name, response.data );
                setSizeGroups( newOption );
            }
        );
    };
    //For Color Instant Create
    const handleColorInstantCreate = ( inputValue ) => {
        if ( inputValue !== undefined ) {
            setColorName( inputValue );
            colorToggleSidebar();
        }
    };

    const handleColorInstantAdd = ( values ) => {
        baseAxios.post( `${merchandisingApi.color.add_color}`, values ).then(
            response => {
                const newOption = createOption( values.name, response.data );
                setColors( newOption );
            }
        );
    };

    //For Status Instant Create
    const handleStatusInstantCreate = ( inputValue ) => {
        if ( inputValue !== undefined ) {
            setStatusName( inputValue );
            statusToggleSidebar();
        }
    };

    const handleStatusInstantAdd = ( values ) => {
        baseAxios.post( `${merchandisingApi.status.add_status}`, values ).then(
            response => {
                const newOption = createOption( values.name, response.data );
                setStatus( newOption );
            }
        );
    };

    const handlePhotoAddToTable = ( e ) => {
        const photoFiles = e.target.files;
        const photosConvertToArray = Object.values( photoFiles );
        const mutedPhotoArray = photosConvertToArray.map( photo => ( {
            id: randomIdGenerator(),
            url: URL.createObjectURL( photo ),
            photoName: photo.name,
            isDefault: false
        } ) );
        setPhotos( [...photos, ...mutedPhotoArray] );
    };

    const handlePhotoUploadtoCarousel = () => {
        setUploadedPhoto( [...uploadedPhoto, ...photos] );
        setPhotos( [] );
    };

    const handlePhotoRemoveFromTable = photoId => {
        const exitPhotos = [...photos];
        exitPhotos.splice(
            exitPhotos.findIndex( value => value.id === photoId ),
            1
        );
        setPhotos( exitPhotos );
    };

    const handleUploadPhotoRemoveFromCarousel = ( photoId ) => {
        const exitUploadedPhotos = [...uploadedPhoto];
        exitUploadedPhotos.splice(
            exitUploadedPhotos.findIndex( value => value.id === photoId ),
            1
        );
        setUploadedPhoto( exitUploadedPhotos );
    };

    const handleDefaultPhotoOnTable = ( photoId ) => {
        setPhotos(
            photos.map(
                ( photo ) => ( photo.id === photoId ? { ...photo, isDefault: true } : { ...photo, isDefault: false } )
            )
        );

    };
    const handleDefaultPhotoOnCarousel = ( photoId ) => {
        setUploadedPhoto(
            uploadedPhoto.map(
                ( photo ) => ( photo.id === photoId ? { ...photo, isDefault: true } : { ...photo, isDefault: false } )
            )
        );
    };

    const { register, errors, handleSubmit } = useForm();

    const onSubmit = ( values ) => {

        if ( isObjEmpty( errors ) ) {
            dispatch(
                addSetStyle( {
                    styleNo: values.styleNo,
                    season: season.value,
                    year: year.value,
                    buyerId: buyer.value,
                    agentId: buyerAgent.value,
                    buyerProductDeveloperId: '618d183a-fdfd-4614-9743-4dc413dfb9da',
                    buyerDepartmentId: '618d183a-fdfd-4614-9743-4dc413dfb9da',
                    colorId: colors.value,
                    sizeGroupId: sizeGroups.value,
                    remarks: values.remarks,
                    styleDetails: [
                        {
                            styleId: styleCombination.styleNo,
                            sizeId: styleCombination.size,
                            colorId: styleCombination.color,
                            quantity: styleCombination.quantity
                        }
                    ],
                    additionalInstruction: values.specialInstruction,
                    status: status.label,
                    isSizeSpecific: true,
                    isColorSpecific: true
                } )
            );
        }
    };
    const handleCancel = () => {
        replace( '/set-styles' );
    };

    return (
        <div>
            <Card className="p-1">
                <CardHeader>
                    <CardTitle className="text-dark font-weight-bold" tag='h2'>New Set Style</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit( onSubmit )}>
                        <Row>
                            <Col xs='12' sm='12' md='8' lg='8' xl='8'>
                                <Row className="border rounded rounded-3  mt-1 mb-2">
                                    <FormGroup tag={Col} xs='12' sm='12' md='12' lg='12' xl='12' className="mt-n1">
                                        <Badge color='primary'>
                                            {`Set Style Info`}
                                        </Badge>
                                    </FormGroup>
                                    <FormGroup tag={Col} xs='12' sm='12' md='12' lg='3' xl='3'>
                                        <Label className="text-dark font-weight-bold" for='styleNo'>Buyer Set Style No</Label>
                                        <Input
                                            id='styleNo'
                                            type='text'
                                            name='styleNo'
                                            placeholder='Buyer Set Style No'
                                            innerRef={register( { required: true } )}
                                            invalid={errors.buyerSetStyleNo && true}
                                            className={classnames( { 'is-invalid': errors['styleNo'] } )}
                                        />
                                        {errors && errors.styleNo && <FormFeedback>Buyer Set Style No is required!</FormFeedback>}
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='3' className="">
                                        <Label className="text-dark font-weight-bold" for='season'>season</Label>
                                        <CreatableSelect
                                            id='season'
                                            isSearchable
                                            isClearable
                                            theme={selectThemeColors}
                                            options={dropDownSeasons}
                                            classNamePrefix='select'
                                            innerRef={register( { required: true } )}
                                            onCreateOption={data => { handleSeasonCreate( data ); }}

                                            // className={classnames( 'react-select', { 'is-invalid': season === null } )}
                                            value={season}
                                            onChange={data => {
                                                setSeason( data );
                                            }}
                                        />
                                        {errors && errors.season && <FormFeedback>season is required!</FormFeedback>}
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='3' className="">
                                        <Label className="text-dark font-weight-bold" for='year'>Year</Label>
                                        <CreatableSelect
                                            id='year'
                                            isSearchable
                                            isClearable
                                            theme={selectThemeColors}
                                            options={selectYear}
                                            classNamePrefix='select'
                                            innerRef={register( { required: true } )}
                                            // className={classnames( 'react-select', { 'is-invalid': year === null } )}
                                            value={year}
                                            onChange={data => {
                                                setYear( data );
                                            }}
                                        />
                                        {errors && errors.year && <FormFeedback>Year is required!</FormFeedback>}
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='3' className="">
                                        <Label className="text-dark font-weight-bold" for='descriptinId'>Description</Label>
                                        <Input
                                            id='descriptinId'
                                            type='text'
                                            name='description'
                                            placeholder='Description'
                                            innerRef={register( { required: true } )}
                                            invalid={errors.descriotion && true}
                                            className={classnames( { 'is-invalid': errors['description'] } )}
                                        />
                                        {errors && errors.description && <FormFeedback>Description is required!</FormFeedback>}
                                    </FormGroup>
                                </Row>
                                <Row className="border rounded rounded-3  mt-1  mb-2">
                                    <FormGroup tag={Col} lg='12' className="mt-n1">
                                        <Badge color='primary'>
                                            {`Buyer Info`}
                                        </Badge>
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='3' className="">
                                        <Label className="text-dark font-weight-bold" for='buyer'>Buyer</Label>
                                        <CreatableSelect
                                            id='buyer'
                                            isSearchable
                                            isClearable
                                            theme={selectThemeColors}
                                            options={dropDownBuyers}
                                            classNamePrefix='select'
                                            innerRef={register( { required: true } )}
                                            // className={classnames( 'react-select', { 'is-invalid': season === null } )}
                                            value={buyer}
                                            onChange={data => {
                                                handleBuyerChange( data );
                                            }}
                                            onCreateOption={data => {
                                                handleBuyerInstantCreate( data );
                                            }}
                                        />
                                        {errors && errors.buyer && <FormFeedback>Buyer No is required!</FormFeedback>}
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='3' className="">
                                        <Label className="text-dark font-weight-bold" for='buyerDepartment'>Buyer Department</Label>
                                        <CreatableSelect
                                            id='buyerDepartment'
                                            isSearchable
                                            isClearable
                                            theme={selectThemeColors}
                                            options={dropDownBuyerDepartments}
                                            classNamePrefix='select'
                                            innerRef={register( { required: true } )}
                                            // className={classnames( 'react-select', { 'is-invalid': buyerDepartment === null } )}
                                            value={buyerDepartment}
                                            onChange={data => {
                                                setbuyerDepartment( data );
                                            }}
                                        />
                                        {errors && errors.buyerDepartment && <FormFeedback>Buyer Department is required!</FormFeedback>}
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='3' className="">
                                        <Label className="text-dark font-weight-bold" for='buyerAgent'>Buyer Agent</Label>
                                        <CreatableSelect
                                            id='buyerAgent'
                                            isSearchable
                                            isClearable
                                            theme={selectThemeColors}
                                            options={dropDownBuyerAgents}
                                            classNamePrefix='select'
                                            innerRef={register( { required: true } )}
                                            // className={classnames( 'react-select', { 'is-invalid': buyerAgent === null } )}
                                            value={buyerAgent}
                                            onChange={data => {
                                                setBuyerAgent( data );
                                            }}
                                        />
                                        {errors && errors.buyerAgent && <FormFeedback>Buyer Agent is required!</FormFeedback>}
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='3' className="">
                                        <Label className="text-dark font-weight-bold" for='buyerProductdeveloper'>Buyer Product Developer</Label>
                                        <CreatableSelect
                                            id='buyerProductdeveloper'
                                            isSearchable
                                            isClearable
                                            theme={selectThemeColors}
                                            options={dropDownProductDevelopers}
                                            classNamePrefix='select'
                                            innerRef={register( { required: true } )}
                                            // className={classnames( 'react-select', { 'is-invalid': buyerProductdeveloper === null } )}
                                            value={buyerProductdeveloper}
                                            onChange={data => {
                                                setBuyerProductdeveloper( data );
                                            }}
                                        />
                                        {errors && errors.buyerProductdeveloper && <FormFeedback>Description is required!</FormFeedback>}
                                    </FormGroup>
                                </Row>
                                <Row className="border rounded rounded-3  mt-1 mb-2">
                                    <FormGroup tag={Col} lg="12" className="mt-n1">
                                        <Badge color='primary'>
                                            {`Status , Sample Assignee and Production Process`}
                                        </Badge>
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='4' className="">
                                        <Label className="text-dark font-weight-bold" for='status'>Status</Label>
                                        <CreatableSelect
                                            id='status'
                                            isSearchable
                                            isClearable
                                            theme={selectThemeColors}
                                            options={dropDownStatuses}
                                            classNamePrefix='select'
                                            innerRef={register( { required: true } )}
                                            // className={classnames( 'react-select', { 'is-invalid': status === null } )}
                                            value={status}
                                            onChange={data => {
                                                setStatus( data );
                                            }}
                                            onCreateOption={data => {
                                                handleStatusInstantCreate( data );
                                            }}
                                        />
                                        {errors && errors.status && <FormFeedback>Status No is required!</FormFeedback>}
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='4' className="">
                                        <Label className="text-dark font-weight-bold" for='assigneeId'>Sample Assignee</Label>
                                        <CreatableSelect
                                            id='assigneeId'
                                            isSearchable
                                            isClearable
                                            theme={selectThemeColors}
                                            options={selectSampleAssignee}
                                            classNamePrefix='select'
                                            innerRef={register( { required: true } )}
                                            // className={classnames( 'react-select', { 'is-invalid': sampleAssignee === null } )}
                                            value={sampleAssignee}
                                            onChange={data => {
                                                setSampleAssignee( data );
                                            }}
                                        />
                                        {errors && errors.sampleAssignee && <FormFeedback>Sample Assignee is required!</FormFeedback>}
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='4' className="">
                                        <Label className="text-dark font-weight-bold" for='departmentId'>Production Process</Label>
                                        <CreatableSelect
                                            isSearchable
                                            isClearable
                                            id='departmentId'
                                            theme={selectThemeColors}
                                            options={selectProductionProcess}
                                            classNamePrefix='select'
                                            innerRef={register( { required: true } )}
                                            // className={classnames( 'react-select', { 'is-invalid': productionProcess === null } )}
                                            value={productionProcess}
                                            onChange={data => {
                                                setProductionProcess( data );
                                            }}
                                        />
                                        {errors && errors.productionProcess && <FormFeedback>Production Process is required!</FormFeedback>}
                                    </FormGroup>

                                </Row>
                            </Col>

                            <Col xl='4' lg='4' md='4' sm='12' >
                                <Row className="border rounded rounded-3  mt-1 ml-1 mb-2">
                                    <FormGroup tag={Col} lg='12' className="mt-n1">
                                        <Badge color='primary'>
                                            {`Photo`}
                                        </Badge>
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='12' className="">
                                        <SetStylePhoto photoData={uploadedPhoto} handleUploadPhotoRemove={handleUploadPhotoRemoveFromCarousel} handleDefaultPhotoOnCarousel={handleDefaultPhotoOnCarousel} />
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='12' className="">
                                        {
                                            photos.length > 0 &&
                                            <Table size="sm" responsive bordered>
                                                <thead className="thead-light text-capitalize">
                                                    <tr>
                                                        <td className="text-center">Photo</td>
                                                        <td >File </td>
                                                        <td className="text-center">Actions</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        photos.map( ( photo ) => (
                                                            <tr key={photo.id}>
                                                                <td className="text-center"> <Avatar img={photo.url} /></td>
                                                                <td>{photo.photoName}</td>
                                                                <td className="text-center">
                                                                    <ButtonGroup >
                                                                        <Button.Ripple id="deleteId" onClick={() => { handlePhotoRemoveFromTable( photo.id ); }} className='btn-icon' color='flat-danger'>
                                                                            <XSquare size={18} />
                                                                        </Button.Ripple>
                                                                        <Button.Ripple id='defaultId' onClick={() => { handleDefaultPhotoOnTable( photo.id ); }} className='btn-icon' color='flat-success'>
                                                                            {
                                                                                photo.isDefault ? <CheckSquare size={18} /> : <Square color='grey' size={18} />
                                                                            }
                                                                        </Button.Ripple>
                                                                    </ButtonGroup>
                                                                </td>
                                                            </tr>
                                                        ) )
                                                    }
                                                </tbody>
                                            </Table>
                                        }
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='6' sm="6" xs="6" className="d-flex justify justify-content-start">
                                        <Button.Ripple outline id='change-img' tag={Label} color='primary' size="sm">
                                            <Plus size={16} />
                                            <input type='file' hidden id='change-img' onChange={handlePhotoAddToTable} accept='image/*' multiple />
                                        </Button.Ripple>
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='6' sm="6" xs="6" className="d-flex justify justify-content-end">
                                        <Button.Ripple onClick={() => { handlePhotoUploadtoCarousel(); }} outline tag={Label} color='success' size="sm">
                                            <Upload size={16} />
                                        </Button.Ripple>
                                    </FormGroup>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="border rounded rounded-3  mt-1 mb-2">
                            <FormGroup tag={Col} lg='12' className="mt-n1">
                                <Badge color='primary'>
                                    {`Remarks and Special Instructions`}
                                </Badge>
                            </FormGroup>
                            <FormGroup tag={Col} lg='6' className="">
                                <Label className="text-dark font-weight-bold" for='remarksId'>Remarks</Label>
                                <Input
                                    id='remarksId'
                                    type='textarea'
                                    name='remarks'
                                    placeholder='Remarks'
                                    innerRef={register( { required: true } )}
                                    invalid={errors.remarks && true}
                                    className={classnames( { 'is-invalid': errors['remarks'] } )}
                                />
                                {errors && errors.remarks && <FormFeedback>Remarks No is required!</FormFeedback>}
                            </FormGroup>
                            <FormGroup tag={Col} lg='6' className="">
                                <Label className="text-dark font-weight-bold" for='spInstructionId'>Special Instruction</Label>
                                <Input
                                    id='spInstructionId'
                                    type='textarea'
                                    name='specialInstruction'
                                    placeholder='Special Instruction'
                                    innerRef={register( { required: true } )}
                                    invalid={errors.specialInstruction && true}
                                    className={classnames( { 'is-invalid': errors['specialInstruction'] } )}
                                />
                                {errors && errors.specialInstruction && <FormFeedback>Special Instruction No is required!</FormFeedback>}
                            </FormGroup>
                        </Row>
                        <Row >
                            <Col xl='9' lg='9' md='12' sm='12'>
                                <Row className="border rounded rounded-3  mt-1 mb-2 mr-1">
                                    <FormGroup tag={Col} xs={12} sm={12} md={12} lg={12} xl={12} className="mt-n1">
                                        <Badge color='primary'>
                                            {`Set Style Details`}
                                        </Badge>
                                    </FormGroup>
                                    <FormGroup tag={Col} xs={12} sm={12} md={12} lg={12} xl={12} >
                                        {/* Details */}
                                        <SetStyleDetailsAddForm colorSizeData={colorSizeSpecification} styleCombination={styleCombination} setStyleCombination={setStyleCombination} />
                                    </FormGroup>
                                </Row>
                            </Col>
                            <Col xl='3' lg='3' md='12' sm='12'>
                                <FormGroup className='d-block '>
                                    <Row >
                                        <Col className="border rounded rounded-3 mt-1 mb-2">
                                            <FormGroup tag={Col} lg='12' className="mt-n1">
                                                <Badge color='primary'>
                                                    {`Size and Color Specific`}
                                                </Badge>
                                            </FormGroup>
                                            <div className='divider divider-left divider-primary'>
                                                <div className='divider-text'>Size Specific</div>
                                            </div>
                                            <Row >
                                                <FormGroup tag={Col} xs='6' sm='6' md='4' lg='2' xl='2' style={{ marginTop: '0.5rem' }}>
                                                    <CustomInput
                                                        type='switch'
                                                        label={<Label2 />}
                                                        id='icon-primary'
                                                        inline
                                                        name="sizeSpecific"
                                                        checked={colorSizeSpecification.sizeSpecific}
                                                        onChange={( e ) => { setColorSizeSpecification( { ...colorSizeSpecification, sizeSpecific: e.target.checked } ); }}
                                                    />
                                                </FormGroup>
                                                <FormGroup tag={Col} xs='6' sm='6' md='8' lg='10' xl='10' className="mb-1">

                                                    <CreatableSelect
                                                        id='sizeSpecific'
                                                        isDisabled={colorSizeSpecification.sizeSpecific}
                                                        isSearchable
                                                        isClearable
                                                        theme={selectThemeColors}
                                                        options={dropDownSizeGroups}

                                                        // options={selectSizeGroups}
                                                        classNamePrefix='select'
                                                        value={sizeGroups}
                                                        placeholder="Select Size Group"
                                                        onChange={data => {
                                                            setSizeGroups( data );
                                                        }}
                                                        onCreateOption={data => {
                                                            handleSizeGroupInstantCreate( data );
                                                        }}
                                                    />
                                                </FormGroup>
                                                {errors && errors.sizeSpecific && <FormFeedback>Color is required!</FormFeedback>}
                                            </Row>
                                            <div className='divider divider-left divider-primary'>
                                                <div className='divider-text'>Color Specific</div>
                                            </div>
                                            <Row>
                                                <FormGroup tag={Col} xs='6' sm='6' md='4' lg='2' xl='2' style={{ marginTop: '0.5rem' }}>
                                                    <CustomInput
                                                        type='switch'
                                                        label={<Label2 />}
                                                        id='colorSpecificId'
                                                        name="colorSpecific"
                                                        checked={colorSizeSpecification.colorSpecific}
                                                        inline
                                                        onChange={( e ) => { setColorSizeSpecification( { ...colorSizeSpecification, colorSpecific: e.target.checked } ); }}

                                                    />
                                                </FormGroup>
                                                <FormGroup tag={Col} xs='6' sm='6' md='8' lg='10' xl='10' className="mb-1">

                                                    <CreatableSelect
                                                        id='colorSpecific'
                                                        isDisabled={colorSizeSpecification.colorSpecific}
                                                        isSearchable
                                                        isClearable
                                                        theme={selectThemeColors}
                                                        // options={selectColor}
                                                        options={dropDownColors}

                                                        classNamePrefix='select'
                                                        placeholder="Select Color"
                                                        value={colors}
                                                        onChange={data => {
                                                            setColors( data );
                                                        }}
                                                        onCreateOption={data => {
                                                            handleColorInstantCreate( data );
                                                        }}
                                                    />
                                                </FormGroup>
                                                {errors && errors.colorSpecific && <FormFeedback>Color is required!</FormFeedback>}
                                            </Row>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="border  rounded rounded-3  mt-1  mb-2">
                            <FormGroup tag={Col} lg='12' className="mt-n1">
                                <Badge color='primary'>
                                    {`Documents`}
                                </Badge>
                            </FormGroup>
                            <FormGroup tag={Col} lg='12' >
                                <CardBody  >
                                    <div className="style-doc-upload-main" {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p className=' text-center'><Upload color="black" size={26} /></p>
                                        <p className="h5  text-dark text-center opacity-100 font-weight-bolder ">{uploadFiles.name ? uploadFiles.name : 'Drop file here ...'}</p>
                                    </div>

                                </CardBody>
                            </FormGroup>
                            <FormGroup tag={Col} lg='6' className="">
                                <Label className="text-dark font-weight-bold" for='docCategoryId'>Document Category</Label>
                                <CreatableSelect
                                    id='docCategoryId'
                                    isSearchable
                                    isClearable
                                    name='documentCategory'
                                    theme={selectThemeColors}
                                    options={selectDocCategory}
                                    classNamePrefix='select'
                                    innerRef={register( { required: true } )}
                                    // className={classnames( 'react-select', { 'is-invalid': documentCategory === null } )}
                                    // value={uploadFiles?.documentCategory}
                                    value={selectDocCategory.filter( i => i.label === uploadFiles?.documentCategory )}
                                    onChange={( data ) => { setuploadFiles( { ...uploadFiles, documentCategory: data ? data?.label : null } ); }}
                                />
                                {errors && errors.documentCategory && <FormFeedback>Document Category is required!</FormFeedback>}
                            </FormGroup>
                            <FormGroup tag={Col} lg='6' className="">
                                <Label className="text-dark font-weight-bold" for='revisionNoId'>Revision No</Label>
                                <Input
                                    id='revisionNoId'
                                    type="number"
                                    name='revisionNo'
                                    placeholder='Revision No'
                                    min={1} max={100} step="1"
                                    value={uploadFiles?.revisionNo}
                                    onChange={( e ) => { setuploadFiles( { ...uploadFiles, revisionNo: e.target.value } ); }}
                                    innerRef={register( { required: true } )}
                                    invalid={errors.revisionNo && true}
                                    className={classnames( { 'is-invalid': errors['revisionNo'] } )}
                                />
                                {errors && errors.revisionNo && <FormFeedback>Revision No is required!</FormFeedback>}
                            </FormGroup>
                            <FormGroup tag={Col} lg='12' className=" d-flex justify justify-content-end">
                                <Button.Ripple
                                    disabled={( !uploadFiles.name || !uploadFiles.revisionNo || !uploadFiles.documentCategory )}
                                    onClick={() => { handleAddFileToTable(); }}
                                    color='primary'
                                    size='sm'
                                    outline>
                                    Upload
                                </Button.Ripple>
                            </FormGroup>
                            <FormGroup tag={Col} lg='12' >
                                <SetStyleDocumentTable tableData={filesTable} handleFileRemoveFromTable={handleFileRemoveFromTable} />
                            </FormGroup>
                        </Row>
                        <Row>
                            <Col className="d-flex flex-row-reverse">
                                <div className='d-inline-block mb-1 mt-1'>
                                    <Button.Ripple type="reset" className="ml-1 " outline color="secondary" size="sm">Reset</Button.Ripple>
                                    <Button.Ripple onClick={() => { handleCancel(); }} className="ml-1 " outline color="danger" size="sm">Cancel</Button.Ripple>
                                    <Button.Ripple onClick={( e ) => { e.preventDefault(); }} className="ml-1" type="submit" outline color="success" size="sm">Submit</Button.Ripple>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
            {
                openBuyerSidebar ? (
                    <BuyerAddForm open={openBuyerSidebar} addInstantCreate={handleBuyerInstantAdd} buyerName={buyerName} toggleSidebar={buyerToggleSidebar} />
                ) : openSizeGroupSidebar ? (
                    <SizeGroupAddForm open={openSizeGroupSidebar} addInstantCreate={handleSizeGroupInstantAdd} sizeGroupName={sizeGroupName} toggleSidebar={sizeGroupToggleSidebar} />
                ) : openColorSidebar ? (
                    <ColorAddForm open={openColorSidebar} addInstantCreate={handleColorInstantAdd} colorName={colorName} toggleSidebar={colorToggleSidebar} />
                ) : openStatusSidebar ? (
                    <StatusAddForm open={openStatusSidebar} addInstantCreate={handleStatusInstantAdd} statusName={statusName} toggleSidebar={statusToggleSidebar} />
                ) : null
            }
        </div >
    );
};

export default SetStyleAddForm;

