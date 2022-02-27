import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
import { SectionService } from 'src/app/services/section.service';

import {ISection} from '../../../../shared/ts';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  SectionForm: FormGroup;
  submitted = false;
  bsubject: ISection;
  constructor(private formBuilder: FormBuilder,public toastr: ToastrManager,private sectionService: SectionService,private _router: Router) { }

  ngOnInit(): void {
    this.SectionForm = this.formBuilder.group({
      sectionName: ['', Validators.required],
      shortCode: ['', Validators.required],
    });

    this.patchLocalStorageData();
  }

  patchLocalStorageData() {
    this.sectionService.subject.subscribe(res => {
      if(typeof res == 'string') {
         this.bsubject = JSON.parse(res);
      } else {
        this.bsubject = res;
      }
      this.SectionForm.patchValue(this.bsubject);
    });
  }
  
  get myForm() { return this.SectionForm.controls; }

  addSection() {
    this.submitted = true;
    if (this.SectionForm.invalid) {
      return;
    } else {
      if(this.bsubject.sectionId) {
        this.sectionService.put({...this.SectionForm.value, sectionId: this.bsubject.sectionId} as ISection, this.bsubject.sectionId).subscribe({
          next: res =>{
            this._router.navigate(["dashboard/section/"]);
            this.toastr.successToastr(res['message']);
            localStorage.removeItem('details');
            this.sectionService.saveDetails({sectionId: '', sectionName: "", shortCode: '', status: false })
          },
          error: err =>{
            console.log(err);
            this.toastr.warningToastr(err);
          }
        })
        return
      }
      this.sectionService.add({...this.SectionForm.value} as ISection).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/section/"]);
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
