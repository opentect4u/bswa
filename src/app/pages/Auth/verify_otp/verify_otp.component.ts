import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-verify_otp',
  templateUrl: './verify_otp.component.html',
  styleUrls: ['./verify_otp.component.css'],
  providers: [MessageService],
})
export class Verify_otpComponent implements OnInit {
   pin: string[] = ['', '', '', ''];
   showPin = false;
   resendTimer = 0;
   private resendInterval: any;
   enteredOtp: string = '';
   otpError: string = '';


  constructor(private router: Router,
      private formBuilder: FormBuilder,
      private dataServe: DataService,
      private messageService: MessageService) { }

  ngOnInit() {
     this.startResendTimer();
  }

    goBack () {
  this.router.navigate(['/auth/register'])
}

//   focusNext(index: number) {
//    if (this.pin[index] && !/^[0-9]$/.test(this.pin[index])) {
//     this.pin[index] = '';
//     return;
//   }
//    const inputs = document.querySelectorAll<HTMLInputElement>('.pin-row input');
//    if (this.pin[index] && !/^[0-9]$/.test(this.pin[index])) {
//     this.pin[index] = '';
//     return;
//   }
// }


focusNext(event: Event, index: number) {
  const inputEvent = event as InputEvent;

  // move only when a digit is INSERTED
  if (inputEvent.inputType !== 'insertText') return;

  if (!/^[0-9]$/.test(this.pin[index])) {
    this.pin[index] = '';
    return;
  }

  const inputs = document.querySelectorAll<HTMLInputElement>('.pin-row input');
  if (inputs[index + 1]) {
    inputs[index + 1].focus();
  }
}

handleKeydown(event: KeyboardEvent, index: number) {
  const inputs = document.querySelectorAll<HTMLInputElement>('.pin-row input');

  if (event.key === 'Backspace') {

    // if current has value → clear it
    if (this.pin[index]) {
      this.pin[index] = '';
      return;
    }

    // if empty → move backward
    if (index > 0) {
      this.pin[index - 1] = '';
      inputs[index - 1].focus();
    }
  }
}

verifyOtp() {

  const enteredOtp = this.pin.join('');
  this.otpError = ''; 

  this.dataServe.global_service(1, '/send_otp', {}).subscribe((res: any) => {
      if (res.suc > 0) {
        const serverOtp = res.otp; 

        if (enteredOtp === serverOtp) {
          this.router.navigate(['/auth/set_pin']);
        } else {
          this.otpError = 'Invalid OTP. Please try again.';
          this.pin = ['', '', '', ''];

          setTimeout(() => {
            const first = document.querySelector<HTMLInputElement>('.pin-row input');
            first?.focus();
          });
        }

      } else {
        this.otpError = 'OTP verification failed';
      }
    });
}


togglePin() {
  this.showPin = !this.showPin;
}

isOtpComplete(): boolean {
  return this.pin.every(digit => digit && digit.trim().length === 1);
}

resendOtp() {
  this.otpError = '';
  this.pin = ['', '', '', ''];

  this.dataServe.global_service(1, '/send_otp', {}).subscribe((res: any) => {
      if (res.suc > 0) {
          this.messageService.add({
          severity: 'success',
          summary: 'OTP Sent',
          detail: 'A new OTP has been sent to your registered mobile number'
        });
  this.startResendTimer();
  setTimeout(() => {
          const first = document.querySelector<HTMLInputElement>('.pin-row input');
          first?.focus();
        });
  } else {
        this.otpError = 'Unable to resend OTP. Please try again.';
      }
},
 () => {
      this.otpError = 'Server error. Please try again later.';
    }
  );
}


startResendTimer() {
  this.resendTimer = 30;

  if (this.resendInterval) {
    clearInterval(this.resendInterval);
  }

  this.resendInterval = setInterval(() => {
    this.resendTimer--;

    if (this.resendTimer === 0) {
      clearInterval(this.resendInterval);
    }
  }, 1000);
}

onResendClick(event: Event) {
   event.preventDefault(); 

  if (this.resendTimer > 0) {
    return; // block click while timer running
  }

  this.resendOtp();
}


}
