import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-asso_fee_form',
  templateUrl: './asso_fee_form.component.html',
  styleUrls: ['./asso_fee_form.component.css'],
  providers: [MessageService]

})
export class Asso_fee_formComponent implements OnInit {
  @Input() form!: FormGroup;
  items!: any[];
  responsedata: any;
  fee_data: any

  constructor(private router: Router, private fb: FormBuilder, private dataServe: DataService, private messageService: MessageService) { }

  ngOnInit() {
  this.fee();

    this.items = [
      {
          label: 'Member Information'
      },
      {
          label: 'Introducer Information'
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

  }

  fee(){
    this.dataServe.global_service(0, '/master/fee_list', `memb_type=AI`).subscribe((data:any) => {
      this.responsedata = data
      console.log(this.responsedata);
      this.responsedata = this.responsedata.suc > 0 ? this.responsedata.msg : []
      console.log(this.responsedata[0].subscription_1)
      this.form.patchValue({
        adm_fee: this.responsedata[0].adm_fee,
        one_subs:this.responsedata[0].subscription_2,
      })
      })
  }

}
