import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-show_memlist_report',
  templateUrl: './show_memlist_report.component.html',
  styleUrls: ['./show_memlist_report.component.css'],
  providers: [DatePipe],
})
export class Show_memlist_reportComponent implements OnInit {
  mem_type: any;
  WindowObject: any;
  divToPrint: any;
  userData: any = [];
  member_type: any;
  period: any;

  totalRecords: number = 0;
  loading: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataServe: DataService,
    private datePipe: DatePipe,
    private location: Location
  ) { }

  ngOnInit() {
    const encodedFormNo = this.route.snapshot.params['form_no'];
    this.member_type = this.route.snapshot.params['member_type'];
    this.period = this.route.snapshot.params['period'];
  }

  loadData(event: any) {
    this.loading = true;
    const page = (event.first / event.rows) + 1;
    const limit = event.rows;
    
    this.dataServe.global_service(0,'/member_list_report',`period=${encodeURIComponent(this.period)}&member_type=${this.member_type}&page=${page}&limit=${limit}`).subscribe((data: any) => {
      this.userData = data.msg;
      this.totalRecords = data.totalRecords || 0;
      this.loading = false;
    }, error => {
      console.error(error);
      this.loading = false;
    });
  }

  formatAddress(memb_address: string, ps: string, city_town_dist: string, pin_no: string): string {
    return [memb_address, ps, city_town_dist, pin_no].filter(part => part).join(', ');
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
      'body{font-family:Arial, Tahoma, Verdana;font-size: 14px;color: #6f7479;}' +
      '.wrapper{box-shadow: none !important; max-width: 1100px; width: 100%; margin: 0 auto; font-family:Arial, Tahoma, Verdana;}' +
      '.contant-wraper{box-shadow: none !important;}'+
      '.table_print_outer table { width: 100%; border-collapse: collapse; }' +
      '.table_print_outer table thead tr th{background:#000 !important; color:#fff; margin: 0 !important; padding:7px 3px; border: 1px solid #333; text-align: center;}' +
      '.table_print_outer table tbody tr td{text-align: center; text-wrap: wrap; color:#333; padding:7px 3px; word-break: break-word; border: 1px solid #333; margin: 0 !important;}' +
      '.p-paginator { display: none !important; }' +
      '.p-datatable-wrapper { overflow: visible !important; }' +
      '.print_top_head h2{margin: 0; padding: 0; font-size:20px; color:#000 !important;}' +
      '.print_top_head h4{margin: 0; padding: 0; font-size:16px; color:#000 !important;}' +
      '.print_top_Title h4{margin: 0; padding: 0; font-size:16px; color:#000 !important;}' +
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
    const dataWithSlNo = this.userData.map((customer: { unit_name: any; member_id: string;  memb_name: any; min_no: any; memb_address: any; ps:any; city_town_dist: any; pin_no: any; phone_no: any; email_id: any}, index: number) => {
      return {
        'SL No': index + 1,
        'Unit Name': customer.unit_name,
        'Member ID': customer.member_id,
        'Member Name': customer.memb_name,
        'MIN No': customer.min_no,
        'Address': this.formatAddress(customer.memb_address, customer.ps, customer.city_town_dist, customer.pin_no),
        'Phone No': customer.phone_no,
        'Email ID': customer.email_id
      };
    }); 
    const ws = XLSX.utils.json_to_sheet(dataWithSlNo);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws, 'placeholder');


    XLSX.writeFile(wb, 'Member Register List.xlsx')
  }

  downloadAllData(){
    this.loading = true;
    const page = 1;
    const limit = this.totalRecords > 0 ? this.totalRecords : 100000;
    
    this.dataServe.global_service(0,'/member_list_report',`period=${encodeURIComponent(this.period)}&member_type=${this.member_type}&page=${page}&limit=${limit}`).subscribe((data: any) => {
      const allData = data.msg || [];
      const dataWithSlNo = allData.map((customer: { unit_name: any; member_id: string;  memb_name: any; min_no: any; memb_address: any; ps:any; city_town_dist: any; pin_no: any; phone_no: any; email_id: any}, index: number) => {
        return {
          'SL No': index + 1,
          'Unit Name': customer.unit_name,
          'Member ID': customer.member_id,
          'Member Name': customer.memb_name,
          'MIN No': customer.min_no,
          'Address': this.formatAddress(customer.memb_address, customer.ps, customer.city_town_dist, customer.pin_no),
          'Phone No': customer.phone_no,
          'Email ID': customer.email_id
        };
      }); 
      const ws = XLSX.utils.json_to_sheet(dataWithSlNo);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb,ws, 'placeholder');

      XLSX.writeFile(wb, 'Member Register All Data.xlsx');
      this.loading = false;
    }, error => {
      console.error(error);
      this.loading = false;
    });
  }

  navigateBack() {
    this.location.back();
  }

  scrollTable(direction: string) {
    const scrollAmount = 300;
    if (direction === 'up') window.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
    else if (direction === 'down') window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
  }
}
