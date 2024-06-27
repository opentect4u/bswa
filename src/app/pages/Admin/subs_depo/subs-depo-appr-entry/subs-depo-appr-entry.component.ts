import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-subs-depo-appr-entry',
  templateUrl: './subs-depo-appr-entry.component.html',
  styleUrls: ['./subs-depo-appr-entry.component.css']
})
export class SubsDepoApprEntryComponent implements OnInit {
  trn_id:any
  frm_no: any;
  responseData: any;
  constructor(private route: ActivatedRoute, private dataServe: DataService) { }
  ngOnInit() {
    const enctrn_id = this.route.snapshot.params['trn_no'];
    this.trn_id = atob(decodeURIComponent(enctrn_id))
    const encFrm_no = this.route.snapshot.params['frm_no'];
    this.frm_no = atob(decodeURIComponent(encFrm_no))
  }

  getTrnData(trn_id: any, frm_no: any){
    this.dataServe.global_service(1,'/get_tnx_details',`trn_id=${trn_id}`).subscribe(data => {
      console.log(data)
      this.responseData = data;
      // this.userData = this.responseData.suc > 0 ? this.responseData.msg : [];
      // console.log(this.userData,'mistu');
  })
  }

}
