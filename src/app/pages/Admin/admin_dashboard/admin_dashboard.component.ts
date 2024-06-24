import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-admin_dashboard',
  templateUrl: './admin_dashboard.component.html',
  styleUrls: ['./admin_dashboard.component.css'],
  providers: [MessageService]

})
export class Admin_dashboardComponent implements OnInit {
  userData: any = [];
  form!: FormGroup;

  constructor(private router: Router, private dataServe:DataService,private formBuilder: FormBuilder,private messageService: MessageService) { }

  ngOnInit() {
    // this.submit();
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

    this.dataServe.global_service(0,'/frm_list',`form_no=${this.m['form_no'].value}`).subscribe(data => {
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

  preview(formNo:any) { //route to the particular restaurant on clicking on the edit option
    // alert(v);
    this.router.navigate(['/admin/print_form',encodeURIComponent(btoa(formNo))])
  }

  img(formNo: any, gender: any, member: any) {
    this.router.navigate(['/admin/admin_preview_form', encodeURIComponent(btoa(formNo)), gender, member]);
  }


}
