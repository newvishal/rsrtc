import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';

const routes: Routes = [
  {
    path: "",
    component: ListComponent
  },
  {
    path: "addEditCCL",
    component: AddEditComponent
  }
];

@NgModule({
  declarations: [
    ListComponent,
    AddEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ChildCareLeaveModule { }
