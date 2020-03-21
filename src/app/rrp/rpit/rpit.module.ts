import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { DemoComponent } from './demo/demo.component';
import {RpitRoutingModule} from './rpit-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChinamapComponent } from './chinamap/chinamap.component';


@NgModule({
  declarations: [

  DemoComponent,

  ChinamapComponent],
  imports: [
    NgxEchartsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    RpitRoutingModule
  ]
})
export class RpitModule { }
