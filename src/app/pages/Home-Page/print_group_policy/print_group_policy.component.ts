import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

interface MemberStatus {
  name: string;
  code: string;
}

interface MembershipInfo {
  mem_type: string,
  memb_name: string,
  member_id: string,
  gurdian_name: string,
  gender: string,
  marital_status: string,
  dob: string
  unit_name: string,
  phone: string,
}

interface SpouseDepenInfo {
  sl_no: string,
  dependent_name: string,
  relation_name: string,
  dob: string,
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
  selector: 'app-print_group_policy',
  templateUrl: './print_group_policy.component.html',
  styleUrls: ['./print_group_policy.component.css'],
  providers: [DatePipe],
})
export class Print_group_policyComponent implements OnInit {
  form_no: any;
  member_id:any;
  WindowObject: any;
  divToPrint: any;
  api_base_url = environment.api_url;
  selectedValues: any[] = [];
  responsedata: any;
  memb_name: any;
  mem_type: any;
  memb_oprn: any;
  staff_nos: any;
  pers_no: any;
  gurdian_name: any;
  memb_address: any;
  ps: any;
  phone_no: any;
  blood_grp: any;
  dob: any;
  email_id: any;
  min_no: any;
  dependent_name: any;
  resdata: any;
  spou_blood_grp: any;
  gurd_name: any;
  spou_dob: any;
  spou_phone: any;
  spou_memb_address: any;
  resolution_no: any;
  subscription_1: any;
  adm_fee: any;
  donation: any;
  spou_min: any;
  resdata1: any;
  dep_dt: any;
  memb_pic: any;
  responsedata_1: any;
  unit_name: any;
  spouseInfo: [SpouseDepenInfo] | undefined;
  stpinfo: MembershipInfo | undefined;
  ind_type: any;
  treatment_dtls:any;
  particulars:any;
  amount:any;
  fin_year:any;
  sup_top_list: any = [];
  additionalOptions: any = false;
  preinfo:  PremiumInfo | undefined;
  pre_amt_flag: any;
  pre_amt_value: any;
  genInsData: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataServe: DataService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    const encodedFormNo = this.route.snapshot.params['form_no'];
    this.member_id = localStorage.getItem('user_name')
    console.log(this.member_id,'ooo'); 
    this.form_no = atob(decodeURIComponent(encodedFormNo));
    this.getGenInsInfo()
  }

  getMemberInfo(memb_id:any) {
    this.dataServe
      .global_service(0, '/get_member_policy_print', `member_id=${memb_id}`)
      .subscribe((data: any) => {
        this.responsedata = data;
        console.log(this.responsedata, '666');
        this.responsedata =
          this.responsedata.suc > 0
            ? this.responsedata.msg.length > 0
              ? this.responsedata.msg[0]
              : {}
            : {};
        this.stpinfo = this.responsedata;
      });
  }

  getGenInsInfo() {
    this.dataServe
      .global_service(0, '/get_gen_ins_dt', `form_no=${this.form_no}`)
      .subscribe((data: any) => {
        this.genInsData = data;
        console.log(this.genInsData, '666');
        this.genInsData =
          this.genInsData.suc > 0
            ? this.genInsData.msg.length > 0
              ? this.genInsData.msg[0]
              : {}
            : {};
        
    this.getMemberInfo(this.genInsData.member_id ? this.genInsData.member_id : '');
    this.getSpouseInfo(this.genInsData.member_id ? this.genInsData.member_id : '');
    this.getPremiumInfo();
      });
  }

  getSpouseInfo(memb_id:any) {
    this.dataServe
      .global_service(0, '/get_member_policy_dependent_print', `member_id=${memb_id}`)
      .subscribe((spouse_dt: any) => {
        this.resdata = spouse_dt;
        console.log(this.resdata, '777');
        this.resdata = 
           this.resdata.suc > 0 
             ? this.resdata.msg.length > 0 
             ? this.resdata.msg
             : []
             : [];
        this.spouseInfo = this.resdata
      });
  }

  getPremiumInfo(){
    this.dataServe
    .global_service(0, '/premium_dtls', `form_no=${this.form_no}`)
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
      this.pre_amt_flag = this.preinfo!['prm_flag2'] != 'Y' && this.preinfo!['prm_flag3'] != 'Y' ? 'No' : 'Yes';
      this.pre_amt_value = this.preinfo!['prm_flag2'] == 'Y' ? 
      this.preinfo!['premium_amt2'] : this.preinfo!['prm_flag3'] == 'Y' ? 
      this.preinfo!['premium_amt3'] : '0';
      console.log(this.preinfo,'pre');
      
    });
  }
  // getPremiumAmt(event:any){
  //   console.log(event.target.value);
  //   var dropVal = event.target.value
  //   var filter_res_dt = this.responsedata.length > 0 ? (this.responsedata[0].pre_dt.filter((dt:any) => dt.family_type == dropVal)) : []
  //   if(filter_res_dt.length > 0){
  //     var sup_top_dt = [{name: 'Super Top up Amount 12 lacs', value: filter_res_dt[0].premium2}, {name: 'Super Top up Amount 24 lacs', value: filter_res_dt[0].premium3}]
  //     this.sup_top_list = sup_top_dt
  //     this.form.patchValue({pre_amont: filter_res_dt[0].premium1})
  //   }
    
  // }

  printDiv() {
    this.divToPrint = document.getElementById('divToPrint');

    this.WindowObject = window.open('', 'Print-Window');
    this.WindowObject.document.open();
    this.WindowObject.document.writeln('<!DOCTYPE html>');
    this.WindowObject.document.writeln(
      '<html><head><title></title><style type="text/css">'
    );

    this.WindowObject.document.writeln(
      '@media print {.table_space { margin-left: 14px; } .letter{ margin-left: 19px; margin: 6PX; padding: 0; } .letter_style{ margin-left: 22px; margin: 17PX; padding: 0; } p-button.p-element, .print_btn { bottom: 15px; } .size{ margin-left: 67px; } .margin{ margin-left: 65vw; } </style>'
    );
    this.WindowObject.document.writeln(
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">'
    );
    this.WindowObject.document.writeln(
      '<link rel="stylesheet" href="/plugins/fontawesome-free/css/all.min.css">'
    );
    this.WindowObject.document.writeln(
      '<link rel="stylesheet" href="/css/adminlte.min.css">'
    );
    this.WindowObject.document.writeln('</head><body onload="window.print()">');
    this.WindowObject.document.writeln(this.divToPrint.innerHTML);
    this.WindowObject.document.writeln('</body></html>');
    this.WindowObject.document.close();
    setTimeout(() => {
      this.WindowObject.close();
    }, 1000);
  }

}
