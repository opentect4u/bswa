import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-approve_money_receipt_transaction',
  templateUrl: './approve_money_receipt_transaction.component.html',
  styleUrls: ['./approve_money_receipt_transaction.component.css'],
  providers: [MessageService,DatePipe],
})
export class Approve_money_receipt_transactionComponent implements OnInit {
  form_no: any;
  form!: FormGroup;
  mem_type: any;
  value!: string;
  date!: Date;
  period: any;
  member_type: any;
  selectedValue: string = 'N';
  resdata_report: any;
  isButtonDisabled: boolean = true;
  responsedata: any;

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
      member_id: ['']
    });
    this.member();
  }

  get m() {
    return this.form.controls;
  }

  member() {
    this.dataServe.global_service(0, '/get_pg_approve_mem', null).subscribe((data:any) => {
      this.responsedata = data
      console.log(this.responsedata);
      this.responsedata = this.responsedata.suc > 0 ? this.responsedata.msg : []
      })
  
  }

  submit_btn(){
    var dt = {
          from_dt: this.m['from_dt'].value,
          to_dt: this.m['to_dt'].value,
          member_id: this.m['member_id'].value,      
        }
    this.router.navigate(['/admin/show_approve_transaction_report',dt.from_dt,dt.to_dt,dt.member_id]);    
  }

}
