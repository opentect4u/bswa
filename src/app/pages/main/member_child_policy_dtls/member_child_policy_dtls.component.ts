import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/service/data.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';

interface UserInfo {
  form_no: string;
  form_dt: string;
  member_id: string;
  memb_name: string;
  dob: string;
  gender: string;
  status: string;
  age: string;
  effective_dt: string;
  policy_amt: string;
  premium_amt: string;
  trans_type: string;
}


@Component({
  selector: 'app-member_child_policy_dtls',
  templateUrl: './member_child_policy_dtls.component.html',
  styleUrls: ['./member_child_policy_dtls.component.css'],
   providers: [DatePipe]
})
export class Member_child_policy_dtlsComponent implements OnInit {
  secretKey = environment.secretKey
  member_id: any;
  form!: FormGroup;
  responseData: any
  userData: UserInfo | any;
  dependents: any[] = [];

  constructor(private router: Router,
    private fb: FormBuilder,
    private dataServe: DataService,
    private route: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.member_id = localStorage.getItem('member_id');
    console.log(this.member_id,'this');

    this.form = this.fb.group({
    form_no: [''],
    form_dt: [''],
    member_id: [''],
    memb_name: [''],
    dob: [''],
    gender: [''],
    status: [''],
    age: [''],
    effective_dt: [''],
    policy_amt: [''],
    premium_amt: [''],
    trans_type: ['']
    });

    this.getMemberChildDetails();
    // this.getDependentsForMember(this.userData.member_id);

  }

getMemberChildDetails() {
  const dt = {
    memb_id: localStorage.getItem('member_id')
  };

  this.dataServe.global_service(1, '/fetch_member_details_fr_child_policy', dt).subscribe(
    (data: any) => {
      this.responseData = data;
      console.log(this.responseData, 'res');

      if (this.responseData.suc > 0) {
        if (Array.isArray(this.responseData.msg) && this.responseData.msg.length > 0) {
          this.userData = this.responseData.msg[0];
          this.form.patchValue({
          form_no: this.userData.form_no,
          form_dt: this.datePipe.transform(this.userData.form_dt, 'yyyy-MM-dd'),
          member_id: this.userData.member_id,
          memb_name: this.userData.member_name,      
          dob: this.datePipe.transform(this.userData.dob, 'yyyy-MM-dd'),
          gender: this.userData.gender,
          status: this.userData.status,
          age: this.userData.age,
          effective_dt: this.datePipe.transform(this.userData.effective_date, 'yyyy-MM-dd'),
          policy_amt: this.userData.policy_amount,   
          premium_amt: this.userData.premium_amount, 
          trans_type: this.userData.trns_type,
          });
           this.getDependentsForMember(this.userData.member_id);
        } 
        // else {
        //   Swal.fire('Warning', 'No Children policy data found!!!', 'warning');
        // }
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

getDependentsForMember(memb_id: string) {
  const dt = { memb_id: memb_id };

  this.dataServe.global_service(1, '/fetch_member_depend_details_fr_child_policy', dt).subscribe(
    (data: any) => {
      if (data.suc > 0) {
        this.dependents = data.msg || [];
      } else {
        this.dependents = [];
        Swal.fire('Warning', 'No dependent data found!', 'warning');
      }
    },
    (error) => {
      console.error(error);
      Swal.fire('Error', 'Failed to fetch dependent details', 'error');
    }
  );
};

  onPay() {
     var memberName = this.userData.member_name;
     var premiumAmount = this.userData.premium_amount;
     var form_no = this.userData.form_no; 
     var member_id = this.userData.member_id;
     console.log(memberName,premiumAmount,form_no,member_id,'lo');
     
 
     var custDt = { 
      form_no: form_no, 
      member_id: member_id, 
      memb_name: memberName, 
      amount: premiumAmount, 
      redirect_path: '/main/child_policy'
    }
 
     const encDt = CryptoJS.AES.encrypt(JSON.stringify(custDt),this.secretKey ).toString();
    //  const decryptedSubscriptionAmount = CryptoJS.AES.decrypt(encDt, secretKey).toString(CryptoJS.enc.Utf8);
 
     console.log(encDt,'amt');
    //  console.log(decryptedSubscriptionAmount,'amt');
     
     
     this.router.navigate(['/auth/payment_preview_page'], { 
       queryParams: { enc_dt: encDt }
     });
   }

}
