import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { FinancialYearService } from 'src/app/services/financial-year.service';

import {IFinancialYear} from '../../../../shared/ts';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  FYForm: FormGroup;
  submitted = false;
  bsubject: IFinancialYear;
  constructor(private formBuilder: FormBuilder,public toastr: ToastrManager,private FYService: FinancialYearService, private _router: Router) { }

  ngOnInit(): void {
    this.FYForm = this.formBuilder.group({
      financialYear: ['', Validators.required],
      shortCode: [''],
      fyFrom: [''],
      fyTo: ['']
    });

    this.patchLocalStorageData();
  }

  patchLocalStorageData() {
    this.FYService.subject.subscribe(res => {
      if(typeof res == 'string') {
         this.bsubject = JSON.parse(res);
      } else {
        this.bsubject = res;
      }
      this.FYForm.patchValue(this.bsubject);
    });
  }
  
  get myForm() { return this.FYForm.controls; }

  addFY() {
    this.submitted = true;
    if (this.FYForm.invalid) {
      return;
    } else {
      if(this.bsubject.fyId) {
        this.FYService.put({...this.FYForm.value, fyId: this.bsubject.fyId} as IFinancialYear, this.bsubject.fyId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/financial-year/"]);
            this.toastr.successToastr(res['message']);
            localStorage.removeItem('details');
            this.FYService.saveDetails({fyId: '', financialYear: '', fyFrom: '', fyTo: '', shortCode: "", status: false })
          },
          error: err =>{
            console.log(err);
            this.toastr.warningToastr(err);
          }
        })
        return
      }
      this.FYService.add({...this.FYForm.value}).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/financial-year/"]);
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
