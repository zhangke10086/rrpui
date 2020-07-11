import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as echarts from 'echarts';
import 'echarts/map/js/province/shandong.js';
import 'echarts/map/js/china.js';
@Component({
  selector: 'app-chinamap',
  templateUrl: './chinamap.component.html',
  styleUrls: ['./chinamap.component.css']
})
export class ChinamapComponent implements OnInit {

  @ViewChild('map', {static: false}) chartMap: ElementRef;
  constructor(private http: HttpClient) { }
  regionOptions;
  chinaOptions;
  data = [
    {province: '山东', name: '济南', percent: '100', num: '120' },
    {province: '山东', name: '淄博', percent: '90', num: '110' },
    {province: '山东', name: '潍坊', percent: '80', num: '90' },
    {province: '山东', name: '威海', percent: '80', num: '90' },
    {province: '山东', name: '青岛', percent: '90', num: '110' },
    {province: '山东', name: '烟台', percent: '100', num: '120' },
    {province: '山东', name: '临沂', percent: '40', num: '40' },
    {province: '四川', name: '广元', percent: '90', num: '110' },
    {province: '江苏', name: '南京', percent: '70', num: '90' },
    {province: '河南', name: '郑州', percent: '90', num: '110' },
    {province: '江苏', name: '徐州', percent: '70', num: '90' },

  ];


  header; //测试
  footer = '生产数据汇总图表';
  ngOnInit() {
    this.header = '各省地图|布料机器人分布';
    this.chinaOptions = {
          tooltip: {
            trigger: 'item',
            formatter: '{b}：{c}'
          },
          visualMap: {
            min: 0,
            max: 80,
            realtime: false,
            inRange: {
              color: ['#44608b', '#e66b00']
            }
          },
          series: [
            {
              type: 'map',
              mapType: 'china',  //  与注册时的名字保持统一   echarts.registerMap('China', geoJson);
              aspectScale: 0.75, //长宽比
              map: 'china',
              geoIndex: 1,
              showLegendSymbol: false, // 存在legend时显示
              itemStyle: {
                normal: {
                  areaColor: '#44608b',
                  borderColor: '#9ffcff',
                  shadowColor: 'rgba(0,54,180, 0.9)',
                  shadowBlur: 50,
                  label: { show: true, color: 'white' }
                },
                emphasis: {
                  areaColor: '#A5DABB'
                }
              },
              zoom: 1.1,
              data: [
                { name: '北京', value: 42 },
                { name: '天津', value: 0 },
                { name: '重庆', value: 0 },
                { name: '上海', value: 19 },
                { name: '湖南', value: 0 },
                { name: '广东', value: 0 },
                { name: '福建', value: 0 },
                { name: '江西', value: 0 },
                { name: '四川', value: 28 },
                { name: '广西', value: 0 },
                { name: '新疆', value: 0 },
                { name: '西藏', value: 0 },
                { name: '青海', value: 0 },
                { name: '甘肃', value: 10 },
                { name: '宁夏', value: 0 },
                { name: '内蒙古', value: 0 },
                { name: '海南', value: 0 },
                { name: '山西', value: 0 },
                { name: '陕西', value: 0 },
                { name: '云南', value: 0 },
                { name: '贵州', value: 0 },
                { name: '湖北', value: 0 },
                { name: '浙江', value: 0 },
                { name: '安徽', value: 0 },
                { name: '河南', value: 0 },
                { name: '山东', value: 50 },
                { name: '江苏', value: 12 },
                { name: '河北', value: 0 },
                { name: '辽宁', value: 0 },
                { name: '吉林', value: 0 },
                { name: '黑龙江', value: 0 },
                { name: '南海诸岛', value: 0 },
                { name: '台湾', value: 0 }]
            }
          ]
        };
    this.regionOptions = this.chinaOptions;
    const echart = echarts.init(document.getElementById('map')); // 获取视图的echarts的DOM节点，并初始化对象
    echart.on('click', function(obj) { // 绑定地图点击事件
        if (obj.data) {
          if (obj.data.name === '山东') {
            this.regionOptions = {
              tooltip: {
                trigger: 'item',
                formatter: '{b}:{c}'
              },
              visualMap: {
                min: 0,
                max: 20,
                realtime: false,
                inRange: {
                  color: ['#44608b', '#44608b', '#0d98bb', '#e69805']
                }
              },
              series: [
                {
                  type: 'map',
                  mapType: obj.name,  //  与注册时的名字保持统一   echarts.registerMap('China', geoJson);
                  aspectScale: 0.75, //长宽比
                  itemStyle: {
                    normal: {
                      areaColor: '#44608b',
                      borderColor: 'white',
                      label: { show: true, color: 'white' }
                    },
                    emphasis: {
                      areaColor: '#A5DABB'
                    }
                  },
                  zoom: 1.1,
                  data: [
                    { name: '济南市', value: 13 },
                    { name: '淄博市', value: 2 },
                    { name: '威海市', value: 1 },
                    { name: '烟台市', value: 5 },
                    { name: '青岛市', value: 11 },
                    { name: '潍坊市', value: 3 },
                    { name: '日照市', value: 8 },
                    { name: '临沂市', value: 1 },
                    { name: '枣庄市', value: 0 },
                    { name: '济宁市', value: 7 },
                    { name: '菏泽市', value: 2 },
                    { name: '聊城市', value: 1 },
                    { name: '德州市', value: 3 },
                    { name: '泰安市', value: 6 },
                    { name: '莱芜市', value: 0 },
                    { name: '东营市', value: 0 },
                    { name: '滨州市', value: 5 }]
                }
              ]
            };
            this.header = '山东省|布料机器人分布';
            this.data = this.data.filter(t => t.province === '山东');
          }

        }
      }.bind(this));
  }
  returnchina () {
    this.regionOptions = this.chinaOptions;
  }

}
