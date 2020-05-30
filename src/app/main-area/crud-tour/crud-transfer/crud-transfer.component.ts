import { Component, OnInit, ViewChild } from '@angular/core';
import { TransferDialogComponent } from './transfer-dialog/transfer-dialog.component';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-crud-transfer',
  templateUrl: './crud-transfer.component.html',
  styleUrls: ['./crud-transfer.component.scss']
})
export class CrudTransferComponent implements OnInit {
  displayedColumns: string[] = ['status', 'title', 'description', 'createdAt', 'actions'];
  tbData: DataSourceService;
  dataSource: any;
  count: number;
  private apiName = 'transfers';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private api: ApiService, private dialog: MatDialog, private noti: NotificationService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.tbData = new DataSourceService(this.api);
    this.tbData.loadDatas(this.apiName, 0, 5, 'name,description,status,createdAt');
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
      'name,description,status,createdAt'
    );
  }

  changeStatus(val?, id?) {
    if (val === true) {
      this.api.updateData({ status: false }, id, this.apiName).pipe(
        tap(() => this.loadDatasPage())
      ).subscribe(res => {
        this.noti.showSuccess('', 'Thay đổi trạng thái thành công!');

      }, err => {
        this.noti.showError(err, 'Thay đổi trạng thái thất bại');
      });
    } else {
      this.api.updateData({ status: true }, id, this.apiName).pipe(
        tap(() => this.loadDatasPage())
      ).subscribe(res => {
        this.noti.showSuccess('', 'Thay đổi trạng thái thành công!');

      }, err => {
        this.noti.showError(err, 'Thay đổi trạng thái thất bại');
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
    this.api.getDatas('transfers/category', 1, 10).pipe().subscribe(res => {
      dialogConfig.data = {
        id,
        category: res
      };
      this.dialog.open(TransferDialogComponent, dialogConfig).afterClosed()
        .subscribe(() => this.loadDatasPage());
    });
  }

  create() {
    this.api.getDatas('transfers/category', 1, 10).pipe().subscribe((res: any) => {
      this.dialog.open(TransferDialogComponent, res).afterClosed()
        .subscribe(() => this.loadDatasPage());
    });
  }

  showDetail() {

  }

}
