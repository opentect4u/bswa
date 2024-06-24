import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Memb-home',
  templateUrl: './Memb-home.component.html',
  styleUrls: ['./Memb-home.component.css']
})
export class MembHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  nextPage(flag:any){
    switch (flag) {
      case 'G':
        this.router.navigate(['/home/gen_memb_form_register','G']);
        break;
        case 'L':
          this.router.navigate(['/home/life_memb_form_register','L']);
          break;
          case 'AI':
            this.router.navigate(['/home/associate_memb_form_register','AI']);
            break;
      default:
        break;
    }
  }

}
