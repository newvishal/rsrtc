import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { DistrictService } from 'src/app/services/district.service';
import { HRAService } from 'src/app/services/hra.service';
import { LocationTypeService } from 'src/app/services/location-type.service';
import { LocationService } from 'src/app/services/location.service';
import { ZoneService } from 'src/app/services/zone.service';

import {IDistrict, IHRA, ILocation, ILocationType, IZone} from '../../../../shared/ts';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  LocationForm: FormGroup;
  submitted = false;
  bsubject: ILocation;
  ZoneList: IZone[] = [];
  DistrictList: IDistrict[] = [];
  LocationTypeList: ILocationType[] = [];
  HRAList: IHRA[] = [];
  constructor(
    private formBuilder: FormBuilder,
    public toastr: ToastrManager,
    private locationService: LocationService,
    public zoneService: ZoneService,
    public districtService: DistrictService,
    public locationTypeService: LocationTypeService,
    public HRAService: HRAService,
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

    this.getZoneList();
    this.getDistrictList();
    this.getLocationTypeList();
    this.getHRAList();
  }

  getHRAList() {
    this.HRAService.find().subscribe(
      (res: IHRA[]) => {
        this.HRAList = res['data'];
      },
      (err) => {
        console.log(err);
      }
    )
  }
  getLocationTypeList() {
    this.locationTypeService.find().subscribe(
      (res: ILocationType[]) => {
        this.LocationTypeList = res['data'];
      },
      (err) => {
        console.log(err);
      }
    )
  }
  getDistrictList() {
    this.districtService.find().subscribe(
      (res: IDistrict[]) => {
        this.DistrictList = res['data'];
      },
      (err) => {
        console.log(err);
      }
    )
  }
  getZoneList() {
    this.zoneService.find().subscribe(
      (res: IZone[]) => {
        this.ZoneList = res['data'];
      },
      (err) => {
        console.log(err);
      }
    )
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
              zoneId: "",
              districtId: '',
              locationTypeId: "",
              locationName: "",
              shortCode: "",
              hra: "",
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
