import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.DASHBOARDS.TEXT',
    icon: 'bx-home-circle',
    link: 'dashboard',
  },
  {
    id: 2,
    label: 'Sales Management',
    icon: 'bx-building',
    subItems: [
      {
        id: 3,
        label: 'Create New Lead',
        link: 'sales/create-new-lead',
        parentId: 2,
      },
      {
        id: 4,
        label: 'Sales Board',
        link: 'sales-board',
        parentId: 2,
      },
      {
        id: 5,
        label: 'My Kanban Board',
        link: 'kanban',
        parentId: 2,
      },
      {
        id: 6,
        label: 'Converted to Clients',
        link: 'converted-to-clients',
        parentId: 2,
      },
      {
        id: 7,
        label: 'Not Interested',
        link: 'not-interested',
        parentId: 2,
      },
      {
        id: 8,
        label: 'Do Not Call',
        link: 'do-not-call',
        parentId: 2,
      },
      {
        id: 14,
        label: 'BDP Management',
        link: 'admin/bdp',
        parentId: 2,
      },
    ],
  },
  {
    id: 12,
    label: 'User Management',
    icon: 'bx bx-git-merge',
    subItems: [
      {
        id: 13,
        label: 'Employee Management',
        link: 'admin/employee',
        parentId: 2,
      },

      {
        id: 15,
        label: 'Client User Management',
        link: '/next-mod',
        parentId: 2,
      },
      {
        id: 16,
        label: 'Expert Management',
        link: '/next-mod',
        parentId: 2,
      },
    ],
  },
  {
    id: 9,
    label: 'Incentives & Accounting',
    icon: 'bx-buildings',
    link: '/next-mod',
  },

  {
    id: 11,
    label: 'Contacts',
    icon: 'bx bx-user-pin',
    link: 'contacts',
  },
  {
    id: 12,
    label: 'Analytics & Reports',
    icon: 'bx bx-pie-chart',
    link: '/next-mod',
  },

  // {
  //   id: 17,
  //   label: 'Admin Master Department', 
  //   icon: 'bx bx-user-pin',   
  //   link: 'masterdepartments',  
  // },


  {
    id: 17,
    label: 'Admin Master',
    icon: 'bx bx-pie-chart',   
   subItems: [
      {
        id: 18,
        label: 'Admin Master Department',
       // link: 'admin/employee',
       link: '/ad-master-deparments',
        parentId: 2,
      },

      {
        id: 19,
        label: 'Admin Master Designation',
        link: '/ad-master-designations',
        parentId: 2,
      },


      {
        id: 20,
        label: 'Gender',
        link: '/genders',
        parentId: 2,
      },

      
    ],
  },


];
