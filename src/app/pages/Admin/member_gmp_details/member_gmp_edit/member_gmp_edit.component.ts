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
  selector: 'app-member_gmp_edit',
  templateUrl: './member_gmp_edit.component.html',
  styleUrls: ['./member_gmp_edit.component.css'],
  providers: [DatePipe, MessageService],
})
export class Member_gmp_editComponent implements OnInit {
  form_no: any;
  member_id: any;
  form!: FormGroup;
  responsedata: any;
  userData: any;
  responsedata_rel: any
  responsedata_unit: any;
  finYearData:any
  memberData: any;
  policy_holder_type: any
  sup_top_list: any = [];
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
      member: ['', Validators.required],
      gurdian: ['', Validators.required],
      gen: ['', Validators.required],
      marital_status: ['', Validators.required],
      gen_dob: ['', Validators.required],
      memb_oprn: ['', Validators.required],
      type_diseases: [''],
      name_diseases: [''],
      grp_name: [''],
      pre_amont: [''],
      sup_top_up: [''],
      sup_pre_amont: [''],
      sup_tot_amont: [''],
      policy_holder_type: [''],
      depenFields_1: this.fb.array([]),
      user: [localStorage.getItem('user_name')],
    });

    this.unit();
    this.relationship();

    this.form.valueChanges.subscribe(() => {
      this.calculateTotalAmount();
    });
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

  calculateTotalAmount(): number {
    const supTopUp = parseFloat(this.form.get('sup_top_up')?.value) || 0;
    const preAmont = parseFloat(this.form.get('pre_amont')?.value) || 0;
    return supTopUp + preAmont;
  }

  onadd(sl_no:any = '',dependent_name:any = '',relation:any = '',dob:any = '',type_diseases:any = '',name_diseases:any = '', relation_id:any = '') {
    const formattedDob = this.datePipe.transform(dob, 'yyyy-MM-dd');
    const fieldGroup = this.fb.group(
      {
        sl_no: [sl_no],
        dependent_name: [dependent_name],
        relation_name: [relation],
        dob: [formattedDob],
        type_diseases: [type_diseases],
        name_diseases: [name_diseases],
        relation: [relation_id]
      },
      {
        validators: this.validatorsService.conditionalRequiredValidator(
          'dependent_name', 
          ['dob', 'relation_name','type_diseases','name_diseases']
        ),
      }
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

}
