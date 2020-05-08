import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { AdvertiseCategoryDialogComponent } from './advertise-category-dialog/advertise-category-dialog.component';

@Component({
  selector: 'app-advertise-category',
  templateUrl: './advertise-category.component.html',
  styleUrls: ['./advertise-category.component.scss']
})
export class AdvertiseCategoryComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'title', 'description', 'createdAt', 'actions'];
  tbData: DataSourceService;
  dataSource: any;
  count: number;
  private apiName = 'advertises/category';
  constructor(private api: ApiService, private route: ActivatedRoute, private dialog: MatDialog) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  ngOnInit(): void {
    this.tbData = new DataSourceService(this.api);
    this.tbData.loadDatas(this.apiName, 0, 5, 'name,description,position,createdAt');
    this.tbData._dataSubject.subscribe((data: any) => {
      this.count = data.count;
      this.dataSource = new MatTableDataSource<any>(data.data);
    });
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadDatasPage())
      )
      .subscribe();
  }

  loadDatasPage() {
    this.tbData.loadDatas(
      this.apiName,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      'name,description,position,createdAt'
    );
  }

  delete(id) {
    this.api.deleteData(id, this.apiName).pipe(
      tap(() => this.loadDatasPage())
    ).subscribe();
  }

  update(id: any) {
    this.dialog.open(AdvertiseCategoryDialogComponent, id).afterClosed()
      .subscribe(() => this.loadDatasPage());
  }

  create() {
    this.dialog.open(AdvertiseCategoryDialogComponent).afterClosed()
      .subscribe(() => this.loadDatasPage());
  }
}