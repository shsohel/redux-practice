
import { lazy } from 'react';

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template';

// ** Default Route
const DefaultRoute = '/home';

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy( () => import( '../../views/Home' ) )
  },
  {
    path: '/buyers',
    component: lazy( () => import( '../../views/merchandising/buyer/list' ) )

  },
  {
    path: '/buyer-agents',
    component: lazy( () => import( '../../views/merchandising/buyer-agent/list' ) )

  },
  {
    path: '/buyer-product-developers',
    component: lazy( () => import( '../../views/merchandising/buyer-product-developer/list' ) )

  },
  {
    path: '/buyer-departments',
    component: lazy( () => import( '../../views/merchandising/buyer-department/list' ) )

  },
  {
    path: '/sample-assignee',
    component: lazy( () => import( '../../views/merchandising/sample-assignee/list' ) )

  },
  {
    path: '/merchandisers',
    component: lazy( () => import( '../../views/merchandising/merchandiser/list' ) )

  },
  {
    path: '/divisions',
    component: lazy( () => import( '../../views/merchandising/style-master/style-division/list' ) )
  },
  {
    path: '/colors',
    component: lazy( () => import( '../../views/merchandising/color/list' ) )

  },
  {
    path: '/statuses',
    component: lazy( () => import( '../../views/merchandising/status/list' ) )

  },
  {
    path: '/users',
    component: lazy( () => import( '../../views/user-management/user/list' ) )

  },
  {
    path: '/user-roles',
    component: lazy( () => import( '../../views/user-management/role/list' ) )

  },
  {
    path: '/user-modules',
    component: lazy( () => import( '../../views/user-management/module/list' ) )
  },
  {
    path: '/assign-permissions',
    component: lazy( () => import( '../../views/user-management/permissions/form/AssignPermissionToRole' ) )
  },

  {
    path: '/style-department',
    component: lazy( () => import( '../../views/merchandising/style-master/style-department/list' ) )

  },
  {
    path: '/style-category',
    component: lazy( () => import( '../../views/merchandising/style-master/style-category/list' ) )

  },
  {
    path: '/style-product-category',
    component: lazy( () => import( '../../views/merchandising/style-master/style-product-category/list' ) )

  },
  {
    path: '/seasons',
    component: lazy( () => import( '../../views/merchandising/season/list' ) )
  },
  {
    path: '/sizes',
    component: lazy( () => import( '../../views/merchandising/size/list' ) )
  },
  {
    path: '/size-groups',
    component: lazy( () => import( '../../views/merchandising/size-group/list' ) )
  },
  {
    path: '/single-styles',
    component: lazy( () => import( '../../views/merchandising/style/single-style/list' ) )

  },
  {
    path: '/new-single-style',
    component: lazy( () => import( '../../views/merchandising/style/single-style/form/SingleStyleAddForm' ) )

  },
  {
    path: '/edit-style/:id',
    component: lazy( () => import( '../../views/merchandising/style/single-style/form/SingleStyleEditForm' ) ),
    meta: {
      navLink: '/edit-style'
    }
  },
  {
    path: '/pre-costings',
    component: lazy( () => import( '../../views/merchandising/pre-costing/list' ) )
  },
  {
    path: '/new-pre-costing',
    component: lazy( () => import( '../../views/merchandising/pre-costing/form/PreCostingAddForm' ) )
  },
  {
    path: '/new-purchase-order',
    component: lazy( () => import( '../../views/merchandising/purchase-order/form/PurchaseOrderAddForm' ) )
  },
  {
    path: '/set-styles',
    component: lazy( () => import( '../../views/merchandising/style/set-style/list' ) )
  },
  {
    path: '/new-set-style',
    component: lazy( () => import( '../../views/merchandising/style/set-style/form/SetStyleAddForm' ) )
  },
  {
    path: '/purchase-order',
    component: lazy( () => import( '../../views/merchandising/purchase-order/list' ) )

  },
  {
    path: '/new-single-packaging',
    component: lazy( () => import( '../../views/merchandising/packaging/PackagingForSingleStyle' ) )

  },
  {
    path: '/new-set-packaging',
    component: lazy( () => import( '../../views/merchandising/packaging/PackagingForSetStyle' ) )

  },
  {
    path: '/test',
    component: lazy( () => import( '../../views/TestPage' ) )
  },
  {
    path: '/test2',
    component: lazy( () => import( '../../views/test/TestPage2' ) )
  },
  {
    path: '/project-tech',
    component: lazy( () => import( '../../documents/read/ProjectTech' ) )
  },
  {
    path: '/project-structure',
    component: lazy( () => import( '../../documents/read/ProjectStructure' ) )
  },
  {
    path: '/last-update',
    component: lazy( () => import( '../../documents/read/LastUpdateSohel' ) )
  },
  {
    path: '/modules',
    component: lazy( () => import( '../../views/apps' ) ),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/login',
    component: lazy( () => import( '../../views/accounts/Login' ) ),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy( () => import( '../../views/Error' ) ),
    layout: 'BlankLayout'
  }
];

export { DefaultRoute, TemplateTitle, Routes };

