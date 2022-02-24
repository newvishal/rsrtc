import { Component, OnInit } from '@angular/core';
import { BankService } from 'src/app/services/bank.service';

declare var $:any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  bankList: Array<any> = [];
  constructor(public bankService: BankService) { }

  ngOnInit(): void {
    this.getAllBank();
    $(document).ready(function(){
      $('#bankexample').DataTable();
    });
  }

  getAllBank(){
     this.bankService.getAllBank().subscribe({
       next: res =>{
          console.log(res['data']);
          this.bankList = res['data'];
       },
       error: err =>{
          console.log(err);
       }
     });
  }

}
