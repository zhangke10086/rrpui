import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScsjRoutingModule} from './scsj-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ScsjRoutingModule,
    NgZorroAntdModule,
    FormsModule
  ]
})
export class ScsjModule { }
