import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {YxqkRoutingModule} from './yxqk-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { SbyxztComponent } from './sbyxzt/sbyxzt.component';
import { YxsjtjComponent } from './yxsjtj/yxsjtj.component';
import {QuerylistModule} from "../../helpcenter/querylist/querylist.module";

@NgModule({
  declarations: [SbyxztComponent, YxsjtjComponent],
  imports: [
    CommonModule,
    YxqkRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    QuerylistModule
  ]
})
export class YxqkModule { }
