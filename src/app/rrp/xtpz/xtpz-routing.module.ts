import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QyglComponent} from './qygl/qygl.component';
import {BljqrglComponent} from './bljqrgl/bljqrgl.component';


const routes: Routes = [
  /**************挂自己功能组件 */
  {
    path: 'qygl', component: QyglComponent, data: { title: '企业管理' },
  },
  {
    path: 'bljqrgl', component: BljqrglComponent, data: { title: '布料机器人管理' },
  }
  /***************挂自己功能组件 */
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class XtpzRoutingModule {}
