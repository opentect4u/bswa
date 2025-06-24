import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/service/data.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-stp_premium_dtls',
  templateUrl: './stp_premium_dtls.component.html',
  styleUrls: ['./stp_premium_dtls.component.css'],
   styles: [`
    th {
      background: #ce93d8;
      color: #fff;
      text-transform: uppercase;
    }
    td {
      background: #f3e5f5;
      font-weight: 500;
    }
  `],
  providers: [DatePipe],
})
export class Stp_premium_dtlsComponent implements OnInit {
   displayedColumns: string[] = ['sl_no','min_no', 'ind_type', 'fin_year', 'amount', 'particulars', 'treatment_details'];
   dataSource = new MatTableDataSource<any>([]);
   min_no: any;
   responseData: any
    userData: any;

  constructor(private router: Router,
    private fb: FormBuilder,
    private dataServe: DataService,
    private route: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit() {
   this.min_no = localStorage.getItem('min_no');

   this.fetchPremiumDetails();
  }

fetchPremiumDetails() {
  const dt = {
    min_no: localStorage.getItem('min_no'),
  };

  this.dataServe.global_service(1, '/fetch_premium_details_fr_stp_policy', dt).subscribe(
    (data: any) => {
      this.responseData = data;

      if (this.responseData.suc > 0) {
        const premiumList = this.responseData.msg;

        // If needed for heading or user info
        this.userData = premiumList[0]; 

        // Transform data for mat-table
        const transformed = premiumList.map((item: any) => ({
          sl_no: item.sl_no,
          min_no: item.min_no,
          ind_type: item.ind_type,
          fin_year: item.fin_year,
          amount: item.amount,
          particulars: item.particulars,
          treatment_details: item.treatment_dtls
        }));

        // Assign to Material Table datasource
        this.dataSource.data = transformed;
      } else {
        Swal.fire('No Data', 'No premium details found for the selected MIN No.', 'info');
        this.dataSource.data = []; // Clear table
      }
    },
    (error) => {
      console.error(error);
      Swal.fire('Error', 'An error occurred while fetching data', 'error');
    }
  );
}

  


}
