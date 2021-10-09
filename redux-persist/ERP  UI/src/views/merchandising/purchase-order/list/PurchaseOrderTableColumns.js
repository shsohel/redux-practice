
import { store } from '@store/storeConfig/store';
import { DollarSign, Edit, FileText, Mail, MoreVertical, Trash2 } from 'react-feather';
import { Link } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { deletePurchaseOrder } from '../store/actions';


const statusObj = {
    pending: 'light-warning',
    active: 'light-success',
    inactive: 'light-secondary'
};

export const purchaseOrderTableColumn = [
    {
        name: 'PO NO',
        minWidth: '140px',
        selector: 'purchaseOrderNo',
        sortable: true,
        cell: row => row.purchaseOrderNo
    },
    {
        name: 'Style NO',
        minWidth: '140px',
        selector: 'styleNo',
        sortable: true,
        cell: row => row.styleNo
    },
    {
        name: 'Buyer',
        minWidth: '140px',
        selector: 'buyer',
        sortable: true,
        cell: row => row.buyer.name
    },
    {
        name: 'Buyer PO NO',
        minWidth: '140px',
        selector: 'buyerPurchaseOrderNo',
        sortable: true,
        cell: row => row.buyerPurchaseOrderNo
    },
    {
        name: 'PO Order Date',
        minWidth: '140px',
        selector: 'purchaseOrderDate',
        sortable: true,
        cell: row => row.purchaseOrderDate
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
                <DropdownMenu right >
                    <DropdownItem
                        className='w-100'
                        onClick={( e ) => { e.preventDefault(); }}
                    >
                        <DollarSign color="green" size={14} className='mr-50' />
                        <span className='align-middle'>Costing</span>
                    </DropdownItem>
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
                        onClick={( e ) => { e.preventDefault(); }}
                    >
                        <Edit color="green" size={14} className='mr-50' />
                        <span className='align-middle'>Edit</span>
                    </DropdownItem>
                    <DropdownItem className='w-100' onClick={() => store.dispatch( deletePurchaseOrder( row.id ) )}>
                        <Trash2 color="red" size={14} className='mr-50' />
                        <span className='align-middle'>Delete</span>
                    </DropdownItem>
                    <DropdownItem
                        className='w-100'
                        onClick={( e ) => { e.preventDefault(); }}
                    >
                        <Mail color="green" size={14} className='mr-50' />
                        <span className='align-middle'>Forward</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown >
        )
    }
];
