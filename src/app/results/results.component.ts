import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements AfterViewInit {

  displayedColumns: string[] = ['login', 'avatar_url', 'type'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(public cdRef: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    const users: any = sessionStorage.getItem('usersResponse');

    this.dataSource = new MatTableDataSource(JSON.parse(users));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;

    this.cdRef.detectChanges();
  }

}
