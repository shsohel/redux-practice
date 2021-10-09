import { store } from '@store/storeConfig/store';
import { Edit, FileText, MoreVertical, Trash2 } from 'react-feather';
import { Link } from 'react-router-dom';
import DropdownItem from 'reactstrap/lib/DropdownItem';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import UncontrolledDropdown from 'reactstrap/lib/UncontrolledDropdown';
import { deleteMerchandiser, getMerchandiserById, handleOpenMerchandiserSidebar } from '../store/actions';


const statusObj = {
    active: 'light-success',
    inactive: 'light-secondary'
};


export const MerchandiserTableColumns = [
    {
        name: 'First Name',
        minWidth: '200px',
        selector: 'firstName',
        sortable: true,
        cell: row => row.firstName
    },
    {
        name: 'Last Name',
        minWidth: '200px',
        selector: 'lastName',
        sortable: true,
        cell: row => row.lastName
    },
    {
        name: ' Name',
        minWidth: '200px',
        selector: 'name',
        sortable: true,
        cell: row => row.name
    },
    {
        name: 'Email',
        minWidth: '200px',
        selector: 'email',
        sortable: true,
        cell: row => row.email
    },
    // {
    //     name: 'Login',
    //     minWidth: '200px',
    //     selector: 'login',
    //     sortable: true,
    //     cell: row => row.login
    // },
    // {
    //     name: 'Phone',
    //     minWidth: '200px',
    //     selector: 'phoneNumber',
    //     sortable: true,
    //     cell: row => row.phoneNumber
    // },
    // {
    //     name: 'Fax',
    //     minWidth: '200px',
    //     selector: 'fax',
    //     sortable: true,
    //     cell: row => row.fax
    // },
    // {
    //     name: 'photo',
    //     minWidth: '200px',
    //     selector: 'photo',
    //     sortable: true,
    //     cell: row => (
    //         <div className='d-flex justify-content-left align-items-center'>
    //             <Avatar
    //                 img={row.photo ? row.photo : defaultAvatar}
    //                 alt=''
    //                 content='Peter Ingraham' initials

    //             />

    //         </div>
    //     )


    // },
    // {
    //     name: 'Status',
    //     maxWidth: '108px',
    //     selector: 'status',
    //     sortable: true,
    //     cell: row => (
    //         <Badge className='text-capitalize' color={statusObj[row.status ? 'active' : 'inactive']} pill>
    //             {row.status ? 'active' : 'inactive'}
    //         </Badge>

    //     )
    // },
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
                        to={`/apps/user/view/${row.id}`}
                        className='w-100'
                        onClick={() => { }}
                    >
                        <FileText color='skyBlue' size={14} className='mr-50' />
                        <span color='primary' className='align-middle'>Details</span>

                    </DropdownItem>

                    <DropdownItem
                        className='w-100'
                        onClick={() => {
                            store.dispatch( getMerchandiserById( row.id ) );
                            store.dispatch( handleOpenMerchandiserSidebar( true ) );
                        }}
                    >
                        <Edit color='green' size={14} className='mr-50' />
                        <span className='align-middle'>Edit</span>
                    </DropdownItem>

                    <DropdownItem
                        className='w-100'
                        onClick={() => store.dispatch( deleteMerchandiser( row.id ) )}
                    >
                        <Trash2 color='red' size={14} className='mr-50' />
                        <span className='align-middle'>Delete</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }

];