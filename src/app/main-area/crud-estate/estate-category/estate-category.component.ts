import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-estate-category',
  templateUrl: './estate-category.component.html',
  styleUrls: ['./estate-category.component.scss']
})
export class EstateCategoryComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'title', 'description', 'createdAt', 'actions'];
  tbData: DataSourceService;
  dataSource: any;
  count: number;
  private apiName = 'estates/category';
  constructor(private api: ApiService, private noti: NotificationService, private route: ActivatedRoute, private dialog: MatDialog) { }

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
      'name,description,position,keywords,createdAt'
    );
  }

  delete(id) {
    this.api.deleteData(id, this.apiName).pipe(
      tap(() => this.loadDatasPage())
    ).subscribe(res => {
      this.noti.showSuccess('', 'Xóa bản ghi thành công!');

    }, err => {
      this.noti.showError(err, 'Xóa bản ghi thất bại');
    });
  }

  update(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data
    };
    this.dialog.open(CategoryDialogComponent, dialogConfig).afterClosed()
      .subscribe(() => this.loadDatasPage());
  }

  create() {
    this.dialog.open(CategoryDialogComponent).afterClosed()
      .subscribe(() => this.loadDatasPage());
  }

}
