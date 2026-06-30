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

  displayedColumns: string[] = ['position', 'transactionDate', 'transactionId', 'amount', 'payMode', 'status', 'view'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
            const transData = this.trnResData.suc > 0 ? this.trnResData.msg : [];
            this.dataSource.data = transData;
            this.dataSource.paginator = this.paginator;
          });
  }

  preview(trn_id:any){
    this.router.navigate(['/main/trn_history_child_view',trn_id]);
  }

}
