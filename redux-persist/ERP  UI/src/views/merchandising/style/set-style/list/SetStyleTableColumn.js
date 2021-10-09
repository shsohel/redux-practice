
import Avatar from '@components/avatar';
import { store } from '@store/storeConfig/store';
import { Edit, FileText, MoreVertical, Trash2 } from 'react-feather';
import { Link } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { deleteSetStyle, getSetStyleById } from '../store/actions';


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

export const setStylesTableColumn = [
    {
        name: 'Style No',
        minWidth: '200px',
        selector: 'styleNo',
        sortable: true,
        cell: row => row.styleNo
    },
    {
        name: 'Buyer',
        minWidth: '200px',
        selector: 'buyerName',
        sortable: true,
        cell: row => row.buyer.buyerName
    },
    {
        name: 'Session',
        minWidth: '200px',
        selector: 'sessionName',
        sortable: true,
        cell: row => row.session.sessionName
    },
    {
        name: 'Year',
        minWidth: '100px',
        selector: 'year',
        sortable: true,
        cell: row => row.year.yearName
    },
    {
        name: 'Documents',
        minWidth: '200px',
        selector: 'documents',
        sortable: false,
        cell: row => ''
    },
    {
        name: 'Images',
        minWidth: '200px',
        selector: 'division',
        sortable: false,
        cell: row => ''
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
                        onClick={() => { store.dispatch( getSetStyleById( row.id ) ); }}
                    >
                        <Edit color="green" size={14} className='mr-50' />
                        <span className='align-middle'>Edit</span>
                    </DropdownItem>
                    <DropdownItem className='w-100' onClick={() => store.dispatch( deleteSetStyle( row.id ) )}>
                        <Trash2 color="red" size={14} className='mr-50' />
                        <span className='align-middle'>Delete</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown >
        )
    }
];
