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

  constructor(private router: Router,
      private fb: FormBuilder,
      private dataServe: DataService,
      private messageService: MessageService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      min_no: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

   get f() {
    return this.loginForm.controls;
  }

   onSubmit() {
     var dt = {
      min_no: this.f['min_no'].value,
      password: this.f['password'].value,
    };
    this.dataServe.global_service(1, '/stp_member_login', dt).subscribe((data) => {
      this.getLoginData = data;
      console.log(data, 'oo');
      if (this.getLoginData.suc > 0) {
        localStorage.setItem('token', this.getLoginData.token);
        localStorage.setItem('flag', 'STP');
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
          severity: 'danger',
          summary: 'Error',
          detail: 'Message Content',
        });
      }
    });
  }

}

