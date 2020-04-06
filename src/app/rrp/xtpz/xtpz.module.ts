import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {XtpzRoutingModule} from './xtpz-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { QyglComponent } from './qygl/qygl.component';
import { BljqrglComponent } from './bljqrgl/bljqrgl.component';

@NgModule({
  declarations: [QyglComponent, BljqrglComponent],
  imports: [
    CommonModule,
    XtpzRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class XtpzModule { }
