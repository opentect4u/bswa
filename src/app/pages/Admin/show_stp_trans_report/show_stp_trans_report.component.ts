import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-show_stp_trans_report',
  templateUrl: './show_stp_trans_report.component.html',
  styleUrls: ['./show_stp_trans_report.component.css'],
  providers: [DatePipe],
})
export class Show_stp_trans_reportComponent implements OnInit {
  mem_type: any;
  WindowObject: any;
  divToPrint: any;
  userData: any = [];
  from_dt: any;
  to_dt: any;
  memb_oprn: any;  
  totalCalAmount = 0;
  totalPremAmount = 0;
  hasSpouseData : boolean = false;
   @ViewChild('dt2') dt2: any;
  hasSpouseDataInVisibleRows: boolean = false;
  // showSpouseColumns: boolean = false;


  constructor(private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataServe: DataService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.from_dt = this.route.snapshot.params['from_dt'];
  this.to_dt = this.route.snapshot.params['to_dt'];
  this.memb_oprn = this.route.snapshot.params['memb_oprn'];

  console.log('Params:', this.from_dt, this.to_dt, this.memb_oprn);
    
    this.show_stp_trans_data()
  }
  checkSpouseDataInVisibleRows(): void {
    const data = this.dt2?.filteredValue ?? this.userData;
    this.hasSpouseDataInVisibleRows = data.some(
      (item: any) => item.memb_oprn === 'D' || item.memb_oprn === 'A'
    );
  }

    show_stp_trans_data(){
    this.dataServe.global_service(0,'/member_stp_trans_report',`from_dt=${this.from_dt}&to_dt=${this.to_dt}&memb_oprn=${this.memb_oprn}`).subscribe(data => {
      console.log(data,'kiki')
      this.userData = data;
      this.userData = this.userData.msg;
      this.totalPremAmount = 0;
      this.totalCalAmount = 0;
      this.hasSpouseData = false;

       for (let customer of this.userData) {
      this.totalPremAmount += (+customer.premium_amt);
      this.totalCalAmount += (+customer.premium_amt);

      if (customer.memb_oprn === 'D') {
      this.hasSpouseData = true;
     }
      }
      console.log(this.userData,'lili');
       setTimeout(() => {
      this.checkSpouseDataInVisibleRows();
    }, 0);
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
  
  
    download(){
      const dataWithSlNo = this.userData.map((customer: {trn_id: any; trn_dt: string; min_no: string; memb_name: any; dob: any; donation: any; spou_min_no: any; dependent_name: any; spou_dob: any; pay_mode: any; premium_amt: any; tot_amt: any; memb_oprn: string;}, index: number) => {
        const baseData: any = {
          'SL No': index + 1,
          'Transaction ID' : customer.trn_id ? customer.trn_id : 'N/A',
          'Transaction Date' : customer.trn_dt ? new Date(customer.trn_dt).toISOString().split('T')[0] : 'N/A',
          'MIN No': customer.min_no ? customer.min_no : 'N/A',
          'Member Name': customer.memb_name ? customer.memb_name : 'N/A',
          'Member Dob': customer.dob ? new Date(customer.dob).toISOString().split('T')[0] : 'N/A',
          // 'Spouse MIN No': customer.spou_min_no,
          // 'Spouse Name': customer.dependent_name,
          // 'Spouse Dob': customer.spou_dob,
          'Premium Amount': customer.premium_amt ? customer.premium_amt : '0',
          'Total Amount' : customer.tot_amt ? customer.tot_amt : '0',
          'Pay Mode': customer.pay_mode=='O' ? 'Online' : 'N/A',
        };
        baseData['Spouse MIN No'] = 'N/A';
        baseData['Spouse Name'] = 'N/A';
        baseData['Spouse Dob'] = 'N/A';
        if (customer.memb_oprn === 'D' || customer.memb_oprn === 'A') {
        baseData['Spouse MIN No'] = customer.spou_min_no ? customer.spou_min_no : 'NULL';
        baseData['Spouse Name'] = customer.dependent_name ? customer.dependent_name : 'NULL';
        baseData['Spouse Dob'] = customer.spou_dob ? new Date(customer.spou_dob).toISOString().split('T')[0] : 'N/A';
      }
      return baseData;
      }); 

       // 🔍 Determine file name based on member operation
  const hasSingle = this.userData?.some((item: any) => item.memb_oprn === 'S');
  const hasDouble = this.userData?.some((item: any) => item.memb_oprn === 'D' || item.memb_oprn === 'A');

  let fileName = 'STP Member Transaction List';
  if (hasSingle && hasDouble) {
    fileName = 'STP Member Transaction List - Single & Double';
  } else if (hasSingle) {
    fileName = 'STP Member Transaction List - Single';
  } else if (hasDouble) {
    fileName = 'STP Member Transaction List - Double';
  }
      const ws = XLSX.utils.json_to_sheet(dataWithSlNo);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb,ws, 'TransactionData');
  
  
      XLSX.writeFile(wb, `${fileName}.xlsx`)
    }

}
