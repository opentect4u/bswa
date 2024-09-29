import { Component, OnInit, Renderer2, ElementRef, ViewChild  } from '@angular/core';

@Component({
  selector: 'app-header_Home',
  templateUrl: './header_Home.component.html',
  styleUrls: ['./header_Home.component.css']
})
export class header_HomeComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  resMenuPan:any;

  @ViewChild('targetDiv') targetDiv!: ElementRef;

  ngOnInit() {

  

  }

  // openMenu(){
  //   this.resMenuPan = document.getElementsByClassName('sidebar');
  //   // alert(this.resMenuPan);
  //   this.resMenuPan.addClass('active');
  //   // document.body.classList.add('wait');
  //   document.getElementById('sidebar')!.classList.add('test');
  // }

  openMenu() {
    // Add class to the div with #targetDiv reference
    this.renderer.addClass(this.targetDiv.nativeElement, 'active');
  }

  closeMenu() {
    // Add class to the div with #targetDiv reference
    this.renderer.removeClass(this.targetDiv.nativeElement, 'active');
  }

}
