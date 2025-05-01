import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin_approve',
  templateUrl: './admin_approve.component.html',
  styleUrls: ['./admin_approve.component.css'],
  providers: [MessageService,DatePipe]

})
export class Admin_approveComponent implements OnInit {
  userData: any = [];
  form!: FormGroup;
  tr_status:any = 'Y'
  tbFilterData: any = []
  pendingCount: number = 0;
  rejectCount: number = 0;
  approvedCount: number = 0;
  acceptount: number = 0;
  rowsPerPageOptions: number[] = [];

  constructor(private router: Router, private dataServe: DataService, private formBuilder: FormBuilder, private messageService: MessageService, private route: ActivatedRoute,private datePipe: DatePipe,private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      form_no: ['',  Validators.required],
      memb_name: ['']
    })
    this.submit()
  }

  get m() {
    return this.form.controls;
  }

  submit(){
    // var dt = {
    //   form_no: this.m['form_no'].value,
    //   memb_name: this.m['memb_name'].value,
    // };

    this.dataServe.global_service(0,'/frm_list',`form_no=${this.m['form_no'].value}`).subscribe(data => {
      // console.log(data,'kiki')
      this.userData = data;

      if(this.userData.suc > 0){
        this.tbFilterData = this.userData.msg || []; 
        this.filterTableData(this.tr_status);
      this.calculateCounts(); 
        // this.userData = this.userData.msg;
        // this.tbFilterData = this.userData.filter((dt:any) => dt.memb_status != 'R')
          // ✅ Set pagination options after data is ready
      }else {
        this.tbFilterData = [];
      }
      this.updateRowsPerPageOptions(); // <-- recalculate here
        this.cdr.detectChanges(); // Force UI update if needed
      // this.show_spinner=true;
    },error => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
    })
  }

  submit_search(){
    var dt = {
      form_no: this.m['form_no'].value,
      memb_name: this.m['memb_name'].value,
    };

    this.dataServe.global_service(0,'/frm_list_2',`form_no=${this.m['form_no'].value}`).subscribe(data => {
      console.log(data,'kiki')
      this.userData = data;
      if(this.userData.suc > 0){
      this.userData = this.userData.msg;
      this.tbFilterData = this.userData.filter((dt:any) => dt.memb_status != 'R')
      }
      console.log(this.userData,'lili');
      
      // this.show_spinner=true;
    },error => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
    })
  }

  calculateCounts() {
    if (!this.userData?.msg || !Array.isArray(this.userData.msg)) {
      console.warn('No valid data found in userData.msg');
      this.pendingCount = this.rejectCount = this.approvedCount = 0;
      return;
    }

    console.log('Raw data:', this.userData.msg);
  
    this.pendingCount = this.userData.msg.filter((item: { memb_status?: string }) => item?.memb_status === 'P').length;
    this.rejectCount = this.userData.msg.filter((item: { memb_status?: string }) => item?.memb_status === 'R').length;
    this.acceptount = this.userData.msg.filter((item: { memb_status?: string }) => item?.memb_status === 'T').length;
    this.approvedCount = this.userData.msg.filter((item: { memb_status?: string }) => item?.memb_status === 'A').length;
  
    // console.log(`Pending: ${this.pendingCount}, Rejected: ${this.rejectCount}, Approved: ${this.approvedCount}`);
  }

  preview(formNo:any, mem_type: any) { //route to the particular restaurant on clicking on the edit option
    // alert(v);
    this.router.navigate(['/admin/view_form',encodeURIComponent(btoa(formNo)), mem_type])
  }

  img(formNo: any, gender: any, member: any) {
    this.router.navigate(['/admin/admin_preview_form', encodeURIComponent(btoa(formNo)), gender, member]);
  }

  // filterTableData(flag:any){
  //   this.tbFilterData = this.userData.length > 0 ? this.userData.filter((dt:any) => flag != 'R' ? dt.memb_status != 'R' : dt.memb_status == flag) : []
  // }
  
  filterTableData(flag: any) {
    if (this.userData.msg && this.userData.msg.length > 0) {
      this.tbFilterData = this.userData.msg.filter((dt: any) => {
        if (flag === 'Y') {
          return dt.memb_status === 'P'; 
        } else if (flag === 'R') {
          return dt.memb_status === 'R'; 
        } else if (flag === 'T') {
          return dt.memb_status === 'T';  
        } else {
          return dt.memb_status === 'A'; 
        // } else {
        //   return true;
        }
      });
    } else {
      this.tbFilterData = [];
    }
    this.updateRowsPerPageOptions();
  }

  updateRowsPerPageOptions() {
    const totalRows = this.tbFilterData.length;
    const options: number[] = [];
  
    if (totalRows > 0) {
      for (let i = 10; i < totalRows; i += 50) {
        options.push(i);
      }
  
      if (!options.includes(totalRows)) {
        options.push(totalRows);
      }
  
      this.rowsPerPageOptions = [...new Set(options)];
    } else {
      this.rowsPerPageOptions = [10];
    }
  }
  

}
