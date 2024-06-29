import { APP_INITIALIZER } from '@angular/core';
import { ScriptLoaderService } from './Script-Loader.service'; // Adjust the import path

export function initializeApp(scriptLoader: ScriptLoaderService) {
    var scripts = ['https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js']
    var styles = ['https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css']
  return () => Promise.all([
    scripts.forEach((dt:any) => scriptLoader.loadScript(dt)),
    styles.forEach((dt:any) => scriptLoader.loadStyle(dt)),
    scriptLoader.loadLocalScript('/assets/js/main.js')
  ]);
    
}