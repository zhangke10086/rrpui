import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {YhglComponent} from './yhgl/yhgl.component';
import {JsglComponent} from './jsgl/jsgl.component';


const routes: Routes = [
  /**************挂自己功能组件 */
  {
    path: 'yhgl', component : YhglComponent, data: {title: '用户管理'}
  },
  {
    path: 'jsgl', component: JsglComponent, data: { title: '角色管理' },
  },
  /***************挂自己功能组件 */
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class XtpzRoutingModule {}
