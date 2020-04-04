import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {XtpzRoutingModule} from './xtpz-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { YhglComponent } from './yhgl/yhgl.component';

@NgModule({
  declarations: [YhglComponent],
  imports: [
    CommonModule,
    XtpzRoutingModule,
    NgZorroAntdModule,
    FormsModule
  ]
})
export class XtpzModule { }
