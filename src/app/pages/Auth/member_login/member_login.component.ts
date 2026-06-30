import { Component, OnInit, ViewChildren, QueryList, ElementRef,  AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-member_login',
  templateUrl: './member_login.component.html',
  styleUrls: ['./member_login.component.css'],
  providers: [MessageService],
})
export class Member_loginComponent implements OnInit {
  loginForm!: FormGroup;
  getLoginData: any;
  hide: boolean = true;

  loginType: 'BSPWA' | 'OTHERS' = 'BSPWA';
  memberInput = '';
  pin: string[] = ['', '', '', ''];
  showPin = false;

   @ViewChildren('pinBox') pinBoxes!: QueryList<ElementRef>;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dataServe: DataService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      uname: ['', [Validators.required]],
      pin0: ['', Validators.required],
      pin1: ['', Validators.required],
      pin2: ['', Validators.required],
      pin3: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

//   focusNext(index: number) {
//   if (!/^[0-9]$/.test(this.pin[index - 1])) {
//     this.pin[index - 1] = '';
//     return;
//   }

//    const inputs = document.querySelectorAll<HTMLInputElement>('.pin-row input');
//   if (inputs[index]) {
//     inputs[index].focus();
//   }
// }

onMemberChange(value: string) {
  // update member / MIN input
  this.memberInput = value.trim();

  this.pin[0] = '';
  this.pin[1] = '';
  this.pin[2] = '';
  this.pin[3] = '';
}


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

togglePin() {
  this.showPin = !this.showPin;
}

  selectType(type: 'BSPWA' | 'OTHERS') {
    this.loginType = type;
    this.memberInput = '';
  }

canContinue(): boolean {
  const memberOk = !!this.memberInput && this.memberInput.trim().length > 0;
  const pinOk = this.pin.length === 4 && this.pin.every(p => p !== '');

  return memberOk && pinOk;
}

goBack () {
  this.router.navigate(['/auth/choose_section'])
}

generate_pin_route (){
  this.router.navigate(['/auth/register'])
}

  // logSubmit() {
  //   var dt = {
  //     username: this.f['uname'].value,
  //     pas: this.f['password'].value,
  //   };
  //   this.dataServe.global_service(1, '/member_login', dt).subscribe((data) => {
  //     this.getLoginData = data;
  //     // console.log(data, 'oo');
  //     if (this.getLoginData.suc > 0) {
  //       localStorage.clear(); 
  //       localStorage.setItem('token', this.getLoginData.token);
  //       localStorage.setItem(
  //         'user_name',
  //         this.getLoginData.msg.userdata[0].memb_name
  //       );
  //       localStorage.setItem(
  //         'user_type',
  //         this.getLoginData.msg.userdata[0].user_type
  //       );
  //       localStorage.setItem(
  //         'mem_type',
  //         this.getLoginData.msg.userdata[0].mem_type
  //       );
  //       localStorage.setItem(
  //         'form_no',
  //         this.getLoginData.msg.userdata[0].form_no
  //       );
  //       localStorage.setItem(
  //         'member_id',
  //         this.getLoginData.msg.userdata[0].member_id
  //       );
  //       this.router.navigate(['main/dashboard']).catch((data) => {
  //         this.messageService.add({
  //           severity: 'success',
  //           summary: 'Success',
  //           detail: 'Message Content',
  //         });
  //       });
  //     } else {
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Login Failed',
  //         detail: 'Incorrect User ID or Password',
  //       });
  //     }
  //      }, (err) => {
  //        // In case of server/network error
  //   this.messageService.add({
  //     severity: 'error',
  //     summary: 'Server Error',
  //     detail: 'Unable to connect. Please try again later.',
  //   });
  //   });
  // }

  // togglePasswordVisibility(passwordInput: HTMLInputElement) {
  //   passwordInput.type =
  //     passwordInput.type === 'password' ? 'text' : 'password';
  // }


  logSubmit() {
    const finalPin = this.pin.join('');
    var dt = {
      username: this.memberInput.trim(),
      pas: finalPin
    };
    this.dataServe.global_service(1, '/member_login', dt).subscribe((data) => {
      this.getLoginData = data;

      if (this.getLoginData.suc > 0) {
        localStorage.clear(); 
        localStorage.setItem('token', this.getLoginData.token);
        // localStorage.setItem('login_data', JSON.stringify(data));

        // Determine if member (handle both new and old backend response)
        let isMember = this.getLoginData.msg.ismember;
        if (isMember === undefined && this.getLoginData.msg.userdata && this.getLoginData.msg.userdata.length > 0) {
           isMember = this.getLoginData.msg.userdata[0].user_type === 'M' ? 'M' : 'N';
        }

         // SAVE userdata ONLY if MEMBER
        if (isMember === 'M' && this.getLoginData.msg.userdata && this.getLoginData.msg.userdata.length > 0) {
          localStorage.setItem('user_name', this.getLoginData.msg.userdata[0].memb_name);
          localStorage.setItem('user_type', this.getLoginData.msg.userdata[0].user_type);
          localStorage.setItem('mem_type', this.getLoginData.msg.userdata[0].mem_type);
          localStorage.setItem('form_no', this.getLoginData.msg.userdata[0].form_no);
          localStorage.setItem('member_id', this.getLoginData.msg.userdata[0].member_id);
        }

          // SAVE STP data for NON-MEMBER (only available in new backend)
          if (isMember === 'N' && this.getLoginData.msg.hasstp === 'Y') {
            localStorage.setItem('flag', 'STP');
            localStorage.setItem('form_no', this.getLoginData.msg.stp_details[0].form_no);
            localStorage.setItem('user_type', this.getLoginData.msg.stp_details[0].user_type);
            localStorage.setItem('policy_holder_type', this.getLoginData.msg.stp_details[0].policy_holder_type);
            localStorage.setItem('member_id', this.getLoginData.msg.stp_details[0].member_id);
            localStorage.setItem('user_name', this.getLoginData.msg.stp_details[0].memb_name);
            localStorage.setItem('min_no', this.getLoginData.msg.stp_details[0].min_no);
            localStorage.setItem('stp_user_status', this.getLoginData.msg.stp_details[0].stp_user_status);
          }
       
        if (isMember === 'M') {
          this.router.navigate(['/main/dashboard']);
        } else {
         this.router.navigate(['/main/stp_dashboard']);
        }
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'Incorrect User ID or Password',
        });
      }
       }, (err) => {
         // In case of server/network error
    this.messageService.add({
      severity: 'error',
      summary: 'Server Error',
      detail: 'Unable to connect. Please try again later.',
    });
    });
  }

}
