import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

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
    this.period = this.route.snapshot.params['period'];
    this.show_data();
  }

  show_data(){
    this.dataServe.global_service(0,'/member_list_report',`period=${this.period}&member_type=${this.member_type}`).subscribe(data => {
      console.log(data,'kiki')
      this.userData = data;
      this.userData = this.userData.msg;
      console.log(this.userData,'lili');
    },error => {
      console.error(error);
    })
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

    this.WindowObject.document.writeln(
      '@media print {.wraper { margin-left: 10px !important; margin-right: 10px !important; } .contant-wraper { border-top: 2px solid #32678d; background-color: white; margin-bottom: 100px; overflow: auto; }</style>'
    );
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
