import {Component, OnInit, TemplateRef} from '@angular/core';
// @ts-ignore
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {NzDropdownContextComponent, NzDropdownService, NzMessageService} from 'ng-zorro-antd';
import {PlatformLocation} from '@angular/common';
import {RouteReuse} from '../../core/routereuse/routeReuse';
import {filter, map, mergeMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../../core/service/url.service';
import {YhglService} from '../xtpz/service/yhgl.service';
import {stringify} from 'querystring';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})


export class IndexComponent implements OnInit {
  tabs: Array<any> = [];
  tabDropDown: NzDropdownContextComponent;
  menu: any ;
  menus = [];
  activemenus = [];
  isVisible = false;
  isCollapsed = false;
  showALL: boolean;
  tabIndex = 0;
  theme = 'dark';
  info = JSON.parse(localStorage.getItem('userinfo')).username;
  home = {
    url: '/index/welcome',
    title: '首页'
  };
  activeMenuname = '';
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private dropDownService: NzDropdownService,
              private location: PlatformLocation,
              private http: HttpClient,
              private posturl: UrlService,
              private yhglService: YhglService,
              private message: NzMessageService,
              private activateInfo: ActivatedRoute) {
    // 锁死浏览器后退事件,防止出现empty缓冲页面
    location.onPopState(() => {
      router.navigate(['/index/empty']).then(res => {
        router.navigate(['/index/welcome']);
      });
    });
    RouteReuse.deleteAll();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe((event) => {
      const url = this.router.url;
      if (['/', '/login', '/index', '/index/empty'].indexOf(url) < 0) {
        const existMenu = this.tabs.find(info => url.includes(info.url));
        if (!existMenu) {// 如果不存在那么添加，
          if (existMenu !== undefined) {
            this.tabs.push(existMenu);
          }
        }
        this.tabIndex = this.tabs.findIndex(p => url.includes(p.url));
      }
    });

    const userId = JSON.parse(localStorage.getItem('userinfo')).id;
    this.http.get(this.posturl.hostname + '/dynamicMenuService/getDynamicMenu?id=' + userId).subscribe((res: any) => {
      if (res.state === 200) {
        this.digoutMenu(res.data);
        // console.log(this.menus);
      } else {
        this.message.error('菜单加载失败');
      }
    });
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('/index?scsj=true')) {
          this.doSomething();
        }
      }
    })
  }
  // 拼明细节点菜单
  digoutMenu(data) {
    data.forEach(m => {
      const menu = {
        title: '',
        icon: 'book',
        url: '',
        children: []
      };
      if (m.hasOwnProperty('children') && m.children) {
        menu.title = m.menu.title;
        menu.url = m.menu.url;
        menu.children = m.children;
      }
      if (m.hasOwnProperty('children') && !m.children) {
        menu.title = m.menu.title;
        menu.url = m.menu.url;
        menu.children = null;
      }
      this.menus.push(menu);
    });
  }
  navigateTo(data: any) {
    if (data.url) {
      this.activeMenuname =  data.title;
      if (data === this.home && this.tabs.findIndex(p => data.url.includes(p.url))) {
        this.router.navigate([data.url]);
      }
      this.router.navigate(['/index/empty']).then(() => {
        this.router.navigate([data.url], { queryParams: { menuid: data.id } });
        });
    }
  }



  // 全屏切换
  fullScreen() {
    const element = document.documentElement;
    const requestMethod = element.requestFullscreen;
    if (requestMethod) {
      requestMethod.call(element);
      this.showALL = true;
    }
  }
  exitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      this.showALL = false;
    }
  }
  logout() {
    delete localStorage.userinfo;
    delete localStorage.Authority;
    this.router.navigate(['/login']);
  }
  showModal(): void {
    this.isVisible = true;
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  changePassword(newPassword1: any, newPassword2: any): void {
    if (newPassword1.value === newPassword2.value) {
      const userToChangePassword = JSON.parse(localStorage.getItem('userinfo'));
      userToChangePassword.password = newPassword1.value;
      console.log(userToChangePassword);
      this.yhglService.updateUser(userToChangePassword)
        .subscribe((res: any) => {
          if (res.state === 200) { this.message.success(res.msg); } else { this.message.error(res.msg); }
        });
    } else {
      alert('密码前后输入不一致！');
    }
    this.isVisible = false;
  }
  showSubMenu(item: any, index: any): void {
    // 设置当前子菜单显示
    // item.showSubMenu = true;
    if (item.children) {
      this.activemenus = item.children;
    }
}
  notShowSubMenu(item: any, index: any): void {
    // 设置当前子菜单不显示
    // item.showSubMenu = false;
  }
  doSomething() {
    this.activeMenuname =  this.menus[1].children[0].title;
    this.router.navigate(['/index/empty']).then(() => {
      this.router.navigate([this.menus[1].children[0].url], { queryParams: { menuid: this.menus[1].children[0].id , data: sessionStorage.getItem('mapquery')} });
    });
    this.activemenus = this.menus[1].children;
  }
}
