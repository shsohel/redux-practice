import axios from 'axios';


const { REACT_APP_BASE_URL_SERVER_API, REACT_APP_BASE_URL_LOCAL_API, REACT_APP_BASE_URL_LOCAL_HOST } = process.env;


export default axios.create( {
    // baseURL: 'http://localhost:5001'
    //  baseURL: 'http://192.168.0.18:89'
    baseURL: REACT_APP_BASE_URL_LOCAL_API
} );
