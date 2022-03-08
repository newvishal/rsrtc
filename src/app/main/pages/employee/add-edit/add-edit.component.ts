import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IDistrict, IEmployee, ILocationType, IZone } from 'src/app/shared/ts';

import { DistrictService } from 'src/app/services/district.service';
import { LocationTypeService } from 'src/app/services/location-type.service';
import { LocationService } from 'src/app/services/location.service';
import { ZoneService } from 'src/app/services/zone.service';

import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  isLinear = true;
  basicInfo: FormGroup;
  secondFormGroup: FormGroup;
  selectedFiles: any;
  bsubject: IEmployee;
  ZoneList: IZone[] = [];
  DistrictList: IDistrict[] = [];
  LocationTypeList: ILocationType[] = [];
  submitted: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    public toastr: ToastrManager,
    private locationService: LocationService,
    public zoneService: ZoneService,
    public districtService: DistrictService,
    public locationTypeService: LocationTypeService,
    ) { }

  ngOnInit(): void {
    this.basicInfo = this._formBuilder.group({
      empType: ['',],
      employeeName: [''],
      fatherName: [''],
      dob: [''],
      mobile: [''],
      emailID: [''],
      locationType: [''],
      zoneId: [''],
      districtId: [''],
      employeeType: [''],
      locationId: [''],
      addressDistrictId: [''],
      address: [''],
    });
    this.secondFormGroup = this._formBuilder.group({
      accountNo: [''],
      yearOfPosting: [''],
      adhar: [''],
      basicPayAmount: [''],
      epfEndDate: [''],
      dpAmount: [''],
      dA1Amount: [''],
      dA2Amount: [''],
      cpfNo: [''],
      gpfNo: [''],
      siNo: [''],
      cgisNo: [''],
      panNo: [''],
      designationId: [''],
      employeeUniqueID: [''],
      empStatus: [''], 
      serviceType: [''],
      employeeType: [''],
      probationEndDate: [''],
      janAadharNo: [''],
      ssoid: [''],
      sectionId: ['']
    });

    this.getZoneList();
    this.getDistrictList();
    this.getLocationTypeList();
    
    this.patchLocalStorageData();
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
      this.basicInfo.patchValue(this.bsubject);
      this.secondFormGroup.patchValue(this.bsubject);
    });
  }

  addLocation() {
    
  }

}
 