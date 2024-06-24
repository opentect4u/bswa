import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  local_service(url: any) {
    return this.http.get(url);
  }

  global_service(flag: any, api_path: any, data: any) {
    var token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders();
    if (token != '') {
      headers = headers.set('authorization', token);
    }

    // FLAG : 1 -> POST || 0 -> GET
    if (flag > 0) {
      // EX: data = {id: this.id, dt: this.dt};
      return this.http.post(environment.api_url + api_path, data, {
        headers: headers,
      });
    } else {
      // EX: data = 'id=' + this.id + '&dt=' + this.dt
      var api_dt = data ? '?' + data : '';
      return this.http.get(environment.api_url + api_path + api_dt, {
        headers: headers,
      });
    }
  }
}
