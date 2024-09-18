import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import * as CryptoJS from 'crypto-js';

interface UserInfo {
  form_no: string;
  form_dt: string;
  member_id: string;
  mem_dt: string;
  mem_type: string;
  memb_oprn: string;
  memb_name: string;
  unit_id: string;
  gurdian_name: string;
  gender: string;
  marital_status: string;
  dob: string;
  blood_grp: string;
  caste: string;
  staff_nos: string;
  pers_no: string;
  min_no: string;
  memb_address: string;
  ps: string;
  city_town_dist: string;
  pin_no: string;
  phone_no: string;
  email_id: string;
  memb_pic: string;
  memb_status: string;
  remarks: string;
  resolution_no: string;
  resolution_dt: string;
  spou_dt: DepInfo;
  dep_dt: [DepInfo];
  // userMedicalData: MedicalInfo[];
  sl_no: string;
  ind_type: string;
  fin_year: string;
  amount: string;
  particulars: string;
  treatment_dtls: string;
}

interface DepInfo {
  form_no: string;
  sl_no: string;
  member_id: string;
  mem_type: string;
  dependent_dt: string;
  dependent_name: string;
  gurdian_name: string;
  relation: string;
  min_no: string;
  dob: string;
  blood_grp: string;
  memb_address: string;
  ps: string;
  city_town_dist: string;
  pin_no: string;
  phone_no: string;
  email_id: string;
  memb_pic: string;
  intro_member_id: string;
  dept_status: string;
  grp_status: string;
  grp_no: string;
  stp_status: string;
  stp_no: string;
  relation_intro: string;
  intro_name: string;
  dependent_name_dep: string;
  dob_dep: string;
  relation_dep: string;
}

interface MedicalInfo {
  sl_no: string;
  ind_type: string;
  fin_year: string;
  amount: string;
  particulars: string;
  treatment_dtls: string;
}

interface PremiumInfo {
  "form_no": string,
  "premium_amt": string,
  "premium_amt2": string,
  "prm_flag2": string,
  "premium_amt3": string,
  "prm_flag3": string,
  "family_type": string,
}

@Component({
  selector: 'app-ins_dtls',
  templateUrl: './ins_dtls.component.html',
  styleUrls: ['./ins_dtls.component.css'],
  providers: [DatePipe]
})
export class Ins_dtlsComponent implements OnInit {
  secretKey = environment.secretKey;
  mem_id:any
  mem_type:any
  insData: any  = {};
  userData: UserInfo | any;
  dependentsData: any = [];
  preinfo: PremiumInfo | undefined;
  responsedata:any
  pre_amt_flag: any;
  pre_amt_value: any;
  tot_pre_amt: number = 0;
  // userMedicalData: MedicalInfo | any ;

  constructor(private router: Router, private dataServe: DataService) { }

  ngOnInit() {
  // this.form_no = localStorage.getItem('form_no')
  const mem_id = localStorage.getItem('member_id')
   this.getInsuranceDetails(mem_id);
  }

  getPremiumInfo(form_no:any) {
    this.dataServe
      .global_service(0, '/premium_dtls', `form_no=${form_no}`)
      .subscribe((data: any) => {
        this.responsedata = data;
        console.log(this.responsedata, '666');
        this.responsedata =
          this.responsedata.suc > 0
            ? this.responsedata.msg.length > 0
              ? this.responsedata.msg[0]
              : {}
            : {};
        this.preinfo = this.responsedata;
        this.pre_amt_flag =
          this.preinfo!['prm_flag2'] != 'Y' && this.preinfo!['prm_flag3'] != 'Y'
            ? 'No'
            : 'Yes';
        this.pre_amt_value =
          this.preinfo!['prm_flag2'] == 'Y'
            ? this.preinfo!['premium_amt2']
            : this.preinfo!['prm_flag3'] == 'Y'
            ? this.preinfo!['premium_amt3']
            : '0';
        this.tot_pre_amt =
          parseInt(this.preinfo!.premium_amt) + parseInt(this.pre_amt_value);
        console.log(this.preinfo, 'pre');
      });
  }

  // getInsuranceDetails(){
  //   this.dataServe.global_service(1, '/insurance_dtls',{mem_id: localStorage.getItem('member_id')})
  //         .subscribe((data: any) => {
  //           this.insData = data;
  //           this.insData = this.insData.suc > 0 ? this.insData.msg : {};
  //           if(this.insData.length > 0){
  //             this.userData = this.insData[0]
  //           }
  //         });
  // }

  getInsuranceDetails(mem_id : any){
    this.dataServe.global_service(1, '/insurance_dtls', {mem_id})
      .subscribe((data: any) => {
        if (data && data.suc > 0) {
          this.insData = data.msg || [];
          this.dependentsData = data.dependents || [];
          
          // if (this.insData.length > 0) {
          //   this.userData = this.insData[0];
          //   // this.userMedicalData = this.userData;
          // }

          this.userData = this.insData.length > 0 ? this.insData : [];
          console.log(this.userData,'medical');

          this.getPremiumInfo(this.userData[0].form_no)
          
        } else {
          // Swal.fire(
          //   'Warning',
          //   'There is no access to add More Dependent',
          //     'warning'
          // ).then((result) => {
          //   if (result.isConfirmed) {
          //     this.depenFields_1.clear()
          //         }
          //       });
          this.insData = [];
          this.dependentsData = [];
          this.userData = [];
          // this.userMedicalData = [];
        }
      });
  }
  
  generatePay(){
    var payData = {
      form_no: this.userData[0].form_no,
      member_id: '',
      memb_name: this.userData[0]?.memb_name,
      // amount: this.pre_amt_value,
      amount: this.tot_pre_amt,
      phone_no: this.userData[0]?.phone,
      email: '',
      approve_status: 'U',
      calc_upto: '',
      subs_type: '',
      // sub_fee: this.tot_pre_amt,
      sub_fee: this.pre_amt_value,
      redirect_path: '/',
      soc_flag: 'T',
      trn_id: ''
    };

    var payEncData = CryptoJS.AES.encrypt(
      JSON.stringify(payData),
      this.secretKey
    ).toString();

    //sayantika
    var dt = {
      formNo: this.userData[0].form_no,
      status: 'A',
      user: localStorage.getItem('user_name'),
      pre_amt: this.tot_pre_amt,
      member: this.userData[0]?.memb_name,
      phone_no: this.userData[0]?.phone,
      trn_id: '',
      payEncDataGen: payEncData,
    };
    //

    this.router.navigate(['/auth/payment_preview_page'], { 
      queryParams: { enc_dt: payEncData }
    });
  }

}
