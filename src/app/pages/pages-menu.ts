import { NbMenuItem } from '@nebular/theme';

// export const MENU_ITEMS: NbMenuItem[] = [
//   {
//     title: 'E-commerce',
//     icon: 'shopping-cart-outline',
//     link: '/pages/dashboard',
//     home: true,
//   },
//   {
//     title: 'Course Management',
//     group: true,
//   },
//   {
//     title: 'Courses',
//     icon: 'book-outline',
//     children: [
//       {
//         title: 'Create New Course',
//         link: '/pages/course/create'
//       },
//       {
//         title: 'View All Course',
//         link: '/pages/course/view'
//       }
//     ]
//   },
//   {
//     title: 'Subects',
//     icon: 'book-outline',
//     children: [
//       {
//         title: 'Create New Subjects',
//         link: '/pages/course/subject/create'
//       },
//       {
//         title: 'View all',
//         link: '/pages/course/create'
//       }
//     ]
//   },
//   {
//     title: 'Lectures',
//     icon: 'book-outline',
//     children: [
//       {
//         title: 'Create Lecture',
//         link: '/pages/course/lecture/create'
//       },
//       {
//         title: 'View All Lectures',
//         link: '/pages/course/create'
//       }
//     ]
//   },
//   {
//     title: 'Schedules',
//     icon: 'book-outline',
//     children: [
//       {
//         title: 'View Daily Schedules',
//         link: '/pages/course/schedule/view'
//       },
//       {
//         title: 'Request Schedule Change',
//         link: '/pages/course/create'
//       }
//     ]
//   },
//   {
//     title: 'Student Management',
//     group: true,
//   },
//   {
//     title: 'Student',
//     icon: 'book-outline',
//     children: [
//       {
//         title: 'Admit Student',
//         link: '/pages/student/register'
//       },
//       {
//         title: 'View All Students',
//         link: '/pages/student/view'
//       }
//     ]
//   }
// ];

//latest
export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'shopping-cart-outline',
    link: '/pages/admin/dashboard',
  },
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
    home: true,
  },
  {
    title: 'Course Management',
    group: true,
  },
  {
    title: 'Courses',
    icon: 'book-outline',
    children: [
      {
        title: 'Create New Course',
        link: '/pages/course/create'
      },
      {
        title: 'View All Course',
        link: '/pages/course/view'
      }
    ]
  },
  {
    title: 'Subects',
    icon: 'book-outline',
    children: [
      {
        title: 'Create New Subjects',
        link: '/pages/course/subject/create'
      }
    ]
  },
  {
    title: 'Lectures',
    icon: 'book-outline',
    children: [
      {
        title: 'Create Lecture',
        link: '/pages/course/lecture/create'
      }
    ]
  },
  {
    title: 'Schedules',
    icon: 'book-outline',
    children: [
      {
        title: 'View Daily Schedules',
        link: '/pages/course/schedule/view'
      }
    ]
  },
  {
    title: 'Room Management',
    icon: 'book-outline',
    children: [
      {
        title: 'All Operations',
        link: '/pages/course/rooms'
      }
    ]
  },

  {
    title: 'Student Management',
    group: true,
  },
  {
    title: 'Student',
    icon: 'people-outline',
    children: [
      {
        title: 'Admit Student',
        link: '/pages/student/register'
      },
      {
        title: 'All Student Operations',
        link: '/pages/student/view'
      },
      {
        title: 'Fee Management',
        children: [
          {
            title: 'Payment Scheme',
            children: [
              {
                title: 'All Operations',
                link: '/pages/student/payment-scheme/create'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Teacher Management',
    icon: 'people-outline',
    children: [
      {
        title: 'All Teacher Operations',
        link: '/pages/teachers/view'
      },
      {
        title: 'Register Teacher',
        link: '/pages/teachers/create'
      }
    ]
  },
  {
    title: 'Student-Portal',
    icon: 'home-outline',
    children: [
      {
        title: 'My Dashboard',
        link: '/pages/student-portal/dashboard',
      },
      {
        title: 'My schedules',
        link: '/pages/student-portal/my_schedules',
      },
      {
        title: 'My Classes',
        icon: 'home-outline'
      }
    ]
  },
  {
    title: 'Teacher-Portal',
    icon: 'home-outline',
    children: [
      {
        title: 'My Dashboard',
        link: '/pages/teacher-portal/dashboard',
      },
      {
        title: 'My Classes',
        link: '/pages/teacher-portal/my_classes',
      },
      {
        title: 'My TimeTable',
        link: '/pages/teacher-portal/my_timetable',
      }
    ]
  },
  {
    title: 'User Management',
    icon: 'person-outline',
    children: [
      {
        title: 'User Roles',
        link: '/pages/user-management/user-roles'
      },
      {
        title: 'Errors',
        link: '/pages/user-management/errors'
      },
      {
        title: 'Navigation Privilleges',
        link: '/pages/user-management/privileges'
      }
    ]
  },
  {
    title: 'Report Generation',
    icon: 'book-outline',
    children: [
      {
        title: 'Student Fee Reports',
        link: '/pages/reports/fee'
      },
      {
        title: 'Teacher Reports',
        link: '/pages/reports/teacher'
      }
    ]
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Layout',
    icon: 'layout-outline',
    children: [
      {
        title: 'Stepper',
        link: '/pages/layout/stepper',
      },
      {
        title: 'List',
        link: '/pages/layout/list',
      },
      {
        title: 'Infinite List',
        link: '/pages/layout/infinite-list',
      },
      {
        title: 'Accordion',
        link: '/pages/layout/accordion',
      },
      {
        title: 'Tabs',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs',
      },
    ],
  },
  {
    title: 'Forms',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/pages/forms/layouts',
      },
      {
        title: 'Buttons',
        link: '/pages/forms/buttons',
      },
      {
        title: 'Datepicker',
        link: '/pages/forms/datepicker',
      },
    ],
  },
  {
    title: 'UI Features',
    icon: 'keypad-outline',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Grid',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/pages/ui-features/icons',
      },
      {
        title: 'Typography',
        link: '/pages/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/pages/ui-features/search-fields',
      },
    ],
  },
  {
    title: 'Modal & Overlays',
    icon: 'browser-outline',
    children: [
      {
        title: 'Dialog',
        link: '/pages/modal-overlays/dialog',
      },
      {
        title: 'Window',
        link: '/pages/modal-overlays/window',
      },
      {
        title: 'Popover',
        link: '/pages/modal-overlays/popover',
      },
      {
        title: 'Toastr',
        link: '/pages/modal-overlays/toastr',
      },
      {
        title: 'Tooltip',
        link: '/pages/modal-overlays/tooltip',
      },
    ],
  },
  {
    title: 'Extra Components',
    icon: 'message-circle-outline',
    children: [
      {
        title: 'Calendar',
        link: '/pages/extra-components/calendar',
      },
      {
        title: 'Progress Bar',
        link: '/pages/extra-components/progress-bar',
      },
      {
        title: 'Spinner',
        link: '/pages/extra-components/spinner',
      },
      {
        title: 'Alert',
        link: '/pages/extra-components/alert',
      },
      {
        title: 'Calendar Kit',
        link: '/pages/extra-components/calendar-kit',
      },
      {
        title: 'Chat',
        link: '/pages/extra-components/chat',
      },
    ],
  },
  {
    title: 'Maps',
    icon: 'map-outline',
    children: [
      {
        title: 'Google Maps',
        link: '/pages/maps/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/pages/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/pages/maps/bubble',
      },
      {
        title: 'Search Maps',
        link: '/pages/maps/searchmap',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'pie-chart-outline',
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/pages/charts/d3',
      },
    ],
  },
  {
    title: 'Editors',
    icon: 'text-outline',
    children: [
      {
        title: 'TinyMCE',
        link: '/pages/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/pages/editors/ckeditor',
      },
    ],
  },
  {
    title: 'Tables & Data',
    icon: 'grid-outline',
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Tree Grid',
        link: '/pages/tables/tree-grid',
      },
    ],
  },
  {
    title: 'Miscellaneous',
    icon: 'shuffle-2-outline',
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];



export const ADMIN_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'bar-chart',
    link: '/pages/admin/dashboard',
  },
  {
    title: 'Course Management',
    group: true,
  },
  {
    title: 'Medium',
    icon: 'book-outline',
    children: [
      {
        title: 'Create Medium',
        link: '/pages/course/medium/create'
      },
      {
        title: 'Edit & Delete Medium',
        link: '/pages/course/medium/edit'
      }
    ]
  },
  {
    title: 'Courses',
    icon: 'book',
    children: [
      {
        title: 'Create New Course',
        link: '/pages/course/create'
      },
      {
        title: 'Course Operations',
        link: '/pages/course/view'
      },
      {
        title: 'Edit And Delete Courses',
        link: '/pages/course/edit'
      }
    ]
  },
  {
    title: 'Subects',
    icon: 'book-open',
    children: [
      {
        title: 'Create New Subjects',
        link: '/pages/course/subject/create'
      }
    ]
  },
  {
    title: 'Lectures',
    icon: 'edit-2',
    children: [
      {
        title: 'Create Lecture',
        link: '/pages/course/lecture/create'
      },
      {
        title: 'Edit & Delete Lectures',
        link: '/pages/course/lecture/edit'
      }
    ]
  },
  {
    title: 'Schedules',
    icon: 'calendar',
    children: [
      {
        title: 'View Daily Schedules',
        link: '/pages/course/schedule/view'
      }
    ]
  },
  {
    title: 'Room Management',
    icon: 'home',
    children: [
      {
        title: 'All Operations',
        link: '/pages/course/rooms'
      }
    ]
  },
  {
    title: 'Student Management',
    group: true,
  },
  {
    title: 'Student',
    icon: 'people',
    children: [
      {
        title: 'Admit Student',
        link: '/pages/student/register'
      },
      {
        title: 'All Student Operations',
        link: '/pages/student/view'
      }
    ]
  },
  {
    title: 'Teacher Management',
    group: true,
  },
  {
    icon: 'person-add',
    title: 'Register Teacher',
    link: '/pages/teachers/create'
  },
  {
    icon: 'more-horizontal',
    title: 'All Teacher Operations',
    link: '/pages/teachers/view'
  },
  {
    title: 'User Management',
    group: true,
  },
  {
    title: 'User Accounts Operations',
    icon: 'people-outline',
    link: '/pages/user-management/accounts'
  },
  {
    title: 'Report Generation',
    group: true,
  },
  {
    icon: 'activity',
    title: 'Student Fee Reports',
    link: '/pages/reports/fee'
  },
  {
    icon: 'activity',
    title: 'Teacher Reports',
    link: '/pages/reports/teacher'
  }
];


export const ADMINISTRATION_STAFF_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'bar-chart',
    link: '/pages/admin/dashboard',
  },
  {
    title: 'Course Management',
    group: true,
  },
  {
    title: 'Medium',
    icon: 'book-outline',
    children: [
      {
        title: 'Create Medium',
        link: '/pages/course/medium/create'
      }
    ]
  },
  {
    title: 'Courses',
    icon: 'book',
    children: [
      {
        title: 'Create New Course',
        link: '/pages/course/create'
      },
      {
        title: 'View All Course',
        link: '/pages/course/view'
      }
    ]
  },
  {
    title: 'Subects',
    icon: 'book-open',
    children: [
      {
        title: 'Create New Subjects',
        link: '/pages/course/subject/create'
      }
    ]
  },
  {
    title: 'Lectures',
    icon: 'edit-2',
    children: [
      {
        title: 'Create Lecture',
        link: '/pages/course/lecture/create'
      },
      {
        title: 'Edit & Delete Lectures',
        link: '/pages/course/lecture/edit'
      }
    ]
  },
  {
    title: 'Schedules',
    icon: 'calendar',
    children: [
      {
        title: 'View Daily Schedules',
        link: '/pages/course/schedule/view'
      }
    ]
  },
  {
    title: 'Room Management',
    icon: 'home',
    children: [
      {
        title: 'All Operations',
        link: '/pages/course/rooms'
      }
    ]
  },
  {
    title: 'Student Management',
    group: true,
  },
  {
    title: 'Student',
    icon: 'people',
    children: [
      {
        title: 'Admit Student',
        link: '/pages/student/register'
      },
      {
        title: 'All Student Operations',
        link: '/pages/student/view'
      }
    ]
  },
  {
    title: 'Teacher Management',
    group: true,
  },
  {
    icon: 'person-add',
    title: 'Register Teacher',
    link: '/pages/teachers/create'
  },
  {
    icon: 'more-horizontal',
    title: 'All Teacher Operations',
    link: '/pages/teachers/view'
  }
];

export const STUDENT_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Student Portal',
    group: true,
  },
  {
    icon: 'home',
    title: 'My Dashboard',
    link: '/pages/student-portal/dashboard',
  },
  {
    icon: 'book-open',
    title: 'My Classes',
  },
  {
    icon: 'calendar',
    title: 'My schedules',
    link: '/pages/student-portal/my_schedules',
  },
  {
    icon: 'credit-card',
    title: 'My Payments',
    link: '/pages/student-portal/my_payments',
  },
  {
    icon: 'book',
    title: 'Payment History',
    link: '/pages/student-portal/payment_history',
  },
  {
    title: 'hidden',
    link: '/pages/profile',
    hidden: true
  }
];

export const TEACHER_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Teacher Portal',
    group: true,
  },
  {
    icon: 'home',
    title: 'My Dashboard',
    link: '/pages/teacher-portal/dashboard',
  },
  {
    icon: 'book-open',
    title: 'My Lectures',
  },
  {
    icon: 'clock',
    title: 'My Timetable',
    link: '/pages/teacher-portal/my_timetable'
  },
  {
    icon: 'percent',
    title: 'My Monthly Remunerations',
    link: '/pages/teacher-portal/my_remunerations'
  },
  {
    icon: 'layers',
    title: 'Total Income',
    link: '/pages/teacher-portal/total_income'
  },
  {
    icon: 'done-all',
    title: "My Students' Attendances",
    link: '/pages/teacher-portal/my_student_attendances'
  },

  {
    title: 'hidden',
    link: '/pages/profile',
    hidden: true
  }
];


// export const MENU_ITEMS: NbMenuItem[] = [
//   {
//     title: 'Admin Dashboard',
//     icon: 'home-outline',
//     link: '/pages/iot-dashboard',
//     home: true,
//   },
//   {
//     title: 'Course Management',
//     group: true,
//   },
//   {
//     title: 'Courses',
//     children: [
//       {
//         title: 'Create New Course',
//         link: '/pages/course/create'
//       },
//       {
//         title: 'View All Course',
//         link: '/pages/course/view'
//       }
//     ]
//   },
//   {
//     title: 'Subects',
//     children: [
//       {
//         title: 'Create New Subjects',
//         link: '/pages/course/subject/create'
//       },
//       {
//         title: 'View all',
//         link: '/pages/course/create'
//       }
//     ]
//   },
//   {
//     title: 'Lectures',
//     children: [
//       {
//         title: 'Create Lecture',
//         link: '/pages/course/lecture/create'
//       },
//       {
//         title: 'Create New Lecture',
//         link: '/pages/course/create'
//       }
//     ]
//   },
//   {
//     title: 'Schedule Management',
//     group: true,
//   },
//   {
//     title: 'Schedules',
//     children: [
//       {
//         title: 'View Daily Schedules',
//         link: '/pages/course/schedule/view'
//       },
//       {
//         title: 'Create New Lecture',
//         link: '/pages/course/create'
//       }
//     ]
//   },
//   {
//     title: 'Room Management',
//     children: [
//       {
//         title: 'All Operations',
//         link: '/pages/course/rooms'
//       }
//     ]
//   },

//   {
//     title: 'Student Management',
//     group: true,
//   },
//   {
//     title: 'Student Registration',
//     children: [
//       {
//         title: 'Admit Student',
//         link: '/pages/student/register'
//       },
//       {
//         title: 'View All Students',
//         link: '/pages/student/view'
//       },
//     ]
//   },
//   {
//     title: 'All Student Operations',
//     children: [
//       {
//         title: 'Admit Student',
//         link: '/pages/student/register'
//       },
//       {
//         title: 'View All Students',
//         link: '/pages/student/view'
//       },
//     ]
//   },
//   {
//     title: 'Student Fee Management',
//     children: [
//       {
//         title: 'Pay Student Fee',
//         link: '/pages/student/view'
//       },
//       {
//         title: 'Payment Scheme',
//         children: [
//           {
//             title: 'All Operations',
//             link: '/pages/student/payment-scheme/create'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     title: 'Teacher Management',
//     group: true,
//   },
//   {
//     title: 'Register Teacher',
//     link: '/pages/teachers/create',
//   },
//   {
//     title: 'Teacher Remuneration',
//     children: [
//       {
//         title: 'My Dashboard',
//         link: '/pages/student-portal/dashboard',
//       },
//     ]
//   },
//   {
//     title: 'All Teacher Operations',
//     children: [
//       {
//         title: 'My Dashboard',
//         link: '/pages/student-portal/dashboard',
//       },
//     ]
//   },
//   {
//     title: 'Report Generation',
//     group: true,
//   },
//   {
//     title: 'Management Reports',
//     link: '/pages/student-portal/dashboard',
//     children: [
//       {
//         title: 'My Dashboard',
//         link: '/pages/teacher-portal/dashboard',
//       },
//     ]
//   },
//   {
//     title: 'Students Related Reports',
//     link: '/pages/student-portal/dashboard',
//     children: [
//       {
//         title: 'My Dashboard',
//         link: '/pages/teacher-portal/dashboard',
//       },
//     ]
//   },
//   {
//     title: 'Teachers Related Reports',
//     link: '/pages/student-portal/dashboard',
//     children: [
//       {
//         title: 'My Dashboard',
//         link: '/pages/teacher-portal/dashboard',
//       },
//     ]
//   },
//   {
//     title: 'User Management',
//     group: true,
//   },
//   {
//     title: 'User Roles',
//     // icon: 'home-outline',
//     children: [
//       {
//         title: 'My Dashboard',
//         link: '/pages/teacher-portal/dashboard',
//       },
//       {
//         title: 'My Classes',
//         link: '/pages/teacher-portal/my_classes',
//       },
//       {
//         title: 'My TimeTable',
//         link: '/pages/teacher-portal/my_timetable',
//       }
//     ]
//   },
//   {
//     title: 'User View Privileges',
//     // icon: 'person-outline',
//     children: [
//       {
//         title: 'User Roles',
//         link: '/pages/user-management/user-roles'
//       },
//       {
//         title: 'Errors',
//         link: '/pages/user-management/errors'
//       },
//       {
//         title: 'Navigation Privilleges',
//         link: '/pages/user-management/privileges'
//       }
//     ]
//   },
//   {
//     title: 'Report Generation',
//     icon: 'book-outline',
//     children: [
//       {
//         title: 'Student Fee Reports',
//         link: '/pages/reports/fee'
//       },
//       {
//         title: 'Teacher Reports',
//         link: '/pages/reports/teacher'
//       }
//     ]
//   },
//   {
//     title: 'FEATURES',
//     group: true,
//   },
//   {
//     title: 'Layout',
//     icon: 'layout-outline',
//     children: [
//       {
//         title: 'Stepper',
//         link: '/pages/layout/stepper',
//       },
//       {
//         title: 'List',
//         link: '/pages/layout/list',
//       },
//       {
//         title: 'Infinite List',
//         link: '/pages/layout/infinite-list',
//       },
//       {
//         title: 'Accordion',
//         link: '/pages/layout/accordion',
//       },
//       {
//         title: 'Tabs',
//         pathMatch: 'prefix',
//         link: '/pages/layout/tabs',
//       },
//     ],
//   },
//   {
//     title: 'Forms',
//     icon: 'edit-2-outline',
//     children: [
//       {
//         title: 'Form Inputs',
//         link: '/pages/forms/inputs',
//       },
//       {
//         title: 'Form Layouts',
//         link: '/pages/forms/layouts',
//       },
//       {
//         title: 'Buttons',
//         link: '/pages/forms/buttons',
//       },
//       {
//         title: 'Datepicker',
//         link: '/pages/forms/datepicker',
//       },
//     ],
//   },
//   {
//     title: 'UI Features',
//     icon: 'keypad-outline',
//     link: '/pages/ui-features',
//     children: [
//       {
//         title: 'Grid',
//         link: '/pages/ui-features/grid',
//       },
//       {
//         title: 'Icons',
//         link: '/pages/ui-features/icons',
//       },
//       {
//         title: 'Typography',
//         link: '/pages/ui-features/typography',
//       },
//       {
//         title: 'Animated Searches',
//         link: '/pages/ui-features/search-fields',
//       },
//     ],
//   },
//   {
//     title: 'Modal & Overlays',
//     icon: 'browser-outline',
//     children: [
//       {
//         title: 'Dialog',
//         link: '/pages/modal-overlays/dialog',
//       },
//       {
//         title: 'Window',
//         link: '/pages/modal-overlays/window',
//       },
//       {
//         title: 'Popover',
//         link: '/pages/modal-overlays/popover',
//       },
//       {
//         title: 'Toastr',
//         link: '/pages/modal-overlays/toastr',
//       },
//       {
//         title: 'Tooltip',
//         link: '/pages/modal-overlays/tooltip',
//       },
//     ],
//   },
//   {
//     title: 'Extra Components',
//     icon: 'message-circle-outline',
//     children: [
//       {
//         title: 'Calendar',
//         link: '/pages/extra-components/calendar',
//       },
//       {
//         title: 'Progress Bar',
//         link: '/pages/extra-components/progress-bar',
//       },
//       {
//         title: 'Spinner',
//         link: '/pages/extra-components/spinner',
//       },
//       {
//         title: 'Alert',
//         link: '/pages/extra-components/alert',
//       },
//       {
//         title: 'Calendar Kit',
//         link: '/pages/extra-components/calendar-kit',
//       },
//       {
//         title: 'Chat',
//         link: '/pages/extra-components/chat',
//       },
//     ],
//   },
//   {
//     title: 'Maps',
//     icon: 'map-outline',
//     children: [
//       {
//         title: 'Google Maps',
//         link: '/pages/maps/gmaps',
//       },
//       {
//         title: 'Leaflet Maps',
//         link: '/pages/maps/leaflet',
//       },
//       {
//         title: 'Bubble Maps',
//         link: '/pages/maps/bubble',
//       },
//       {
//         title: 'Search Maps',
//         link: '/pages/maps/searchmap',
//       },
//     ],
//   },
//   {
//     title: 'Charts',
//     icon: 'pie-chart-outline',
//     children: [
//       {
//         title: 'Echarts',
//         link: '/pages/charts/echarts',
//       },
//       {
//         title: 'Charts.js',
//         link: '/pages/charts/chartjs',
//       },
//       {
//         title: 'D3',
//         link: '/pages/charts/d3',
//       },
//     ],
//   },
//   {
//     title: 'Editors',
//     icon: 'text-outline',
//     children: [
//       {
//         title: 'TinyMCE',
//         link: '/pages/editors/tinymce',
//       },
//       {
//         title: 'CKEditor',
//         link: '/pages/editors/ckeditor',
//       },
//     ],
//   },
//   {
//     title: 'Tables & Data',
//     icon: 'grid-outline',
//     children: [
//       {
//         title: 'Smart Table',
//         link: '/pages/tables/smart-table',
//       },
//       {
//         title: 'Tree Grid',
//         link: '/pages/tables/tree-grid',
//       },
//     ],
//   },
//   {
//     title: 'Miscellaneous',
//     icon: 'shuffle-2-outline',
//     children: [
//       {
//         title: '404',
//         link: '/pages/miscellaneous/404',
//       },
//     ],
//   },
//   {
//     title: 'Auth',
//     icon: 'lock-outline',
//     children: [
//       {
//         title: 'Login',
//         link: '/auth/login',
//       },
//       {
//         title: 'Register',
//         link: '/auth/register',
//       },
//       {
//         title: 'Request Password',
//         link: '/auth/request-password',
//       },
//       {
//         title: 'Reset Password',
//         link: '/auth/reset-password',
//       },
//     ],
//   },
// ];







// constructor(private viewsService: ViewsService) {
  //   this.getAllViews();
  //   console.log("pop");
  // }

// getAllViews() {
  //   this.viewsService.getAllViews()
  //     .subscribe((response) => {
  //       this.menu = response;
  //     });
  // }