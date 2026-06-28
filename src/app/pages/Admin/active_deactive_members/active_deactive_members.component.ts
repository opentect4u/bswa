import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-active_deactive_members',
  templateUrl: './active_deactive_members.component.html',
  styleUrls: ['./active_deactive_members.component.css'],
  providers: [MessageService],
})
export class Active_deactive_membersComponent implements OnInit {
 form!: FormGroup;
 tableData: any[] = [];
 userData: any;
 memberData: any;
 page = 1;
 limit = 10;
 totalRecords = 0;
 totalPages = 0;

  constructor(private router: Router, private dataServe: DataService, private formBuilder: FormBuilder,private route: ActivatedRoute,private messageService: MessageService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      status: ['A']
    });
    this.fetch_member_status('A');

     // Listen to radio change
    this.form.get('status')?.valueChanges.subscribe(status => {
       this.page = 1;
      this.fetch_member_status(status);
    });
  }

   fetch_member_status(status: string){
    const dt = {
     status: status,
     page: this.page,
     limit: this.limit
    }
    this.dataServe.global_service(1,'/fetch_active_deactive_memb_dtls',dt).subscribe(data => {
      this.userData = data;
     if (this.userData.suc === 1) {
           this.tableData = this.userData.msg || [];
           this.totalRecords = this.userData.total || 0;
           this.totalPages = Math.ceil(this.totalRecords / this.limit);
     } else {
           this.tableData = [];
           this.totalRecords = 0;
           this.totalPages = 0;
     }
    },error => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch member list' });
    });
   }

   nextPage() {
   if (this.page * this.limit < this.totalRecords) {
    this.page++;
    this.fetch_member_status(this.form.value.status);
    }
   }

   prevPage() {
  if (this.page > 1) {
    this.page--;
    this.fetch_member_status(this.form.value.status);
  }
  }

  view_member_dtls(member_id:any, phone_no:any){
        this.router.navigate(['/admin/active_inactive_memb_dtls', encodeURIComponent(btoa(member_id)),encodeURIComponent(btoa(phone_no)),]);
  }

}

