import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public sideMenuItem: any = [];
  mem_type: any;
  items!: MenuItem[]
  flag: any;
  isExpanded: boolean = false
  selectedItem: any;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private dataServe: DataService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.mem_type = localStorage.getItem('mem_type');
    const mem_id = localStorage.getItem('member_id');
    
    // Default menu before API call
    this.buildMenu(false, false);

    if (mem_id) {
      this.dataServe.global_service(1, '/insurance_dtls', { mem_id })
        .subscribe((data: any) => {
          let hasStp = false;
          let hasChild = false;
          if (data && data.suc > 0) {
            hasStp = (data.msg && data.msg.length > 0);
            hasChild = (data.dependents && data.dependents.length > 0);
          }
          this.buildMenu(hasStp, hasChild);
          this.cdr.detectChanges(); // Force update just in case
        }, error => {
          this.buildMenu(false, false);
          this.cdr.detectChanges();
        });
    }
  }

  buildMenu(hasStp: boolean, hasChild: boolean) {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-microsoft',
        routerLink: '/main/dashboard',
      },
      {
        label: 'Member Details',
        icon: 'pi pi-user',
        routerLink: '/main/memb_dtls',
      },
      {
        label: 'Deposit Subscription',
        icon: 'pi pi-calendar',
        routerLink: '/main/depo_subs',
      }
    ];

    if (!hasStp && !hasChild) {
      this.items.push({
        label: 'Member has no insurance',
        icon: 'pi pi-list',
        routerLink: null
      });
    } else {
      let insuranceItem: any = {
        label: 'Insurance Details',
        icon: 'pi pi-list',
        expanded: false,
        items: []
      };

      if (hasStp) {
        insuranceItem.items.push({
          label: 'Super Topup Policy',
          icon: 'pi pi-circle',
          routerLink: '/main/ins_dtls'
        });
      }
      if (hasChild) {
        insuranceItem.items.push({
          label: 'Children Policy',
          icon: 'pi pi-circle',
          routerLink: '/main/child_policy'
        });
      }
      
      this.items.push(insuranceItem);
    }

    this.items.push(
      {
        label: 'Transaction History',
        icon: 'pi pi-indian-rupee',
        routerLink: '/main/trn_history',
      },
      {
        label: 'Logout',
        icon: "pi pi-sign-out",
        routerLink: '/auth/member_login',
      }
    );
  }

  // onClick(id: any) {
  //   let element = document.getElementById(id);

  //   if (element?.className.includes('menu-item-open')) {
  //     element?.classList.remove('menu-item-open');
  //   } else {
  //     element?.classList.add('menu-item-open');
  //   }
  // }

  onItemClick(item: any) {
    if (item.items && item.items.length > 0) {
      item.expanded = !item.expanded;
    } else {
      this.selectedItem = item;
      this.navigate(item.routerLink);
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
