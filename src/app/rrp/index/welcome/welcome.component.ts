import { Component, OnInit, ViewChild } from '@angular/core';
import {MtcsService} from '../../scgl/service/mtcs.service';
import {
  BenchCount,
  BenchData,
  BenchRatio,
  BoardArea,
  BoardCount,
  ConcreteCount,
  Lease,
  ProductRatio,
  Robot,
  Sczt
} from '../../../core/entity/entity';
import {QuerylistComponent} from '../../../helpcenter/querylist/querylist.component';
import {BljqrglService} from '../../xtpz/service/bljqrgl.service';
import {Zlgl1Service} from '../../zlgl/service/zlgl1.service';
import {MtgsService} from '../../scsj/service/mtgs.service';
import {DhbslService} from '../../scsj/service/dhbsl.service';
import {DatePipe} from '@angular/common';
import {MtlylService} from '../../scsj/service/mtlyl.service';
import {HntflService} from '../../scsj/service/hntfl.service';
import {DhbmjService} from '../../scsj/service/dhbmj.service';
import {CphglService} from '../../scsj/service/cphgl.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {
  @ViewChild('querylist', {static: false }) querylist: QuerylistComponent;
  benchDatas: BenchData[];
  benchData: BenchData;
  robot: Robot;
  shengchanxian: string;
  lease: Lease;
  connector: string;
  benchCount: BenchCount;
  benchNum: number;
  benchPlanCount: number;
  boardCount: BoardCount;
  boardPlanCount: number;
  boardNum: number;
  concreteCount: ConcreteCount;
  conPlanCount: number;
  conCount: number;
  boardArea: BoardArea;
  area: number;
  planArea: number;
  sczt: Sczt;
  sczt1: string;
  mtjr: string;
  smsb: string;
  znbl: string;
  zdms: string;
  ntsc: string;
  dcxz: string;
  xczx: string;
  zdpt: string;
  znbl1: string;
  benchCounts: BenchCount[];
  benchRatios: BenchRatio[];
  productRatios: ProductRatio[];
  boardAreas: BoardArea[];
  concreteCounts: ConcreteCount[];
  jsondata = {
    province: '',
    city: '',
    companyid : '',
    owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
    companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
    robotid: ''
  };
  chartMtgsData = {
    robotid: '',
    startdate: '1000-04-23',
    enddate: '3000-04-23',
    province: '',
    city: '',
    companyid: '',
    owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
    companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
  };
  chartMtlylData = {
    robotid: '',
    startdate: '1000-04-23',
    enddate: '3000-04-23',
    province: '',
    city: '',
    companyid: '',
    owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
    companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
  };
  chartCphglData = {
    robotid: '',
    startdate: '1000-04-23',
    enddate: '3000-04-23',
    province: '',
    city: '',
    companyid: '',
    owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
    companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
  };
  chartDhbmjData = {
    robotid: '',
    startdate: '1000-04-23',
    enddate: '3000-04-23',
    province: '',
    city: '',
    companyid: '',
    owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
    companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
  };
  chartHntflData = {
    robotid: '',
    startdate: '1000-04-23',
    enddate: '3000-04-23',
    province: '',
    city: '',
    companyid: '',
    owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
    companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
  };
  chartDhbslData = {
    robotid: '',
    startdate: '1000-04-23',
    enddate: '3000-04-23',
    province: '',
    city: '',
    companyid: '',
    owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
    companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
  };
  constructor(
    private benchDataService: MtcsService,
    private bljqrglService: BljqrglService,
    private zlglService: Zlgl1Service,
    private mtgsService: MtgsService,
    private mtlylService: MtlylService,
    private hntflService: HntflService,
    private dhbslService: DhbslService,
    private dhbmjService: DhbmjService,
    private cphglService: CphglService,
    private datePipe: DatePipe,
               ) {
  }
  getRobot(id: number): void {
    this.bljqrglService.getRobot(id)
      .subscribe((res: any) => {
        this.robot = res.data;
        this.shengchanxian = res.data.shengchanxian;
      });
  }
  getLease(id: number): void {
    this.zlglService.getLeaseByRobotId(id)
      .subscribe((res: any) => {
        this.lease = res.data;
        this.connector = res.data.connector;
      });
  }
  getBenchNum(id: number): void {
    this.mtgsService.getCountByRobotId(id)
      .subscribe((res: any) => {
        this.benchCount = res.data;
        this.benchNum = res.data.count;
        this.benchPlanCount = res.data.plan_count;
      });
  }
  getBoardNum(id: number): void {
    this.dhbslService.getCountByRobotId(id)
      .subscribe((res: any) => {
        this.boardCount = res.data;
        this.boardNum = res.data.count;
        this.boardPlanCount = res.data.plan_count;
      });
  }
  getConcreteCount(id: number): void {
    this.dhbslService.getConcreteCountByRobotId(id)
      .subscribe((res: any) => {
        this.concreteCount = res.data;
        this.conCount = res.data.count;
        this.conPlanCount = res.data.plan_count;
      });
  }
  getBoardArea(id: number): void {
    this.dhbslService.getBoardAreaByRobotId(id)
      .subscribe((res: any) => {
        this.boardArea = res.data;
        this.area = res.data.area;
        this.planArea = res.data.plan_area;
      });
  }
  getSczt(id: number): void {
    this.dhbslService.getScztByRobotId(id)
      .subscribe((res: any) => {
        this.sczt = res.data;
        this.mtjr = res.data.mtjr;
        this.smsb = res.data.smsb;
        this.znbl = res.data.znbl;
        this.zdms = res.data.zdms;
        this.ntsc = res.data.ntsc;
        this.dcxz = res.data.dcxz;
        this.xczx = res.data.xcxz;
        this.zdpt = res.data.zdpt;
        this.znbl1 = res.data.znbl1;
        if (this.dcxz === '正常' && this.xczx === '正常' && this.zdpt === '正常' && this.znbl1 === '正常') {
          this.sczt1 = '正常';
        } else {
          this.sczt1 = '异常';
        }
      });
  }
  ngOnInit() {
    this.chartMtgsQuery();
    this.chartMtlylQuery();
    this.chartCphglQuery();
    this.chartDhbmjQuery();
    this.chartHntflQuery();
    this.chartDhbslQuery();
    const query = JSON.parse(localStorage.getItem('query'));
    if (query.province) {
      this.onquery(query);
    } else {
      this.onquery(this.jsondata);
    }
  }
  onquery(data) {
    // 保留上次查询
    if (this.jsondata === data) {
      this.benchDataService.query(this.jsondata).then((res: any) => {
        if (res.state === 200) {
          this.benchDatas = res.data;
        }
      });
    } else {
      // 初始化 传参jsondata
      this.jsondata = {
        province: '',
        city: '',
        companyid: '',
        owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
        companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
        robotid: ''
      };
      // 传参赋值
      // 若不选条件 则向后端传空值
      if (data.province) {
        this.jsondata.province = data.province;
      }
      if (data.city) {
        this.jsondata.city = data.city;
      }
      if (data.robot) {
        this.jsondata.robotid = data.robot.id;
        this.getRobot(data.robot.id);
        this.getLease(data.robot.id);
        this.getBenchNum(data.robot.id);
        this.getBoardNum(data.robot.id);
        this.getConcreteCount(data.robot.id);
        this.getSczt(data.robot.id);
        this.getBoardArea(data.robot.id);
      }
      if (data.company) {
        this.jsondata.companyid = data.company.id;
      }
      this.benchDataService.query(this.jsondata).then((res: any) => {
        if (res.state === 200) {
          this.benchDatas = res.data;
          localStorage.setItem('query', JSON.stringify({
            province: data.province ? data.province : undefined,
            city: data.city ? data.city : undefined,
            company: data.company ? data.company : undefined,
            robot: data.robot ? data.robot : undefined
          }));
        }
      });
    }
  }
  chartMtgsQuery() {
    // 初始化 传参chartMtgsData
    this.chartMtgsData = {
      robotid: '',
      startdate: '1000-04-23',
      enddate: '3000-04-23',
      province: '',
      city: '',
      companyid: '',
      owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
      companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
    };

    console.log(this.chartMtgsData);

    this.mtgsService.query(this.chartMtgsData)
      .then((res: any) => {
        console.log(res.data);
        this.benchCounts = res.data;
        const countNum = [];
        const time = [];

        for (const benchCount of this.benchCounts) {
          countNum.push(benchCount.count);
          // tslint:disable-next-line:variable-name
          const time_str = this.datePipe.transform(benchCount.time, 'M.d');
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
        highCharts.chart('chart1', {
          chart: {
            type: 'column',
            hreshold : null,
            backgroundColor: '#1e2340',
            plotShadow: true,
          },
          legend:
            {
              layout: 'vertical',
              align: 'center',
              verticalAlign: 'top',
              x: -80,
              y: -100,
              enabled: false
            },
          title: {
            text: '模台个数',
            style: {
              color: '#b1b1b1',
              fontSize: '11px'
            },
          },
          exporting: {
              enabled: false,  //设置导出bai按钮不可用
          },
          xAxis: {
            categories: time,
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: null,
              style: {
                color: '#b1b1b1'
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
              colorByPoint: true
            }
          },
          time: {
            enabled: false
          },
          series: [{
            name: '模台个数',
            data: countNum
          }]
        });
      });
  }

  chartMtlylQuery() {
    // 初始化 传参chartMtlylData
    this.chartMtlylData = {
      robotid: '',
      startdate: '1000-04-23',
      enddate: '3000-04-23',
      province: '',
      city: '',
      companyid: '',
      owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
      companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
    };

    this.mtlylService.query(this.chartMtlylData)
      .then((res: any) => {
        this.benchRatios = res.data;
        const ratioNum = [];
        const time = [];
        for (const benchRatio of this.benchRatios) {
          ratioNum.push(benchRatio.ratio);
          // tslint:disable-next-line:variable-name
          const time_str = this.datePipe.transform(benchRatio.time, 'M.d');
          time.push(time_str);
        }
        // @ts-ignore
        const highCharts = require('highCharts');
        // @ts-ignore
        require('highcharts/modules/exporting')(highCharts);
        // 创建图表
        highCharts.chart('chart2', {
          chart: {
            type: 'line',
            backgroundColor: '#1e2340',
            plotShadow: true,
            style: {
              shadow: true,
              color: '#b1b1bb1'
            },
          },
          title: {
            text:  '平均模台利用率',
            style: {
              color: '#b1b1b1',
              fontSize: '11px'
            },
          },
          legend:
            {
              layout: 'vertical',
              align: 'center',
              verticalAlign: 'top',
              x: -80,
              y: -100,
              enabled: false
            },
          xAxis: {
            categories: time,
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: null,
              style: {
                color: '#b1b1b1'
              },
            }
          },
          exporting: {
            enabled: false,  //设置导出bai按钮不可用
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
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
            name: '模台利用率',
            data: ratioNum
          }]
        });
      });
  }

  chartHntflQuery() {

    this.chartHntflData = {
      robotid: '',
      startdate: '1000-04-23',
      enddate: '3000-04-23',
      province: '',
      city: '',
      companyid: '',
      owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
      companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
    };


    this.hntflService.query(this.chartHntflData)
      .then((res: any) => {
        this.concreteCounts = res.data;
        const countNum = [];
        const time = [];
        for (const concreteCount of this.concreteCounts) {
          countNum.push(concreteCount.count);
          // tslint:disable-next-line:variable-name
          const time_str = this.datePipe.transform(concreteCount.time, 'M.d');
          time.push(time_str);
        }
        // @ts-ignore
        const highCharts = require('highCharts');
        // @ts-ignore
        require('highcharts/modules/exporting')(highCharts);
        // 创建图表
        const colors = ['#e0a23b', '#90BF18', '#F59656' ];
        // const colors = ['#2c2830', '#604c33', '#e0a23b'];
        highCharts.getOptions().colors = highCharts.map(colors, function(color) {
          return {
            radialGradient: { cx: 0, cy: -0.5, r: 2.5 },
            stops: [[0, color], [1, highCharts.Color(color).brighten(-60).get('rgb')]]
          };
        });
        highCharts.chart('chart5', {
          chart: {
            type: 'areaspline',
            hreshold : null,
            backgroundColor: '#1e2340',
            plotShadow: true,
          },
          title: {
            text: '总混凝土方量',
            style: {
              color: '#b1b1b1',
              fontSize: '11px'
            },
          },
          xAxis: {
            categories: time,
            crosshair: true
          },
          legend:
            {
              layout: 'vertical',
              align: 'center',
              verticalAlign: 'top',
              x: -80,
              y: -100,
              enabled: false
            },
          yAxis: {
            min: 0,
            title: {
              text: null,
              style: {
                color: '#b1b1b1'
              },
            }
          },
          exporting: {
            enabled: false,  //设置导出bai按钮不可用
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
              colorByPoint: true
            }
          },
          time: {
            enabled: false
          },
          series: [{
            name: '混凝土方量',
            data: countNum
          }]
        });
      });
  }

  chartDhbslQuery() {
    // 初始化 传参chartDhbslData
    this.chartDhbslData = {
      robotid: '',
      startdate: '1000-04-23',
      enddate: '3000-04-23',
      province: '',
      city: '',
      companyid: '',
      owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
      companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
    };


    this.dhbslService.query(this.chartDhbslData)
      .then((res: any) => {
        this.benchCounts = res.data;
        const countNum = [];
        const time = [];
        for (const benchCount of this.benchCounts) {
          countNum.push(benchCount.count);
          // tslint:disable-next-line:variable-name
          const time_str = this.datePipe.transform(benchCount.time, 'M.d');
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
        highCharts.chart('chart6', {
          chart: {
            type: 'column',
            backgroundColor: '#1e2340',
            plotShadow: true,
          },
          title: {
            text:  '叠合板总数量' ,
            style: {
              color: '#b1b1b1',
              fontSize: '11px'
            },
          },
          xAxis: {
            categories: time,
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: null,
              style: {
                color: '#b1b1b1'
              },
            },
          },
          exporting: {
            enabled: false,  //设置导出bai按钮不可用
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} 块</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          legend:
            {
              layout: 'vertical',
              align: 'center',
              verticalAlign: 'top',
              x: -80,
              y: -100,
              enabled: false
            },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0,
              shadow: true,
              colorByPoint: true
            }
          },
          time: {
            enabled: false
          },
          series: [{
            name: '叠合板数量',
            data: countNum
          }]
        });
      });
  }

  chartDhbmjQuery() {

    // 初始化 传参chartDhbmjData
    this.chartDhbmjData = {
      robotid: '',
      startdate: '1000-04-23',
      enddate: '3000-04-23',
      province: '',
      city: '',
      companyid: '',
      owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
      companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
    };


    this.dhbmjService.query(this.chartDhbmjData)
      .then((res: any) => {
        this.boardAreas = res.data;
        const areaNum = [];
        const time = [];
        for (const benchArea of this.boardAreas) {
          areaNum.push(benchArea.area);
          // tslint:disable-next-line:variable-name
          const time_str = this.datePipe.transform(benchArea.time, 'M.d');
          time.push(time_str);
        }
        // @ts-ignore
        const highCharts = require('highCharts');
        // @ts-ignore
        require('highcharts/modules/exporting')(highCharts);
        // 创建图表
        highCharts.setOptions({
          colors: ['#5d93ff', '#5381df', '#486dbe', '#425fa6', '#38508c', '#334a80', '#2e4274'],
        });
        highCharts.chart('chart4', {
          chart: {
            type: 'column',
            backgroundColor: '#1e2340',
            plotShadow: true,
          },
          title: {
            text: '叠合板总面积',
            style: {
              color: '#b1b1b1',
              fontSize: '11px'
            },
          },
          xAxis: {
            categories: time,
            crosshair: true
          },
          legend:
            {
              layout: 'vertical',
              align: 'center',
              verticalAlign: 'top',
              x: -80,
              y: -100,
              enabled: false
            },
          yAxis: {
            min: 0,
            title: {
              text: null,
              style: {
                color: '#b1b1b1'
              },
            },
          },
          exporting: {
            enabled: false,  //设置导出bai按钮不可用
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
              borderWidth: 0,
              shadow: true,
              colorByPoint: true
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

  chartCphglQuery() {
    this.chartCphglData = {
      robotid: '',
      startdate: '1000-04-23',
      enddate: '3000-04-23',
      province: '',
      city: '',
      companyid: '',
      owncompanyid: JSON.parse(localStorage.getItem('userinfo')).company.id,
      companytypeid: JSON.parse(localStorage.getItem('userinfo')).company.companyType.id,
    };

    console.log(this.chartCphglData);

    this.cphglService.query(this.chartCphglData)
      .then((res: any) => {
        this.productRatios = res.data;
        console.log(this.productRatios);
        const ratioNum = [];
        const time = [];
        for (const productRatio of this.productRatios) {
          ratioNum.push(productRatio.ratio);
          // tslint:disable-next-line:variable-name
          const time_str = this.datePipe.transform(productRatio.time, 'M.d');
          time.push(time_str);
        }
        // @ts-ignore
        const highCharts = require('highCharts');
        // @ts-ignore
        require('highcharts/modules/exporting')(highCharts);
        // 创建图表
        highCharts.chart('chart3', {
          chart: {
            type: 'line',
            backgroundColor: '#1e2340',
            plotShadow: true,
          },
          title: {
            text: '平均产品合格率',
            style: {
              color: '#b1b1b1',
              fontSize: '11px'
            },
          },
          legend:
            {
              layout: 'vertical',
              align: 'center',
              verticalAlign: 'top',
              x: -80,
              y: -100,
              enabled: false
            },
          xAxis: {
            categories: time,
            crosshair: true,
          },
          yAxis: {
            min: 0,
            title: {
              text: null,
              style: {
                color: '#b1b1b1'
              },
            },
          },
          exporting: {
            enabled: false,  //设置导出bai按钮不可用
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
            style: {
              shadow: true,
            },
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
            name: '产品合格率',
            data: ratioNum
          }]
        });
      });
  }

  getDateStr(AddDayCount): string {
    const dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
    const y = dd.getFullYear();
    const m = (dd.getMonth() + 1 ) < 10 ? '0' + (dd.getMonth() + 1 ) : (dd.getMonth() + 1 ); // 获取当前月份的日期，不足10补0
    const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
    return y + '-' + m + '-' + d;
  }

}
