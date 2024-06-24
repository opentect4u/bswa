import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/service/data.service';
import { ValidatorsService } from 'src/app/service/validators.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin_preview_form',
  templateUrl: './admin_preview_form.component.html',
  styleUrls: ['./admin_preview_form.component.css'],
  providers: [MessageService],

})
export class Admin_preview_formComponent implements OnInit {
  @Input() form!: FormGroup;

  ownFile!: File;
  spouseFile!: File;
  form_2!: FormGroup;
  img_info: any;
  savedata: any;
  dependent_info: any;
  formNo: any = 0;
  personal_info: any;
  gender: any
  member: any;
  // spouse_info: any;


  constructor(private router: Router, private fb: FormBuilder,
    private dataServe: DataService,
    private validatorsService: ValidatorsService,
private route: ActivatedRoute,
private messageService: MessageService) { }

  ngOnInit() {
    const encodedFormNo = this.route.snapshot.params['form_no'];
    this.formNo = atob(decodeURIComponent(encodedFormNo));
    this.gender = this.route.snapshot.params['gender'];
    this.member = this.route.snapshot.params['member'];
    this.form_2 = this.fb.group({
      own_img: [''],
      spou_img: [''],
    });
  }

  get df() {
    return this.form_2.get('depenFields') as FormArray;
  }

  onFileSelected(fileData: any) {
    const { file, flag } = fileData;
    switch (flag) {
      case 'O':
        this.ownFile = file;
        break;
      case 'S':
        this.spouseFile = file;
        break;
      default:
        break;
    }
  }

  back(){
    this.router.navigate(['/admin/dashboard'])
  }

  submit(){
    const frmDt = new FormData();
    frmDt.append('own_file', this.ownFile);
    frmDt.append('spouse_file', this.spouseFile);
    frmDt.append('created_by', this.member);
    frmDt.append('mem_type', 'G');
    this.img_info = frmDt;
    if (this.ownFile || this.spouseFile){
      this.img_info.append('form_no', this.formNo);
      this.img_info.append('relation', this.gender);
      this.dataServe
        .global_service(1, '/image_form_save', this.img_info)
        .subscribe((data2: any) => {
          this.savedata = data2;
          if (this.savedata.suc > 0) {
            Swal.fire(
              'Success! Image Uploaded successfully.',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                // this.router.navigate(['/admin/member_form'])
              }
            });
          } else {
            Swal.fire('Error', 'Image not Uploaded Successfully!', 'error');
          }
        });
    }

  }

}
