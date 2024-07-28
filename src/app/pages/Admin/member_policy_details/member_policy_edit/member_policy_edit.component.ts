import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { ValidatorsService } from 'src/app/service/validators.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

interface UserInfo {
  form_no: string;
  policy_holder: string;
      member_id: string;
      member_type: string;
      unit_nm: string;
      personal_no: string;
      memb_opr: string;
      member: string;
      min_no: string;
      gen_dob: string;
      mobile: string;
      fin_yr: string;
      mem: string;
      spouse: string;
      spouse_min_no: string;
      spou_dob: string;
      spou_mobile: string;
      spou_mem: string;
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
  userData: any;
  responsedata_rel: any
  responsedata_unit: any;
  finYearData:any
  memberData: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataServe: DataService,
    private validatorsService: ValidatorsService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    const encodedFormNo = this.route.snapshot.params['form_no'];
    this.form_no = atob(decodeURIComponent(encodedFormNo));
    this.member_id = this.route.snapshot.params['member_id']

    this.form = this.fb.group({
      form_no: [this.form_no],
      policy_holder: [''],
      member_id: ['', Validators.required],
      member_type: ['', Validators.required],
      unit_nm: ['', Validators.required],
      personal_no: ['', Validators.required],
      memb_opr: ['', Validators.required],
      member: ['', Validators.required],
      min_no: ['', Validators.required],
      gen_dob: ['', Validators.required],
      mobile: ['', Validators.required],
      fin_yr: ['', Validators.required],
      mem: ['', Validators.required],
      spouse: [''],
      spouse_min_no: [''],
      spou_dob: [''],
      spou_mobile: [''],
      spou_mem: [''],
      depenFields_2: this.fb.array([]),
      user: [localStorage.getItem('user_name')],
    });
    this.get_fin_year()
    if(this.depenFields_2.controls.length == 0)
      // this.onadd();
      // this.changedate();

    this.unit();
    this.relationship();
    this.getMemberPolicyDetails();
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

  onadd(sl_no:any = '',ind_type:any = '',fin_year:any = '',particulars:any = '',amount:any = '',treatment_dtls:any = '') {
    // this.phoneNumbers.push('');
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
          ['fin_year','particulars','amount','treatment_dtls']
        ),
      }
    );
    this.depenFields_2.push(fieldGroup);
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
              policy_holder: this.memberData?.policy_holder_type== 'M' ? 'BSPWA Member' : 'Member of Other SAIL Association',
              member_id: this.memberData?.member_id != 'null' ? this.memberData?.member_id : '',
              member_type: this.memberData?.memb_type== 'G' ? 'General Membership' : this.memberData?.memb_type== 'L' ? 'Life Membership' : '',
              memb_opr: this.memberData?.memb_oprn != 'null' ? this.memberData?.memb_oprn : '',
              unit_nm: this.memberData?.association != 'null' ? this.memberData?.association :'',
              member: this.memberData?.memb_name != 'null' ? this.memberData?.memb_name : '',
              gen_dob: this.memberData?.dob != '0000-00-00'
                ? this.datePipe.transform(this.memberData?.dob, 'yyyy-MM-dd')
                : '',
              mobile: this.memberData?.phone_no != 'null' ? this.memberData?.phone_no : '',
              personal_no: this.memberData?.personel_no != 'null' ? this.memberData?.personel_no : '',
              min_no: this.memberData?.min_no != 'null' ? this.memberData?.min_no : '',
              mem: this.memberData?.mem_address != 'null' ? this.memberData?.mem_address : '',
              fin_yr: this.memberData?.fin_yr
              ? this.datePipe.transform(this.memberData?.fin_yr, 'yyyy-MM-dd')
              : '',
              spouse: this.memberData?.dependent_name != 'null' ? this.memberData?.dependent_name : '',
              spouse_min_no: this.memberData?.spou_min_no != 'null' ?  this.memberData?.spou_min_no : '',
              spou_dob: this.memberData?.spou_dob != '0000-00-00'
              ? this.datePipe.transform(this.memberData?.spou_dob, 'yyyy-MM-dd')
              : '',
              spou_mobile: this.memberData?.spou_phone != '0' ? this.memberData?.spou_phone : '',
              spou_mem: this.memberData?.spou_address != 'null' ? this.memberData?.spou_address : '',
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

}
