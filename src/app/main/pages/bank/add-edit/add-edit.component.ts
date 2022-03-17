import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ToastrManager } from 'ng6-toastr-notifications';

import { BankService } from 'src/app/services/bank.service';
import { ConfirmdialogService } from 'src/app/services/confirmdialog.service';

import {IBank} from '../../../../shared/ts';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  bankForm: FormGroup;
  submitted = false;
  bsubject: IBank;
  constructor(
    private formBuilder: FormBuilder,
    public toastr: ToastrManager,
    private bankService: BankService,
    private _router: Router,
    public matDialog: MatDialog,
    public confirmModalServ: ConfirmdialogService
    ) { }

  ngOnInit(): void {
    this.bankForm = this.formBuilder.group({
      bankName: ['', Validators.required],
      shortCode: ['', Validators.required]
    });

    this.patchLocalStorageData();
  }

  patchLocalStorageData() {
    this.bankService.subject.subscribe(res => {
      if(typeof res == 'string') {
         this.bsubject = JSON.parse(res);
      } else {
        this.bsubject = res;
      }
      this.bankForm.patchValue(this.bsubject);
    });
  }
  
  get myForm() { return this.bankForm.controls; }

  addBank() {
    this.submitted = true;
    if (this.bankForm.invalid) {
      return;
    } else {
      const modalRef = this.confirmModalServ.open("200px", "400px", "Confirm", "Are you Sure ?", true, true, "ok", "cancel");
      modalRef.afterClosed().subscribe(result => {
        const { event } = result;
        if(event === 'Close') {
          return;
        }
        this.SaveBank();
      });
    }
  }

  SaveBank() {
    if(this.bsubject.bankId) {
      this.bankService.put({...this.bankForm.value, bankId: this.bsubject.bankId} as IBank, this.bsubject.bankId).subscribe({
        next: res =>{
          this._router.navigate(["dashboard/bank/"]);
          this.toastr.successToastr(res['message']);
          localStorage.removeItem('details');
          this.bankService.saveBankById({bankName: '', bankId: "", shortCode: '', status: false })
        },
        error: err =>{
          console.log(err);
          this.toastr.warningToastr(err);
        }
      })
      return;
    }
    this.bankService.addBank({...this.bankForm.value} as IBank).subscribe({
      next: res =>{
        this._router.navigate(["dashboard/bank/"]);
        this.toastr.successToastr(res['message']);
      },
      error: err =>{
        console.log(err);
        this.toastr.warningToastr(err);
      }
    })
  }

}
