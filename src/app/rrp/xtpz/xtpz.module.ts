import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {XtpzRoutingModule} from './xtpz-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import {JsglComponent} from './jsgl/jsgl.component';
import {YhglComponent} from './yhgl/yhgl.component';
import {QyglComponent} from './qygl/qygl.component';
import {BljqrglComponent} from './bljqrgl/bljqrgl.component';

@NgModule({
  declarations: [JsglComponent, YhglComponent, QyglComponent, BljqrglComponent],
  imports: [
    CommonModule,
    XtpzRoutingModule,
    NgZorroAntdModule,
    FormsModule
  ]
})
export class XtpzModule { }
