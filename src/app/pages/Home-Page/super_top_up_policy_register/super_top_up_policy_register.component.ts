import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ValidatorsService } from 'src/app/service/validators.service';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

interface MemberStatus {
  name: string;
  code: string;
}

@Component({
  selector: 'app-super_top_up_policy_register',
  templateUrl: './super_top_up_policy_register.component.html',
  styleUrls: ['./super_top_up_policy_register.component.css'],
  providers: [DatePipe,MessageService],
})
export class Super_top_up_policy_registerComponent implements OnInit {
  memb_opr: string = 'D';
  value!: string;
  date!: Date;
  mem_status!: MemberStatus[];
  isReadonly: boolean = true;
  form!: FormGroup;
  mem_type: any;
  user: any;
  responsedata: any;
  formNo: any = 0;
  phoneNumbers: string[] = [];
  groupSaveData: any;
  responsedata_1: any;
  finYearData:any
  member_dt: any;
  member_id: any;
  checkedmember: any  = false
  responsedata_unit: any;
  premium_stp: any;
  responsedata_rel: any;
  policy_holder_type: any

  selectedValue: string = 'N' ;
  selectedValue2: string = 'N';
  selectedValue3: string = 'N';
  selectedValue_4: string = 'NP';
  userData: any;
  maxDate!: string;

  inputValue: string = '';
  errorMessage: string = '';

  spouseName: string = '';
  memberName: string = '';
 statusOptions = [
  { label: 'SELF', value: 'S' },
  { label: 'SPOUSE', value: 'P' }
  ];
  addClickCount = 0;
  showPremiumSection = true;



  filteredStatusOptions: any[] = []; // to avoid undefined error

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataServe: DataService,
    private validatorsService: ValidatorsService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();
    this.maxDate = `${year}-${month}-${day}`;

    this.mem_type = this.route.snapshot.params['mem_type'];
    this.member_id = this.route.snapshot.params['member_id'];
    this.form = this.fb.group({
      min_no: ['', Validators.required],
      member_type: [''],
      unit_name: [''],
      personal_no: [''],
      memb_opr: [''],
      member: [''],
      member_id: [''],
      gen_dob: [''],
      mobile: [''],
      fin_yr: [''],
      mem: [''],
      spouse: [''],
      spouse_min_no: [''],
      spou_dob: [''],
      spou_mobile: [''],
      spou_mem: [''],
      depenFields_2: this.fb.array([]),
      form_dt: ['', Validators.required],
      policy_holder_type: ['', Validators.required],
      premium_type: [''], 
      premium_amt: [''],
      total_amt: ['']
    });
    this.get_fin_year()
    if(this.depenFields_2.controls.length == 0)
      this.onadd();
      this.unit()
      this.relationship()
      // this.selectedValue3 = 'N'; 
      this.onMemberOperationChange();
  }
  ngAfterViewInit(): void {
    this.selectedValue3='N'
  }

onMemberOperationChange(event?: any) {
  let value = event?.target?.value ?? this.selectedValue3;
  this.selectedValue3 = value;

    // Reset fields
  this.form.get('ind_type')?.setValue('');
  this.form.get('premium_type')?.setValue('');
  this.form.get('premium_amt')?.setValue('');
  this.form.get('total_amt')?.setValue('');

  // Show premium section if Single or Double is selected
  this.showPremiumSection = value === 'S' || value === 'D';

  // Filter status options and fetch premium
  if (value === 'S') {
    this.filteredStatusOptions = this.statusOptions.filter(opt => opt.value === 'S');
    this.getPremiumDetails();
  } else if (value === 'D') {
    this.filteredStatusOptions = [...this.statusOptions];
    this.getPremiumDetails();
  } else {
    this.filteredStatusOptions = [];
  }
}

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


  get depenFields_2(): FormArray {
    return this.form.get('depenFields_2') as FormArray;
  }

  get o() {
    return this.form.controls;
  }


  // submit(){
  //     var dt = {
  //       min_no: this.o['min_no'] ? this.o['min_no'].value : null,
  //     };
  //     this.dataServe.global_service(0, '/get_member_policy_super', `min_no=${dt.min_no}`).subscribe((data:any) => {
  //       this.responsedata = data
  //       console.log(this.responsedata);
  //       if(this.responsedata.suc == 3){
  //         Swal.fire(
  //           'Warning',
  //           'This MIN NO already exists in STP Policy',
  //           'warning'
  //         ).then((result) => {
  //           if (result.isConfirmed) {
  //             this.form.reset()
  //           }
  //         });
  //         } else if (this.responsedata.suc > 0 && this.responsedata.suc < 2){
  //           this.responsedata = this.responsedata.suc > 0 ? this.responsedata.msg : []
  //           this.formNo = this.responsedata[0]?.form_no
  //           console.log(this.responsedata[0].subscription_1)
  
  //         if(this.responsedata[0].spou_dt && this.responsedata[0].spou_dt.length > 0){
  //           this.form.patchValue({
  //             member_type: this.responsedata[0].mem_type,
  //             unit_name: this.responsedata[0].unit_id,
  //             personal_no: this.responsedata[0].pers_no,
  //             memb_opr: this.responsedata[0].memb_oprn,
  //             member: this.responsedata[0].memb_name,
  //             min_no: this.responsedata[0].min_no,
  //             gen_dob: this.responsedata[0].dob !== '0000-00-00 00:00:00' ? this.datePipe.transform(this.responsedata[0].dob, 'yyyy-MM-dd') : '',
  //             mobile: this.responsedata[0].phone_no,
  //             mem: this.responsedata[0].memb_address,
  //             spouse: this.responsedata[0]!.spou_dt[0].dependent_name,
  //           spouse_min_no: this.responsedata[0]!.spou_dt[0].spou_min,
  //           spou_dob: this.responsedata[0]!.spou_dt[0].spou_db !== '0000-00-00 00:00:00' ? this.datePipe.transform(this.responsedata[0]!.spou_dt[0].spou_db, 'yyyy-MM-dd') : '',
  //           spou_mobile: this.responsedata[0]!.spou_dt[0].spou_phone,
  //           spou_mem: this.responsedata[0]!.spou_dt[0].spou_address,
  //           })
  //         }
  //       }else {
  //         Swal.fire(
  //           'Error',
  //           'Member Details Not Found',
  //           'error'
  //         ).then((result) => {
  //           if (result.isConfirmed) {
  //             this.form.reset()
  //           }
  //         });
  //       }
  //     });
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

  // onPolicyHolderTypeChange(isMember: any) {
  
  //   this.form.reset()
    
  //   // this.depenFields_2.clear()
    
  //   if(isMember === 'M'){
  //     this.checkedmember = true;
  //     this.unit()
  //     this.relationship()
  //   }else{
      
  //     this.checkedmember = false;
      
  //     // this.onadd()
  //     // this.get_non_dtls()
  //     this.unit()
  //     this.relationship()
  //   }
  //   this.selectedValue = 'N';
  //   this.selectedValue2 = 'N';
  //   this.selectedValue3 = 'N';
  //   this.selectedValue_4 = 'NP';
  // }


  // onadd(sl_no:any = '',ind_type:any = '',fin_year:any = '',particulars:any = '',amount:any = '',treatment_dtls:any = '') {
  //   // this.phoneNumbers.push('');
  //   const fieldGroup = this.fb.group(
  //     {
  //       sl_no: [sl_no],
  //       ind_type: [ind_type],
  //       fin_year: [fin_year],
  //       particulars: [particulars],
  //       amount: [amount],
  //       treatment_dtls: [treatment_dtls],
  //     },
  //     {
  //       validators: this.validatorsService.conditionalRequiredValidator(
  //         'ind_type',
  //         ['fin_year','particulars','amount','treatment_dtls']
  //       ),
  //     }
  //   );
  //   this.depenFields_2.push(fieldGroup);
  // }

onadd(sl_no: any = '', ind_type: any = '', fin_year: any = '', particulars: any = '', amount: any = '', treatment_dtls: any = '') {
  const operation = this.form.get('memb_opr')?.value; // get selected member operation

  // Limit checks
  if (operation === 'S' && this.addClickCount >= 2) {
    alert('You can only add dependents 2 times for Single operation.');
    return;
  }

  if (operation === 'D' && this.addClickCount >= 4) {
    alert('You can only add dependents 4 times for Double operation.');
    return;
  }

  // Create and add a new FormGroup
  const fieldGroup = this.fb.group(
    {
      sl_no: [sl_no],
      ind_type: [ind_type],
      fin_year: [fin_year],
      particulars: [particulars],
      amount: [amount],
      treatment_dtls: [treatment_dtls],
    },
    {
      validators: this.validatorsService.conditionalRequiredValidator(
        'ind_type',
        ['fin_year', 'particulars', 'amount', 'treatment_dtls']
      ),
    }
  );

  this.depenFields_2.push(fieldGroup);
  this.addClickCount++;
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
        this.depenFields_2.removeAt(index);
        Swal.fire({
          title: 'Deleted!',
          text: 'Row has been deleted.',
          icon: 'success',
        });
      }
    });
  }

  final_submit(){
    var dt = {
        flag: 'STP',
        form_dt: this.o['form_dt'] ? this.o['form_dt'].value : null,
        policy_holder_type: this.o['policy_holder_type']? this.o['policy_holder_type'].value : 'N',
        min_no: this.o['min_no'] ? this.o['min_no'].value : null,
        member_type: this.o['member_type'] ? this.o['member_type'].value : null,
        unit: this.o['unit_name']? this.o['unit_name'].value : null,
        personal_no: this.o['personal_no'] ? this.o['personal_no'].value : null,
        memb_oprn: this.o['memb_opr'] ? this.o['memb_opr'].value : null,
        member: this.o['member'] ? this.o['member'].value : null,
        member_id: this.o['member_id'] ? this.o['member_id'].value : null,
        gen_dob: this.o['gen_dob'] ? this.o['gen_dob'].value : null,
        phone_no: this.o['mobile'] ? this.o['mobile'].value : null,
        fin_yr: this.o['fin_yr'] ? this.o['fin_yr'].value : null,
        mem: this.o['mem'] ? this.o['mem'].value : null,
        spouse: this.o['spouse'] ? this.o['spouse'].value : null,
        spouse_min_no: this.o['spouse_min_no'] ? this.o['spouse_min_no'].value : null,
        spou_dob: this.o['spou_dob'] ? this.o['spou_dob'].value : null,
        spou_mobile: this.o['spou_mobile'] ? this.o['spou_mobile'].value : null,
        spou_mem: this.o['spou_mem'] ? this.o['spou_mem'].value : null,
        dependent_dt: this.depenFields_2.value,
        premium_type: this.o['premium_type'] ?.value === 'Single' ? 'S' : 'D',
        premium_amt: this.o['premium_amt'] ? this.o['premium_amt'].value : null,
        total_amt: this.o['total_amt'] ? this.o['total_amt'].value : null,
        // form_no: this.formNo
    }
    this.dataServe.global_service(1, '/save_super_policy_form', dt).subscribe(
      data => {
        console.log(data);
        this.groupSaveData = data;
        console.log(this.groupSaveData,'data');
        
        if (this.groupSaveData && this.groupSaveData.suc > 0) {
          this.formNo = this.groupSaveData.form_no;
          this.checkedmember = this.groupSaveData.policy_holder_type;
          // this.checkedmember = this.groupSaveData.policy_holder_type == 'true' ? 'M' : 'N';
          // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data saved successfully' });
          // this.router.navigate(['/main/dashboard']);
          Swal.fire(
            'Success! Your form is submitted successfully.',
            `We have been informed! <br> Generated Form No is ${this.formNo}`,
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
                    this.router.navigate(['/home/print_stp_form',encodeURIComponent(btoa(this.formNo)),this.checkedmember])
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

get_fin_year(){
  this.dataServe.global_service(0, '/get_date', null).subscribe(
    data => {
      console.log(data);
      this.finYearData = data;
      this.finYearData = this.finYearData.suc > 0 ? this.finYearData.msg : {}
    }
  );
}

convertToUppercase() {
  this.spouseName = this.spouseName?.toUpperCase() || '';
  this.memberName = this.memberName?.toUpperCase() || '';
  // this.dependentName = this.dependentName?.toUpperCase() || '';
}

}
