import { Component, OnInit, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as CryptoJS from 'crypto-js';

interface MemberStatus {
  name: string;
  code: string;
}

interface MembershipInfo {
  mem_type: string,
  memb_name: string,
  member_id: string,
  gurdian_name: string,
  gender: string,
  marital_status: string,
  dob: string
  unit_name: string,
  phone: string,
  memb_img: string,
  doc_img: string,
  form_dt: string;
  memb_oprn: string;
  disease_flag: string;
  disease_type: string;
}

interface SpouseDepenInfo {
  sl_no: string,
  dependent_name: string,
  relation_name: string,
  dob: string,
  disease_flag: string,
  disease_type: string;
  dep_img: string;
  dep_doc: string;
}

interface PremiumInfo {
  "form_no": string,
  "premium_amt": string,
  "premium_amt2": string,
  "prm_flag2": string,
  "premium_amt3": string,
  "prm_flag3": string,
  "family_type": string,
}

@Component({
  selector: 'app-print_group_policy',
  templateUrl: './print_group_policy.component.html',
  styleUrls: ['./print_group_policy.component.css'],
  providers: [DatePipe],
})
export class Print_group_policyComponent implements OnInit  {
  secretKey = environment.secretKey
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  form_no: any;
  member_id:any;
  WindowObject: any;
  divToPrint: any;
  api_base_url = environment.api_url;
  selectedValues: any[] = [];
  responsedata: any;
  memb_name: any;
  mem_type: any;
  memb_oprn: any;
  staff_nos: any;
  pers_no: any;
  gurdian_name: any;
  memb_address: any;
  ps: any;
  phone_no: any;
  blood_grp: any;
  dob: any;
  email_id: any;
  min_no: any;
  dependent_name: any;
  resdata: any;
  spou_blood_grp: any;
  gurd_name: any;
  spou_dob: any;
  spou_phone: any;
  spou_memb_address: any;
  resolution_no: any;
  subscription_1: any;
  adm_fee: any;
  donation: any;
  spou_min: any;
  resdata1: any;
  dep_dt: any;
  memb_pic: any;
  memb_img: any;
  responsedata_1: any;
  unit_name: any;
  spouseInfo: SpouseDepenInfo[] | undefined;
  stpinfo: MembershipInfo | undefined;
  ind_type: any;
  treatment_dtls:any;
  particulars:any;
  amount:any;
  fin_year:any;
  sup_top_list: any = [];
  additionalOptions: any = false;
  preinfo:  PremiumInfo | undefined;
  pre_amt_flag: any;
  pre_amt_value: any;
  tot_amt_value: any;
  genInsData: any;
  checkedmember: any  = false

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataServe: DataService,
    private datePipe: DatePipe
  ) { }
  // ngAfterViewInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  ngOnInit() {
    const encodedFormNo = this.route.snapshot.params['form_no'];
    // console.log(encodedFormNo);
    
    this.member_id = localStorage.getItem('user_name')
    console.log(this.member_id,'ooo'); 
    this.form_no = atob(decodeURIComponent(encodedFormNo));
    // console.log(this.form_no,'ggg');
    
    this.checkedmember = this.route.snapshot.params['checkedmember'];
    this.getGenInsInfo()
  }

//   calculateTotalAmount() {
//     const premiumAmt = this.preinfo?.premium_amt || 0;
//     const additionalAmt = this.pre_amt_value || 0;
    
//     this.tot_amt_value = premiumAmt + additionalAmt;
// }

  getMemberInfo(memb_id:any) {
    this.dataServe
      .global_service(0, '/get_member_policy_print', `member_id=${memb_id}&&form_no=${this.form_no}`)
      .subscribe((data: any) => {
        this.responsedata = data;
        console.log(this.responsedata, '666');
        this.responsedata =
          this.responsedata.suc > 0
            ? this.responsedata.msg.length > 0
              ? this.responsedata.msg[0]
              : {}
            : {};
        this.stpinfo = this.responsedata;
        console.log(this.stpinfo,'stp');
        
      });
  }

  getGenInsInfo() {
    this.dataServe
      .global_service(0, '/get_gen_ins_dt', `form_no=${this.form_no}`)
      .subscribe((data: any) => {
        this.genInsData = data;
        console.log(this.genInsData, '666');
        this.genInsData =
          this.genInsData.suc > 0
            ? this.genInsData.msg.length > 0
              ? this.genInsData.msg[0]
              : {}
            : {};
        
    this.getMemberInfo(this.genInsData.member_id ? this.genInsData.member_id : '');
    this.getSpouseInfo(this.genInsData.member_id ? this.genInsData.member_id : '');
    this.getPremiumInfo();
      });
  }

  getSpouseInfo(memb_id:any) {
    this.dataServe
      .global_service(0, '/get_member_policy_dependent_print', `member_id=${memb_id}&&form_no=${this.form_no}`)
      .subscribe((spouse_dt: any) => {
        this.resdata = spouse_dt;
        console.log(this.resdata, '777');
        this.resdata = 
           this.resdata.suc > 0 
             ? this.resdata.msg.length > 0 
             ? this.resdata.msg
             : []
             : [];
        this.spouseInfo = this.resdata
      });
  }

  getPremiumInfo(){
    this.dataServe
    .global_service(0, '/premium_dtls', `form_no=${this.form_no}`)
    .subscribe((data: any) => {
      this.responsedata = data;
      console.log(this.responsedata, '666');
      this.responsedata =
        this.responsedata.suc > 0
          ? this.responsedata.msg.length > 0
            ? this.responsedata.msg[0]
            : {}
          : {};
      this.preinfo = this.responsedata;
      this.pre_amt_flag = this.preinfo!['prm_flag2'] != 'Y' && this.preinfo!['prm_flag3'] != 'Y' ? 'No' : 'Yes';
      this.pre_amt_value = this.preinfo!['prm_flag2'] == 'Y' ? 
      this.preinfo!['premium_amt2'] : this.preinfo!['prm_flag3'] == 'Y' ? 
      this.preinfo!['premium_amt3'] : '0';
      console.log(this.preinfo,'pre');
      this.tot_amt_value = (Number(this.preinfo?.premium_amt) || 0) + (Number(this.pre_amt_value) || 0);
      // console.log(this.tot_amt_value,this.preinfo?.premium_amt,this.pre_amt_value,'yyy');
      
    });
  }
  // getPremiumAmt(event:any){
  //   console.log(event.target.value);
  //   var dropVal = event.target.value
  //   var filter_res_dt = this.responsedata.length > 0 ? (this.responsedata[0].pre_dt.filter((dt:any) => dt.family_type == dropVal)) : []
  //   if(filter_res_dt.length > 0){
  //     var sup_top_dt = [{name: 'Super Top up Amount 12 lacs', value: filter_res_dt[0].premium2}, {name: 'Super Top up Amount 24 lacs', value: filter_res_dt[0].premium3}]
  //     this.sup_top_list = sup_top_dt
  //     this.form.patchValue({pre_amont: filter_res_dt[0].premium1})
  //   }
    
  // }

  printDiv() {
    this.divToPrint = document.getElementById('divToPrint');

    this.WindowObject = window.open('', 'Print-Window');
    this.WindowObject.document.open();
    this.WindowObject.document.writeln('<!DOCTYPE html>');
    this.WindowObject.document.writeln(
      '<html><head><title></title><style type="text/css">'
    );

    // this.WindowObject.document.writeln(
    //   '@media print {.table_space { margin-left: 14px; } .letter{ margin-left: 19px; margin: 6PX; padding: 0; } .letter_style{ margin-left: 22px; margin: 17PX; padding: 0; } p-button.p-element, .print_btn { bottom: 15px; } .size{ margin-left: 67px; } .margin{ margin-left: 65vw; } </style>'
    // );
    this.WindowObject.document.writeln('@media print { .center { text-align: center;}' +
      'body{font-family:Arial, Tahoma, Verdana;font-size: 14px;color: #6f7479;}' +
      '.wrapper{box-shadow: none !important; max-width: 1100px; width: 100%; margin: 0 auto; font-family:Arial, Tahoma, Verdana;}' +
      '.contant-wraper{box-shadow: none !important;}'+
      '.table_head_cus tr td{background: #D9D9D9;}' +
      '.print_Section table tbody tr td{border-bottom:#ccc solid 1px; padding:10px;}' +
      '.print_Section{color: #000;}' +
      '.print_Section h4{font-size: 16px; color: #000; margin: 0 0 15px 0; padding: 0;}' +
      '.print_Section p{font-size: 16px; line-height: 20px; color: #000; font-size: 14px; line-height: 23px; margin: 0 0 25px 0; padding: 0;}' +
      '.print_Section p span.perple{color: rgb(55, 55, 230);}' +
      '.print_Section h3{font-size: 20px; color: #000; margin: 0 0 15px 0; padding: 0; font-weight: 700;}' +
      '.print_Section table{margin: 0 !important; width: 100% !important;}' +
      '.print_Section ul.print_ul{list-style-type: none; padding:0; margin:0;}' +
      '.print_Section ul.print_ul li{font-size: 16px; color: #000; margin: 0 0 6px 0; padding: 0;}' +
      '.print_Section ul.print_ul li .li_Span{color: rgb(55, 55, 230); font-weight: 700;}' +
      '.print_Section table.table_space_cus td span{color: rgb(55, 55, 230); font-weight: 700;}' +
      '.print_Section table.table_space_cus td.table_td_70{width: 70%;}' +
      '.print_Section table.table_space_cus td.table_td_30{width: 30%;}' +
      '.print_Section table.table_space_cus td.table_td_5{width:5%;}' +
      '.print_Section table.table_space_cus td.table_td_55{width:50%;}' +
      '.print_Section table.table_space_cus td.table_td_20{width:20%;}' +
      '.print_Section table.table_space_cus td{font-size: 14px;}' +
      '.textAlign_left{text-align: left;}'+
      '.textAlign_right{text-align: right;}'+
      '.print_Section table.table_space_cus td.no_pading{padding: 0;}' +
      'tr.table_head_cus td{background: #333; color:#fff;}' +
      '} </style>');
    this.WindowObject.document.writeln(
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">'
    );
    this.WindowObject.document.writeln(
      '<link rel="stylesheet" href="/plugins/fontawesome-free/css/all.min.css">'
    );
    this.WindowObject.document.writeln(
      '<link rel="stylesheet" href="/css/adminlte.min.css">'
    );
    this.WindowObject.document.writeln('</head><body onload="window.print()">');
    this.WindowObject.document.writeln(this.divToPrint.innerHTML);
    this.WindowObject.document.writeln('</body></html>');
    this.WindowObject.document.close();
    setTimeout(() => {
      this.WindowObject.close();
    }, 1000);
  }

  downloadPDF() {
    if (!this.pdfContent) {
      console.error('pdfContent is not available.');
      return;
    }

    const DATA = this.pdfContent.nativeElement;
    const imageUrl = this.api_base_url + '/' + 'uploads' + '/' + this.stpinfo?.memb_img;
    const docUrl = this.api_base_url + '/' + 'uploads' + '/' + this.stpinfo?.doc_img;
    // const depUrl = this.api_base_url + '/' + 'uploads' + '/' + this.spouseInfo?.dep_doc;
    // const docsUrl = this.api_base_url + '/' + 'uploads' + '/' + this.spouseInfo?.dep_img;
    console.log(imageUrl,docUrl,'po');
    
    html2canvas(DATA).then((canvas) => {
      const fileWidth = 210; 
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL(imageUrl,docUrl);
      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('PolicyDetails.pdf');
    });
  }
  

  paynow(){
    var memberName = this.stpinfo?.memb_name;
    var subscriptionAmount = this.tot_amt_value;
    var form_no = this.form_no; 
    var member_id = this.genInsData?.member_id;

    var custDt = { form_no: form_no, member_id: '', memb_name: memberName, amount: subscriptionAmount, phone_no: this.stpinfo?.phone, email: '',  calc_upto: '',
      subs_type: '', sub_fee: this.tot_amt_value, redirect_path: '/',  soc_flag: 'T',
      trn_id: '', approve_status: 'A', pay_flag: 'D' }

    const encDt = CryptoJS.AES.encrypt(JSON.stringify(custDt),this.secretKey ).toString();

    console.log(encDt,'amt');
    
    
    this.router.navigate(['/auth/payment_preview_page'], { 
      queryParams: { enc_dt: encDt }
    });
  }

}
