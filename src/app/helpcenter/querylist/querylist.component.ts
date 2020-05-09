import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {QuerylistService} from "./querylist.service";

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
  RobotData;
  ngOnInit() {
    this.getCompany();
  }
  query() {
    const data ={
      company:'',
      robot:''
    };
    data.company = this.selectedCompany;
    data.robot = this.selectedRobot;
    this.onQuery.emit(data);
  }
  getCompany(){
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
    this.selectedCompany = data;
    this.getRobot(data.id);
  }
  RobotChange(data) {
    this.selectedRobot = data
  }
  reset(){
    this.selectedCompany = undefined;
    this.selectedRobot = undefined;
  }
}
