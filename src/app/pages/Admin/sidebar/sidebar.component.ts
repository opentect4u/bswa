import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public sideMenuItem: any = [];

  constructor(private router: Router) {
  }

  ngOnInit() {
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
