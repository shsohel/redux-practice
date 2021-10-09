import Avatar from '@components/avatar';
import '@custom-styles/merchandising/merchandising-core.scss';
import { notify } from "@custom/notifications";
import { baseAxios } from "@services";
import { store } from '@store/storeConfig/store';
// import '@custom-styles/merchandising/carousel-hover.scss';
// import '@styles/react/merchandising/merchandising-style.scss';
import { isObjEmpty } from '@utils';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CheckSquare, Plus, Square, Upload, XSquare } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import CreatableSelect from 'react-select/creatable';
import { Badge, Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import { merchandisingApi } from '../../../../../services/api-end-points/merchandising';
import { status as insertStatus } from "../../../../../utility/enums";
import { createOption, formatDate, randomIdGenerator, selectThemeColors } from '../../../../../utility/Utils';
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
import { getCascadeDropDownStyleCategories } from '../../../style-master/style-category/store/actions';
import { getCascadeDropDownDepartments } from '../../../style-master/style-department/store/actions';
import { getCascadeDropDownDivisions } from '../../../style-master/style-division/store/actions';
import { getCascadeDropDownProductCategories } from '../../../style-master/style-product-category/store/actions';
import { addStyle, getStyleById, singleStylePhotoUpload } from '../store/actions';
import SingleStyleDocumentTable from "./SingleStyleDocumentTable";
import SingleStylePhoto from "./SingleStylePhoto";

//season Array Demo
const selectSeason = [
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
const selectDivision = [
    {
        value: 'knit',
        label: 'Knit',
        styleDepartment: [
            {
                value: 'man',
                label: 'Man',
                productCategory: [
                    {
                        value: 'top',
                        label: 'Top',
                        styleCategory: [{ value: 't-shirt', label: 'T-Shirt' }]
                    },
                    {
                        value: 'bottom',
                        label: 'Bottom',
                        styleCategory: [{ value: 'short', label: 'Short' }]
                    }
                ]
            },
            {
                value: 'ladies',
                label: 'Ladies',
                productCategory: [
                    { value: 'top', label: 'Top Ladies', styleCategory: [{ value: 'bra', label: 'Bra' }] },
                    { value: 'bottom', label: 'Bottom Ladies', styleCategory: [{ value: 'capri', label: 'Capri' }] }
                ]
            },
            {
                value: 'kid',
                label: 'Kid',
                productCategory: [
                    { value: 'top', label: 'Top Kids', styleCategory: [{ value: 't-shirt', label: 'T-shirt' }] },
                    { value: 'bottom', label: 'Bottom Kids', styleCategory: [{ value: 'pants', label: 'Pants' }] }
                ]
            }

        ]
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


const SingleStyleAddForm = () => {
    const { replace } = useHistory();
    const dispatch = useDispatch();
    const { selectedSetStyle, lastStyleId, singleStyleImages, isUploadComplete } = useSelector( ( { styles } ) => styles );
    console.log( isUploadComplete );

    const { dropDownSeasons } = useSelector( ( { seasons } ) => seasons );
    const { dropDownBuyerDepartments } = useSelector( ( { buyerDepartments } ) => buyerDepartments );
    const { dropDownBuyerAgents } = useSelector( ( { buyerAgents } ) => buyerAgents );
    const { dropDownProductDevelopers } = useSelector( ( { productDevelopers } ) => productDevelopers );
    const { dropDownDivisions } = useSelector( ( { divisions } ) => divisions );
    const { dropDownDepartments } = useSelector( ( { departments } ) => departments );
    const { dropDownProductCategories } = useSelector( ( { productCategories } ) => productCategories );
    const { dropDownStyleCategories } = useSelector( ( { styleCategories } ) => styleCategories );

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
    const [division, setDivision] = useState( null );
    const [styleDepartment, setStyleDepartment] = useState( null );
    const [productCategory, setProductCategory] = useState( null );
    const [styleCategory, setStyleCategory] = useState( null );
    const [sizeGroups, setSizeGroups] = useState( null );
    const [colors, setColors] = useState( null );

    const [status, setStatus] = useState( null );
    const [sampleAssignee, setSampleAssignee] = useState( null );
    const [productionProcess, setProductionProcess] = useState( null );

    ///For Document Upload
    const [filesTable, setFilesTable] = useState( [] );
    const [uploadFiles, setuploadFiles] = useState( initialFilesUpload );

    ///For Photo Upload
    const [photos, setPhotos] = useState( [] );
    const [uploadedPhoto, setUploadedPhoto] = useState( [] );

    // ** Vars React HOOK Form

    useEffect( () => {
        dispatch( getDropDownSeasons() );
        dispatch( getDropDownBuyers() );
        dispatch( getCascadeDropDownDivisions() );
        dispatch( getDropDownSizeGroups() );
        dispatch( getDropDownColors() );
        dispatch( getDropDownStatuses() );
        if ( lastStyleId ) {
            dispatch( getStyleById( lastStyleId ) );
        }
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
            files.findIndex( value => value.id === fileId ),
            1
        );
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


    const handleDivisionChange = ( data ) => {
        if ( data ) {
            setDivision( data );
            dispatch( getCascadeDropDownDepartments( data.value ) );

        } else {
            setDivision( null );
            setStyleDepartment( null );
            setProductCategory( null );
            setStyleCategory( null );
        }
    };
    const handleStyleDepartmentChange = ( data ) => {
        if ( data ) {
            setStyleDepartment( data );
            dispatch( getCascadeDropDownProductCategories( data.value ) );

        } else {
            setStyleDepartment( null );
            setProductCategory( null );
            setStyleCategory( null );
        }
    };
    const handleProductCategoryChange = ( data ) => {
        if ( data ) {
            setProductCategory( data );
            dispatch( getCascadeDropDownStyleCategories( data.value ) );


        } else {
            setProductCategory( null );
            setStyleCategory( null );
        }
    };

    const [uploadingPhotos, setUploadingPhotos] = useState( [] );
    const handlePhotoAddToTable = ( e ) => {
        const photoFiles = e.target.files;
        //For Uploading Files
        const photosConvertToArray = Object.values( photoFiles );
        setUploadingPhotos( [...uploadingPhotos, ...photosConvertToArray] );
        //For Show On Table
        const mutedPhotoArray = photosConvertToArray.map( photo => ( {
            id: randomIdGenerator(),
            url: URL.createObjectURL( photo ),
            photoName: photo.name,
            isDefault: false
        } ) );
        setPhotos( [...photos, ...mutedPhotoArray] );
    };
    const handlePhotoUploadToCarousel = () => {
        if ( uploadingPhotos.length > 0 ) {
            dispatch(
                singleStylePhotoUpload( uploadingPhotos, lastStyleId )
            );
        }
        ///Clear Uploading Photo after photo Uploaded
        setUploadingPhotos( [] );
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

    const { register, errors, handleSubmit, formState = {} } = useForm();

    const onSubmit = ( values ) => {
        const sizeGroupsMuted = sizeGroups.map( i => i.value );
        const colorsMuted = colors.map( i => i.value );
        if ( isObjEmpty( errors ) ) {
            dispatch(
                addStyle( {
                    styleNo: values.styleNo,
                    season: season.value,
                    year: year.value,
                    // description: values.description,
                    buyerId: buyer.value,
                    agentId: buyerAgent.value,
                    buyerProductDeveloperId: '618d183a-fdfd-4614-9743-4dc413dfb9da',
                    styleDivisionId: division.value,
                    styleDepartmentId: styleDepartment.value,
                    productCategoryId: productCategory.value,
                    styleCategoryId: styleCategory.value,
                    colorIds: colorsMuted,
                    sizeGroupIds: sizeGroupsMuted,
                    remarks: values.remarks,
                    additionalInstruction: values.specialInstruction,
                    status: status.label
                } )
            );
        }
    };


    const handleCancel = () => {
        replace( '/single-styles' );
    };

    return (
        <div>
            <Card className="p-1">
                {/* <CardBody style={{ position: 'fixed', top: 152, zIndex: 1, width: 'inherit', backgroundColor: 'white' }}>
                    <Row>
                        <Col>
                            <div className='d-inline-block'>
                                <Button.Ripple type="reset" className="ml-1 " outline color="secondary" size="sm">Reset</Button.Ripple>
                                <Button.Ripple onClick={() => { handleCancel(); }} className="ml-1 " outline color="danger" size="sm">Cancel</Button.Ripple>
                                <Button.Ripple onClick={( e ) => { e.preventDefault(); }} className="ml-1" type="submit" outline color="success" size="sm">Submit</Button.Ripple>
                            </div>
                        </Col>
                    </Row>
                </CardBody> */}
                <CardHeader>
                    <CardTitle className="text-dark font-weight-bold" tag='h2'>New Style</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit( onSubmit )}>
                        <Row>
                            <Col xs='12' sm='12' md='8' lg='8' xl='8'>
                                <Row className="border rounded rounded-3 mt-1 mb-2">
                                    <FormGroup tag={Col} xs='12' sm='12' md='12' lg='12' xl='12' className="mt-n1">
                                        <Badge color='primary'>
                                            {`Style Info`}
                                        </Badge>
                                    </FormGroup>
                                    <FormGroup tag={Col} xs='12' sm='12' md='12' lg='3' xl='3'>
                                        <Label className="text-dark font-weight-bold" for='styleNo'>Buyer Style No</Label>
                                        <Input
                                            id='styleNo'
                                            type='text'
                                            name='styleNo'
                                            placeholder='Buyer Style No'
                                            innerRef={register( { required: true } )}
                                            invalid={errors.styleNo && true}
                                        // className={classnames( { 'is-invalid': errors['styleNo'] } )}
                                        />
                                        {errors && errors.styleNo && <FormFeedback>Buyer Style No is required!</FormFeedback>}
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='3' className="">
                                        <Label className="text-dark font-weight-bold" for='season'>season</Label>
                                        <CreatableSelect
                                            id='season'
                                            isSearchable
                                            isClearable
                                            theme={selectThemeColors}
                                            options={dropDownSeasons}
                                            // options={selectSeason}
                                            classNamePrefix='select'
                                            innerRef={register( { required: true } )}
                                            onCreateOption={data => { handleSeasonCreate( data ); }}
                                            //className={classnames( 'react-select', { 'is-invalid': season === null } )}
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
                                        <Label className="text-dark font-weight-bold" for='description'>Description</Label>
                                        <Input
                                            id='description'
                                            type='text'
                                            name='description'
                                            placeholder='Description'
                                            innerRef={register( { required: true } )}
                                            invalid={errors.description && true}
                                        // className={classnames( { 'is-invalid': errors['description'] } )}
                                        />
                                        {errors && errors.description && <FormFeedback>Description is required!</FormFeedback>}
                                    </FormGroup>
                                </Row>
                                <Row className="border rounded rounded-3 mt-1 mb-2">
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
                                            // options={selectBuyer}
                                            options={dropDownBuyers}
                                            classNamePrefix='select'
                                            innerRef={register( { required: true } )}
                                            // className={classnames( 'react-select', { 'is-invalid': buyer === null } )}
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
                                            // options={buyer?.buyerDepartment}
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
                                            // options={buyer?.buyerAgent}
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
                                            // options={buyer?.buyerProductdeveloper}
                                            classNamePrefix='select'
                                            innerRef={register( { required: true } )}
                                            //className={classnames( 'react-select', { 'is-invalid': buyerProductdeveloper === null } )}
                                            value={buyerProductdeveloper}
                                            onChange={data => {
                                                setBuyerProductdeveloper( data );
                                            }}
                                        />
                                        {errors && errors.buyerProductdeveloper && <FormFeedback>Description is required!</FormFeedback>}
                                    </FormGroup>
                                </Row>
                                <Row className="border rounded rounded-3 mt-1 mb-2">
                                    <FormGroup tag={Col} lg='12' className="mt-n1">
                                        <Badge color='primary'>
                                            {`Style Classification`}
                                        </Badge>
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='3' className="">
                                        <Label className="text-dark font-weight-bold" for='division'>Division</Label>
                                        <CreatableSelect
                                            id='division'
                                            isSearchable
                                            isClearable
                                            theme={selectThemeColors}
                                            options={dropDownDivisions}
                                            // options={selectDivision}
                                            classNamePrefix='select'
                                            innerRef={register( { required: true } )}
                                            // className={classnames( 'react-select', { 'is-invalid': division === null } )}
                                            value={division}
                                            onChange={
                                                data => {
                                                    handleDivisionChange( data );
                                                }
                                            }
                                        />
                                        {errors && errors.division && <FormFeedback>Division is required!</FormFeedback>}
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='3' className="">
                                        <Label className="text-dark font-weight-bold" for='styleDepartment'>Department</Label>
                                        <CreatableSelect
                                            id='styleDepartment'
                                            isSearchable
                                            isClearable
                                            theme={selectThemeColors}
                                            options={dropDownDepartments}
                                            // options={division?.styleDepartment}
                                            //options={dropDownDivisions?.dropDownDepartments}
                                            classNamePrefix='select'
                                            innerRef={register( { required: true } )}
                                            //className={classnames( 'react-select', { 'is-invalid': styleDepartment === null } )}
                                            value={styleDepartment}
                                            onChange={
                                                data => {
                                                    handleStyleDepartmentChange( data );
                                                }
                                            }

                                        />
                                        {errors && errors.styleDepartment && <FormFeedback>Style Department is required!</FormFeedback>}
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='3' className="">
                                        <Label className="text-dark font-weight-bold" for='productCategory'> Product Category</Label>
                                        <CreatableSelect
                                            id='productCategory'
                                            isSearchable
                                            isClearable
                                            theme={selectThemeColors}
                                            options={dropDownProductCategories}
                                            // options={styleDepartment?.productCategory}
                                            classNamePrefix='select'
                                            innerRef={register( { required: true } )}
                                            // className={classnames( 'react-select', { 'is-invalid': productCategory === null } )}
                                            value={productCategory}
                                            onChange={data => {
                                                handleProductCategoryChange( data );
                                            }}
                                        />
                                        {errors && errors.productCategory && <FormFeedback> Product Category is required!</FormFeedback>}
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='3' className="">
                                        <Label className="text-dark font-weight-bold" for='styleCategory'>Style Category</Label>
                                        <CreatableSelect
                                            id='styleCategory'
                                            isSearchable
                                            isClearable
                                            theme={selectThemeColors}
                                            options={dropDownStyleCategories}
                                            // options={productCategory?.styleCategory}
                                            classNamePrefix='select'
                                            innerRef={register( { required: true } )}
                                            // className={classnames( 'react-select', { 'is-invalid': styleCategory === null } )}
                                            value={styleCategory}
                                            onChange={data => {
                                                setStyleCategory( data );
                                            }}
                                        />
                                        {errors && errors.styleCategory && <FormFeedback>Style Category is required!</FormFeedback>}
                                    </FormGroup>
                                </Row>
                                <Row className="border rounded rounded-3 mt-1 mb-2">
                                    <FormGroup tag={Col} lg='12' className="mt-n1">
                                        <Badge color='primary'>
                                            {`Size Range and Color`}
                                        </Badge>
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='6' className="">
                                        <Label className="text-dark font-weight-bold" for='sizeGroupIds'>Size Ranges</Label>
                                        <CreatableSelect
                                            id='sizeGroupIds'
                                            isMulti
                                            isSearchable
                                            isClearable
                                            theme={selectThemeColors}
                                            options={dropDownSizeGroups}
                                            // options={selectSizeGroups}
                                            classNamePrefix='select'
                                            innerRef={register( { required: true } )}
                                            // className={classnames( 'react-select', { 'is-invalid': sizeGroups === null } )}
                                            value={sizeGroups}
                                            onChange={data => {
                                                setSizeGroups( data );
                                            }}
                                            onCreateOption={data => {
                                                handleSizeGroupInstantCreate( data );
                                            }}
                                        />
                                        {errors && errors.sizeGroupIds && <FormFeedback>Buyer No is required!</FormFeedback>}
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='6' className="">
                                        <Label className="text-dark font-weight-bold" for='colorIds'>Colors</Label>
                                        <CreatableSelect
                                            isSearchable
                                            isMulti
                                            isClearable
                                            id='colorIds'
                                            theme={selectThemeColors}
                                            options={dropDownColors}
                                            // options={selectColor}
                                            classNamePrefix='select'
                                            innerRef={register( { required: true } )}
                                            // className={classnames( 'react-select', { 'is-invalid': colors === null } )}
                                            value={colors}
                                            onChange={data => {
                                                setColors( data );
                                            }}
                                            onCreateOption={data => {
                                                handleColorInstantCreate( data );
                                            }}
                                        />
                                        {errors && errors.colorIds && <FormFeedback>Color is required!</FormFeedback>}
                                    </FormGroup>

                                </Row>
                                <Row className="border rounded rounded-3 mt-1 mb-2">
                                    <FormGroup tag={Col} lg='12' className="mt-n1">
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
                                            // options={selectStatus}
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
                                <Row className="border rounded rounded-3 mt-1 ml-1 mb-2">
                                    <FormGroup tag={Col} lg='12' className="mt-n1">
                                        <Badge color='primary'>
                                            {`Photo`}
                                        </Badge>
                                    </FormGroup>
                                    <FormGroup tag={Col} lg='12' className="">
                                        <SingleStylePhoto
                                            photoData={singleStyleImages}
                                            handleUploadPhotoRemove={handleUploadPhotoRemoveFromCarousel}
                                            handleDefaultPhotoOnCarousel={handleDefaultPhotoOnCarousel}
                                            selectedSetStyle={selectedSetStyle}
                                        />
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
                                                {/* {
                                                    isUploadComplete && (

                                                    )
                                                } */}
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
                                    <FormGroup tag={Col} lg='6' sm="6" xs="6" className="d-flex justify justify-content-end" >
                                        <Button.Ripple onClick={() => { handlePhotoUploadToCarousel(); }} outline tag={Label} color='success' size="sm">
                                            <Upload size={16} />
                                        </Button.Ripple>
                                    </FormGroup>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="border rounded rounded-3 mt-1 mb-2">
                            <FormGroup tag={Col} xs={12} sm={12} md={12} lg={12} xl={12} className="mt-n1">
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
                        <Row className="border rounded rounded-3 mt-1 mb-2">
                            <FormGroup tag={Col} xs={12} sm={12} md={12} lg={12} xl={12} className="mt-n1">
                                <Badge color='primary'>
                                    {`Documents`}
                                </Badge>
                            </FormGroup>
                            <FormGroup tag={Col} xs={12} sm={12} md={12} lg={12} xl={12} >

                                <div className="style-doc-upload-main" {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p className=' text-center'><Upload color="black" size={26} /></p>
                                    <p className="h5 text-dark text-center opacity-100 font-weight-bolder ">{uploadFiles.name ? uploadFiles.name : 'Drop file here ...'}</p>
                                </div>


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
                                    outline
                                    size="sm"
                                >
                                    Upload
                                </Button.Ripple>
                            </FormGroup>
                            <FormGroup tag={Col} lg='12' >
                                <SingleStyleDocumentTable tableData={filesTable} handleFileRemoveFromTable={handleFileRemoveFromTable} />
                            </FormGroup>
                        </Row>
                        <Row>
                            <Col className="d-flex flex-row-reverse">
                                <div className='d-inline-block mb-1 mt-1'>
                                    <Button.Ripple type="reset" className="ml-1 " outline color="secondary" size="sm">Reset</Button.Ripple>
                                    <Button.Ripple onClick={() => { handleCancel(); }} className="ml-1 " outline color="danger" size="sm">Cancel</Button.Ripple>
                                    <Button.Ripple className="ml-1" type="submit" outline color="success" size="sm">Submit</Button.Ripple>
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

export default SingleStyleAddForm;
