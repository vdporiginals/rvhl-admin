import { Component, OnInit, ViewChild } from '@angular/core';
import { TransferCategoryDialogComponent } from './transfer-category-dialog/transfer-category-dialog.component';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-transfer-category',
  templateUrl: './transfer-category.component.html',
  styleUrls: ['./transfer-category.component.scss']
})
export class TransferCategoryComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'createdAt', 'actions'];
  tbData: DataSourceService;
  dataSource: any;
  count: number;
  private apiName = 'transfers/category';
  constructor(private api: ApiService, private noti: NotificationService, private route: ActivatedRoute, private dialog: MatDialog) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  ngOnInit(): void {
    this.tbData = new DataSourceService(this.api);
    this.tbData.loadDatas(this.apiName, 0, 5, 'name,description,createdAt');
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
      'name,description,keywords,createdAt'
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
    this.dialog.open(TransferCategoryDialogComponent, dialogConfig).afterClosed()
      .subscribe(() => this.loadDatasPage());
  }

  create() {
    this.dialog.open(TransferCategoryDialogComponent).afterClosed()
      .subscribe(() => this.loadDatasPage());
  }
}
