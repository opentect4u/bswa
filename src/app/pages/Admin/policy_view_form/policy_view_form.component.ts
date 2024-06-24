import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

interface MembershipInfo {
  mem_type: string,
  memb_oprn: string,
  memb_name: string,
  member_id: string,
  gurdian_name: string,
  gender: string,
  marital_status: string,
  dob: string,
  personel_no: string,
  min_no: string,
  mem_address: string,
  phone_no: Date,
  dependent_name: string,
  spou_guard: string,
  relation: string,
  spou_min_no: string,
  spou_dob: string,
  spou_phone: string,
  spou_address: string,
  unit_name: string,
}

interface SpouseDepenInfo {
  ind_type: string,
  fin_year: string,
  particulars: string,
  amount: string,
  treatment_dtls: string,
}

@Component({
  selector: 'app-policy_view_form',
  templateUrl: './policy_view_form.component.html',
  styleUrls: ['./policy_view_form.component.css'],
  providers: [DatePipe],
})
export class Policy_view_formComponent implements OnInit {
  api_base_url = environment.api_url;
  selectedValues: any[] = [];
  WindowObject: any;
  divToPrint: any;
  responsedata: any;
  form_no: any;
  memb_name: any;
  mem_type: any;
  memb_oprn: any;
  staff_nos: any;
  pers_no: any;
  gurdian_name: any;
  memb_address: any;
  ps: any;
  phone_no: any;
  blood_grp: any;
  dob: any;
  email_id: any;
  min_no: any;
  dependent_name: any;
  resdata: any;
  spou_blood_grp: any;
  gurd_name: any;
  spou_dob: any;
  spou_phone: any;
  spou_memb_address: any;
  resolution_no: any;
  subscription_1: any;
  adm_fee: any;
  donation: any;
  spou_min: any;
  resdata1: any;
  dep_dt: any;
  memb_pic: any;
  member_id: any;
  responsedata_1: any;
  selectedValue: string = 'P';
  selectedValue2: string = 'O';
  frm_no:any;
  spouseInfo: [SpouseDepenInfo] | undefined;
  stpinfo: MembershipInfo | undefined;
  ind_type: any;
  treatment_dtls:any;
  particulars:any;
  amount:any;
  fin_year:any;
  form: FormGroup;
  genInsData: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataServe: DataService,
    private datePipe: DatePipe
  ) { 
    this.form = this.fb.group({
      resolution_no: ['',Validators.required],
      resolution_dt: ['',Validators.required],
      status: ['',Validators.required],
      reject: ['',Validators.required],
      payment: [''],
      pre_amt: [''],
      // frm_no: ['']
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    const encodedFormNo = this.route.snapshot.params['form_no'];
    const encodedMemId = this.route.snapshot.params['member_id'];
    // this.member_id = localStorage.getItem('user_name')
    
    this.form_no = atob(decodeURIComponent(encodedFormNo));
    this.member_id = atob(decodeURIComponent(encodedMemId));
    console.log(this.member_id,'ooo');
    // this.getMemberInfo(this.member_id);
    this.getGenInsInfo();
    this.getSpouseInfo();
  }

  getMemberInfo(memb_id:any) {
    this.dataServe
      .global_service(0, '/get_member_policy_print_super', `member_id=${memb_id}`)
      .subscribe((data: any) => {
        this.responsedata = data;
        console.log(this.responsedata, '666');
        this.responsedata =
          this.responsedata.suc > 0
            ? this.responsedata.msg.length > 0
              ? this.responsedata.msg[0]
              : {}
            : {};
        this.stpinfo = this.responsedata;
      });
  }

  getGenInsInfo() {
    this.dataServe
      .global_service(0, '/get_stp_ins_dt', `form_no=${this.form_no}`)
      .subscribe((data: any) => {
        this.genInsData = data;
        console.log(this.genInsData, '666');
        this.genInsData =
          this.genInsData.suc > 0
            ? this.genInsData.msg.length > 0
              ? this.genInsData.msg[0]
              : {}
            : {};
        
    this.getMemberInfo(this.genInsData.member_id ? this.genInsData.member_id : '');
    
      });
  }

  getSpouseInfo() {
    this.dataServe
      .global_service(0, '/get_super_mediclaim', `form_no=${this.form_no}`)
      .subscribe((spouse_dt: any) => {
        this.resdata = spouse_dt;
        console.log(this.resdata, '777');
        this.resdata = 
           this.resdata.suc > 0 
             ? this.resdata.msg.length > 0 
             ? this.resdata.msg
             : []
             : [];
        this.spouseInfo = this.resdata
        // this.ind_type = this.responsedata[0].ind_type;
      });
  }

  reject_submit(){
    var dt = {
      formNo: this.form_no,
      member: this.route.snapshot.params['memb_name'],
      resolution_no: this.f['resolution_no'] ? this.f['resolution_no'].value : null,
      resolution_dt: this.f['resolution_dt'] ? this.f['resolution_dt'].value : null,
      status: this.f['status'] ? this.f['status'].value : null,
      reject: this.f['reject'] ? this.f['reject'].value : null,
      user: localStorage.getItem('user_name')
    }

    this.dataServe.global_service(1, '/reject_super_topup',dt ).subscribe((data: any) => {
      this.resdata = data;
      console.log(this.resdata, '99');
      if(this.resdata.suc > 0) {
        this.router.navigate(['/admin/super_policy_approve'])
      }
    });    
  }

  approve(){
    var dt = {
      formNo: this.form_no,
      member: this.route.snapshot.params['memb_name'],
      resolution_no: this.f['resolution_no'] ? this.f['resolution_no'].value : null,
      resolution_dt: this.f['resolution_dt'] ? this.f['resolution_dt'].value : null,
      status: this.f['status'] ? this.f['status'].value : null,
      pre_amt: this.f['pre_amt'] ? this.f['pre_amt'].value : null,
      payment: this.f['payment'] ? this.f['payment'].value : null,
      user: localStorage.getItem('user_name')
    }

    this.dataServe.global_service(1, '/approve_super',dt ).subscribe((data: any) => {
      this.resdata = data;
      console.log(this.resdata, '99');
      if(this.resdata.suc > 0) {
        this.router.navigate(['/admin/super_policy_approve'])
      }
    });    
  }

}
