import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    this.router.navigate(['/home/super_topup_register'])
  }

  group_policy(){
    this.router.navigate(['/home/group_policy'])
  }

  child_policy(){
    this.router.navigate(['/home/children_policy'])
  }

}
