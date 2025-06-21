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
      label: 'Premium Payment',
      icon: 'pi pi-wallet',
      routerLink: ['memb_dtls'],
    },
      {
      label: 'Renew Premium Payment',
      icon: 'pi pi-credit-card',
      routerLink: ['memb_dtls'],
    },
    {
      label: 'Premium Payment Receipt',
      icon: 'pi pi-receipt',
      routerLink: ['memb_dtls'],
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

    navigate(path: string | string[]) {
    if (Array.isArray(path)) {
      this.router.navigate(path);
    } else {
      this.router.navigate([path]);
    }
  }

}
