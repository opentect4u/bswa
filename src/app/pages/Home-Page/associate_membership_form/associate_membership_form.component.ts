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
  selector: 'app-associate_membership_form',
  templateUrl: './associate_membership_form.component.html',
  styleUrls: ['./associate_membership_form.component.css']
})
export class Associate_membership_formComponent implements OnInit {
  date!: Date;
  items!: any[];
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

  constructor(private router: Router, private fb: FormBuilder,private route: ActivatedRoute, private dataServe: DataService,private validatorsService: ValidatorsService) { }

  ngOnInit() {
    this.mem_type = this.route.snapshot.params['mem_type'];


    this.items = [
      {
          label: 'Member Information'
      },
      {
          label: 'Introducer Information'
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
    member_type: [{ value: 'Associate Membership', disabled: this.isReadonly }],
    member: ['', Validators.required],
    gurdian: ['', Validators.required],
    gen: ['', Validators.required],
    marital_status: [''],
    gen_dob: ['', Validators.required],
    phone: ['', Validators.required],
    email_id: [''],
    caste: [''],
    mem: ['', Validators.required],
    city: [''],
    pin: ['', Validators.required],
    police_st: [''],
  });

  this.form_1 = this.fb.group({
    intro_name: ['', Validators.required],
    mem_no: ['', Validators.required],
    relation: ['',  Validators.required],
  });

  this.form_2 = this.fb.group({
      depenFields: this.fb.array([]),
    });

    this.form_3 = this.fb.group({
      own_img: [''],
      spou_img: [''],
    });

  this.form_4 = this.fb.group({
    adm_fee: [''],
    one_subs: [''],
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
          flag: 'AI',
          member: this.f['member'] ? this.f['member'].value : null,
          gurdian: this.f['gurdian'] ? this.f['gurdian'].value : null,
          gen: this.f['gen'] ? this.f['gen'].value : null,
          marital_status: this.f['marital_status'].value!=''
            ? this.f['marital_status'].value
            : 'N',
          gen_dob: this.f['gen_dob'] ? this.f['gen_dob'].value : null,
          phone: this.f['phone'] ? this.f['phone'].value : null,
          email_id: this.f['email_id'] ? this.f['email_id'].value : null,
          caste: this.f['caste'].value!='' ? this.f['caste'].value : 'O',
          mem: this.f['mem'] ? this.f['mem'].value : null,
          city: this.f['city'] ? this.f['city'].value : null,
          pin: this.f['pin'] ? this.f['pin'].value : null,
          police_st: this.f['police_st'] ? this.f['police_st'].value : null,
        };
        break;
      case 1:
        this.spouse_info = {
          mem_type: 'AI',
          dependent_name: this.sf['intro_name']
            ? this.sf['intro_name'].value
            : null,
          intro_member_id: this.sf['mem_no']
             ? this.sf['mem_no'].value
             : null,
          relation: this.sf['relation']
             ? this.sf['relation'].value
             : null,
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
          mem_type: 'AI',
          created_by: this.personal_info.member,
          form_no: this.formNo,
        };
        break;
      case 3:
        const frmDt = new FormData();
        frmDt.append('own_file', this.ownFile);
        frmDt.append('spouse_file', this.spouseFile);
        frmDt.append('created_by', this.personal_info.member);
        frmDt.append('mem_type', 'AI');
        this.img_info = frmDt;
        break;
      case 4:
        this.fee_info = {
          adm_fee: this.f['adm_fee']
            ? this.f['adm_fee'].value
            : null,
          one_subs: this.f['one_subs']
            ? this.f['one_subs'].value
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
      .global_service(1, '/save_associate_form', this.personal_info)
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
                  if (this.ownFile){
                    this.img_info.append('form_no', this.formNo);
                    // this.img_info.append('relation', this.spouse_info.relation);
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
                    this.router.navigate(['/home/associate_form_print',encodeURIComponent(btoa(this.formNo))])
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

}
