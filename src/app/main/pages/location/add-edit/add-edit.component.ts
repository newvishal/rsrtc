import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';

import {ILocation} from '../../../../shared/ts';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  LocationForm: FormGroup;
  submitted = false;
  bsubject: ILocation;
  constructor(
    private formBuilder: FormBuilder,
    public toastr: ToastrManager,
    private locationService: LocationService,
    private _router: Router
  ) { }
  ngOnInit(): void {
    this.LocationForm = this.formBuilder.group({
      zoneId: ['', Validators.required],
      districtId: ['', Validators.required],
      locationTypeId: ['', Validators.required],
      locationName: ['', Validators.required],
      hra: ['', Validators.required],
      ccaStatus: ['', Validators.required],
      shortCode: [''],
    });

    this.patchLocalStorageData();
  }

  patchLocalStorageData() {
    this.locationService.subject.subscribe(res => {
      if(typeof res == 'string') {
         this.bsubject = JSON.parse(res);
      } else {
        this.bsubject = res;
      }
      this.LocationForm.patchValue(this.bsubject);
    });
  }
  
  get myForm() { return this.LocationForm.controls; }

  addLocation() {
    this.submitted = true;
    if (this.LocationForm.invalid) {
      return;
    } else {
      if(this.bsubject.locationId) {
        this.locationService.put({...this.LocationForm.value, locationId: this.bsubject.locationId} as ILocation, this.bsubject.locationId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/location/"]);
            this.toastr.successToastr(res['message']);
            localStorage.removeItem('details');
            this.locationService.saveDetails({
              locationId: '',
              zoneId: 0,
              districtId: 0,
              locationTypeId: 0,
              locationName: "",
              shortCode: "",
              hra: 0,
              ccaStatus: false,
              cccAmount: 0,
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
      this.locationService.add({...this.LocationForm.value}).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/location/"]);
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
