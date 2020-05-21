import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { VillaDialogComponent } from './villa-dialog/villa-dialog.component';

@Component({
  selector: 'app-villa',
  templateUrl: './villa.component.html',
  styleUrls: ['./villa.component.scss']
})
export class VillaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['status', 'title', 'description', 'phone', 'address', 'createdAt', 'actions'];
  tbData: DataSourceService;
  dataSource: any;
  count: number;
  private apiName = 'estates/villa';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private api: ApiService, private dialog: MatDialog, private noti: NotificationService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.tbData = new DataSourceService(this.api);
    this.tbData.loadDatas(this.apiName, 0, 5, 'name,phone,address,description,status,createdAt');
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
      'name,phone,address,description,status,createdAt'
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
    this.api.getDataWithPosition('estates/category', 1, 10, 'name,position', '', 'Villa').pipe().subscribe(res => {
      dialogConfig.data = {
        id,
        category: res
      };
      this.dialog.open(VillaDialogComponent, dialogConfig).afterClosed()
        .subscribe(() => this.loadDatasPage());
    });
  }

  create() {
    this.api.getDataWithPosition('estates/category', 1, 10, 'name,position', '', 'Villa').pipe().subscribe((res: any) => {
      this.dialog.open(VillaDialogComponent, res).afterClosed()
        .subscribe(() => this.loadDatasPage());
    });
  }

  showDetail() {

  }

}
