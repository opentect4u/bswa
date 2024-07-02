import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-asso_intro_mem',
  templateUrl: './asso_intro_mem.component.html',
  styleUrls: ['./asso_intro_mem.component.css']
})
export class Asso_intro_memComponent implements OnInit {
  @Input() form!: FormGroup
  items!: any[];
  responsedata_rel: any;
  memberData: any;


  constructor(private router: Router, private fb: FormBuilder, private dataServe: DataService) { }

  ngOnInit() {
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
  this.relationship()
  }
  relationship(){
    this.dataServe.global_service(0, '/master/relationship_list', null).subscribe((data:any) => {
      this.responsedata_rel = data
      console.log(this.responsedata_rel);
      this.responsedata_rel = this.responsedata_rel.suc > 0 ? this.responsedata_rel.msg : []
      })
  }

  get intro_name() {
    return this.form.get('intro_name')
  }
  get mem_no() {
    return this.form.get('mem_no');
  }
  get relation() {
    return this.form.get('relation');
  }

  getMemberDtls(){
    this.dataServe.global_service(1, '/member_dtls', {mem_id: this.mem_no?.value}).subscribe((data:any) => {
      this.memberData = data
      if(this.memberData.suc > 0){
        this.intro_name?.patchValue(this.memberData.msg[0].memb_name)
        this.intro_name?.disable({ onlySelf: true })
      }
      })
  }

}
