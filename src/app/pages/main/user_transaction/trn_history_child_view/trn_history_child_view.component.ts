import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

interface TrnData{

}

@Component({
  selector: 'app-trn_history_child_view',
  templateUrl: './trn_history_child_view.component.html',
  styleUrls: ['./trn_history_child_view.component.css']
})
export class Trn_history_child_viewComponent implements OnInit {
  trn_id:any
  member_id:any
  tranResData: any;
  trnData: TrnData | any;
  divToPrint: any;
  WindowObject: any;

  constructor(private route: ActivatedRoute, private dataServe: DataService) { }

  ngOnInit() {
    this.trn_id = this.route.snapshot.params['trn_id'];
    this.member_id = localStorage.getItem('member_id')
    this.getTransDetails(this.member_id, this.trn_id)
  }

   getTransDetails(member_id:any, trn_id:any){
    this.dataServe.global_service(1, '/fetch_view_trans_dtls', {member_id,trn_id,}).subscribe((data: any) => {
        this.tranResData = data;
        this.tranResData = this.tranResData.suc > 0 ? this.tranResData.msg : [];
        this.trnData = this.tranResData.length > 0 ? this.tranResData[0] : {};
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
