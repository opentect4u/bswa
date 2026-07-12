import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-mobile-no',
  templateUrl: './update_mobile_no.component.html',
  styleUrls: ['./update_mobile_no.component.css']
})
export class UpdateMobileNoComponent implements OnInit {
  updateForm!: FormGroup;
  updateTypes: any[] = [];
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private dataServe: DataService) { }

  ngOnInit(): void {
    this.updateTypes = [
      { label: 'Super Topup Policy (STP)', value: 'STP' },
      { label: 'General/Life Membership', value: 'MEMBERSHIP' }
    ];

    this.updateForm = this.fb.group({
      member_id: ['', Validators.required],
      update_type: ['', Validators.required],
      new_mobile_no: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]]
    });
  }

  onSubmit() {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const reqData = this.updateForm.value;

    this.dataServe.global_service(1, '/admin_update_mobile_no', reqData).subscribe(
      (res: any) => {
        this.isLoading = false;
        if (res && res.suc > 0) {
          Swal.fire('Success', res.msg, 'success');
          this.updateForm.reset();
        } else {
          Swal.fire('Error', res.msg || 'Failed to update mobile number', 'error');
        }
      },
      (error) => {
        this.isLoading = false;
        Swal.fire('Error', 'An error occurred while updating the mobile number.', 'error');
        console.error(error);
      }
    );
  }
}
