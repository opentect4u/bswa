import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-show_stp_member_report',
  templateUrl: './show_stp_member_report.component.html',
  styleUrls: ['./show_stp_member_report.component.css'],
  providers: [DatePipe],
})
export class Show_stp_member_reportComponent implements OnInit {
   mem_type: any;
  WindowObject: any;
  divToPrint: any;
  userData: any = [];
  memb_oprn: any;
  from_dt: any;
  to_dt: any;


  constructor(   private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataServe: DataService,
    private datePipe: DatePipe) { }

  ngOnInit() {
     const encodedFormNo = this.route.snapshot.params['form_no'];
    this.memb_oprn = this.route.snapshot.params['memb_oprn'];
    this.from_dt = this.route.snapshot.params['from_dt'];
    this.to_dt = this.route.snapshot.params['to_dt'];
    // console.log( this.memb_oprn, this.from_dt, this.to_dt);
    
    this.show_data();
  }

    show_data(){
      this.dataServe.global_service(0,'/stp_member_register_report',`from_dt=${encodeURIComponent(this.from_dt)}&to_dt=${encodeURIComponent(this.to_dt)}&memb_oprn=${this.memb_oprn}`).subscribe(data => {
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
      const dataWithSlNo = this.userData.map((customer: { form_no: any; form_dt: any; policy_holder_type:any;unit_name: any; member_id: string;  memb_type: any; memb_oprn: any; memb_name: any; gender: any; dob: any;min_no: any; mem_address: any; phone_no: any; personel_no: any; dependent_name: any; spou_min_no: any; spou_dob: any; spou_phone: any; spou_gender: any; spou_address: any; premium_type: any}, index: number) => {
        return {
          'SL No': index + 1,
          'Form No' : customer.form_no ? customer.form_no : 'N/A',
          // 'Form Date' : customer.form_dt,
          'Form Date' : new Date(customer.form_dt).toISOString().split('T')[0],
          'Policy Holder Type' : customer.policy_holder_type ? customer.policy_holder_type : 'N/A',
          'Member ID': customer.member_id ? customer.member_id : 'N/A',
          'Unit Name': customer.unit_name ? customer.unit_name : 'N/A',
          'Member Type': customer.memb_type == 'G' ? 'General Membership' : customer.memb_type == 'L' ? 'Life Membership' : 'N/A',
          'Member Operation': customer.memb_oprn == 'S' ? 'Single' : customer.memb_oprn == 'D' ? 'Double' : 'N/A',
          'Member Name': customer.memb_name ? customer.memb_name : 'N/A',
          'Gender': customer.gender == 'F' ? 'Female' : customer.gender == 'M' ? 'Male' : 'N/A',
          'DOB' : new Date(customer.dob).toISOString().split('T')[0],
          'Member Address': customer.mem_address ? customer.mem_address : 'N/A',
          'Phone No': customer.phone_no ? customer.phone_no : 'N/A',
          'MIN No': customer.min_no ? customer.min_no : 'N/A',
          'Personel No': customer.personel_no ? customer.personel_no : 'N/A',
          'Spouse Name': customer.dependent_name ? customer.dependent_name : 'N/A',
          'Spouse MIN No': customer.spou_min_no ? customer.spou_min_no : 'N/A',
          'Spouse Dob': new Date(customer.spou_dob).toISOString().split('T')[0],
          'Spouse Phone No': customer.spou_phone ? customer.spou_phone : 'N/A',
          'Spouse Gender': customer.spou_gender ? customer.spou_gender : 'N/A',
          'Spouse Address': customer.spou_address ? customer.spou_address : 'N/A',
          'Premium Type': customer.premium_type == 'S' ? 'Single' : customer.premium_type == 'D' ? 'Double' : 'N/A',
          // Add or remove columns as needed
        };
      }); 
      const ws = XLSX.utils.json_to_sheet(dataWithSlNo);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb,ws, 'placeholder');
  
  
      XLSX.writeFile(wb, 'STP Member Register List.xlsx')
    }

}
