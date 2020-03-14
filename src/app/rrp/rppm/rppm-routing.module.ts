import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductionmanageComponent} from './productionmanage/productionmanage.component';


const routes: Routes = [
  /**************挂自己功能组件 */
  {
    path: 'productionmanage', component: ProductionmanageComponent, data: { title: 'demo' },
  },
  /***************挂自己功能组件 */
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RppmRoutingModule { }
