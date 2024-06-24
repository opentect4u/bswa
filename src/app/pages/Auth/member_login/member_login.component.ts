import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-member_login',
  templateUrl: './member_login.component.html',
  styleUrls: ['./member_login.component.css'],
  providers: [MessageService],
})
export class Member_loginComponent implements OnInit {
  loginForm!: FormGroup;
  getLoginData: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dataServe: DataService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      uname: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  logSubmit() {
    var dt = {
      username: this.f['uname'].value,
      pas: this.f['password'].value,
    };
    this.dataServe.global_service(1, '/member_login', dt).subscribe((data) => {
      this.getLoginData = data;
      console.log(data, 'oo');
      if (this.getLoginData.suc > 0) {
        localStorage.setItem('token', this.getLoginData.token);
        localStorage.setItem(
          'user_name',
          this.getLoginData.msg.userdata[0].user_id
        );
        localStorage.setItem(
          'user_type',
          this.getLoginData.msg.userdata[0].user_type
        );
        localStorage.setItem(
          'mem_type',
          this.getLoginData.msg.userdata[0].mem_type
        );
        this.router.navigate(['main/dashboard']).catch((data) => {
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

  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    passwordInput.type =
      passwordInput.type === 'password' ? 'text' : 'password';
  }

}
