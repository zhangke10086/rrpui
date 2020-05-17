import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {QuerylistService} from './querylist.service';
// @ts-ignore
import j from 'src/assets/json/city.json';
import { formatDate } from '@angular/common';
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
  @Input() dateVisible = false;
  @Input() robotVisible = true;
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
  startdate;
  enddate;
  ngOnInit() {
    this.company = JSON.parse(localStorage.getItem('userinfo')).company;
    // 非骊久
    if (this.company.id!=1){
      // 购买 或 租用 企业
      if(this.company.companyType.id === 3 || this.company.companyType.id === 4 ){
        this.getRobot(this.company.id);
      } else {
        //出租企业
        this.ProvinceData = j;
      }
    } else {
      // 骊久
      this.ProvinceData = j;
    }
    // this.getCompany();

  }
  query() {
    const data = {};
    data['province'] = this.selectedProvince;
    data['city'] = this.selectedCity;
    data['company'] = this.selectedCompany;
    data['robot'] = this.selectedRobot;
    if(this.startdate){
      data['startdate'] = formatDate(this.startdate.getTime(), 'yyyy-MM-dd', 'zh-Hans');
    }

    if(this.enddate) {
      data['enddate'] =  formatDate(this.enddate.getTime(), 'yyyy-MM-dd', 'zh-Hans');
    }
    this.onQuery.emit(data);
  }
  getCompany() {
    this.querylistService.getCompany().then((res:any) => {
      this.CompanyData = res.data;
    })
  }
  getRobot(id){

    //出租企业或制造企业
    if(this.company.companyType.id === 2|| this.company.companyType.id === 1) {
      if(this.company.id != 1){
        this.querylistService.getRobotByCompany(this.selectedCompany.id,this.company.id).then((res:any)=>{
          this.RobotData = res.data;
        })
      } else {
        this.querylistService.getRobotByCompanyid(this.selectedCompany.id).then((res:any)=>{
          this.RobotData = res.data;
        })
      }

    } else {
      //购买或租用企业 只能看自己企业下的机器人
      this.querylistService.getRobotByCompanyid(id).then((res:any) => {
        this.RobotData = res.data;
      })
    }

  }

  // 展开/关闭
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

    this.selectedRobot = data;
  }
  provinceChange(value: string): void {
    this.CityData = this.ProvinceData.find(t => t.name === value).children;
    if(this.CityData) {
      this.selectedCity = this.CityData[0].name;
      this.cityChange(this.selectedCity);
    }
  }
  cityChange(value: string){
    // 骊久
    if (this.company.id==1) {
      this.querylistService.getCompany().then((res: any) => {
        this.CompanyData = res.data.filter(t => t.city === value && t.province === this.selectedProvince);
        if (this.CompanyData.length === 0) {
          this.selectedCompany = undefined;
          this.CompanyChange(this.selectedCompany);
        }
      })
    } else {
      // 出租企业
      if(this.company.companyType.id === 2){
        this.querylistService.getCompanyByRobot(this.company.id).then((res:any)=>{
          this.CompanyData = res.data.filter(t => t.city === value && t.province === this.selectedProvince);
          if (this.CompanyData.length === 0) {
            this.selectedCompany = undefined;
            this.CompanyChange(this.selectedCompany);
          }
        })
      }
    }
  }
  reset(){
    this.selectedProvince = undefined;
    this.selectedCity = undefined;
    this.selectedCompany = undefined;
    this.selectedRobot = undefined;
    this.startdate = undefined;
    this.enddate =undefined;
  }
  // onStartChange(data){
  //   this.startdate
  // }
  // onEndChange(data){
  //
  // }
}
