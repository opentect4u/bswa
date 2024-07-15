import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  open_member(){
    this.router.navigate(['/main/memb_dtls'])
  }

  open_insurance(){
    this.router.navigate(['/main/ins_form'])
  }

  open_transaction(){
    this.router.navigate(['/main/trn_history'])
  }

  open_subscription(){
    this.router.navigate(['/main/depo_subs'])
  }

}
