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
    this.router.navigate(['/main/stp_memb_dtls'])
  }

  open_premium(){
    this.router.navigate(['/main/stp_premium_dtls'])
  }

  open_first_premium(){
    this.router.navigate(['/main/stp_premium_payment'])
  }

  open_trn_history(){
    this.router.navigate(['/main/stp_memb_transaction'])
  }

    open_e_card(){
    window.open(`https://mdindiaonline.com/E-Cardrequest.aspx`, '_blank');
  }

}
