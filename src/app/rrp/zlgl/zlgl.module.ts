import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ZlglRoutingModule} from './zlgl-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { Zlgl1Component } from './zlgl1/zlgl1.component';
import { JfglComponent } from './jfgl/jfgl.component';

@NgModule({
  declarations: [Zlgl1Component, JfglComponent],
  imports: [
    CommonModule,
    ZlglRoutingModule,
    NgZorroAntdModule,
    FormsModule
  ]
})
export class ZlglModule { }
