import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/service/data.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';

interface UserInfo {
  form_dt: string;
  policy_holder_type: string;
  min_no: string;
  member_type: string;
  unit_name: string;
  personel_no: string;
  memb_oprn: string;
  memb_name: string;
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
    // form_no: [''],
    policy_holder_type: [''],
    min_no: [''],
    member_type: [''],
    unit_name: [''],
    personel_no: [''],
    memb_oprn: [''],
    memb_name: [''],
    memb_id: [''],
    dob: [''],
    memb_mobile: [''],
    joining_year: [''],
    memb_addr: [''],
    spou_name: [''], 
    spou_min: [''],
    spou_dob: [''],
    spou_mobile: [''],
    spou_addr: [''],
    });

    this.getSuperMemberDetails();
    }

    getSuperMemberDetails() {
      const dt = {
      min_no: localStorage.getItem('min_no'),
    };
  
    this.dataServe.global_service(1, '/fetch_member_details_fr_stp_policy', dt).subscribe(
      (data: any) => {
        this.responseData = data;
        console.log(this.responseData, 'res');
  
        if (this.responseData.suc > 0) {
          if (Array.isArray(this.responseData.msg) && this.responseData.msg.length > 0) {
            this.userData = this.responseData.msg[0];
            this.form.patchValue({
            // form_no: this.userData.form_no,
            form_dt: this.datePipe.transform(this.userData.form_dt, 'yyyy-MM-dd'),
            joining_year: this.datePipe.transform(this.userData.fin_yr, 'yyyy-MM-dd'),
            policy_holder_type: this.userData.policy_holder_type == 'M' ? 'BSPWA Member' : 'Member Of Other Sail Association',
            memb_id: this.userData.member_id,
            unit_name: this.userData.unit_name,
            member_type: this.userData.memb_type == 'G' ? 'General Membership' : this.userData.memb_type == 'L' ?'Life Membership' : this.userData.memb_type == 'AI' ? 'Associate Membership' : '',
            memb_oprn: this.userData.memb_oprn == 'S' ? 'Single' : 'Double',
            memb_name: this.userData.memb_name,      
            dob: this.datePipe.transform(this.userData.dob, 'yyyy-MM-dd'),
            memb_addr: this.userData.mem_address,
            memb_mobile: this.userData.phone_no,
            min_no: this.userData.min_no,
            personel_no: this.userData.personel_no,
            spou_name: this.userData.dependent_name, 
            spou_min: this.userData.spou_min_no,
            spou_dob: this.datePipe.transform(this.userData.spou_dob, 'yyyy-MM-dd'),
            spou_mobile: this.userData.spou_phone,
            spou_addr: this.userData.spou_address,
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

}
