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
      member_id: ['', Validators.required],
      member_type: [''],
      member: [''],
      gurdian: [''],
      gen: [''],
      marital_status: [''],
      gen_dob: [''],
      type_diseases: [''],
      name_diseases: [''],
      // sl_no: [''],
      // dependent_name: [''],
      // relation: [''],
      // dob: [''],
      depenFields_1: this.fb.array([])
    });
  }


get depenFields_1(): FormArray {
    return this.form.get('depenFields_1') as FormArray;
  }

  get o() {
    return this.form.controls;
  }

  submit(){
    var dt = {
      member_id: this.o['member_id'] ? this.o['member_id'].value : null,
    }
    this.dataServe.global_service(0, '/get_member_policy', `member_id=${dt.member_id}`).subscribe((data:any) => {
      this.responsedata = data
      console.log(this.responsedata);
      this.responsedata = this.responsedata.suc > 0 ? this.responsedata.msg : []
      this.formNo = this.responsedata[0].form_no
      console.log(this.responsedata[0].subscription_1)
      this.form.patchValue({
        member_type: this.responsedata[0].mem_type == 'G' ? 'General Membership' : this.responsedata[0].mem_type == 'L' ? 'Life Membership' : 'Associate Membership',
        member: this.responsedata[0].memb_name,
        gurdian: this.responsedata[0].gurdian_name,
        gen: this.responsedata[0].gender == 'M' ? 'Male' : 'Female',
        marital_status: this.responsedata[0].marital_status == 'M' ? 'Married' : this.responsedata[0].marital_status == 'U' ? 'Unmarried' : this.responsedata[0].marital_status == 'W' ? 'Widow' : 'Divorced',
        gen_dob: this.datePipe.transform(this.responsedata[0].dob, 'yyyy-MM-dd'),
      })
      })

      this.getData_dependents()
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
      member_id: this.o['member_id'] ? this.o['member_id'].value : null,
      type_diseases: this.o['type_diseases'] ? this.o['type_diseases'].value : null,
      name_diseases: this.o['name_diseases'] ? this.o['name_diseases'].value : null,
      member: this.o['member'] ? this.o['member'].value : null,
      dependent_dt: this.depenFields_1.value,
      form_no: this.formNo
  }
  this.dataServe.global_service(1, '/save_child_group_policy_form', dt).subscribe(
    data => {
      console.log(data);
      this.groupSaveData = data;
      if (this.groupSaveData.suc > 0) {
        // this.formNo = this.groupSaveData.form_no;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data saved successfully' });
        this.router.navigate(['/main/dashboard']);
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
