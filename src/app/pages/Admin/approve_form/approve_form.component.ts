import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/service/data.service';
import { ValidatorsService } from 'src/app/service/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-approve_form',
  templateUrl: './approve_form.component.html',
  styleUrls: ['./approve_form.component.css'],
  providers: [MessageService],

})
export class Approve_formComponent implements OnInit {
  formNo: any = 0;
  trndata: any;
  userData: any;
  mem_type: any;
  pay_mode: any;

  constructor(private router: Router, private fb: FormBuilder,
    private dataServe: DataService,
    private validatorsService: ValidatorsService,
private route: ActivatedRoute,
private messageService: MessageService) { }

  ngOnInit() {
    const encodedFormNo = this.route.snapshot.params['form_no'];
    // this.formNo = atob(decodeURIComponent(encodedFormNo));
    this.mem_type = this.route.snapshot.params['mem_type'];
    this.pay_mode = this.route.snapshot.params['pay_mode'];
    this.getData();
  }

  getData () {
    this.dataServe.global_service(0,'/transaction_dt',null).subscribe(data => {
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

view(form_no:any, mem_type:any, pay_mode:any){
  console.log(form_no,'no');
  
  this.router.navigate(['/admin/view_approve_form',encodeURIComponent(btoa(form_no)),mem_type,pay_mode])
}

}
