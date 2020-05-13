import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {QuerylistService} from './querylist.service';
// @ts-ignore
import j from 'src/assets/json/city.json';
@Component({
  selector: 'app-querylist',
  templateUrl: './querylist.component.html',
  styleUrls: ['./querylist.component.less']
})
export class QuerylistComponent implements OnInit {

  constructor(
    private querylistService: QuerylistService
  ) { }
  @Output() onQuery: EventEmitter<any> = new EventEmitter<any>();
  isCollapse = false;
  selectedCompany;
  CompanyData;
  selectedRobot;
  selectedProvince;
  selectedCity;
  RobotData;
  ProvinceData;
  CityData;
  company;
  ngOnInit() {
    this.company = JSON.parse(localStorage.getItem('userinfo')).company;
    if (this.company.id!=1){
      this.getRobot(this.company.id);

    } else {
      this.ProvinceData = j;
    }
    // this.getCompany();

  }
  query() {
    const data ={
      province:'',
      city:'',
      company:'',
      robot:''
    };
    data.province = this.selectedProvince;
    data.city = this.selectedCity;
    data.company = this.selectedCompany;
    data.robot = this.selectedRobot;
    this.onQuery.emit(data);
  }
  getCompany() {
    this.querylistService.getCompany().then((res:any) => {
      this.CompanyData = res.data;
    })
  }
  getRobot(id){
    this.querylistService.getRobot(id).then((res:any) => {
      this.RobotData = res.data;
    })
  }
  //展开/关闭
  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;

  }
  CompanyChange(data) {
    this.selectedRobot = undefined;
    this.selectedCompany = data;
    if(data != undefined){
      this.getRobot(data.id);
    }
  }
  RobotChange(data) {
    this.selectedRobot = data
  }
  provinceChange(value: string): void {
    this.CityData = this.ProvinceData.find(t => t.name === value).children;
    if(this.CityData) {
      this.selectedCity = this.CityData[0].name;
      this.cityChange(this.selectedCity);
    }
  }
  cityChange(value: string){
    this.querylistService.getCompany().then((res:any) => {
      this.CompanyData = res.data.filter(t=> t.city === value && t.province === this.selectedProvince);
      if(this.CompanyData.length === 0){
        this.selectedCompany =undefined;
        this.CompanyChange(this.selectedCompany);
      }
    })
  }
  reset(){
    this.selectedProvince = undefined;
    this.selectedCity = undefined;
    this.selectedCompany = undefined;
    this.selectedRobot = undefined;
  }
}
