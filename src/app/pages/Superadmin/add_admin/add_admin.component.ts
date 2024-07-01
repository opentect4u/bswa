import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add_admin',
  templateUrl: './add_admin.component.html',
  styleUrls: ['./add_admin.component.css'],
  providers: [MessageService,DatePipe]
})
export class Add_adminComponent implements OnInit {
  form!: FormGroup;
  userData: any;
  formData: any;
  user_id: any;

  constructor(private router: Router, private dataServe: DataService, private formBuilder: FormBuilder, private messageService: MessageService, private route: ActivatedRoute,private datePipe: DatePipe) { }

  ngOnInit() {
    this.user_id = this.route.snapshot.params['user_id'];
    this.form = this.formBuilder.group({
      user_id: [''],
      u_name: [''], 
      u_phone: [''], 
      pass: [''],
    })
    if(this.user_id){
      this.getData_admin();
    }
  }

  get m() {
    return this.form.controls;
  }

  add_admin(){
    var dt = {
      user_id: this.m['user_id'].value,
      u_name: this.m['u_name'].value, 
      u_phone: this.m['u_phone'].value, 
      pass: this.m['pass'].value,
      user: localStorage.getItem('user_name')
    }
    this.dataServe.global_service(1,'/add_admin_data',dt).subscribe(data=>{
      console.log(data,'...')
      this.userData = data;
      this.userData = this.userData.msg;
      console.log(this.userData,'lili');
      this.router.navigate(['superadmin/show_admin_data'])
    },error => {
      console.error(error);
      // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
    })
  }

  getData_admin() {
    this.dataServe.global_service(0, '/get_add_admin_data',`user_id=${this.user_id}`).subscribe(data => {
      console.log(data)
      this.formData = data;
      if (this.formData.suc > 0) {
        this.formData = this.formData.msg;
        this.form.patchValue({
          user_id: this.formData[0].user_id,
          u_name: this.formData[0].user_name,
          u_phone: this.formData[0].user_phone,
        })
      }
    }, error => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
    })

  }

  
  back(){
    this.router.navigate(['/superadmin/show_admin_data']);

  }

}
