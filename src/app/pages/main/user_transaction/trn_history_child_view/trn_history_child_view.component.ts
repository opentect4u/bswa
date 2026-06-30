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

    this.WindowObject.document.writeln('@media print { .center { text-align: center;}' +
      'body{font-family:Arial, Tahoma, Verdana;font-size: 14px;color: #333;}' +
      '.print_btn { display: none !important; }' +
      '.wrapper{box-shadow: none !important; max-width: 1100px; width: 100%; margin: 0 auto; font-family:Arial, Tahoma, Verdana;}' +
      '.contant-wraper{box-shadow: none !important;}'+
      '.details-table {width: 100%; border-collapse: collapse; margin-top: 20px;}' +
      '.details-table th, .details-table td {padding: 10px 5px; font-size: 14px; text-align: left; border-bottom: 1px solid #eee;}' +
      '.details-table th {font-weight: 600; color: #000; width: 25%;}' +
      '.ceperate {width: 5%;}' +
      '.print_top_head {text-align: center; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px;}' +
      '.print_top_head h2{margin: 0; padding: 0; font-size:22px; font-weight: bold; color:#000;}' +
      '.print_top_head h4{margin: 5px 0 0 0; padding: 0; font-size:16px; color:#333;}' +
      '.msg_adress{width:120px;} .text-left{text-align: left;} .text-center{text-align: center;} .mt-3{margin-top: 1rem;} .break{height:30px;}'+
      '.table_head_cus tr td{background: #D9D9D9;}' +
              '} </style>');

    this.WindowObject.document.writeln('<style> .print_btn { display: none !important; } </style>');

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
