import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-show_admin_data',
  templateUrl: './show_admin_data.component.html',
  styleUrls: ['./show_admin_data.component.css']
  ,
  providers: [MessageService,DatePipe]
})
export class Show_admin_dataComponent implements OnInit {
  form!: FormGroup;
  userData: any;
  msg: any;


  constructor(private router: Router, private dataServe: DataService, private formBuilder: FormBuilder, private messageService: MessageService, private route: ActivatedRoute,private datePipe: DatePipe) { }

  ngOnInit() {
  }

  onadd(){
    this.router.navigate(['/superadmin/add_admin']);
  }

}
