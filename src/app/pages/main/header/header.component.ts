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
  public user = 'Hi, Member';
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
          this.change_password_member();
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

  ngOnInit() {}

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
    this.event.emit({sidemenuOpen: this.sidemenuOpen, classSidemenu: this.classSidemenu, classContent: this.classContent})
  }

  onSignOut() {
    // alert('Logout')
    this.router.navigate(['/auth/member_login']);
  }

  change_password_member(){
    this.router.navigate(['/main/change_password_member'])
  }
}
