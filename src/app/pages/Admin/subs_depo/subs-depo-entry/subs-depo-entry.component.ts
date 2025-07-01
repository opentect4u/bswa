import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';


interface UserInfo {
  form_no: string;
  member_id: string;
  memb_name: string;
  mem_type: string;
  memb_oprn: string;
  phone_no: string;
  email_id: string;
  subscription_upto: string;
  calc_amt: any;
  calc_upto: string;
}

// interface FeeDtls{
//   effective_dt: string;
//   memb_type: string;
//   adm_fee: string;
//   donation: string;
//   subs_type: string;
//   subscription_1: string;
//   subscription_2: string;
// }

// interface MembDtls{
//   member_id: string;
//   form_no: string;
//   memb_name: string;
//   mem_type: string;
//   memb_oprn: string;
//   phone_no: string;
//   email_id: string;
//   subscription_upto: string;
//   calc_amt: any;
//   calc_upto: string;
// }

// interface TrnDtls{
//   form_no: string;
//   trn_dt: string;
//   trn_id: string;
//   sub_amt: string;
//   onetime_amt: string;
//   adm_fee: string;
//   donation: string;
//   premium_amt: string;
//   tot_amt: string;
//   pay_mode: string;
//   receipt_no: string;
//   chq_no: string;
//   chq_dt: string;
//   chq_bank: string;
//   approval_status: string;
//   approved_by: string;
//   approved_dt: string;
//   created_by: string;
//   created_at: string;
//   modified_by: string;
//   modified_at: string;
//   mem_dt: MembDtls;
//   fee_dt: FeeDtls;
// }

@Component({
  selector: 'app-subs-depo-entry',
  templateUrl: './subs-depo-entry.component.html',
  styleUrls: ['./subs-depo-entry.component.css']
})
export class SubsDepoEntryComponent implements OnInit {
  //  trn_id:any
  secretKey = environment.secretKey
  responseData: any
  userData: UserInfo | undefined;
  form!: FormGroup;
  entryForm!: FormGroup
  showDepoEntry: boolean = false
  messageService: any;
  responsedata_subs: any;
  selectedValue2: string = 'C'
  selectedValue3: string = 'N'
  member_id: any;
  phone_no: any;
  form_no: any;
  responsedata: any;
  maxDate!: string;
  // trnsData: TrnDtls | undefined;
  accType:any = {C: 'Cash', Q: 'Cheque', O: 'Online'}
  chqBank:any = {'74': 'Cash at BSE(Cal) Co op Cr Soc Ltd', '75': 'Cash at UCO Bank (A/c No.)'}

  constructor(private router: Router,private formBuilder: FormBuilder, private dataServe: DataService) { }

  ngOnInit() {

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();
    this.maxDate = `${year}-${month}-${day}`;
    this.form_no = localStorage.getItem('form_no')

    this.form = this.formBuilder.group({
      mem_id: ['',  Validators.required]
    })
    this.entryForm = this.formBuilder.group({
      subs_amt: [''],
      form_no: [''],
      payment: [''],
      receipt_no: [''],
      cheque_dt: [''],
      cheque_no: [''],
      bank_name: [''],
      subs_upto: [''],
      mem_name: [''],
      mem_type: [''],
      receipt_no_online: [''],
      phone_no: [''],
      form_dt: ['',Validators.required]
    })
    this.bank_list();
  }

  get m() {
    return this.form.controls;
  }

  get f() {
    return this.entryForm.controls;
  }

  bank_list() {
    this.dataServe.global_service(0, '/master/bank_name_list', `org_flag=W`).subscribe((data:any) => {
      this.responsedata = data
      console.log(this.responsedata);
      this.responsedata = this.responsedata.suc > 0 ? this.responsedata.msg : []
      // this.responsedata = this.responsedata.suc > 0 ? (this.responsedata[0].org_flag.filter((dt:any) => )) : []
      })
  
  }

  calculateSubsFee() : ValidatorFn{
    return (control: AbstractControl) : ValidationErrors | null => {
      const value = control.value
      // console.log(value, 'lalalala');

        // Check if the value is a number and greater than zero
        if (typeof value !== 'number' || isNaN(value) || value <= 0) {
          return { invalidAmount: { value: value } };
        }
    
      let sub_fee = 0
      switch (this.responsedata_subs[0].memb_type) {
        case 'G':
          sub_fee = this.responsedata_subs[0].subscription_1
          break;
        case 'AI':
          sub_fee = this.responsedata_subs[0].subscription_2
          break;
        case 'L':
          sub_fee = this.responsedata_subs[0].subscription_1
          break;
      
        default:
          break;
      }
      // let sub_fee = this.responsedata_subs[0].subscription_1

      if (typeof sub_fee !== 'number' || isNaN(sub_fee) || sub_fee === 0) {
        return { invalidSubscriptionFee: { sub_fee: sub_fee } };
      }

      if(value % sub_fee !== 0){
        return {notDivisibleBySubFee: {value: value}}
      }
      return null
    };
  }

  submit_search(){
    var dt = {
      memb_id: this.m['mem_id'].value
    };

    if(this.m['mem_id'].value.includes('AI')){
      Swal.fire(
        'Warning',
        'Associate Members are not allowed',
          'warning'
      )
      this.showDepoEntry = false;
      this.form.reset()
      this.entryForm.reset()
    }else{
      this.dataServe.global_service(1,'/get_mem_subs_dtls',dt).subscribe(data => {
        // console.log(data,'kiki')
        this.responseData = data;
        if(this.responseData.suc > 0){
          this.userData = this.responseData.msg[0];
          // console.log(this.userData,'lili');
          if(this.responseData.msg.length > 0){
            this.showDepoEntry = true;
            this.entryForm.patchValue({
              form_no: this.userData?.form_no,
              subs_upto: this.userData?.subscription_upto,
              mem_name: this.userData?.memb_name,
              mem_type: this.userData?.mem_type
            })
            this.subscription_fee(this.userData?.mem_type)
          }else{
            Swal.fire(
              'Warning',
              'No data found!!!',
              'warning'
            )
          }
        }else{
          Swal.fire(
            'Error',
            this.responseData.msg,
              'error'
          )
        }
        
        // this.show_spinner=true;
      },error => {
        console.error(error);
        Swal.fire(
          'Error',
          error,
            'error'
        )
      })
    }

  }

    subscription_fee(memb_type: any) {
    this.dataServe.global_service(0, '/master/subscription_fee_dynamic', `memb_type=${memb_type}`).subscribe((data: any) => {
      this.responsedata_subs = data;
      this.responsedata_subs = this.responsedata_subs.suc > 0 ? this.responsedata_subs.msg : [];
  
      const nowDate = new Date();
      const cal_upto = new Date(this.userData!.calc_upto);
      let calAmt = 0;
      let monthsDue = 0;
      let yearsDue = 0;
  
      const sub = this.responsedata_subs[0];
      const monthlyFee = sub.subscription_1;
      const annualFee = sub.subscription_1; // assuming annual for 'L'
      const previousDue = parseInt(this.userData!.calc_amt) || 0;
  
      if (nowDate <= cal_upto) {
        // Subscription still valid
        calAmt = previousDue;
      } else {
        switch (sub.memb_type) {
          case 'G':
          case 'default':
            monthsDue = (nowDate.getFullYear() - cal_upto.getFullYear()) * 12 + (nowDate.getMonth() - cal_upto.getMonth());
            calAmt = monthsDue * monthlyFee + previousDue;
            break;
          case 'AI':
            calAmt = sub.subscription_2 + previousDue;
            break;
          case 'L':
            yearsDue = nowDate.getFullYear() - cal_upto.getFullYear();
            calAmt = yearsDue * annualFee + previousDue;
            break;
        }
      }
  
      this.entryForm.patchValue({
        subs_amt: calAmt
      });
      this.entryForm.get('subs_amt')?.setValidators([Validators.required, this.calculateSubsFee()]);
      this.entryForm.get('subs_amt')?.updateValueAndValidity();
    });
  }

  // subscription_fee(memb_type: any){
  //   this.dataServe.global_service(0, '/master/subscription_fee_dynamic', `memb_type=${memb_type}`).subscribe((data:any) => {
  //     this.responsedata_subs = data
  //     console.log(this.responsedata_subs,'ooopsss');
  //     this.responsedata_subs = this.responsedata_subs.suc > 0 ? this.responsedata_subs.msg : []
  //     var nowDate = new Date()
  //     var cal_upto = new Date(this.userData!.calc_upto)
  //     var cal_month = cal_upto.getFullYear() > nowDate.getFullYear() ? 0 : (nowDate.getMonth() - cal_upto.getMonth())
  //     console.log(cal_month,'month');
      
      
  //     this.entryForm.patchValue({        
  //       subs_amt: (cal_month > 0 ? cal_month : 1) * this.responsedata_subs[0].subscription_1 + parseInt(this.userData!.calc_amt)
  //     })
  //     console.log(this.entryForm.value.subs_amt);
  //     this.entryForm.get('subs_amt')?.setValidators([Validators.required, this.calculateSubsFee()])
  //     this.entryForm.get('subs_amt')?.updateValueAndValidity();
  //     })
  //     // console.log(subs_amt, 'qwqwqw')
  // }

  save(){
    // var encDt = ''
    // if(this.f['payment'].value == 'O'){
    //   var custDt = { form_no: this.f['form_no'].value, member_id: this.m['mem_id'].value, memb_name: this.f['mem_name'].value, amount: this.f['subs_amt'].value, phone_no: this.userData?.phone_no, email: '', approve_status: 'U', calc_upto: this.userData?.calc_upto, subs_type: this.responsedata_subs.length > 0 ? this.responsedata_subs[0].subs_type : 'M', sub_fee: this.responsedata_subs[0].subscription_1, redirect_path: '/admin/subs_depo_entry' }
    //   encDt = CryptoJS.AES.encrypt(JSON.stringify(custDt),this.secretKey ).toString();
    // }

    //----------------------------//
    //comment off 30.06.2025//
    var dt = {
      memb_id: this.m['mem_id'].value,
      form_dt: this.f['form_dt'] ? this.f['form_dt'].value : null,
      sub_fee: this.responsedata_subs[0].subscription_1,
      sub_amt: this.f['subs_amt'].value,
      user: localStorage.getItem('user_name'),
      last_subs: this.f['subs_upto'].value,
      form_no: this.f['form_no'].value,
      approval_status: 'A',
      // trn_id: this.trn_id,
      cal_upto: this.userData?.calc_upto,
      cal_amt: this.userData?.calc_amt,
      pay_mode: this.f['payment'].value,
      receipt_no: this.f['receipt_no'].value,
      // receipt_no: this.f['payment'].value == 'C' ? this.f['receipt_no'].value : this.f['payment'].value == 'O' ? this.f['receipt_no_online'].value : '',
      // chq_no: this.f['cheque_no'].value,
      // chq_dt: this.f['cheque_dt'].value,
      // chq_bank: this.f['payment'].value == 'Q' ? this.f['bank_name'].value : this.f['payment'].value == 'O' ? '75' : '73',
      memb_name: this.f['mem_name'].value,
      memb_type: this.f['mem_type'].value,
      phone_no: this.userData?.phone_no,
      member: this.userData?.memb_name ,
      acc_code: this.f['payment'].value == 'C' ? '73' : '0',
      remarks: `Subscription Amount deposited for existing of member for member no ${this.m['mem_id'].value}`
      // pay_enc_data: encDt,
    }
    console.log(dt,'dst');
    
   // -----------------------------//

    this.dataServe.global_service(1,'/mem_sub_tnx_save',dt).subscribe(data => {
      // console.log(data,'kiki')
      this.responseData = data;
      if(this.responseData.suc > 0){
        // this.userData = this.responseData.msg[0];
        Swal.fire(
          'Success',
          'Subscription deposit submited successfully',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.showDepoEntry = false;
            // this.form.reset()
            // this.entryForm.reset()
            if(dt.pay_mode != 'O')
            this.router.navigate(['/admin/money_receipt',this.m['mem_id'].value, this.responseData.trn_id])
            else{
              this.form.reset()
              this.entryForm.reset()
              this.router.navigate(['/admin/subs_depo_entry'])
            }
          }
        });
      }else{
        Swal.fire(
          'Error',
          this.responseData.msg,
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
    })
  }

}
