import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {

  private scripts: { [key: string]: boolean } = {};
  private styles: { [key: string]: boolean } = {};

  constructor() { }

  loadScript(src: string): Promise<void> {
    if (this.scripts[src]) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        this.scripts[src] = true;
        resolve();
      };
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }

  loadStyle(href: string): Promise<void> {
    if (this.styles[href]) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => {
        this.styles[href] = true;
        resolve();
      };
      link.onerror = () => reject();
      document.head.appendChild(link);
    });
  }

  loadLocalScript(path: string): Promise<void> {
    if (this.scripts[path]) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = path;
      script.onload = () => {
        this.scripts[path] = true;
        resolve();
      };
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }

}
