import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { ValidatorsService } from 'src/app/service/validators.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member_policy_edit',
  templateUrl: './member_policy_edit.component.html',
  styleUrls: ['./member_policy_edit.component.css'],
  providers: [DatePipe, MessageService],
})
export class Member_policy_editComponent implements OnInit {
  form_no: any;

  form!: FormGroup;
  responsedata: any;
  userData: any;
  responsedata_rel: any
  responsedata_unit: any;
  finYearData:any
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

    this.form = this.fb.group({
      form_no: [this.form_no],
      member_id: ['', Validators.required],
      member_type: ['', Validators.required],
      unit_name: ['', Validators.required],
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
      depenFields_2: this.fb.array([])
    });
    this.get_fin_year()
    if(this.depenFields_2.controls.length == 0)
      this.onadd();
      // this.changedate();

    this.unit();
    this.relationship();
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

  onadd(ind_type:any = '',fin_year:any = '',particulars:any = '',amount:any = '',treatment_dtls:any = '') {
    // this.phoneNumbers.push('');
    const fieldGroup = this.fb.group(
      {
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

}
