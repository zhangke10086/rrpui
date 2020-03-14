import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  /**************挂自己功能组件 */
  // {
  //   path: 'demo', component: DemoComponent, data: { title: 'demo' },
  // },
  /***************挂自己功能组件 */
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RprsRoutingModule { }
