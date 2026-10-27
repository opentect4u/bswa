import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

interface UserInfo {
  form_no: string;
  member_id: string;
  memb_name: string;
  mem_type: string;
  memb_oprn: string;
  phone_no: string;
  email_id: string;
  subscription_upto: string;
  calc_amt: any;
  calc_upto: string;
}

@Component({
  selector: 'app-depo-trns',
  templateUrl: './depo-trns.component.html',
  styleUrls: ['./depo-trns.component.css']
})
export class DepoTrnsComponent implements OnInit {
  secretKey = environment.secretKey;
  responseData: any;
  userData: UserInfo | any;
  entryForm!: FormGroup;
  responsedata_subs: any;
  selectedValue2: string = 'C';
  memberType: any = { 'G': 'General Membership', 'L': 'Life Membership', 'AI': 'Associate Membership' };
  showModal: boolean = true;
  maxAllowedAmt: number = 0;
  minDueAmt: number = 0;
  isAlreadyPaid: boolean = false;
  financialYearStr: string = '';
  remainingMonths: number = 0;
  dueMonths: number = 0;

  constructor(private router: Router, private formBuilder: FormBuilder, private dataServe: DataService) { }

  ngOnInit() {
    this.entryForm = this.formBuilder.group({
      subs_amt: [''],
      form_no: [''],
      payment: [''],
      receipt_no: [''],
      cheque_dt: [''],
      cheque_no: [''],
      bank_name: [''],
      subs_upto: [''],
      mem_name: [''],
      mem_type: [''],
      phone_no: ['']
    });
    this.getSubsDtls();
  }

  get f() {
    return this.entryForm.controls;
  }

  getSubsDtls() {
    var dt = {
      memb_id: localStorage.getItem('member_id')
    };

    this.dataServe.global_service(1, '/get_mem_subs_dtls', dt).subscribe((data: any) => {
      this.responseData = data;
      console.log(this.responseData, 'res');

      if (this.responseData.suc > 0) {
        this.userData = this.responseData.msg[0];
        if (this.responseData.msg.length > 0) {
          this.entryForm.patchValue({
            form_no: this.userData?.form_no,
            subs_upto: this.userData?.subscription_upto,
            mem_name: this.userData?.memb_name,
            mem_type: this.userData?.mem_type,
          });
          this.subscription_fee(this.userData?.mem_type);
        } else {
          Swal.fire(
            'Warning',
            'No data found!!!',
            'warning'
          );
        }
      } else {
        Swal.fire(
          'Error',
          this.responseData.msg,
          'error'
        );
      }
    });
  }

  getFinancialYear(date: Date): { fyStartYear: number; fyEndYear: number; fyStr: string } {
    const month = date.getMonth(); // 0 = Jan ... 11 = Dec
    const year = date.getFullYear();
    let fyStartYear: number;
    let fyEndYear: number;
    if (month >= 3) {
      // April (3) to December (11)
      fyStartYear = year;
      fyEndYear = year + 1;
    } else {
      // January (0) to March (2)
      fyStartYear = year - 1;
      fyEndYear = year;
    }
    return {
      fyStartYear,
      fyEndYear,
      fyStr: `${fyStartYear}-${fyEndYear}`
    };
  }

  parseDate(dateVal: any): { year: number; month: number; day: number; dateObj: Date } | null {
    if (!dateVal) return null;
    const d = new Date(dateVal);
    if (!isNaN(d.getTime())) {
      return {
        year: d.getFullYear(),
        month: d.getMonth(),
        day: d.getDate(),
        dateObj: d
      };
    }
    if (typeof dateVal === 'string') {
      const match = dateVal.match(/^(\d{4})-(\d{2})/);
      if (match) {
        const year = parseInt(match[1], 10);
        const month = parseInt(match[2], 10) - 1;
        return {
          year,
          month,
          day: 1,
          dateObj: new Date(year, month, 1)
        };
      }
    }
    return null;
  }

  calculateSubsFee(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.isAlreadyPaid && (this.maxAllowedAmt === 0 || !(this.userData?.calc_amt > 0))) {
        return { alreadyPaid: true };
      }

      const value = control.value;

      // Check if value is a valid positive number
      if (value === null || value === undefined || value === '' || isNaN(value) || Number(value) <= 0) {
        return { invalidAmount: { value: value } };
      }

      const numVal = Number(value);

      if (!this.responsedata_subs || this.responsedata_subs.length === 0) {
        return null;
      }

      let sub_fee = 0;
      switch (this.responsedata_subs[0].memb_type) {
        case 'G':
          sub_fee = Number(this.responsedata_subs[0].subscription_1);
          break;
        case 'AI':
          sub_fee = Number(this.responsedata_subs[0].subscription_2);
          break;
        case 'L':
          sub_fee = Number(this.responsedata_subs[0].subscription_1);
          break;
        default:
          sub_fee = Number(this.responsedata_subs[0].subscription_1);
          break;
      }

      if (typeof sub_fee !== 'number' || isNaN(sub_fee) || sub_fee === 0) {
        return { invalidSubscriptionFee: { sub_fee: sub_fee } };
      }

      // Check if amount is less than minimum due
      if (this.minDueAmt > 0 && numVal < this.minDueAmt) {
        return { lessThanMinDue: { minAmount: this.minDueAmt, actual: numVal } };
      }

      // Check if amount exceeds the maximum allowed for current financial year
      if (this.maxAllowedAmt > 0 && numVal > this.maxAllowedAmt) {
        return { exceedsFinancialYear: { maxAmount: this.maxAllowedAmt, actual: numVal } };
      }

      const previousDue = parseInt(this.userData?.calc_amt, 10) || 0;
      const amtToCheck = numVal >= previousDue ? (numVal - previousDue) : numVal;

      if (amtToCheck > 0 && amtToCheck % sub_fee !== 0) {
        return { notDivisibleBySubFee: { value: value } };
      }

      return null;
    };
  }

  setAmount(amt: number) {
    if (this.isAlreadyPaid) return;
    this.entryForm.patchValue({ subs_amt: amt });
    this.entryForm.get('subs_amt')?.markAsDirty();
    this.entryForm.get('subs_amt')?.markAsTouched();
    this.entryForm.get('subs_amt')?.updateValueAndValidity();
  }

  subscription_fee(memb_type: any) {
    this.dataServe.global_service(0, '/master/subscription_fee_dynamic', `memb_type=${memb_type}`).subscribe((data: any) => {
      this.responsedata_subs = data;
      this.responsedata_subs = this.responsedata_subs.suc > 0 ? this.responsedata_subs.msg : [];

      if (!this.responsedata_subs || this.responsedata_subs.length === 0) {
        return;
      }

      const nowDate = new Date();
      const currentFY = this.getFinancialYear(nowDate);
      this.financialYearStr = currentFY.fyStr;

      const sub = this.responsedata_subs[0];
      const monthlyFee = Number(sub.subscription_1) || 0;
      const annualFee = Number(sub.subscription_1) || 0;
      const previousDue = parseInt(this.userData?.calc_amt, 10) || 0;

      const hasOpeningDue = previousDue > 0 && this.userData?.calc_upto;
      const baseDateStr = hasOpeningDue ? this.userData.calc_upto : (this.userData?.subscription_upto || this.userData?.calc_upto);
      const paidDateParsed = this.parseDate(baseDateStr);

      let calAmt = 0;
      this.isAlreadyPaid = false;
      this.maxAllowedAmt = 0;
      this.minDueAmt = 0;
      this.remainingMonths = 0;
      this.dueMonths = 0;

      switch (sub.memb_type) {
        case 'G':
        case 'default': {
          if (!paidDateParsed) {
            // No previous payment date found, calculate dues from start of current financial year (April) to current month
            const monthsFromFYStart = (nowDate.getFullYear() - currentFY.fyStartYear) * 12 + (nowDate.getMonth() - 3) + 1;
            this.dueMonths = Math.max(0, Math.min(12, monthsFromFYStart));
            this.remainingMonths = 12;

            this.minDueAmt = this.dueMonths * monthlyFee + previousDue;
            this.maxAllowedAmt = this.remainingMonths * monthlyFee + previousDue;
            calAmt = this.maxAllowedAmt;
          } else {
            // Check if already paid up to or beyond March of current financial year end (month index 2 of currentFY.fyEndYear)
            const isCoveredTillFYEnd = paidDateParsed.year > currentFY.fyEndYear ||
              (paidDateParsed.year === currentFY.fyEndYear && paidDateParsed.month >= 2);

            if (isCoveredTillFYEnd) {
              this.isAlreadyPaid = true;
              this.remainingMonths = 0;
              this.dueMonths = 0;
              this.minDueAmt = previousDue;
              this.maxAllowedAmt = previousDue;
              calAmt = previousDue;
            } else {
              // Calculate remaining months up to March of currentFY.fyEndYear
              const monthsToFYEnd = (currentFY.fyEndYear - paidDateParsed.year) * 12 + (2 - paidDateParsed.month);
              this.remainingMonths = monthsToFYEnd > 0 ? monthsToFYEnd : 0;
              this.maxAllowedAmt = this.remainingMonths * monthlyFee + previousDue;

              // Calculate due months up to current month (nowDate)
              const monthsDueTillNow = (nowDate.getFullYear() - paidDateParsed.year) * 12 + (nowDate.getMonth() - paidDateParsed.month);
              this.dueMonths = monthsDueTillNow > 0 ? Math.min(monthsDueTillNow, this.remainingMonths) : 0;
              this.minDueAmt = this.dueMonths * monthlyFee + previousDue;

              // Default payment amount: total financial year balance
              calAmt = this.maxAllowedAmt;
            }
          }
          break;
        }

        case 'L': {
          // Life Member: one-time payment of 100 per financial year
          if (!paidDateParsed) {
            this.isAlreadyPaid = false;
            calAmt = annualFee + previousDue;
            this.minDueAmt = calAmt;
            this.maxAllowedAmt = calAmt;
          } else {
            // Determine the FY end year that the last payment covered:
            // Months 3-11 (Apr-Dec) cover FY ending next year; Months 0-2 (Jan-Mar) cover FY ending this year
            const lastPaidFYEndYear = paidDateParsed.month >= 3 ? (paidDateParsed.year + 1) : paidDateParsed.year;
            const yearsDue = currentFY.fyEndYear - lastPaidFYEndYear;

            if (yearsDue <= 0) {
              this.isAlreadyPaid = true;
              calAmt = previousDue;
              this.minDueAmt = previousDue;
              this.maxAllowedAmt = previousDue;
            } else {
              this.isAlreadyPaid = false;
              this.remainingMonths = yearsDue;
              this.maxAllowedAmt = yearsDue * annualFee + previousDue;

              // Past completed FYs that are overdue (prior to current FY start)
              const pastYearsDue = currentFY.fyStartYear - lastPaidFYEndYear;
              if (pastYearsDue > 0) {
                this.dueMonths = pastYearsDue;
                this.minDueAmt = pastYearsDue * annualFee + previousDue;
              } else {
                this.dueMonths = 1;
                this.minDueAmt = annualFee + previousDue;
              }

              // Default payment amount: total financial year balance
              calAmt = this.maxAllowedAmt;
            }
          }
          break;
        }

        case 'AI': {
          calAmt = (Number(sub.subscription_2) || 0) + previousDue;
          this.minDueAmt = calAmt;
          this.maxAllowedAmt = calAmt;
          break;
        }
      }

      this.entryForm.patchValue({
        subs_amt: (this.isAlreadyPaid && calAmt === 0) ? 0 : calAmt
      });

      this.entryForm.get('subs_amt')?.setValidators([Validators.required, this.calculateSubsFee()]);
      this.entryForm.get('subs_amt')?.updateValueAndValidity();
    });
  }

  save() {
    if (this.isAlreadyPaid && !(this.userData?.calc_amt > 0)) {
      Swal.fire({
        icon: 'info',
        title: 'Already Paid',
        text: `Subscription fee for current financial year (${this.financialYearStr}) is already paid.`,
        confirmButtonText: 'OK'
      });
      return;
    }

    if (this.entryForm.invalid) {
      return;
    }

    var memberName = this.userData?.memb_name;
    var subscriptionAmount = this.entryForm.get('subs_amt')?.value;
    var form_no = this.userData?.form_no; 
    var member_id = this.userData?.member_id;

    if (this.minDueAmt > 0 && Number(subscriptionAmount) < this.minDueAmt) {
      Swal.fire({
        icon: 'warning',
        title: 'Amount Less Than Due',
        text: `Amount cannot be less than the minimum due of ₹${this.minDueAmt}.`,
        confirmButtonText: 'OK'
      });
      return;
    }

    if (this.maxAllowedAmt > 0 && Number(subscriptionAmount) > this.maxAllowedAmt) {
      Swal.fire({
        icon: 'warning',
        title: 'Limit Exceeded',
        text: `Amount cannot exceed the remaining dues for current financial year (Maximum allowed: ₹${this.maxAllowedAmt}).`,
        confirmButtonText: 'OK'
      });
      return;
    }

    var custDt = {
      form_no: form_no,
      member_id: member_id,
      memb_name: memberName,
      amount: subscriptionAmount,
      phone_no: this.userData?.phone_no,
      email: this.userData?.email_id,
      approve_status: 'A',
      calc_upto: (this.userData?.calc_amt > 0 && this.userData?.calc_upto) ? this.userData.calc_upto : (this.userData?.subscription_upto || this.userData?.calc_upto),
      subs_type: this.responsedata_subs.length > 0 ? this.responsedata_subs[0].subs_type : 'M',
      sub_fee: this.responsedata_subs[0]?.subscription_1,
      redirect_path: '/main/depo_subs'
    };

    const encDt = CryptoJS.AES.encrypt(JSON.stringify(custDt), this.secretKey).toString();

    console.log(encDt, 'amt');

    this.router.navigate(['/auth/payment_preview_page'], { 
      queryParams: { enc_dt: encDt }
    });
  }
}
