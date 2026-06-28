import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public sideMenuItem: any = [];
  mem_type: any;
  items!: MenuItem[]
  flag: any;
  isExpanded: boolean = false
  openIndex: number | null = null;
  selectedSubmenu: string | null = null;
  selectedItem: any;

  // items!: MenuItem[]

  constructor(private router: Router,private route: ActivatedRoute) {
  }

//   ngOnInit() {
//     this.mem_type = localStorage.getItem('mem_type')
//     this.items = [
//       {
//         label: 'Membership Forms',
//         icon: 'pi pi-user',
//         items: [
//           {
//             label: 'Accept / Reject Membership Forms',
//             icon: 'pi pi-hourglass',
//             routerLink: ['admin_approve'],
//           },

//           {
//             label: 'Approve Membership Forms',
//             icon: 'pi pi-check-square',
//             routerLink: ['approve_form'],
//           },
//         ],
//       },
//       {
//         label: 'Super Topup Policy',
//         icon: 'pi pi-fw pi-bookmark',
//         items: [
//           {
//             label: 'Accept / Reject Super Topup Policy Forms',
//             icon: 'pi pi-search',
//             routerLink: ['admin_premium_approve'],
//           },
//           // {
//           //   label: 'Approve Super Topup Policy Form',
//           //   icon: 'pi pi-check-circle',
//           //   routerLink: ['super_policy_approve'],
//           // },
//         ],
//       },
//       // {
//       //   label: 'Existing Group Policy',
//       //   icon: 'pi pi-fw pi-users',
//       //   items: [
//       //     {
//       //       label: 'Approve / Reject Group Policy Form',
//       //       icon: 'pi pi-check',
//       //       routerLink: ['admin_group_premium_approve'],
//       //     },
//           // {
//           //   label: 'Approve Group Policy Form',
//           //   icon: 'pi pi-verified',
//           //   routerLink: ['group_policy_approve_form'],
//           // },
//         // ],
//       // },
//       // {
//       //   label: 'Subscription Deposit',
//       //   icon: 'pi pi-fw pi-users',
//       //   items: [
//       //     {
//       //       label: 'Entry Deposit',
//       //       icon: 'pi pi-check',
//       //       routerLink: ['subs_depo_entry'],
//       //     },
//       //     {
//       //       label: 'Approve Deposit',
//       //       icon: 'pi pi-verified',
//       //       routerLink: ['subs_depo_approve'],
//       //     },
//           // {
//           //   label: 'Approve Deposit Receipt',
//           //   icon: 'pi pi-verified',
//           //   routerLink: ['approve_trn_receipt'],
//           // },
//       //   ],
//       // },
//         {
//         label: 'Upload Children Policy',
//         icon: 'pi pi-users',
//         routerLink: ['upload_child_policy'],
//       },
//       {
//         label: 'Subscription Deposit',
//         icon: 'pi pi-calendar',
//         routerLink: ['subs_depo_entry'],
//       },
//       {
//         label: 'Member Details',
//         icon: 'pi pi-users',
//         routerLink: ['memb_list'],
//       },
//       // {
//       //   label: 'Member STP Policy Details',
//       //   icon: 'pi pi-list',
//       //   routerLink: ['member_policy_list'],
//       // },
//       // {
//       //   label: 'Member Group Policy Details',
//       //   icon: 'fa fa-list-alt',
//       //   routerLink: ['member_gmp_list'],
//       // },
//       {
//         label: 'Reports',
//         icon: 'pi pi-id-card',
//         items: [
//           {
//             label: 'Member Register',
//             icon: 'pi pi-users',
//             routerLink: ['member_list_report'],
//           },
//           {
//             label: 'Member Transaction',
//             icon: 'pi pi-money-bill',
//             routerLink: ['member_trans_report'],
//           },
//           // {
//           //   label: 'Approve Transaction',
//           //   icon: 'pi pi-money-bill',
//           //   routerLink: ['approve_money_receipt_transaction'],
//           // },
//           // {
//           //   label: 'GMP Member Transaction Details',
//           //   icon: 'pi pi-credit-card',
//           //   routerLink: ['gmp_memb_trans_report'],
//           // },
//             {
//             label: 'STP Member Register',
//             icon: 'pi pi-users',
//             routerLink: ['stp_member_register'],
//           },
//            {
//             label: 'STP Member Transaction Details',
//             icon: 'pi pi-credit-card',
//             routerLink: ['stp_memb_trans_report'],
//           },
//           // {
//           //   label: 'Subscription Cleared Upto',
//           //   icon: 'pi pi-undo',
//           //   routerLink: ['subscription_cleared_upto'],
//           // },
//           // {
//           //   label: 'STP Insurance',
//           //   icon: 'pi pi-shield',
//           //   routerLink: ['stp_ins_report'],
//           // },
//           // {
//           //   label: 'Group Insurance',
//           //   icon: 'pi pi-list',
//           //   routerLink: ['gmp_ins_report'],
//           // },
//         ],
//       },
//     ];
// }

ngOnInit(): void {
  this.mem_type = localStorage.getItem('mem_type')
     this.items = [
    {
      label: 'Dashboard',
      icon: 'pi pi-microsoft',
      routerLink: '/admin/admin_dashboard',
    },
   {
    label: 'Membership Forms',
    icon: 'pi pi-user',
    items: [
      {
        label: 'Accept / Reject Membership Forms',
        icon: 'pi pi-hourglass',
        routerLink: '/admin/admin_approve',
      },
      {
        label: 'Approve Membership Forms',
        icon: 'pi pi-check-square',
        routerLink: '/admin/approve_form',
      },
    ]
  },
   {
        label: 'Active / Deactive Members',
        icon: 'pi pi-list',
        routerLink: '/admin/active_deactive_members',
   },
   {
        label: 'Super Topup Policy',
        icon: 'pi pi-fw pi-bookmark',
        items: [
          {
            label: 'Accept / Reject Super Topup Policy Forms',
            icon: 'pi pi-search',
            routerLink: '/admin/admin_premium_approve',
          },
        ]
    },
    {
        label: 'Children Group Policy',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Approve / Reject Children Group Policy Forms',
            icon: 'pi pi-search',
            routerLink: '/admin/admin_approve_child_policy',
          },
        ]
    },
    {
        label: 'Existing Group Policy',
        icon: 'pi pi-user-plus',
        items: [
          {
            label: 'Approve / Reject Existing Group Policy Forms',
            icon: 'pi pi-search',
            routerLink: '/admin/admin_approve_group_policy',
          },
        ]
    },
    // {
    //     label: 'Upload Children Policy',
    //     icon: 'pi pi-upload',
    //     routerLink: '/admin/upload_child_policy',
    //   },
      {
        label: 'Subscription Deposit',
        icon: 'pi pi-calendar',
        routerLink: '/admin/subs_depo_entry',
      },
       {
        label: 'Member Details',
        icon: 'pi pi-users',
        routerLink: '/admin/memb_list',
      },
      {
        label: 'Reports',
        icon: 'pi pi-id-card',
        items: [
          {
            label: 'Member Register',
            icon: 'pi pi-users',
            routerLink: '/admin/member_list_report',
          },
          {
            label: 'Member Transaction',
            icon: 'pi pi-money-bill',
            routerLink: '/admin/member_trans_report',
          },
           {
            label: 'STP Member Register',
            icon: 'pi pi-users',
            routerLink: '/admin/stp_member_register',
          },
           {
            label: 'STP Member Transaction Details',
            icon: 'pi pi-credit-card',
            routerLink: '/admin/stp_memb_trans_report',
          },
         ],
      },
       {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        routerLink: '/auth/login',
      },
];
    this.checkActiveRoute();
    this.router.events.subscribe(() => {
      this.checkActiveRoute();
    });
}

  checkActiveRoute() {
    let currentUrl = this.router.url;
    
    if (currentUrl.includes('/admin/show_memlist_report')) {
       currentUrl = '/admin/member_list_report';
    }
    else if (currentUrl.includes('/admin/mem_edit')) {
       currentUrl = '/admin/memb_list';
    }
    else if (currentUrl.includes('/admin/show_transaction_report')) {
       currentUrl = '/admin/member_trans_report';
    }
    else if (currentUrl.includes('/admin/show_stp_member_report')) {
       currentUrl = '/admin/stp_member_register';
    }
    else if (currentUrl.includes('/admin/show_stp_trans_report')) {
       currentUrl = '/admin/stp_memb_trans_report';
    }

    this.selectedSubmenu = currentUrl;
    
    if (this.items) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].items) {
          // Use ! to tell TypeScript that items is definitely defined here, since we just checked
          for (let sub of this.items[i].items!) {
            if (sub.routerLink === currentUrl) {
              this.openIndex = i;
              break;
            }
          }
        }
      }
    }
  }

  // onClick(id: any) {
  //   let element = document.getElementById(id);

  //   if (element?.className.includes('menu-item-open')) {
  //     element?.classList.remove('menu-item-open');
  //   } else {
  //     element?.classList.add('menu-item-open');
  //   }
  // }

  // getRoute() {
  //   return this.router.url;
  // }

  onClick(id: any) {
    let element = document.getElementById(id);

    if (element?.className.includes('menu-item-open')) {
      element?.classList.remove('menu-item-open');
    } else {
      element?.classList.add('menu-item-open');
    }
  }

  getRoute() {
    return this.router.url;
  }

    isActive(route: string): boolean {
    if (route === '/admin/memb_list' && this.router.url.includes('/admin/mem_edit')) {
      return true;
    }
    return this.router.url === route;
  }

     navigate(route: string | any, event?: Event): void {
    event?.stopPropagation();
    if (route) {
      this.selectedSubmenu = route; // store active submenu
      this.router.navigate([route]);
    }
  }

// ✅ Toggle dropdown on click
toggleDropdown(index: number, item: any): void {
    if (item.items) {
      this.openIndex = this.openIndex === index ? null : index;
    } else {
      this.navigate(item.routerLink);
    }
  }

}
