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
  form_dt: string,
  policy_holder_type: string,
  fin_yr: string,
  premium_type: string,
  premium_amt: string
}

interface SpouseDepenInfo {
  sl_no: string,
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
    // console.log(this.member_id,'ooo');
    
    this.form_no = atob(decodeURIComponent(encodedFormNo));
    // this.getMemberInfo();
    this.getGenInsInfo();
    this.getSpouseInfo();
  }

  getMemberInfo(memb_id:any) {
    this.dataServe
      .global_service(0, '/get_member_policy_print_super', `member_id=${memb_id}&&form_no=${this.form_no}`)
      .subscribe((data: any) => {
        this.responsedata = data;
        console.log(this.responsedata, '666');
        this.responsedata =  this.responsedata &&
          this.responsedata.suc > 0
            ? this.responsedata.msg.length > 0
              ? this.responsedata.msg[0]
              : {}
            : {};
        this.stpinfo = this.responsedata;
        console.log(this.stpinfo,'stpinfo');
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

    // this.WindowObject.document.writeln(
    //   '@media print { .table_space { margin-left: 14px; } .letter{ margin-left: 19px; margin: 6PX; padding: 0; } .letter_style{ margin-left: 22px; margin: 17PX; padding: 0; } p-button.p-element, .print_btn { /* align-items: center;  */ /* position: fixed; */ /* right: 30px; */ bottom: 15px; /* margin-left: 30vw; */ } </style>'
    // );
    this.WindowObject.document.writeln('@media print { .center { text-align: center;}' +
      'body{font-family:Arial, Tahoma, Verdana;font-size: 14px;color:rgb(34, 123, 211);}' +'.wrapper{box-shadow: none !important; max-width: 1100px; width: 100%; margin: 0 auto; font-family:Arial, Tahoma, Verdana;}' +'.contant-wraper{box-shadow: none !important;}'+
      '.table_head_cus tr td{background: #D9D9D9;}' +'tr.table_head_cus td{background: #333; color:#fff; text-align: left; font-size: 14px;}' +
      'tr.table_head_cus th{background: #333; color:#fff; text-align: left; font-size: 14px;}'+
      '.print_Section table tbody tr td{border-bottom:#ccc solid 1px; padding:10px;text-align: left;}' +'.print_Section table tbody tr th{border-bottom:#ccc solid 1px; padding:10px;text-align: left;}' +
      '.print_Section{color: #000;}' +'.print_Section h4{font-size: 16px; color: #000; margin: 0 0 15px 0; padding: 0;}' +
      '.print_Section p{font-size: 16px; line-height: 20px; color: #000; font-size: 14px; line-height: 23px; margin: 0 0 25px 0; padding: 0;}' +
      '.print_Section p span.perple{color: rgb(55, 55, 230);}' +
       '.print_Section h3{font-size: 20px; color: #000; margin: 0 0 15px 0; padding: 0; font-weight: 700;}' +
      '.print_Section table{margin: 0 !important; width: 100% !important;}' +'.print_Section ul.print_ul{list-style-type: none; padding:0; margin:0;}' +
      '.print_Section ul.print_ul li{font-size: 16px; color: #000; margin: 0 0 6px 0; padding: 0;}' +'.print_Section ul.print_ul li .li_Span{color: rgb(55, 55, 230); font-weight: 700;}' +
      '.print_Section table.table_space_cus td span{color: rgb(55, 55, 230); font-weight: 700;}' +
      '.print_Section table.table_space_cus td.table_td_70{width: 70%;}' +'.print_Section table.table_space_cus td.table_td_30{width: 30%;}' +
      '.print_Section table.table_space_cus td.table_td_5{width:5%;}' +
      '.print_Section table.table_space_cus td.table_td_55{width:50%;}' +
      '.print_Section table.table_space_cus td.table_td_20{width:20%;}' +
      '.print_Section table.table_space_cus td{font-size: 14px;}' +
      '.print_Section table.table_space_cus th{font-size: 14px;}'+
      '.textAlign_left{text-align: left;}'+
      '.textAlign_right{text-align: right;}'+
      '.print_Section table.table_space_cus td.no_pading{padding: 0;}' +
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

// downloadFile(data: Blob, filename: string) {
//   const blob = new Blob([data], { type: 'application/pdf' });  // explicitly set type
//   const url = window.URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = filename;
//   a.click();
//   window.URL.revokeObjectURL(url);
// }


// downloadReport() {
//   const form_no = this.form_no;
//   const query = `form_no=${form_no}`;
//   this.dataServe.global_service(0, '/download_super_mediclaim_pdf', query, { responseType: 'blob' }).subscribe(
//     (response: any) => {
//       this.downloadFile(response, `STP_${this.form_no}.pdf`);
//     },
//     (error) => {
//       console.error('Download error', error);
//     }
//   );
// }


}
