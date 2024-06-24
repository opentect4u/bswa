import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-admin_fee_type',
  templateUrl: './admin_fee_type.component.html',
  styleUrls: ['./admin_fee_type.component.css'],
  providers: [MessageService]
})
export class Admin_fee_typeComponent implements OnInit {
  userData: any;
  msg: any;

  constructor(private router: Router, private dataServe:DataService,private formBuilder: FormBuilder,private messageService: MessageService) { }

  ngOnInit():void {
    this.fetchdata();
  }

  onadd(flag:any){
    this.router.navigate(['/superadmin/add_fee_type', encodeURIComponent(btoa(flag))]);
  }

  // back(){
  //   this.router.navigate(['/admin/dashboard']);
  // }

  fetchdata() { 
    this.dataServe.global_service(0,'/fee/get_data',null).subscribe(data => {
      console.log(data)
      this.userData = data;
      this.userData = this.userData.msg;
      // this.show_spinner=true;
    },error => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
    })
  }

  next(v: any) { //route to the particular restaurant on clicking on the edit option
    // alert(v);
    this.router.navigate(['/superadmin/edit_fee_type'])
  }
}