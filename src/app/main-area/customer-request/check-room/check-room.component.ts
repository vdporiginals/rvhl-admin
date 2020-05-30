import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/shared/services/api.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-check-room',
  templateUrl: './check-room.component.html',
  styleUrls: ['./check-room.component.scss']
})
export class CheckRoomComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['checkHandle', 'checkInDay', 'checkOutDay', 'roomCategory', 'night', 'peopleNum', 'roomId', 'phone', 'actions'];
  tbData: DataSourceService;
  dataSource: any;
  count: number;
  private apiName = 'estates/check-room';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private api: ApiService, private noti: NotificationService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.tbData = new DataSourceService(this.api);
    this.tbData.loadDatas(this.apiName, 0, 5);
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
      this.paginator.pageSize
    );
  }

  changeCheckHandle(val?, id?) {
    if (val === true) {
      this.api.updateData({ checkHandle: false }, id, this.apiName).pipe(
        tap(() => this.loadDatasPage())
      ).subscribe(res => {
        this.noti.showSuccess('', 'Thay đổi thành công!');

      }, err => {
        this.noti.showError(err, 'Thay đổi thất bại');
      });
    } else {
      this.api.updateData({ checkHandle: true }, id, this.apiName).pipe(
        tap(() => this.loadDatasPage())
      ).subscribe(res => {
        this.noti.showSuccess('', 'Thay đổi thành công!');

      }, err => {
        this.noti.showError(err, 'Thay đổi thất bại');
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

}
