import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  userData:any

  constructor(private router: Router, private dataServe: DataService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getMemberDtls()
  }

  getMemberDtls(){
    this.dataServe.global_service(1, '/member_dtls', null).subscribe(
      (data) => {
        console.log(data, 'kiki');
        this.userData = data;
        this.userData = this.userData.msg;
        console.log(this.userData, 'lili');
      },
      (error) => {
        console.error(error);
        Swal.fire(
          'Warning',
          'An error occurred while fetching data',
          'warning'
        );
        // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
      }
    );
  }

  preview(form_no: any,member_id: any){
    this.router.navigate(['/admin/mem_edit',encodeURIComponent(btoa(form_no))])
  }

}
