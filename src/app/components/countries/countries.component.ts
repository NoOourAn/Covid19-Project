import { Component, Input, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';
import { Observable } from 'rxjs';
// import 'rxjs/add/observable/interval';
// import 'rxjs/add/operator/startWith';
// import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  subscriber
  res
  countries = []
  countriesCount
  constructor(private countriesService:CountriesService) { }

  // @Input() countries$: Observable<any>;

  ngOnInit(): void {
    this.countriesService.getCountriesStats()
    
    .subscribe((response)=>{
      this.res = response
      // this.countriesCount = this.res.data.covid19Stats.length
      for (const record of this.res.data.covid19Stats) {
        let obj = {
          countryName: record.country,
          cityName: record.city,
          provinceName: record.province,
          lastUpdate: record.lastUpdate,
          confirmed: record.confirmed,
          deaths: record.deaths,
          recovered: record.recovered,
        }
        this.countries.push(obj);
        console.log(record)
      }

    },(err)=>{
      console.error(err)
    })
    
    // this.countries$ = this.countriesService.getCountriesStats(
    //   userUpload
    // )
    // .pipe(map(value => value));
    
    
  }

}
