import { Component, OnInit } from '@angular/core';
import {SpglService} from "../service/spgl.service";

@Component({
  selector: 'app-spgl',
  templateUrl: './spgl.component.html',
  styleUrls: ['./spgl.component.css']
})
export class SpglComponent implements OnInit {

  constructor(private spglService:SpglService) { }
  approvals;
  jsondata ={
    robotid:''
  }
  ngOnInit() {
    this.onquery(this.jsondata);
  }
  onquery(data){
    this.query(data);
  }
  query(data){
    if (data ===this.jsondata){
        this.spglService.query(this.jsondata).then((res:any)=>{
          if(res.state===200){
            this.approvals = res.data;
          }
        })
    } else {
      if(data !=undefined){
        if (data.robot){
          this.jsondata.robotid=data.robot.id;
        }
        this.spglService.query(this.jsondata).then((res:any)=>{
          if(res.state===200){
            this.approvals = res.data;
          }
        })
      }
    }
  }
}
