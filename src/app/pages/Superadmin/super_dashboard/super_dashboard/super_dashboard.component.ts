import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-super_dashboard',
  templateUrl: './super_dashboard.component.html',
  styleUrls: ['./super_dashboard.component.css'],
  providers: [MessageService]
})
export class Super_dashboardComponent implements OnInit {
userData : any;
userDatas : any;
responsedata: any;
selectedUnitId: any = '';
userCounts: any;

  constructor(private router: Router, private dataServe:DataService,private formBuilder: FormBuilder,private messageService: MessageService) { }

  ngOnInit() {
    this.fetchdata();
    this.fetch_dash_data();
    this.unit();
  }

    fetchdata() { 
    this.dataServe.global_service(0,'/superadmin/get_dashboard_data',null).subscribe(data => {
      // console.log(data,'1234')
      this.userData = data;
      this.userData = this.userData.msg;
      // this.show_spinner=true;
    },error => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
    })
  }

   fetch_dash_data() { 
  this.dataServe.global_service(0, '/superadmin/get_super_pending_data', null).subscribe({
    next: (data: any) => {
      // console.log(data, '12345');
      
      if (data.suc === 1 && data.msg && data.msg.length > 0) {
        const dt = data.msg[0];
        this.userDatas = [
          { mem_type: 'Membership Form', total: dt.member_pending },
          { mem_type: 'Super Topup Policy Form', total: dt.stp_pending },
          { mem_type: 'Existing Group Policy Form', total: dt.stp_pending },
          { mem_type: 'Children Policy Form', total: dt.children_pending }
        ];
      } else {
        this.userDatas = [];
      }
    },
    error: (err) => {
      console.error(err);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'An error occurred while fetching dashboard data'
      });
    }
  });
}

unit() {
    this.dataServe
      .global_service(0, '/master/unit_list', null)
      .subscribe((data: any) => {
        this.responsedata = data;
        // console.log(this.responsedata, '555');
        this.responsedata =
          this.responsedata.suc > 0 ? this.responsedata.msg : [];
      });
  }

  getTotalMember() {
    const dt = { 
      unit_id: this.selectedUnitId 
    };
    this.dataServe
      .global_service(1, '/superadmin/get_tot_user', dt)
      .subscribe((data: any) => {
         if (data.suc === 1) {
        this.userCounts = data.msg;
      } else {
        this.userCounts = { act_dt: 0, deact_dt: 0 };
      }
      });
  }

  refreshData() {
  this.selectedUnitId = '';
  this.userCounts = { act_dt: 0, deact_dt: 0 };
  // You can also re-fetch data if needed
  // this.getTotalMember();
}

}
