import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

interface TrnData{

}

@Component({
  selector: 'app-trn-history-view',
  templateUrl: './trn-history-view.component.html',
  styleUrls: ['./trn-history-view.component.css']
})

export class TrnHistoryViewComponent implements OnInit {
  trn_id:any
  form_no:any
  trnResData: any;
  trnData: TrnData | any;
  payMode:any = {'C': 'Cash', 'Q': 'Cheque', 'O': 'Online'}
  divToPrint: any;
  WindowObject: any;

  constructor(private route: ActivatedRoute, private dataServe: DataService) { }

  ngOnInit() {
    this.trn_id = this.route.snapshot.params['trn_id'];
    this.form_no = localStorage.getItem('form_no')
    this.getTransactionDetails(this.form_no, this.trn_id)
  }

  getTransactionDetails(form_no:any, trn_id:any){
    const sanitizedFormNo = form_no?.replace(/^'+|'+$/g, ''); 
    this.dataServe
      .global_service(1, '/user_tnx_details', {
        form_no,
        trn_id,
        // form_no: sanitizedFormNo || '', 
        // trn_id: trn_id || 0
      })
      .subscribe((data: any) => {
        this.trnResData = data;
        this.trnResData = this.trnResData.suc > 0 ? this.trnResData.msg : [];
        this.trnData = this.trnResData.length > 0 ? this.trnResData[0] : {};
      });
      // .subscribe((data: any) => {
      //   console.log("API response:", data); 
      //   if (data?.suc > 0 && Array.isArray(data.msg)) {
      //     this.trnResData = data.msg;
      //     this.trnData = this.trnResData.length > 0 ? this.trnResData[0] : {};
      //   } else {
      //     this.trnResData = [];
      //     this.trnData = {};
      //   }
      // });
  }

  // getTransactionDetails(form_no: any, trn_id: any) {
  //   const sanitizedFormNo = form_no?.replace(/^'+|'+$/g, '');  // Remove quotes
  //   console.log("Sanitized form_no:", sanitizedFormNo);
  //   this.dataServe
  //     .global_service(1, '/user_tnx_details', {
  //       form_no: sanitizedFormNo || '', 
  //       trn_id: trn_id || 0
  //     })
  //     .subscribe((data: any) => {
  //       console.log("Response from API:", data);  // Log response to check data
  //       if (data?.suc > 0 && Array.isArray(data.msg)) {
  //         this.trnResData = data.msg;
  //         this.trnData = this.trnResData.length > 0 ? this.trnResData[0] : {};
  //       } else {
  //         this.trnResData = [];
  //         this.trnData = {};
  //       }
  //     });
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
      '.msg_adress{width:120px;} .text-left{text-align: left;} .text-center{text-align: center;} .mt-3{margin-top: 1rem;} .break{height:30px;}'+
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
