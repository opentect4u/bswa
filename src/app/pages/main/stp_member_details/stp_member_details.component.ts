import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/service/data.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

interface UserInfo {
  form_dt: string;
  policy_holder_type: string;
  min_no: string;
  member_type: string;
  unit_name: string;
  personel_no: string;
  memb_oprn: string;
  memb_name: string;
  gender: string;
  memb_id: string;
  dob: string;
  memb_mobile: string;
  joining_year: string;
  memb_addr: string;
  spou_name: string; 
  spou_min: string;
  spou_dob: string;
  spou_mobile: string;
  spou_addr: string;
  spou_gender: string;
  premium_type: string;
}

@Component({
  selector: 'app-stp_member_details',
  templateUrl: './stp_member_details.component.html',
  styleUrls: ['./stp_member_details.component.css'],
  providers: [DatePipe],
})
export class Stp_member_detailsComponent implements OnInit {
    min_no: any;
    flag: any;
    form!: FormGroup;
    responseData: any
    userData: UserInfo | any;
    memberTypes: string[] = ['General Membership', 'Life Membership']; // Add whatever types you need
    memberoperation: string[] = ['Single', 'Double']; // Add whatever types you need
    memberGender: string[] = ['Male', 'Female']; // Add whatever types you need
    responsedata: any;
    responsedata_policy_holder: any;
    groupSaveData: any;
    memberDetailsVisible = true;
    pouseDetailsVisible = true;


  constructor(private router: Router,
    private fb: FormBuilder,
    private dataServe: DataService,
    private route: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.min_no = localStorage.getItem('min_no');
    this.flag= localStorage.getItem('flag');

    this.form = this.fb.group({
    form_dt: [''],
    form_no: [''],
    policy_holder_type: [''],
    min_no: [''],
    member_type: [''],
    unit_name: [''],
    personel_no: [''],
    memb_oprn: [''],
    memb_name: [''],
    gender: [''],
    memb_id: [''],
    dob: [''],
    memb_mobile: [''],
    joining_year: [''],
    memb_addr: [''],
    spou_name: [''], 
    spou_min: [''],
    spou_dob: [''],
    spou_mobile: [''],
    spou_gender: [''],
    spou_addr: [''],
    premium_type: ['']
    });

    this.getSuperMemberDetails();
    this.unit();
    this.policy_holder();
    }

      unit() {
     this.dataServe.global_service(0, '/master/unit_list', null).subscribe((data:any) => {
      this.responsedata = data
      console.log(this.responsedata);
      this.responsedata = this.responsedata.suc > 0 ? this.responsedata.msg : []
      });
      }

          policy_holder() {
    this.dataServe
      .global_service(0, '/master/policy_holder_list', null)
      .subscribe((data: any) => {
        this.responsedata_policy_holder = data;
        // console.log(this.responsedata_policy_holder, '555');
        this.responsedata_policy_holder =
          this.responsedata_policy_holder.suc > 0 ? this.responsedata_policy_holder.msg : [];
      });
  }

  toggleMemberDetails(event: MatSlideToggleChange): void {
  this.memberDetailsVisible = event.checked;
}

    getSuperMemberDetails() {
      const dt = {
      min_no: localStorage.getItem('min_no'),
      member_id: localStorage.getItem('member_id'),
      form_no: localStorage.getItem('form_no'),
    };
  
    this.dataServe.global_service(1, '/fetch_member_details_fr_stp_policy', dt).subscribe(
      (data: any) => {
        this.responseData = data;
        console.log(this.responseData, 'res');
  
        if (this.responseData.suc > 0) {
          if (Array.isArray(this.responseData.msg) && this.responseData.msg.length > 0) {
            this.userData = this.responseData.msg[0];
            this.form.patchValue({
            form_no: this.userData.form_no ?  this.userData.form_no : 'N/A',
            form_dt: this.userData?.form_dt ? this.datePipe.transform(this.userData.form_dt, 'yyyy-MM-dd') : 'N/A',
            // joining_year: this.datePipe.transform(this.userData.fin_yr, 'yyyy-MM-dd'),
            policy_holder_type: this.userData.policy_holder_type ? this.userData.policy_holder_type : 'N/A',
            memb_id: this.userData.member_id ? this.userData.member_id : 'N/A',
            unit_name: this.userData.unit_name ? this.userData.unit_name : 'N/A',
            member_type: this.userData.memb_type == 'G' ? 'General Membership' : this.userData.memb_type == 'L' ?'Life Membership' : this.userData.memb_type == 'AI' ? 'Associate Membership' : 'N/A',
            memb_oprn: this.userData.memb_oprn == 'S' ? 'Single' : this.userData.memb_oprn == 'D' ? 'Double' : 'N/A',
            memb_name: this.userData.memb_name ? this.userData.memb_name : 'N/A',      
            gender: this.userData.gender == 'M' ? 'Male' : this.userData.gender == 'F' ? 'Female' : 'N/A',      
            dob: this.userData?.dob ? this.datePipe.transform(this.userData.dob, 'yyyy-MM-dd') : 'N/A',
            memb_addr: this.userData.mem_address ? this.userData.mem_address : 'N/A',
            memb_mobile: this.userData.phone_no ? this.userData.phone_no : 'N/A',
            min_no: this.userData.min_no ? this.userData.min_no : 'N/A',
            personel_no: this.userData.personel_no ? this.userData.personel_no : 'N/A',
            member_flag: this.userData.memb_flag,
            spou_name: this.userData.dependent_name ? this.userData.dependent_name : 'N/A', 
            spou_min: this.userData.spou_min_no ? this.userData.spou_min_no : 'N/A',
            spou_dob: this.userData?.spou_dob ? this.datePipe.transform(this.userData.spou_dob, 'yyyy-MM-dd') : 'N/A',
            spou_mobile: this.userData.spou_phone ? this.userData.spou_phone : 'N/A',
            spou_gender: this.userData.spou_gender == 'M' ? 'Male' : this.userData.spou_gender == 'F' ? 'Femake' : 'N/A',
            spou_addr: this.userData.spou_address ? this.userData.spou_address : 'N/A',
            dependent_flg: this.userData.dependent_flg,
            premium_type: this.userData.premium_type == 'S' ? 'Single' : this.userData.premium_type == 'D' ? 'Double' : 'N/A',
            });
          } 
        } else {
          Swal.fire('Error', this.responseData.msg, 'error');
        }
      },
      (error) => {
        console.error(error);
        Swal.fire('Error', 'An error occurred while fetching data', 'error');
      }
    );
  };

   get o() {
    return this.form.controls;
  }

    edit_dtls_submit(){
      var dt = {
          policy_holder_type: this.o['policy_holder_type']? this.o['policy_holder_type'].value : null,
          unit_name: this.o['unit_name']? this.o['unit_name'].value : null,
          member_type: this.o['member_type'] ? this.o['member_type'].value : null,
          memb_oprn: this.o['memb_opr'] ? this.o['memb_opr'].value : null,
          memb_name: this.o['memb_name'] ? this.o['memb_name'].value : null,
          gender: this.o['gender'] ? this.o['gender'].value : null,
          dob: this.o['dob'] ? this.o['dob'].value : null,
          memb_addr: this.o['memb_addr'] ? this.o['memb_addr'].value : null,
          phone_no: this.o['phone_no'] ? this.o['phone_no'].value : null,
          personel_no: this.o['personel_no'] ? this.o['personel_no'].value : null,
          memb_flag: this.o['memb_flag'] ? this.o['memb_flag'].value : null,
          spou_name: this.o['spou_name'] ? this.o['spou_name'].value : null,
          spou_min: this.o['spou_min'] ? this.o['spou_min'].value : null,
          spou_dob: this.o['spou_dob'] ? this.o['spou_dob'].value : null,
          spou_mobile: this.o['spou_mobile'] ? this.o['spou_mobile'].value : null,
          spou_gender: this.o['spou_gender'] ? this.o['spou_gender'].value : null,
          spou_addr: this.o['spou_addr'] ? this.o['spou_addr'].value : null,
          dependent_flag: this.o['dependent_flag'] ? this.o['dependent_flag'].value : null,
          // dependent_dt: this.depenFields_2.value,
          premium_type: this.o['premium_type'] ?.value === 'Single' ? 'S' : 'D',
          form_no: localStorage.getItem('form_no'),
          member_id: localStorage.getItem('member_id'),
          min_no: localStorage.getItem('min_no')

      }
      this.dataServe.global_service(1, '/edit_stp_member_details', dt).subscribe(
        data => {
          console.log(data);
          this.groupSaveData = data;
          console.log(this.groupSaveData,'data');
          
          if (this.groupSaveData && this.groupSaveData.suc > 0) {
            Swal.fire(
              'Success Your form is updated successfully',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                      this.router.navigate(['/main/stp_memb_dtls'])
                    }
                  });
          } else {
            Swal.fire(
              'Error',
              'Your form is not submitted successfully!',
              'error'
            );
            // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save data' });
          }
        });
    }

}

