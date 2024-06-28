import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-show_transaction_report',
  templateUrl: './show_transaction_report.component.html',
  styleUrls: ['./show_transaction_report.component.css'],
  providers: [DatePipe],
})
export class Show_transaction_reportComponent implements OnInit {
  mem_type: any;
  WindowObject: any;
  divToPrint: any;
  userData: any = [];
  from_dt: any;
  to_dt: any;
  member_type: any;
  totalAdmissionFee = 0;
  totalDonationnFee = 0;
  totalSumamount = 0;
  totalOnetimeamount = 0;
  totalCalAmount = 0;
  total: number = 0;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataServe: DataService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    const encodedFormNo = this.route.snapshot.params['form_no'];
    // this.form_no = ato b(decodeURIComponent(encodedFormNo));
    this.member_type = this.route.snapshot.params['member_type'];
    this.from_dt = this.route.snapshot.params['from_dt'];
    this.to_dt = this.route.snapshot.params['to_dt'];
    this.show_data();
    // this.calculateTotalAdmissionFee();
  }

  calculateTotalAmount(customer: any): number {
    return customer.adm_fee + customer.donation + customer.sub_amt + customer.onetime_amt;
  }

  

  // You can call this method whenever your data changes or on initialization
  // updateTotalAdmissionFee(): void {
  //   this.totalAdmissionFee = this.calculateTotalAdmissionFee();
  // }

  show_data(){
    this.dataServe.global_service(0,'/member_trans_report',`from_dt=${this.from_dt}&to_dt=${this.to_dt}`).subscribe(data => {
      console.log(data,'kiki')
      this.userData = data;
      this.userData = this.userData.msg;
      for (let customer of this.userData) {
      this.totalAdmissionFee += (+customer.adm_fee);
      }
      for (let customer of this.userData) {
      this.totalDonationnFee += (+customer.donation);
      }
      for (let customer of this.userData) {
      this.totalSumamount += (+customer.sub_amt);
      }
      for (let customer of this.userData) {
      this.totalOnetimeamount += (+customer.onetime_amt);
      }
      for (let customer of this.userData) {
      this.totalCalAmount += parseInt(customer.adm_fee+customer.donation+customer.sub_amt+customer.onetime_amt);
      }
      console.log(this.userData,'lili');
    },error => {
      console.error(error);
    })
  }

  // calculateTotalAdmissionFee(): void {
  //   console.log('hfhfhf',this.userData)
  //   for (let customer of this.userData) {
  //     this.totalAdmissionFee += (+customer.adm_fee);
  //     console.log(this.totalAdmissionFee,+customer.adm_fee,'pppp');
  //      // Assuming adm_fee is a string representation of number
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

    // this.WindowObject.document.writeln(
    //   '@media print {.wraper { margin-left: 10px !important; margin-right: 10px !important; } .contant-wraper { border-top: 2px solid #32678d; background-color: white; margin-bottom: 100px; overflow: auto; }</style>'
    // );

    this.WindowObject.document.writeln('@media print { .center { text-align: center;}' +
      'body{font-family:Arial, Tahoma, Verdana;font-size: 14px;color: #6f7479;}' +
      '.wrapper{box-shadow: none !important; max-width: 1100px; width: 100%; margin: 0 auto; font-family:Arial, Tahoma, Verdana;}' +
      '.contant-wraper{box-shadow: none !important;}'+
      // '.table_print_outer {border:red solid 2px;}' +
      '.table_print_outer table thead tr th{background:#000 !important; color:#fff; margin: 0 !important; padding:7px 3px; border: none;}' +
      '.table_print_outer table thead{text-align: left; background:#000 !important;}' +
      '.table_print_outer table tbody tr td{text-align: left; text-wrap: wrap; color:#333; padding:7px 3px; word-break: break-word; border: none; margin: 0 !important;}' +
      '.table_print_outer table tbody tr{border-bottom:#333 solid 1px;}' +
      '.print_top_head h2{margin: 0; padding: 0; font-size:20px; color:#000;}' +
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
