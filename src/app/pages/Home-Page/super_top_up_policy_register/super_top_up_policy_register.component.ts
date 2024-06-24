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
  providers: [DatePipe],
})
export class Super_top_up_policy_registerComponent implements OnInit {
  memb_opr: string = 'J';
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
  // member_id: any;
  // member_id: any;
  checkedmember: any  = false
  responsedata_unit: any;
  responsedata_rel: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataServe: DataService,
    private validatorsService: ValidatorsService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.mem_type = this.route.snapshot.params['mem_type'];
    this.member_id = this.route.snapshot.params['member_id'];
    this.form = this.fb.group({
      member_id: ['', Validators.required],
      member_type: [''],
      unit_name: [''],
      personal_no: [''],
      memb_opr: [''],
      member: [''],
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
      depenFields_2: this.fb.array([])

    });
    this.get_fin_year()
    if(this.depenFields_2.controls.length == 0)
      this.onadd();
      // this.changedate();
  }

  get depenFields_2(): FormArray {
    return this.form.get('depenFields_2') as FormArray;
  }

  get o() {
    return this.form.controls;
  }


  submit(){
    var dt = {
      member_id: this.o['member_id'] ? this.o['member_id'].value : null,
    }
    // this.dataServe.global_service(0, '/check_member_id', `member_id=${dt.member_id}`).subscribe((data:any) =>{
    //   this.member_dt = data
    //   if (this.member_dt.suc > 0){
    //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Member ID already exists' });
    //   } else {
        
    //   }
    // })
    this.dataServe.global_service(0, '/get_member_policy_super', `member_id=${dt.member_id}`).subscribe((data:any) => {
      this.responsedata = data
      console.log(this.responsedata);
      this.responsedata = this.responsedata.suc > 0 ? this.responsedata.msg : []
      this.formNo = this.responsedata[0].form_no
      console.log(this.responsedata[0].subscription_1)
      this.form.patchValue({
        member_type: this.responsedata[0].mem_type == 'G' ? 'General Membership' : 'Life Membership',
        unit_name: this.responsedata[0].unit_name,
        personal_no: this.responsedata[0].pers_no,
        memb_opr: this.responsedata[0].memb_oprn == 'J' ? 'Joint' : 'Self',
        member: this.responsedata[0].memb_name,
        min_no: this.responsedata[0].min_no,
        gen_dob: this.datePipe.transform(this.responsedata[0].dob, 'yyyy-MM-dd'),
        mobile: this.responsedata[0].phone_no,
        // topup_year: this.responsedata[0].gurdian_name,
        mem: this.responsedata[0].memb_address,
        spouse: this.responsedata[0].dependent_name,
        spouse_min_no: this.responsedata[0].spou_min,
        spou_dob: this.datePipe.transform(this.responsedata[0].spou_db, 'yyyy-MM-dd'),
        spou_mobile: this.responsedata[0].spou_phone,
        spou_mem: this.responsedata[0].spou_address,   })
      })

  }

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

  onPolicyHolderTypeChange(isMember: any) {
    this.form.reset()
    // this.depenFields_2.clear()
    if(isMember === 'M'){
      this.checkedmember = true;
    }else{

      this.checkedmember = false;
      // this.onadd()
      // this.get_non_dtls()
      this.unit()
      this.relationship()
    }
  }


  onadd() {
    // this.phoneNumbers.push('');
    const fieldGroup = this.fb.group(
      {
        ind_type: [null],
        fin_year: [null],
        particulars: [null],
        amount: [null],
        treatment_dtls: [null],
      },
    );
    this.depenFields_2.insert(0, fieldGroup);
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
        checkedmember: this.checkedmember,
        unit: this.o['unit_name']? this.o['unit_name'].value : null,
        member_id: this.o['member_id'] ? this.o['member_id'].value : null,
        member: this.o['member'] ? this.o['member'].value : null,
        fin_yr: this.o['fin_yr'] ? this.o['fin_yr'].value : null,
        member_type: this.o['member_type'] ? this.o['member_type'].value : null,
        personal_no: this.o['personal_no'] ? this.o['personal_no'].value : null,
        min_no: this.o['min_no'] ? this.o['min_no'].value : null,
        gen_dob: this.o['gen_dob'] ? this.o['gen_dob'].value : null,
        memb_oprn: this.o['memb_opr'] ? this.o['memb_opr'].value : null,
        mem: this.o['mem'] ? this.o['mem'].value : null,
        phone_no: this.o['mobile'] ? this.o['mobile'].value : null,
        spouse: this.o['spouse'] ? this.o['spouse'].value : null,
        spouse_min_no: this.o['spouse_min_no'] ? this.o['spouse_min_no'].value : null,
        spou_dob: this.o['spou_dob'] ? this.o['spou_dob'].value : null,
        spou_mobile: this.o['spou_mobile'] ? this.o['spou_mobile'].value : null,
        spou_mem: this.o['spou_mem'] ? this.o['spou_mem'].value : null,
        dependent_dt: this.depenFields_2.value,

        // form_no: this.formNo
    }
    this.dataServe.global_service(1, '/save_super_policy_form', dt).subscribe(
      data => {
        console.log(data);
        this.groupSaveData = data;
        console.log(this.groupSaveData,'data');
        
        if (this.groupSaveData.suc > 0) {
          this.formNo = this.groupSaveData.form_no;
          // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data saved successfully' });
          // this.router.navigate(['/main/dashboard']);
          Swal.fire(
            'Success! Your form is submitted successfully.',
            `We have been informed! <br> Generated Form No is ${this.formNo}`,
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
                    this.router.navigate(['/home/print_stp_form',encodeURIComponent(btoa(this.formNo))])
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

}
