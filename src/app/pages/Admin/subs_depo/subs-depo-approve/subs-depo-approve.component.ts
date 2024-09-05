import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';

interface TrnsDtls {
  trn_dt: string;
  trn_id: string;
  sub_amt: string;
  form_no: string;
  approval_status: string;
}

@Component({
  selector: 'app-subs-depo-approve',
  templateUrl: './subs-depo-approve.component.html',
  styleUrls: ['./subs-depo-approve.component.css']
})
export class SubsDepoApproveComponent implements OnInit {
  responseData: any
  userData!: [TrnsDtls];
 

  constructor(private router: Router, private dataServe: DataService) { }

  ngOnInit() {
    this.getData ();
    
  }
  
  getData () {
    this.dataServe.global_service(1,'/get_tnx_details',null).subscribe(data => {
      console.log(data)
      this.responseData = data;
      this.userData = this.responseData.suc > 0 ? this.responseData.msg : [];
      // console.log(this.userData,'mistu');
  })
}

back(){
  this.router.navigate(['/admin/dashboard']);
}

view(trn_id:any, form_no:any){
  console.log(trn_id,'no');
  
  this.router.navigate(['/admin/subs_depo_appr_entry',encodeURIComponent(btoa(trn_id)),encodeURIComponent(btoa(form_no))])
}


// delete(trn_id:any, form_no:any){
//   console.log(trn_id,form_no,'ppppp');
  
//   Swal.fire({
//     title: 'Are you want to delete?',
//     text: "If Yes then click on Yes, delete it",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!',
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire({
//         title: 'Deleted!',
//         text: 'Transaction has been deleted successfully.',
//         icon: 'success',
//       });
//     }
//   });
// }


delete(trn_id: any, form_no: any, user = localStorage.getItem('user_name')) {
  console.log(trn_id, form_no, 'ppppp');
  Swal.fire({
    title: 'Are you sure you want to delete?',
    text: "If Yes, then click on Yes, delete it.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      
      this.dataServe.global_service(1, '/delete_unapprove_trn',{form_no, trn_id, user})
          .subscribe((data: any) => {
      // this.dataServe.global_service(1, `deleteTransaction/${trn_id}/${form_no}`).subscribe(
      //   (response) => {
          console.log('API response:', data);
          Swal.fire({
            title: 'Deleted!',
            text: 'Transaction has been deleted successfully.',
            icon: 'success',
          }).then(() => {
            // Refresh the page after deletion
            window.location.reload();
          });
        },
        (error) => {
          console.error('Error during API call:', error);
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue deleting the transaction.',
            icon: 'error',
          });
        }
      );
    }
  });
}


}
