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
  additionalOptions: any = false;
  addOpt:any = 'N';
  groupSaveData: any;

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
    this.get_non_dtls();
    this.getGmpMemberPolicyDetails();

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

  get_non_dtls(){
    this.dataServe
    .global_service(0, '/get_non_premium_dtls', null)
    .subscribe((data: any) => {
      this.responsedata = data;
      console.log(this.responsedata, '555');
      this.responsedata =
        this.responsedata.suc > 0 ? this.responsedata.msg : [];
      this.responsedata[0]['pre_dt'] = this.responsedata
    });
  }

  unit() {
    this.dataServe
      .global_service(0, '/master/unit_list', null)
      .subscribe((data: any) => {
        this.responsedata = data;
        console.log(this.responsedata, '555');
        this.responsedata_unit =
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
  }
}

  getGmpMemberPolicyDetails() {
    this.dataServe
      .global_service(1, '/member_gmp_policy_dtls_view', {form_no: this.form_no,member_id: this.member_id })
      .subscribe(
        (data) => {
          console.log(data, 'kiki');
          this.userData = data;
          // this.userData = this.userData.msg;
          if (this.userData.suc > 0) {
            this.memberData = this.userData.msg[0];
            this.addOpt = this.memberData.premium_dt[0]?.prm_flag2 == 'Y' || this.memberData.premium_dt[0]?.prm_flag3 == 'Y' ? 'Y' : 'N';

            var filter_res_dt = this.responsedata.length > 0 ? (this.responsedata[0].pre_dt.filter((dt:any) => dt.family_type_id == this.memberData.premium_dt[0]?.premium_id)) : []
            if(filter_res_dt.length > 0){
              var sup_top_dt = [{name: 'Super Top up Amount 12 lacs', value: filter_res_dt[0].premium2, flag: 'p2'}, {name: 'Super Top up Amount 24 lacs', value: filter_res_dt[0].premium3, flag: 'p3'}]
              this.sup_top_list = sup_top_dt
              // this.form.patchValue({pre_amont: filter_res_dt[0].premium1})
            }

            var preAmt = this.memberData.premium_dt[0]?.prm_flag2 == 'Y' ? this.memberData.premium_dt[0]?.premium_amt2 : (this.memberData.premium_dt[0]?.prm_flag3 == 'Y' ? this.memberData.premium_dt[0]?.premium_amt3 : 0)

            this.form.patchValue({
              policy_holder: this.memberData?.policy_holder_type== 'M' ? 'BSPWA Member' : this.memberData?.policy_holder_type== 'N' ? 'Member of Other SAIL Association' : '',
              member_id: this.memberData?.member_id,
              member_type: this.memberData?.memb_type== 'G' ? 'General Membership' : this.memberData?.memb_type== 'L' ? 'Life Membership' : this.memberData?.memb_type== 'AI' ? 'Associate Membership' : '',
              unit_nm: this.memberData?.association,
              member: this.memberData?.memb_name,
              gurdian: this.memberData?.father_husband_name,
              gen: this.memberData?.sex,
              marital_status: this.memberData?.marital_status,
              gen_dob: this.memberData?.dob
                ? this.datePipe.transform(this.memberData?.dob, 'yyyy-MM-dd')
                : '',
              memb_oprn: this.memberData?.memb_oprn,
              type_diseases: this.memberData?.disease_flag,
              name_diseases: this.memberData?.disease_type,
              grp_name: this.memberData.premium_dt[0]?.premium_id,
              pre_amont: this.memberData.premium_dt[0]?.premium_amt,
              // super_top_up_yes: this.memberData.premium_dt[0]?.prm_flag2,
              // super_top_up_no: this.memberData.premium_dt[0]?.prm_flag3,
              sup_top_up: preAmt,
              sup_pre_amont: preAmt,
              sup_tot_amont: parseInt(this.memberData.premium_dt[0]?.premium_amt) + parseInt(preAmt),
            });

            for (let dt of this.memberData!.dep_dt) {
              this.depenFields_1.push(
                this.fb.group({
                  sl_no: [dt.sl_no],
                  dependent_name: [dt.dept_name],
                  relation: [dt.relation],
                  dob: [dt?.spou_dob
                    ? this.datePipe.transform(dt?.spou_dob, 'yyyy-MM-dd')
                    : '',],
                  type_diseases: [dt.disease_flag],
                  name_diseases: [dt.disease_type],
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

  save_gmp(){
    var sup_top_flag = this.o['sup_top_up'].value != '' ? this.sup_top_list.filter((dt: any) => dt.value == this.o['sup_top_up'].value) : ''
    var dt = {
        flag: 'GP',
        form_no: this.form_no,
        policy_holder: this.o['policy_holder']? this.o['policy_holder'].value : null,
        unit_nm: this.o['unit_nm']? this.o['unit_nm'].value : null,
        member_id: this.o['member_id'] ? this.o['member_id'].value : null,
        member_type: this.o['member_type'] ? this.o['member_type'].value : null,
        member: this.o['member'] ? this.o['member'].value : null,
        gurdian: this.o['gurdian'] ? this.o['gurdian'].value : null,
        gen: this.o['gen'] ? this.o['gen'].value : null,
        marital_status: this.o['marital_status'] ? this.o['marital_status'].value : null,
        gen_dob: this.o['gen_dob'] ? this.o['gen_dob'].value : null,
        memb_oprn: this.o['memb_oprn'] ? this.o['memb_oprn'].value : null,
        type_diseases: this.o['type_diseases'] ? this.o['type_diseases'].value : null,
        name_diseases: this.o['name_diseases'] ? this.o['name_diseases'].value : null,
        dependent_dt: this.depenFields_1.value,
        grp_name : this.o['grp_name'] ? this.o['grp_name'].value : null,
        pre_amont : this.o['pre_amont'] ? this.o['pre_amont'].value : null,
        sup_top_up : this.o['sup_top_up'] ? this.o['sup_top_up'].value : null,
        sup_pre_amont : this.o['sup_pre_amont'] ? this.o['sup_pre_amont'].value : null,
        sup_tot_amont : this.o['sup_tot_amont'] ? this.o['sup_tot_amont'].value : null,
       
        
        sup_top_flag: sup_top_flag.length > 0 ? sup_top_flag[0].flag : '',
        
    }
    this.dataServe
      .global_service(1, '/update_member_gmp_policy_dtls', dt)
      .subscribe((data) => {
        this.responsedata = data;
        if (this.responsedata.suc > 0) {
          Swal.fire(
            'Success!',
            ` Your form is Updated successfully.`,
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/admin/member_gmp_list']);
            }
          });
        } else {
          Swal.fire('Error', this.responsedata.msg, 'error');
        }
      });
    }
    
  }

