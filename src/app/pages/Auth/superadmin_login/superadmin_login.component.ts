import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-superadmin_login',
  templateUrl: './superadmin_login.component.html',
  styleUrls: ['./superadmin_login.component.css'],
  providers: [MessageService],
})
export class Superadmin_loginComponent implements OnInit {
  loginForm!: FormGroup;
  getLoginData: any;
  hide: boolean = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dataServe: DataService,
    private messageService: MessageService
  ) { }

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
      pas: btoa(this.f['password'].value),
    };
    this.dataServe.global_service(1, '/superadmin_login', dt).subscribe((data) => {
      this.getLoginData = data;
      console.log(data, 'oo');
      if (this.getLoginData.suc > 0) {
        localStorage.setItem('token', this.getLoginData.token);
        localStorage.setItem(
          'user_name',
          this.getLoginData.msg.userdata[0].user_name
        );
        localStorage.setItem(
          'user_type',
          this.getLoginData.msg.userdata[0].user_type
        );
        localStorage.setItem(
          'user_id',
          this.getLoginData.msg.userdata[0].user_id
        );
        this.router.navigate(['superadmin/super_dashboard']).catch((data) => {
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

  onLogin() {
    this.router.navigate(['/main/dashboard']);
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    passwordInput.type =
      passwordInput.type === 'password' ? 'text' : 'password';
  }

}
