/* eslint-disable import/no-anonymous-default-export */

import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import reduxThunk from "redux-thunk";
import reducers from "../reducers";
///For Redux Dev Tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
    reducers,
    composeEnhancers( applyMiddleware( reduxThunk ) )
);
export const persistor = persistStore( store )


export default { store, persistor }