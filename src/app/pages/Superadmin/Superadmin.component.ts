import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/service/loader.service';


@Component({
  selector: 'app-Superadmin',
  templateUrl: './Superadmin.component.html',
  styleUrls: ['./Superadmin.component.css']
})
export class SuperadminComponent implements OnInit {
  public sidemenuOpen = true;
  public classSidemenu: any;
  public classContent: any;
  listneHeader($event: any) {
    this.sidemenuOpen = $event.sidemenuOpen;
    this.classSidemenu = $event.classSidemenu;
    this.classContent = $event.classContent;
  }

  constructor( public loader: LoaderService) {
    console.log(window.innerWidth);
    if (window.innerWidth <= 480) {
      this.sidemenuOpen = false;
      this.classSidemenu = 'sidemenu-close';
      this.classContent = 'content-full';
    } else {
      this.classSidemenu = 'sidemenu-open';
      this.classContent = 'content-normal';
    }
  }

  

  ngOnInit() {
    // this.spinner.showValue = false;
  }

}
