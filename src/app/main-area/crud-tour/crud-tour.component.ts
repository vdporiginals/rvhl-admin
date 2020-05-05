import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TourDialogComponent } from './detail-dialog/tour-dialog.component';

@Component({
  selector: 'app-crud-tour',
  templateUrl: './crud-tour.component.html',
  styleUrls: ['./crud-tour.component.scss']
})
export class CrudTourComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['status', 'title', 'description', 'createdAt', 'actions'];
  tbData: DataSourceService;
  dataSource: any;
  count: number;
  private apiName = 'tours';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private api: ApiService, private dialog: MatDialog, private route: ActivatedRoute) {
    console.log(this.route.snapshot);
  }

  ngOnInit() {
    this.tbData = new DataSourceService(this.api);
    this.tbData.loadDatas(this.apiName, 0, 5, 'title,description,status,createdAt,images');
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
      'title,description,status,createdAt,images,category'
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

  update(id) {
    const dialogConfig = new MatDialogConfig();
    this.api.getDatas('tours/category', 1, 10, 'name').pipe().subscribe(res => {
      dialogConfig.data = {
        id,
        category: res
      };
      this.dialog.open(TourDialogComponent, dialogConfig).afterClosed()
        .subscribe(() => this.loadDatasPage());
    });
  }

  create() {
    this.api.getDatas('tours/category', 1, 10).pipe().subscribe((res: any) => {
      this.dialog.open(TourDialogComponent, res).afterClosed()
        .subscribe(() => this.loadDatasPage());
    });
  }

  showDetail() {

  }
}
