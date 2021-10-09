import _ from 'lodash';
import React, { Fragment } from 'react';
import { X } from 'react-feather';
import { Button, Table } from 'reactstrap';
import { randomIdGenerator } from '../../../../../utility/Utils';

const DocumentTable = ( { tableData, handleFileRemoveFromTable } ) => {
    const sortArray = tableData.sort( function ( a, b ) {
        return ( b.revisionNo ) - ( a.revisionNo );
    } );
    const grouped = _.groupBy( sortArray, function ( d ) {
        return d.documentCategory;
    } );

    return (
        <Table size="sm" bordered responsive className='table table-striped table-hover'>
            <thead className="thead-light text-capitalize">
                <tr>
                    <th >Category</th>
                    <th>Revision No</th>
                    <th>Date</th>
                    <th>File Name</th>
                    <th>File Type</th>
                    <th className='text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys( grouped ).map( ( item, n ) => {
                    return grouped[item].map( ( i, index ) => ( index === 0 ? (
                        <tr key={randomIdGenerator()}>
                            <td rowSpan={grouped[item].length} >
                                {i.documentCategory}
                            </td>
                            <td key={randomIdGenerator()} rowSpan="1" >
                                {i.revisionNo}
                            </td>
                            <td key={randomIdGenerator()} rowSpan="1">
                                {i.uploadDate}
                            </td>
                            <td key={randomIdGenerator()} rowSpan="1">
                                {i.name}
                            </td>
                            <td key={randomIdGenerator()} rowSpan="1">
                                {i.type}
                            </td>
                            <td key={randomIdGenerator()} rowSpan="1" className="text-center">
                                <Fragment>
                                    <Button.Ripple onClick={() => { handleFileRemoveFromTable( i.id ); }} className='btn-icon' color='flat-danger'>
                                        <X size={16} />
                                    </Button.Ripple>
                                </Fragment>
                            </td>
                        </tr>
                    ) : (
                        <tr key={randomIdGenerator()}>
                            <td key={randomIdGenerator()} rowSpan="1">
                                {i.revisionNo}
                            </td>
                            <td key={randomIdGenerator()} rowSpan="1">
                                {i.uploadDate}
                            </td>
                            <td key={randomIdGenerator()} rowSpan="1">
                                {i.name}
                            </td>
                            <td key={randomIdGenerator()} rowSpan="1">
                                {i.type}
                            </td>
                            <td key={randomIdGenerator()} rowSpan="1" className="text-center">
                                <Fragment>
                                    <Button.Ripple onClick={() => { handleFileRemoveFromTable( i.id ); }} className='btn-icon' color='flat-danger'>
                                        <X size={16} />
                                    </Button.Ripple>
                                </Fragment>
                            </td>
                        </tr>
                    ) )
                    );
                } )}
            </tbody>
        </Table >
    );
};

export default DocumentTable;
