import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { SectionService } from 'src/app/services/section.service';

import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {ISection} from '../../../../shared/ts'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['sectionId', 'sectionName', 'shortCode', 'status','actions'];
  dataSource: MatTableDataSource<ISection>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public sectionService: SectionService, public route: Router) { }
  loading: boolean = false;
  ngOnInit(): void {
    this.getSection();
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

  getSection(){
    this.loading = true;
    this.sectionService.find().subscribe((res: ISection[]) => {
      const Section = res['data'] as ISection[];
      this.dataSource = new MatTableDataSource(Section);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.log(err)
    });

  }

  EditSection(detail: ISection) {
    console.log(detail)
    this.sectionService.saveDetails(detail);
    this.route.navigate(['dashboard/section/addEditSection'])
  }

}
