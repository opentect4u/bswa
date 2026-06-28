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
  selector: 'app-children_policy',
  templateUrl: './children_policy.component.html',
  styleUrls: ['./children_policy.component.css'],
  providers: [MessageService,DatePipe],
})
export class Children_policyComponent implements OnInit {
  value!: string;
  date!: Date;
  mem_status!: MemberStatus[];
  isReadonly: boolean = true;
  form!: FormGroup;
  mem_type: any;
  responsedata: any;
  userData: any;
  phoneNumbers: string[] = [];
  responsedata_rel: any;
  depenFields: any;
  groupSaveData: any;
  user: any;
  formNo: any = 0;
  showDiseaseInput =  false;
  checkedmember: any  = false
  isMember: boolean = true;
  responsedata_unit: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataServe: DataService,
    private validatorsService: ValidatorsService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.mem_type = this.route.snapshot.params['mem_type'];
    this.user = localStorage.setItem
    this.form = this.fb.group({
      member_id: [''],
      // unit: [''],
      // member_type: [''],
      member_name: [''],
      gender: [''],
      marital_status: [''],
      dob: [''],
      age: [''],
      gurdian_name: [''],
      type_diseases: [''],
      phone_no: ['',  Validators.required],
      name_diseases: [''],
      memb_treatment_dtls: [''],
      memb_treatment_flag: [''],
      member_address: [''],
      // sl_no: [''],
      // dependent_name: [''],
      // relation: [''],
      // dob: [''],
      depenFields_1: this.fb.array([])
    });

    // this.form.get('type_diseases')?.valueChanges.subscribe(value => {
    //   this.onDiseaseChange(value);
    // });
    // this.unit();
  //  this.relationship();
  }


get depenFields_1(): FormArray {
    return this.form.get('depenFields_1') as FormArray;
  }

  get o() {
    return this.form.controls;
  }

  // onPolicyHolderTypeChange(isMember: any) {
  //   this.form.reset()
  //   this.depenFields_1.clear()
  //   if(isMember === 'M'){
  //     this.checkedmember = true;
  //     this.unit()
  //     this.relationship()
  //   }else{
  //     this.checkedmember = false;
  //     this.unit()
  //     this.relationship()
  //   }
  // }

  
  // unit() {
  //   this.dataServe
  //     .global_service(0, '/master/unit_list', null)
  //     .subscribe((data: any) => {
  //       this.responsedata_unit = data;
  //       console.log(this.responsedata_unit, '555');
  //       this.responsedata_unit =
  //         this.responsedata_unit.suc > 0 ? this.responsedata_unit.msg : [];
  //     });
  // }

  // relationship() {
  //   this.dataServe
  //     .global_service(0, '/master/relationship_list', null)
  //     .subscribe((data: any) => {
  //       this.responsedata_rel = data;
  //       console.log(this.responsedata_rel);
  //       this.responsedata_rel =
  //         this.responsedata_rel.suc > 0 ? this.responsedata_rel.msg : [];
  //     });
  // }

  // onDiseaseChange(value: string) {
  //   this.showDiseaseInput = value === 'Y';
  //   if (!this.showDiseaseInput) {
  //     this.form.get('name_diseases')?.reset();
  //   }
  // }

  submit(){
    var dt = {
      member_id: this.o['member_id'] ? this.o['member_id'].value : null,
    }
    this.dataServe.global_service(1, '/fetch_member_dtls_bspwa', dt).subscribe((data:any) => {
      if (data.suc > 0 && data.member?.length > 0) {

        const member = data.member[0];   // ✅ extract member
        const dependents = data.dependents || [];

      this.formNo = member.form_no
      // console.log(this.responsedata[0].subscription_1)
      this.form.patchValue({
        member_name: member.memb_name,
        gurdian_name: member.gurdian_name,
        gender: member.gender == 'M' ? 'Male' : 'Female',
        marital_status: member.marital_status == 'M' ? 'Married' : member.marital_status == 'U' ? 'Unmarried' : member.marital_status == 'W' ? 'Widow' : 'Divorced',
        dob: this.datePipe.transform(member.dob, 'yyyy-MM-dd'),
        age: member.age,
        phone_no: member.phone_no,
        member_address: member.memb_address,
        marital_status_code: member.marital_status,
      });
      // this.dependentsList = dependents;
      this.getData_dependents()

    }
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
      this.onadd(dt.sl_no,dt.dependent_name,dt.relation_name,dt.dob,'','');
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

onadd(sl_no:any,dependent_name:any,relation:any,dob:any,type_diseases:any,name_diseases:any) {
  const formattedDob = this.datePipe.transform(dob, 'yyyy-MM-dd');
  const fieldGroup = this.fb.group(
    {
      sl_no: [sl_no],
      dependent_name: [dependent_name],
      relation: [relation],
      dob: [formattedDob],
      type_diseases: [type_diseases],
      name_diseases: [name_diseases]
    },
    {
      validators: this.validatorsService.conditionalRequiredValidator(
        'dependent_name',
        ['phone_no', 'relation']
      ),
    }
  );
  this.depenFields_1.push(fieldGroup);
  // console.log(this.depenFields.controls, 'ADD');
}

final_submit(){
  var dt = {
      flag: 'CP',
      form_no: this.formNo,
      member_id: this.o['member_id'] ? this.o['member_id'].value : null,
      member_name: this.o['member_name'] ? this.o['member_name'].value : null,
      dob: this.o['dob'] ? this.o['dob'].value : null,
      gender: this.o['gender'] ? this.o['gender'].value : null,
      marital_status: this.o['marital_status_code'] ? this.o['marital_status_code'].value : null,
      age: this.o['age'] ? this.o['age'].value : null,
      phone_no: this.o['phone_no'] ? this.o['phone_no'].value : null,
      member_address: this.o['member_address'] ? this.o['member_address'].value : null,
      gurdian_name: this.o['gurdian_name'] ? this.o['gurdian_name'].value : null,
      type_diseases: this.o['type_diseases'] ? this.o['type_diseases'].value : null,
      name_diseases: this.o['name_diseases'] ? this.o['name_diseases'].value : null,
      dependent_dt: this.depenFields_1.value,
  }
  this.dataServe.global_service(1, '/save_children_policy', dt).subscribe(
    data => {
      console.log(data);
      this.groupSaveData = data;
      if (this.groupSaveData.suc > 0) {
        // this.formNo = this.groupSaveData.form_no;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data saved successfully' });
        this.router.navigate(['/home/insurance_form_home']);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save data' });
      }
    },
    error => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
    }
  );
}
}
