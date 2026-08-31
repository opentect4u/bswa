import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stp_dashboard',
  templateUrl: './stp_dashboard.component.html',
  styleUrls: ['./stp_dashboard.component.css']
})
export class Stp_dashboardComponent implements OnInit {

  isDepositPremiumDisabled: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    // 🔹 Set cutoff date & time
    // const cutoff = new Date('2025-08-26T00:00:00');  
    // const now = new Date();

    // this.isDepositPremiumDisabled = now > cutoff;
  }

  open_member(){
    this.router.navigate(['/main/stp_memb_dtls'])
  }

  open_premium(){
    this.router.navigate(['/main/stp_premium_dtls'])
  }

  // open_first_premium(){
  //   this.router.navigate(['/main/stp_premium_payment'])
  // }

   open_first_premium() {
    if (!this.isDepositPremiumDisabled) {
      this.router.navigate(['/main/stp_premium_payment'])
    }
  }

  open_trn_history(){
    this.router.navigate(['/main/stp_memb_transaction'])
  }

    open_e_card(){
    Swal.fire({
      text: 'Super top up E Card is active for cashless only after exhaust of SAIL MEDICLAIM S. I. (Sum insured)',
      icon: 'info',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(`https://mdindiaonline.com/loginpage.aspx?l=ce`, '_blank');
      }
    });
  }

}
