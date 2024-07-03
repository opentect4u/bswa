import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { MessageService } from 'primeng/api/messageservice';
import { DataService } from 'src/app/service/data.service';
import { ValidatorsService } from 'src/app/service/validators.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

interface UserInfo {
  form_no: string;
  form_dt: string;
  member_id: string;
  mem_dt: string;
  mem_type: string;
  memb_oprn: string;
  memb_name: string;
  unit_id: string;
  gurdian_name: string;
  gender: string;
  marital_status: string;
  dob: string;
  blood_grp: string;
  caste: string;
  staff_nos: string;
  pers_no: string;
  min_no: string;
  memb_address: string;
  ps: string;
  city_town_dist: string;
  pin_no: string;
  phone_no: string;
  email_id: string;
  memb_pic: string;
  memb_status: string;
  remarks: string;
  resolution_no: string;
  resolution_dt: string;
  spou_dt: DepInfo;
  dep_dt: [DepInfo];
}

interface DepInfo {
  form_no: string;
  sl_no: string;
  member_id: string;
  mem_type: string;
  dependent_dt: string;
  dependent_name: string;
  gurdian_name: string;
  relation: string;
  min_no: string;
  dob: string;
  blood_grp: string;
  memb_address: string;
  ps: string;
  city_town_dist: string;
  pin_no: string;
  phone_no: string;
  email_id: string;
  memb_pic: string;
  intro_member_id: string;
  dept_status: string;
  grp_status: string;
  grp_no: string;
  stp_status: string;
  stp_no: string;
  relation_intro: string;
  intro_name: string;
  dependent_name_dep: string;
  dob_dep: string;
  relation_dep: string;
}

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
  providers: [DatePipe, MessageService],
})
export class MemberEditComponent implements OnInit {
  form_no: any;

  form!: FormGroup;
  responsedata: any;
  userData: any;

  memberData: UserInfo | any;
  responsedata_rel: any;
  uploadedFiles: any[] = [];
  spouseFile: any = null
  memFile: any = null

  api_url = environment.api_url
  spouseFileName: any = null;
  memFileName: any = null;


  mem_type: any;
  memberData_intro: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataServe: DataService,
    private validatorsService: ValidatorsService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    const encodedFormNo = this.route.snapshot.params['form_no'];
    // this.form_no = ato b(decodeURIComponent(encodedFormNo));
    this.form_no = atob(decodeURIComponent(encodedFormNo));

    this.form = this.fb.group({
      form_no: [this.form_no],
      member_type: [{ value: 'Genaral Membership', disabled: true }],
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
      spouse_fr: this.fb.group({
        spou_name: [''],
        spou_gurd_name: [''],
        spou_blood_grp: [''],
        spou_dob: [''],
        // spou_phone: [''],
        spou_mobile_no: [''],
        spou_min_no: [''],
        spou_mem_addr: [''],
        spou_police_st: [''],
        spou_city: [''],
        sl_no: [0],
      }),
      depenFields: this.fb.array([]),
      mem_id: [''],
      // depenFields_intro: this.fb.array([]),
      user: [localStorage.getItem('user_name')],
      mem_type: [''],
      intro_fr: this.fb.group({
        intro_member_id: [''],
        intro_name: [''],
        relation_intro: [''],
      }),
    });

    this.unit();
    this.relationship();
    this.getMemberDetails();
  }

  get f() {
    return this.form.controls;
  }

  get depenFields(): FormArray {
    // console.log((<FormArray>this.form.get('depenFields')).controls, 'GET');
    return this.form.get('depenFields') as FormArray;
  }

  // get depenFields_intro(): FormArray {
  //   // console.log((<FormArray>this.form.get('depenFields')).controls, 'GET');
  //   return this.form.get('depenFields_intro') as FormArray;
  // }

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

  getMemberDetails() {
    this.dataServe
      .global_service(1, '/member_dtls', { flag: true, form_no: this.form_no })
      .subscribe(
        (data) => {
          console.log(data, 'kiki');
          this.userData = data;
          // this.userData = this.userData.msg;
          if (this.userData.suc > 0) {
            this.memberData = this.userData.msg[0];
            this.form.patchValue({
              mem_type: this.memberData?.mem_type,
              member_type:
                this.memberData?.mem_type == 'G'
                  ? 'General Membership'
                  : this.memberData?.mem_type == 'L'
                  ? 'Life Membership'
                  : 'Associate Membership',
              member_opt: this.memberData?.memb_oprn,
              unit_nm: this.memberData?.unit_id,
              member: this.memberData?.memb_name,
              gurdian: this.memberData?.gurdian_name,
              gen: this.memberData?.gender,
              marital_status: this.memberData?.marital_status,
              gen_dob: this.memberData?.dob
                ? this.datePipe.transform(this.memberData?.dob, 'yyyy-MM-dd')
                : '',
              phone: this.memberData?.phone_no,
              email_id: this.memberData?.email_id,
              blood: this.memberData?.blood_grp,
              caste: this.memberData?.caste,
              staff: this.memberData?.staff_nos,
              personal: this.memberData?.pers_no,
              min: this.memberData?.min_no,
              mem: this.memberData?.memb_address,
              city: this.memberData?.city_town_dist,
              pin: this.memberData?.pin_no,
              police_st: this.memberData?.ps,
              mem_id: this.memberData?.member_id,
              spouse_fr: {
                sl_no: this.memberData?.spou_dt.sl_no > 0 ? this.memberData?.spou_dt.sl_no : 0,
                spou_name: this.memberData?.spou_dt.dependent_name,
                spou_gurd_name: this.memberData?.spou_dt.gurdian_name,
                spou_blood_grp: this.memberData?.spou_dt.blood_grp,
                spou_dob: this.memberData?.spou_dt.dob > 0
                  ? this.datePipe.transform(
                      this.memberData?.spou_dt.dob,
                      'yyyy-MM-dd'
                    )
                  : '',
                // spou_phone: this.memberData?.spou_dt,
                spou_mobile_no: this.memberData?.spou_dt.phone_no,
                spou_min_no: this.memberData?.spou_dt.min_no,
                spou_mem_addr: this.memberData?.spou_dt.memb_address,
                spou_police_st: this.memberData?.spou_dt.ps,
                spou_city: this.memberData?.spou_dt.city_town_dist,
              },
              intro_fr: {
                intro_member_id: this.memberData?.spou_dt?.intro_member_id,
                intro_name: this.memberData?.spou_dt?.dependent_name,
                relation_intro: this.memberData?.spou_dt?.relation,
              },
            });


            for (let dt of this.memberData!.dep_dt) {
              this.depenFields.push(
                this.fb.group({
                  sl_no: [dt.sl_no > 0 ? dt.sl_no : 0],
                  dependent_name: [dt.dependent_name],
                  phone_no: [dt.phone_no],
                  relation: [dt.relation],
                  dob_dep: dt.dob
                        ? this.datePipe.transform(
                            dt.dob,
                            'yyyy-MM-dd'
                          )
                        : '',
                })
              );
            }

            // for (let dt_1 of this.memberData!.dep_dt) {
            //   this.depenFields_intro.push(
            //     this.fb.group({
            //       sl_no: [dt_1.sl_no],
            //       dependent_name_dep: [dt_1.dependent_name],
            //       // dob_dep: this.datePipe.transform(dt_1?.dob, 'dd-MM-yyyy'),
            //       dob_dep: dt_1.dob
            //       ? this.datePipe.transform(
            //           dt_1.dob,
            //           'yyyy-MM-dd'
            //         )
            //       : '',
            //       relation_dep: [dt_1.relation],
            //     })
            //   );
            // }

            this.spouseFileName = this.memberData?.spou_dt.memb_pic ? `${this.api_url}/${this.memberData?.spou_dt.memb_pic}` : null
            this.memFileName = this.memberData?.memb_pic ? `${this.api_url}/${this.memberData?.memb_pic}` : null
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
          // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
        }
      );
  }


  // getMemberDtls(){
  //   this.dataServe.global_service(1, '/member_dtls', {mem_id: this.mem_no?.value}).subscribe((data:any) => {
  //     this.memberData_intro = data
  //     if(this.memberData_intro.suc > 0){
  //       this.intro_name?.patchValue(this.memberData_intro.msg[0].memb_name)
  //       this.intro_name?.disable({ onlySelf: true })
  //     }
  //     })
  // }

  onadd() {
    // this.phoneNumbers.push('');
    const fieldGroup = this.fb.group(
      {
        dependent_name: [null],
        dob_dep: [null],
        relation: [null],
      },
      {
        validators: this.validatorsService.conditionalRequiredValidator(
          'dependent_name',
          ['dob_dep', 'relation']
        ),
      }
    );
    this.depenFields.insert(0, fieldGroup);
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
        this.depenFields.removeAt(index);
        Swal.fire({
          title: 'Deleted!',
          text: 'Row has been deleted.',
          icon: 'success',
        });
      }
    });
  }

  onUpload(event: any, flag: any) {
    const file = event.files[0];
    if (file) {
      if(flag == 'O') this.memFile = file

      if(flag == 'S') this.spouseFile = file
      // this.fileSelected.emit({ file, flag });
    }

    // for (let file of event.files) {
    //   this.uploadedFiles.push(file);
    // }

    // this.messageService.add({
    //   severity: 'info',
    //   summary: 'File Uploaded',
    //   detail: '',
    // });
  }

  // showAssociate(): boolean{
  //   return this.mem_type === 'AI';
  // }

  onRemove(event: any, flag: any) {
    if (flag == 'O') this.memFile = null;

    if (flag == 'S') this.spouseFile = null;
    console.log(event, 'clear event');
    // this.fileSelected.emit({ file: '', flag });
  }

  save() {
    const frmDt = new FormData();
    frmDt.append('data', JSON.stringify(this.form.value))
    frmDt.append('spouse_file', this.spouseFile)
    frmDt.append('member_file', this.memFile) 
    this.dataServe
      .global_service(1, '/update_member_dtls', frmDt)
      .subscribe((data) => {
        this.responsedata = data;
        if (this.responsedata.suc > 0) {
          Swal.fire(
            'Success!',
            ` Your form is Updated successfully.`,
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/admin/memb_list']);
            }
          });
        } else {
          Swal.fire('Error', this.responsedata.msg, 'error');
        }
      });
    // console.log(this.form.value)
  }
}
