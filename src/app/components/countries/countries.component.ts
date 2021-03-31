import { Component, Input, OnInit , ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit,AfterViewInit {

  subscriber
  res
  constructor(
    private countriesService:CountriesService,
    private cdRef: ChangeDetectorRef,
    public auth:AuthService
  ) { }

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  countries: any = [];
  previous: any = [];
  headElements: any = [];
  searchText: string = '';

  @HostListener('input') oninput() {
    this.searchItems();
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
        this.mdbTable.setDataSource(this.previous);
        this.countries = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
        this.countries = this.mdbTable.searchLocalDataBy(this.searchText);
        this.mdbTable.setDataSource(prev);
    }
}

  ngAfterViewInit(): void {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }


  ngOnInit(): void {
    // if(this.auth.isLoggedIn){
      this.headElements = ['Country Name', 'City/Province Name', 'Last updated', 'Confirmed', 'Deaths', 'Recovered', 'Favourites'];
    // }else{
    //   this.headElements = ['Country Name', 'City/Province Name', 'Last updated', 'Confirmed', 'Deaths', 'Recovered'];
    // }
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
      }

      this.mdbTable.setDataSource(this.countries);
      this.countries = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();

    },(err)=>{
      console.error(err)
    }) 
  }

}
