import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isDepositPremiumDisabled: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    // 🔹 Set cutoff date & time
    const cutoff = new Date('2025-08-26T00:00:00');  
    const now = new Date();

    this.isDepositPremiumDisabled = now > cutoff;
  }

  open_member(){
    this.router.navigate(['/main/memb_dtls'])
  }

  open_insurance_details(){
    this.router.navigate(['/main/ins_dtls'])
  }

  // open_first_premium(){
  //   this.router.navigate(['/main/stp_premium_payment'])
  // }

   open_deposit_subscription() {
    // if (!this.isDepositPremiumDisabled) {
      this.router.navigate(['/main/depo_subs'])
    // }
  }

  open_trn_history(){
    this.router.navigate(['/main/trn_history'])
  }

    open_e_card(){
    window.open(`https://mdindiaonline.com/E-Cardrequest.aspx`, '_blank');
  }

}
