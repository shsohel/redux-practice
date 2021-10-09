import React, { useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import { ChevronRight } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardBody, CardHeader, CardTitle, Col, CustomInput, Nav, NavItem, NavLink, Row, TabContent, Table, TabPane } from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import { getIdFromUrl } from '../../../../utility/Utils';
const qs = require( 'query-string' );


const icons = {
    check: <span></span>,
    // uncheck: <span><Square /></span>,
    halfCheck: <span></span>,

    expandClose: <span><ChevronRight size={20} /></span>,

    expandOpen: <span><ChevronRight size={14} /></span>,
    expandAll: <span><ChevronRight size={14} /></span>,
    collapseAll: <span></span>,
    parentClose: <span></span>,
    parentOpen: <span></span>,
    leaf: <span></span>
};


const nodes = [
    {
        value: "/app",
        label: "app",
        children: [
            {
                value: "/app/Http",
                label: "Http",
                children: [
                    {
                        value: "/app/Http/Controllers",
                        label: "Controllers",
                        children: [
                            {
                                value: "/app/Http/Controllers/WelcomeController.js",
                                label: "WelcomeController.js"
                            }
                        ]
                    },
                    {
                        value: "/app/Http/routes.js",
                        label: "routes.js"
                    }
                ]
            },
            {
                value: "/app/Providers",
                label: "Providers",
                children: [
                    {
                        value: "/app/Http/Providers/EventServiceProvider.js",
                        label: "EventServiceProvider.js"
                    }
                ]
            }
        ]
    },
    {
        value: "/config",
        label: "config",
        children: [
            {
                value: "/config/app.js",
                label: "app.js"
            },
            {
                value: "/config/database.js",
                label: "database.js"
            }
        ]
    },
    {
        value: "/public",
        label: "public",
        children: [
            {
                value: "/public/assets/",
                label: "Welcome",
                children: [
                    {
                        value: "/public/assets/style.css",
                        label: "style.css"
                    }
                ]
            },
            {
                value: "/public/index.html",
                label: "index.html"
            }
        ]
    },
    {
        value: "/.env",
        label: ".env"
    },
    {
        value: "/.gitignore",
        label: ".gitignore"
    },
    {
        value: "/README.md",
        label: "README.md"
    }
];

const AssignPermissionToRole = () => {

    const [check, setCheck] = useState( {
        checked: [],
        expanded: []
    } );
    const [active, setActive] = useState( '1' );

    const toggle = tab => {
        if ( active !== tab ) {
            setActive( tab );
        }
    };
    const roleId = getIdFromUrl();
    const [state, setState] = useState( 0 );

    return (
        <div >
            <Card>
                <CardHeader>
                    <CardTitle tag='h4' >Module </CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>


                        <Col lg='2' md='4' sm='4'
                        >
                            <div style={{ width: '300px' }}>


                                <PerfectScrollbar className='sidebar-menu-list' options={{ wheelPropagation: false }}>


                                    <div className='nav-vertical border-right '>
                                        <Nav tabs className='nav-left'>
                                            <NavItem>
                                                <NavLink
                                                    active={active === '1'}
                                                    onClick={() => {
                                                        toggle( '1' );
                                                    }}
                                                >
                                                    <span>Merchandiser</span>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    active={active === '2'}
                                                    onClick={() => {
                                                        toggle( '2' );
                                                    }}
                                                >
                                                    <span>Inventory</span>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    active={active === '3'}
                                                    onClick={() => {
                                                        toggle( '3' );
                                                    }}
                                                >
                                                    <span>Production</span>

                                                </NavLink>
                                            </NavItem>
                                        </Nav>

                                    </div>

                                </PerfectScrollbar>
                            </div>
                        </Col>
                        <Col lg='10' md='6' sm='6'>
                            <PerfectScrollbar className='sidebar-menu-list' options={{ wheelPropagation: false }}>
                                <CheckboxTree
                                    icons={icons}
                                    showCheckbox
                                    showNodeIcon
                                    nodes={nodes}
                                    checked={check.checked}
                                    expanded={check.expanded}
                                    onCheck={checked => check.setCheck( { checked } )}
                                    onExpand={expanded => check.setCheck( { expanded } )}
                                />
                            </PerfectScrollbar>
                        </Col>
                    </Row>
                    <br />
                    {/* <hr style={{
                        border: "none",
                        borderLeft: " 1px solid hsla(200, 10%, 50%,100)",
                        height: "100vh",
                        width: "1px"
                    }} /> */}
                    <hr />
                    <Row>

                        <Col lg='2'>
                            <div className='nav-vertical'>
                                <Nav tabs className='nav-left'>
                                    <NavItem>
                                        <NavLink
                                            active={active === '1'}
                                            onClick={() => {
                                                toggle( '1' );
                                            }}
                                        >
                                            <Button>Merchandiser</Button>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            active={active === '2'}
                                            onClick={() => {
                                                toggle( '2' );
                                            }}
                                        >
                                            <Button>Inventory</Button>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            active={active === '3'}
                                            onClick={() => {
                                                toggle( '3' );
                                            }}
                                        >
                                            <Button>Production</Button>

                                        </NavLink>
                                    </NavItem>
                                </Nav>

                            </div>
                        </Col>

                        <Col lg='10'>
                            <div>
                                <TabContent activeTab={active}>
                                    <TabPane tabId='1'>

                                        <Table >
                                            <thead >
                                                <tr>
                                                    <th>Module</th>
                                                    <th>Read</th>
                                                    <th>Write</th>
                                                    <th>Create</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='admin-1' label='' defaultChecked disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='admin-2' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='admin-3' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='admin-4' label='' disabled />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Staff</td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='staff-1' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='staff-2' label='' defaultChecked disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='staff-3' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='staff-4' label='' disabled />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Author</td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='author-1' label='' defaultChecked disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='author-2' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='author-3' label='' defaultChecked disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='author-4' label='' disabled />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Contributor</td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='contributor-1' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='contributor-2' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='contributor-3' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='contributor-4' label='' disabled />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>User</td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='user-1' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='user-2' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='user-3' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='user-4' label='' defaultChecked disabled />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </TabPane>
                                    <TabPane tabId='2'>

                                        <Table >
                                            <thead >
                                                <tr>
                                                    <th>Module</th>
                                                    <th>Read</th>
                                                    <th>Write</th>
                                                    <th>Create</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Admin</td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='admin-1' label='' defaultChecked disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='admin-2' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='admin-3' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='admin-4' label='' disabled />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Staff</td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='staff-1' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='staff-2' label='' defaultChecked disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='staff-3' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='staff-4' label='' disabled />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Author</td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='author-1' label='' defaultChecked disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='author-2' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='author-3' label='' defaultChecked disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='author-4' label='' disabled />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Contributor</td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='contributor-1' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='contributor-2' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='contributor-3' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='contributor-4' label='' disabled />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>User</td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='user-1' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='user-2' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='user-3' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='user-4' label='' defaultChecked disabled />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>

                                    </TabPane>
                                    <TabPane tabId='3'>

                                        <Table >
                                            <thead >
                                                <tr>
                                                    <th>Module</th>
                                                    <th>Read</th>
                                                    <th>Write</th>
                                                    <th>Create</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='admin-1' label='' defaultChecked disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='admin-2' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='admin-3' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='admin-4' label='' disabled />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Staff</td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='staff-1' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='staff-2' label='' defaultChecked disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='staff-3' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='staff-4' label='' disabled />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Author</td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='author-1' label='' defaultChecked disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='author-2' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='author-3' label='' defaultChecked disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='author-4' label='' disabled />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Contributor</td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='contributor-1' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='contributor-2' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='contributor-3' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='contributor-4' label='' disabled />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>User</td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='user-1' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='user-2' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='user-3' label='' disabled />
                                                    </td>
                                                    <td>
                                                        <CustomInput type='checkbox' id='user-4' label='' defaultChecked disabled />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </TabPane>
                                </TabContent>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default AssignPermissionToRole;
