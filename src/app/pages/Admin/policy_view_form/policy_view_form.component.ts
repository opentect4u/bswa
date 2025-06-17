import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

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
  premium_amt: string
}

interface SpouseDepenInfo {
  sl_no: string,
  ind_type: string,
  fin_year: string,
  particulars: string,
  amount: string,
  treatment_dtls: string,
}

interface trnData {
  form_no: string;
  trn_dt: string;
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
  memb_status: any;
  resolution_dt: any;

  tnxData: trnData | any;
  tnxResData: any;
  // maxDate!: string;

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
      trn_id: [''],

      // frm_no: ['']
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    // const today = new Date();
    // const day = String(today.getDate()).padStart(2, '0');
    // const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    // const year = today.getFullYear();
    // this.maxDate = `${year}-${month}-${day}`;

    const encodedFormNo = this.route.snapshot.params['form_no'];
    const encodedMemId = this.route.snapshot.params['member_id'];
    const encodedPhNo = this.route.snapshot.params['phone_no'];
    // const encodedName = ;
    // this.member_id = localStorage.getItem('user_name')
    
    this.form_no = atob(decodeURIComponent(encodedFormNo));
    this.member_id = atob(decodeURIComponent(encodedMemId));
    this.phone_no = atob(decodeURIComponent(encodedPhNo));
    // this.memb_name = this.route.snapshot.params['memb_name']
    console.log(this.member_id,'ooo');
    this.getMemberInfo(this.member_id,this.form_no);
    this.getGenInsInfo();
    this.getSpouseInfo();
    this.getTnxDetails();
    this.getTransactionInfo();
    this.getRejectTransactionInfo();
  }

  getTnxDetails(){
    this.dataServe
      .global_service(0, '/master/get_tnx_info', `form_no=${this.form_no}`)
      .subscribe((data: any) => {
        this.tnxResData = data;
        // console.log(this.tnxResData, this.resolution_dt > 0, '999');
        if (this.tnxResData.suc > 0 && this.tnxResData.msg.length > 0) {
          this.tnxData =
            this.tnxResData.suc > 0 ? this.tnxResData.msg[0] : {};
          this.form.patchValue({
            resolution_no: this.resolution_no,
            resolution_dt:
              this.resolution_dt
                ? this.datePipe.transform(this.resolution_dt, 'yyyy-MM-dd')
                : '',
            // status: this.memb_status,
            payment: this.tnxData?.pay_mode,
            // cheque_no: this.tnxData?.chq_no,
            // bank_name: this.tnxData?.chq_bank,
            // cheque_dt:
            //   this.tnxData?.chq_dt
            //     ? this.datePipe.transform(this.tnxData?.chq_dt, 'yyyy-MM-dd')
            //     : '',
            // subscriptionFee_2: this.tnxData?.premium_amt,
            // subscriptionFee_1: this.tnxData?.sub_amt,
            // admissionFee_life: this.tnxData?.adm_fee,
            // tot_amt: this.tnxData?.tot_amt,
            // receipt_no: this.tnxData?.receipt_no,
            trn_id: this.tnxData?.trn_id,
          });
          
        }
      }); 
  }

  getMemberInfo(memb_id:any,form_no:any) {
    this.dataServe
      .global_service(0, '/get_member_policy_print_super', `member_id=${memb_id}&&form_no=${form_no}`)
      .subscribe((data: any) => {
        this.responsedata = data;
        console.log(this.responsedata, '666');
        this.responsedata =
          this.responsedata.suc > 0
            ? this.responsedata.msg && this.responsedata.msg.length > 0
              ? this.responsedata.msg[0]
              : {}
            : {};
        this.stpinfo = this.responsedata;
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
        
    // this.getMemberInfo(this.genInsData.member_id ? this.genInsData.member_id : '');
    
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

  getTransactionInfo() {
    // this.dataServe
    //   .global_service(0, '/get_super_transaction', `form_no=${this.form_no}`)
    //   .subscribe((trans_dt: any) => {
    //     this.resdata = trans_dt;
    //     console.log(this.resdata, '777');
    //     this.resdata = 
    //        this.resdata.suc > 0 
    //          ? this.resdata.msg.length > 0 
    //          ? this.resdata.msg
    //          : []
    //          : [];
    //     this.traninfo = this.resdata
    //     this.form.patchValue({
    //       admissionFee: this.responsedata[0].adm_fee,
    //       donationFee: this.responsedata[0].donation,
    //       subscriptionFee:this.responsedata[0].subscription_1,
    //       subscriptionType:this.responsedata[0].subs_type=='M'? 'Monthly' : 'Yearly',
    //     })
    //   });
    this.dataServe
      .global_service(0, '/get_super_transaction', `form_no=${this.form_no}`)
      .subscribe((data: any) => {
        this.resdata = data;
        console.log(this.resdata);
        this.resdata = this.resdata.suc > 0 ? this.resdata.msg : []
        // console.log(this.resdata[0].subscription_1)
        this.form.patchValue({
          resolution_no: this.resdata[0]?.resolution_no,
          resolution_dt: this.datePipe.transform(this.resdata[0]?.resolution_dt, 'yyyy-MM-dd'),
          status:this.resdata[0]?.form_status,
          pre_amt: this.resdata[0]?.premium_amt,
        })
        this.selectedValue = this.resdata[0]?.form_status;
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
        Swal.fire(
          'Success',
          'Form Rejected Successfully',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            // this.router.navigate(['/admin/super_policy_approve'])
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

  approve(){
    var dt = {
      formNo: this.form_no,
      member: this.stpinfo?.memb_name,
      resolution_no: this.f['resolution_no'] ? this.f['resolution_no'].value : null,
      resolution_dt: this.f['resolution_dt'] ? this.f['resolution_dt'].value : null,
      status: this.f['status'] ? this.f['status'].value : null,
      // form_dt: this.f['form_dt'] ? this.f['form_dt'].value : null,
      // pre_amt: this.f['pre_amt'] ? this.f['pre_amt'].value : null,
      // payment: this.f['payment'] ? this.f['payment'].value : null,
      trn_id: this.f['trn_id'].value > 0 ? this.f['trn_id'].value : 0,
      user: localStorage.getItem('user_name'),
      phone_no: this.phone_no
    }

    this.dataServe.global_service(1, '/approve_super',dt ).subscribe((data: any) => {
      this.resdata = data;
      // console.log(this.resdata, '99');
      if(this.resdata.suc > 0) {
        Swal.fire(
          'Success',
          'Super Top Up Form Accepted successfully',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/admin/super_policy_approve'])
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

}
