import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';

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

@Component({
  selector: 'app-subs-depo-entry',
  templateUrl: './subs-depo-entry.component.html',
  styleUrls: ['./subs-depo-entry.component.css']
})
export class SubsDepoEntryComponent implements OnInit {
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
  responsedata: any;
  maxDate!: string;

  constructor(private router: Router,private formBuilder: FormBuilder, private dataServe: DataService) { }

  ngOnInit() {

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();
    this.maxDate = `${year}-${month}-${day}`;


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

  calculateSubsFee(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
  
      // Check if the value is a number and greater than zero
      if (typeof value !== 'number' || isNaN(value) || value <= 0) {
        return { invalidAmount: { value: value } };
      }
  
      // Example subscription fee for validation
      let sub_fee = this.responsedata_subs[0]?.subscription_1;
  
      // Check if sub_fee is valid
      if (typeof sub_fee !== 'number' || isNaN(sub_fee) || sub_fee === 0) {
        return { invalidSubscriptionFee: { sub_fee: sub_fee } };
      }
  
      // Check divisibility
      if (value % sub_fee !== 0) {
        return { notDivisibleBySubFee: { value: value, sub_fee: sub_fee } };
      }
  
      return null;
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

  subscription_fee(memb_type: any){
    this.dataServe.global_service(0, '/master/subscription_fee_dynamic', `memb_type=${memb_type}`).subscribe((data:any) => {
      this.responsedata_subs = data
      console.log(this.responsedata_subs,'ooopsss');
      this.responsedata_subs = this.responsedata_subs.suc > 0 ? this.responsedata_subs.msg : []
      var nowDate = new Date()
      var cal_upto = new Date(this.userData!.calc_upto)
      var cal_month = nowDate.getMonth() - cal_upto.getMonth()
      console.log(cal_month,'month');
      
      
      this.entryForm.patchValue({        
        subs_amt: (cal_month > 0 ? cal_month : 1) * this.responsedata_subs[0].subscription_1 + parseInt(this.userData!.calc_amt)
      })
      console.log(this.entryForm.value.subs_amt);
      this.entryForm.get('subs_amt')?.setValidators([Validators.required, this.calculateSubsFee()])
      this.entryForm.get('subs_amt')?.updateValueAndValidity();
      })
      // console.log(subs_amt, 'qwqwqw')
  }

  save(){
    var dt = {
      memb_id: this.m['mem_id'].value,
      form_dt: this.f['form_dt'] ? this.f['form_dt'].value : null,
      sub_fee: this.responsedata_subs[0].subscription_1,
      sub_amt: this.f['subs_amt'].value,
      user: localStorage.getItem('user_name'),
      last_subs: this.f['subs_upto'].value,
      pay_mode: this.f['payment'].value,
      receipt_no: this.f['payment'].value == 'C' ? this.f['receipt_no'].value : this.f['payment'].value == 'O' ? this.f['receipt_no_online'].value : '',
      chq_no: this.f['cheque_no'].value,
      chq_dt: this.f['cheque_dt'].value,
      chq_bank: this.f['payment'].value == 'Q' ? this.f['bank_name'].value : this.f['payment'].value == 'O' ? '75' : '73',
      memb_name: this.f['mem_name'].value,
      memb_type: this.f['mem_type'].value,
      form_no: this.f['form_no'].value,
      approval_status: 'U',
      cal_upto: this.userData?.calc_upto,
      cal_amt: this.userData?.calc_amt,
      phone_no: this.userData?.phone_no,
      member: this.userData?.memb_name 
    }
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
            this.router.navigate(['/admin/money_receipt',this.m['mem_id'].value, this.responseData.trn_id])
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
