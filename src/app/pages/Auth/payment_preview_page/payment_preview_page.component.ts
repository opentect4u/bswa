import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment_preview_page',
  templateUrl: './payment_preview_page.component.html',
  styleUrls: ['./payment_preview_page.component.css'],
  providers: [MessageService],
})
export class Payment_preview_pageComponent implements OnInit {

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
      this.member_id = params['member_id']; 
      this.memb_name = params['memb_name']; 
      this.form_no = params['form_no']; 
      this.amount = params['amount']; 
    });
  }

}
