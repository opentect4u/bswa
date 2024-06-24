import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-spouse_info',
  templateUrl: './spouse_info.component.html',
  styleUrls: ['./spouse_info.component.css']
})
export class Spouse_infoComponent implements OnInit {
  @Input() form!: FormGroup;
  items!: any[];

  constructor(private router: Router, private fb: FormBuilder) { }

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
  // this.onChanges();
  }

    // onChanges(): void {
    //   this.form.get('spou_name')?.valueChanges.subscribe(value => {
    //     const controlsToValidate = [
    //       'spou_gurd_name',
    //       'spou_blood_grp',
    //       'spou_dob',
    //       'spou_phone',
    //       'spou_mobile_no',
    //       'spou_min_no',
    //       'spou_mem_addr',
    //       'spou_police_st',
    //       'spou_city'
    //     ];

    //     for (let i = 0; i < controlsToValidate.length; i++) {
    //       const controlName = controlsToValidate[i];
    //       const control = this.form.get(controlName);
    //       if (value) {
    //         control?.setValidators(Validators.required);
    //       } else {
    //         control?.clearValidators();
    //       }
    //       control?.updateValueAndValidity();
    //       console.log(control);
    //     }
    //   });
    // }

}
