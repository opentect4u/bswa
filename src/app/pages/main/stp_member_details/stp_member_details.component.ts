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
  selector: 'app-stp_member_details',
  templateUrl: './stp_member_details.component.html',
  styleUrls: ['./stp_member_details.component.css'],
  providers: [DatePipe, MessageService],
})
export class Stp_member_detailsComponent implements OnInit {
  form!: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
