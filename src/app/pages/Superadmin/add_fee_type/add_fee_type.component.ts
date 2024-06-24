import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add_fee_type',
  templateUrl: './add_fee_type.component.html',
  styleUrls: ['./add_fee_type.component.css'],
  providers: [MessageService,DatePipe]
})
export class Add_fee_typeComponent implements OnInit {
  member: any;
  form!: FormGroup;
  genForm!: FormGroup;
  lifeForm!: FormGroup;
  assoForm!: FormGroup;
  data_type: any[] = [];
  selectedValue: any = '';
  id: any = 0;
  groupSaveData: any;
  groupSaveData1: any;
  groupSaveData2: any;

  formData: any
  disable=false;



  constructor(private router: Router, private dataServe: DataService, private formBuilder: FormBuilder, private messageService: MessageService, private route: ActivatedRoute,private datePipe: DatePipe) {
    // this.onadd();
    // this.member = 'L';
  }

  ngOnInit() {

    this.selectedValue = this.route.snapshot.params['flag'] != '' ? atob(decodeURIComponent(this.route.snapshot.params['flag'])) : ''
    // console.log(this.selectedValue);

    this.genForm = this.formBuilder.group({
      member: ['', Validators.required],
      effect_dt: ['', Validators.required],
      admissionFee: ['', [Validators.required]],
      donationFee: ['', Validators.required],
      subscriptionFee: ['', Validators.required],
      subscriptionType: ['', Validators.required],
    })
    this.lifeForm = this.formBuilder.group({
      effect_date: ['', Validators.required],
      sub_fee_2: ['', Validators.required],
      sub_fee: ['', [Validators.required]],
      // subs_type: ['', Validators.required],
    })
    this.assoForm = this.formBuilder.group({
      eff_dt: ['', Validators.required],
      subs_fee_2: ['', Validators.required],
      ad_fee: ['', [Validators.required]],
      // subs_ty: ['', Validators.required],
    })

    if(this.selectedValue != '') {
        this.disable = true;
      this.getData(this.selectedValue)
    }
  }

  get m() {
    return this.genForm.controls;
  }

  get n() {
    return this.lifeForm.controls;
  }

  get o() {
    return this.assoForm.controls;
  }

  add_gen() {
    console.log(this.genForm);
    console.log(this.m, 'pp');

    var dt = {
      // id: this.id ? this.id : 0,
      member: 'G',
      effect_dt: this.m['effect_dt'] ? this.m['effect_dt'].value : null,
      admissionFee: this.m['admissionFee'] ? this.m['admissionFee'].value : null,
      donationFee: this.m['donationFee'] ? this.m['donationFee'].value : null,
      subscriptionFee: this.m['subscriptionFee'] ? this.m['subscriptionFee'].value : null,
      subscriptionType: this.m['subscriptionType'] ? this.m['subscriptionType'].value : null,
    };

    this.dataServe.global_service(1, '/fee/gen_mem_save', dt).subscribe(
      data => {
        console.log(data);
        this.groupSaveData = data;
        if (this.groupSaveData.suc > 0) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data saved successfully' });
          this.router.navigate(['/superadmin/fee_type']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save data' });
        }
      },
      error => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
      }
    );
  }

  add_life() {
    console.log(this.lifeForm);
    console.log(this.n, 'pp');

    var dt = {
      effect_date: this.n['effect_date'] ? this.n['effect_date'].value : null,
      sub_fee_2: this.n['sub_fee_2'] ? this.n['sub_fee_2'].value : null,
      sub_fee: this.n['sub_fee'] ? this.n['sub_fee'].value : null,
      // subs_type: this.n['subs_type'] ? this.n['subs_type'].value : null,
    };

    this.dataServe.global_service(1, '/fee/life_mem_save', dt).subscribe(
      data => {
        console.log(data);
        this.groupSaveData1 = data;
        if (this.groupSaveData1.suc > 0) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data saved successfully' });
          this.router.navigate(['/superadmin/fee_type']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save data' });
        }
      },
      error => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
      }
    );
  }

  add_asso() {
    console.log(this.assoForm);
    console.log(this.o, 'pp');

    var dt = {
      eff_dt: this.o['eff_dt'] ? this.o['eff_dt'].value : null,
      subs_fee_2: this.o['subs_fee_2'] ? this.o['subs_fee_2'].value : null,
      ad_fee: this.o['ad_fee'] ? this.o['ad_fee'].value : null,
      // subs_ty: this.o['subs_ty'] ? this.o['subs_ty'].value : null,
    };

    this.dataServe.global_service(1, '/fee/asso_mem_save', dt).subscribe(
      data => {
        console.log(data);
        this.groupSaveData2 = data;
        if (this.groupSaveData2.suc > 0) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data saved successfully' });
          this.router.navigate(['/superadmin/fee_type']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save data' });
        }
      },
      error => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
      }
    );
  }


  onDropdownChange(event: any) {
    // You can handle additional logic here if needed when the dropdown value changes
    console.log('Selected Value:', this.selectedValue);
    this.getData(this.selectedValue)
  }

  getData(flag: any) {
    // var datePipe = new DatePipe('local','IST');
    this.dataServe.global_service(0, '/fee/get_data', `flag=${flag}`).subscribe(data => {
      console.log(data)
      this.formData = data;
      if (this.formData.suc > 0) {
        this.formData = this.formData.msg;
        if (this.formData.length > 0) {
          // this.show_spinner=true;
          switch (flag) {
            case 'G':
              this.genForm.patchValue({
                effect_dt: this.datePipe.transform(this.formData[0].effective_dt, 'yyyy-MM-dd'),
                admissionFee: this.formData[0].adm_fee,
                donationFee: this.formData[0].donation,
                subscriptionFee: this.formData[0].subscription_1,
                subscriptionType: this.formData[0].subs_type,
              })
              break;
            case 'L':
              this.lifeForm.patchValue({
                effect_date: this.datePipe.transform(this.formData[0].effective_dt, 'yyyy-MM-dd'),
                sub_fee_2: this.formData[0].subscription_2,
                sub_fee: this.formData[0].subscription_1,
                // subs_type: this.formData[0].subs_type,
              })
              break;
            case 'AI':
              this.assoForm.patchValue({
                eff_dt: this.datePipe.transform(this.formData[0].effective_dt, 'yyyy-MM-dd'),
                subs_fee_2: this.formData[0].subscription_2,
                ad_fee: this.formData[0].adm_fee,
                // subs_ty: this.formData[0].subs_type,
              })
              break;
            default:
              break;
          }
        }
      }
    }, error => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving data' });
    })

  }

  // isMembershipSelected(): boolean {
  //   return this.selectedMembership !== '';
  // }

  // goback(){
  //   this.router.navigate(['/admin/fee_type']);
  // }

  // onadd() {
  //   this.data_type.unshift({
  //     admissionFee: null,
  //     donationFee: null,
  //     subscriptionFee: null,
  //     subscriptionType: ''
  //   });
  //   this.life_type.unshift({
  //     admissionFee: null,
  //     donationFee: null,
  //     subscriptionFee: null,
  //     subscriptionType: ''
  //   });
  // }

  back() {
    this.router.navigate(['/superadmin/fee_type']);
  }

}