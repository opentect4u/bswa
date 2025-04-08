import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/service/data.service';
import { ValidatorsService } from 'src/app/service/validators.service';
import Swal from 'sweetalert2';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-change_password_member',
  templateUrl: './change_password_member.component.html',
  styleUrls: ['./change_password_member.component.css'],
  providers: [MessageService],
})
export class Change_password_memberComponent implements OnInit {
  form!: FormGroup;
  userData: any;
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(private router: Router, private fb: FormBuilder,
    private dataServe: DataService,
    private validatorsService: ValidatorsService,
private route: ActivatedRoute,
private messageService: MessageService) { }

  ngOnInit() {
    this.form = this.fb.group({
      old_pass: ['', Validators.required],
      // new_pass: ['', [Validators.required, Validators.minLength(10)]],
      new_pass: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)
        ]
      ],
      con_pass: ['', Validators.required]
    }, { validator: this.passwordsMatch });
  }

  passwordsMatch(form: FormGroup) {
    const newPass = form.get('new_pass')?.value;
    const conPass = form.get('con_pass')?.value;
    
    if (newPass !== conPass) {
      form.get('con_pass')?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      return null;
    }
  }
  
  

  get m() {
    return this.form.controls;
  }

  password_change_member(){
    var dt = {
      old_pass: this.m['old_pass'].value,
      new_pass: this.m['new_pass'].value,
      con_pass: this.m['con_pass'].value,
      user_name: localStorage.getItem('user_name')
  
    }
    this.dataServe.global_service(1,'/update_password',dt).subscribe(data=>{
      console.log(data,'...')
      // this.userData = data;
      // this.userData = this.userData.msg;
      // console.log(this.userData,'lili');
      this.router.navigate(['/auth/member_login'])
    },error => {
      console.error(error);
      // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
    })
  }

  // togglePassword() {
  //   this.showPassword = !this.showPassword;
  // }

  togglePassword(field: string): void {
  if (field === 'old') {
    this.showOldPassword = !this.showOldPassword;
  } else if (field === 'new') {
    this.showNewPassword = !this.showNewPassword;
  } else if (field === 'confirm') {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}

}
