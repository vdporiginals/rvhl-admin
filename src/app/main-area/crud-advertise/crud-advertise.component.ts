import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AdvertiseDialogComponent } from './detail-dialog/advertise-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-crud-advertise',
  templateUrl: './crud-advertise.component.html',
  styleUrls: ['./crud-advertise.component.scss']
})
export class CrudAdvertiseComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['status', 'title', 'description', 'createdAt', 'actions'];
  tbData: DataSourceService;
  dataSource: any;
  count: number;
  private apiName = 'advertises';
  constructor(private api: ApiService, private route: ActivatedRoute, private dialog: MatDialog) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.tbData = new DataSourceService(this.api);
    this.tbData.loadDatas('advertises', 0, 5, 'title,description,status,createdAt');
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
      'title,description,status,createdAt'
    );
  }

  changeStatus(val?, id?) {
    if (val === true) {
      this.api.updateData({ status: false }, id, this.apiName).pipe(
        tap(() => this.loadDatasPage())
      ).subscribe();
    } else {
      this.api.updateData({ status: true }, id, this.apiName).pipe(
        tap(() => this.loadDatasPage())
      ).subscribe();
    }
  }

  delete(id) {
    this.api.deleteData(id, this.apiName).pipe(
      tap(() => this.loadDatasPage())
    ).subscribe();
  }

  update(val: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: val._id,
      title: val.title,
      phone: val.phone,
      address: val.address,
      description: val.description,
      status: val.status,
      image: val.image
    };
    console.log(val);
    this.dialog.open(AdvertiseDialogComponent, dialogConfig).afterClosed()
      .subscribe(() => this.loadDatasPage());
  }

  create() {
    this.api.getDatas('advertises/category', 1, 10).pipe().subscribe((res: any) => {
      this.dialog.open(AdvertiseDialogComponent, res).afterClosed()
        .subscribe(() => this.loadDatasPage());
    });
  }
}
