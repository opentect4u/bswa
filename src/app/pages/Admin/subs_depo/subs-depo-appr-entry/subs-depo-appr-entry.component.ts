import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';

interface FeeDtls{
  effective_dt: string;
  memb_type: string;
  adm_fee: string;
  donation: string;
  subs_type: string;
  subscription_1: string;
  subscription_2: string;
}

interface MembDtls{
  member_id: string;
  form_no: string;
  memb_name: string;
  mem_type: string;
  memb_oprn: string;
  phone_no: string;
  email_id: string;
  subscription_upto: string;
  calc_amt: string;
  calc_upto: string;
}

interface TrnDtls{
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
  approved_by: string;
  approved_dt: string;
  created_by: string;
  created_at: string;
  modified_by: string;
  modified_at: string;
  mem_dt: MembDtls;
  fee_dt: FeeDtls;
}

@Component({
  selector: 'app-subs-depo-appr-entry',
  templateUrl: './subs-depo-appr-entry.component.html',
  styleUrls: ['./subs-depo-appr-entry.component.css']
})
export class SubsDepoApprEntryComponent implements OnInit {
  trn_id:any
  frm_no: any;
  responseData: any;
  trnsData: TrnDtls | undefined;
  entryForm!: FormGroup
  accType = {C: 'Cash', Q: 'Cheque', O: 'Online'}
  constructor(private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute, private dataServe: DataService) { }
  ngOnInit() {
    const enctrn_id = this.route.snapshot.params['trn_no'];
    this.trn_id = atob(decodeURIComponent(enctrn_id))
    const encFrm_no = this.route.snapshot.params['frm_no'];
    this.frm_no = atob(decodeURIComponent(encFrm_no))
    
    this.entryForm = this.formBuilder.group({
      subs_amt: [''],
      form_no: [''],
      subs_upto: [''],
      mem_name: [''],
      mem_type: ['']
    })

    this.getTrnData(this.trn_id, this.frm_no)
  }

  getTrnData(trn_id: any, frm_no: any){
    this.dataServe.global_service(1,'/get_tnx_details',{trn_id,frm_no}).subscribe(data => {
      console.log(data)
      this.responseData = data;
      this.trnsData = this.responseData.suc > 0 ? this.responseData.msg[0] : {}
      // this.userData = this.responseData.suc > 0 ? this.responseData.msg : [];
      // console.log(this.userData,'mistu');
    })
  }

  save(){
    var dt = {
      memb_id: this.trnsData?.mem_dt.member_id,
      sub_fee: this.trnsData?.fee_dt.subscription_1,
      sub_amt: this.trnsData?.sub_amt,
      user: localStorage.getItem('user_name'),
      last_subs: this.trnsData?.mem_dt.subscription_upto,
      form_no: this.trnsData?.form_no,
      approval_status: 'A',
      trn_id: this.trn_id,
      sub_type: this.trnsData?.fee_dt.subs_type,
      calc_amt: this.trnsData?.mem_dt.calc_amt,
      calc_upto: this.trnsData?.mem_dt.calc_upto,
      paid_month_amt: (parseInt(this.trnsData!.sub_amt) - parseInt(this.trnsData!.mem_dt.calc_amt))
    }
    this.dataServe.global_service(1,'/mem_subs_dtls_save',dt).subscribe(data => {
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
            this.router.navigate(['/admin/subs_depo_approve'])
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
