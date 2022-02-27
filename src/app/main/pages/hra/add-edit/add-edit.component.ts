import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { HRAService } from 'src/app/services/hra.service';

import {IHRA} from '../../../../shared/ts';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  HRAForm: FormGroup;
  submitted = false;
  bsubject: IHRA;
  constructor(private formBuilder: FormBuilder,public toastr: ToastrManager,private hraService: HRAService,private _router: Router) { }

  ngOnInit(): void {
    this.HRAForm = this.formBuilder.group({
      hraValue: ['', Validators.required],
    });

    this.patchLocalStorageData();
  }

  patchLocalStorageData() {
    this.hraService.subject.subscribe(res => {
      if(typeof res == 'string') {
         this.bsubject = JSON.parse(res);
      } else {
        this.bsubject = res;
      }
      this.HRAForm.patchValue(this.bsubject);
    });
  }
  
  get myForm() { return this.HRAForm.controls; }

  addHRA() {
    this.submitted = true;
    if (this.HRAForm.invalid) {
      return;
    } else {
      if(this.bsubject.hraId) {
        this.hraService.put({...this.HRAForm.value, hraId: this.bsubject.hraId} as IHRA, this.bsubject.hraId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/hra/"]);
            this.toastr.successToastr(res['message']);
            localStorage.removeItem('details');
            this.hraService.saveDetails({hraId: '', hraValue: "", status: false })
          },
          error: err =>{
            console.log(err);
            this.toastr.warningToastr(err);
          }
        })
        return
      }
      this.hraService.add({...this.HRAForm.value} as IHRA).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/hra/"]);
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
