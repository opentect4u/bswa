import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/service/data.service';
import { ValidatorsService } from 'src/app/service/validators.service';
import Swal from 'sweetalert2';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-change_password',
  templateUrl: './change_password.component.html',
  styleUrls: ['./change_password.component.css'],
  providers: [MessageService],
})
export class Change_passwordComponent implements OnInit {
  // form!: FormGroup;
  // userData: any;
  // @Input() form!: FormGroup;
  
  passwordForm!: FormGroup;
  showCurrent = false;
  showNew = false;
  showConfirm = false;

  constructor(private router: Router, private fb: FormBuilder,
    private dataServe: DataService,
    private validatorsService: ValidatorsService,
private route: ActivatedRoute,
private messageService: MessageService) { }

  ngOnInit() {
    // this.form = this.fb.group({
    //   old_pass: [''],
    //   new_pass: [''],
    //   con_pass: ['']
    // });
     this.passwordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });
  }

    passwordMatchValidator(formGroup: FormGroup) {
  const newPassword = formGroup.get('newPassword')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;
  return newPassword === confirmPassword ? null : { passwordMismatch: true };
}

toggleShow(field: 'current' | 'new' | 'confirm', inputEl?: HTMLInputElement) {
  if (field === 'current') this.showCurrent = !this.showCurrent;
  if (field === 'new') this.showNew = !this.showNew;
  if (field === 'confirm') this.showConfirm = !this.showConfirm;

  setTimeout(() => {
    inputEl?.focus();
  });
}

  get m() {
    return this.passwordForm.controls;
  }

// password_change(){
//   var dt = {
//     old_pass: this.m['old_pass'].value,
//     new_pass: this.m['new_pass'].value,
//     con_pass: this.m['con_pass'].value,
//     user_email: localStorage.getItem('user_email')

//   }
//   this.dataServe.global_service(1,'/update_pass',dt).subscribe(data=>{
//     console.log(data,'...')
//     console.log(this.userData,'lili');
//     this.router.navigate(['/auth/login'])
//   },error => {
//     console.error(error);
//   })
// }

 onSubmit(): void {
  // if (this.passwordForm.invalid || this.passwordForm.hasError('passwordMismatch')) {
  //   return; // Don't submit if invalid
  // }

  const dt = {
    old_pass: this.m['currentPassword'].value,
    new_pass: this.m['newPassword'].value,
    con_pass: this.m['confirmPassword'].value,
    user_email: localStorage.getItem('user_email')
  };
  // console.log(dt,'dt');
  

  this.dataServe.global_service(1, '/update_pass', dt).subscribe({
    next: (data) => {
      console.log(data, '...');
      Swal.fire('Success', 'Password updated successfully!', 'success').then(() => {
        this.router.navigate(['/auth/login']);
      });
    },
    error: (error) => {
      console.error(error);
      Swal.fire('Error', 'An error occurred while saving data', 'error');
    }
  });
}
}
