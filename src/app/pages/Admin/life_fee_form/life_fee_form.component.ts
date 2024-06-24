import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-life_fee_form',
  templateUrl: './life_fee_form.component.html',
  styleUrls: ['./life_fee_form.component.css'],
  providers: [MessageService]

})
export class Life_fee_formComponent implements OnInit {
  @Input() form!: FormGroup;
  items!: any[];
  responsedata: any;
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
    this.dataServe.global_service(0, '/master/fee_list', `memb_type=L`).subscribe((data:any) => {
      this.responsedata = data
      console.log(this.responsedata);
      this.responsedata = this.responsedata.suc > 0 ? this.responsedata.msg : []
      console.log(this.responsedata[0].subscription_1)
      this.form.patchValue({
        sub_fee_2: this.responsedata[0].subscription_2,
        sub_fee: this.responsedata[0].subscription_1,
      })
      })
  }

}