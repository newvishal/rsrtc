import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { DesignationService } from 'src/app/services/designation.service';

import {IDesignation} from '../../../../shared/ts';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  DesignationForm: FormGroup;
  submitted = false;
  bsubject: IDesignation;
  constructor(private formBuilder: FormBuilder,public toastr: ToastrManager,private designationService: DesignationService,private _router: Router) { }

  ngOnInit(): void {
    this.DesignationForm = this.formBuilder.group({
      designationType: ['', Validators.required],
      designationName: ['', Validators.required],
      shortCode: ['', Validators.required],
    });

    this.patchLocalStorageData();
  }

  patchLocalStorageData() {
    this.designationService.subject.subscribe(res => {
      if(typeof res == 'string') {
         this.bsubject = JSON.parse(res);
      } else {
        this.bsubject = res;
      }
      this.DesignationForm.patchValue(this.bsubject);
    });
  }
  
  get myForm() { return this.DesignationForm.controls; }

  addDesignation() {
    this.submitted = true;
    if (this.DesignationForm.invalid) {
      return;
    } else {
      if(this.bsubject.designationId) {
        this.designationService.put({...this.DesignationForm.value, designationId: this.bsubject.designationId} as IDesignation, this.bsubject.designationId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/designation/"]);
            this.toastr.successToastr(res['message']);
          },
          error: err =>{
            console.log(err);
            this.toastr.warningToastr(err);
          }
        })
        return
      }
      this.designationService.add({...this.DesignationForm.value} as IDesignation).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/designation/"]);
          this.toastr.successToastr(res['message']);
        },
        error: err =>{
          console.log(err);
          this.toastr.warningToastr(err);
        }
      })
    }

  }

}
