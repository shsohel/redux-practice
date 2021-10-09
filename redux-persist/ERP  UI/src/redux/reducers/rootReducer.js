/* eslint-disable space-in-parens */

import buyerAgents from '@src/views/merchandising/buyer-agent/store/reducers';
import buyerDepartments from '@src/views/merchandising/buyer-department/store/reducers';
import productDevelopers from '@src/views/merchandising/buyer-product-developer/store/reducers';
import buyers from '@src/views/merchandising/buyer/store/reducers';
import colors from '@src/views/merchandising/color/store/reducers';
import merchandisers from '@src/views/merchandising/merchandiser/store/reducers';
import preCostings from '@src/views/merchandising/pre-costing/store/reducers';
import purchaseOrders from '@src/views/merchandising/purchase-order/store/reducers';
import sampleAssignees from '@src/views/merchandising/sample-assignee/store/reducers';
import seasons from '@src/views/merchandising/season/store/reducers';
import sizeGroups from '@src/views/merchandising/size-group/store/reducers';
import sizes from '@src/views/merchandising/size/store/reducers';
import statuses from '@src/views/merchandising/status/store/reducers';
import styleCategories from '@src/views/merchandising/style-master/style-category/store/reducers';
import departments from '@src/views/merchandising/style-master/style-department/store/reducers';
import divisions from '@src/views/merchandising/style-master/style-division/store/reducers';
import productCategories from '@src/views/merchandising/style-master/style-product-category/store/reducers';
import setStyles from '@src/views/merchandising/style/set-style/store/reducers';
import styles from '@src/views/merchandising/style/single-style/store/reducers';
import modules from '@src/views/user-management/module/store/reducers';
import roles from '@src/views/user-management/role/store/reducers';
import users from '@src/views/user-management/user/store/reducers';
import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from './auth';
import layout from './layout';
import navbar from './navbar';

const rootReducer = combineReducers( {
  auth,
  navbar,
  layout,
  //start merchandising 
  buyers,
  styles,
  setStyles,
  purchaseOrders,
  buyerAgents,
  merchandisers,
  divisions,
  seasons,
  sizes,
  sizeGroups,
  preCostings,
  colors,
  departments,
  styleCategories,
  productCategories,
  sampleAssignees,
  productDevelopers,
  modules,
  roles,
  users,
  buyerDepartments,
  statuses
  ///end merchandising
} );

const persistConfig = {
  key: 'root',
  storage
};


export default persistReducer( persistConfig, rootReducer );
