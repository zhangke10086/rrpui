import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BoardArea} from '../../../core/entity/entity';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {DhbmjService} from '../service/dhbmj.service';
import {QuerylistService} from "../../../helpcenter/querylist/querylist.service";

@Component({
  selector: 'app-dhbmj',
  templateUrl: './dhbmj.component.html',
  styleUrls: ['./dhbmj.component.css']
})
export class DhbmjComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  begin: Date;
  // tslint:disable-next-line:variable-name
  end: Date;
  dateFormat = 'yyyy/MM/dd';
  benchAreas: BoardArea[];
  isCollapse = false;
  selectedCompany;
  CompanyData;
  selectedRobot;
  RobotData;
  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private querylistService: QuerylistService,
    private dhbmjService: DhbmjService
  ) {
  }

  ngOnInit() {
    this.getDhbmj();
    this.getCompany();
  }

  getDhbmj(): void {
    // tslint:disable-next-line:variable-name
    let date_begin = '2020-04-23';
    // tslint:disable-next-line:variable-name
    let date_end = '2020-04-30';
    if (this.begin !== undefined) {
      // tslint:disable-next-line:variable-name
      date_begin = this.datePipe.transform(this.begin, 'yyyy-MM-dd');
      // tslint:disable-next-line:variable-name
      date_end = this.datePipe.transform(this.end, 'yyyy-MM-dd');
    }

    if (this.selectedRobot !== undefined) {
      this.dhbmjService.getBoardAreas(date_begin, date_end, this.selectedRobot.id)
        .subscribe((res: any) => {
          this.benchAreas = res.data;
          const areaNum = [];
          const time = [];
          for (const benchArea of this.benchAreas) {
            areaNum.push(benchArea.area);
            // tslint:disable-next-line:variable-name
            const time_str = this.datePipe.transform(benchArea.time, 'yyyy年MM月dd日');
            time.push(time_str);
          }
          // @ts-ignore
          const highCharts = require('highCharts');
          // @ts-ignore
          require('highcharts/modules/exporting')(highCharts);
          // 创建图表
          highCharts.chart('container', {
            chart: {
              type: 'column'
            },
            title: {
              text: '叠合板面积'
            },
            subtitle: {
              text: '来源： 系统统计'
            },
            xAxis: {
              categories: time,
              crosshair: true
            },
            yAxis: {
              min: 0,
              title: {
                text: '叠合板面积（㎡）'
              }
            },
            tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} ㎡</b></td></tr>',
              footerFormat: '</table>',
              shared: true,
              useHTML: true
            },
            plotOptions: {
              column: {
                pointPadding: 0.2,
                borderWidth: 0
              }
            },
            time: {
              enabled: false
            },
            series: [{
              name: '叠合板面积',
              data: areaNum
            }]
          });
        });
    }

  }
  @Output() onQuery: EventEmitter<any> = new EventEmitter<any>();

  query() {
    const data = {
      company: '',
      robot: ''
    };
    data.company = this.selectedCompany;
    data.robot = this.selectedRobot;
    this.onQuery.emit(data);
  }

  getCompany() {
    this.querylistService.getCompany().then((res: any) => {
      this.CompanyData = res.data;
    });
  }

  getRobot(id) {
    this.querylistService.getRobot(id).then((res: any) => {
      this.RobotData = res.data;
    });
  }

  // 展开/关闭
  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;

  }

  CompanyChange(data) {
    this.selectedCompany = data;
    this.getRobot(data.id);
  }

  RobotChange(data) {
    this.selectedRobot = data;
  }

  reset() {
    this.selectedCompany = undefined;
    this.selectedRobot = undefined;
  }
}