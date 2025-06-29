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
    skipPremiumUpdate = false;
   memberTypes = [
    { label: 'General Membership', value: 'G' },
    { label: 'Life Membership', value: 'L' }
    ];
     memberoperation = [
    { label: 'Single', value: 'S' },
    { label: 'Double', value: 'D' }
    ];
      memberGender = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' }
    ];
    spouseGender = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' }
    ];
    responsedata: any;
    responsedata_policy_holder: any;
    groupSaveData: any;
    memberDetailsVisible = true;
    spouseDetailsVisible = true;
    selectedMembOprn: string = ''; 
    previousMembOprn: string = '';

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
    premium_type: [''],
    memb_flag: ['Y'],
    dependent_flag: ['Y']
    });

this.form.get('memb_oprn')?.valueChanges.subscribe((oprn: string) => {
  if (this.skipPremiumUpdate) {
    this.skipPremiumUpdate = false;
    return;
  }

  const premium = oprn === 'S' ? 'Single' : oprn === 'D' ? 'Double' : '';
  this.form.get('premium_type')?.setValue(premium);
});



    this.getSuperMemberDetails();
    this.unit();
    this.policy_holder();
  //     if (this.userData?.memb_flag) {
  //   this.form.get('memb_flag')?.setValue(this.userData.memb_flag);

  //   // ✅ Also set visibility correctly
    // this.memberDetailsVisible = this.userData.memb_flag === 'Y';
  // }
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

// onMemberOperationChange(event: any) {
//   const newValue = event.value;
//   const currentValue = this.form.get('memb_oprn')?.value;

//   if (currentValue === 'D' && newValue === 'S') {
//     if (this.form.get('dependent_flag')?.value === 'Y') {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Deactivate Spouse First',
//         text: 'Please deactivate spouse details before changing Member Operation to Single.',
//         confirmButtonText: 'Go to Spouse Section'
//       }).then((result) => {
//         if (result.isConfirmed) {
//           // Scroll to spouse section
//           const spouseSection = document.getElementById('spouse-section');
//           if (spouseSection) {
//             spouseSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
//           }
//         }
//       });

//       // Reset selected value to 'D'
//       setTimeout(() => {
//         this.selectedMembOprn = 'D';
//       });
//     } else {
//       // Now allow change
//       this.form.get('memb_oprn')?.setValue('S');
//       this.form.get('premium_type')?.setValue('Single');
//     }
//   } else {
//     // All other changes allowed
//     this.form.get('memb_oprn')?.setValue(newValue);
//     const premium = newValue === 'S' ? 'Single' : 'Double';
//     this.form.get('premium_type')?.setValue(premium);
//   }
// }

// onMemberOperationChange(event: any) {
//   const newValue = event.value;

//   if (this.previousMembOprn === 'D' && newValue === 'S' && this.form.get('dependent_flag')?.value === 'Y') {
//     // Revert the value
//     this.form.get('memb_oprn')?.setValue('D'); // revert immediately
//     // Keep previousMembOprn as 'D' (no update yet)

//     // Show popup
//     Swal.fire({
//       icon: 'warning',
//       title: 'Deactivate Spouse First',
//       text: 'Please deactivate spouse details before changing Member Operation to Single.',
//       confirmButtonText: 'Go to Spouse Section'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const el = document.getElementById('spouse-section');
//         if (el) {
//           el.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         }
//       }
//     });
//   } else {
//     // Allow the change and update premium_type
//     this.previousMembOprn = newValue;
//     const premium = newValue === 'S' ? 'Single' : 'Double';
//     this.form.get('premium_type')?.setValue(premium);
//   }
// }

onMemberOperationChange(event: any) {
  const newValue = event.value;

  // 🛑 Going from Double → Single with active spouse
  if (this.previousMembOprn === 'D' && newValue === 'S' && this.form.get('dependent_flag')?.value === 'Y') {
    this.form.get('memb_oprn')?.setValue('D');

    Swal.fire({
      icon: 'warning',
      title: 'Deactivate Spouse First',
      text: 'Please deactivate spouse details before changing Member Operation to Single.',
      confirmButtonText: 'Go to Spouse Section'
    }).then((result) => {
      if (result.isConfirmed) {
        const el = document.getElementById('spouse-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    return; // prevent further execution
  }

  // ✅ Going from Single → Double
  if (this.previousMembOprn === 'S' && newValue === 'D') {
    // Activate spouse section
    this.spouseDetailsVisible = true;

    // Set dependent_flag to 'Y' to mark active
    this.form.get('dependent_flag')?.setValue('N');

    // Initialize spouse fields only if blank
    this.form.patchValue({
      spou_name: this.form.get('spou_name')?.value || '',
      spou_min: this.form.get('spou_min')?.value || '',
      spou_dob: this.form.get('spou_dob')?.value || '',
      spou_mobile: this.form.get('spou_mobile')?.value || '',
      spou_gender: this.form.get('spou_gender')?.value || '',
      spou_addr: this.form.get('spou_addr')?.value || ''
    });
  }

  // ✅ Set updated values
  this.previousMembOprn = newValue;
  this.form.get('memb_oprn')?.setValue(newValue);
  this.form.get('premium_type')?.setValue(newValue === 'S' ? 'Single' : 'Double');
}



onToggleChange(event: MatSlideToggleChange) {
  this.form.get('memb_flag')?.setValue(event.checked ? 'Y' : 'N');
}

onToggleChangeDependent(event: MatSlideToggleChange) {
  this.form.get('dependent_flag')?.setValue(event.checked ? 'Y' : 'N');
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

             this.previousMembOprn = this.userData.memb_oprn;

            this.memberDetailsVisible = this.userData.memb_flag === 'Y';
            this.spouseDetailsVisible = this.userData.dependent_flag === 'Y';

            this.form.patchValue({
            form_no: this.userData.form_no ?  this.userData.form_no : 'N/A',
            form_dt: this.userData?.form_dt ? this.datePipe.transform(this.userData.form_dt, 'yyyy-MM-dd') : 'N/A',
            // joining_year: this.datePipe.transform(this.userData.fin_yr, 'yyyy-MM-dd'),
            policy_holder_type: this.userData.policy_holder_type_id ? this.userData.policy_holder_type_id : 'N/A',
            memb_id: this.userData.member_id ? this.userData.member_id : 'N/A',
            unit_name: this.userData.association ? this.userData.association : 'N/A',
            member_type: this.userData.memb_type,
            memb_oprn: this.userData.memb_oprn,
            memb_name: this.userData.memb_name ? this.userData.memb_name : 'N/A',      
            gender: this.userData.gender,      
            // dob: this.userData?.dob ? this.datePipe.transform(this.userData.dob, 'yyyy-MM-dd') : null,
            dob: this.userData?.dob? this.datePipe.transform(this.userData.dob, 'yyyy-MM-dd'): null,
            memb_addr: this.userData.mem_address ? this.userData.mem_address : 'N/A',
            memb_mobile: this.userData.phone_no ?? '',
            min_no: this.userData.min_no ? this.userData.min_no : 'N/A',
            personel_no: this.userData.personel_no ? this.userData.personel_no : 'N/A',
            memb_flag: this.userData.memb_flag,
            spou_name: this.userData.dependent_name ? this.userData.dependent_name : 'N/A', 
            spou_min: this.userData.spou_min_no ? this.userData.spou_min_no : 'N/A',
            spou_dob: this.userData?.spou_dob ? this.datePipe.transform(this.userData.spou_dob, 'yyyy-MM-dd') : null,
            spou_mobile: this.userData.spou_phone ?? '',
            spou_gender: this.userData.spou_gender,
            spou_addr: this.userData.spou_address ? this.userData.spou_address : 'N/A',
            dependent_flg: this.userData.dependent_flg,
            premium_type: this.userData.premium_type == 'S' ? 'Single' : this.userData.premium_type == 'D' ? 'Double' : 'N/A',
            });
            // this.selectedMembOprn = this.userData.memb_oprn;
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
          memb_oprn: this.o['memb_oprn'] ? this.o['memb_oprn'].value : null,
          memb_name: this.o['memb_name'] ? this.o['memb_name'].value : null,
          gender: this.o['gender'] ? this.o['gender'].value : null,
          dob: this.o['dob']?.value
  ? this.datePipe.transform(this.o['dob'].value, 'yyyy-MM-dd')
  : null,
          memb_addr: this.o['memb_addr'] ? this.o['memb_addr'].value : null,
          phone_no: this.o['memb_mobile'].value || null,
          personel_no: this.o['personel_no'] ? this.o['personel_no'].value : null,
          memb_flag: this.o['memb_flag'] ? this.o['memb_flag'].value : null,
          spou_name: this.o['spou_name'] ? this.o['spou_name'].value : null,
          spou_min: this.o['spou_min'] ? this.o['spou_min'].value : null,
          spou_dob: this.o['spou_dob']?.value
  ? this.datePipe.transform(this.o['spou_dob'].value, 'yyyy-MM-dd')
  : null,
          spou_mobile: this.o['spou_mobile'].value || null,
          spou_gender: this.o['spou_gender'] ? this.o['spou_gender'].value : null,
          spou_addr: this.o['spou_addr'] ? this.o['spou_addr'].value : null,
          dependent_flag: this.o['dependent_flag'] ? this.o['dependent_flag'].value : null,
          // dependent_dt: this.depenFields_2.value,
          premium_type: this.o['premium_type'] ?.value === 'Single' ? 'S' : 'D',
          form_no: localStorage.getItem('form_no'),
          member_id: localStorage.getItem('member_id'),
          min_no: localStorage.getItem('min_no'),
          user_name: localStorage.getItem('user_name')

      }
      this.dataServe.global_service(1, '/edit_stp_member_details', dt).subscribe(
        data => {
          console.log(data,'ytre');
          this.groupSaveData = data;
          console.log(this.groupSaveData,'data');
          
          if (this.groupSaveData && this.groupSaveData.suc > 0) {
            Swal.fire(
              'Success Your form is updated successfully',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                      // this.router.navigate(['/main/stp_memb_dtls'])
                      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  this.router.navigate(['/main/stp_memb_dtls']);
});
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

