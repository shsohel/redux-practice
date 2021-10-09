
import Avatar from '@components/avatar';
import { store } from '@store/storeConfig/store';
import { Edit, File, FileText, MoreVertical, Trash2 } from 'react-feather';
import { Link } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import CustomLightBox from '../../../../../utility/custom/CustomLightBox';
import { deleteStyle, getStyleById, handleOpenStyleForm } from '../store/actions';


// ** Renders Client Columns
const renderClient = row => {
    const stateNum = Math.floor( Math.random() * 6 ),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum];

    if ( row.avatar.length ) {
        return <Avatar className='mr-1' img={row.avatar} width='32' height='32' />;
    } else {
        return <Avatar color={color || 'primary'} className='mr-1' content={row.fullName || 'John Doe'} initials />;
    }
};


const statusObj = {
    pending: 'light-warning',
    active: 'light-success',
    inactive: 'light-secondary'
};

export const stylesTableColumn = [
    {
        name: 'Model No',
        minWidth: '200px',
        selector: 'modelNo',
        sortable: true,
        cell: row => row.modelNo
    },
    {
        name: 'Division',
        minWidth: '200px',
        selector: 'division',
        sortable: true,
        cell: row => row.division
    },
    {
        name: 'Department',
        minWidth: '200px',
        selector: 'department',
        sortable: true,
        cell: row => row.department
    },
    {
        name: 'Buyer',
        minWidth: '200px',
        selector: 'buyer',
        sortable: true,
        cell: row => row.buyer.name
    },
    {
        name: 'Product Category',
        minWidth: '200px',
        selector: 'productCategory',
        sortable: true,
        cell: row => row.productCategory
    },
    {
        name: 'Images',
        minWidth: '200px',
        selector: 'images',
        sortable: false,
        cell: row => (
            <div >
                <CustomLightBox photos={row?.images.map( i => i.urls )} />
            </div>
        )
    },
    {
        name: 'Documents',
        minWidth: '200px',
        selector: 'documents',
        sortable: false,
        cell: row => (
            <File size={20} />
        )
    },
    {
        name: 'Status',
        maxWidth: '108px',
        selector: 'status',
        sortable: true,
        cell: row => (
            <Badge className='text-capitalize' color={statusObj[row.status]} pill>
                {row.status}
            </Badge>
        )
    },
    {
        name: 'Actions',
        maxWidth: '100px',
        cell: row => (
            <UncontrolledDropdown>
                <DropdownToggle tag='div' className='btn btn-sm'>
                    <MoreVertical size={14} className='cursor-pointer' />
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem
                        tag={Link}
                        to={`/merchandising/style/view/${row.id}`}
                        className='w-100'
                        onClick={() => { }}
                    >
                        <FileText color="skyBlue" size={14} className='mr-50' />
                        <span color="primary" className='align-middle'>Details</span>
                    </DropdownItem>
                    <DropdownItem
                        className='w-100'
                        onClick={() => { store.dispatch( getStyleById( row.id ) ); store.dispatch( handleOpenStyleForm( true ) ); }}
                    >
                        <Edit color="green" size={14} className='mr-50' />
                        <span className='align-middle'>Edit</span>
                    </DropdownItem>
                    <DropdownItem className='w-100' onClick={() => store.dispatch( deleteStyle( row.id ) )}>
                        <Trash2 color="red" size={14} className='mr-50' />
                        <span className='align-middle'>Delete</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown >
        )
    }
];
