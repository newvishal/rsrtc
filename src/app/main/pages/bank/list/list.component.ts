import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { BankService } from 'src/app/services/bank.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {IBank} from '../../../../shared/ts'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'bankName', 'shortCode'];
  dataSource: MatTableDataSource<IBank>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  bankList: Array<any> = [];
  constructor(public bankService: BankService) { }

  ngOnInit(): void {
    // this.getAllBank();
    const banks: IBank = {id: '1', bankName: 'test', shortCode: 'BSC'};

    this.dataSource = new MatTableDataSource([banks]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
