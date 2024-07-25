import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/service/data.service';
import { ValidatorsService } from 'src/app/service/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-super_policy_approve',
  templateUrl: './super_policy_approve.component.html',
  styleUrls: ['./super_policy_approve.component.css'],
  providers: [MessageService],
})
export class Super_policy_approveComponent implements OnInit {
  formNo: any = 0;
  trndata: any;
  userData: any;
  mem_type: any;

  constructor(
    private router: Router, private fb: FormBuilder,
    private dataServe: DataService,
    private validatorsService: ValidatorsService,
private route: ActivatedRoute,
private messageService: MessageService
  ) { }

  ngOnInit() {
    const encodedFormNo = this.route.snapshot.params['form_no'];
    // this.formNo = atob(decodeURIComponent(encodedFormNo));
    this.mem_type = this.route.snapshot.params['mem_type'];
    this.getData();
  }

  getData () {
    this.dataServe.global_service(0,'/get_data',null).subscribe(data => {
      console.log(data)
      this.userData = data;
      this.userData =
              this.userData.suc > 0 ? this.userData.msg : {};
      console.log(this.userData,'mistu');
      
  })
}

  back(){
    this.router.navigate(['/admin/admin_premium_approve']);
  }

  view(form_no:any ,memb_id: any, phone_no: any){
    this.router.navigate(['/admin/view_super_approve_form',encodeURIComponent(btoa(form_no)),encodeURIComponent(btoa(memb_id)),encodeURIComponent(btoa(phone_no))])
  }

  onadd(){
    this.router.navigate(['/admin/super_premium_form']);

  }

}
