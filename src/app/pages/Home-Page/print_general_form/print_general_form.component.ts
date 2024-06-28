import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

interface MembershipInfo {
  memb_name: string,
  mem_type: string,
  unit_name: string,
  staff_nos: string,
  pers_no: string,
  gurdian_name: string,
  memb_address: string,
  ps: string,
  phone_no: string,
  blood_grp: string,
  dob: Date,
  email_id: string,
  min_no: string,
  resolution_no: string,
  subscription_1: string,
  adm_fee: string,
  donation: string,
  memb_pic: string,
}

interface SpouseDepenInfo {
  dependent_dt: string,
  dependent_name: string,
  gurd_name: string,
  mem_type: string,
  member_id: string,
  relation: string,
  spou_blood_grp: string,
  spou_dob: string,
  spou_email: string,
  spou_memb_address: string,
  spou_min: string,
  spou_phone: string,
  spou_pic: string,
  spou_ps: string,
}

@Component({
  selector: 'app-print_general_form',
  templateUrl: './print_general_form.component.html',
  styleUrls: ['./print_general_form.component.css']
})
export class Print_general_formComponent implements OnInit {
  api_base_url = environment.api_url;
  selectedValues: any[] = [];
  WindowObject: any;
  divToPrint: any;
  responsedata: any;
  form_no: any;
  memb_name: any;
  mem_type: any;
  unit_name: any;
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

  membInfo: MembershipInfo | undefined;
  spouseInfo: SpouseDepenInfo | undefined;
  dependInfo: SpouseDepenInfo | undefined;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataServe: DataService,
  ) { }

  ngOnInit() {
    const encodedFormNo = this.route.snapshot.params['form_no'];
    this.form_no = atob(decodeURIComponent(encodedFormNo));
    // console.log(encodedFormNo,'jjj')
    this.getMemberInfo();
    this.getSpouseInfo();
    this.getDependentInfo();
  }

  getMemberInfo() {
    this.dataServe
      .global_service(0, '/get_member_dtls', `form_no=${this.form_no}`)
      .subscribe((data: any) => {
        this.responsedata = data;
        console.log(this.responsedata, '666');
        this.responsedata =
          this.responsedata.suc > 0
            ? this.responsedata.msg.length > 0
              ? this.responsedata.msg[0]
              : {}
            : {};
        this.membInfo = this.responsedata;
        // this.memb_name = this.responsedata[0].memb_name;
        // this.mem_type = this.responsedata[0].mem_type;
        // this.unit_name = this.responsedata[0].unit_name;
        // this.staff_nos = this.responsedata[0].staff_nos;
        // this.pers_no = this.responsedata[0].pers_no;
        // this.gurdian_name = this.responsedata[0].gurdian_name;
        // this.memb_address = this.responsedata[0].memb_address;
        // this.ps = this.responsedata[0].ps;
        // this.phone_no = this.responsedata[0].phone_no;
        // this.blood_grp = this.responsedata[0].blood_grp;
        // this.dob = this.datePipe.transform(
        //   this.responsedata[0].dob,
        //   'dd-MM-yyyy'
        // );
        // this.email_id = this.responsedata[0].email_id;
        // this.min_no = this.responsedata[0].min_no;
        // this.resolution_no = this.responsedata[0].resolution_no;
        // this.subscription_1 = this.responsedata[0].subscription_1;
        // this.adm_fee = this.responsedata[0].adm_fee;
        // this.donation = this.responsedata[0].donation;
        // this.memb_pic = `${this.api_base_url}/${this.responsedata[0].memb_pic}`;
      });
  }

  getSpouseInfo() {
    this.dataServe
      .global_service(0, '/get_dependent_dtls', `form_no=${this.form_no}`)
      .subscribe((spouse_dt: any) => {
        this.resdata = spouse_dt;
        console.log(this.resdata, '777');
        this.resdata = this.resdata.suc > 0 ? this.resdata.msg : {};
        // this.spou_min = this.resdata.spouse_dt;
        this.spouseInfo = this.resdata.spouse_dt.length > 0 ? this.resdata.spouse_dt[0] : {};
        // console.log(this.spou_min, 'hi');
      });
  }

  getDependentInfo() {
    this.dataServe
      .global_service(0, '/get_dependent_dtls', `form_no=${this.form_no}`)
      .subscribe((dep_dt: any) => {
        this.resdata1 = dep_dt;
        console.log(this.resdata1, '777');
        this.resdata1 = this.resdata1.suc > 0 ? this.resdata1.msg : {};
        // this.dep_dt = this.resdata1.dep_dt;
        this.dependInfo = this.resdata1.dep_dt.length > 0 ? this.resdata1.dep_dt[0] : {}
        console.log(this.dependInfo,'depend');
        
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

    // this.WindowObject.document.writeln(
    //   '@media print { .margin{ margin-left: 65vw; } .letter{ margin-left: 19px; margin: 6PX; padding: 0; } .table_space { margin-left: 14px; } .size{ margin-left: 67px; /* margin: 6px; */ /* padding: 0; */ } .spacing { margin: 10px 0; } .checkbox-spacing { margin-right: 10px; } .space { color: black; float: right; margin-top: -1vw; margin-right: 10vw; } p-button.p-element, .print_btn { float: right; position: fixed; right: 30px; bottom: 15px; } table, tr, td, th{text-align: start;width: 90%;} th { border: 1px solid #b1b1b1;} .color{ color: black; display: flex; justify-content: space-evenly; } .span_space{margin-left: 19px;} </style>'
    // );

    this.WindowObject.document.writeln('@media print { .center { text-align: center;}' +
      'body{font-family:Arial, Tahoma, Verdana;font-size: 14px;color: #6f7479;}' +
      '.wrapper{box-shadow: none !important; max-width: 1100px; width: 100%; margin: 0 auto; font-family:Arial, Tahoma, Verdana;}' +
      '.contant-wraper{box-shadow: none !important;}'+
      // '.table_print_outer {border:red solid 2px;}' +
      // '.table_print_outer table thead tr th{background:#000 !important; color:#fff; margin: 0 !important; padding:7px 3px; border: none;}' +
      // '.table_print_outer table thead{text-align: left; background:#000 !important;}' +
      '.table_print_outer table tbody tr{margin: 0 !important;}'+
      '.table_print_outer table tbody tr th{text-align: left; text-wrap: wrap; color:#333; padding:7px 3px; word-break: break-word; border: #ccc solid 1px; margin: 0 !important;}' +
      '.table_print_outer table tbody tr{border-bottom:#333 solid 1px;}' +
      
      
      '.print_top_head h3{margin: 0; padding: 0; font-size:20px; color:#000;}' +
      '.print_top_head h4{margin: 0; padding: 0; font-size:16px; color:#000;}' +
      '.print_top_Title h4{margin: 0; padding: 0; font-size:16px; color:#000;}' +
      '.msg_adress{width:120px;}'+
      '.table_head_cus tr td{background: #D9D9D9;}' +
              '} </style>');


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
