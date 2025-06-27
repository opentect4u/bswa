import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-Insurance-home',
  templateUrl: './Insurance-home.component.html',
  styleUrls: ['./Insurance-home.component.css']
})
export class InsuranceHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // super_policy(){
  //   Swal.fire(
  //     'Warning',
  //     'This Policy Only for Sail retirees  and their Spouses',
  //     'warning',
  //   ).then((result) => {
  //     if (result.isConfirmed) {
  //       this.router.navigate(['/home/super_topup_register'])
  //     }
  //   });
    
  // }

super_policy() {
  Swal.fire({
    title: 'Warning',
    text: 'This policy is only for Sail Retirees and their Spouses',
    icon: 'warning',
    customClass: {
      popup: 'custom-swal-popup',
      icon: 'custom-swal-icon'
    },
    confirmButtonText: 'OK'
  }).then((result) => {
    if (result.isConfirmed) {
      this.router.navigate(['/home/super_topup_register']);
    }
  });
}


// super_policy() {
//   Swal.fire({
//     title: 'Warning',
//     text: 'Work is in Progress',
//     icon: 'warning',
//     customClass: {
//       popup: 'custom-swal-popup',
//       icon: 'custom-swal-icon'
//     },
//     confirmButtonText: 'OK'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       this.router.navigate(['/home/insurance_form_home']);
//     }
//   });
// }




  group_policy(){
    this.router.navigate(['/home/group_policy'])
  }

  child_policy(){
    this.router.navigate(['/home/children_policy'])
  }

}
