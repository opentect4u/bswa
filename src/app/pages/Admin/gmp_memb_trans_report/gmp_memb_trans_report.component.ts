import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-gmp_memb_trans_report',
  templateUrl: './gmp_memb_trans_report.component.html',
  styleUrls: ['./gmp_memb_trans_report.component.css'],
  providers: [MessageService,DatePipe],
})
export class Gmp_memb_trans_reportComponent implements OnInit {
  form_no: any;
  form!: FormGroup;
  mem_type: any;
  value!: string;
  date!: Date;
  from_dt: any;
  to_dt: any;

  constructor( private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataServe: DataService,
    private datePipe: DatePipe,
    private messageService: MessageService,) { }

  ngOnInit() {
    const encodedFormNo = this.route.snapshot.params['form_no'];
    this.mem_type = this.route.snapshot.params['mem_type'];

    this.form = this.fb.group({
      from_dt: [''],
      to_dt: [''],
    });
  }

  get m() {
    return this.form.controls;
  }

  submit_btn_trans(){
    var dt = {
      from_dt: this.m['from_dt'].value,
      to_dt: this.m['to_dt'].value,
     
    }
    this.router.navigate(['/admin/show_gmp_trans_report',dt.from_dt,dt.to_dt]);    
  }

}
