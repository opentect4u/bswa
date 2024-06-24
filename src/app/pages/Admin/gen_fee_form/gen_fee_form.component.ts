import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-gen_fee_form',
  templateUrl: './gen_fee_form.component.html',
  styleUrls: ['./gen_fee_form.component.css'],
  providers: [MessageService]

})
export class Gen_fee_formComponent implements OnInit {
  @Input() form!: FormGroup;
  items!: any[];
  responsedata: any;
  fee_data: any

  constructor(private router: Router, private fb: FormBuilder, private dataServe: DataService, private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      {
          label: 'Member Information'
      },
      {
          label: 'Spouse Information'
      },
      {
          label: 'Dependent Information'
      },
      {
        label: 'Upload image'
    },
    {
      label: 'Fee Details'
  },
  ];
  this.fee()
  }

  fee(){
    this.dataServe.global_service(0, '/master/fee_list', `memb_type=G`).subscribe((data:any) => {
      this.responsedata = data
      console.log(this.responsedata);
      this.responsedata = this.responsedata.suc > 0 ? this.responsedata.msg : []
      console.log(this.responsedata[0].subscription_1)
      this.form.patchValue({
        admissionFee: this.responsedata[0].adm_fee,
        donationFee: this.responsedata[0].donation,
        subscriptionFee:this.responsedata[0].subscription_1,
        subscriptionType:this.responsedata[0].subs_type=='M'? 'Monthly' : 'Yearly',
      })
      })
  }

}
