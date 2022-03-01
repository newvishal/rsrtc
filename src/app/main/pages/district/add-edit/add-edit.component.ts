import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { DistrictService } from 'src/app/services/district.service';

import {IDistrict} from '../../../../shared/ts';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  DistrictForm: FormGroup;
  submitted = false;
  bsubject: IDistrict;
  constructor(private formBuilder: FormBuilder,public toastr: ToastrManager,private districtService: DistrictService,private _router: Router) { }

  ngOnInit(): void {
    this.DistrictForm = this.formBuilder.group({
      zoneId: ['', Validators.required],
      districtName: ['', Validators.required],
      shortCode: [''],
    });

    this.patchLocalStorageData();
  }

  patchLocalStorageData() {
    this.districtService.subject.subscribe(res => {
      if(typeof res == 'string') {
         this.bsubject = JSON.parse(res);
      } else {
        this.bsubject = res;
      }
      this.DistrictForm.patchValue(this.bsubject);
    });
  }
  
  get myForm() { return this.DistrictForm.controls; }

  addDistrict() {
    this.submitted = true;
    if (this.DistrictForm.invalid) {
      return;
    } else {
      const {districtName, shortCode, districtId, zoneId} = this.DistrictForm.value as IDistrict;
      if(this.bsubject.districtId) {
       
        this.districtService.put({...this.DistrictForm.value, districtId: this.bsubject.districtId, zoneId} as IDistrict, this.bsubject.districtId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/district/"]);
            this.toastr.successToastr(res['message']);
            localStorage.removeItem('details');
            this.districtService.saveDetails({districtId: '', zoneId: 0, districtName: '', shortCode: "", status: false })
          },
          error: err =>{
            console.log(err);
            this.toastr.warningToastr(err);
          }
        })
        return
      }
      this.districtService.add({districtName, shortCode, zoneId}).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/district/"]);
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
