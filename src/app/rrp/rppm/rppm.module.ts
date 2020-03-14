import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RppmRoutingModule} from './rppm-routing.module';
import { ProductionmanageComponent } from './productionmanage/productionmanage.component';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';



@NgModule({
  declarations: [
    /**************定义自己功能组件 */
    ProductionmanageComponent
    /**************定义自己功能组件 */
  ],
  imports: [
    CommonModule,
    RppmRoutingModule,
    FormsModule,
    NgZorroAntdModule,
  ]
})
export class RppmModule { }
