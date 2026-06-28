import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorsService } from 'src/app/service/validators.service';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-active_inactive_memb_dtls',
  templateUrl: './active_inactive_memb_dtls.component.html',
  styleUrls: ['./active_inactive_memb_dtls.component.css'],
  providers: [MessageService],
})
export class Active_inactive_memb_dtlsComponent implements OnInit {
  myForm!: FormGroup;
  userData: any;
  isSubmitting = false;


  constructor(private router: Router, private fb: FormBuilder,
      private dataServe: DataService,
      private validatorsService: ValidatorsService,
  private route: ActivatedRoute,
private messageService: MessageService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      form_no: [''],
      member_id: [''],
      memb_name: [''],
      mem_type: [''],
      memb_oprn: [''],
      phone_no: [''],
      unit_id: [''],
      gender: [''],
      memb_status: [''],
    });

     // Get member_id from URL
   this.route.paramMap.subscribe(params => {
    const encodedMemberId = params.get('member_id');
    const encodedPhoneNo = params.get('phone_no');

    if (encodedMemberId) {
      const memberId = atob(decodeURIComponent(encodedMemberId));
      console.log('Decoded Member ID:', memberId);

      this.fetchData(memberId);
    }
  });
  }

     fetchData(memberId: any) {
    const dt = {
      member_id: memberId
    };
      this.dataServe.global_service(1,'/view_member_dtls',dt).subscribe(data => {
      // console.log(data,'kiki')
      this.userData = data;
      this.userData = this.userData.msg;
      console.log(this.userData,'lili');
      if(this.userData.length > 0){
        this.myForm.patchValue({
          form_no : this.userData[0].form_no,
          member_id : this.userData[0].member_id,
          memb_name : this.userData[0].memb_name,
          mem_type : this.userData[0].mem_type == 'G' ? 'General Membership' : this.userData[0].mem_type == 'L' ? 'Life Membership' : this.userData[0].mem_type == 'AI' ? 'Associate Membership' : '',
          memb_oprn : this.userData[0].memb_oprn == 'S' ? 'Self' : this.userData[0].memb_oprn == 'J' ? 'Joint' : 'None',
          phone_no : this.userData[0].phone_no,
          unit_id : this.userData[0].unit_name ? this.userData[0].unit_name : 'None',
          gender : this.userData[0].gender == 'M' ? 'Male' : this.userData[0].gender == 'F' ? 'Female' : 'None',
          memb_status : this.userData[0].memb_status,
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

inactive_active_memb() {
  if (this.myForm.invalid) {
    return;
  }

  this.isSubmitting = true;

  const dt = {
    user_id: localStorage.getItem('user_name'),
    form_no: this.m['form_no'].value,
    member_id: this.m['member_id'].value,
    memb_status: this.m['memb_status'].value,
    phone_no: this.m['phone_no'].value,
  };

  this.dataServe.global_service(1, '/change_status', dt)
    .subscribe({
      next: (data: any) => {

        // SUCCESS
        if (data.suc === 1) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: data.msg || 'Status updated successfully!'
          }).then(() => {
            this.router.navigate(['/admin/active_deactive_members']);
          });
        }

        // FAILED (NO UPDATE)
        else {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: data.msg || 'Status update failed'
          }).then(() => {
            window.location.reload(); 
          });
        }

      },

      // API / SERVER ERROR
      error: (err) => {
        console.error(err);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong. Please try again.'
        }).then(() => {
          window.location.reload();  
        });
      }
    });
}



}
