import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public sideMenuItem: any = [];
  mem_type: any;
  constructor(private router: Router,private route: ActivatedRoute) {}

  ngOnInit() {
    // this.mem_type = this.route.snapshot.params['mem_type'];
   this.mem_type = localStorage.getItem('mem_type')
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
