
// import PackagingForSingleStyle from './merchandising/packaging/PackagingForSingleStyle';
import '@custom-styles/merchandising/others/packaging-sc-combination-table.scss';
import React from 'react';
import FormData from './test/practices/FormDataState';

const TestPage = () => {
    // const firstFunction = ( _callback ) => {
    //     // do some asynchronous work
    //     // and when the asynchronous stuff is complete
    //     _callback();
    // };

    // const secondFunction = () => {
    //     // call first function and pass in a callback function which
    //     // first function runs when it has completed
    //     firstFunction( () => {
    //         console.log( 'huzzah, I\'m done!' );
    //     } );
    // };

    // console.log( secondFunction() );

    // fsf
    return (
        <>
            {/* <TabDesign />
            <hr />
            <DrawerOpenInstantCreate /> */}
            {/* <PackagingForSingleStyle /> */}
            {/* <PackagingForSetStyle /> */}
            <FormData />

        </>
    );
};

export default TestPage;
