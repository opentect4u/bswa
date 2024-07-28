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

  super_policy(){
    Swal.fire(
      'Warning',
      'This Policy Only for General & Life Membership',
      'warning'
    ).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/home/super_topup_register'])
      }
    });
    
  }

  group_policy(){
    this.router.navigate(['/home/group_policy'])
  }

  child_policy(){
    this.router.navigate(['/home/children_policy'])
  }

}
