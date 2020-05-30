import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/shared/services/api.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-crud-review',
  templateUrl: './crud-review.component.html',
  styleUrls: ['./crud-review.component.scss']
})
export class CrudReviewComponent implements OnInit {
  displayedColumns: string[] = ['status', 'title', 'description', 'createdAt', 'actions'];
  tbData: DataSourceService;
  dataSource: any;
  category: any;
  count: number;
  private apiName = 'user-reviews';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private api: ApiService, private noti: NotificationService,
    private route: ActivatedRoute, private dialog: MatDialog, private http: HttpClient) { }

  ngOnInit() {
    this.tbData = new DataSourceService(this.api);
    this.tbData.loadDatas(this.apiName, 0, 5, 'title,description,status,createdAt,user');
    this.tbData._dataSubject.subscribe((data: any) => {
      this.count = data.count;
      this.dataSource = new MatTableDataSource<any>(data.data);
    });
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadDatasPage()))
      .subscribe();
  }

  loadDatasPage() {
    this.tbData.loadDatas(
      this.apiName,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      'title,description,status,createdAt,user'
    );
  }

  changeStatus(val?, id?) {
    if (val === true) {
      this.api.updateData({ status: false }, id, this.apiName).pipe(
        tap(() => this.loadDatasPage())
      ).subscribe(res => {
        this.noti.showSuccess('', 'Đổi trạng thái thành công!');

      }, err => {
        this.noti.showError(err, 'Đổi trạng thái  thất bại');
      });
    } else {
      this.api.updateData({ status: true }, id, this.apiName).pipe(
        tap(() => this.loadDatasPage())
      ).subscribe(res => {
        this.noti.showSuccess('', 'Đổi trạng thái thành công!');

      }, err => {
        this.noti.showError(err, 'Đổi trạng thái  thất bại');
      });
    }
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

  update(id) {
    const dialogConfig = new MatDialogConfig();

    this.api.getDatas('user-reviews/category', 1, 10, 'name').pipe().subscribe(res => {
      dialogConfig.data = {
        id,
        category: res
      };
      this.dialog.open(ReviewDialogComponent, dialogConfig).afterClosed()
        .subscribe(() => this.loadDatasPage());
    });
  }

  create() {
    this.api.getDatas('user-reviews/category', 1, 10).pipe().subscribe((res: any) => {
      this.dialog.open(ReviewDialogComponent, res).afterClosed()
        .subscribe(() => this.loadDatasPage());
    });
  }
}
