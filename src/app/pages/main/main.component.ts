import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public sidemenuOpen = true;
  public classSidemenu: any;
  public classContent: any;
  listneHeader($event:any){
    this.sidemenuOpen = $event.sidemenuOpen
    this.classSidemenu = $event.classSidemenu
    this.classContent = $event.classContent
  }
  constructor() {
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

  ngOnInit() {}
}
