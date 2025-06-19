import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stp_dashboard',
  templateUrl: './stp_dashboard.component.html',
  styleUrls: ['./stp_dashboard.component.css']
})
export class Stp_dashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  open_member(){
    this.router.navigate(['/main/memb_dtls'])
  }

  open_insurance(){
    this.router.navigate(['/main/ins_form'])
  }

}
