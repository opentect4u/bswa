import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';

interface TableData{
  form_no: string
  member_id: string
  memb_name:string
  // mem_type:string
}

@Component({
  selector: 'app-member_policy_list',
  templateUrl: './member_policy_list.component.html',
  styleUrls: ['./member_policy_list.component.css']
})
export class Member_policy_listComponent implements OnInit {
  userData:any
  // tableData: [TableData] | any
  selectedStatus: string = 'Y'; // default selected
tableData: any[] = [];        // original full data
  filteredData: any[] = [];     

  constructor(private router: Router, private dataServe: DataService, private formBuilder: FormBuilder) { }

  ngOnInit() {
  this.getMemberPolicyDtls()
  }

filterByStatus() {
  console.log('Filtering by status:', this.selectedStatus);

  if (this.selectedStatus) {
    this.filteredData = this.tableData.filter(item => {
      console.log(this.filteredData,'lo');
      
      console.log('Item status:', item.status); // 🔍 Debug
      return item.status === this.selectedStatus;
    });
  } else {
    this.filteredData = [...this.tableData]; // show all
  }

  console.log('Filtered data:', this.filteredData);
}




  getMemberPolicyDtls(){
    this.dataServe.global_service(1, '/member_policy_dtls', null).subscribe(
      (data) => {
        console.log(data, 'kiki');
        this.userData = data;
        this.userData = this.userData.msg;
        this.tableData = this.userData
        this.filterByStatus();
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

  preview(form_no: any,member_id: any,policy_type:any){
    this.router.navigate(['/admin/member_policy_edit',encodeURIComponent(btoa(form_no)),member_id,policy_type])
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
