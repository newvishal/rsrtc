import { Component, OnInit } from '@angular/core';
import { FinancialYearService } from 'src/app/services/financial-year.service';
import { MonthService } from 'src/app/services/month.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';

import {IMonth, IFinancialYear} from '../../../../shared/ts';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  FYList: IFinancialYear[] = []
  MonthForm: FormGroup
  bsubject: IMonth;
  submitted:boolean = false
  MonthList: Object = {
      '1': 'Jan',
      '2': 'Feb',
      '3': 'Mar',
      '4': 'Apr',
      '5': 'May',
      '6': 'June',
      '7': 'July',
      '8': 'Aug',
      '9': 'Sept',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dec'
  };
  constructor(
    public FYServ: FinancialYearService,
    public monthServ: MonthService,
    private formBuilder: FormBuilder,
    public toastr: ToastrManager,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getFYList();
    this.createMonthForm();
    this.patchLocalStorageData();
  }
  createMonthForm() {
   this.MonthForm = this.formBuilder.group({
        fyId: ['', Validators.required],
        monthNo: ['', Validators.required],
        attendanceStatus: [''],
        salaryStatus: [''],
        userId: ['', Validators.required]
   });
  }

  getFYList() {
    this.FYServ.find().subscribe((res) => {
      this.FYList = res['data'];
      console.log(this.FYList);
    }, (err) => {
      console.log(err);
    })
  }

  patchLocalStorageData() {
    this.monthServ.subject.subscribe(res => {
      if(typeof res == 'string') {
         this.bsubject = JSON.parse(res);
      } else {
        this.bsubject = res;
      }
      this.MonthForm.patchValue(this.bsubject);
    });
  }
  
  get myForm() { return this.MonthForm.controls; }

  addMonth() {
    this.submitted = true;
    if (this.MonthForm.invalid) {
      return;
    } else {
      if(this.bsubject.monthId) {
        this.monthServ.put({...this.MonthForm.value, monthName: this.MonthList[this.MonthForm.value['monthNo']]} as IMonth, this.bsubject.monthId).subscribe({
          next: res =>{
            this.toastr.successToastr(res['message']);
            this._router.navigate(["dashboard/month/"]);
            localStorage.removeItem('details');
            this.monthServ.saveDetails({
              monthId: '', 
              fyId: 0, 
              monthName: '',
              monthNo: 0,
              attendanceStatus: false,
              salaryStatus: false,
              userId: 0,
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
      this.monthServ.add({...this.MonthForm.value, monthName: this.MonthList[this.MonthForm.value['monthNo']]}).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/month/"]);
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
