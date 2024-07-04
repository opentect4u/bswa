import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ValidatorsService } from 'src/app/service/validators.service';
// import { multipleOfTwentyValidator } from '../../Admin/view_form/view_form.module'
// import { multipleOfTwentyValidator } from './view_form.module';

// import { allowedValuesValidator } from './validators/allowed-values.validator';

interface trnData {
  form_no: string;
  trn_dt: string;
  trn_id: string;
  sub_amt: string;
  onetime_amt: string;
  adm_fee: string;
  donation: string;
  premium_amt: string;
  tot_amt: string;
  pay_mode: string;
  receipt_no: string;
  chq_no: string;
  chq_dt: string;
  chq_bank: string;
  approval_status: string;
}

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
  subs_type: any;
  tot_amt: any;
  receipt_no: any;
  memb_status: any;
  remarks: any;
  responsedata_subs: any;
  tnxData: trnData | any;
  tnxResData: any;
  // dept_dt: any;

  constructor(private router: Router,
    private fb: FormBuilder, private route: ActivatedRoute,
    private dataServe: DataService, private datePipe: DatePipe, private validatorsService: ValidatorsService,) { 
      this.form = this.fb.group({
        resolution_no: ['',Validators.required],
        resolution_dt: ['',Validators.required],
        status: ['',Validators.required],
        reject: ['',Validators.required],
        payment: [''],
        admissionFee: [''],
        donationFee: [''],
        // subscriptionFee: [''],
        subscriptionFee: ['', Validators.required],
        subscriptionType: [{value: 0, disabled: true}],
        cheque_no: [''],
        bank_name: [''],
        cheque_dt: [''],
        admissionFee_life: [''],
        donationFee_life: [''],
        subscriptionFee_2: [''],
        subscriptionFee_1: [''],
        admissionFee_associate: [''],
        donationFee_associate: [''],
        subscriptionFee_associate_one: [''],
        subscriptionFee_associate: [''],
        totalAmount: [{ value: 0, disabled: true }],
        tot_amt: [''],
        receipt_no: [''],
        totalAmount_life: [{ value: 0, disabled: true }],
        totalAmount_associate: [{ value: 0, disabled: true }],
        trn_id: ['']
      });

      this.calculateTotal();
      this.form.valueChanges.subscribe(() => this.calculateTotal());

      this.calculateTotal_life();
      this.form.valueChanges.subscribe(() => this.calculateTotal_life());

      this.calculateTotal_associate();
      this.form.valueChanges.subscribe(() => this.calculateTotal_associate());

    }

   

    calculateTotal(): void {
      const admissionFee = +this.form.get('admissionFee')?.value || 0;
      const donationFee = +this.form.get('donationFee')?.value || 0;
      const subscriptionFee = +this.form.get('subscriptionFee')?.value || 0;
  
      const total = admissionFee + donationFee + subscriptionFee;
      this.form.get('totalAmount')?.setValue(total, { emitEvent: false });
    }

    calculateTotal_life(): void {
      const admissionFee_life = +this.form.get('admissionFee_life')?.value || 0;
      const donationFee_life = +this.form.get('donationFee_life')?.value || 0;
      const subscriptionFee_1 = +this.form.get('subscriptionFee_1')?.value || 0;
      const subscriptionFee_2 = +this.form.get('subscriptionFee_2')?.value || 0;
  
      const total = admissionFee_life + donationFee_life + subscriptionFee_1+subscriptionFee_2;
      this.form.get('totalAmount_life')?.setValue(total, { emitEvent: false });
    }

    calculateTotal_associate(): void {
      const admissionFee_associate = +this.form.get('admissionFee_associate')?.value || 0;
      const donationFee_associate = +this.form.get('donationFee_associate')?.value || 0;
      const subscriptionFee_associate_one = +this.form.get('subscriptionFee_associate_one')?.value || 0;
      const subscriptionFee_associate = +this.form.get('subscriptionFee_associate')?.value || 0;
  
      const total = admissionFee_associate + donationFee_associate + subscriptionFee_associate_one+subscriptionFee_associate;
      this.form.get('totalAmount_associate')?.setValue(total, { emitEvent: false });
    }

    get f() {
      return this.form.controls;
    }

    number_validation(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (!/^\d+$/.test(input.value)) {
        input.setCustomValidity('Please enter a valid number');
      } else {
        input.setCustomValidity('');
      }
    }

    ngOnInit() {
      const encodedFormNo = this.route.snapshot.params['form_no'];
      this.form_no = atob(decodeURIComponent(encodedFormNo));
      this.mem_type = this.route.snapshot.params['mem_type'];
      // console.log(encodedFormNo,'jjj')

      
      this.dataServe.global_service(0, '/get_member_dtls',`form_no=${this.form_no}` )
          .subscribe((data: any) => {
            this.responsedata = data;
            // console.log(this.responsedata,'pppp');
            
            // console.log(this.responsedata, '666');
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
              this.resolution_dt = this.responsedata[0].resolution_dt;
              this.subscription_1 = this.responsedata[0].subscription_1;
              this.subscription_2 = this.responsedata[0].subscription_2;
              this.adm_fee = this.responsedata[0].adm_fee;
              this.donation = this.responsedata[0].donation;
              this.memb_pic = this.responsedata[0].memb_pic;
              this.subs_type = this.responsedata[0].subs_type;
              this.memb_status = this.responsedata[0].memb_status;
              this.remarks = this.responsedata[0].remarks;

              this.fee_data_get(this.responsedata[0].mem_type)

              this.subscription_fee()
              this.subscription_fee_life()
              this.getTnxDetails();
          });
  
          if(this.mem_type != 'AI'){
            this.dataServe.global_service(0, '/get_dependent_dtls',`form_no=${this.form_no}` )
            .subscribe((spouse_dt: any) => {
              this.resdata = spouse_dt;
              console.log(this.resdata, '777');
              this.resdata =
                this.resdata.suc > 0 ? this.resdata.msg : {};
                this.spou_min = this.resdata.spouse_dt;
                this.dep_dt = this.resdata.dep_dt;
                var dep_list = this.dep_dt.length > 0 ? this.dep_dt.map((dt: any) => {
                  var newArr = `${dt.dependent_name} (${dt.relation_name}${dt.spou_phone > 0 ? `, ${dt.spou_phone}` : ''})`
                  return newArr;                  
                }) : [];
                this.dep_dt = dep_list.join(', ')

                // console.log(this.dep_dt, dep_list, 'I am here');
                
            });  
          }

        this.dataServe.global_service(0, '/get_total_amount',`form_no=${this.form_no}` )
          .subscribe((total_dt: any) => {
            this.resdata = total_dt;
            console.log(this.resdata, '777');
            this.resdata =
            this.resdata.suc > 0 ? this.resdata.msg : [];
              this.tot_amt = this.resdata.length > 0 ? this.resdata[0].tot_amt : 0;
          }); 

      // this.fee_data_get();
      if(this.mem_type == 'AI'){
        this.getMemberInfo();
        this.getSpouseInfo();
        this.getDependentInfo();
      }
    }

    getTnxDetails(){
      this.dataServe
        .global_service(0, '/master/get_tnx_info', `form_no=${this.form_no}`)
        .subscribe((data: any) => {
          this.tnxResData = data;
          console.log(this.tnxResData, this.resolution_dt > 0, '999');
          if (this.tnxResData.suc > 0 && this.tnxResData.msg.length > 0) {
            this.tnxData =
              this.tnxResData.suc > 0 ? this.tnxResData.msg[0] : {};
            this.form.patchValue({
              resolution_no: this.resolution_no,
              resolution_dt:
                this.resolution_dt
                  ? this.datePipe.transform(this.resolution_dt, 'yyyy-MM-dd')
                  : '',
              status: this.memb_status,
              payment: this.tnxData?.pay_mode,
              cheque_no: this.tnxData?.chq_no,
              bank_name: this.tnxData?.chq_bank,
              cheque_dt:
                this.tnxData?.chq_dt
                  ? this.datePipe.transform(this.tnxData?.chq_dt, 'yyyy-MM-dd')
                  : '',
              subscriptionFee_2: this.tnxData?.premium_amt,
              subscriptionFee_1: this.tnxData?.sub_amt,
              admissionFee_life: this.tnxData?.adm_fee,
              tot_amt: this.tnxData?.tot_amt,
              receipt_no: this.tnxData?.receipt_no,
              trn_id: this.tnxData?.trn_id,
            });
            this.selectedValue2 = this.tnxData?.pay_mode;
          }
        }); 
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
        member: this.memb_name,
        phone_no: this.phone_no,
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
        member: this.memb_name,
        phone_no: this.phone_no,
        resolution_no: this.f['resolution_no'] ? this.f['resolution_no'].value : null,
        resolution_dt: this.f['resolution_dt'] ? this.f['resolution_dt'].value : null,
        status: this.f['status'] ? this.f['status'].value : null,
        user: localStorage.getItem('user_name'),
        payment: this.f['payment'] ? this.f['payment'].value : null,
        admissionFee: this.f['admissionFee'] ? this.f['admissionFee'].value : null,
        donationFee: this.f['donationFee'] ? this.f['donationFee'].value : null,
        subscriptionFee:  this.f['subscriptionFee'] ? this.f['subscriptionFee'].value : null,
        subscriptionType: this.f['subscriptionType'] ? this.f['subscriptionType'].value : null,
        totalAmount: this.f['totalAmount'] ? this.f['totalAmount'].value : null,
        receipt_no: this.f['receipt_no'] ? this.f['receipt_no'].value : null,
        trn_id: this.f['trn_id'].value > 0 ? this.f['trn_id'].value : 0
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
        member: this.memb_name,
        phone_no: this.phone_no,
        resolution_no: this.f['resolution_no'] ? this.f['resolution_no'].value : null,
        resolution_dt: this.f['resolution_dt'] ? this.f['resolution_dt'].value : null,
        status: this.f['status'] ? this.f['status'].value : null,
        user: localStorage.getItem('user_name'),
        payment: this.f['payment'] ? this.f['payment'].value : null,
        admissionFee_life:  this.f['admissionFee_life'] ? this.f['admissionFee_life'].value : null,
        donationFee_life:  this.f['donationFee_life'] ? this.f['donationFee_life'].value : null,
        subscriptionFee_2:  this.f['subscriptionFee_2'] ? this.f['subscriptionFee_2'].value : null,
        subscriptionFee_1:  this.f['subscriptionFee_1'] ? this.f['subscriptionFee_1'].value : null,
        totalAmount_life: this.f['totalAmount_life'] ? this.f['totalAmount_life'].value : null,
        receipt_no: this.f['receipt_no'] ? this.f['receipt_no'].value : null,
        trn_id: this.f['trn_id'].value > 0 ? this.f['trn_id'].value : 0,
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
        member: this.memb_name,
        phone_no: this.phone_no,
        resolution_no: this.f['resolution_no'] ? this.f['resolution_no'].value : null,
        resolution_dt: this.f['resolution_dt'] ? this.f['resolution_dt'].value : null,
        status: this.f['status'] ? this.f['status'].value : null,
        user: localStorage.getItem('user_name'),
        payment: this.f['payment'] ? this.f['payment'].value : null,
        admissionFee_associate:  this.f['admissionFee_associate'] ? this.f['admissionFee_associate'].value : null,
        donationFee_associate:  this.f['donationFee_associate'] ? this.f['donationFee_associate'].value : null,
        subscriptionFee_associate_one:  this.f['subscriptionFee_associate_one'] ? this.f['subscriptionFee_associate_one'].value : null,
        subscriptionFee_associate:  this.f['subscriptionFee_associate'] ? this.f['subscriptionFee_associate'].value : null,
        totalAmount_associate: this.f['totalAmount_associate'] ? this.f['totalAmount_associate'].value : null,
        receipt_no: this.f['receipt_no'] ? this.f['receipt_no'].value : null,
        trn_id: this.f['trn_id'].value > 0 ? this.f['trn_id'].value : 0
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
        member: this.memb_name,
        phone_no: this.phone_no,
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
        totalAmount: this.f['totalAmount'] ? this.f['totalAmount'].value : null,
        trn_id: this.f['trn_id'].value > 0 ? this.f['trn_id'].value : 0
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
        member: this.memb_name,
        phone_no: this.phone_no,
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
        totalAmount_life: this.f['totalAmount_life'] ? this.f['totalAmount_life'].value : null,
        trn_id: this.f['trn_id'].value > 0 ? this.f['trn_id'].value : 0
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
        member: this.memb_name,
        phone_no: this.phone_no,
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
        totalAmount_associate: this.f['totalAmount_associate'] ? this.f['totalAmount_associate'].value : null,
        trn_id: this.f['trn_id'].value > 0 ? this.f['trn_id'].value : 0
      }

      this.dataServe.global_service(1, '/payment_accept_cheque_associate',dt ).subscribe((data: any) => {
        this.cheque_data = data;
        console.log(this.cheque_data, '100');
        if(this.cheque_data.suc > 0) {
          this.router.navigate(['/admin/approve_form'])
        }
      });   
    }

    // number_validation(subscriptionFee:any) {
    //   console.log(subscriptionFee);
      
    //   return subscriptionFee.target.value % 20 == 0 ? true : false
      
    // }

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
                // subscriptionFee: this.resdata2[0].subscription_1,
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



    subscription_fee(){
      this.dataServe.global_service(0, '/master/subscription_fee_dynamic', `memb_type=G`).subscribe((data:any) => {
        this.responsedata_subs = data
        console.log(this.responsedata_subs,'ooo');
        this.responsedata_subs = this.responsedata_subs.suc > 0 ? this.responsedata_subs.msg : []
        this.form.patchValue({
          subscriptionFee: this.responsedata_subs[0].subscription_1
        })
        this.form.get('subscriptionFee')?.setValidators([Validators.required, this.calculateSubsFee()])
        this.form.get('subscriptionFee')?.updateValueAndValidity();
        console.log(this.responsedata_subs[0].subscription_1, 'qwqwqw')
        })
    }

    calculateSubsFee() : ValidatorFn{
      return (control: AbstractControl) : ValidationErrors | null => {
        const value = control.value
        let sub_fee = this.responsedata_subs[0].subscription_1
        console.log(value, 'lalalala', sub_fee);
        
        if(value % sub_fee !== 0){
          return {notDivisibleByTwo: {value: value}}
        }
        return null
      }
    }

    subscription_fee_life(){
      this.dataServe.global_service(0, '/master/subscription_fee_dynamic_life', `memb_type=L`).subscribe((data:any) => {
        this.responsedata_subs = data
        console.log(this.responsedata_subs,'ooo');
        this.responsedata_subs = this.responsedata_subs.suc > 0 ? this.responsedata_subs.msg : []
        this.form.patchValue({
          subscriptionFee_1: this.responsedata_subs[0].subscription_1
        })
        this.form.get('subscriptionFee_1')?.setValidators([Validators.required, this.calculateLifeSubsFee()])
        this.form.get('subscriptionFee_1')?.updateValueAndValidity();
        console.log(this.responsedata_subs[0].subscription_1, 'qwqwqw')
        })
    }


    calculateLifeSubsFee() : ValidatorFn{
      return (control: AbstractControl) : ValidationErrors | null => {
        const value = control.value
        console.log(value, 'lalalala');
        
        let sub_fee_life = this.responsedata_subs[0].subscription_1
        if(value % sub_fee_life !== 0){
          return {notDivisibleByTwo: {value: value}}
        }
        return null
      }
    }

    // export function multipleOfTwentyValidator(): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } | null => {
//     const isValid = control.value % 20 === 0;
//     return isValid ? null : { notMultipleOfTwenty: { value: control.value } };
//   };
// }
}


