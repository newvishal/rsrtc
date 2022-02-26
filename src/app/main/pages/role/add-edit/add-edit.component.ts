import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { UserRoleService } from 'src/app/services/user-role.service';

import { IUserRole } from '../../../../shared/ts';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  userRoleForm: FormGroup;
  submitted = false;
  bsubject: IUserRole;
  constructor(private formBuilder: FormBuilder,public toastr: ToastrManager,private userRoleService: UserRoleService,private _router: Router) { }

  ngOnInit(): void {
    this.userRoleForm = this.formBuilder.group({
      roleName: ['', Validators.required],
      status: ['', Validators.required]
    });

    this.patchLocalStorageData();
  }
  
  patchLocalStorageData() {
    this.userRoleService.subject.subscribe(res => {
      if(typeof res == 'string') {
         this.bsubject = JSON.parse(res);
      } else {
        this.bsubject = res;
      }
      this.userRoleForm.patchValue(this.bsubject);
    });
  }

  get myForm() { return this.userRoleForm.controls; }

  addUserRole() {
    this.submitted = true;
    if (this.userRoleForm.invalid) {
      return;
    } else {
      if(this.bsubject.roleId) {
        this.userRoleService.put({...this.userRoleForm.value, bankId: this.bsubject.roleId} as IUserRole, this.bsubject.roleId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/role/"]);
            this.toastr.successToastr(res['message']);
          },
          error: err =>{
            console.log(err);
            this.toastr.warningToastr(err);
          }
        })
        return
      }
      this.userRoleService.addUserRole({...this.userRoleForm.value} as IUserRole).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/role/"]);
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
