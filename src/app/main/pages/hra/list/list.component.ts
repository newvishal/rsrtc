import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { HRAService } from 'src/app/services/hra.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {IHRA} from '../../../../shared/ts'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['hraId', 'hraValue', 'status', 'actions'];
  dataSource: MatTableDataSource<IHRA>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public hraService: HRAService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getHRA();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getHRA(){
    this.loading = true;
    this.hraService.find().subscribe((res: IHRA[]) => {
      const HRA = res['data'] as IHRA[];
      this.dataSource = new MatTableDataSource(HRA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });

  }

  EditHRA(detail: IHRA) {
    console.log(detail)
    this.hraService.saveDetails(detail);
    this.route.navigate(['dashboard/hra/addEditHra'])
  }

}
