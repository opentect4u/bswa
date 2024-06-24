import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view_group_approve_form',
  templateUrl: './view_group_approve_form.component.html',
  styleUrls: ['./view_group_approve_form.component.css'],
  providers: [DatePipe]
})
export class View_group_approve_formComponent implements OnInit {
  userData: any;
  form!: FormGroup;
  flag: any;
  encodedFormNo: any;
  mem_type: any;
  selectedValue: string = 'P';
  pay_mode: any;
  
  constructor(private router: Router,
    private fb: FormBuilder, private route: ActivatedRoute,
    private dataServe: DataService, private datePipe: DatePipe) {
      this.form = this.fb.group({
        form_no: [''],
        trn_dt: [''],
        trn_id: [''],
        pre_amt: [''],
        tot_amt: [''],
        pay_mode: [''],
        chq_no: [''],
        chq_dt: [''],
        bank_nm: [''],
        ins_period: [''],
        pre_dt: [''],
        memb_name: [''],
        unit_name: [''],
        resolution_dt: [''],
        resolution_no: ['']
      });
     }

  ngOnInit() {
    this.getData();
    this.encodedFormNo = this.route.snapshot.params['form_no'];
    // this.flag=  this.route.snapshot.params['flag'];
    this.mem_type = this.route.snapshot.params['mem_type'];
    this.pay_mode = this.route.snapshot.params['pay_mode'];
  }

  getData () {
    this.dataServe.global_service(0,'/transaction_dt_group',null).subscribe(data => {
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
        unit_name: this.userData[0].unit_name,
        pre_amt: this.userData[0].premium_amt,
        tot_amt: this.userData[0].premium_amt,
        pay_mode: this.userData[0].pay_mode=='C' ? 'Cash' : this.userData[0].pay_mode=='Q' ? 'Cheque' : 'Online Transaction',
        chq_no: this.userData[0].chq_no,
        chq_dt: this.datePipe.transform(this.userData[0].chq_dt, 'yyyy-MM-dd'),
        bank_nm: this.userData[0].chq_bank,
        ins_period: this.userData[0].ins_period=='Q' ? 'Quaterly' : this.userData[0].ins_period=='H' ? 'Half- Yearly' : 'Yearly',
        pre_dt: this.datePipe.transform(this.userData[0].premium_dt, 'yyyy-MM-dd'),
        resolution_dt: this.datePipe.transform(this.userData[0].resolution_dt, 'yyyy-MM-dd'),
        resolution_no: this.userData[0].resolution_no,
      })
  })
}

get f() {
  return this.form.controls;
}

approve (){
  var dt = {
    formNo: atob(decodeURIComponent(this.encodedFormNo)),
    // trn_dt:  this.f['trn_dt'] ? this.f['trn_dt'].value : null,
    // tot_amt:  this.f['tot_amt'] ? this.f['tot_amt'].value : null,
    user: localStorage.getItem('user_name')
  }

  this.dataServe.global_service(1,'/approve_group',dt).subscribe(data => {
    console.log(data)
    this.userData = data;
    if(this.userData.suc > 0){
      this.router.navigate(['/admin/group_policy_approve_form'])
    }
})
}


}
