import { store } from '@store/storeConfig/store';
import { Edit, FileText, MoreVertical, Trash2 } from 'react-feather';
import { Link } from 'react-router-dom';
import DropdownItem from 'reactstrap/lib/DropdownItem';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import UncontrolledDropdown from 'reactstrap/lib/UncontrolledDropdown';
import { deleteDepartment, getDepartmentById, handleOpenDepartmentSidebar } from '../store/actions';


const statusObj = {
    active: 'light-success',
    inactive: 'light-secondary'
};


export const DepartmentTableColumns = [
    {
        name: 'Department Name',
        minWidth: '200px',
        selector: 'name',
        sortable: true,
        cell: row => row.name
    },

    {
        name: 'Product Category ',
        minWidth: '200px',
        selector: 'productCategories',
        sortable: true,
        cell: row => row.productCategories
    },

    // {
    //     name: 'Product Category ',
    //     minWidth: '200px',
    //     selector: 'productCategory',
    //     sortable: true,
    //     cell: row => row.productCategory.map( i => i.name ).join( ',' )
    // },
    {
        name: 'Description',
        minWidth: '200px',
        selector: 'description',
        sortable: true,
        cell: row => row.description
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
                        onClick={() => { store.dispatch( getDepartmentById( row.id ) ); store.dispatch( handleOpenDepartmentSidebar( true ) ); }}
                    >
                        <Edit color='green' size={14} className='mr-50' />
                        <span className='align-middle'>Edit</span>
                    </DropdownItem>

                    <DropdownItem
                        className='w-100'
                        onClick={() => store.dispatch( deleteDepartment( row.id ) )}
                    >
                        <Trash2 color='red' size={14} className='mr-50' />
                        <span className='align-middle'>Delete</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }

];