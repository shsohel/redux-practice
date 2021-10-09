import React from 'react';

const BuyerProductDeveloperExpandRow = ( { data } ) => {
    return (
        <div
            style={{ backgroundColor: 'white', color: 'black' }} className='expandable-content p-2'

        >
            <p >
                <span ><strong>Address : </strong>{data.fullAddress}, </span>

                <span> <strong>Country :</strong> {data.country}, </span>


                <span><strong>State : </strong>{data.state},</span>


                <span > <strong>City : </strong>
                    {data.city},
                </span>

                <span > <strong>Zip Code :</strong>
                    {data.zipCode},

                </span>

                <span > <strong>Street:</strong>
                    {data.street}

                </span>


            </p>

        </div>
    );
};

export default BuyerProductDeveloperExpandRow;
