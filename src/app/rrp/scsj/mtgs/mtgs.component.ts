import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MtgsService} from '../service/mtgs.service';
import {BenchCount} from '../../../core/entity/entity';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {QuerylistService} from '../../../helpcenter/querylist/querylist.service';

@Component({
  selector: 'app-mtgs',
  templateUrl: './mtgs.component.html',
  styleUrls: ['./mtgs.component.css']
})
export class MtgsComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  begin: Date;
  // tslint:disable-next-line:variable-name
  end: Date;
  dateFormat = 'yyyy/MM/dd';
  benchCounts: BenchCount[];
  isCollapse = false;
  selectedCompany;
  CompanyData;
  selectedRobot;
  RobotData;
  jsondata = {
    robotid: '',
    startdate: '',
    enddate: '',
    province: '',
    city: '',
    companyid: '',
    owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
    companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
  };
  selectedProvince;
  selectedCity;
  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private querylistService: QuerylistService,
    private mtgsService: MtgsService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    // const data = JSON.parse(this.route.snapshot.queryParams.data);
    // if(data) {
    //   this.selectedProvince = data.province;
    //   this.selectedCity = data.city;
    //   this.jsondata.province = data.province;
    //   this.jsondata.city = data.city;
    // }
    if(this.route.snapshot.queryParams.data) {
      const data = JSON.parse(this.route.snapshot.queryParams.data);
      this.selectedProvince = data.province;
      this.selectedCity = data.city;
      this.jsondata.province = data.province;
      this.jsondata.city = data.city;
    }
    this.onquery(this.jsondata);
  }
  onquery(data) {
    // data为查询组件所选值
    console.log(data);
    // 初始化 传参jsondata
    this.jsondata = {
      robotid: '',
      startdate: '1000-04-23',
      enddate: '3000-04-23',
      province: '',
      city: '',
      companyid: '',
      owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
      companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
    };
    // 传参赋值
    // 若不选条件 则向后端传空值
    if (data.province && data.province.name) {
      this.jsondata.province = data.province.name;
    }
    if (data.city && data.city.name) {
      this.jsondata.city = data.city.name;
    }
    if (data.company) {
      this.jsondata.companyid = data.company.id;
    }
    if (data.enddate) {
      this.jsondata.enddate = data.enddate;
    }
    if (data.startdate) {
      this.jsondata.startdate = data.startdate;
    }
    if (data.robot) {
      this.jsondata.robotid = data.robot.id;
    }

    console.log(this.jsondata);

    this.mtgsService.query(this.jsondata)
      .then((res: any) => {
        this.benchCounts = res.data;
        const countNum = [];
        const time = [];
        for (const benchCount of this.benchCounts) {
          countNum.push(benchCount.count);
          // tslint:disable-next-line:variable-name
          const time_str = this.datePipe.transform(benchCount.time, 'yy.M.d');
          time.push(time_str);
        }
        // @ts-ignore
        const highCharts = require('highCharts');
        // @ts-ignore
        require('highcharts/modules/exporting')(highCharts);
        // 创建图表
        highCharts.setOptions({
          colors: ['#5d93ff', '#5381df', '#486dbe', '#425fa6' , '#38508c', '#334a80', '#2e4274'],
        });
        highCharts.chart('container', {
          chart: {
            type: 'column',
            hreshold : null,
            backgroundColor: '#1e2340',
            plotShadow: true,
          },
          title: {
            text: '模台总数',
            style: {
              color: '#b1b1b1',
            },
          },
          xAxis: {
            categories: time,
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: '模台个数(个)',
              style: {
                color: '#b1b1b1',
              },
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} 个</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0,
              shadow: true,
              colorByPoint: true,
          }
          },
          legend:
            {
              layout: 'vertical',
              align: 'center',
              verticalAlign: 'top',
              x: -80,
              y: -100,
            },
          time: {
            enabled: false
          },
          series: [{
            name: '模台个数',
            data: countNum,
          }]
        });
      });
  }
}
