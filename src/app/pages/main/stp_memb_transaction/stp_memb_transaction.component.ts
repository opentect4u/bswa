import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataService } from 'src/app/service/data.service';
// import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';

interface membInsInfo {
  member_id: String;
  form_no: String;
}

@Component({
  selector: 'app-stp_memb_transaction',
  templateUrl: './stp_memb_transaction.component.html',
  styleUrls: ['./stp_memb_transaction.component.css']
})
export class Stp_memb_transactionComponent implements OnInit {
   displayedColumns: string[] = ['position', 'transactionDate', 'transactionId', 'amount', 'payMode', 'status', 'view'];
   dataSource = new MatTableDataSource<any>([]);
   form_no: any
   member_id: any;
   trnResData: any;
  //  ref: DynamicDialogRef | any;
   responseDt: any
   memberInsDtls: membInsInfo | any
   presentIns: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataServe: DataService, private router: Router) { }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.member_id = localStorage.getItem('member_id');
    this.form_no = localStorage.getItem('form_no');
    this.getTransactionDetails(this.form_no);
  }

    getTransactionDetails(form_no : any){
    
    this.dataServe.global_service(1, '/fetch_stp_trans_dtls',{form_no})
          .subscribe((data: any) => {
            this.trnResData = data;
            const transData = this.trnResData.suc > 0 ? this.trnResData.msg : [];
            this.dataSource.data = transData;
            this.dataSource.paginator = this.paginator;
          });
  }
  formatDate(date: any): string {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return ''; // fallback for invalid dates
  return parsedDate.toISOString().split('T')[0]; // YYYY-MM-DD
}
  preview(trn_id:any,form_no:any,trn_dt:any){
    console.log(trn_id,'ki');
    
    this.router.navigate(['/main/stp_memb_trans_view',trn_id,form_no,trn_dt]);
  }

}
