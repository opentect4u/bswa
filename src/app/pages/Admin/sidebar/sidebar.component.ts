import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public sideMenuItem: any = [];

  items!: MenuItem[]

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.items = [
      {
          label: 'Membership Forms',
          icon: 'pi pi-user',
          items: [
              {
                  label: 'Accept / Reject Membership Forms',
                  icon: 'pi pi-hourglass',
                  routerLink: ['admin_approve']
              },
            
              {
                  label: 'Approve Membership Forms',
                  icon: 'pi pi-check-square',
                  routerLink: ['approve_form']
              }
          ]
      },
      {
          label: 'Super Topup Policy',
          icon: 'pi pi-fw pi-bookmark',
          items: [
              {
                  label: 'Accept / Reject Super Topup Policy Forms',
                  icon: 'pi pi-search',
                  routerLink: ['admin_premium_approve']
              },
              {
                  label: 'Approve Super Topup Policy Form',
                  icon: 'pi pi-check-circle',
                  routerLink: ['super_policy_approve']
              },
          ]
      },
      {
        label: 'Existing Group Policy',
        icon: 'pi pi-fw pi-users',
        items: [
            {
                label: 'Accept / Reject Group Policy Form',
                icon: 'pi pi-check',
                routerLink: ['admin_group_premium_approve']
            },
            {
                label: 'Approve Group Policy Form',
                icon: 'pi pi-verified',
                routerLink: ['group_policy_approve_form']
            },
        ]
      },
      {
        label: 'Subscription Deposit',
        icon: 'pi pi-fw pi-users',
        items: [
            {
                label: 'Entry Deposit',
                icon: 'pi pi-check',
                routerLink: ['subs_depo_entry']
            },
            {
                label: 'Approve Deposit',
                icon: 'pi pi-verified',
                routerLink: ['subs_depo_approve']
            },
        ]
      },
      {
        label: 'Reports',
        icon: 'pi pi-id-card',
        items: [
            {
                label: 'Member Registered Report',
                icon: 'pi pi-users',
                routerLink: ['member_list_report']
            },
            {
              label: 'Member Transaction Report',
              icon: 'pi pi-money-bill',
              routerLink: ['member_trans_report']
          },
          {
            label: 'Subscription Cleared Upto',
            icon: 'pi pi-undo',
            routerLink: ['subscription_cleared_upto']
        },
        ]
      },
    ];
}

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

}
