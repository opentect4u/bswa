import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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

  displayedColumns: string[] = ['position', 'transactionDate', 'transactionId', 'amount', 'payMode', 'status', 'view'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataServe: DataService, public dialogService: DialogService, private router: Router) { }

  ngOnInit() {
    this.form_no = localStorage.getItem('form_no')
    this.member_id = localStorage.getItem('member_id');
    this.getTransactionDetails(this.form_no);
  }

  getTransactionDetails(form_no:any){
    form_no = `'${form_no}'`;
    
    this.dataServe.global_service(1, '/user_tnx_details',{form_no})
          .subscribe((data: any) => {
            this.trnResData = data;
            const transData = this.trnResData.suc > 0 ? this.trnResData.msg : [];
            this.dataSource.data = transData;
            this.dataSource.paginator = this.paginator;
          });
  }

  preview(trn_id:any){
    this.router.navigate(['/main/trn_history_view',trn_id]);
  }

}
