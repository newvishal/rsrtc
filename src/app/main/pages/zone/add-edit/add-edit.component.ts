import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { ZoneService } from 'src/app/services/zone.service';
import { IZone } from '../../../../shared/ts';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  ZoneForm: FormGroup;
  submitted = false;
  bsubject: IZone;
  constructor(private formBuilder: FormBuilder,public toastr: ToastrManager,private zoneService: ZoneService,private _router: Router) { }

  ngOnInit(): void {
    this.ZoneForm = this.formBuilder.group({
      zoneName: ['', Validators.required],
      shortCode: ['', Validators.required],
    });
    
    this.patchLocalStorageData();
  }
  
  patchLocalStorageData() {
    this.zoneService.subject.subscribe(res => {
      if(typeof res == 'string') {
         this.bsubject = JSON.parse(res);
      } else {
        this.bsubject = res;
      }
      this.ZoneForm.patchValue(this.bsubject);
    });
  }
  
  get myForm() { return this.ZoneForm.controls; }

  addZone() {
    this.submitted = true;
    if (this.ZoneForm.invalid) {
      return;
    } else {
      if(this.bsubject.zoneId) {
        this.zoneService.put({...this.ZoneForm.value, zoneId: this.bsubject.zoneId} as IZone, this.bsubject.zoneId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/zone/"]);
            this.toastr.successToastr(res['message']);
          },
          error: err =>{
            console.log(err);
            this.toastr.warningToastr(err);
          }
        })
        return
      }
      this.zoneService.add({...this.ZoneForm.value} as IZone).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/zone/"]);
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
