import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/service/data.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorsService } from 'src/app/service/validators.service';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-stp_premium_dtls',
  templateUrl: './stp_premium_dtls.component.html',
  styleUrls: ['./stp_premium_dtls.component.css'],
  providers: [DatePipe, MessageService],
})
export class Stp_premium_dtlsComponent implements OnInit {
  form!: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
