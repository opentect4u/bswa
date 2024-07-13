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
  calc_amt: string;
  calc_upto: string;
}

@Component({
  selector: 'app-depo-trns',
  templateUrl: './depo-trns.component.html',
  styleUrls: ['./depo-trns.component.css']
})
export class DepoTrnsComponent implements OnInit {
  responseData: any
  userData: UserInfo | any;
  entryForm!: FormGroup
  responsedata_subs: any;
  selectedValue2: string = 'C'
  memberType: any = {'G': 'General Membership', 'L': 'Life Membership', 'AI': 'Associate Membership'}
  constructor(private router: Router,private formBuilder: FormBuilder, private dataServe: DataService) { }

  ngOnInit() {
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
      phone_no: ['']
    })
    this.getSubsDtls()
  }

  get f() {
    return this.entryForm.controls;
  }

  getSubsDtls(){
    var dt = {
      memb_id: localStorage.getItem('member_id')
    };

    this.dataServe.global_service(1,'/get_mem_subs_dtls',dt).subscribe((data: any) => {
      // console.log(data,'kiki')
      this.responseData = data;
      if(this.responseData.suc > 0){
        this.userData = this.responseData.msg[0];
        if(this.responseData.msg.length > 0){
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
    })
  }

  calculateSubsFee() : ValidatorFn{
    return (control: AbstractControl) : ValidationErrors | null => {
      const value = control.value
      // console.log(value, 'lalalala');
      
      let sub_fee = this.responsedata_subs[0].subscription_1
      if(value % sub_fee !== 0){
        return {notDivisibleByTwo: {value: value}}
      }
      return null
    }
  }

  subscription_fee(memb_type: any){
    this.dataServe.global_service(0, '/master/subscription_fee_dynamic', `memb_type=${memb_type}`).subscribe((data:any) => {
      this.responsedata_subs = data
      // console.log(this.responsedata_subs,'ooo');
      this.responsedata_subs = this.responsedata_subs.suc > 0 ? this.responsedata_subs.msg : []
      var nowDate = new Date()
      var cal_upto = new Date(this.userData!.calc_upto)
      var cal_month = nowDate.getMonth() - cal_upto.getMonth()
      
      this.entryForm.patchValue({
        subs_amt: cal_month * this.responsedata_subs[0].subscription_1 + parseInt(this.userData!.calc_amt)
      })
      this.entryForm.get('subs_amt')?.setValidators([Validators.required, this.calculateSubsFee()])
      this.entryForm.get('subs_amt')?.updateValueAndValidity();
      // console.log(this.responsedata_subs[0].subscription_1, 'qwqwqw')
      })
  }

  save(){
    var dt = {
      memb_id: localStorage.getItem('member_id'),
      sub_fee: this.responsedata_subs[0].subscription_1,
      sub_amt: this.f['subs_amt'].value,
      user: localStorage.getItem('user_name'),
      last_subs: this.f['subs_upto'].value,
      pay_mode: this.f['payment'].value,
      receipt_no: this.f['receipt_no'].value,
      chq_no: this.f['cheque_no'].value,
      chq_dt: this.f['cheque_dt'].value,
      chq_bank: '75',
      memb_name: this.f['mem_name'].value,
      memb_type: this.f['mem_type'].value,
      form_no: this.f['form_no'].value,
      approval_status: 'U',
      cal_upto: this.userData?.calc_upto,
      cal_amt: this.userData?.calc_amt,
      phone_no: this.userData?.phone_no,
      member: this.userData?.memb_name 
    }
    this.dataServe.global_service(1,'/mem_sub_tnx_save_online',dt).subscribe(data => {
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
            // this.entryForm.reset()
            this.router.navigate(['/main/money_receipt_member',localStorage.getItem('member_id')])
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
