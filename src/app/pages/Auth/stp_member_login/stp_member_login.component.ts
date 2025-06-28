import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-stp_member_login',
  templateUrl: './stp_member_login.component.html',
  styleUrls: ['./stp_member_login.component.css'],
  providers: [MessageService],
})
export class Stp_member_loginComponent implements OnInit {
  loginForm!: FormGroup;
  getLoginData: any;
  hide: boolean = true;

  constructor(private router: Router,
      private fb: FormBuilder,
      private dataServe: DataService,
      private messageService: MessageService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      member_id: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

   get f() {
    return this.loginForm.controls;
  }

   onSubmit() {
     var dt = {
      member_id: this.f['member_id'].value,
      password: this.f['password'].value,
    };
    this.dataServe.global_service(1, '/stp_member_login', dt).subscribe((data) => {
      this.getLoginData = data;
      console.log(data, 'oo');
      if (this.getLoginData.suc > 0) {
        localStorage.clear(); 
        localStorage.setItem('token', this.getLoginData.token);
        localStorage.setItem('flag', 'STP');
         localStorage.setItem(
          'member_id',
          this.getLoginData.msg.userdata[0].member_id
        );
         localStorage.setItem(
          'form_no',
          this.getLoginData.msg.userdata[0].form_no
        );
        localStorage.setItem(
          'user_name',
          this.getLoginData.msg.userdata[0].stp_memb_name
        );
        localStorage.setItem(
          'policy_holder_type',
          this.getLoginData.msg.userdata[0].policy_holder_type
        );
        localStorage.setItem(
          'min_no',
          this.getLoginData.msg.userdata[0].min_no
        );
        localStorage.setItem(
          'stp_user_status',
          this.getLoginData.msg.userdata[0].stp_user_status
        );
        this.router.navigate(['main/stp_dashboard']).catch((data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Message Content',
          });
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'Incorrect User ID or Password',
        });
      }
       }, (err) => {
    // In case of server/network error
    this.messageService.add({
      severity: 'error',
      summary: 'Server Error',
      detail: 'Unable to connect. Please try again later.',
    });
  });
  }

}

