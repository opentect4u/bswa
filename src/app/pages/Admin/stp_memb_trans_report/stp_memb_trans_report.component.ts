import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-stp_memb_trans_report',
  templateUrl: './stp_memb_trans_report.component.html',
  styleUrls: ['./stp_memb_trans_report.component.css'],
  providers: [MessageService, DatePipe],
})
export class Stp_memb_trans_reportComponent implements OnInit {
  form_no: any;
  form!: FormGroup;
  mem_type: any;
  value!: string;
  date!: Date;
  from_dt: any;
  to_dt: any;
  memb_oprn = [{ id: 'S', value: 'Single' }, { id: 'D', value: 'Double' }]
  fin_years: string[] = [];


  constructor(private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataServe: DataService,
    private datePipe: DatePipe,
    private messageService: MessageService,) { }

  ngOnInit() {
    // const member_id = this.route.snapshot.params['form_no'];
    this.mem_type = this.route.snapshot.params['mem_type'];
    this.form = this.fb.group({
      from_dt: ['', Validators.required],
      to_dt: ['', Validators.required],
      memb_oprn: ['', Validators.required],
      fin_year: ['', Validators.required]
    });

    this.get_fin_year();
  }

  get_fin_year() {
    this.dataServe.global_service(0, '/master/md_stp_premium_type', null).subscribe(
      (data: any) => {
        let items: any[] = [];

        if (data && data.suc > 0 && Array.isArray(data.msg)) {
          items = data.msg;
        } else if (Array.isArray(data)) {
          items = data;
        } else if (data && data.msg) {
          items = Array.isArray(data.msg) ? data.msg : [data.msg];
        }

        if (items.length > 0) {
          const uniqueYears = new Set(items.map((item: any) => item.financial_year || item.fin_year).filter((year: any) => year));
          this.fin_years = Array.from(uniqueYears) as string[];
        } else {
          this.loadMockData();
        }
      },
      error => {
        console.error("API error, falling back to mock data", error);
        this.loadMockData();
      }
    );
  }

  loadMockData() {
    const tableData = [
      { sl_no: "1", financial_year: "2025-2026", policy_amount: "5 lakh", premium_type: "S", premium_amt: "0.00" },
      { sl_no: "2", financial_year: "2025-2026", policy_amount: "5 lakh", premium_type: "D", premium_amt: "0.00" },
      { sl_no: "7", financial_year: "2026-2027", policy_amount: "2 lakh", premium_type: "S", premium_amt: "1.00" },
      { sl_no: "8", financial_year: "2026-2027", policy_amount: "2 lakh", premium_type: "D", premium_amt: "4.00" },
      { sl_no: "9", financial_year: "2026-2027", policy_amount: "5 lakh", premium_type: "S", premium_amt: "5.00" },
      { sl_no: "10", financial_year: "2026-2027", policy_amount: "5 lakh", premium_type: "D", premium_amt: "6.00" },
      { sl_no: "11", financial_year: "2026-2027", policy_amount: "10 lakh", premium_type: "S", premium_amt: "7.00" },
      { sl_no: "12", financial_year: "2026-2027", policy_amount: "10 lakh", premium_type: "D", premium_amt: "8.00" }
    ];
    const uniqueYears = new Set(tableData.map(item => item.financial_year));
    this.fin_years = Array.from(uniqueYears);
  }

  get m() {
    return this.form.controls;
  }

  submit_btn_trans() {
    var dt = {
      from_dt: this.m['from_dt'].value || '0',
      to_dt: this.m['to_dt'].value || '0',
      memb_oprn: this.m['memb_oprn'].value || '0',
      fin_year: this.m['fin_year'].value || '0'
    }
    this.router.navigate(['/admin/show_stp_trans_report', dt.from_dt, dt.to_dt, dt.memb_oprn, dt.fin_year]);
  }


}
