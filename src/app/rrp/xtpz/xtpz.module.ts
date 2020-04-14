import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {XtpzRoutingModule} from './xtpz-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { YhglComponent } from './yhgl/yhgl.component';
import { JsglComponent } from './jsgl/jsgl.component';

@NgModule({
  declarations: [YhglComponent, JsglComponent],
  imports: [
    CommonModule,
    XtpzRoutingModule,
    NgZorroAntdModule,
    FormsModule
  ]
})
export class XtpzModule { }
