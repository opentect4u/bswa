import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public sidemenuOpen = true;
  public classSidemenu: any;
  public classContent: any;
  public headerMenuItem!: MenuItem[];
  public user = '';
  label: any = 'A';
  @Output() event = new EventEmitter();
  constructor(private router: Router) {
    console.log(window.innerWidth);
    if (window.innerWidth <= 480) {
      this.sidemenuOpen = false;
      this.classSidemenu = 'sidemenu-close';
      this.classContent = 'content-full';
    } else {
      this.classSidemenu = 'sidemenu-open';
      this.classContent = 'content-normal';
    }

    this.headerMenuItem = [
      // {
      //   label: 'Profile',
      //   icon: 'pi pi-fw pi-user',
      // },
      {
        label: 'Change Password',
        icon: 'pi pi-fw pi-cog',
        command: () => {
          this.password_change();
        }
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => {
          this.onSignOut();
        },
      },
    ];
  }

  ngOnInit() {
    this.user = `Hi, ${localStorage.getItem('user_name')}` || '';
    let name = localStorage.getItem('user_name') || '';
    if (name != '') {
      this.label = name[0];
    }
  }

  onMenuToggle() {
    this.sidemenuOpen = !this.sidemenuOpen;

    if (window.innerWidth <= 480) {
      if (this.sidemenuOpen) {
        this.classSidemenu = 'sidemenu-overlay';
        this.classContent = 'content-full';
      } else {
        this.classSidemenu = 'sidemenu-close';
        this.classContent = 'content-full';
      }
    } else {
      if (this.sidemenuOpen) {
        this.classSidemenu = 'sidemenu-open';
        this.classContent = 'content-normal';
      } else {
        this.classSidemenu = 'sidemenu-minimize';
        this.classContent = 'content-wide';
      }
    }
    this.event.emit({
      sidemenuOpen: this.sidemenuOpen,
      classSidemenu: this.classSidemenu,
      classContent: this.classContent,
    });
  }

  onSignOut() {
    // alert('Logout')
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  password_change(){
    this.router.navigate(['/admin/change_password']);
  }

}
