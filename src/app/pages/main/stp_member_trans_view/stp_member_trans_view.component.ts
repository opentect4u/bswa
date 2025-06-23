import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stp_member_trans_view',
  templateUrl: './stp_member_trans_view.component.html',
  styleUrls: ['./stp_member_trans_view.component.css']
})
export class Stp_member_trans_viewComponent implements OnInit {
  today = new Date();
  trn_id:any
  member_id:any
  tranResData: any;
  trnData: any;
  divToPrint: any;
  WindowObject: any;

  constructor(private route: ActivatedRoute, private dataServe: DataService, private router: Router) { }

  ngOnInit() {
     this.trn_id = this.route.snapshot.params['trn_id'];
    this.member_id = localStorage.getItem('member_id')
    this.getTransDetails(this.member_id, this.trn_id)
  }

     getTransDetails(member_id:any, trn_id:any){
    this.dataServe.global_service(1, '/fetch_fr_view_stp_trans_dtls', {member_id,trn_id,}).subscribe((data: any) => {
        this.tranResData = data;
        this.tranResData = this.tranResData.suc > 0 ? this.tranResData.msg : [];
        this.trnData = this.tranResData.length > 0 ? this.tranResData[0] : {};
        console.log(this.trnData);
        
      });
     
  }

   goBack() {
    this.router.navigate(['/main/stp_memb_transaction']);
   }

    printDiv(): void {
  const printContents = document.getElementById('divToPrint')?.innerHTML;
  const popupWin = window.open('', '_blank', 'width=900,height=600');
  if (popupWin && printContents) {
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Receipt</title>
           <style>
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    margin: 20px;
    color: #000;
  }

  .logo-img {
    width: 100px;
    display: block;
    margin: 0 auto 16px;
  }

  .header-section {
    text-align: center;
  }

  .org-title {
    font-size: 20px;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 4px;
  }

  .sub-title {
    font-size: 16px;
    font-weight: 600;
    color: #061627;
    margin-bottom: 12px;
  }

  .row {
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 8px;
    align-items: center;
  }

  .label {
    width: 30%;
    font-weight: bold;
    color: #2c3e50;
    white-space: nowrap;
  }

  .colon {
    width: 2%;
  }

  .value {
    width: 68%;
    font-weight: 500;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bold-divider {
    border-top: 2px solid black;
    margin: 16px 0;
  }

  @media print {
    button {
      display: none !important;
    }
  }
</style>
        </head>
        <body onload="window.print(); window.close();">
          ${printContents}
        </body>
      </html>`);
    popupWin.document.close();
  }
}


}
