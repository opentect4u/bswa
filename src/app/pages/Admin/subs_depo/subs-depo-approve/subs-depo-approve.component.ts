import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';

interface TrnsDtls {
  trn_dt: string;
  trn_id: string;
  sub_amt: string;
  form_no: string;
}

@Component({
  selector: 'app-subs-depo-approve',
  templateUrl: './subs-depo-approve.component.html',
  styleUrls: ['./subs-depo-approve.component.css']
})
export class SubsDepoApproveComponent implements OnInit {
  responseData: any
  userData!: [TrnsDtls];

  constructor(private router: Router, private dataServe: DataService) { }

  ngOnInit() {
    this.getData ()
  }
  
  getData () {
    this.dataServe.global_service(1,'/get_tnx_details',null).subscribe(data => {
      console.log(data)
      this.responseData = data;
      this.userData = this.responseData.suc > 0 ? this.responseData.msg : [];
      // console.log(this.userData,'mistu');
  })
}

back(){
  this.router.navigate(['/admin/dashboard']);
}

view(trn_id:any, form_no:any){
  console.log(trn_id,'no');
  
  this.router.navigate(['/admin/subs_depo_appr_entry',encodeURIComponent(btoa(trn_id)),encodeURIComponent(btoa(form_no))])
}

}
