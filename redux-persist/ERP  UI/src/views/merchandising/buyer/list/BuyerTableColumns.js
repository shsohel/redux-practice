import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png';
import { store } from '@store/storeConfig/store';
import { Edit, FileText, MoreVertical, Trash2 } from 'react-feather';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { deleteBuyer, getBuyerById, handleAssignAgent, handleAssignProductDeveloper, handleOpenBuyerSidebar } from '../store/actions';


const statusObj = {
    active: 'light-success',
    inactive: 'light-secondary'
};

export const buyerTableColumn = [
    {
        name: 'Name',
        minWidth: '200px',
        selector: 'name',
        sortable: true,
        cell: row => row.name
    },
    {
        name: 'Short Name',
        minWidth: '200px',
        selector: 'shortName',
        sortable: true,
        cell: row => row.shortName
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
        name: 'Buyer Department ',
        minWidth: '200px',
        selector: 'buyerDepartment',
        sortable: true,
        cell: row => row?.buyerDepartment?.map( i => i.name ).join( ',' )
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
                        className='w-100'
                        onClick={() => {
                            store.dispatch( handleAssignAgent( {
                                buyerId: row.id,
                                buyerName: row.name,
                                isAgentAssign: true
                            } ) );
                        }}
                    >
                        <FileText color="skyBlue" size={14} className='mr-50' />
                        <span color="primary" className='align-middle'>Assign Agent</span>
                    </DropdownItem>

                    <DropdownItem
                        className='w-100'
                        onClick={() => {
                            store.dispatch( handleAssignProductDeveloper( {
                                buyerId: row.id,
                                buyerName: row.name,
                                isProductDeveloperAssign: true
                            } ) );
                        }}
                    >
                        <FileText color="skyBlue" size={14} className='mr-50' />
                        <span color="primary" className='align-middle'>Assign Product Developer</span>
                    </DropdownItem>

                    <DropdownItem
                        className='w-100'
                        onClick={() => { store.dispatch( getBuyerById( row.id ) ); store.dispatch( handleOpenBuyerSidebar( true ) ); }}
                    >
                        <Edit color="green" size={14} className='mr-50' />
                        <span className='align-middle'>Edit</span>
                    </DropdownItem>
                    <DropdownItem className='w-100' onClick={() => store.dispatch( deleteBuyer( row.id ) )}>
                        <Trash2 color="red" size={14} className='mr-50' />
                        <span className='align-middle'>Delete</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown >
        )
    }
];
