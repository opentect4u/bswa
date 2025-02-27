import { Component, OnInit, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';

interface MemberStatus {
  name: string;
  code: string;
}

interface MembershipInfo {
  mem_type: string,
  memb_name: string,
  member_id: string,
  gurdian_name: string,
  gender: string,
  marital_status: string,
  dob: string
  unit_name: string,
  phone: string,
  memb_img: string,
  doc_img: string,
  form_dt: string;
  memb_oprn: string;
  disease_flag: string;
  disease_type: string;
}

interface SpouseDepenInfo {
  sl_no: string,
  dependent_name: string,
  relation_name: string,
  dob: string,
  disease_flag: string,
  disease_type: string;
  dep_img: string;
  dep_doc: string;
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
  selector: 'app-group_policy_view_form',
  templateUrl: './group_policy_view_form.component.html',
  styleUrls: ['./group_policy_view_form.component.css'],
  providers: [DatePipe],
})
export class Group_policy_view_formComponent implements OnInit  {
  secretKey = environment.secretKey
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  form_no: any;
  member_id:any;
  WindowObject: any;
  divToPrint: any;
  api_base_url = environment.api_url;
  selectedValues: any[] = [];
  responsedata: any;
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
  memb_img: any;
  responsedata_1: any;
  unit_name: any;
  spouseInfo: SpouseDepenInfo[] | undefined;
  stpinfo: MembershipInfo | undefined;
  ind_type: any;
  treatment_dtls:any;
  particulars:any;
  amount:any;
  fin_year:any;
  sup_top_list: any = [];
  additionalOptions: any = false;
  preinfo:  PremiumInfo | undefined;
  pre_amt_flag: any;
  pre_amt_value: any;
  tot_amt_value: any;
  genInsData: any;
  checkedmember: any  = false
  form!: FormGroup;
  maxDate!: string;
  responsedata_trust: any;
  save_dt: any;
  trn_id = 0;
  selectedValue: string = 'P';
  selectedValue2: string = 'O';
  selectedValue_3: string = 'Y';
  selectedValue3: string = 'N';
  // form_status : any;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataServe: DataService,
    private datePipe: DatePipe
  ) { }
  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();
    this.maxDate = `${year}-${month}-${day}`;

    const encodedFormNo = this.route.snapshot.params['form_no'];
    // console.log(encodedFormNo);
    
    this.member_id = localStorage.getItem('user_name')
    const encodedMemId = this.route.snapshot.params['member_id'];

    console.log(this.member_id,'ooo'); 
    this.form_no = atob(decodeURIComponent(encodedFormNo));
    this.member_id = atob(decodeURIComponent(encodedMemId));
    // console.log(this.form_no,'ggg');

    this.form = this.fb.group({
      resolution_no: ['', Validators.required],
      resolution_dt: ['', Validators.required],
      status: ['', Validators.required],
      reject: ['', Validators.required],
      payment: [''],
      form_dt: ['', Validators.required],
      pre_amt: ['', Validators.required],
      totalAmount: [{ value: 0, disabled: true }],
      ins_period: [{ value: 0, disabled: true }],
      pre_dt: [''],
      cheque_dt: ['', Validators.required],
      cheque_no: ['', Validators.required],
      bank_name: ['', Validators.required],
      receipt_no: [''],
    });

    this.form.valueChanges.subscribe(() => {
      this.calculateTotalAmount();
    });

    
    this.checkedmember = this.route.snapshot.params['checkedmember'];
    this.getGenInsInfo()
    this.getTransactionInfo();
    // this.bank_list();
  }

  // bank_list() {
  //   this.dataServe
  //     .global_service(0, '/master/bank_name_list_trust', `org_flag=T`)
  //     .subscribe((data: any) => {
  //       this.responsedata_trust = data;
  //       console.log(this.responsedata_trust);
  //       this.responsedata_trust =
  //         this.responsedata_trust.suc > 0 ? this.responsedata_trust.msg : [];
  //       // this.responsedata = this.responsedata.suc > 0 ? (this.responsedata[0].org_flag.filter((dt:any) => )) : []
  //     });
  // }


  calculateTotalAmount() {
    const premiumAmt = this.preinfo?.premium_amt || 0;
    const additionalAmt = this.pre_amt_value || 0;
    
    const tot_amt_value = premiumAmt + additionalAmt;
    this.form.get('totalAmount')?.setValue(tot_amt_value, { emitEvent: false });
}

  getMemberInfo(memb_id:any) {
    this.dataServe
      .global_service(0, '/get_member_policy_print', `member_id=${memb_id}&&form_no=${this.form_no}`)
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
        console.log(this.stpinfo,'stp');
        
      });
  }

  getGenInsInfo() {
    this.dataServe
      .global_service(0, '/get_gen_ins_dt', `form_no=${this.form_no}`)
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
    this.getSpouseInfo(this.genInsData.member_id ? this.genInsData.member_id : '');
    this.getPremiumInfo();
      });
  }

  getSpouseInfo(memb_id:any) {
    this.dataServe
      .global_service(0, '/get_member_policy_dependent_print', `member_id=${memb_id}&&form_no=${this.form_no}`)
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
      });
  }

  getPremiumInfo(){
    this.dataServe
    .global_service(0, '/premium_dtls', `form_no=${this.form_no}`)
    .subscribe((data: any) => {
      this.responsedata = data;
      console.log(this.responsedata, '666');
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
  // getPremiumAmt(event:any){
  //   console.log(event.target.value);
  //   var dropVal = event.target.value
  //   var filter_res_dt = this.responsedata.length > 0 ? (this.responsedata[0].pre_dt.filter((dt:any) => dt.family_type == dropVal)) : []
  //   if(filter_res_dt.length > 0){
  //     var sup_top_dt = [{name: 'Super Top up Amount 12 lacs', value: filter_res_dt[0].premium2}, {name: 'Super Top up Amount 24 lacs', value: filter_res_dt[0].premium3}]
  //     this.sup_top_list = sup_top_dt
  //     this.form.patchValue({pre_amont: filter_res_dt[0].premium1})
  //   }
    
  // }
  reject_submit() {
    var dt = {
      formNo: this.form_no,
      member: this.route.snapshot.params['memb_name'],
      resolution_no: this.f['resolution_no']
        ? this.f['resolution_no'].value
        : null,
      resolution_dt: this.f['resolution_dt']
        ? this.f['resolution_dt'].value
        : null,
      status: this.f['status'] ? this.f['status'].value : null,
      reject: this.f['reject'] ? this.f['reject'].value : null,
      user: localStorage.getItem('user_name'),
      user_name: this.stpinfo?.memb_name,
      phone_no: this.stpinfo?.phone,
    };

    this.dataServe
      .global_service(1, '/reject_group_policy', dt)
      .subscribe((data: any) => {
        this.resdata = data;
        console.log(this.resdata, '99');
        if (this.resdata.suc > 0) {
          this.router.navigate(['/admin/admin_group_premium_approve']);
        }
      });
  }

  getTransactionInfo() {
    this.dataServe
      .global_service(0, '/get_gmp_transaction', `form_no=${this.form_no}`)
      .subscribe((data: any) => {
        this.resdata = data;
        console.log(this.resdata);
        this.resdata = this.resdata.suc > 0 ? this.resdata.msg : [];
        // console.log(this.resdata[0].subscription_1)
        if (this.resdata.length > 0) {
          this.form.patchValue({
            resolution_no: this.resdata[0]?.resolution_no,
            resolution_dt: this.datePipe.transform(
              this.resdata[0]?.resolution_dt,
              'yyyy-MM-dd'
            ),
            status: this.resdata[0]?.form_status,
            pre_amt: this.resdata[0]?.premium_amt,
            form_dt: this.datePipe.transform(
              this.resdata[0]?.form_dt,
              'yyyy-MM-dd'
            ),
            pre_dt: this.datePipe.transform(
              this.resdata[0]?.premium_dt,
              'yyyy-MM-dd'
            ),
            receipt_no: this.resdata[0]?.receipt_no,
            payment: this.resdata[0]?.pay_mode,
            cheque_dt: this.datePipe.transform(
              this.resdata[0]?.chq_dt,
              'yyyy-MM-dd'
            ),
            cheque_no: this.resdata[0]?.chq_no,
            bank_name: this.resdata[0]?.chq_bank,
          });
          this.selectedValue2 = this.resdata[0]?.pay_mode;
          this.selectedValue3 = this.resdata[0]?.chq_bank;

          this.trn_id = this.resdata[0]?.trn_id;
        }
      });
  }

  save() {
    var payEncData = '';
    if (this.f['payment'].value == 'O') {
      var payData = {
        form_no: this.form_no,
        member_id: '',
        memb_name: this.stpinfo?.memb_name,
        amount: this.f['totalAmount'] ? this.f['totalAmount'].value : null,
        phone_no: this.stpinfo?.phone,
        email: '',
        approve_status: 'A',
        calc_upto: '',
        subs_type: '',
        sub_fee: this.f['totalAmount'] ? this.f['totalAmount'].value : null,
        redirect_path: '/',
        soc_flag: 'T',
        trn_id: this.trn_id
      };
      console.log(this.trn_id, payData, '+++++++++///////////////');
      
      payEncData = CryptoJS.AES.encrypt(
        JSON.stringify(payData),
        this.secretKey
      ).toString();
    }
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
      // ins_period: this.f['ins_period'] ? this.f['ins_period'].value : null,
      form_dt: this.f['form_dt'] ? this.f['form_dt'].value : null,
      pre_dt: this.f['pre_dt'] ? this.f['pre_dt'].value : null,
      pre_amt: this.f['pre_amt'] ? this.f['pre_amt'].value : null,
      totalAmount: this.f['totalAmount'] ? this.f['totalAmount'].value : null,
      payment: this.f['payment'] ? this.f['payment'].value : null,
      receipt_no: this.f['receipt_no'] ? this.f['receipt_no'].value : null,
      cheque_dt: this.f['cheque_dt'] ? this.f['cheque_dt'].value : null,
      cheque_no: this.f['cheque_no'] ? this.f['cheque_no'].value : null,
      bank_name:
        this.f['payment'].value == 'Q'
          ? this.f['bank_name'].value
          : this.f['payment'].value == 'O'
          ? '75'
          : '16',
      member: this.stpinfo?.memb_name,
      phone_no: this.stpinfo?.phone,
      trn_id: this.trn_id,
      payEncDataGen: payEncData,
    };
    this.dataServe.global_service(1, '/save_trn_data_gmp', dt).subscribe(
      (data) => {
        this.save_dt = data;
        console.log(this.save_dt, 'save_dt');

        if (this.save_dt.suc > 0) {
          Swal.fire('Success', 'Premium deposit successfully', 'success').then(
            (result) => {
              if (result.isConfirmed) {
                // this.showDepoEntry = false;
                // this.form.reset()
                // this.entryForm.reset()
                if(dt.payment != 'O')
                this.router.navigate([
                  '/admin/accept_gmp_money_receipt',
                  this.form_no,
                  this.save_dt.trn_id,
                ]);
                else
                this.router.navigate(['/admin/admin_group_premium_approve']);
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


  paynow(){
    var memberName = this.stpinfo?.memb_name;
    var subscriptionAmount = this.tot_amt_value;
    var form_no = this.form_no; 
    var member_id = this.genInsData?.member_id;

    var custDt = { form_no: form_no, member_id: '', memb_name: memberName, amount: subscriptionAmount, phone_no: this.stpinfo?.phone, email: '',  calc_upto: '',
      subs_type: '', sub_fee: this.tot_amt_value, redirect_path: '/',  soc_flag: 'T',
      trn_id: '', approve_status: 'A', pay_flag: 'D' }

    const encDt = CryptoJS.AES.encrypt(JSON.stringify(custDt),this.secretKey ).toString();

    console.log(encDt,'amt');
    
    
    this.router.navigate(['/auth/payment_preview_page'], { 
      queryParams: { enc_dt: encDt }
    });
  }

}
