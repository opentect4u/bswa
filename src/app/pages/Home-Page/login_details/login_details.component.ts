import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login_details',
  templateUrl: './login_details.component.html',
  styleUrls: ['./login_details.component.css']
})
export class Login_detailsComponent implements OnInit {
 finance: any

  constructor(private router: Router) { }

  ngOnInit() {
    this.finance = 'https://bspwa.in/fin/'
  }

 nextPage(){
this.router.navigate(['/auth/superadmin_login'])
 }

 login(){
  this.router.navigate(['/auth/login'])
 }

 member_login(){
  this.router.navigate(['/auth/member_login'])
 }

}
