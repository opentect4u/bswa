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
  memb_name: any,
  member_id: string,
  father_husband_name: any,
  gender: string,
  marital_status: string,
  dob: string,
  member_address: string,
  phone: any,
  dependent_name: string,
  relation: string,
  form_dt: string,
  approve_at: string,
  approve_by: string,
  rejected_dt: string,
  rejected_by: string,
  form_status: string,
  reject: string,
  resolution_no: string,
  resolution_dt: Date,
  trn_date: string,
  form_no: string,
  dependent_flag: string,
  memb_flag: string,
  remarks: any;
  unit_name: any;
  policy_holder_type: any;
  disease_flag: any;
  disease_type: any;
  doc_img : any;
  memb_img : any;
}

interface SpouseDepenInfo {
  sl_no: string,
  ind_type: string,
  fin_year: string,
  particulars: string,
  amount: string,
  disease_type: any,
  disease_flag: any,
  dept_name: any,
  dob: any,
  relation_name : any;
  dep_img: any;
  dep_doc : any;
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
  super_top_up_amt: string;
  tot_amount: string;
  pay_mode: string;
  receipt_no: string;
  chq_no: string;
  chq_dt: string;
  chq_bank: string;
  approval_status: string;
}

interface PremiumInfo {
  "form_no": string,
  "premium_amt": string,
  "premium_amt2": string,
  "prm_flag2": string,
  "premium_amt3": string,
  "prm_flag3": string,
  "family_type": string,
}

@Component({
  selector: 'app-gp_policy_view_form',
  templateUrl: './gp_policy_view_form.component.html',
  styleUrls: ['./gp_policy_view_form.component.css'],
  providers: [DatePipe],
})
export class Gp_policy_view_formComponent implements OnInit {
  secretKey = environment.secretKey
  api_base_url = environment.api_url;
  responsedata: any;
  form_no: any;
  form: FormGroup;
  maxDate!: string;
  member_id: any;
  phone_no: any;
  gpinfo: MembershipInfo | undefined;
  resdata: any;
  filteredSpouseInfo: SpouseDepenInfo[] = [];
  selectedImage: string = '';
  showImageModal = false;
  zoomLevel = 1;
  preinfo:  PremiumInfo | undefined;
  pre_amt_flag: any;
  pre_amt_value: any;
  tot_amt_value: any;
  save_dt: any;

  constructor(private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataServe: DataService,
    private datePipe: DatePipe) 
    { 
       this.form = this.fb.group({
      resolution_no: ['',Validators.required],
      resolution_dt: ['',Validators.required],
      status: ['P'],
      reject: ['',Validators.required],
      trn_id: [''],
      trn_date: ['',Validators.required],
      form_no: [''],
      premium_amount: [''],
      super_top_up_amt: [''],
      tot_amount: ['']
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
    this.getDependentInfo(this.member_id,this.form_no);
    this.getPremiumInfo();
    this.getTransactionInfo();
    this.getRejectTransactionInfo();
  }

  // get isPending() {
  // return this.form.get('status')?.value === 'P';
  // }

openModal(url: string) {
  this.selectedImage = url;
  this.zoomLevel = 1;
  this.showImageModal = true;
}

closeModal() {
  this.showImageModal = false;
}

  getMemberInfo(memb_id:any,form_no:any) {
    this.dataServe
      .global_service(0, '/get_member_policy_print_gp', `member_id=${memb_id}&&form_no=${form_no}`)
      .subscribe((data: any) => {
        this.responsedata = data;
        // console.log(this.responsedata, '666');
        this.responsedata =
          this.responsedata.suc > 0
            ? this.responsedata.msg && this.responsedata.msg.length > 0
              ? this.responsedata.msg[0]
              : {}
            : {};
        this.gpinfo = this.responsedata;
        console.log(this.gpinfo,'gp');
        
          this.form.patchValue({
          form_no: this.gpinfo?.form_no,
          resolution_no: this.gpinfo?.resolution_no,
          resolution_dt: this.datePipe.transform(this.gpinfo?.resolution_dt, 'yyyy-MM-dd'),
          status:this.gpinfo?.form_status,
        });
      });
  }

  getDependentInfo(memb_id:any,form_no:any) {
    this.dataServe
      .global_service(0, '/fetch_dependent_details_gp',`member_id=${memb_id}&&form_no=${form_no}`)
      .subscribe((dependent_dt: any) => {
       this.filteredSpouseInfo =
        dependent_dt?.suc > 0 && Array.isArray(dependent_dt.msg) ? dependent_dt.msg : [];
    });
  }

  getPremiumInfo(){
    this.dataServe
    .global_service(0, '/premium_dtls', `form_no=${this.form_no}`)
    .subscribe((data: any) => {
      this.responsedata = data;
      console.log(this.responsedata, '667');
      this.responsedata =
        this.responsedata.suc > 0
          ? this.responsedata.msg.length > 0
            ? this.responsedata.msg[0]
            : {}
          : {};
      this.preinfo = this.responsedata;
      this.pre_amt_flag = this.preinfo!['prm_flag2'] != 'Y' && this.preinfo!['prm_flag3'] != 'Y' ? 'No' : 'Yes';
      this.pre_amt_value = this.preinfo!['prm_flag2'] == 'Y' ? 
      this.preinfo!['premium_amt2'] : this.preinfo!['prm_flag3'] == 'Y' ? 
      this.preinfo!['premium_amt3'] : '0';
      console.log(this.preinfo,'pre');
      this.tot_amt_value = (Number(this.preinfo?.premium_amt) || 0) + (Number(this.pre_amt_value) || 0);
      // console.log(this.tot_amt_value,this.preinfo?.premium_amt,this.pre_amt_value,'yyy');
    });
  }

  getTransactionInfo() {
    this.dataServe
      .global_service(0, '/get_gp_transaction', `form_no=${this.form_no}`)
      .subscribe((data: any) => {
        this.resdata = data;
        this.resdata = this.resdata.suc > 0 ? this.resdata.msg : []
        this.form.patchValue({
          // form_no: this.resdata[0]?.form_no,
          // resolution_no: this.resdata[0]?.resolution_no,
          // resolution_dt: this.datePipe.transform(this.resdata[0]?.resolution_dt, 'yyyy-MM-dd'),
          // status: this.resdata[0]?.form_status,
          premium_amount: this.resdata[0]?.premium_amt,
          super_top_up_amt: this.resdata[0]?.prm_flag2 == 'Y' ? this.resdata[0]?.premium_amt2 : this.resdata[0]?.prm_flag3 == 'Y' ? this.resdata[0]?.premium_amt3 : '0',
          tot_amount: this.tot_amt_value,
          trn_date: this.resdata[0]?.form_dt,
        })
      })
  }

  getRejectTransactionInfo() {
    this.dataServe
      .global_service(0, '/get_gp_transaction_reject', `form_no=${this.form_no}`)
      .subscribe((data: any) => {
        this.resdata = data;
        // console.log(this.resdata,'po');
        this.resdata = this.resdata.suc > 0 ? this.resdata.msg : []
        // console.log(this.resdata[0].subscription_1)
        this.form.patchValue({
          form_no: this.form_no,
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
          member: this.gpinfo?.memb_name,
          resolution_no: this.f['resolution_no'] ? this.f['resolution_no'].value : null,
          resolution_dt: this.f['resolution_dt'] ? this.f['resolution_dt'].value : null,
          status: this.f['status'] ? this.f['status'].value : null,
          reject: this.f['reject'] ? this.f['reject'].value : null,
          user: localStorage.getItem('user_name'),
          phone_no: this.phone_no
        }
    
        this.dataServe.global_service(1, '/reject_gp_topup',dt ).subscribe((data: any) => {
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
                this.router.navigate(['/admin/admin_approve_group_policy'])
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
                member: this.gpinfo?.memb_name,
                phone_no: this.gpinfo?.phone,
              };
              this.dataServe.global_service(1, '/save_trn_data_gp', dt).subscribe(
                (data) => {
                  this.save_dt = data;
                  console.log(this.save_dt, 'save_dt');
          
                  if (this.save_dt.suc > 0) {
                    Swal.fire('Success', 'GP Form approved successfully', 'success').then(
                      (result) => {
                        if (result.isConfirmed) {
                          this.router.navigate(['/admin/admin_approve_group_policy']);
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
