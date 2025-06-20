import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public sidemenuOpen = true;
  public classSidemenu: any;
  public classContent: any;
  flag: string = ''; 

  // listneHeader($event:any){
  //   this.sidemenuOpen = $event.sidemenuOpen
  //   this.classSidemenu = $event.classSidemenu
  //   this.classContent = $event.classContent
  // }

  constructor(private route: ActivatedRoute) {

    console.log(window.innerWidth);
    // if (window.innerWidth <= 480) {
    //   this.sidemenuOpen = false;
    //   this.classSidemenu = 'sidemenu-close';
    //   this.classContent = 'content-full';
    // } else {
    //   this.classSidemenu = 'sidemenu-open';
    //   this.classContent = 'content-normal';
    // }
  }

  ngOnInit() {
       const storedFlag = localStorage.getItem('flag');
    this.flag = storedFlag ? storedFlag : '';
    // console.log(this.flag,'flag');
      this.sidemenuOpen = true;
      this.classSidemenu = 'sidemenu-open';
      this.classContent = 'content-normal';
  }

    listneHeader($event: any) {
    this.sidemenuOpen = $event.sidemenuOpen;
    this.classSidemenu = $event.classSidemenu;
    this.classContent = $event.classContent;
  }
}
