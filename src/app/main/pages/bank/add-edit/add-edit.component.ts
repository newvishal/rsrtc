import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { BankService } from 'src/app/services/bank.service';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  bankForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,public toastr: ToastrManager,private bankService: BankService,private _router: Router) { }

  ngOnInit(): void {
    this.bankForm = this.formBuilder.group({
      bankName: ['', Validators.required],
      shortCode: ['', Validators.required]
    });
  }
  get myForm() { return this.bankForm.controls; }

  loginUser() {
    this.submitted = true;
    if (this.bankForm.invalid) {
      return;
    } else {
      this.bankService.addBank(this.bankForm.value).subscribe({
        next: res =>{
          console.log(res);
          this._router.navigate(["dashboard/bank/"]);
          this.toastr.successToastr(res['message']);
        },
        error: err =>{
          console.log(err);
          // console.log(typeof err);
          this.toastr.warningToastr(err);
          // if (err.status === 401) {
          //   this.toastr.warningToastr(err.message);
          // } else {
          //   this.toastr.warningToastr('Somthing went wrong!!!');
          // }
        }
      })
    }

  }
}
