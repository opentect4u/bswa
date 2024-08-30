import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment_preview_page',
  templateUrl: './payment_preview_page.component.html',
  styleUrls: ['./payment_preview_page.component.css'],
  providers: [MessageService],
})
export class Payment_preview_pageComponent implements OnInit {
  secretKey = environment.secretKey
  memb_name : any
  form_no : any
  amount : any
  member_id: any

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dataServe: DataService,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) { }

    ngOnInit() {

    this.route.queryParams.subscribe(params => {
      const enc_dt = params['enc_dt'];
  
      if (enc_dt) {
        const decDt = CryptoJS.AES.decrypt(enc_dt, this.secretKey).toString(CryptoJS.enc.Utf8);
  
        const custDt = JSON.parse(decDt);
  
        this.member_id = custDt.member_id;
        this.memb_name = custDt.memb_name;
        this.form_no = custDt.form_no;
        this.amount = custDt.amount;
      }
    });
  }

}
