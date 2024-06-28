import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-member_list_report',
  templateUrl: './member_list_report.component.html',
  styleUrls: ['./member_list_report.component.css'],
  providers: [MessageService,DatePipe],
})
export class Member_list_reportComponent implements OnInit {
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

  // submit_btn(){
  //   var dt = {
  //     period: this.m['period'].value,
  //     member_type: this.m['member_type'].value,      
  //   }
  //   console.log(dt,'dtttt');
  //   this.dataServe.global_service(0, '/member_list_report', `period=${dt.period}&member_type=${dt.member_type}`).subscribe(
  //     data => {
  //       console.log(data);
  //       this.resdata_report = data;
  //       if (this.resdata_report.suc > 0) {
  //         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data saved successfully' });
  //         this.router.navigate(['/admin/show_memlist_report',dt.period,dt.member_type]);
  //       } else {
  //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save data' });
  //       }
  //     },
  //     error => {
  //       console.error(error);
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
  //     }
  //   );

  // }

  submit_btn(){
    var dt = {
          period: this.m['period'].value,
          member_type: this.m['member_type'].value,      
        }
    this.router.navigate(['/admin/show_memlist_report',dt.period,dt.member_type]);    
  }

}
