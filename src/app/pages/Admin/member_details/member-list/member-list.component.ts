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
  tableData: [TableData] | any

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
        this.tableData = this.userData
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

  filerRes(event:any){
    var inputText = event.target.value

    const memberType:any = {
      'G': 'general',
      'AI': 'associate',
      'L': 'life'
    }
    
    this.tableData = this.userData.filter((dt: any) => dt.form_no.toString().toLowerCase().includes(inputText.toLowerCase()) || dt.memb_name.toString().toLowerCase().includes(inputText.toLowerCase()) || memberType[dt.mem_type].includes(inputText.toLowerCase()))
    
  }

}
