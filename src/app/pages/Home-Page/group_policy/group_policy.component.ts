import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, isFormArray, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ValidatorsService } from 'src/app/service/validators.service';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';

interface MemberStatus {
  name: string;
  code: string;
}

@Component({
  selector: 'app-group_policy',
  templateUrl: './group_policy.component.html',
  styleUrls: ['./group_policy.component.css'],
  providers: [MessageService,DatePipe],
})
export class Group_policyComponent implements OnInit {
  @Output() fileSelected = new EventEmitter();
  uploadedFiles: any[] = [];
  // filePreview: { [key: string]: string | ArrayBuffer | null } = {};
  // selectedImage: string | ArrayBuffer | null = null;
  // displayImageDialog: boolean = false; 

  ingredient!: string;
  value!: string;
  date!: Date;
  mem_status!: MemberStatus[];
  isReadonly: boolean = true;
  form!: FormGroup;
  mem_type: any;
  // responsedata: any;
  responsedata: any = [];
  pre_dt: any;
  userData: any;
  phoneNumbers: string[] = [];
  responsedata_rel: any;
  depenFields: any;
  groupSaveData: any;
  user: any;
  formNo: any = 0;
  yesRadioButton = 'Y';
  additionalOptions: any = false;
  sup_top_list: any = [];
  policy_holder_type: any
  // isnonMember: boolean = true;
  checkedmember: any  = false
  isMember: boolean = true;
  responsedata_unit: any;
  maxDate!: string;
  filteredGroups: any[] = [];
  ownFile: any = []
  spouseFile: any = []
  ownsFiles: any = []
  spousesFile: any = []
  gurdianName: string = '';
  memberName: string = '';
  dependentName: string = '';

  // selectedValue: string = 'N';
  // selectedValue_1: string = 'N';
  // selectedValue_2: string = 'N';
  // selectedValue_3: string = 'N';
  // selectedValue_4: string = 'N';
  // selectedValue_5: string = 'N';
  // selectedValue_6: string = 'N';
  // selectedValue_7: string = 'N';
  // selectedValue8: string = 'N';


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataServe: DataService,
    private validatorsService: ValidatorsService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private datePipe: DatePipe
  ) {
   }

  ngOnInit() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();
    this.maxDate = `${year}-${month}-${day}`;

    this.mem_type = this.route.snapshot.params['mem_type'];
    this.user = localStorage.setItem
    this.form = this.fb.group({
      member_id: ['', Validators.required],
      member_type: ['', Validators.required],
      member: ['', Validators.required],
      phone: ['', Validators.required],
      gurdian: ['', Validators.required],
      gen: ['', Validators.required],
      marital_status: ['', Validators.required],
      gen_dob: ['', Validators.required],
      type_diseases: ['', Validators.required],
      name_diseases: ['', Validators.required],
      own_file: [''],
      spouse_file: [''],
      memb_oprn: [''],
      grp_name: [''],
      pre_amont: [''],
      sup_top_up: [''],
      sup_pre_amont: [''],
      sup_tot_amont: [''],
      policy_holder_type: [''],
      unit: [''],
      // unit_name: ['', Validators.required],
      // sl_no: [''],
      // dependent_name: [''],
      // relation: [''],
      // dob: [''],
      depenFields_1: this.fb.array([]),
      form_dt: ['', Validators.required],
    });

    // this.getData_dependents();

    this.form.valueChanges.subscribe(() => {
      this.calculateTotalAmount();
    });

   this.unit();
   this.relationship();
   this.onadd(); 
   this.get_non_dtls();
  }

  get totalAmount(): number {
    return this.calculateTotalAmount();
  }

  get depenFields_1(): FormArray {
    return this.form.get('depenFields_1') as FormArray;
  }

  get o() {
    return this.form.controls;
  }

  get_non_dtls(){
    this.dataServe
    .global_service(0, '/get_non_premium_dtls', null)
    .subscribe((data: any) => {
      this.responsedata = data;
      console.log(this.responsedata, '555');
      this.responsedata =
        this.responsedata.suc > 0 ? this.responsedata.msg : [];
      this.responsedata[0]['pre_dt'] = this.responsedata;
      // this.filterGroupNamesBasedOnMemberType();      
    });
    console.log(this.responsedata,'predata');
  }

  onPolicyHolderTypeChange(isMember: any) {
    this.form.reset()
    this.depenFields_1.clear()
    if(isMember === 'M'){
      this.checkedmember = true;
      // this.selectedValue = 'N';
      // this.selectedValue_1 = 'N'; 
      // this.selectedValue_2 = 'N';
      // this.selectedValue_3 = 'N';
      // this.selectedValue_4 = 'N';
      // this.selectedValue_5 = 'N';
      // this.selectedValue_6 = 'N';
      // this.selectedValue_7 = 'N';
      // this.selectedValue8 = 'N';
      this.unit()
      this.relationship()
    }else{

      this.checkedmember = false;
      // this.selectedValue = 'N';
      // this.selectedValue_1 = 'N'; 
      // this.selectedValue_2 = 'N';
      // this.selectedValue_3 = 'N';
      // this.selectedValue_4 = 'N';
      // this.selectedValue_5 = 'N';
      // this.selectedValue_6 = 'N';
      // this.selectedValue_7 = 'N';
      // this.selectedValue8 = 'N';
      this.onadd()
      this.get_non_dtls()
      this.unit()
      this.relationship()
    }
    // this.relationship()
  }

  // onPolicyAddDependent(memb_oprn: any) {
  //   if(memb_oprn == 'J'){
  //     this.checkedmember = true;
  //     this.onadd()
  //   }
  // }

  onPolicyAddDependent(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
  
    // this.get_non_dtls().subscribe((data: any) => {
      this.dataServe
      .global_service(0, '/get_non_premium_dtls', null)
      .subscribe((data: any) => {
      this.responsedata = data.suc > 0 ? data.msg : [];
      this.responsedata[0]['pre_dt'] = this.responsedata;
  
      // Filter the data based on the selected value
      if (selectedValue === 'J') {
        this.responsedata[0].pre_dt = this.responsedata[0].pre_dt.filter(
          (group: any) => group.family_catg == 'J'
        );
        this.onadd();
      } else {
        this.responsedata[0].pre_dt = this.responsedata[0].pre_dt.filter(
          (group: any) => group.family_catg == 'S'
        );
  
        Swal.fire(
          'Warning',
          'There is no access to add More Dependent',
          'warning'
        ).then((result) => {
          (event.target as HTMLSelectElement).value = 'S';
          if (result.isConfirmed) {
            this.depenFields_1.clear();
          }
        });
      }
    });
  }
  

  

//   onPolicyAddDependent(event: Event): void {
//     const selectedValue = (event.target as HTMLSelectElement).value;
    
//     if (selectedValue === 'S') { 
//         Swal.fire(
//             'Notice',
//             'You have selected "Self". Changing selection to "Spouse".',
//             'info'
//         ).then(() => {
//             // Automatically change to "Spouse"
//             (event.target as HTMLSelectElement).value = 'J';
//             this.onadd(); 
//         });
//     } else if (selectedValue === 'J') { 
//         this.onadd();
//     } else {
//         Swal.fire(
//             'Warning',
//             'There is no access to add more dependents.',
//             'warning'
//         ).then((result) => {
//             if (result.isConfirmed) {
//                 this.depenFields_1.clear();
//             }
//         });
//     }
// }

// filterGroupNamesBasedOnMemberType() {
//   this.filteredGroups = this.responsedata[0]?.pre_dt || [];
// }



  unit() {
    this.dataServe
      .global_service(0, '/master/unit_list', null)
      .subscribe((data: any) => {
        this.responsedata_unit = data;
        console.log(this.responsedata_unit, '555');
        this.responsedata_unit =
          this.responsedata_unit.suc > 0 ? this.responsedata_unit.msg : [];
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


  calculateTotalAmount(): number {
    const supTopUp = parseFloat(this.form.get('sup_top_up')?.value) || 0;
    const preAmont = parseFloat(this.form.get('pre_amont')?.value) || 0;
    return supTopUp + preAmont;
  }

  // get_premium_data_non(){
  //   var dt={
  //     flag: 'AI'
  //   }
  //   this.dataServe.global_service(0, '/get_member_policy', dt).subscribe((data:any) => {
  //     this.responsedata = data
  //     console.log(this.responsedata);
  //     this.responsedata = this.responsedata.suc > 0 ? this.responsedata.msg : []
  //     this.formNo = this.responsedata[0].form_no
  //     console.log(this.responsedata[0].subscription_1)
  //     })

  // }

  submit(){
    var dt = {
      member_id: this.o['member_id'] ? this.o['member_id'].value : null,
      member: this.o['member'] ? this.o['member'].value : null,
      // policy_holder_type: 'M',
    }
    this.dataServe.global_service(0, '/get_member_policy', `member_id=${dt.member_id}`).subscribe((data:any) => {
      this.responsedata = data
      console.log(this.responsedata);

      if(this.responsedata.suc == 3){
        Swal.fire(
          'Warning',
          'This Member ID already exists in GMP Policy',
          'warning'
        ).then((result) => {
          if (result.isConfirmed) {
            this.form.reset()
          }
        });
      } else if(this.responsedata.suc == 2){
          Swal.fire(
            'Warning',
            'This Member ID already exists in STP Policy',
            'warning'
          ).then((result) => {
            if (result.isConfirmed) {
              this.form.reset()
            }
          });
        }else if (this.responsedata.suc > 0 && this.responsedata.suc < 2){
          this.responsedata = this.responsedata.suc > 0 ? this.responsedata.msg : []
          this.formNo = this.responsedata[0].form_no
          console.log(this.responsedata[0].unit_id)
          this.form.patchValue({
            policy_holder_type: this.responsedata[0].policy_holder_type,
            // form_dt: this.responsedata[0].form_dt,
            unit: this.responsedata[0].unit_id,
            member_type: this.responsedata[0].mem_type,
            member: this.responsedata[0].memb_name,
            phone: this.responsedata[0].phone_no,
            memb_oprn: this.responsedata[0].memb_oprn,
            gurdian: this.responsedata[0].gurdian_name,
            gen: this.responsedata[0].gender,
            marital_status: this.responsedata[0].marital_status,
            gen_dob: this.datePipe.transform(this.responsedata[0].dob, 'yyyy-MM-dd'),
          });
          }else {
            Swal.fire(
              'Error',
              'Member Details Not Found',
              'error'
            ).then((result) => {
              if (result.isConfirmed) {
                this.form.reset()
              }
            });
          }
  
        this.getData_dependents()
      });
    }


  getData_dependents () {
    var dt = {
      member_id: this.o['member_id'] ? this.o['member_id'].value : null,
    }
  //   this.dataServe.global_service(0,'/get_member_policy_dependent', `member_id=${dt.member_id}`).subscribe(data => {
  //     console.log(data)
  //     this.userData = data;
  //     this.userData =
  //             this.userData.suc > 0 ? this.userData.msg : {};
  //     console.log(this.userData,'mistu');
  //     this.form.patchValue({
  //      sl_no: this.userData[0].sl_no,
  //      dependent_name: this.userData[0].dependent_name,
  //      relation: this.userData[0].relation_name,
  //      dob: this.userData[0].dob
  //     })
      
  // })

  this.dataServe.global_service(0,'/get_member_policy_dependent', `member_id=${dt.member_id}`).subscribe(data => {
    console.log(data);
    this.userData = data;
    this.userData = this.userData.suc > 0 ? this.userData.msg : [];
    console.log(this.userData, 'mistu');
    let i = 1
    for (let dt of this.userData) {
      this.onadd(dt.sl_no,dt.dependent_name,dt.relation_name,dt.dob,'','', dt.relation);
      i++;
    // this.form.patchValue({
    //        sl_no: this.userData[0].sl_no,
    //        dependent_name: this.userData[0].dependent_name,
    //        relation: this.userData[0].relation_name,
    //        dob: this.userData[0].dob
    //       })
        }
});

}

onadd(sl_no:any = '',dependent_name:any = '',relation:any = '',dob:any = '',type_diseases:any = '',name_diseases:any = '', relation_id:any = '', own_files:any = '', spouse_files:any = '') {
  // const formattedDob = this.datePipe.transform(dob, 'yyyy-MM-dd');
  const isValidDate = dob && new Date(dob).toString() !== 'Invalid Date';

const formattedDob = isValidDate ? this.datePipe.transform(dob, 'yyyy-MM-dd') : null;

  const fieldGroup = this.fb.group(
    {
      sl_no: [sl_no],
      dependent_name: [dependent_name],
      relation_name: [relation],
      dob: [formattedDob],
      type_diseases: [type_diseases],
      name_diseases: [name_diseases],
      relation: [relation_id],
      own_files: [own_files],
      spouse_files: [spouse_files]
    },
    // {
    //   validators: this.validatorsService.conditionalRequiredValidator(
    //     'dependent_name', 
    //     ['dob', 'relation_name','type_diseases','name_diseases']
    //   ),
    // }
  );
  this.depenFields_1.push(fieldGroup);
  // console.log(this.depenFields.controls, 'ADD');
}

onminus(index: number) {
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
      this.depenFields_1.removeAt(index);
      Swal.fire({
        title: 'Deleted!',
        text: 'Row has been deleted.',
        icon: 'success',
      });
    }
  });
}

// final_submit(){
//   var sup_top_flag = this.o['sup_top_up'].value != '' ? this.sup_top_list.filter((dt: any) => dt.value == this.o['sup_top_up'].value) : ''
//   const formData = new FormData();
//   var dt = {
//       flag: 'GP',
//       checkedmember: this.checkedmember,
//       policy_holder_type: this.o['policy_holder_type']? this.o['policy_holder_type'].value : null,
//       form_dt: this.o['form_dt'] ? this.o['form_dt'].value : null,
//       unit: this.o['unit']? this.o['unit'].value : null,
//       member_id: this.o['member_id'] ? this.o['member_id'].value : null,
//       type_diseases: this.o['type_diseases'] ? this.o['type_diseases'].value : null,
//       name_diseases: this.o['name_diseases'] ? this.o['name_diseases'].value : null,
//       member: this.o['member'] ? this.o['member'].value : null,
//       phone: this.o['phone'] ? this.o['phone'].value : null,
//       own_file: this.o['own_file'] ? this.o['own_file'].value : null,
//       spouse_file: this.o['spouse_file'] ? this.o['spouse_file'].value : null,
//       dependent_dt: this.depenFields_1.value,
//       grp_name : this.o['grp_name'] ? this.o['grp_name'].value : null,
//       pre_amont : this.o['pre_amont'] ? this.o['pre_amont'].value : null,
//       super_top_up_yes : this.o['super_top_up_yes'] ? this.o['super_top_up_yes'].value : null,
//       super_top_up_no : this.o['super_top_up_no'] ? this.o['super_top_up_no'].value : null,
//       sup_top_up : this.o['sup_top_up'] ? this.o['sup_top_up'].value : null,
//       sup_pre_amont : this.o['sup_pre_amont'] ? this.o['sup_pre_amont'].value : null,
//       sup_tot_amont : this.o['sup_tot_amont'] ? this.o['sup_tot_amont'].value : null,
//       member_type: this.o['member_type'] ? this.o['member_type'].value : null,
//       gurdian: this.o['gurdian'] ? this.o['gurdian'].value : null,
//       gen: this.o['gen'] ? this.o['gen'].value : null,
//       marital_status: this.o['marital_status'] ? this.o['marital_status'].value : null,
//       gen_dob: this.o['gen_dob'] ? this.o['gen_dob'].value : null,
//       memb_oprn: this.o['memb_oprn'] ? this.o['memb_oprn'].value : null,
//       sup_top_flag: sup_top_flag.length > 0 ? sup_top_flag[0].flag : '',
      
//   }
//   this.dataServe.global_service(1, '/save_group_policy_form', dt).subscribe(
//     data => {
//       console.log(data);
//       this.groupSaveData = data;
//       if (this.groupSaveData.suc > 0) {
//         this.formNo = this.groupSaveData.form_no;
//         // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data saved successfully' });
//         // this.router.navigate(['/main/dashboard']);
//         Swal.fire(
//           'Success! Your form is submitted successfully.',
//           `We have been informed! <br> Generated Form No is ${this.formNo}`,
//           'success'
//         ).then((result) => {
//           if (result.isConfirmed) {
//                   this.router.navigate(['/home/print_group_policy',encodeURIComponent(btoa(this.formNo))])
//                 }
//               });
//       } else {
//         Swal.fire(
//           'Error',
//           'Your form is not submitted successfully!',
//           'error'
//         );
//         // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save data' });
//       }
//     },
//     error => {
//       console.error(error);
//       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
//     }
//   );
// }

final_submit(){
  var sup_top_flag = this.o['sup_top_up'].value != '' ? this.sup_top_list.filter((dt: any) => dt.value == this.o['sup_top_up'].value) : '';
  
  const formData = new FormData();
  
  formData.append('flag', 'GP');
  formData.append('checkedmember', this.checkedmember);
  formData.append('policy_holder_type', this.o['policy_holder_type']?.value || 'N');
  formData.append('form_dt', this.o['form_dt']?.value || '');
  formData.append('unit', this.o['unit']?.value || '');
  formData.append('member_id', this.o['member_id']?.value || '');
  formData.append('type_diseases', this.o['type_diseases']?.value || '');
  formData.append('name_diseases', this.o['name_diseases']?.value || '');
  formData.append('member', this.o['member']?.value || '');
  formData.append('phone', this.o['phone']?.value || '');
  for(let dt of this.ownFile){
    formData.append('own_file', dt);
  }
  for(let dt of this.spouseFile){
    formData.append('spouse_file', dt);
  }
  formData.append('dependent_dt', JSON.stringify(this.depenFields_1.value));
  for(let dt of this.ownsFiles){
    formData.append('own_files', dt);
  }
  for(let dt of this.spousesFile){
    formData.append('spouse_files', dt);
  }
  formData.append('grp_name', this.o['grp_name']?.value || '');
  formData.append('pre_amont', this.o['pre_amont']?.value || '');
  formData.append('super_top_up_yes', this.o['super_top_up_yes']?.value || '');
  formData.append('super_top_up_no', this.o['super_top_up_no']?.value || '');
  formData.append('sup_top_up', this.o['sup_top_up']?.value || '');
  formData.append('sup_pre_amont', this.o['sup_pre_amont']?.value || '');
  formData.append('sup_tot_amont', this.o['sup_tot_amont']?.value || '');
  formData.append('member_type', this.o['member_type']?.value || '');
  formData.append('gurdian', this.o['gurdian']?.value || '');
  formData.append('gen', this.o['gen']?.value || '');
  formData.append('marital_status', this.o['marital_status']?.value || '');
  formData.append('gen_dob', this.o['gen_dob']?.value || '');
  formData.append('memb_oprn', this.o['memb_oprn']?.value || '');
  formData.append('sup_top_flag', sup_top_flag.length > 0 ? sup_top_flag[0].flag : '');
  
  // Send data using FormData
  this.dataServe.global_service(1, '/save_group_policy_form', formData).subscribe(
    data => {
      console.log(data);
      this.groupSaveData = data;
      console.log(this.groupSaveData,'ytytytytyt');
      
      if (this.groupSaveData.suc > 0) {
        this.formNo = this.groupSaveData.form_no;
        this.checkedmember = this.groupSaveData.policy_holder_type == 'true' ? 'M' : 'N';
        Swal.fire(
          'Success! Your form is submitted successfully.',
          `We have been informed! <br> Generated Form No is ${this.formNo}`,
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/home/print_group_policy', encodeURIComponent(btoa(this.formNo)),this.checkedmember]);
          }
        });
      } else {
        Swal.fire(
          'Error',
          'Your form is not submitted successfully!',
          'error'
        );
      }
    },
    error => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
    }
  );
}


getPremiumAmt(event:any){
  console.log(event.target.value);
  var dropVal = event.target.value
  var filter_res_dt = this.responsedata.length > 0 ? (this.responsedata[0].pre_dt.filter((dt:any) => dt.family_type_id == dropVal)) : []
  if(filter_res_dt.length > 0){
    var sup_top_dt = [{name: 'Super Top up Amount 12 lacs', value: filter_res_dt[0].premium2, flag: 'p2'}, {name: 'Super Top up Amount 24 lacs', value: filter_res_dt[0].premium3, flag: 'p3'}]
    this.sup_top_list = sup_top_dt
    this.form.patchValue({pre_amont: filter_res_dt[0].premium1})
  }
  
}

 toggleAdditionalOptions(checked:any) {

  if (checked == 'Y') {
    // this.form.patchValue({
    //   sup_top_up: this.sup_top_list[0]?.value,
    //   sup_pre_amont: this.sup_top_list[0]?.value
    // })
    this.additionalOptions = true;
  } else {
    
    // this.form.patchValue({
    //   sup_top_up: '',
    //   sup_pre_amont: ''
    // })
    this.additionalOptions = false;
     this.form.patchValue({
      sup_top_up: '',
      sup_pre_amont: ''
    })
  }
}

onFileSelected(fileData: any) {
  const { file, flag } = fileData;
  switch (flag) {
    case 'O':
      this.ownFile = file;
      break;
    case 'S':
      this.spouseFile = file;
      break;
    case 'OF':
      this.ownsFiles = file;
      break;
    case 'SF':
      this.spousesFile = file;  
      break;
    default:
      break;
  }
}

// onUpload(event: any, type: string) {
//   const file = event.files[0];
//   this.uploadedFiles.push(file);

//   const reader = new FileReader();
//   reader.onload = () => {
//     this.filePreview[file.name] = reader.result;
//   };
//   reader.readAsDataURL(file);
// }

// onRemove(event: any, type: string) {
//   this.uploadedFiles = this.uploadedFiles.filter(file => file !== event.file);
//   delete this.filePreview[event.file.name];
//   if (this.selectedImage && this.selectedImage === event.file) {
//     this.selectedImage = null;
//     this.displayImageDialog = false;
//   }
// }

// showPreview(image: string | ArrayBuffer | null) {
//   this.selectedImage = image;
//   this.displayImageDialog = true;
// }

onUpload(event: any, flag: any) {
  const file = event.files[0];
  const maxFileSize = 1 * 1024 * 1024; // 1MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  console.log(file,'filee');

  if (file) {
    if (!allowedTypes.includes(file.type)) {
      this.showError('Invalid file type. Only JPG, JPEG, and PNG are allowed.');
      return;
    }

    if (file.size > maxFileSize) {
      this.showError('File size exceeds the limit of 2MB.');
      return;
    }
    
    if(flag == 'O') this.ownFile.push(file);
    if(flag == 'S') this.spouseFile.push(file);
    if(flag == 'OF') this.ownsFiles.push(file);
    if(flag == 'SF') this.spousesFile.push(file);

    this.showSuccess('File uploaded successfully.');
    // this.fileSelected.emit({ file, flag });
  }

  // for (let file of event.files) {
  //   this.uploadedFiles.push(file);
  // }

  // this.messageService.add({
  //   severity: 'info',
  //   summary: 'File Uploaded',
  //   detail: '',
  // });
}

showError(message: string) {
  this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
}

showSuccess(message: string) {
  this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
}

onRemove(event: any, flag: any) {
  console.log(event, 'clear event');
  this.fileSelected.emit({ file: '', flag });
}

convertToUppercase() {
  this.gurdianName = this.gurdianName?.toUpperCase() || '';
  this.memberName = this.memberName?.toUpperCase() || '';
  // this.dependentName = this.dependentName?.toUpperCase() || '';
}

onDependentNameChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = input.value.toUpperCase();
  this.form.get('dependent_name')?.setValue(value, { emitEvent: false });
}

}
