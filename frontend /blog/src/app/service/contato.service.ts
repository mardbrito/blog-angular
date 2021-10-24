import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private http: HttpClient) {}

  httpGet(url: any) {
    return this.http.get(url);
  }

  httpPost(url: any, {}) {
    return this.http.post(url, { name: "Subrat" });
  }

  sendEmail(url: any, data: any) {
    return this.http.post(url, data);
  }
}
