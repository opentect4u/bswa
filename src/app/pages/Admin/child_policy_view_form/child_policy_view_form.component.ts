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
  member_name: string,
  member_id: string,
  gurdian_name: string,
  gender: string,
  marital_status: string,
  dob: string,
  member_address: string,
  phone_no: Date,
  dependent_name: string,
  relation: string,
  form_dt: string,
  premium_amt: string,
  policy_amount: string,
  approved_at: string,
  approved_by: string,
  rejected_at: string,
  rejected_by: string,
  approval_status: string,
  reject: string,
  resolution_no: string,
  trn_date: string,
  form_no: string,
  dependent_flag: string,
  memb_flag: string,
  age: string,
  remarks: any;
}

interface SpouseDepenInfo {
  sl_no: string,
  ind_type: string,
  fin_year: string,
  particulars: string,
  amount: string,
  treatment_dtls: string,
  treatment_flag: string,
  dependent_name: any,
  dob: any,
  gender: any,
  age: any,
  status:any
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
  selector: 'app-child_policy_view_form',
  templateUrl: './child_policy_view_form.component.html',
  styleUrls: ['./child_policy_view_form.component.css'],
  providers: [DatePipe],
})
export class Child_policy_view_formComponent implements OnInit {
   secretKey = environment.secretKey
    api_base_url = environment.api_url;
    selectedValues: any[] = [];
    WindowObject: any;
    divToPrint: any;
    responsedata: any;
    form_no: any;
    memb_name: any;
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
    cpinfo: MembershipInfo | undefined;
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

  constructor(   private router: Router,
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
      trn_id: [''],
      trn_date: ['',Validators.required],
      form_no: [''],
      policy_amount: ['',Validators.required],
      premium_amount: ['', Validators.required],
      trns_type: ['ONLINE']
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

    this.getMemberInfo(this.member_id,this.form_no);
    this.getTransactionInfo();
    this.getRejectTransactionInfo();
    this.getDependentInfo(this.member_id,this.form_no);
  }

    getMemberInfo(memb_id:any,form_no:any) {
    this.dataServe
      .global_service(0, '/get_member_policy_print_cp', `member_id=${memb_id}&&form_no=${form_no}`)
      .subscribe((data: any) => {
        this.responsedata = data;
        console.log(this.responsedata, '666');
        this.responsedata =
          this.responsedata.suc > 0
            ? this.responsedata.msg && this.responsedata.msg.length > 0
              ? this.responsedata.msg[0]
              : {}
            : {};
        this.cpinfo = this.responsedata;
          this.form.patchValue({
          policy_amount: this.cpinfo?.policy_amount,
          form_no: this.cpinfo?.form_no,
          resolution_no: this.resdata[0]?.resolution_no,
          resolution_dt: this.datePipe.transform(this.resdata[0]?.effective_date, 'yyyy-MM-dd'),
          status:this.resdata[0]?.approval_status,
          pre_amt: this.resdata[0]?.premium_amount,
        });
      });
  }

    getDependentInfo(memb_id:any,form_no:any) {
    this.dataServe
      .global_service(0, '/fetch_dependent_details_cp',`member_id=${memb_id}&&form_no=${form_no}`)
      .subscribe((dependent_dt: any) => {
       this.filteredSpouseInfo =
        dependent_dt?.suc > 0 && Array.isArray(dependent_dt.msg) ? dependent_dt.msg : [];
    });
  }

    getTransactionInfo() {
    this.dataServe
      .global_service(0, '/get_cp_transaction', `form_no=${this.form_no}`)
      .subscribe((data: any) => {
        this.resdata = data;
        console.log(this.resdata,'ressst');
        this.resdata = this.resdata.suc > 0 ? this.resdata.msg : []
        // console.log(this.resdata[0].subscription_1)
        this.form.patchValue({
          resolution_no: this.resdata[0]?.resolution_no,
          resolution_dt: this.datePipe.transform(this.resdata[0]?.effective_date, 'yyyy-MM-dd'),
          status: this.resdata[0]?.approve_status,
          pre_amt: this.resdata[0]?.premium_amt,
          trn_date: this.resdata[0]?.form_dt,
        })
        console.log('Status after patching:', this.form.get('status')?.value);
      })
  }

  getRejectTransactionInfo() {
    this.dataServe
      .global_service(0, '/get_cp_transaction_reject', `form_no=${this.form_no}`)
      .subscribe((data: any) => {
        this.resdata = data;
        console.log(this.resdata,'po');
        this.resdata = this.resdata.suc > 0 ? this.resdata.msg : []
        // console.log(this.resdata[0].subscription_1)
        this.form.patchValue({
          form_no: this.form_no,
          resolution_no: this.resdata[0].resolution_no,
          resolution_dt: this.datePipe.transform(this.resdata[0].effective_date, 'yyyy-MM-dd'),
          status:this.resdata[0].approval_status,
          // reject: this.resdata[0].remarks
        })
      })
  }

   get isPending() {
  return this.form.get('status')?.value === 'P';
  }

    reject_submit(){
      var dt = {
        formNo: this.form_no,
        member: this.cpinfo?.member_name,
        resolution_no: this.f['resolution_no'] ? this.f['resolution_no'].value : null,
        resolution_dt: this.f['resolution_dt'] ? this.f['resolution_dt'].value : null,
        status: this.f['status'] ? this.f['status'].value : null,
        reject: this.f['reject'] ? this.f['reject'].value : null,
        user: localStorage.getItem('user_name'),
        phone_no: this.phone_no
      }
  
      this.dataServe.global_service(1, '/reject_cp_topup',dt ).subscribe((data: any) => {
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
              this.router.navigate(['/admin/admin_approve_child_policy'])
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
          policy_amount : this.f['policy_amount'] ? this.f['policy_amount'].value : null,
          premium_amount : this.f['premium_amount'] ? this.f['premium_amount'].value : null,
          member: this.cpinfo?.member_name,
          phone_no: this.cpinfo?.phone_no,
        };
        this.dataServe.global_service(1, '/save_trn_data_cp', dt).subscribe(
          (data) => {
            this.save_dt = data;
            console.log(this.save_dt, 'save_dt');
    
            if (this.save_dt.suc > 0) {
              Swal.fire('Success', 'CP Form approved successfully', 'success').then(
                (result) => {
                  if (result.isConfirmed) {
                    this.router.navigate(['/admin/admin_approve_child_policy']);
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
}
