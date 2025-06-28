import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { ValidatorsService } from 'src/app/service/validators.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { ChangeDetectorRef } from '@angular/core';

interface UserInfo {
  form_dt: string;
  form_no: string;
  policy_holder: string;
      member_id: string;
      member_type: string;
      unit_nm: string;
      personal_no: string;
      memb_opr: string;
      member: string;
      gender: string;
      min_no: string;
      gen_dob: string;
      mobile: string;
      fin_yr: string;
      mem: string;
      premium_type: string;
      spouse: string;
      spouse_min_no: string;
      spou_dob: string;
      spou_mobile: string;
      spou_gender: string;
      spou_mem: string;
      memb_flag: string;
      dependent_flag: string;
      dep_dt: [DepInfo];
}

interface DepInfo {
  form_no: string;
  sl_no: string;
  ind_type: string;
  fin_year: string;
  particulars: string;
  amount: string;
  treatment_dtls: string;
}

@Component({
  selector: 'app-member_policy_edit',
  templateUrl: './member_policy_edit.component.html',
  styleUrls: ['./member_policy_edit.component.css'],
  providers: [DatePipe, MessageService],
})
export class Member_policy_editComponent implements OnInit {
  form_no: any;
  member_id: any;
  form!: FormGroup;
  responsedata: any;
  responsedata_policy_holder: any;
  userData: any;
  responsedata_rel: any
  responsedata_unit: any;
  finYearData:any
  memberData: any;
  oldMembOprValue: any;
  selectedValue3: string = 'N';
  showPremiumSection = true;
   statusOptions = [
  // { label: 'Select Status', value: 'N' },
  { label: 'SELF', value: 'S' },
  { label: 'SPOUSE', value: 'P' }
  ];
  filteredStatusOptions: any[] = []; // to avoid undefined error
  maxRows = 5;
  previousMemberOpr: string = 'N'; // or initialize based on form

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataServe: DataService,
    private validatorsService: ValidatorsService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
     private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const encodedFormNo = this.route.snapshot.params['form_no'];
    this.form_no = atob(decodeURIComponent(encodedFormNo));
    this.member_id = this.route.snapshot.params['member_id'];
    // this.previousMemberOpr = this.form.get('memb_opr')?.value || 'N';
    
    this.form = this.fb.group({
      form_dt: [''],
      form_no: [this.form_no],
      policy_holder: [''],
      memb_flag: [''],
      dependent_flag: ['N'],
      member_id: [''],
      member_type: [''],
      unit_nm: [''],
      personal_no: [''],
      memb_opr: [''],
      member: [''],
      gender: [''],
      min_no: [''],
      gen_dob: [''],
      mobile: [''],
      fin_yr: [''],
      mem: [''],
      spouse: [''],
      spouse_min_no: [''],
      spou_dob: [''],
      spou_mobile: [''],
      spou_mem: [''],
      spou_gender: [''],
      premium_type: [''],
      depenFields_2: this.fb.array([]),
      user: [localStorage.getItem('user_name')],
    });
    this.get_fin_year()
    if(this.depenFields_2.controls.length == 0)
        this.form.get('memb_opr')?.valueChanges.subscribe(value => {
  if (value === 'Double') {
    this.setSpouseValidators(true);
  } else {
    this.setSpouseValidators(false);
  }
});
    this.unit();
    this.policy_holder();
    this.relationship();
    this.getMemberPolicyDetails();
  }

setSpouseValidators(required: boolean) {
  const spouseControls = ['spouse', 'spouse_min_no', 'spou_dob', 'spou_mobile', 'spou_gender', 'spou_mem'];

  spouseControls.forEach(controlName => {
    const control = this.form.get(controlName);
    if (control) {
      if (required) {
        control.setValidators(Validators.required);
      } else {
        control.clearValidators(); // Remove required validation
        // Do NOT clear values here
      }
      control.updateValueAndValidity();
    }
  });
}


  get depenFields_2(): FormArray {
    return this.form.get('depenFields_2') as FormArray;
  }

  get o() {
    return this.form.controls;
  }

  changedate(event:any,i:any) {
    console.log(event.target.value,i);

    const filtervalue = this.depenFields_2.value.filter((dt:any) => dt.ind_type == event.target.value)
    console.log(filtervalue.length);
    
    if(filtervalue.length > 0){
      console.log(this.depenFields_2);
      
     if(filtervalue.length == 1) this.depenFields_2.controls[i].patchValue({
      fin_year: this.finYearData.curr_fin_year
     })
     if(filtervalue.length == 2) this.depenFields_2.controls[i].patchValue({
      fin_year: this.finYearData.prev_fin_year
     })
    }else {
     
    }
  }

  get_fin_year(){
    this.dataServe.global_service(0, '/get_date', null).subscribe(
      data => {
        console.log(data);
        this.finYearData = data;
        this.finYearData = this.finYearData.suc > 0 ? this.finYearData.msg : {}
      }
    );
  }

  onadd(sl_no:any = '',ind_type:any = 'N',fin_year:any = '',particulars:any = '',amount:any = '',treatment_dtls:any = '',treatment_flag:any = 'Y') {
    // this.phoneNumbers.push('');
    const fieldGroup = this.fb.group(
      {
        sl_no: [sl_no],
        ind_type: [ind_type],
        fin_year: [fin_year],
        particulars: [particulars],
        amount: [amount],
        treatment_dtls: [treatment_dtls],
        treatment_flag: [treatment_flag],
      },
      {
        validators: this.validatorsService.conditionalRequiredValidator(
          'ind_type',
          [ 'sl_no','fin_year','particulars','amount','treatment_dtls','treatment_flag']
        ),
      }
    );
    this.depenFields_2.push(fieldGroup);
  }

onminus(index: number) {
  const row = this.depenFields_2.at(index).value;
  const form_no = this.form_no || '';
  const sl_no = row?.sl_no || '';

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      const payload = new FormData();
      payload.append('sl_no', sl_no);
      payload.append('form_no', form_no);

      this.dataServe.global_service(1, '/remove_medical_details', payload).subscribe((res: any) => {
        if (res?.suc > 0) {
          this.depenFields_2.removeAt(index);
          Swal.fire({
            title: 'Deleted!',
            text: 'Row has been deleted.',
            icon: 'success',
          });
        } else {
          Swal.fire('Error!', 'Failed to disable this row.', 'error');
        }
      });
    }
  });
}


  unit() {
    this.dataServe
      .global_service(0, '/master/unit_list', null)
      .subscribe((data: any) => {
        this.responsedata = data;
        console.log(this.responsedata, '555');
        this.responsedata =
          this.responsedata.suc > 0 ? this.responsedata.msg : [];
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

  relationship() {
    this.dataServe
      .global_service(0, '/master/relationship_list', null)
      .subscribe((data: any) => {
        this.responsedata_rel = data;
        console.log(this.responsedata_rel);
        this.responsedata_rel =
          this.responsedata_rel.suc > 0 ? this.responsedata_rel.msg : [];
      });
  }

  getMemberPolicyDetails() {
    this.dataServe
      .global_service(1, '/member_policy_dtls_view', {form_no: this.form_no,member_id: this.member_id })
      .subscribe(
        (data) => {
          console.log(data, 'kiki');
          this.userData = data;
          // this.userData = this.userData.msg;
          if (this.userData.suc > 0) {
            this.memberData = this.userData.msg[0];
            this.form.patchValue({
              form_dt: this.memberData?.form_dt != '0000-00-00' ? this.datePipe.transform(this.memberData?.form_dt, 'yyyy-MM-dd') : '',
              memb_flag: this.memberData?.memb_flag != null ? this.memberData?.memb_flag : '',
              policy_holder: this.memberData?.policy_holder_type,
              member_id: this.memberData?.member_id != 'null' ? this.memberData?.member_id : '',
              member_type: this.memberData?.memb_type== 'G' ? 'General Membership' : this.memberData?.memb_type== 'L' ? 'Life Membership' : '',
              memb_opr: this.memberData?.memb_oprn != 'null' ? this.memberData?.memb_oprn : '',
              unit_nm: this.memberData?.association != 'null' ? this.memberData?.association :'',
              member: this.memberData?.memb_name != 'null' ? this.memberData?.memb_name : '',
              gender: this.memberData?.gender != 'null' ? this.memberData?.gender : '',
              gen_dob: this.memberData?.dob == '0000-00-00'
                ? '0000-00-00' : this.datePipe.transform(this.memberData?.dob, 'yyyy-MM-dd'),
              mobile: this.memberData?.phone_no == 'null' ? 0 : this.memberData?.phone_no,
              personal_no: this.memberData?.personel_no == 'null' ? 0 : this.memberData?.personel_no,
              min_no: this.memberData?.min_no != 'null' ? this.memberData?.min_no : '',
              mem: this.memberData?.mem_address != 'null' ? this.memberData?.mem_address : '',
              spouse: this.memberData?.dependent_name != 'null' ? this.memberData?.dependent_name : '',
              spouse_min_no: this.memberData?.spou_min_no != 'null' ?  this.memberData?.spou_min_no : '',
              spou_dob: this.memberData?.spou_dob != '0000-00-00'
              ? this.datePipe.transform(this.memberData?.spou_dob, 'yyyy-MM-dd')
              : '',
              spou_mobile: this.memberData?.spou_phone != '0' ? this.memberData?.spou_phone : '',
              spou_gender: ['M', 'F'].includes(this.memberData?.spou_gender) ? this.memberData.spou_gender : 'N',
              spou_mem: this.memberData?.spou_address != 'null' ? this.memberData?.spou_address : '',
              dependent_flag: this.memberData?.dependent_flag != 'null' ? this.memberData?.dependent_flag : 'N',
              premium_type: this.memberData?.premium_type == 'S' ? 'Single' : 'Double',
            });


            for (let dt of this.memberData!.dep_dt) {
              this.depenFields_2.push(
                this.fb.group({
                  sl_no: [dt.sl_no],
                  ind_type: [dt.ind_type],
                  fin_year: [dt.fin_year],
                  particulars: [dt.particulars],
                  amount: [dt.amount],
                  treatment_dtls: [dt.treatment_dtls],
                  treatment_flag: ['Y']
                })
              );
            }
          }
          console.log(this.userData, 'lili');
        },
        (error) => {
          console.error(error);
          Swal.fire(
            'Warning',
            'An error occurred while fetching data',
            'warning'
          );
        }
      );
  }

  save(){
    const frmDt = new FormData();
    frmDt.append('data', JSON.stringify(this.form.value))
    // console.log(frmDt,'oiuy');
    this.dataServe
    .global_service(1, '/update_member_policy_dtls', frmDt)    
    .subscribe((data) => {
      this.responsedata = data;
      if (this.responsedata.suc > 0) {
        Swal.fire(
          'Success!',
          ` Your form is Updated successfully.`,
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/admin/member_policy_list']);
          }
        });
      } else {
        Swal.fire('Error', this.responsedata.msg, 'error');
      }
    });
  }

//   onMemberOperationChange(event?: any) {
//   // Determine selected value from event or fallback to existing value
//   const value = event?.target?.value ?? this.selectedValue3;
//   this.selectedValue3 = value;

//   // Reset dependent fields
//   this.form.get('ind_type')?.setValue('');
//   this.form.get('premium_type')?.setValue('');
//   // this.form.get('premium_amt')?.setValue('');
//   // this.form.get('total_amt')?.setValue('');

//   // Toggle visibility of premium section
//   this.showPremiumSection = value === 'S' || value === 'D';

//   // Handle filtering status options and fetching premiums
//   switch (value) {
//     case 'S':
//       this.filteredStatusOptions = this.statusOptions.filter(opt => opt.value === 'S');
//       this.getPremiumDetails();
//       break;

//     case 'D':
//       this.filteredStatusOptions = [...this.statusOptions];
//       this.getPremiumDetails();
//       break;

//     default:
//       this.filteredStatusOptions = [];
//       break;
//   }
// }


// onMemberOperationChange(event?: any) {
//   const newValue = event?.target?.value ?? this.selectedValue3;
//   const oldValue = this.previousMemberOpr;
//   this.selectedValue3 = newValue;
//   this.previousMemberOpr = newValue;

//   // Update premium_type accordingly
//   if (newValue === 'S') {
//     this.form.get('premium_type')?.setValue('SINGLE');
//   } else if (newValue === 'D') {
//     this.form.get('premium_type')?.setValue('DOUBLE');
//   } else {
//     this.form.get('premium_type')?.reset();
//   }

//   // If switched from Double to Single
//   if (oldValue === 'D' && newValue === 'S') {
//     // Clear and deactivate spouse section
//     this.form.patchValue({
//       // spouse: '',
//       // spouse_min_no: '',
//       // spou_dob: '',
//       // spou_mobile: '',
//       // spou_gender: 'NS',
//       dependent_flag: 'N',
//       // spou_mem: ''
//     });

//     // Remove spouse medical entries from FormArray
//     const depenArray = this.form.get('depenFields_2') as FormArray;
//     for (let i = depenArray.length - 1; i >= 0; i--) {
//       const indType = depenArray.at(i).get('ind_type')?.value;
//       if (indType === 'P') {
//         depenArray.removeAt(i);
//       }
//     }
//   }

//   // If switched from Single to Double, you may optionally auto-add SPOUSE entry
//   if (oldValue === 'S' && newValue === 'D') {
//     const depenArray = this.form.get('depenFields_2') as FormArray;
//     const spouseExists = depenArray.controls.some(ctrl => ctrl.get('ind_type')?.value === 'P');
//     if (!spouseExists) {
//       depenArray.push(this.createMedicalGroup('P')); // Use your form group creator
//     }
//   }
// }


// onMemberOperationChange(event?: any) {
//   const newValue = event?.target?.value ?? this.selectedValue3;
//   const oldValue = this.previousMemberOpr;
//   this.selectedValue3 = newValue;
//   this.previousMemberOpr = newValue;

//   // Update premium_type
//   this.form.get('premium_type')?.setValue(newValue === 'D' ? 'DOUBLE' : 'SINGLE');

//   const depenArray = this.form.get('depenFields_2') as FormArray;

//   // DOUBLE ➜ SINGLE
//   if (oldValue === 'D' && newValue === 'S') {
//     // Just deactivate spouse (ind_type = 'P'), no dependent_flag updates
//     depenArray.controls.forEach((group: AbstractControl) => {
//       if (group.get('ind_type')?.value === 'P') {
//         // Optional: disable the spouse group fields in the UI
//         // group.disable();
//       }
//     });
//   }

//   // SINGLE ➜ DOUBLE
//   if (oldValue === 'S' && newValue === 'D') {
//     const spouseExists = depenArray.controls.some(ctrl => ctrl.get('ind_type')?.value === 'P');

//     if (!spouseExists) {
//       depenArray.push(this.createMedicalGroup('P')); // Add spouse if not exists
//     } else {
//       // Optional: enable spouse fields if previously disabled
//       depenArray.controls.forEach((group: AbstractControl) => {
//         if (group.get('ind_type')?.value === 'P') {
//           // group.enable();
//         }
//       });
//     }
//   }
// }

onMemberOperationChange(event: any) {
  const newValue = event?.target?.value ?? this.selectedValue3;
  const oldValue = this.previousMemberOpr;

  console.log('Old:', oldValue, 'New:', newValue);

  this.selectedValue3 = newValue;
  this.previousMemberOpr = newValue;

  this.getPremiumDetails();

  if (oldValue === 'D' && newValue === 'S') {
    const form_no = this.form.get('form_no')?.value;
    const user = this.form.get('user')?.value; // ✅ FIXED

    console.log('form_no:', form_no, 'user:', user);

    if (form_no && user) {
      this.removeMedicalAndSpouseDetails(form_no, user);
    }
  }
}


removeMedicalAndSpouseDetails(form_no: string, user: string) {
  const payload = { form_no, user };

  this.dataServe
    .global_service(1, '/remove_medical_and_spose_details', payload)
    .subscribe((data) => {
      this.responsedata = data;

      if (this.responsedata.suc > 0) {
        Swal.fire(
          'Success!',
          'Your form is updated successfully.',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/admin/member_policy_list']);
          }
        });
      } else {
        Swal.fire('Error', this.responsedata.msg || 'Update failed.', 'error');
      }
    }, (error) => {
      console.error('API error:', error);
      Swal.fire('Error', 'Server error occurred.', 'error');
    });
}


createDependentGroup(): FormGroup {
  return this.fb.group({
    name: [''],
    gender: [''],
    relation: [''], // e.g., 'SELF', 'SPOUSE'
    dependent_flag: ['Y'],
    // Add other fields if needed
  });
}


createMedicalGroup(ind_type: string = 'N'): FormGroup {
  return this.fb.group({
    sl_no: [''],
    ind_type: [ind_type],
    fin_year: [''],
    particulars: [''],
    amount: [''],
    treatment_dtls: [''],
    treatment_flag: ['Y']
  });
}
;



getPremiumDetails() {
  const memberOperation = this.selectedValue3;

  this.dataServe
    .global_service(1, '/get_stp_premium_dtls', { type: memberOperation }) // POST
    .subscribe((data: any) => {
      if (data?.suc > 0 && data.msg.length > 0) {
        const premiumData = data.msg[0];
        this.form.patchValue({
          premium_type: premiumData.premium_type == 'S' ? 'Single' : 'Double',
          premium_amt: premiumData.premium_amt,
          total_amt: premiumData.premium_amt
        });
      }
    });
}


//  PremiumDetails() {
//   const memberOperation = this.selectedValue3;

//   this.dataServe
//     .global_service(1, '/get_stp_premium_dtls', { type: memberOperation }) // POST
//     .subscribe((data: any) => {
//       if (data?.suc > 0 && data.msg.length > 0) {
//         const premiumData = data.msg[0];
//         this.form.patchValue({
//           premium_type: premiumData.premium_type == 'S' ? 'Single' : 'Double',
//           premium_amt: premiumData.premium_amt,
//           total_amt: premiumData.premium_amt
//         });
//       }
//     });
// }

}
