import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-set_pin',
  templateUrl: './set_pin.component.html',
  styleUrls: ['./set_pin.component.css'],
  providers: [MessageService],
})
export class Set_pinComponent implements OnInit {
    pin: string[] = ['', '', '', ''];
    confirmPin: string[] = ['', '', '', ''];
    showPin = false;
    showconPin = false;

  constructor(private router: Router,
      private formBuilder: FormBuilder,
      private dataServe: DataService,
      private messageService: MessageService) { }

  ngOnInit() {
  }

  isPinValid(): boolean {
  // check all digits entered
  const enterComplete = this.pin.every(d => d && d.length === 1);
  const confirmComplete = this.confirmPin.every(d => d && d.length === 1);

  if (!enterComplete || !confirmComplete) return false;

  // check both pins match
  return this.pin.join('') === this.confirmPin.join('');
}

  goBack () {
  this.router.navigate(['/auth/verify_otp'])
}

// focusNext(event: Event, index: number) {
//   const inputEvent = event as InputEvent;

//   // move only when a digit is INSERTED
//   if (inputEvent.inputType !== 'insertText') return;

//   if (!/^[0-9]$/.test(this.pin[index])) {
//     this.pin[index] = '';
//     return;
//   }

//   const inputs = document.querySelectorAll<HTMLInputElement>('.pin-row input');
//   if (inputs[index + 1]) {
//     inputs[index + 1].focus();
//   }
// }

focusNext(event: any, index: number, type: 'enter' | 'confirm') {
  const arr = type === 'enter' ? this.pin : this.confirmPin;

  if (!/^\d$/.test(arr[index])) {
    arr[index] = '';
    return;
  }

  const rows = document.querySelectorAll('.pin-row');
  const inputs = rows[type === 'enter' ? 0 : 1].querySelectorAll('input');

  if (inputs[index + 1]) {
    inputs[index + 1].focus();
  }
}

handleKeydown(event: KeyboardEvent, index: number, type: 'enter' | 'confirm') {
  const arr = type === 'enter' ? this.pin : this.confirmPin;
  const rows = document.querySelectorAll('.pin-row');
  const inputs = rows[type === 'enter' ? 0 : 1].querySelectorAll('input');

  if (event.key === 'Backspace') {
    if (arr[index]) {
      arr[index] = '';
      return;
    }
    if (index > 0) {
      arr[index - 1] = '';
      inputs[index - 1].focus();
    }
  }
}


// handleKeydown(event: KeyboardEvent, index: number) {
//   const inputs = document.querySelectorAll<HTMLInputElement>('.pin-row input');

//   if (event.key === 'Backspace') {

//     // if current has value → clear it
//     if (this.pin[index]) {
//       this.pin[index] = '';
//       return;
//     }

//     // if empty → move backward
//     if (index > 0) {
//       this.pin[index - 1] = '';
//       inputs[index - 1].focus();
//     }
//   }
// }

sign_in () {
  const dt = {

  };
  this.router.navigate(['/auth/member_login'])
}


togglePin() {
  this.showPin = !this.showPin;
}

toggleConPin() {
  this.showconPin = !this.showconPin;
}

}
