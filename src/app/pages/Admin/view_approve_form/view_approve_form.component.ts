import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

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


  constructor(private router: Router,
    private fb: FormBuilder, private route: ActivatedRoute,
    private dataServe: DataService, private datePipe: DatePipe) {
      this.form = this.fb.group({
        form_no: [''],
        trn_dt: [''],
        trn_id: [''],
        sub_amt: [''],
        adm_fee: [''],
        donation_fee: [''],
        pre_amt: [''],
        tot_amt: [''],
        pay_mode: [''],
        chq_no: [''],
        chq_dt: [''],
        bank_nm: [''],
      });
     }

  ngOnInit() {
    this.getData();
    this.encodedFormNo = this.route.snapshot.params['form_no'];
    // this.flag=  this.route.snapshot.params['flag'];
    this.mem_type = this.route.snapshot.params['mem_type'];

  }
 

  getData () {
    this.dataServe.global_service(0,'/transaction_dt',null).subscribe(data => {
      console.log(data)
      this.userData = data;
      this.userData =
              this.userData.suc > 0 ? this.userData.msg : {};
      console.log(this.userData,'mistu');
      this.form.patchValue({
        form_no: this.userData[0]?.form_no,
        trn_dt: this.datePipe.transform(this.userData[0].trn_dt, 'yyyy-MM-dd'),
        trn_id: this.userData[0].trn_id,
        sub_amt: this.userData[0].sub_amt,
        adm_fee: this.userData[0].adm_fee,
        donation_fee: this.userData[0].donation,
        pre_amt: this.userData[0].premium_amt,
        tot_amt: this.userData[0].tot_amt,
        pay_mode: this.userData[0].pay_mode,
        chq_no: this.userData[0].chq_no,
        chq_dt: this.datePipe.transform(this.userData[0].chq_dt, 'yyyy-MM-dd'),
        bank_nm: this.userData[0].chq_bank
      })
  })
}

get f() {
  return this.form.controls;
}

approve (){
  var dt = {
    flag: this.mem_type,
    formNo: atob(decodeURIComponent(this.encodedFormNo)),
    trn_dt:  this.f['trn_dt'] ? this.f['trn_dt'].value : null,
    tot_amt:  this.f['tot_amt'] ? this.f['tot_amt'].value : null,
    user: localStorage.getItem('user_name')
  }

  this.dataServe.global_service(1,'/approve',dt).subscribe(data => {
    console.log(data)
    this.userData = data;
    if(this.userData.suc > 0){
      this.router.navigate(['/admin/approve_form'])
    }
})
}


}
