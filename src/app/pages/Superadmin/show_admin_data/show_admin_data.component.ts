import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-show_admin_data',
  templateUrl: './show_admin_data.component.html',
  styleUrls: ['./show_admin_data.component.css']
  ,
  providers: [MessageService,DatePipe]
})
export class Show_admin_dataComponent implements OnInit {
  form!: FormGroup;
  userData: any;
  msg: any;


  constructor(private router: Router, private dataServe: DataService, private formBuilder: FormBuilder, private messageService: MessageService, private route: ActivatedRoute,private datePipe: DatePipe) { }

  ngOnInit() {
    this.fetchdata_admin();
  }

  onadd(user_id:any){
    this.router.navigate(['/superadmin/add_admin',user_id]);
  }


  fetchdata_admin() { 
    this.dataServe.global_service(0,'/get_add_admin_data',null).subscribe(data => {
      console.log(data)
      this.userData = data;
      this.userData = this.userData.msg;
    },error => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
    })
  }

}
