import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ValidatorsService } from 'src/app/service/validators.service';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';

interface Relationship {
  name: string;
  code: string;
}
interface MemberStatus {
  name: string;
  code: string;
}

@Component({
  selector: 'app-life_membership_form',
  templateUrl: './life_membership_form.component.html',
  styleUrls: ['./life_membership_form.component.css']
})
export class Life_membership_formComponent implements OnInit {
  date!: Date;
  // member!: MemberType[];
  // memberop!: MemberOperation[];
  // unit_id!: unitId[];
  // gender!: Gender[];
  // marital!: Marital[];
  items!: any[];
  // caste!: Caste[];
  value!: string;
  relation!: Relationship[];
  mem_status!: MemberStatus[];
  isReadonly: boolean = true;
  activeIndex: number = 0;
  form!: FormGroup;
  form_1!: FormGroup;
  form_2!: FormGroup;
  form_3!: FormGroup;
  form_4!: FormGroup;
  responsedata: any;
  visible!: boolean;
  genData: any;
  personal_info: any;
  spouse_info: any;
  dependent_info: any;
  img_info: any;
  fee_info: any;
  savedata: any;
  formNo: any = 0;
  depFormHasVal: boolean = false;
  ownFile!: File;
  spouseFile!: File;
  mem_type: any;
  maxDate!: string;

  constructor(private router: Router, private fb: FormBuilder,private route: ActivatedRoute, private dataServe: DataService,private validatorsService: ValidatorsService) { }

  ngOnInit() {
    // Swal.fire(
    //   'Success! Your form is submitted successfully.',
    //   `We have been informed! <br> Generated Form No is 1234`,
    //   'success'
    // )
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();
    this.maxDate = `${year}-${month}-${day}`;
    this.unit();

    this.mem_type = this.route.snapshot.params['mem_type'];


    this.items = [
      {
          label: 'Member Information'
      },
      {
          label: 'Spouse Information'
      },
      {
          label: 'Dependent Information'
      },
      {
        label: 'Upload image'
    },
    {
      label: 'Fee Details'
  },
  ];

  this.form = this.fb.group({
    member_type: [{ value: 'Life Membership', disabled: this.isReadonly }],
    member_opt: ['', Validators.required],
    unit_nm: ['', Validators.required],
    member: ['', Validators.required],
    gurdian: ['', Validators.required],
    gen: ['', Validators.required],
    marital_status: [''],
    gen_dob: ['', Validators.required],
    phone: ['', Validators.required],
    email_id: [''],
    blood: ['', Validators.required],
    caste: [''],
    staff: ['', Validators.required],
    personal: ['', Validators.required],
    min: [''],
    mem: ['', Validators.required],
    city: [''],
    pin: ['', Validators.required],
    police_st: [''],
    form_dt: ['', Validators.required],
  });

    this.form_1 = this.fb.group(
      {
        spou_name: [''],
        spou_gurd_name: [''],
        spou_blood_grp: [''],
        spou_dob: [''],
        // spou_phone: [''],
        spou_mobile_no: [''],
        spou_min_no: [''],
        spou_mem_addr: this.form.get('mem'),
        spou_police_st:this.form.get('police_st'), 
        spou_city: this.form.get('city'),
      },
      {
        validators: this.validatorsService.conditionalRequiredValidator(
          'spou_name',
          [
            'spou_gurd_name',
            'spou_dob',
            'spou_mobile_no',
            'spou_min_no',
            'spou_mem_addr',
          ]
        ),
      }
    );

    this.form_2 = this.fb.group({
      depenFields: this.fb.array([]),
    });


    this.form_3 = this.fb.group({
      own_img: [''],
      spou_img: [''],
    });


  this.form_4 = this.fb.group({
    sub_fee_2: [''],
    sub_fee: [''],
  });
  }

  get f() {
    return this.form.controls;
  }

  get sf() {
    return this.form_1.controls;
  }

  get df() {
    return this.form_2.get('depenFields') as FormArray;
  }

  get ff() {
    return this.form_4.controls;
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
      default:
        break;
    }
  }

  next() {
    switch (this.activeIndex) {
      case 0:
        this.personal_info = {
          flag: 'L',
          form_dt: this.f['form_dt'] ? this.f['form_dt'].value : null,
          member_opt: this.f['member_opt'] ? this.f['member_opt'].value : null,
          unit_nm: this.f['unit_nm'] ? this.f['unit_nm'].value : null,
          member: this.f['member'] ? this.f['member'].value : null,
          gurdian: this.f['gurdian'] ? this.f['gurdian'].value : null,
          gen: this.f['gen'] ? this.f['gen'].value : null,
          marital_status: this.f['marital_status'].value!=''
            ? this.f['marital_status'].value
            : 'N',
          gen_dob: this.f['gen_dob'] ? this.f['gen_dob'].value : null,
          phone: this.f['phone'] ? this.f['phone'].value : null,
          email_id: this.f['email_id'] ? this.f['email_id'].value : null,
          blood: this.f['blood'] ? this.f['blood'].value : null,
          caste: this.f['caste'].value!='' ? this.f['caste'].value : 'O',
          staff: this.f['staff'] ? this.f['staff'].value : null,
          personal: this.f['personal'] ? this.f['personal'].value : null,
          min: this.f['min'] ? this.f['min'].value : null,
          mem: this.f['mem'] ? this.f['mem'].value : null,
          city: this.f['city'] ? this.f['city'].value : null,
          pin: this.f['pin'] ? this.f['pin'].value : null,
          police_st: this.f['police_st'] ? this.f['police_st'].value : null,
        };
        break;
      case 1:
        this.spouse_info = {
          mem_type: 'L',
          dependent_name: this.sf['spou_name']
            ? this.sf['spou_name'].value
            : null,
          gurdian_name: this.sf['spou_gurd_name']
            ? this.sf['spou_gurd_name'].value
            : null,
          blood_grp: this.sf['spou_blood_grp']
            ? this.sf['spou_blood_grp'].value
            : null,
          dob:this.sf['spou_dob'].value != ''? this.sf['spou_dob'].value: '00-00-0000',
          phone_no:  this.sf['spou_mobile_no'].value != '' ? this.sf['spou_mobile_no'].value : '0000000000',
          min_no: this.sf['spou_min_no'] ? this.sf['spou_min_no'].value : null,
          memb_address: this.sf['spou_mem_addr']
            ? this.sf['spou_mem_addr'].value
            : null,
          ps: this.sf['spou_police_st']
            ? this.sf['spou_police_st'].value
            : null,
          city_town_dist: this.sf['spou_city']
            ? this.sf['spou_city'].value
            : null,
          relation: this.personal_info.gen
            ? this.personal_info.gen == 'M'
              ? '3'
              : '15'
            : '15',
          pin_no: '00',
          email_id: null,
          created_by: this.personal_info.member,
          form_no: this.formNo,
        };
        break;
      case 2:
        for (let dt of this.df.value) {
          if (dt.dependent_name) {
            this.depFormHasVal = true;
            break;
          }
        }
        this.dependent_info = {
          di_data: this.df.value,
          mem_type: 'L',
          created_by: this.personal_info.member,
          form_no: this.formNo,
        };
        break;
      case 3:
        const frmDt = new FormData();
        frmDt.append('own_file', this.ownFile);
        frmDt.append('spouse_file', this.spouseFile);
        frmDt.append('created_by', this.personal_info.member);
        // frmDt.append('form_no', this.formNo);
        // frmDt.append('relation', this.spouse_info.relation);
        frmDt.append('mem_type', 'L');
        this.img_info = frmDt;
        break;
      case 4:
        this.fee_info = {
          sub_fee_2: this.f['sub_fee_2']
            ? this.f['sub_fee_2'].value
            : null,
          sub_fee: this.f['sub_fee']
            ? this.f['sub_fee'].value
            : null,
        };
        break;
    }
    // console.log(this.img_info, 'Data');
    // if (this.activeIndex == 1) this.successNotification();
    this.activeIndex++;
  }

  previous() {
    this.activeIndex--;
  }

  successNotification() {
    this.dataServe
      .global_service(1, '/save_life_form', this.personal_info)
      .subscribe((data: any) => {
        this.savedata = data;
        console.log(this.savedata);
        if (this.savedata.suc > 0) {
          this.formNo = this.savedata.form_no;
          if(this.spouse_info.dependent_name){
            this.spouse_info.form_no = this.formNo;
            console.log(this.spouse_info,'spouse');
            
            this.dataServe
              .global_service(1, '/spose_depend_form_save', this.spouse_info)
              .subscribe((dt1: any) => {
                this.savedata = dt1;
                console.log(dt1,'dt1');
                if(this.savedata.suc > 0){
                  if (this.depFormHasVal) {
                    this.dependent_info.form_no = this.formNo;
                    this.dataServe
                      .global_service(1, '/depend_form_save', this.dependent_info)
                      .subscribe((data2: any) => {
                        this.savedata = data2;
                      });
                  }
                  if (this.ownFile || this.spouseFile){
                    this.img_info.append('form_no', this.formNo);
                    this.img_info.append('relation', this.spouse_info.relation);
                    this.dataServe
                      .global_service(1, '/image_form_save', this.img_info)
                      .subscribe((data2: any) => {
                        this.savedata = data2;
                      });
                  }
                }
                
              });
          }else {
            if (this.depFormHasVal) {
              this.dependent_info.form_no = this.formNo;
              this.dataServe
                .global_service(1, '/depend_form_save', this.dependent_info)
                .subscribe((data2: any) => {
                  this.savedata = data2;
                });
            }
            if (this.ownFile || this.spouseFile){
              this.img_info.append('form_no', this.formNo);
              this.img_info.append('relation', this.spouse_info.relation);
              this.dataServe
                .global_service(1, '/image_form_save', this.img_info)
                .subscribe((data2: any) => {
                  this.savedata = data2;
                });
            }
          }
          Swal.fire(
            'Success! Your form is submitted successfully.',
            `Generated Form No is ${this.formNo}`,
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
                    this.router.navigate(['/home/life_form_print',encodeURIComponent(btoa(this.formNo))])
                  }
                });
          // this.router.navigate(['/admin/print_form'])
        } else {
          Swal.fire(
            'Error',
            'Your form is not submitted successfully!',
            'error'
          );
        }
      });
  }
  
    unit() {
      this.dataServe.global_service(0, '/master/unit_list', null).subscribe((data:any) => {
        this.responsedata = data
        console.log(this.responsedata);
        this.responsedata = this.responsedata.suc > 0 ? this.responsedata.msg : []
        })
    
    }

}
