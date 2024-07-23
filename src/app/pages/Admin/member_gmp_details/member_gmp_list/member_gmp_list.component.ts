import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';

interface TableData{
  form_no: string
  member_id: string
  memb_name:string
  unit_name:string
}

@Component({
  selector: 'app-member_gmp_list',
  templateUrl: './member_gmp_list.component.html',
  styleUrls: ['./member_gmp_list.component.css']
})
export class Member_gmp_listComponent implements OnInit {
  userData:any
  tableData: [TableData] | any
  
  constructor(private router: Router, private dataServe: DataService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getMemberGmpPolicyDtls();
  }

  getMemberGmpPolicyDtls(){
    this.dataServe.global_service(1, '/member_gmp_policy_dtls', null).subscribe(
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
      }
    );
  }

  preview(form_no: any,member_id: any,policy_type:any,memb_oprn:any){
    this.router.navigate(['/admin/member_gmp_edit',encodeURIComponent(btoa(form_no)),member_id,policy_type,memb_oprn])
  }

  filerRes(event:any){
    var inputText = event.target.value
    
    // this.tableData = this.userData!.filter((dt: any) => dt.form_no.toString().toLowerCase().includes(inputText.toLowerCase()) || dt.memb_name.toString().toLowerCase().includes(inputText.toLowerCase()) || dt.member_id[dt.member_id].includes(inputText.toLowerCase()))

    this.tableData = this.userData!.filter((dt: any) => {
      const formNoMatch = dt.form_no.toString().toLowerCase().includes(inputText.toLowerCase());
      const membNameMatch = dt.memb_name.toString().toLowerCase().includes(inputText.toLowerCase());
      const memberIdMatch = dt.member_id && dt.member_id.toString().toLowerCase().includes(inputText.toLowerCase());
  
      return formNoMatch || membNameMatch || memberIdMatch;
  });
  
    
  }

}
