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
  selectedItem: any;


  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.mem_type = localStorage.getItem('mem_type')
     this.items = [
    {
      label: 'Dashboard',
      icon: 'pi pi-microsoft',
      routerLink: '/superadmin/super_dashboard',
    },
    {
      label: 'Fees Type',
      icon: 'pi pi-wallet',
      routerLink: '/superadmin/fee_type',
    },
     {
      label: 'Add Admin',
      icon: 'pi pi-plus',
      routerLink: '/superadmin/show_admin_data',
    },
  ];
  }

  // onClick(id: any) {
  //   let element = document.getElementById(id);

  //   if (element?.className.includes('menu-item-open')) {
  //     element?.classList.remove('menu-item-open');
  //   } else {
  //     element?.classList.add('menu-item-open');
  //   }
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
    return this.router.url === route;
  }

   navigate(route: any) {
  if (typeof route === 'string' && route) {
    this.router.navigate([route]);
  } else if (route === null && this.selectedItem?.url) {
    // Handle external link
    window.open(this.selectedItem.url, '_blank');
  } else {
    console.warn('Invalid route or no action needed.');
  }
}

}
