import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";
import streamReducer from './streamReducer';


const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers( {
    auth: authReducer,
    form: formReducer,
    streams: streamReducer
} );

export default persistReducer( persistConfig, rootReducer );