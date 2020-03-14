import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productionmanage',
  templateUrl: './productionmanage.component.html',
  styleUrls: ['./productionmanage.component.css']
})
export class ProductionmanageComponent implements OnInit {
  datalist = [1,2,3,4,5,4,6,3,5,2,14,3,5,3,6,3,5,3,6,3,5];
  constructor() { }
  ngOnInit() {
  }

}
