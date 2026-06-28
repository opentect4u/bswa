import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';

interface TableData{
  form_no: string
  member_id: string
  memb_name:string
  mem_type:string
}

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  userData:any
  tableData: [TableData] | any;
  page = 1;
  limit = 10;
  totalRecords = 0;
  totalPages = 0;
  searchText:any = '';

  constructor(private router: Router, private dataServe: DataService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getMemberDtls()
  }

  getMemberDtls(){
     const dt = {
     page: this.page,
     limit: this.limit,
     search: this.searchText
    }
    this.dataServe.global_service(1, '/member_dtls', dt).subscribe(
      (data) => {
        // console.log(data, 'kiki');
        this.userData = data;
         if (this.userData.suc === 1) {
        // this.userData = this.userData.msg || [];
        this.tableData = this.userData.msg || [];
        this.totalRecords = this.userData.total || 0;
        this.totalPages = Math.ceil(this.totalRecords / this.limit);
        // console.log(this.userData, 'lili');
        } else {
           this.tableData = [];
           this.totalRecords = 0;
           this.totalPages = 0;
        }
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

    nextPage() {
   if (this.page * this.limit < this.totalRecords) {
    this.page++;
    this.getMemberDtls();
    }
   }

   prevPage() {
  if (this.page > 1) {
    this.page--;
    this.getMemberDtls();
  }
  }

  filterRes(event:any){

     this.searchText = event.target.value;
  this.page = 1;

   this.getMemberDtls();

  // const inputText = event.target.value.toLowerCase();

  // const memberType:any = {
  //   'G': 'general',
  //   'AI': 'associate',
  //   'L': 'life'
  // };

  // this.tableData = (this.userData.msg || []).filter((dt:any)=>
  //     dt.form_no.toString().toLowerCase().includes(inputText) ||
  //     dt.memb_name.toLowerCase().includes(inputText) ||
  //     memberType[dt.mem_type].includes(inputText)
  // );
}

  preview(form_no: any,member_id: any){
    this.router.navigate(['/admin/mem_edit',encodeURIComponent(btoa(form_no))])
  }



}
