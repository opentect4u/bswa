import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-stp-sidebar',
  templateUrl: './stp-sidebar.component.html',
  styleUrls: ['./stp-sidebar.component.css']
})
export class StpSidebarComponent implements OnInit {
public sideMenuItem: any = [];
  mem_type: any;
  items!: MenuItem[]
  flag: any;
  isExpanded: boolean = false

  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
   this.mem_type = localStorage.getItem('mem_type')
     this.items = [
    {
      label: 'Dashboard',
      icon: 'pi pi-microsoft',
      // routerLink: ['dashboard'],
      routerLink: '/main/stp_dashboard',
    },
    {
      label: 'Member Details',
      icon: 'pi pi-user',
      routerLink: '/main/stp_memb_dtls',
    },
    {
      label: 'Premium Details',
      icon: 'pi pi-server',
      routerLink: '/main/stp_premium_dtls',
    },
      {
      label: 'Deposit Premium',
      icon: 'pi pi-wallet',
      routerLink: '/main/stp_premium_payment',
    },
    //   {
    //   label: 'Renew Premium Payment',
    //   icon: 'pi pi-credit-card',
    //   routerLink: ['memb_dtls'],
    // },
    {
      label: 'Premium Payment Receipt',
      icon: 'pi pi-receipt',
      routerLink: '/main/stp_memb_transaction',
    }
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

    isActive(route: string): boolean {
    return this.router.url === route;
  }

   navigate(route: string) {
    this.router.navigate([route]);
  }

}
