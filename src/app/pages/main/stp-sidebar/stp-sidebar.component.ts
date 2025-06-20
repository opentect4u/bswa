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

  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
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

}
