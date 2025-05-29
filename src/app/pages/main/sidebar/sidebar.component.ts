import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public sideMenuItem: any = [];
  mem_type: any;
  items!: MenuItem[]
  constructor(private router: Router,private route: ActivatedRoute) {}

  ngOnInit() {
    // this.mem_type = this.route.snapshot.params['mem_type'];
   this.mem_type = localStorage.getItem('mem_type')
   this.items = [
    {
      label: 'Dashboard',
      icon: 'pi pi-microsoft',
      routerLink: ['dashboard'],
    },
    {
      label: 'Member Details',
      icon: 'pi pi-user',
      routerLink: ['memb_dtls'],
    },
    {
      label: 'Insurance Form',
      icon: 'pi pi-list',
      routerLink: ['ins_dtls'],
    },
    {
      label: 'Children Policy',
      icon: 'pi pi-address-book',
      routerLink: ['child_policy'],
    },
    {
      label: 'Transaction History',
      icon: 'pi pi-indian-rupee',
      routerLink: ['trn_history'],
    },
     {
      label: 'Transaction History for Children Policy',
      icon: 'pi pi-history',
      routerLink: ['trn_history_child'],
    },
    {
      label: 'Deposit Subscription',
      icon: 'pi pi-calendar',
      routerLink: ['depo_subs'],
    },
    // {
    //   label: 'Notification',
    //   icon: 'pi pi-bell',
    //   routerLink: ['memb_noti'],
    // },
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
