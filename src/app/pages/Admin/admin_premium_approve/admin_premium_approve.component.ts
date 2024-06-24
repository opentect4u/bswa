import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin_premium_approve',
  templateUrl: './admin_premium_approve.component.html',
  styleUrls: ['./admin_premium_approve.component.css'],
  providers: [MessageService,DatePipe]
})
export class Admin_premium_approveComponent implements OnInit {
  userData: any = [];
  form!: FormGroup;

  constructor(private router: Router, private dataServe: DataService, private formBuilder: FormBuilder, private messageService: MessageService, private route: ActivatedRoute,private datePipe: DatePipe) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      form_no: ['',  Validators.required],
      memb_name: ['']
    })
  }

  get m() {
    return this.form.controls;
  }

  submit(){
    var dt = {
      form_no: this.m['form_no'].value,
      memb_name: this.m['memb_name'].value,
    };

    this.dataServe.global_service(0,'/frm_list_policy',`form_no=${this.m['form_no'].value}`).subscribe(data => {
      console.log(data,'kiki')
      this.userData = data;
      this.userData = this.userData.msg;
      console.log(this.userData,'lili');
      
      // this.show_spinner=true;
    },error => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
    })
  }

  preview(formNo:any, memb_id: any) { //route to the particular restaurant on clicking on the edit option
    // alert(v);
    console.log(memb_id);
    
    this.router.navigate(['/admin/policy_view_form',encodeURIComponent(btoa(formNo)),encodeURIComponent(btoa(memb_id))])
  }

  img(formNo: any, gender: any, member: any) {
    this.router.navigate(['/admin/admin_preview_form', encodeURIComponent(btoa(formNo)), gender, member]);
  }


}
