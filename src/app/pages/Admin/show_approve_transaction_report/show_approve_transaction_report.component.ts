import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-show_approve_transaction_report',
  templateUrl: './show_approve_transaction_report.component.html',
  styleUrls: ['./show_approve_transaction_report.component.css'],
  providers: [DatePipe],
})
export class Show_approve_transaction_reportComponent implements OnInit {
  mem_type: any;
  WindowObject: any;
  divToPrint: any;
  userData: any = [];
  member_id: any;
  from_dt: any;
  to_dt: any;
  total = 0

  constructor(private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataServe: DataService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    const encodedFormNo = this.route.snapshot.params['form_no'];
    // this.form_no = ato b(decodeURIComponent(encodedFormNo));
    this.member_id = this.route.snapshot.params['member_id'];
    this.from_dt = this.route.snapshot.params['from_dt'];
    this.to_dt = this.route.snapshot.params['to_dt'];
    this.show_data();
  }

  show_data(){
    this.dataServe.global_service(0,'/get_pg_approve_dtls',`from_dt=${this.from_dt}&to_dt=${this.to_dt}&member_id=${this.member_id}`).subscribe(data => {
      console.log(data,'kiki')
      this.userData = data;
      this.userData = this.userData.msg;
      console.log(this.userData,'ppooo');
    },error => {
      console.error(error);
    })
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
    //   '@media print {.wraper { margin-left: 10px !important; margin-right: 10px !important; border:red solid 1px; } .contant-wraper { border-top: 2px solid #32678d; background-color: white; margin-bottom: 100px; overflow: auto; }</style>'
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

  download(){
    const dataWithSlNo = this.userData.map((customer: { entry_dt: string | number | Date; udf4: any; udf3: any; pay_trans_id: any; mid: any;
      trns_amt: any; trns_status: any; mer_order_no: any; udf1: string; udf5: any; udf7: any; udf9: any; cust_ref_no: any;
      pay_mode: any; txnDate: string | number | Date; surcharge: any; totalAmount: any; txnNote: any
    }, index: number) => {
      return {
      'SL No' : index+1,
      'Entry Date' : this.datePipe.transform(customer.entry_dt, 'dd/MM/yyyy'),
      'Member ID' : customer.udf4,
      'Member Name' : customer.udf3,
      'Pay transaction ID' : customer.pay_trans_id,
      'MID' : customer.mid,
      'Transaction Amount' : customer.trns_amt,
      'Transaction Status' : customer.trns_status,
      'Order No' : customer.mer_order_no,
      'Phone No' : customer.udf1,
      'Approval Status' : customer.udf5 == 'A' ? 'Approve' : 'N/A',
      'Subscription upto' : this.datePipe.transform(customer.udf7, 'dd/MM/yyyy'),
       'Amount' : customer.udf9,
      'Customer Refference No' : customer.cust_ref_no == '' ? 'N/A' : 'customer.cust_ref_no',
      'Pay Mode' : customer.pay_mode,
      'Transaction Date' : this.datePipe.transform(customer.txnDate, 'dd/MM/yyyy'),
      'Service Charge' : customer.surcharge,
      'Total Amount' : customer.totalAmount,
      'Remarks' : customer.txnNote
      };
    }); 
    const ws = XLSX.utils.json_to_sheet(dataWithSlNo);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws, 'placeholder');


    XLSX.writeFile(wb, 'PG Approved Transaction List.xlsx')
  }

}
