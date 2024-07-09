import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/service/data.service';
import { ValidatorsService } from 'src/app/service/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-group_policy_approve_form',
  templateUrl: './group_policy_approve_form.component.html',
  styleUrls: ['./group_policy_approve_form.component.css'],
  providers: [MessageService],
})
export class Group_policy_approve_formComponent implements OnInit {
  formNo: any = 0;
  trndata: any;
  userData: any;
  mem_type: any;

  constructor(private router: Router, private fb: FormBuilder,
    private dataServe: DataService,
    private validatorsService: ValidatorsService,
private route: ActivatedRoute,
private messageService: MessageService) { }

  ngOnInit() {
    const encodedFormNo = this.route.snapshot.params['form_no'];
    // this.formNo = atob(decodeURIComponent(encodedFormNo));
    this.mem_type = this.route.snapshot.params['mem_type'];
    this.getData();
  }

  getData () {
    this.dataServe.global_service(0,'/view_grp_trn_dt',null).subscribe(data => {
      console.log(data)
      this.userData = data;
      this.userData =
              this.userData.suc > 0 ? this.userData.msg : {};
      console.log(this.userData,'mistu');
      
  })
}

back(){
  this.router.navigate(['/admin/dashboard']);
}

view(form_no:any,member_id:any){
  this.router.navigate(['/admin/view_group_approve_form',encodeURIComponent(btoa(form_no)),member_id])
}

}
