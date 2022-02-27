import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { LeaveReasonTypeService } from 'src/app/services/leave-reason-type.service';

import {ILeaveReasonType} from '../../../../shared/ts';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  LeaveReasonTypeForm: FormGroup;
  submitted = false;
  bsubject: ILeaveReasonType;
  constructor(private formBuilder: FormBuilder,public toastr: ToastrManager,private leaveReasonTypeService: LeaveReasonTypeService,private _router: Router) { }

  ngOnInit(): void {
    this.LeaveReasonTypeForm = this.formBuilder.group({
      reasonType: ['', Validators.required],
      shortCode: ['', Validators.required],
    });

    this.patchLocalStorageData();
  }

  patchLocalStorageData() {
    this.leaveReasonTypeService.subject.subscribe(res => {
      if(typeof res == 'string') {
         this.bsubject = JSON.parse(res);
      } else {
        this.bsubject = res;
      }
      this.LeaveReasonTypeForm.patchValue(this.bsubject);
    });
  }
  
  get myForm() { return this.LeaveReasonTypeForm.controls; }

  addLeaveReasonType() {
    this.submitted = true;
    if (this.LeaveReasonTypeForm.invalid) {
      return;
    } else {
      if(this.bsubject.leaveReasonTypeId) {
        this.leaveReasonTypeService.put({...this.LeaveReasonTypeForm.value, leaveReasonTypeId: this.bsubject.leaveReasonTypeId} as ILeaveReasonType, this.bsubject.leaveReasonTypeId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/LeaveReason/"]);
            this.toastr.successToastr(res['message']);
            localStorage.removeItem('details');
            this.leaveReasonTypeService.saveDetails({leaveReasonTypeId: '', reasonType: "", shortCode: '', status: false })
          },
          error: err =>{
            console.log(err);
            this.toastr.warningToastr(err);
          }
        })
        return
      }
      this.leaveReasonTypeService.add({...this.LeaveReasonTypeForm.value} as ILeaveReasonType).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/LeaveReason/"]);
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
