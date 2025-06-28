import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/service/data.service';
import { ValidatorsService } from 'src/app/service/validators.service';
import Swal from 'sweetalert2';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-change_password_stp_member',
  templateUrl: './change_password_stp_member.component.html',
  styleUrls: ['./change_password_stp_member.component.css'],
  providers: [MessageService],
})
export class Change_password_stp_memberComponent implements OnInit {
  passwordForm!: FormGroup;
  showCurrent = false;
  showNew = false;
  showConfirm = false;


  constructor(private fb: FormBuilder,private router: Router,
    private dataServe: DataService,
    private validatorsService: ValidatorsService,
private route: ActivatedRoute,
private messageService: MessageService) { }

  ngOnInit() {
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

 onSubmit(): void {
  // if (this.passwordForm.invalid || this.passwordForm.hasError('passwordMismatch')) {
  //   return; // Don't submit if invalid
  // }

  const dt = {
    old_pass: this.m['currentPassword'].value,
    new_pass: this.m['newPassword'].value,
    con_pass: this.m['confirmPassword'].value,
    min_no: localStorage.getItem('member_id'),
    form_no: localStorage.getItem('form_no')
  };
  console.log(dt,'dt');
  

  this.dataServe.global_service(1, '/update_password_stp', dt).subscribe({
    next: (data) => {
      console.log(data, '...');
      Swal.fire('Success', 'Password updated successfully!', 'success').then(() => {
        this.router.navigate(['/auth/stp_member_login']);
      });
    },
    error: (error) => {
      console.error(error);
      Swal.fire('Error', 'An error occurred while saving data', 'error');
    }
  });
}


}
