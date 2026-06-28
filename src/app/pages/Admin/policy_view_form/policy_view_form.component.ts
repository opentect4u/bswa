import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { ChangeDetectorRef } from '@angular/core';

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
  policy_holder_type: string,
  form_dt: string,
  premium_type: string,
  premium_amt: string,
  approve_at: string,
  approve_by: string,
  rejected_dt: string,
  rejected_by: string,
  form_status: string,
  remarks: string,
  resolution_no: string,
  trn_date: string,
  form_no: string,
  dependent_flag: string,
  memb_flag: string
}

interface SpouseDepenInfo {
  sl_no: string,
  ind_type: string,
  fin_year: string,
  particulars: string,
  amount: string,
  treatment_dtls: string,
  treatment_flag: string
}

interface trnData {
  form_no: string;
  trn_date: string;
  trn_id: string;
  sub_amt: string;
  onetime_amt: string;
  adm_fee: string;
  donation: string;
  premium_amt: string;
  tot_amt: string;
  pay_mode: string;
  receipt_no: string;
  chq_no: string;
  chq_dt: string;
  chq_bank: string;
  approval_status: string;
}

@Component({
  selector: 'app-policy_view_form',
  templateUrl: './policy_view_form.component.html',
  styleUrls: ['./policy_view_form.component.css'],
  providers: [DatePipe],
})
export class Policy_view_formComponent implements OnInit {
  secretKey = environment.secretKey
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
  // spouseInfo: [SpouseDepenInfo] | undefined;
  spouseInfo: SpouseDepenInfo[] = [];
  stpinfo: MembershipInfo | undefined;
  ind_type: any;
  treatment_dtls:any;
  particulars:any;
  amount:any;
  fin_year:any;
  form: FormGroup;
  genInsData: any;
  memb_status: any;
  resolution_dt: any;
  trn_id = 0;
  tnxData: trnData | any;
  tnxResData: any;
  maxDate!: string;
  save_dt: any;
  filteredSpouseInfo: SpouseDepenInfo[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataServe: DataService,
    private datePipe: DatePipe,
  ) { 
    this.form = this.fb.group({
      resolution_no: ['',Validators.required],
      resolution_dt: ['',Validators.required],
      status: ['P'],
      reject: ['',Validators.required],
      payment: [''],
      pre_amt: [''],
      trn_id: [''],
      trn_date: ['',Validators.required],
      totalAmount: [''],
      form_no: [''],
    });
  }

  get f() {
    return this.form.controls;
  }
  

  ngOnInit() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();
    this.maxDate = `${year}-${month}-${day}`;

   this.form.get('status')?.valueChanges.subscribe(value => {
   console.log('Selected status changed to:', value);
   });
    const encodedFormNo = this.route.snapshot.params['form_no'];
    const encodedMemId = this.route.snapshot.params['member_id'];
    const encodedPhNo = this.route.snapshot.params['phone_no'];
    
    this.form_no = atob(decodeURIComponent(encodedFormNo));
    this.member_id = atob(decodeURIComponent(encodedMemId));
    this.phone_no = atob(decodeURIComponent(encodedPhNo));
    // console.log(this.member_id,'ooo');

    this.getMemberInfo(this.member_id,this.form_no);
    this.getGenInsInfo();
    this.getSpouseInfo();
    this.getTransactionInfo();
    this.getRejectTransactionInfo();
  
  }

  getMemberInfo(memb_id:any,form_no:any) {
    this.dataServe
      .global_service(0, '/get_member_policy_print_super', `member_id=${memb_id}&&form_no=${form_no}`)
      .subscribe((data: any) => {
        this.responsedata = data;
        // console.log(this.responsedata, '666');
        this.responsedata =
          this.responsedata.suc > 0
            ? this.responsedata.msg && this.responsedata.msg.length > 0
              ? this.responsedata.msg[0]
              : {}
            : {};
        this.stpinfo = this.responsedata;
          this.form.patchValue({
          totalAmount: this.stpinfo?.premium_amt,
          form_no: this.stpinfo?.form_no,
          resolution_no: this.resdata[0]?.resolution_no,
          resolution_dt: this.datePipe.transform(this.resdata[0]?.resolution_dt, 'yyyy-MM-dd'),
          status:this.resdata[0]?.form_status,
          pre_amt: this.resdata[0]?.premium_amt,
        });
        // this.form.patchValue({
        //   // resolution_no: this.resdata[0].resolution_no,
        //   // resolution_dt: this.datePipe.transform(this.resdata[0].resolution_dt, 'yyyy-MM-dd'),
        //   // status:this.resdata[0].form_status,
        //   // pre_amt: this.resdata[0].premium_amt,
        //   memb_name: this.stpinfo?.memb_name
        // })
        // this.selectedValue = this.resdata[0].form_status;
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
      });
  }

  getSpouseInfo() {
    this.dataServe
      .global_service(0, '/get_super_mediclaim', `form_no=${this.form_no}`)
      .subscribe((spouse_dt: any) => {
        this.resdata = spouse_dt;
        this.resdata = 
           this.resdata.suc > 0 
             ? this.resdata.msg.length > 0 
             ? this.resdata.msg
             : []
             : [];
        this.spouseInfo = this.resdata
          if (Array.isArray(this.spouseInfo)) {
      this.filteredSpouseInfo = this.spouseInfo.filter(d =>
         (d.ind_type === 'S' && d.treatment_flag === 'Y') ||
        (d.ind_type === 'P' && d.treatment_flag === 'Y')
      );
    }
      });
  }

  getTransactionInfo() {
    this.dataServe
      .global_service(0, '/get_super_transaction', `form_no=${this.form_no}`)
      .subscribe((data: any) => {
        this.resdata = data;
        console.log(this.resdata,'resss');
        this.resdata = this.resdata.suc > 0 ? this.resdata.msg : []
        // console.log(this.resdata[0].subscription_1)
        this.form.patchValue({
          resolution_no: this.resdata[0]?.resolution_no,
          resolution_dt: this.datePipe.transform(this.resdata[0]?.resolution_dt, 'yyyy-MM-dd'),
          status: this.resdata[0]?.form_status,
          pre_amt: this.resdata[0]?.premium_amt,
          trn_date: this.resdata[0]?.form_dt,
        })
        console.log('Status after patching:', this.form.get('status')?.value);
      })
  }

  getRejectTransactionInfo() {
    this.dataServe
      .global_service(0, '/get_super_transaction_reject', `form_no=${this.form_no}`)
      .subscribe((data: any) => {
        this.resdata = data;
        console.log(this.resdata);
        this.resdata = this.resdata.suc > 0 ? this.resdata.msg : []
        // console.log(this.resdata[0].subscription_1)
        this.form.patchValue({
          resolution_no: this.resdata[0].resolution_no,
          resolution_dt: this.datePipe.transform(this.resdata[0].resolution_dt, 'yyyy-MM-dd'),
          status:this.resdata[0].form_status,
          reject: this.resdata[0].remarks
        })
      })
  }


  reject_submit(){
    var dt = {
      formNo: this.form_no,
      member: this.stpinfo?.memb_name,
      resolution_no: this.f['resolution_no'] ? this.f['resolution_no'].value : null,
      resolution_dt: this.f['resolution_dt'] ? this.f['resolution_dt'].value : null,
      status: this.f['status'] ? this.f['status'].value : null,
      reject: this.f['reject'] ? this.f['reject'].value : null,
      user: localStorage.getItem('user_name'),
      phone_no: this.phone_no
    }

    this.dataServe.global_service(1, '/reject_super_topup',dt ).subscribe((data: any) => {
      this.resdata = data;
      console.log(this.resdata, '99');
      if(this.resdata.suc > 0) {
        // this.isRejectedSubmitted = true; 
        this.form.patchValue({ status: 'P' });
        // this.cdr.detectChanges(); 
        Swal.fire(
          'Success',
          'Form Rejected Successfully',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/admin/admin_premium_approve'])
          }
        });
      }else {
        Swal.fire(
          'Error',
          this.resdata.msg,
            'error'
        )
      }
    },error => {
      console.error(error);
      Swal.fire(
        'Error',
        error,
          'error'
      )
    });    
  }

   approve() {
      var dt = {
        formNo: this.form_no,
        resolution_no: this.f['resolution_no']
          ? this.f['resolution_no'].value
          : null,
        resolution_dt: this.f['resolution_dt']
          ? this.f['resolution_dt'].value
          : null,
        status: this.f['status'] ? this.f['status'].value : null,
        user: localStorage.getItem('user_name'),
        trn_date: this.f['trn_date'] ? this.f['trn_date'].value : null,
        totalAmount: this.f['totalAmount'] ? this.f['totalAmount'].value : null,
        payment: this.f['payment'] ? this.f['payment'].value : null,
        member: this.stpinfo?.memb_name,
        phone_no: this.stpinfo?.phone_no,
        min_no: this.stpinfo?.min_no,
        // trn_id: this.trn_id,
      };
      this.dataServe.global_service(1, '/save_trn_data_stp', dt).subscribe(
        (data) => {
          this.save_dt = data;
          console.log(this.save_dt, 'save_dt');
  
          if (this.save_dt.suc > 0) {
            Swal.fire('Success', 'Premium deposit successfully', 'success').then(
              (result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['/admin/admin_premium_approve']);
                }
              }
            );
          } else {
            Swal.fire('Error', this.save_dt.msg, 'error');
          }
        },
        (error) => {
          console.error(error);
          Swal.fire('Error', error, 'error');
        }
      );
    }

  get isPending() {
  return this.form.get('status')?.value === 'P';
  }

}
