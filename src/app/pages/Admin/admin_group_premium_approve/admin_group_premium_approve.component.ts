import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin_group_premium_approve',
  templateUrl: './admin_group_premium_approve.component.html',
  styleUrls: ['./admin_group_premium_approve.component.css'],
  providers: [MessageService,DatePipe]
})
export class Admin_group_premium_approveComponent implements OnInit {
  userData: any = [];
  form!: FormGroup;
  tr_status:any = 'Y'
  tbFilterData: any[] = []
  pendingCount: number = 0;
  rejectCount: number = 0;
  approvedCount: number = 0;

  constructor(private router: Router, private dataServe: DataService, private formBuilder: FormBuilder, private messageService: MessageService, private route: ActivatedRoute,private datePipe: DatePipe,private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      form_no: ['',  Validators.required],
      memb_name: ['']
    })
    this.submit()
    // this.calculateCounts();
  }

  get m() {
    return this.form.controls;
  }
  

  // submit(){
  //   // var dt = {
  //   //   form_no: this.m['form_no'].value,
  //   //   memb_name: this.m['memb_name'].value,
  //   // };

  //   this.dataServe.global_service(0,'/frm_list_policy_group',`form_no=${this.m['form_no'].value}`).subscribe(data => {
  //     console.log(data,'kiki')
  //     this.userData = data;
  //     if(this.userData.suc > 0){
  //     this.userData = this.userData.msg;
  //     this.tbFilterData = this.userData.filter((dt:any) => dt.form_status != 'R')
  //   }
  //     console.log(this.userData,'lili');
      
  //     // this.show_spinner=true;
  //   },error => {
  //     console.error(error);
  //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
  //   })
  // }

  // submit() {
  //   this.dataServe.global_service(0, '/frm_list_policy_group', `form_no=${this.m['form_no'].value}`)
  //     .subscribe(data => {
  //       console.log(data, 'Response Data');
  //       this.userData = data;
  //       if (this.userData.suc > 0) {
  //         this.userData = this.userData.msg;
  //         this.filterTableData(this.tr_status); // Apply filter after fetching data
  //       } else {
  //         this.tbFilterData = [];
  //       }
  //     }, error => {
  //       console.error(error);
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching data' });
  //     });
  // }

  submit() {
    this.dataServe.global_service(0, '/frm_list_policy_group', `form_no=${this.m['form_no'].value}`)
      .subscribe(data => {
        console.log(data, 'Response Data');
        this.userData = data;
        if (this.userData.suc > 0) {
          this.tbFilterData = this.userData.msg; // Assign correct data
          this.calculateCounts(); // Call calculateCounts() after updating tbFilterData
        } else {
          this.tbFilterData = [];
          this.calculateCounts(); // Ensure counts reset when no data is found
        }
  
        this.cdr.detectChanges(); // Force UI update if needed
      }, error => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching data' });
      });
  }
  

  // submit_search_gmp(){
  //   var dt = {
  //     form_no: this.m['form_no'].value,
  //     memb_name: this.m['memb_name'].value,
  //   };

  //   this.dataServe.global_service(0,'/frm_list_policy_group_2',`form_no=${this.m['form_no'].value}`).subscribe(data => {
  //     console.log(data,'kiki')
  //     this.userData = data;
  //     if(this.userData.suc > 0){
  //     this.userData = this.userData.msg;
  //     this.tbFilterData = this.userData.filter((dt:any) => dt.form_status != 'R')
  //     }
  //     console.log(this.userData,'lili');
      
  //     // this.show_spinner=true;
  //   },error => {
  //     console.error(error);
  //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
  //   })
  // }

  submit_search_gmp() {
    this.dataServe.global_service(0, '/frm_list_policy_group_2', `form_no=${this.m['form_no'].value}`)
      .subscribe(data => {
        console.log(data, 'Search Response');
        this.userData = data;
        if (this.userData.suc > 0) {
          this.userData = this.userData.msg;
          // this.calculateCounts();
          this.filterTableData(this.tr_status); // Apply filter after fetching data
        } else {
          this.tbFilterData = [];
        }
      }, error => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while searching data' });
      });
  }

  calculateCounts() {
  
    this.pendingCount = this.tbFilterData.filter(item => item?.form_status === 'P').length;
    this.rejectCount = this.tbFilterData.filter(item => item?.form_status === 'R').length;
    this.approvedCount = this.tbFilterData.filter(item => item?.form_status === 'A').length;

    console.log(`Pending: ${this.pendingCount}, Rejected: ${this.rejectCount}, Approved: ${this.approvedCount}`);
  }

  preview(formNo:any, memb_id: any) { //route to the particular restaurant on clicking on the edit option
    // alert(v);
    console.log(memb_id);
    
    this.router.navigate(['/admin/group_policy_view_form',encodeURIComponent(btoa(formNo)),encodeURIComponent(btoa(memb_id))])
  }

  img(formNo: any, gender: any, member: any) {
    this.router.navigate(['/admin/admin_preview_form', encodeURIComponent(btoa(formNo)), gender, member]);
  }

  // filterTableData(flag:any){
  //   this.tbFilterData = this.userData.length > 0 ? this.userData.filter((dt:any) => flag == 'R' ? dt.form_status == 'R' : this.userData.filter((dt:any) => flag == 'Y' ? dt.form_status == 'P' : dt.form_status == flag) : []
  // }

  // filterTableData(flag: any) {
  //   if (this.userData.length > 0) {
  //     this.tbFilterData = this.userData.filter((dt: any) => {
  //       if (flag === 'R') {
  //         return dt.form_status === 'R'; // Show only rejected
  //       } else if (flag === 'Y') {
  //         return dt.form_status === 'P'; // Show only approved
  //       } else {
  //         return dt.form_status === 'A' ;
  //       }
  //     });
  //   } else {
  //     this.tbFilterData = [];
  //   }
  // }
  
  filterTableData(flag: any) {
    if (this.userData.length > 0) {
      this.tbFilterData = this.userData.filter((dt: any) => {
        if (flag === 'Y') {
          return dt.form_status === 'P'; 
        } else if (flag === 'R') {
          return dt.form_status === 'R'; 
        } else if (flag === 'A') {
          return dt.form_status === 'A'; 
        } else {
          return true; // Return all if no match
        }
      });
    } else {
      this.tbFilterData = [];
    }
  }
  
  
}
