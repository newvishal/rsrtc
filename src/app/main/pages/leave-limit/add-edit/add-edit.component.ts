import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { LeaveLimitService } from 'src/app/services/leave-limit.service';
import { LeaveTypeService } from 'src/app/services/leave-type.service';

import { ILeaveLimit, ILeaveType} from '../../../../shared/ts';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  LeaveLimitForm: FormGroup;
  submitted = false;
  bsubject: ILeaveLimit;
  LeaveTypeList: ILeaveType[] = [];
  constructor(
    private formBuilder: FormBuilder,
    public toastr: ToastrManager,
    private leaveLimitService: LeaveLimitService,
    public leaveTypeService: LeaveTypeService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.LeaveLimitForm = this.formBuilder.group({
      leaveTypeId: ['', Validators.required],
      empTypeId: ['', Validators.required],
      perMonthLeaveAllowed: ['', Validators.required],
      maxLeaveAllowed: ['', Validators.required],
      carryForwardMaxLimit: [''],
      status: ['']
    });
    this.patchLocalStorageData();
    this.getLeaveTypeList();
  }
  
  getLeaveTypeList() {
    this.leaveTypeService.find().subscribe(
      (res: ILeaveType[]) => {
        this.LeaveTypeList = res['data'];
      },
      (err) => {
        console.log(err);
      }
    )
  }

  patchLocalStorageData() {
    this.leaveLimitService.subject.subscribe(res => {
      if(typeof res == 'string') {
         this.bsubject = JSON.parse(res);
      } else {
        this.bsubject = res;
      }
      this.LeaveLimitForm.patchValue(this.bsubject);
    });
  }
  
  get myForm() { return this.LeaveLimitForm.controls; }

  addLeaveLimit() {
    this.submitted = true;
    if (this.LeaveLimitForm.invalid) {
      return;
    } else {
      if(this.bsubject.empLeaveApplicableId) {
        this.leaveLimitService.put({...this.LeaveLimitForm.value, empLeaveApplicableId: this.bsubject.empLeaveApplicableId} as ILeaveLimit, this.bsubject.empLeaveApplicableId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/leave-limit/"]);
            this.toastr.successToastr(res['message']);
            localStorage.removeItem('details');
            this.leaveLimitService.saveDetails({
              empLeaveApplicableId:"",
              leaveTypeId: 0,
              empTypeId: 0,
              perMonthLeaveAllowed: 0,
              maxLeaveAllowed: 0,
              carryForwardMaxLimit:0,
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
      this.leaveLimitService.add({...this.LeaveLimitForm.value}).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/leave-limit/"]);
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
