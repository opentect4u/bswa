import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScriptLoaderService } from '../../service/Script-Loader.service';

@Component({
  selector: 'app-Home-Page',
  templateUrl: './Home-Page.component.html',
  styleUrls: ['./Home-Page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy{

  constructor(private scriptLoader: ScriptLoaderService) { }

  ngOnInit() {
    this.scriptLoader.loadStyle('https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css')
    this.scriptLoader.loadStyle('/assets/css/app.css')
    this.scriptLoader.loadScript('https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js')
    this.scriptLoader.loadScript('https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js')
    this.scriptLoader.loadLocalScript('/assets/js/main.js')
  }

  ngOnDestroy(): void {
    const script1 = document.querySelector(`script[src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"]`),
    script2 = document.querySelector(`script[src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"]`),
    script3 = document.querySelector(`script[src="/assets/js/main.js"]`),
    src = document.querySelector(`link[href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"]`);
    if (script1) script1.remove();
    if (script2) script2.remove();
    if (script3) script3.remove();
    if (src) src.remove();
  }

}
