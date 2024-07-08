import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-stp_ins_report',
  templateUrl: './stp_ins_report.component.html',
  styleUrls: ['./stp_ins_report.component.css'],
  providers: [MessageService,DatePipe],
})
export class Stp_ins_reportComponent implements OnInit {
  form_no: any;
  form!: FormGroup;
  mem_type: any;
  value!: string;
  date!: Date;
  from_dt: any;
  to_dt: any;
  status = [{id: 'T', value: 'Accept'},{id: 'A', value: 'Approve'},{id: 'R', value: 'Reject'}]

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataServe: DataService,
    private datePipe: DatePipe,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    const encodedFormNo = this.route.snapshot.params['form_no'];
    this.mem_type = this.route.snapshot.params['mem_type'];
    this.form = this.fb.group({
      from_dt: [''],
      to_dt: [''],
      status: ['']
    });
  }

  get m() {
    return this.form.controls;
  }

  submit_btn_stp(){
    var dt = {
      from_dt: this.m['from_dt'].value,
      to_dt: this.m['to_dt'].value,
      status: this.m['status'].value
    }
    this.router.navigate(['/admin/show_stp_ins_report',dt.from_dt,dt.to_dt,dt.status]);    
  }

}
