import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index.component';
import {EmptyComponent} from './empty/empty.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {WelcomeComponent} from './welcome/welcome.component';
import {RprmComponent} from '../rprm/rprm.component';
import {RprsComponent} from '../rprs/rprs.component';
import {RpscComponent} from '../rpsc/rpsc.component';
import {RpitComponent} from '../rpit/rpit.component';
import {RpmtComponent} from '../rpmt/rpmt.component';
import {RppdComponent} from '../rppd/rppd.component';
import {RppmComponent} from '../rppm/rppm.component';


const routes: Routes = [
  {
    path: '', component: IndexComponent, children: [
      // 首页
      {
        path: 'welcome', component: WelcomeComponent, data: {reuse: false, track: false}
      },
      // 互联网
      {
        path: 'rpit', loadChildren: () => import('../../rrp/rpit/rpit.module').then(m => m.RpitModule)
      },
      // 维修维护
      {
        path: 'rpmt', loadChildren: () => import('../../rrp/rpmt/rpmt.module').then(m => m.RpmtModule)
      },
      // 生产数据
      {
        path: 'rppd', loadChildren: () => import('../../rrp/rppd/rppd.module').then(m => m.RppdModule)
      },
      // 生产管理
      {
        path: 'rppm', loadChildren: () => import('../../rrp/rppm/rppm.module').then(m => m.RppmModule)
      },
      // 运行情况
      {
        path: 'rprs', loadChildren: () => import('../../rrp/rprs/rprs.module').then(m => m.RprsModule)
      },
      // 租赁管理
      {
        path: 'rprm', loadChildren: () => import('../../rrp/rprm/rprm.module').then(m => m.RprmModule)
      },
      // 系统配置
      {
        path: 'rpsc', loadChildren: () => import('../../rrp/rpsc/rpsc.module').then(m => m.RpscModule)
      },
      {
        path: 'empty', component: EmptyComponent, data: {reuse: false, track: false}
      },
    ], data: {reuse: false, track: false}
  }
];
@NgModule({
  declarations: [
    IndexComponent,
    WelcomeComponent,
    EmptyComponent,
    RprmComponent,
    RprsComponent,
    RpscComponent,
    RpitComponent,
    RpmtComponent,
    RppdComponent,
    RppmComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})
export class IndexModule { }
