import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/service/data.service';

interface UserInfo {
  form_no: string;
  form_dt: string;
  member_id: string;
  mem_dt: string;
  mem_type: string;
  memb_oprn: string;
  memb_name: string;
  unit_id: string;
  gurdian_name: string;
  gender: string;
  marital_status: string;
  dob: string;
  blood_grp: string;
  caste: string;
  staff_nos: string;
  pers_no: string;
  min_no: string;
  memb_address: string;
  ps: string;
  city_town_dist: string;
  pin_no: string;
  phone_no: string;
  email_id: string;
  memb_pic: string;
  memb_status: string;
  remarks: string;
  resolution_no: string;
  resolution_dt: string;
  spou_dt: DepInfo;
  dep_dt: [DepInfo];
}

interface DepInfo {
  form_no: string;
  sl_no: string;
  member_id: string;
  mem_type: string;
  dependent_dt: string;
  dependent_name: string;
  gurdian_name: string;
  relation: string;
  min_no: string;
  dob: string;
  blood_grp: string;
  memb_address: string;
  ps: string;
  city_town_dist: string;
  pin_no: string;
  phone_no: string;
  email_id: string;
  memb_pic: string;
  intro_member_id: string;
  dept_status: string;
  grp_status: string;
  grp_no: string;
  stp_status: string;
  stp_no: string;
  relation_intro: string;
  intro_name: string;
  dependent_name_dep: string;
  dob_dep: string;
  relation_dep: string;
}

@Component({
  selector: 'app-memb-dtls',
  templateUrl: './memb-dtls.component.html',
  styleUrls: ['./memb-dtls.component.css'],
  providers: [DatePipe]
})
export class MembDtlsComponent implements OnInit {
  api_base_url = environment.api_url;
  form_no:any
  mem_type:any
  memResDt: any;
  userData: UserInfo | any;
  constructor(private dataServe: DataService) { }

  ngOnInit() {
    this.form_no = localStorage.getItem('form_no')
    this.getMemberDetails(this.form_no)
  }

  getMemberDetails(form_no:any){
    this.dataServe.global_service(1, '/member_dtls',{form_no, mem_id: localStorage.getItem('member_id'), flag: true, mem_type: localStorage.getItem('mem_type')})
          .subscribe((data: any) => {
            this.memResDt = data;
            this.memResDt = this.memResDt.suc > 0 ? this.memResDt.msg : [];
            if(this.memResDt.length > 0){
              this.userData = this.memResDt[0]
            }
          });
  }

}
