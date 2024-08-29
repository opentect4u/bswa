import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SecrectDataService {
  private varName = 'Secret';

private secretKey = 'B#O!*K8A0R3O97!2&0#2$4S9T4E3E$L7g8i2';


constructor() { }

private encrypt(text: string): string {
  console.log(text, 'texttexttext');
    const encrypted = CryptoJS.AES.encrypt(text, this.secretKey).toString();
    return encrypted;
  }

private decrypt(text: string): string {
  console.log(text, 'decrypt');
    const decrypted = CryptoJS.AES.decrypt(text, this.secretKey).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }  


  setLocalSecrectData(obj:any){

  
  
    const localData = {
       data:obj,
       timeStamp:new Date().getTime()
    }
   
   
   console.log(this.getLocalSecrectData().data, 'objjjjjjjjjj');
   
   const encryptedText = this.encrypt(JSON.stringify(localData));
   
   window.localStorage.setItem(this.varName,encryptedText);
    
   }
   
   getLocalSecrectData(){
       const rawText =  window.localStorage.getItem(this.varName);
       
       
       if(rawText){
         const decryptedText = this.decrypt(rawText);
         return JSON.parse(decryptedText);
       }
       
       return {};
   }  

}
