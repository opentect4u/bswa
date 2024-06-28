import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-subscription_cleared_upto',
  templateUrl: './subscription_cleared_upto.component.html',
  styleUrls: ['./subscription_cleared_upto.component.css'],
  providers: [MessageService,DatePipe],
})
export class Subscription_cleared_uptoComponent implements OnInit {
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
    // this.form_no = ato b(decodeURIComponent(encodedFormNo));
    this.mem_type = this.route.snapshot.params['mem_type'];
    // this.user = localStorage.setItem
    this.form = this.fb.group({
      period: [''],
      member_type: ['']
    });
  }

  get m() {
    return this.form.controls;
  }

  submit_btn(){
    var dt = {
          period: this.m['period'].value,
          member_type: this.m['member_type'].value,      
        }
    this.router.navigate(['/admin/show_clear_report',dt.period,dt.member_type]);    
  }

}
