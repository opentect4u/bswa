import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/service/data.service';
import { ValidatorsService } from 'src/app/service/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change_password_member',
  templateUrl: './change_password_member.component.html',
  styleUrls: ['./change_password_member.component.css'],
  providers: [MessageService],
})
export class Change_password_memberComponent implements OnInit {
  form!: FormGroup;
  userData: any;

  constructor(private router: Router, private fb: FormBuilder,
    private dataServe: DataService,
    private validatorsService: ValidatorsService,
private route: ActivatedRoute,
private messageService: MessageService) { }

  ngOnInit() {
    this.form = this.fb.group({
      old_pass: [''],
      new_pass: [''],
      con_pass: ['']
    });
  }

  get m() {
    return this.form.controls;
  }

  password_change_member(){
    var dt = {
      old_pass: this.m['old_pass'].value,
      new_pass: this.m['new_pass'].value,
      con_pass: this.m['con_pass'].value,
      user_email: localStorage.getItem('user_name')
  
    }
    this.dataServe.global_service(1,'/update_pass',dt).subscribe(data=>{
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

}
