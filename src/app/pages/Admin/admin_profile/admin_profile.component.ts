import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorsService } from 'src/app/service/validators.service';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin_profile',
  templateUrl: './admin_profile.component.html',
  styleUrls: ['./admin_profile.component.css'],
  providers: [MessageService],
})
export class Admin_profileComponent implements OnInit {
  myForm!: FormGroup;
  userData: any;

  constructor(private router: Router, private fb: FormBuilder,
      private dataServe: DataService,
      private validatorsService: ValidatorsService,
  private route: ActivatedRoute,
private messageService: MessageService) { }

  ngOnInit() {
     this.myForm = this.fb.group({
      user_id: [{ value: '', disabled: true }],
      user_type: [{ value: '', disabled: true }],
      user_name: [''],
      user_email: [''],
      user_phone: [''],
      user_status: [{ value: '', disabled: true}]
    });
    this.fetchData();
  }

   fetchData() {
    const dt = {
      user_id: localStorage.getItem('user_id')
    };
      this.dataServe.global_service(1,'/admin/fetch_profile_details',dt).subscribe(data => {
      // console.log(data,'kiki')
      this.userData = data;
      this.userData = this.userData.msg;
      console.log(this.userData,'lili');
      if(this.userData.length > 0){
        this.myForm.patchValue({
          user_id : this.userData[0].user_id,
          user_type : this.userData[0].user_type == 'A' ? 'Admin' : '',
          user_name : this.userData[0].user_name,
          user_email : this.userData[0].user_email,
          user_phone : this.userData[0].user_phone,
          user_status : this.userData[0].user_status == 'A' ? 'Active' : 'Inactive',
        })
      }
      // this.show_spinner=true;
    },error => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
    });
   }


     get m() {
    return this.myForm.controls;
  }

   onSubmit() {
    var dt = {
      user_id: localStorage.getItem('user_id'),
      user_name: this.m['user_name'].value, 
      user_email: this.m['user_email'].value, 
      user_phone: this.m['user_phone'].value, 
    };
     this.dataServe.global_service(1,'/admin/save_admin_profile_details',dt).subscribe(data=>{
      // console.log(data,'...')
      this.userData = data;
      this.userData = this.userData.msg;
      // console.log(this.userData,'lili');
       Swal.fire('Success', 'Profile updated successfully!', 'success').then(() => {
                   this.router.navigate(['/admin/admin_Profile']);
            });
    },error => {
      console.error(error);
      // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
    })
  }

}
