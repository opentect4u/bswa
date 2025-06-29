import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/service/data.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';

interface UserInfo {
  min_no: string;
  member_type: string;
  memb_oprn: string;
  memb_name: string;
  memb_id: string;
  dob: string;
  premium_type: string;
  dependent_name: string;
  spou_min_no: string;
  tot_prem: string;
}

@Component({
  selector: 'app-stp_premium_payment',
  templateUrl: './stp_premium_payment.component.html',
  styleUrls: ['./stp_premium_payment.component.css'],
  providers: [DatePipe],
})
export class Stp_premium_paymentComponent implements OnInit {
    secretKey = environment.secretKey
    member_id: any;
    min_no: any;
    form_no: any;
    flag: any;
    form!: FormGroup;
    responseData: any
    userData: UserInfo | any;

  constructor(private router: Router,
    private fb: FormBuilder,
    private dataServe: DataService,
    private route: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.min_no = localStorage.getItem('min_no');
    this.member_id = localStorage.getItem('member_id');
    this.form_no = localStorage.getItem('form_no');
    this.flag= localStorage.getItem('flag');

    this.form = this.fb.group({
    min_no: [''],
    member_type: [''],
    memb_oprn: [''],
    memb_name: [''],
    memb_id: [''],
    premium_type: [''],
    dependent_name: [''],
    spou_min_no: [''],
    tot_prem: [''],
    });

    this.getSuperMemberDetails();
    
  }

     getSuperMemberDetails() {
        const dt = {
        min_no: localStorage.getItem('min_no'),
        member_id: localStorage.getItem('member_id'),
        form_no: localStorage.getItem('form_no'),
      };
    
      this.dataServe.global_service(1, '/fetch_member_details_fr_stp_policy', dt).subscribe(
        (data: any) => {
          this.responseData = data;
          console.log(this.responseData, 'res');
    
          if (this.responseData.suc > 0) {
            if (Array.isArray(this.responseData.msg) && this.responseData.msg.length > 0) {
              this.userData = this.responseData.msg[0];
              const premiumTypeCode = this.userData.premium_type;

              this.form.patchValue({
              // form_no: this.userData.form_no,
              memb_id: this.userData.member_id ? this.userData.member_id : 'N/A',
              min_no: this.userData.min_no ? this.userData.min_no : 'N/A',
              member_type: this.userData.memb_type == 'G' ? 'General Membership' : this.userData.memb_type == 'L' ?'Life Membership' : this.userData.memb_type == 'AI' ? 'Associate Membership' : 'N/A',
              memb_oprn: this.userData.memb_oprn == 'S' ? 'Single' : this.userData.memb_oprn == 'D' ? 'Double' : 'N/A',
              memb_name: this.userData.memb_name ? this.userData.memb_name : 'N/A',
              premium_type: premiumTypeCode == 'S'
                ? 'Single'
                : premiumTypeCode == 'D'
                ? 'Double'
                : 'N/A',
              dependent_name: this.userData.dependent_name ? this.userData.dependent_name : 'N/A',
              spou_min_no: this.userData.spou_min_no ? this.userData.spou_min_no : 'N/A',
              // tot_prem: this.userData.premium_amt,
              });
               this.fetchPremiumAmount(premiumTypeCode);
            } 
          } else {
            Swal.fire('Error', this.responseData.msg, 'error');
          }
        },
        (error) => {
          console.error(error);
          Swal.fire('Error', 'An error occurred while fetching data', 'error');
        }
      );
    };
  
    fetchPremiumAmount(premium_type_code: string) {
  const reqData = { premium_type: premium_type_code };

  this.dataServe.global_service(1, '/fetch_max_premium_amt', reqData).subscribe(
    (res: any) => {
      console.log("Fetched premium amount:", res);

      if (res && res.premium_amt) {
        // Patch form and update userData
        this.userData.premium_amt = res.premium_amt;
        this.form.patchValue({ tot_prem: res.premium_amt });
      } else {
        this.form.patchValue({ tot_prem: '0' });
      }
    },
    (error) => {
      console.error("Error fetching premium amount", error);
    }
  );
}

      submit_premium() {
         var memberName = this.userData.memb_name;
         var premiumAmount = this.userData.premium_amt;
         var form_no = this.userData.form_no; 
         var member_id = this.userData.member_id;
         var phone_no = this.userData.phone_no;
         console.log(memberName,premiumAmount,form_no,member_id,'lo');
         
     
         var custDt = { 
          form_no: form_no, 
          member_id: member_id, 
          memb_name: memberName, 
          amount: premiumAmount, 
          phone_no: phone_no,
          email: '',
          calc_upto: '',
          subs_type: '',
          sub_fee: '', 
          soc_flag: 'T',
          trn_id: '', 
          approve_status: 'A', 
          pay_flag: 'C',
          redirect_path: '/main/stp_premium_payment'
        }
        // console.log(custDt,'hy');
        
     
         const encDt = CryptoJS.AES.encrypt(JSON.stringify(custDt),this.secretKey ).toString();
        //  const decryptedSubscriptionAmount = CryptoJS.AES.decrypt(encDt, secretKey).toString(CryptoJS.enc.Utf8);
     
         console.log(encDt,'amt');
        //  console.log(decryptedSubscriptionAmount,'amt');
         
         
         this.router.navigate(['/auth/payment_preview_page'], { 
           queryParams: { enc_dt: encDt }
         });
       }

}
