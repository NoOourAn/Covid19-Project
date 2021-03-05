import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service'

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private myClient:HttpClient,private helper:HelperService) { }
  private baseUrl:string = `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats`;
  ////////
  getCountriesStats(){
    const headers = this.helper.setHeaders()
    return this.myClient.get(this.baseUrl,headers)
  }

}
