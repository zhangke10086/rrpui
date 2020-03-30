import {Component, OnInit, TemplateRef} from '@angular/core';
// @ts-ignore
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {NzDropdownContextComponent, NzDropdownService, NzMessageService} from 'ng-zorro-antd';
import {PlatformLocation} from '@angular/common';
import {RouteReuse} from '../../core/routereuse/routeReuse';
import {filter, map, mergeMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../../core/service/url.service';

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
  isCollapsed = false;
  showALL: boolean;
  tabIndex = 0;
  theme = 'dark';
  headerBg = '#141a1e';
  TabBarStyle = {
    color: '#4e4e4e',
    blackground: '#4e4e4e'
  };
  home = {
    url: '/index/welcome',
    title: '首页'
  };
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private dropDownService: NzDropdownService,
              private location: PlatformLocation,
              private http: HttpClient,
              private posturl: UrlService,
              private message: NzMessageService) {
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
        console.log(this.menus);
      } else {
        this.message.error('菜单加载失败');
      }
    });
  }

  ngOnInit() {
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
    if (data === this.home && this.tabs.findIndex(p => data.url.includes(p.url))) {
      this.router.navigate([data.url]);
    }
    if (this.tabs.includes(data)) {
      this.router.navigate(['/index/empty']).then(() => {
        this.router.navigate([data.url]);
      }); } else {
      this.tabs.push(data);
      this.router.navigate(['/index/empty']).then(res => {
        this.router.navigate([data.url]); });
    }
    this.tabIndex = this.tabs.findIndex(p => data.url.includes(p.url));
  }

  // tab选中联动菜单选中
  menuSelected(menu: any) {
    try {
      return menu.url === this.tabs[this.tabIndex].url;
    } catch (e) {
    }
  }
  // tab中键,右键时触发
  onAuxClick(event: MouseEvent, tab: any) {
    // 捕获中键
    if (event.button === 1 && event.which === 2) {
      this.closeUrl(tab);
    }
  }
  // 动态创建tab右键菜单
  contextMenu($event: MouseEvent, template: TemplateRef<any>) {
    this.tabDropDown = this.dropDownService.create($event, template);
  }
  // 关闭选项标签
  closeUrl(tab: any) {
    // 当前关闭的是第几个路由
    const index = this.tabs.findIndex(t => t === tab);

    if (this.tabs.length === 1) {
      if (tab.url === '/index/welcome') {
        return;
      } else {
        this.tabs = [];
        this.navigateTo(this.home);
      }
    } else {
      this.tabs.splice(index, 1);
      // 删除复用
      // 如果当前删除的对象是当前选中的，那么需要跳转
      if (this.tabIndex === index) {
        // 显示上一个选中
        let menu = this.tabs[index - 1];
        if (!menu) {// 如果上一个没有下一个选中
          menu = this.tabs[index];
        }
        // 跳转路由
        this.router.navigate([menu.url]).then(res => {
          RouteReuse.deleteRouteSnapshot(tab.url);
        }, err => {
          RouteReuse.deleteRouteSnapshot(tab.url);
        });
      }
      RouteReuse.deleteRouteSnapshot(tab.url);
    }
  }
  // tab右键菜单关闭
  dropDownClose() {
    if (this.tabDropDown) {
      this.tabDropDown.close();
    }
  }
  // 刷新标签
  refresh(tab: any) {
    console.log(tab);
    this.router.navigate(['/index/empty']).then(res => {
      setTimeout(() => {
          RouteReuse.deleteRouteSnapshot(tab.url);
          this.navigateTo(tab);
        }
      );
    });
  }
  // 关闭所有，打开首页
  closeAllTab() {
    if (this.tabs.length === 1 && this.tabs[0].url === '/index/welcome') {
      return;
    }
    this.tabs = [];
    this.router.navigate(['/index/empty']).then(res => {
      setTimeout(() => {
          RouteReuse.deleteAll();
          this.router.navigate(['/index/welcome']);
        }
      );
    });
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
    this.router.navigate(['/login']);
  }
}
