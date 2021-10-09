import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png';
import { store } from '@store/storeConfig/store';
import { Edit, FileText, MoreVertical, Trash2 } from 'react-feather';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import DropdownItem from 'reactstrap/lib/DropdownItem';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import UncontrolledDropdown from 'reactstrap/lib/UncontrolledDropdown';
import { deleteSampleAssignee, getSampleAssigneeById, handleOpenSampleAssigneeSidebar } from '../store/actions';


const statusObj = {
    active: 'light-success',
    inactive: 'light-secondary'
};


export const SampleAssigneeTableColumns = [
    {
        name: 'Full Name',
        minWidth: '200px',
        selector: 'fullName',
        sortable: true,
        cell: row => row.fullName
    },
    {
        name: 'Email',
        minWidth: '200px',
        selector: 'email',
        sortable: true,
        cell: row => row.email
    },
    {
        name: 'Phone',
        minWidth: '200px',
        selector: 'phoneNumber',
        sortable: true,
        cell: row => row.phoneNumber
    },
    {
        name: 'Fax',
        minWidth: '200px',
        selector: 'fax',
        sortable: true,
        cell: row => row.fax
    },
    {
        name: 'photo',
        minWidth: '200px',
        selector: 'photo',
        sortable: true,
        cell: row => (
            <Avatar img={row.photo ? row.photo : defaultAvatar} />
        )
    },
    {
        name: 'Status',
        maxWidth: '108px',
        selector: 'status',
        sortable: true,
        cell: row => (
            <Badge
                className='text-capitalize'
                color={statusObj[row.status ? 'active' : 'inactive']}
            >
                {row.status ? 'active' : 'inactive'}
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
                        to={`/apps/user/view/${row.id}`}
                        className='w-100'
                        onClick={() => { }}
                    >
                        <FileText color='skyBlue' size={14} className='mr-50' />
                        <span color='primary' className='align-middle'>Details</span>

                    </DropdownItem>

                    <DropdownItem
                        className='w-100'
                        onClick={() => { store.dispatch( getSampleAssigneeById( row.id ) ); store.dispatch( handleOpenSampleAssigneeSidebar( true ) ); }}
                    >
                        <Edit color='green' size={14} className='mr-50' />
                        <span className='align-middle'>Edit</span>
                    </DropdownItem>

                    <DropdownItem
                        className='w-100'
                        onClick={() => store.dispatch( deleteSampleAssignee( row.id ) )}
                    >
                        <Trash2 color='red' size={14} className='mr-50' />
                        <span className='align-middle'>Delete</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }

];
