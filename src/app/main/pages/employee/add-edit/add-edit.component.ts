import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IDistrict, IEmployee, ILocation, ILocationType, ISection, IZone } from 'src/app/shared/ts';

import { DistrictService } from 'src/app/services/district.service';
import { LocationTypeService } from 'src/app/services/location-type.service';
import { LocationService } from 'src/app/services/location.service';
import { ZoneService } from 'src/app/services/zone.service';

import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { SectionService } from 'src/app/services/section.service';
import { EmployeeService } from 'src/app/services/employee.service';

import {lib} from '../../../../shared/ts/lib';

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
  SectionList: ISection[] = [];
  DistrictList: IDistrict[] = [];
  LocationTypeList: ILocationType[] = [];
  LocationList: ILocation[] = [];
  submitted: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    public toastr: ToastrManager,
    public _router: Router,
    private locationService: LocationService,
    public zoneService: ZoneService,
    public districtService: DistrictService,
    public locationTypeService: LocationTypeService,
    public sectionService: SectionService,
    public empService: EmployeeService,
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
    this.getLocationList();
    this.patchLocalStorageData();
    this.getSectionList();
    //console.log(lib.dateFormater('1995/18/12')); 
  }
  getSectionList() {
    this.sectionService.find().subscribe(
      (res: ISection[]) => {
        this.SectionList = res['data'];
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getLocationList() {
    this.locationService.find().subscribe(
      (res: ILocation[]) => {
        this.LocationList = res['data'];
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
      console.log(this.bsubject)
      this.basicInfo.patchValue(this.bsubject);
      this.secondFormGroup.patchValue(this.bsubject);
    });
  }

  addEmployee() {
    this.submitted = true;
    if (this.basicInfo.invalid || this.secondFormGroup.invalid) {
      return;
    } else {
      if(this.bsubject.employeeId) {
        this.empService.put({...this.basicInfo.value, ...this.secondFormGroup.value ,employeeId: this.bsubject.employeeId} as IEmployee, this.bsubject.employeeId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/employee/"]);
            this.toastr.successToastr(res['message']);
            localStorage.removeItem('details');
            this.empService.saveDetails( { "empType": "", "employeeName": "", "fatherName": "", "dob": "", "mobile": "", "emailID": "", "locationType": "", "zoneId": "", "districtId": "", "employeeType": "", "locationId": "", "addressDistrictId": "", "address": "", "accountNo": "", "yearOfPosting": "", "adhar": "", "basicPayAmount": "", "epfEndDate": "", "dpAmount": "", "dA1Amount": "", "dA2Amount": "", "cpfNo": "", "gpfNo": "", "siNo": "", "cgisNo": "", "panNo": "", "designationId": "", "employeeUniqueID": "", "empStatus": false, "serviceType": "", "probationEndDate": "", "janAadharNo": "", "ssoid": "", "sectionId": "" })
          },
          error: err =>{
            console.log(err);
            this.toastr.warningToastr(err);
          }
        })
        return
      }
      this.empService.add({...this.basicInfo.value, ...this.secondFormGroup.value} as IEmployee).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/employee/"]);
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
 