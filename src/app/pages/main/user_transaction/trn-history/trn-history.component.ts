import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trn-history',
  templateUrl: './trn-history.component.html',
  styleUrls: ['./trn-history.component.css'],
  providers: [DialogService]
})
export class TrnHistoryComponent implements OnInit {
  form_no: any
  trnResData: any;
  payMode:any = {'C': 'Cash', 'Q': 'Cheque', 'O': 'Online'}
  ref: DynamicDialogRef | any;
  constructor(private dataServe: DataService, public dialogService: DialogService, private router: Router) { }

  ngOnInit() {
    this.form_no = localStorage.getItem('form_no')
    this.getTransactionDetails(this.form_no)
  }

  getTransactionDetails(form_no:any){
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
