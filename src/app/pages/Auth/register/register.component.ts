import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService],
})
export class RegisterComponent implements OnInit {
   loginType: 'BSPWA' | 'OTHERS' = 'BSPWA';
  memberInput = '';
  getLoginData: any;
  memberError: string = '';


  constructor(private router: Router,
      private formBuilder: FormBuilder,
      private dataServe: DataService,
      private messageService: MessageService) { }

  ngOnInit() {
  }

    selectType(type: 'BSPWA' | 'OTHERS') {
    this.loginType = type;
    this.memberInput = '';
  }

  goBack () {
  this.router.navigate(['/auth/choose_section'])
}

continue () {
  const dt = {
    member_id : this.memberInput.trim(),
  };
  this.dataServe.global_service(1, '/check_member_id', dt).subscribe((data) => {
   this.getLoginData = data;
   if (this.getLoginData.suc > 0) {
  this.dataServe.global_service(1, '/send_phone_no_fr_otp', dt).subscribe((otpData: any) => {
   if (otpData.suc > 0) {
   this.router.navigate(['/auth/verify_otp'])
   }else{
     this.memberError = 'Unable to send OTP. Try again.';
   }
  });
   }else{
     this.memberError = 'Invalid Member ID';
   }
  });
}

}
