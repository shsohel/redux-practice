import { Briefcase, Code, DollarSign, Eye, Framer, GitCommit, Home, Layers, Maximize, Package, Paperclip, PenTool, ShoppingCart, Umbrella, User, UserCheck, UserPlus } from 'react-feather';

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },

  {
    id: 'operation',
    title: 'Operation',
    icon: <Framer size={20} />,
    children: [
      {
        id: 'styles',
        title: 'Styles',
        icon: <PenTool size={20} />,
        children: [
          {
            id: 'singleStyle',
            title: 'Single Style',
            icon: <PenTool size={20} />,
            navLink: '/single-styles'
          },
          {
            id: 'setStyle',
            title: 'Set Style',
            icon: <PenTool size={20} />,
            navLink: '/set-styles'
          }
        ]
      },
      {
        id: 'precosting',
        title: 'Pre Costing',
        icon: <DollarSign size={20} />,
        navLink: '/pre-costings'
      },
      {
        id: 'orders',
        title: 'Buyer PO',
        icon: <ShoppingCart size={20} />,
        navLink: '/purchase-order'
      },
      {
        id: 'costing',
        title: 'Costing',
        icon: <DollarSign size={20} />,
        navLink: '/costing'
      },
      {
        id: 'consumption',
        title: 'Consumption',
        icon: <Package size={20} />,
        navLink: '/consumption'
      },
      {
        id: 'bom',
        title: 'BOM',
        icon: <Paperclip size={20} />,
        navLink: '/bom'
      },
      {
        id: 'budgets',
        title: 'Budgets',
        icon: <Briefcase size={20} />,
        navLink: '/budgets'
      }
    ]
  },
  {
    id: 'configuration',
    title: 'Configuration',
    icon: <GitCommit size={20} />,
    children: [
      {
        id: 'merchandisers',
        title: 'Merchandisers ',
        icon: <User size={20} />,
        navLink: '/merchandisers'
      },
      {
        id: 'buyermanage',
        title: 'Buyer Management',
        icon: <UserPlus size={20} />,
        children: [
          {
            id: 'buyers',
            title: 'Buyers',
            icon: <UserCheck size={20} />,
            navLink: '/buyers'
          },
          {
            id: 'buyeragents',
            title: 'Buyer Agents',
            icon: <UserCheck size={20} />,
            navLink: '/buyer-agents'
          },
          {
            id: 'buyer-departments',
            title: 'Buyer Department',
            icon: <UserCheck size={20} />,
            navLink: '/buyer-departments'
          },

          {
            id: 'buyer-product-developers',
            title: 'Buyer Product Developer',
            icon: <UserCheck size={20} />,
            navLink: '/buyer-product-developers'
          }


        ]
      },
      {
        id: 'user-management',
        title: 'User Management',
        icon: <UserPlus size={20} />,
        children: [
          {
            id: 'user-modules',
            title: 'Module',
            icon: <UserCheck size={20} />,
            navLink: '/user-modules'
          },
          {
            id: 'user-roles',
            title: ' Role',
            icon: <UserCheck size={20} />,
            navLink: '/user-roles'
          },
          {
            id: 'users',
            title: 'User ',
            icon: <UserCheck size={20} />,
            navLink: '/users'
          }


        ]
      },
      {
        id: 'style-management',
        title: 'Style Management',
        icon: <UserPlus size={20} />,
        children: [
          {
            id: 'division',
            title: 'Style Division',
            icon: <UserCheck size={20} />,
            navLink: '/divisions'
          },
          {
            id: 'department',
            title: 'Style Department',
            icon: <UserCheck size={20} />,
            navLink: '/style-department'
          },
          {
            id: 'product-category',
            title: 'Product Category',
            icon: <UserCheck size={20} />,
            navLink: '/style-product-category'
          },
          {
            id: 'style-category',
            title: 'Style Category',
            icon: <UserCheck size={20} />,
            navLink: '/style-category'
          }
        ]
      },
      {
        id: 'seasons',
        title: 'Seasons',
        icon: <Umbrella size={20} />,
        navLink: '/seasons'
      },
      {
        id: 'statuses',
        title: 'Status',
        icon: <Umbrella size={20} />,
        navLink: '/statuses'
      },
      {
        id: 'sizemanagement',
        title: 'Garments Size Management',
        icon: <Maximize size={20} />,
        children: [
          {
            id: 'sizes',
            title: 'Sizes',
            icon: <User size={20} />,
            navLink: '/sizes'
          },
          {
            id: 'sizegroups',
            title: 'Size Groups',
            icon: <Layers size={20} />,
            navLink: '/size-groups'
          }
        ]
      },
      {
        id: 'colors',
        title: 'Garments Colors',
        icon: <PenTool size={20} />,
        navLink: '/colors'
      },
      {
        id: 'sample-assignee',
        title: 'Sample Assignee',
        icon: <UserCheck size={20} />,
        navLink: '/sample-assignee'
      }
    ]
  },


  // {
  //   id: 'orders',
  //   title: 'Purchase Order',
  //   icon: <ShoppingCart size={20} />,
  //   navLink: '/purchase-order'
  // },
  {
    id: 'protech',
    title: 'Project Technologies',
    icon: <Code size={20} />,
    navLink: '/project-tech'
  },
  // {
  //   id: 'prostructure',
  //   title: 'Project Structural Doc',
  //   icon: <Layers size={20} />,
  //   navLink: '/project-structure'
  // },
  {
    id: 'lastupdate',
    title: 'Last Update',
    icon: <Layers size={20} />,
    navLink: '/last-update'
  },
  {
    id: 'testMe',
    title: 'Test Me',
    icon: <Eye size={20} />,
    navLink: '/test'
  }
  // {
  //   id: 'testMe2',
  //   title: 'Test Me2',
  //   icon: <Eye size={20} />,
  //   navLink: '/test2'
  // }
];
