import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-stp_member_register',
  templateUrl: './stp_member_register.component.html',
  styleUrls: ['./stp_member_register.component.css'],
  providers: [MessageService,DatePipe],
})
export class Stp_member_registerComponent implements OnInit {
   form_no: any;
  form!: FormGroup;
  mem_type: any;
  value!: string;
  date!: Date;
  period: any;
  member_type: any;
 selectedValue: string = 'N'
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

  ngOnInit() {    const encodedFormNo = this.route.snapshot.params['form_no'];
    // this.form_no = ato b(decodeURIComponent(encodedFormNo));
    this.mem_type = this.route.snapshot.params['mem_type'];
    // this.user = localStorage.setItem
    this.form = this.fb.group({
      from_dt: [''],
      to_dt: [''],
      memb_oprn: ['']
    });
  }
  get m() {
    return this.form.controls;
  }

   submit_btn(){
    var dt = {
          from_dt: this.m['from_dt'].value,
          to_dt: this.m['to_dt'].value,
          memb_oprn: this.m['memb_oprn'].value,      
        }
    this.router.navigate(['/admin/show_stp_member_report',dt.from_dt,dt.to_dt,dt.memb_oprn]);    
  }

}
