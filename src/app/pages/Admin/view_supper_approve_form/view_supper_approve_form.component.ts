import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

interface MembershipInfo {
  mem_type: string,
  memb_oprn: string,
  memb_name: string,
  member_id: string,
  gurdian_name: string,
  gender: string,
  marital_status: string,
  dob: string,
  pers_no: string,
  min_no: string,
  mem_address: string,
  phone_no: Date,
  dependent_name: string,
  spou_guard: string,
  relation: string,
  spou_min_no: string,
  spou_db: string,
  spou_phone: string,
  spou_address: string,
  unit_name: string,
  spou_dob: any
  personel_no: string,

}

interface SpouseDepenInfo {
  sl_no: string,
  ind_type: string,
  fin_year: string,
  particulars: string,
  amount: string,
  treatment_dtls: string,
}

interface TransactionInfo {
  resolution_no: string,
  resolution_dt: string,
  status: string,
  frm_no: string,
  pre_amt: string,
  payment: string,
}

@Component({
  selector: 'app-view_supper_approve_form',
  templateUrl: './view_supper_approve_form.component.html',
  styleUrls: ['./view_supper_approve_form.component.css'],
  providers: [DatePipe],
})
export class View_supper_approve_formComponent implements OnInit {
  api_base_url = environment.api_url;
  selectedValues: any[] = [];
  WindowObject: any;
  divToPrint: any;
  responsedata: any;
  form_no: any;
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
  member_id: any;
  responsedata_1: any;
  // selectedValue: string = 'A';
  selectedValue2: string = 'O';
  frm_no:any;
  spouseInfo: [SpouseDepenInfo] | undefined;
  stpinfo: MembershipInfo | undefined;
  traninfo: TransactionInfo | undefined;
  ind_type: any;
  treatment_dtls:any;
  particulars:any;
  amount:any;
  fin_year:any;
  form: FormGroup;
  userData: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataServe: DataService,
    private datePipe: DatePipe
  ) { 
    this.form = this.fb.group({
    resolution_no: ['',Validators.required],
    resolution_dt: ['',Validators.required],
    status: ['',Validators.required],
    reject: ['',Validators.required],
    payment: [''],
    pre_amt: [''],
  });
}

get f() {
  return this.form.controls;
}

  ngOnInit() {
    const encodedFormNo = this.route.snapshot.params['form_no'];
    const encodedMemId = this.route.snapshot.params['member_id'];
    const encodedPhNo = this.route.snapshot.params['phone_no'];
    // this.member_id = localStorage.getItem('user_name')
    
    this.form_no = atob(decodeURIComponent(encodedFormNo));
    this.member_id = atob(decodeURIComponent(encodedMemId));
    this.phone_no = atob(decodeURIComponent(encodedPhNo));
    console.log(this.member_id,'ooo');
    this.getMemberInfo(this.member_id,this.form_no);
    this.getSpouseInfo();
    this.getRejectTransactionInfo();
    this.getTransactionInfo();
  }

  getMemberInfo(memb_id:any,form_no:any) {
    this.dataServe
      .global_service(0, '/get_member_policy_print_super', `member_id=${memb_id}&&form_no=${form_no}`)
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

  getSpouseInfo() {
    this.dataServe
      .global_service(0, '/get_super_mediclaim', `form_no=${this.form_no}`)
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
        // this.ind_type = this.responsedata[0].ind_type;
      });
  }

  getRejectTransactionInfo() {
    this.dataServe
      .global_service(0, '/get_super_transaction_reject', `form_no=${this.form_no}`)
      .subscribe((data: any) => {
        this.resdata = data;
        console.log(this.resdata);
        this.resdata = this.resdata.suc > 0 ? this.resdata.msg : []
        // console.log(this.resdata[0].subscription_1)
        this.form.patchValue({
          resolution_no: this.resdata[0].resolution_no,
          resolution_dt: this.datePipe.transform(this.resdata[0].resolution_dt, 'yyyy-MM-dd'),
          status:this.resdata[0].form_status == 'T' ? 'Approve' : '',
          reject: this.resdata[0].remarks
        })
      })
  }

  getTransactionInfo() {
    // this.dataServe
    //   .global_service(0, '/get_super_transaction', `form_no=${this.form_no}`)
    //   .subscribe((trans_dt: any) => {
    //     this.resdata = trans_dt;
    //     console.log(this.resdata, '777');
    //     this.resdata = 
    //        this.resdata.suc > 0 
    //          ? this.resdata.msg.length > 0 
    //          ? this.resdata.msg
    //          : []
    //          : [];
    //     this.traninfo = this.resdata
    //     this.form.patchValue({
    //       admissionFee: this.responsedata[0].adm_fee,
    //       donationFee: this.responsedata[0].donation,
    //       subscriptionFee:this.responsedata[0].subscription_1,
    //       subscriptionType:this.responsedata[0].subs_type=='M'? 'Monthly' : 'Yearly',
    //     })
    //   });
    this.dataServe
      .global_service(0, '/get_super_transaction', `form_no=${this.form_no}`)
      .subscribe((data: any) => {
        this.resdata = data;
        console.log(this.resdata);
        this.resdata = this.resdata.suc > 0 ? this.resdata.msg : []
        console.log(this.resdata[0].subscription_1)
        this.form.patchValue({
          resolution_no: this.resdata[0].resolution_no,
          resolution_dt: this.datePipe.transform(this.resdata[0].resolution_dt, 'yyyy-MM-dd'),
          status:this.resdata[0].form_status=='T' ? 'Approve' : '',
          pre_amt: this.resdata[0].premium_amt,
        })
      })
  }

  approve_stp(){
    var dt = {
      formNo: this.form_no,
      // member: this.route.snapshot.params['memb_name'],
      resolution_no: this.f['resolution_no'] ? this.f['resolution_no'].value : null,
      resolution_dt: this.f['resolution_dt'] ? this.f['resolution_dt'].value : null,
      status: this.f['status'] ? this.f['status'].value : null,
      user: localStorage.getItem('user_name'),
      phone_no: this.phone_no,
      member: this.stpinfo?.memb_name
    }

    this.dataServe.global_service(1, '/approve_stp_data',dt ).subscribe((data: any) => {
      this.resdata = data;
      console.log(this.resdata, '99');
      if(this.resdata.suc > 0) {
        this.router.navigate(['/admin/super_policy_approve'])
      }
    });  
  }

  printDiv() {
    this.divToPrint = document.getElementById('divToPrint');

    this.WindowObject = window.open('', 'Print-Window');
    this.WindowObject.document.open();
    this.WindowObject.document.writeln('<!DOCTYPE html>');
    this.WindowObject.document.writeln(
      '<html><head><title></title><style type="text/css">'
    );

    this.WindowObject.document.writeln(
      '@media print { .margin{ margin-left: 65vw; } .letter{ margin-left: 19px; margin: 6PX; padding: 0; } .table_space { margin-left: 14px; } .size{ margin-left: 67px; /* margin: 6px; */ /* padding: 0; */ } .spacing { margin: 10px 0; } .checkbox-spacing { margin-right: 10px; } .space { color: black; float: right; margin-top: -1vw; margin-right: 10vw; } p-button.p-element, .print_btn { float: right; position: fixed; right: 30px; bottom: 15px; } table, tr, td, th{text-align: start;width: 90%;} th { border: 1px solid #b1b1b1;} .color{ color: black; display: flex; justify-content: space-evenly; } .span_space{margin-left: 19px;} </style>'
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
