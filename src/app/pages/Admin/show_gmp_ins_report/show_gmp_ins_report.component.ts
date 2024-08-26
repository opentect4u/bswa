import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-show_gmp_ins_report',
  templateUrl: './show_gmp_ins_report.component.html',
  styleUrls: ['./show_gmp_ins_report.component.css'],
  providers: [DatePipe],
})
export class Show_gmp_ins_reportComponent implements OnInit {
  mem_type: any;
  WindowObject: any;
  divToPrint: any;
  userData: any = [];
  from_dt: any;
  to_dt: any;
  member_type: any;
  status: any

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataServe: DataService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    const encodedFormNo = this.route.snapshot.params['form_no'];
    this.member_type = this.route.snapshot.params['member_type'];
    this.from_dt = this.route.snapshot.params['from_dt'];
    this.to_dt = this.route.snapshot.params['to_dt'];
    this.status = this.route.snapshot.params['status'];
    this.show_data();
  }

  show_data(){
    this.dataServe.global_service(0,'/gmp_status_report',`from_dt=${this.from_dt}&to_dt=${this.to_dt}&status=${this.status}`).subscribe(data => {
      console.log(data,'kiki')
      this.userData = data;
      this.userData = this.userData.msg;
      console.log(this.userData,'lili');
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
    const dataWithSlNo = this.userData.map((customer: { form_no: any; member_id: any; memb_type: string; memb_name: any; phone: any; father_husband_name: any; dob: string | number | Date; }, index: number) => {
      return {
        'SL No': index + 1,
        'Form No': customer.form_no,
        'Member ID': customer.member_id,
        'Member Type': customer.memb_type == 'G' ? 'General Membership' : customer.memb_type == 'L' ? 'Life Membership' : customer.memb_type == 'AI' ? 'Associate Membership' : '',
        'Member Name': customer.memb_name,
        'Phone': customer.phone,
        'Guardian Name': customer.father_husband_name,
        'DOB': this.datePipe.transform(customer.dob, 'dd/MM/yyyy')
        // Add or remove columns as needed
      };
    }); 
    const ws = XLSX.utils.json_to_sheet(dataWithSlNo);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws, 'placeholder');


    XLSX.writeFile(wb, 'GMP Insurance List.xlsx')
  }

}
