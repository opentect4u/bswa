import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';

interface membInsInfo {
  member_id: String;
  form_no: String;
}

@Component({
  selector: 'app-trn-history',
  templateUrl: './trn-history.component.html',
  styleUrls: ['./trn-history.component.css'],
  providers: [DialogService]
})
export class TrnHistoryComponent implements OnInit {
  form_no: any
  member_id: any;
  trnResData: any;
  payMode:any = {'C': 'Cash', 'Q': 'Cheque', 'O': 'Online'}
  ref: DynamicDialogRef | any;
  responseDt: any
  memberInsDtls: membInsInfo | any
  presentIns: boolean = false
  constructor(private dataServe: DataService, public dialogService: DialogService, private router: Router) { }

  ngOnInit() {
    this.form_no = localStorage.getItem('form_no')
    this.member_id = localStorage.getItem('member_id');
    this.getInsDtls()
  }

  getInsDtls(){
  this.dataServe
  .global_service(1, '/get_grn_ins_dtls_with_member_id', { memb_id: this.member_id })
  .subscribe((data: any) => {
    this.responseDt = data;
    
    if(this.responseDt.suc > 0){
      if(this.responseDt.msg.length > 0){
        this.presentIns = true
        this.memberInsDtls = this.responseDt.suc > 0 ? this.responseDt.msg[0] : {};
      }
    }
    
    this.getTransactionDetails(this.form_no);
  });
  }

  getTransactionDetails(form_no:any){
    form_no = this.presentIns ? `'${form_no}','${this.memberInsDtls.form_no}'` : `'${form_no}'`
    // form_no = this.presentIns 
    // ? `${form_no},${this.memberInsDtls.form_no}`  // Don't add extra quotes here
    // : form_no;
    // form_no;
    
    this.dataServe.global_service(1, '/user_tnx_details',{form_no})
          .subscribe((data: any) => {
            this.trnResData = data;
            this.trnResData = this.trnResData.suc > 0 ? this.trnResData.msg : [];
          });
  }
  preview(trn_id:any){
    this.router.navigate(['/main/trn_history_view',trn_id]);
  }

}
