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
  personel_no: string,
  min_no: string,
  mem_address: string,
  phone_no: Date,
  dependent_name: string,
  spou_guard: string,
  relation: string,
  spou_min_no: string,
  spou_dob: string,
  spou_phone: string,
  spou_address: string,
  unit_name: string,
}

interface SpouseDepenInfo {
  ind_type: string,
  fin_year: string,
  particulars: string,
  amount: string,
  treatment_dtls: string,
}

@Component({
  selector: 'app-print_stp_form',
  templateUrl: './print_stp_form.component.html',
  styleUrls: ['./print_stp_form.component.css'],
  providers: [DatePipe],
})
export class Print_stp_formComponent implements OnInit {
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

  spouseInfo: [SpouseDepenInfo] | undefined;
  stpinfo: MembershipInfo | undefined;
  ind_type: any;
  treatment_dtls:any;
  particulars:any;
  amount:any;
  fin_year:any;
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
    // this.getMemberInfo();
    this.getGenInsInfo();
    this.getSpouseInfo();
  }

  getMemberInfo(memb_id:any) {
    this.dataServe
      .global_service(0, '/get_member_policy_print_super', `member_id=${memb_id}`)
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
      .global_service(0, '/get_stp_ins_dt', `form_no=${this.form_no}`)
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

  printDiv() {
    this.divToPrint = document.getElementById('divToPrint');

    this.WindowObject = window.open('', 'Print-Window');
    this.WindowObject.document.open();
    this.WindowObject.document.writeln('<!DOCTYPE html>');
    this.WindowObject.document.writeln(
      '<html><head><title></title><style type="text/css">'
    );

    this.WindowObject.document.writeln(
      '@media print { .table_space { margin-left: 14px; } .letter{ margin-left: 19px; margin: 6PX; padding: 0; } .letter_style{ margin-left: 22px; margin: 17PX; padding: 0; } p-button.p-element, .print_btn { /* align-items: center;     */ /* position: fixed; */ /* right: 30px; */ bottom: 15px; /* margin-left: 30vw; */ } </style>'
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
