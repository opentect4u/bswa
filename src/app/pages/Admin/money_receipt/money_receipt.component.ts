import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

interface TrnData{

}

@Component({
  selector: 'app-money_receipt',
  templateUrl: './money_receipt.component.html',
  styleUrls: ['./money_receipt.component.css'],
  providers: [DatePipe],
})
export class Money_receiptComponent implements OnInit {
  @Input() form!: FormGroup;
  trn_id:any
  form_no:any
  trnResData: any;
  trnData: TrnData | any;
  payMode:any = {'C': 'Cash', 'Q': 'Cheque', 'O': 'Online'}
  chqBank:any = {'74': 'Cash at BSE(Cal) Co op Cr Soc Ltd', '75': 'Cash at UCO Bank (A/c No.)'}
  WindowObject: any;
  divToPrint: any;
  member_id: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataServe: DataService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.member_id = this.route.snapshot.params['member_id']
    this.trn_id = this.route.snapshot.params['trn_id']
    this.getTransactionDetails(this.member_id, this.trn_id)
  }

  getTransactionDetails(member_id:any, trn_id:any){
    this.dataServe.global_service(1, '/user_money_receipt',{member_id, trn_id})
          .subscribe((data: any) => {
            this.trnResData = data;
            this.trnResData = this.trnResData.suc > 0 ? this.trnResData.msg : [];
            this.trnData = this.trnResData.length > 0 ? this.trnResData[0] : {}
            console.log(this.trnData,'trn_data');
            
          });
  }

  // printDiv() {
  //   this.divToPrint = document.getElementById('divToPrint');

  //   this.WindowObject = window.open('', 'Print-Window');
  //   this.WindowObject.document.open();
  //   this.WindowObject.document.writeln('<!DOCTYPE html>');
  //   this.WindowObject.document.writeln(
  //     '<html><head><title></title><style type="text/css">'
  //   );

  //   // this.WindowObject.document.writeln(
  //   //   '@media print {.wraper { margin-left: 10px !important; margin-right: 10px !important; } .contant-wraper { border-top: 2px solid #32678d; background-color: white; margin-bottom: 100px; overflow: auto; }</style>'
  //   // );

  //   this.WindowObject.document.writeln('@media print { .center { text-align: center;}' +
  //     'body{font-family:Arial, Tahoma, Verdana;font-size: 14px;color: #6f7479;}' +
  //     '.wrapper{box-shadow: none !important; max-width: 1100px; width: 100%; margin: 0 auto; font-family:Arial, Tahoma, Verdana;}' +
  //     '.contant-wraper{box-shadow: none !important;}'+
  //     // '.table_print_outer {border:red solid 2px;}' +
  //     '.table_print_outer table thead tr th{background:#000 !important; color:#fff; margin: 0 !important; padding:7px 3px; border: none;}' +
  //     '.table_print_outer table thead{text-align: left; background:#000 !important;}' +
  //     '.table_print_outer table tbody tr td{text-align: left; text-wrap: wrap; color:#333; padding:7px 3px; word-break: break-word; border: none; margin: 0 !important;}' +
  //     '.table_print_outer table tbody tr{border-bottom:#333 solid 1px;}' +
  //     '.print_top_head h2{margin: 0; padding: 0; font-size:20px; color:#000;}' +
  //     '.print_top_head h4{margin: 0; padding: 0; font-size:16px; color:#000;}' +
  //     '.print_top_Title h4{margin: 0; padding: 0; font-size:16px; color:#000;}' +
  //     '.msg_adress{width:120px;}'+
  //     '.table_head_cus tr td{background: #D9D9D9;}' +
  //             '} </style>');


  //   this.WindowObject.document.writeln(
  //     '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">'
  //   );
  //   this.WindowObject.document.writeln(
  //     '<link rel="stylesheet" href="/plugins/fontawesome-free/css/all.min.css">'
  //   );
  //   this.WindowObject.document.writeln(
  //     '<link rel="stylesheet" href="/css/adminlte.min.css">'
  //   );
  //   this.WindowObject.document.writeln('</head><body onload="window.print()">');
  //   this.WindowObject.document.writeln(this.divToPrint.innerHTML);
  //   this.WindowObject.document.writeln('</body></html>');
  //   this.WindowObject.document.close();
  //   setTimeout(() => {
  //     this.WindowObject.close();
  //   }, 1000);
  // }

  printDiv(): void {
  const printContents = document.getElementById('divToPrint')?.innerHTML;
  const styles = `
    <style>
      body {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 2rem;
        background: linear-gradient(135deg, #e3f2fd, #ffffff);
        color: #333;
      }
      .receipt-header h4 {
        margin: 0.2rem 0;
        font-weight: 600;
        text-align: center;
        color: #0d47a1;
      }
      .receipt-section {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        margin-top: 2rem;
      }
      .receipt-column {
        flex: 1 1 45%;
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
      }
      .receipt-row {
        display: flex;
        justify-content: space-between;
      }
      .receipt-label {
        font-weight: 500;
        color: #1a237e;
        flex: 1;
      }
      .receipt-separator {
        flex: 0.05;
        text-align: center;
      }
      .receipt-value {
        flex: 2;
      }
      img {
        max-width: 120px;
        border-radius: 8px;
      }
      .color {
        color: #d6336c;
      }
    </style>
  `;

  const printWindow = window.open('', '_blank', 'width=900,height=700');
  if (printWindow && printContents) {
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Receipt</title>
          ${styles}
        </head>
        <body onload="window.print(); window.close();">
          <div id="divToPrint">${printContents}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}


}
