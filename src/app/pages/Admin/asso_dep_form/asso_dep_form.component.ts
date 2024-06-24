import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { ValidatorsService } from 'src/app/service/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asso_dep_form',
  templateUrl: './asso_dep_form.component.html',
  styleUrls: ['./asso_dep_form.component.css']
})
export class Asso_dep_formComponent implements OnInit {
@Input() form!: FormGroup;
items!: any[];
phoneNumbers: any[] = [];
responsedata_rel: any;

  constructor( private router: Router,
    private fb: FormBuilder,
    private dataServe: DataService,
    private validatorsService: ValidatorsService) { 
  }

  ngAfterViewInit(): void {}

  ngOnInit() {
    if(this.depenFields.controls.length == 0)
      this.onadd();
    this.relationship();

  //   this.items = [
  //     {
  //         label: 'Member Information'
  //     },
  //     {
  //         label: 'Introducer Information'
  //     },
  //     {
  //         label: 'Dependent Information'
  //     },
  //     {
  //       label: 'Upload image'
  //   },
  //   {
  //     label: 'Fee Details'
  // },
  // ];
  }

  get depenFields(): FormArray {
    // console.log((<FormArray>this.form.get('depenFields')).controls, 'GET');
    return this.form.get('depenFields') as FormArray;
  }

  relationship(){
    this.dataServe.global_service(0, '/master/relationship_list', null).subscribe((data:any) => {
      this.responsedata_rel = data
      console.log(this.responsedata_rel);
      this.responsedata_rel = this.responsedata_rel.suc > 0 ? this.responsedata_rel.msg : []
      })
  }

  onadd() {
    // this.phoneNumbers.push('');
    const fieldGroup = this.fb.group(
      {
        dependent_name: [null],
        dob: [null],
        relation: [null],
      },
      {
        validators: this.validatorsService.conditionalRequiredValidator(
          'dependent_name',
          ['dob', 'relation']
        ),
      }
    );
    this.depenFields.insert(0, fieldGroup);
    // console.log(this.depenFields.controls, 'ADD');
  }

  onminus(index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.depenFields.removeAt(index);
        Swal.fire({
          title: 'Deleted!',
          text: 'Row has been deleted.',
          icon: 'success',
        });
      }
    });
  }

}
