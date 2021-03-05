import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  setHeaders(){
    const headers = {
      headers: new HttpHeaders()
        // .set('Authorization', localStorage.getItem("token"))
        .set('x-rapidapi-key','2c82f1ba4cmshda538d4e035a634p1d5012jsnc6f8489bb29d')
        .set('x-rapidapi-host','covid-19-coronavirus-statistics.p.rapidapi.com')
    }
    return headers;
  }
}
