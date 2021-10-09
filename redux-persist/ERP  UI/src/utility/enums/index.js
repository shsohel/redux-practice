// Currency
export const selectCurrency = [
    { value: 1, label: 'BDT' },
    { value: 2, label: 'USA' }
];

///Year 
export const selectYear = [
    { value: '2019', label: '2019' },
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' }
];

///Destination 
export const selectDestination = [
    { value: 'Bangladesh', label: 'Bangladesh' },
    { value: 'Australia', label: 'Australia' },
    { value: 'China', label: 'China' },
    { value: 'Japan', label: 'Japan' },
    { value: 'India', label: 'India' }
];
///Unit 

export const selectUnit = [
    {
        value: 'PCS',
        label: 'PCS'
    },
    {
        value: 'DZN',
        label: 'DZN'
    },
    {
        value: 'Pair',
        label: 'Pair'
    }
];

export const selectExporter = [
    {
        value: 'RDM',
        label: 'RDM'
    },
    {
        value: 'YOUNG ONE',
        label: 'YOUNG ONE'
    }
];

export const selectShipmentMode = [
    {
        value: 'AIR',
        label: 'AIR'
    },
    {
        value: 'SEA',
        label: 'SEA'
    },
    {
        value: 'ROAD',
        label: 'ROAD'
    }
];

export const selectActionStatus = [
    {
        value: 'APPROVED',
        label: 'APPROVED'
    },
    {
        value: 'PENDING',
        label: 'PENDING'
    },
    {
        value: 'CONFIRMED',
        label: 'CONFIRMED'
    }
];
export const status = {
    success: 200,
    badRequest: 404,
    severError: 500
};

//Country Array Demo
export const selectedCountry = [
    { value: 'bangladesh', label: 'Bangladesh' },
    { value: 'india', label: 'India' },
    { value: 'pakistan', label: 'pakistan' },
    { value: 'nepal', label: 'Nepal' }
];


//State Array Demo
export const selectedState = [
    { value: 'bangladesh', label: 'Bangladesh' },
    { value: 'india', label: 'India' },
    { value: 'pakistan', label: 'pakistan' },
    { value: 'nepal', label: 'Nepal' }
];


//Country Array Demo
export const selectedCity = [
    { value: 'chittagong', label: 'Chittagong' },
    { value: 'dhaka', label: 'Dhaka' },
    { value: 'rajshahi', label: 'rajshahi' },
    { value: 'feni', label: 'Feni' }
];
//Country Array Demo
export const selectColor = [
    { value: 'BLUE', label: 'BLUE' },
    { value: 'RED', label: 'RED' },
    { value: 'GREEN', label: 'GREEN' }
];
//Country Array Demo
export const selectSize = [
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
    { value: 'XLL', label: 'XLL' }
];
//Country Array Demo
export const selectSetStyles = [
    { value: 'SF21MW5504-A', label: 'F21MW5504-A' },
    { value: 'F21MW5504-B', label: 'F21MW5504-B' },
    { value: 'F21MW5504-C', label: 'F21MW5504-C' },
    { value: 'F21MW5504-D', label: 'F21MW5504-D' },
    { value: 'S21MW1504-A', label: 'S21MW1504-A' }
];
export const selectStyles = [
    { value: 'SF21MW5501', label: 'F21MW5501' },
    { value: 'F21MW5502', label: 'F21MW5502' },
    { value: 'F21MW5503', label: 'F21MW5503' },
    { value: 'F21MW5504', label: 'F21MW5504' },
    { value: 'S21MW1505', label: 'S21MW1505' }
];

// ** Season Status filter options: Demo Array
export const statusOptions = [
    { value: true, label: 'Active', number: 1 },
    { value: false, label: 'Inactive', number: 2 }
];

export const statusFor = [
    { value: 'Buyer', label: 'Buyer' },
    { value: 'Buyer Agent', label: 'Buyer Agent' }
];


export const confirmObj = {
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    confirmButtonText: 'Yes !',
    cancelButtonText: 'No'
};

///For Size  Combination of Set Packaging
export const selectSizeType = [
    { label: 'Solid Size', value: 1 },
    { label: 'Assort Size', value: 2 }
];
export const sizeTypeEnumObj = {
    SolidSize: 'Solid Size',
    assortSize: 'Assort Size'
};

///For Size Color Combination  of Solid Packaging
export const selectSizeColorType = [
    { label: 'Solid Color and Solid Size', value: 1 },
    { label: 'Solid Color and Assort Size', value: 2 },
    { label: 'Assort Color and Solid Size', value: 3 },
    { label: 'Assort Color and Assort Size', value: 4 }
];
export const sizeColorTypeEnumObj = {
    solidColorAndAssortSize: 'Solid Color and Assort Size',
    solidColorAndSolidSize: 'Solid Color and Solid Size',
    assortColorAndSolidSize: 'Assort Color and Solid Size',
    assortColorAndAssortSize: 'Assort Color and Assort Size'
};
