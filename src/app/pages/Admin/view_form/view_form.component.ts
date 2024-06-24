import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

// import { allowedValuesValidator } from './validators/allowed-values.validator';

@Component({
  selector: 'app-view_form',
  templateUrl: './view_form.component.html',
  styleUrls: ['./view_form.component.css'],
  providers: [DatePipe]

})
export class View_formComponent implements OnInit {
  api_base_url = environment.api_url;
  selectedValues: any[] = [];
  WindowObject: any
  divToPrint: any
  responsedata: any;
  form_no: any;
  memb_name: any;
  mem_type:any;
  unit_name:any;
  staff_nos:any;
  pers_no:any;
  gurdian_name:any;
  memb_address:any;
  ps:any;
  phone_no:any;
  blood_grp:any;
  dob:any;
  email_id:any;
  min_no:any;
  dependent_name:any;
  resdata: any;
  spou_blood_grp:any;
  gurd_name:any;
  spou_dob:any;
  spou_phone:any;
  spou_memb_address:any
  resolution_no: any;
  resolution_dt: any;
  subscription_1:any
  subscription_2:any
  adm_fee: any;
  donation: any;
  spou_min:any;
  resdata1: any;
  dep_dt: any;
  selectedValue: string = 'P'
  selectedValue2: string = 'C'
  form: FormGroup;
  formData: any;
  resdata2: any;
  cash_data: any;
  cheque_data: any;
  memb_pic: any;
  admissionFee_life: any;
  donationFee_life: any;
  subscriptionFee_2: any;
  subscriptionFee_1: any;
  cash_data_life: any;
  admissionFee_associate: any;
  donationFee_associate: any;
  subscriptionFee_associate_one: any;
  subscriptionFee_associate: any;
  membInfo: any;
  spouseInfo: any;
  dependInfo: any;

  // dept_dt: any;

  constructor(private router: Router,
    private fb: FormBuilder, private route: ActivatedRoute,
    private dataServe: DataService, private datePipe: DatePipe) { 
      this.form = this.fb.group({
        resolution_no: ['',Validators.required],
        resolution_dt: ['',Validators.required],
        status: ['',Validators.required],
        reject: ['',Validators.required],
        payment: [''],
        admissionFee: [''],
        donationFee: [''],
        subscriptionFee: [''],
        subscriptionType: [''],
        cheque_no: ['',Validators.required],
        bank_name: ['',Validators.required],
        cheque_dt: ['',Validators.required],
        admissionFee_life: [''],
        donationFee_life: [''],
        subscriptionFee_2: [''],
        subscriptionFee_1: [''],
        admissionFee_associate: [''],
        donationFee_associate: [''],
        subscriptionFee_associate_one: [''],
        subscriptionFee_associate: [''],
      });
    }

    get f() {
      return this.form.controls;
    }

    ngOnInit() {
      const encodedFormNo = this.route.snapshot.params['form_no'];
      this.form_no = atob(decodeURIComponent(encodedFormNo));
      this.mem_type = this.route.snapshot.params['mem_type'];
      // console.log(encodedFormNo,'jjj')
      
      this.dataServe.global_service(0, '/get_member_dtls',`form_no=${this.form_no}` )
          .subscribe((data: any) => {
            this.responsedata = data;
            console.log(this.responsedata,'pppp');
            
            console.log(this.responsedata, '666');
            this.responsedata =
              this.responsedata.suc > 0 ? this.responsedata.msg : [];
              this.memb_name = this.responsedata[0].memb_name;
              this.mem_type = this.responsedata[0].mem_type;
              this.unit_name = this.responsedata[0].unit_name;
              this.staff_nos = this.responsedata[0].staff_nos;
              this.pers_no = this.responsedata[0].pers_no;
              this.gurdian_name = this.responsedata[0].gurdian_name;
              this.memb_address = this.responsedata[0].memb_address;
              this.ps = this.responsedata[0].ps;
              this.phone_no = this.responsedata[0].phone_no;
              this.blood_grp = this.responsedata[0].blood_grp;
              this.dob = this.datePipe.transform(this.responsedata[0].dob, 'dd-MM-yyyy');
              this.email_id = this.responsedata[0].email_id;
              this.min_no = this.responsedata[0].min_no;
              this.resolution_no = this.responsedata[0].resolution_no;
              this.subscription_1 = this.responsedata[0].subscription_1;
              this.subscription_2 = this.responsedata[0].subscription_2;
              this.adm_fee = this.responsedata[0].adm_fee;
              this.donation = this.responsedata[0].donation;
              this.memb_pic = this.responsedata[0].memb_pic;

              this.fee_data_get(this.responsedata[0].mem_type)
          });
  
      this.dataServe.global_service(0, '/get_dependent_dtls',`form_no=${this.form_no}` )
          .subscribe((spouse_dt: any) => {
            this.resdata = spouse_dt;
            console.log(this.resdata, '777');
            this.resdata =
              this.resdata.suc > 0 ? this.resdata.msg : {};
              this.spou_min = this.resdata.spouse_dt;
              this.dep_dt = this.resdata.dep_dt;
          });  
  
      // this.dataServe.global_service(0, '/get_dependent_dtls',`form_no=${this.form_no}` )
      //     .subscribe((dep_dt: any) => {
      //       this.resdata1 = dep_dt;
      //       console.log(this.resdata1, '777');
      //       this.resdata1 =
      //         this.resdata1.suc > 0 ? this.resdata1.msg : {};
      //     }); 

      // this.fee_data_get();
      this.getMemberInfo();
      this.getSpouseInfo();
      this.getDependentInfo();
    }

    getMemberInfo() {
      this.dataServe
        .global_service(0, '/get_member_dtls_asso', `form_no=${this.form_no}`)
        .subscribe((data: any) => {
          this.responsedata = data;
          console.log(this.responsedata, '666');
          this.responsedata =
            this.responsedata.suc > 0
              ? this.responsedata.msg.length > 0
                ? this.responsedata.msg[0]
                : {}
              : {};
          this.membInfo = this.responsedata;
          this.fee_data_get(this.membInfo.mem_type)

        });
    }
  
    getSpouseInfo() {
      this.dataServe
        .global_service(0, '/get_dependent_dtls_associate', `form_no=${this.form_no}`)
        .subscribe((spouse_dt: any) => {
          this.resdata = spouse_dt;
          console.log(this.resdata, '777');
          this.resdata = this.resdata.suc > 0 ? this.resdata.msg : {};
          // this.spou_min = this.resdata.spouse_dt;
          this.spouseInfo = this.resdata.spouse_dt.length > 0 ? this.resdata.spouse_dt[0] : {};
          // console.log(this.spou_min, 'hi');
        });
    }
  
    getDependentInfo() {
      this.dataServe
        .global_service(0, '/get_dependent_dtls_associate', `form_no=${this.form_no}`)
        .subscribe((dep_dt: any) => {
          this.resdata1 = dep_dt;
          console.log(this.resdata1, '777');
          this.resdata1 = this.resdata1.suc > 0 ? this.resdata1.msg : {};
          // this.dep_dt = this.resdata1.dep_dt;
          this.dependInfo = this.resdata1.dep_dt ? this.resdata1.dep_dt : []
          console.log(this.dependInfo,'depend');
          
        });
    }
    encodedFormNo = this.route.snapshot.params['form_no'];


    reject_submit(){
      var dt = {
        formNo: atob(decodeURIComponent(this.encodedFormNo)),
        member: this.route.snapshot.params['memb_name'],
        resolution_no: this.f['resolution_no'] ? this.f['resolution_no'].value : null,
        resolution_dt: this.f['resolution_dt'] ? this.f['resolution_dt'].value : null,
        status: this.f['status'] ? this.f['status'].value : null,
        reject: this.f['reject'] ? this.f['reject'].value : null,
        user: localStorage.getItem('user_name')
      }

      this.dataServe.global_service(1, '/reject',dt ).subscribe((data: any) => {
        this.resdata = data;
        console.log(this.resdata, '99');
        if(this.resdata.suc > 0) {
          this.router.navigate(['/admin/admin_approve'])
        }
      });    
    }

    cash_accept(){
      var dt = {
        formNo: atob(decodeURIComponent(this.encodedFormNo)),
        resolution_no: this.f['resolution_no'] ? this.f['resolution_no'].value : null,
        resolution_dt: this.f['resolution_dt'] ? this.f['resolution_dt'].value : null,
        status: this.f['status'] ? this.f['status'].value : null,
        user: localStorage.getItem('user_name'),
        payment: this.f['payment'] ? this.f['payment'].value : null,
        admissionFee: this.f['admissionFee'] ? this.f['admissionFee'].value : null,
        donationFee: this.f['donationFee'] ? this.f['donationFee'].value : null,
        subscriptionFee:  this.f['subscriptionFee'] ? this.f['subscriptionFee'].value : null,
        subscriptionType: this.f['subscriptionType'] ? this.f['subscriptionType'].value : null,
        // admissionFee_life:  this.f['admissionFee_life'] ? this.f['admissionFee_life'].value : null,
        // donationFee_life:  this.f['donationFee_life'] ? this.f['donationFee_life'].value : null,
        // subscriptionFee_2:  this.f['subscriptionFee_2'] ? this.f['subscriptionFee_2'].value : null,
        // subscriptionFee_1:  this.f['subscriptionFee_1'] ? this.f['subscriptionFee_1'].value : null,

      }

      this.dataServe.global_service(1, '/payment_accept',dt ).subscribe((data: any) => {
        this.cash_data = data;
        console.log(this.cash_data, '100');
        if(this.cash_data.suc > 0) {
          this.router.navigate(['/admin/approve_form'])
        }
      });    
    }

    cash_accept_life(){
      var dt = {
        formNo: atob(decodeURIComponent(this.encodedFormNo)),
        resolution_no: this.f['resolution_no'] ? this.f['resolution_no'].value : null,
        resolution_dt: this.f['resolution_dt'] ? this.f['resolution_dt'].value : null,
        status: this.f['status'] ? this.f['status'].value : null,
        user: localStorage.getItem('user_name'),
        payment: this.f['payment'] ? this.f['payment'].value : null,
        admissionFee_life:  this.f['admissionFee_life'] ? this.f['admissionFee_life'].value : null,
        donationFee_life:  this.f['donationFee_life'] ? this.f['donationFee_life'].value : null,
        subscriptionFee_2:  this.f['subscriptionFee_2'] ? this.f['subscriptionFee_2'].value : null,
        subscriptionFee_1:  this.f['subscriptionFee_1'] ? this.f['subscriptionFee_1'].value : null,

      }

      this.dataServe.global_service(1, '/payment_accept_life',dt ).subscribe((data: any) => {
        this.cash_data_life = data;
        console.log(this.cash_data_life, '100');
        if(this.cash_data_life.suc > 0) {
          this.router.navigate(['/admin/approve_form'])
        }
      });  
    }

    cash_accept_associate(){
      var dt = {
        formNo: atob(decodeURIComponent(this.encodedFormNo)),
        resolution_no: this.f['resolution_no'] ? this.f['resolution_no'].value : null,
        resolution_dt: this.f['resolution_dt'] ? this.f['resolution_dt'].value : null,
        status: this.f['status'] ? this.f['status'].value : null,
        user: localStorage.getItem('user_name'),
        payment: this.f['payment'] ? this.f['payment'].value : null,
        admissionFee_associate:  this.f['admissionFee_associate'] ? this.f['admissionFee_associate'].value : null,
        donationFee_associate:  this.f['donationFee_associate'] ? this.f['donationFee_associate'].value : null,
        subscriptionFee_associate_one:  this.f['subscriptionFee_associate_one'] ? this.f['subscriptionFee_associate_one'].value : null,
        subscriptionFee_associate:  this.f['subscriptionFee_associate'] ? this.f['subscriptionFee_associate'].value : null,

      }

      this.dataServe.global_service(1, '/payment_accept_associate',dt ).subscribe((data: any) => {
        this.cash_data_life = data;
        console.log(this.cash_data_life, '100');
        if(this.cash_data_life.suc > 0) {
          this.router.navigate(['/admin/approve_form'])
        }
      });  
    }

    cheque_accept(){
      var dt = {
        formNo: atob(decodeURIComponent(this.encodedFormNo)),
        resolution_no: this.f['resolution_no'] ? this.f['resolution_no'].value : null,
        resolution_dt: this.f['resolution_dt'] ? this.f['resolution_dt'].value : null,
        status: this.f['status'] ? this.f['status'].value : null,
        user: localStorage.getItem('user_name'),
        payment: this.f['payment'] ? this.f['payment'].value : null,
        admissionFee: this.f['admissionFee'] ? this.f['admissionFee'].value : null,
        donationFee: this.f['donationFee'] ? this.f['donationFee'].value : null,
        subscriptionFee:  this.f['subscriptionFee'] ? this.f['subscriptionFee'].value : null,
        subscriptionType: this.f['subscriptionType'] ? this.f['subscriptionType'].value : null,
        cheque_dt: this.f['cheque_dt'] ? this.f['cheque_dt'].value : null,
        cheque_no: this.f['cheque_no'] ? this.f['cheque_no'].value : null,
        bank_name: this.f['bank_name'] ? this.f['bank_name'].value : null,
      }

      this.dataServe.global_service(1, '/payment_accept_cheque',dt ).subscribe((data: any) => {
        this.cheque_data = data;
        console.log(this.cheque_data, '100');
        if(this.cheque_data.suc > 0) {
          this.router.navigate(['/admin/approve_form'])
        }
      });    
    }

    cheque_accept_life(){
      var dt = {
        formNo: atob(decodeURIComponent(this.encodedFormNo)),
        resolution_no: this.f['resolution_no'] ? this.f['resolution_no'].value : null,
        resolution_dt: this.f['resolution_dt'] ? this.f['resolution_dt'].value : null,
        status: this.f['status'] ? this.f['status'].value : null,
        user: localStorage.getItem('user_name'),
        payment: this.f['payment'] ? this.f['payment'].value : null,
        admissionFee_life:  this.f['admissionFee_life'] ? this.f['admissionFee_life'].value : null,
        donationFee_life:  this.f['donationFee_life'] ? this.f['donationFee_life'].value : null,
        subscriptionFee_2:  this.f['subscriptionFee_2'] ? this.f['subscriptionFee_2'].value : null,
        subscriptionFee_1:  this.f['subscriptionFee_1'] ? this.f['subscriptionFee_1'].value : null,
        cheque_dt: this.f['cheque_dt'] ? this.f['cheque_dt'].value : null,
        cheque_no: this.f['cheque_no'] ? this.f['cheque_no'].value : null,
        bank_name: this.f['bank_name'] ? this.f['bank_name'].value : null,
      }

      this.dataServe.global_service(1, '/payment_accept_cheque_life',dt ).subscribe((data: any) => {
        this.cheque_data = data;
        console.log(this.cheque_data, '100');
        if(this.cheque_data.suc > 0) {
          this.router.navigate(['/admin/approve_form'])
        }
      });   
    }

    cheque_accept_associate(){
      var dt = {
        formNo: atob(decodeURIComponent(this.encodedFormNo)),
        resolution_no: this.f['resolution_no'] ? this.f['resolution_no'].value : null,
        resolution_dt: this.f['resolution_dt'] ? this.f['resolution_dt'].value : null,
        status: this.f['status'] ? this.f['status'].value : null,
        user: localStorage.getItem('user_name'),
        payment: this.f['payment'] ? this.f['payment'].value : null,
        admissionFee_associate:  this.f['admissionFee_associate'] ? this.f['admissionFee_associate'].value : null,
        donationFee_associate:  this.f['donationFee_associate'] ? this.f['donationFee_associate'].value : null,
        subscriptionFee_associate_one:  this.f['subscriptionFee_associate_one'] ? this.f['subscriptionFee_associate_one'].value : null,
        subscriptionFee_associate:  this.f['subscriptionFee_associate'] ? this.f['subscriptionFee_associate'].value : null,
        cheque_dt: this.f['cheque_dt'] ? this.f['cheque_dt'].value : null,
        cheque_no: this.f['cheque_no'] ? this.f['cheque_no'].value : null,
        bank_name: this.f['bank_name'] ? this.f['bank_name'].value : null,
      }

      this.dataServe.global_service(1, '/payment_accept_cheque_associate',dt ).subscribe((data: any) => {
        this.cheque_data = data;
        console.log(this.cheque_data, '100');
        if(this.cheque_data.suc > 0) {
          this.router.navigate(['/admin/approve_form'])
        }
      });   
    }

    number_validation(subscriptionFee:any) {
      console.log(subscriptionFee);
      
      return subscriptionFee.target.value % 20 == 0 ? true : false
      
    }

    showLifeFee(): boolean{
      return this.form.controls['status'].value === 'T' && this.mem_type === 'L';
    }

    showGenFee(): boolean{
      return this.form.controls['status'].value === 'T' && this.mem_type === 'G';
    }

    showAssociateFee(): boolean{
      return this.form.controls['status'].value === 'T' && this.mem_type === 'AI';
    }

    showGenLifeView(): boolean{
      return this.mem_type === 'G' && this.mem_type === 'L';
    }

    fee_data_get(flag:any){
      this.dataServe.global_service(0, '/fee/get_data',`flag=${flag}`)
          .subscribe((data: any) => {
            this.resdata2 = data;
            console.log(this.resdata2, '222');
            this.resdata2 =
              this.resdata2.suc > 0 ? this.resdata2.msg : [];
              this.form.patchValue({
                admissionFee: this.resdata2[0].adm_fee,
                donationFee: this.resdata2[0].donation,
                subscriptionFee: this.resdata2[0].subscription_1,
                subscriptionType: this.resdata2[0].subs_type,
                admissionFee_life: this.resdata2[0].adm_fee,
                donationFee_life: this.resdata2[0].donation,
                subscriptionFee_2: this.resdata2[0].subscription_2,
                subscriptionFee_1: this.resdata2[0].subscription_1,
                admissionFee_associate: this.resdata2[0].adm_fee,
                donationFee_associate: this.resdata2[0].donation,
                subscriptionFee_associate_one: this.resdata2[0].subscription_2,
                subscriptionFee_associate: this.resdata2[0].subscription_1,
              })
          });    
    }
}


