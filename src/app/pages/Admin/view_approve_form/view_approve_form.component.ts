import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view_approve_form',
  templateUrl: './view_approve_form.component.html',
  styleUrls: ['./view_approve_form.component.css'],
  providers: [DatePipe]
})
export class View_approve_formComponent implements OnInit {
  userData: any;
  form!: FormGroup;
  flag: any;
  encodedFormNo: any;
  mem_type: any;
  trn_id: any = 0;
  pay_mode: any;
  fromNo: any
  selectedValue3: string = 'N'
  responsedata: any;

  constructor(private router: Router,
    private fb: FormBuilder, private route: ActivatedRoute,
    private dataServe: DataService, private datePipe: DatePipe) {
      this.form = this.fb.group({
        form_no: [''],
        trn_dt: [''],
        trn_id: [''],
        memb_name: [''],
        unit_name: [''],
        sub_amt: [''],
        onetime_amt: [''],
        adm_fee: [''],
        donation_fee: [''],
        pre_amt: [''],
        tot_amt: [''],
        pay_mode: [''],
        chq_no: [''],
        chq_dt: [''],
        bank_nm: [''],
        phone_no: [''],
        email_id: [''],
        staff_no: [''],
        pers_no: [''],
        min_no: [''],
        resolution_no: [''],
        resolution_dt: ['']
      });
      this.bank_list();
     }

  ngOnInit() {
    const encodedFormNo = this.route.snapshot.params['form_no'];
    this.fromNo = atob(decodeURIComponent(encodedFormNo));
    console.log(this.fromNo,'form');
    
    // this.flag=  this.route.snapshot.params['flag'];
    this.mem_type = this.route.snapshot.params['mem_type'];
    this.pay_mode = this.route.snapshot.params['pay_mode'];
    this.getData();
  }
 
  bank_list() {
    this.dataServe.global_service(0, '/master/bank_name_list', `org_flag=W`).subscribe((data:any) => {
      this.responsedata = data
      console.log(this.responsedata);
      this.responsedata = this.responsedata.suc > 0 ? this.responsedata.msg : []
      // this.responsedata = this.responsedata.suc > 0 ? (this.responsedata[0].org_flag.filter((dt:any) => )) : []
      })
  
  }

  getData () {
    this.dataServe.global_service(0,'/transaction_dt',`form_no=${this.fromNo}`).subscribe(data => {
      console.log(data)
      this.userData = data;
      this.userData =
              this.userData.suc > 0 ? this.userData.msg : {};
      console.log(this.userData,'mistu');
      this.form.patchValue({
        form_no: this.userData[0]?.form_no,
        trn_dt: this.datePipe.transform(this.userData[0].trn_dt, 'yyyy-MM-dd'),
        trn_id: this.userData[0].trn_id,
        memb_name: this.userData[0].memb_name,
        unit_name:  this.userData[0].unit_name,
        sub_amt: this.userData[0].sub_amt,
        onetime_amt: this.userData[0].onetime_amt,
        phone_no: this.userData[0].phone_no,
        email_id: this.userData[0].email_id,
        staff_no: this.userData[0].staff_nos,
        pers_no: this.userData[0].pers_no,
        min_no: this.userData[0].min_no,
        resolution_no: this.userData[0].resolution_no,
        resolution_dt: this.datePipe.transform(this.userData[0].resolution_dt, 'yyyy-MM-dd'),
        adm_fee: this.userData[0].adm_fee,
        donation_fee: this.userData[0].donation,
        pre_amt: this.userData[0].premium_amt,
        tot_amt: this.userData[0].tot_amt,
        pay_mode: this.userData[0].pay_mode=='C' ? 'Cash' : this.userData[0].pay_mode=='Q' ? 'Cheque' : 'Online Transaction',
        chq_no: this.userData[0].chq_no,
        chq_dt: this.datePipe.transform(this.userData[0].chq_dt, 'yyyy-MM-dd'),
        bank_nm: this.userData[0].chq_bank=='74' ? 'Cash at BSE(Cal) Co op Cr Soc Ltd' : this.userData[0].chq_bank=='75' ? 'Cash at UCO Bank (A/c No.)' : ''
      })
  })
}

get f() {
  return this.form.controls;
}

approve (){
  var dt = {
    flag: this.mem_type,
    formNo: this.fromNo,
    member: this.f['memb_name'] ? this.f['memb_name'].value : null,
    phone_no: this.f['phone_no'] ? this.f['phone_no'].value : null,
    trn_dt:  this.f['trn_dt'] ? this.f['trn_dt'].value : null,
    trn_id: this.f['trn_id'] ? this.f['trn_id'].value : null,
    sub_amt:  this.f['sub_amt'] ? this.f['sub_amt'].value : null,
    onetime_amt:  this.f['onetime_amt'] ? this.f['onetime_amt'].value : null,
    user: localStorage.getItem('user_name'),
    tot_amt: this.f['sub_amt'].value + this.f['onetime_amt'].value + (this.f['adm_fee'].value > 0 ? this.f['adm_fee'].value : 0) + (this.f['donation_fee'].value > 0 ? this.f['donation_fee'].value : 0),
    adm_fee: this.f['adm_fee'].value + this.f['adm_fee'].value,
    tot_asso_amt: this.f['sub_amt'].value + this.f['adm_fee'].value,
    admission_acc_id: this.userData[0].mem_type == 'G' ? 65 : (this.userData[0].mem_type == 'AI' ? 66 : 0),
    donation_acc_id: this.userData[0].mem_type == 'G' ? 70 : 0,
    donation_amt: this.f['donation_fee'].value,
    admission_amt: this.f['adm_fee'].value,
    chq_no: this.userData[0].chq_no,
    chq_dt:this.userData[0].chq_dt,
    memb_type: this.userData[0].mem_type,
    pay_mode: this.userData[0].pay_mode,
    acc_code: this.userData[0]?.pay_mode != 'Q' ? (this.userData[0]?.pay_mode == 'C' ? 73 : (this.userData[0]?.pay_mode == 'O' ? 75 : 0)) : this.userData[0].chq_bank,
    // remarks: Amount deposited for opening of member for member no
  }

  console.log(dt)

  this.dataServe.global_service(1,this.mem_type == 'G' ? '/approve' : this.mem_type == 'L ' ? '/approve_life' : '/approve_associate',dt).subscribe(data => {
    console.log(data)
    this.userData = data;
    if(this.userData.suc > 0){
      this.trn_id = this.userData.trn_id;
      Swal.fire(
        'Success! Your form is approved successfully.',
        `Member ID is ${this.userData.mem_id} <br> Transaction ID is ${this.trn_id}`,
        'success'
      ).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/admin/approve_form']);
        }
      });
    }else {
      Swal.fire(
        'Error',
        'Your form is not submitted successfully!',
        'error'
      );
    }
  })
}


}
