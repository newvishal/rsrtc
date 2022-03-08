import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { ChildCareLeaveService } from 'src/app/services/child-care-leave.service';

import { IChildCareLeave } from '../../../../shared/ts';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  ChildCareLeaveForm: FormGroup;
  submitted = false;
  bsubject: IChildCareLeave;
  constructor(
    private formBuilder: FormBuilder,
    public toastr: ToastrManager,
    private childCareLeavService: ChildCareLeaveService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.ChildCareLeaveForm = this.formBuilder.group({
      leaveType: ['', Validators.required],
      gender: ['', Validators.required],
      maxLeaveAllowed: ['', Validators.required],
      tillChildAge: [''],
      status: ['']
    });
    this.patchLocalStorageData();
  }


  patchLocalStorageData() {
    this.childCareLeavService.subject.subscribe(res => {
      if(typeof res == 'string') {
         this.bsubject = JSON.parse(res);
      } else {
        this.bsubject = res;
      }
      this.ChildCareLeaveForm.patchValue(this.bsubject);
    });
  }
  
  get myForm() { return this.ChildCareLeaveForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.ChildCareLeaveForm.invalid) {
      return;
    } else {
      if(this.bsubject.mPleaveId) {
        this.childCareLeavService.put({...this.ChildCareLeaveForm.value, mPleaveId: this.bsubject.mPleaveId} as IChildCareLeave, this.bsubject.mPleaveId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/ccl/"]);
            this.toastr.successToastr(res['message']);
            localStorage.removeItem('details');
            this.childCareLeavService.saveDetails({
              mPleaveId:"",
              leaveType: "",
              gender: "",
              maxLeaveAllowed: 0,
              tillChildAge: 0,
              status: false
            });
          },
          error: err =>{
            console.log(err);
            this.toastr.warningToastr(err);
          }
        })
        return
      }
      this.childCareLeavService.addChildCareLeave({...this.ChildCareLeaveForm.value}).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/ccl/"]);
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
