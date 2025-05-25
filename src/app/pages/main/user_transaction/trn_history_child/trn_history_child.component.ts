import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';

interface membInsInfo {
  member_id: String;
  form_no: String;
}


@Component({
  selector: 'app-trn_history_child',
  templateUrl: './trn_history_child.component.html',
  styleUrls: ['./trn_history_child.component.css'],
  providers: [DialogService]
})
export class Trn_history_childComponent implements OnInit {
   form_no: any
    member_id: any;
    trnResData: any;
    ref: DynamicDialogRef | any;
    responseDt: any
    memberInsDtls: membInsInfo | any
    presentIns: boolean = false

  constructor(private dataServe: DataService, public dialogService: DialogService, private router: Router) { }

  ngOnInit() {
    this.form_no = localStorage.getItem('form_no')
    this.member_id = localStorage.getItem('member_id');
    this.getTransactionDetails(this.member_id);
  }


  getTransactionDetails(member_id : any){
    
    this.dataServe.global_service(1, '/fetch_trans_dtls',{member_id})
          .subscribe((data: any) => {
            this.trnResData = data;
            this.trnResData = this.trnResData.suc > 0 ? this.trnResData.msg : [];
          });
  }
  preview(trn_id:any){
    console.log(trn_id,'ki');
    
    this.router.navigate(['/main/trn_history_child_view',trn_id]);
  }

}
