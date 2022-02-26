import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
declare var $:any;

import { IZone } from '../../../../shared/ts';
import { ZoneService } from 'src/app/services/zone.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['zoneId', 'zoneName', 'shortCode','status','actions'];
  dataSource: MatTableDataSource<IZone>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public zoneService: ZoneService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getZones();
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getZones(){
    this.loading = true;
    this.zoneService.find().subscribe((res: IZone[]) => {
      console.log(res);
      const Zone = res['data'] as IZone[];
      this.dataSource = new MatTableDataSource(Zone);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });

  }

  EditZone(detail: IZone) {
    console.log(detail)
    this.zoneService.saveDetails(detail);
    this.route.navigate(['dashboard/zone/addEditZone'])
  }
}
