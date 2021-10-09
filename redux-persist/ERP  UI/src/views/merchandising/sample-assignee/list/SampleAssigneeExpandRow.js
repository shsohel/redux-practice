import React from 'react';

const SampleAssigneeExpandRow = ( { data } ) => {
    return (
        <div
            style={{ backgroundColor: 'white', color: 'black' }} className='expandable-content p-2'

        >
            <p >
                <span className='font-weight-bold'>Address :</span>
                {data.address.address},

                <span className='font-weight-bold'>Country :</span>

                {data.address.country},
                <span className='font-weight-bold'>State :</span>

                {data.address.state},
                <span className='font-weight-bold'>City :</span>

                {data.address.city},
                <span className='font-weight-bold'>Zip Code :</span>

                {data.address.zipCode},
                <span className='font-weight-bold'>Street :</span>

                {data.address.street}


            </p>

        </div>
    );
};

export default SampleAssigneeExpandRow;
