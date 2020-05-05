import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { DataSourceService } from 'src/app/shared/services/data-source.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BlogDialogComponent } from './detail-dialog/blog-dialog.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crud-blog',
  templateUrl: './crud-blog.component.html',
  styleUrls: ['./crud-blog.component.scss']
})
export class CrudBlogComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['status', 'title', 'description', 'createdAt', 'actions'];
  tbData: DataSourceService;
  dataSource: any;
  category: any;
  count: number;
  private apiName = 'blogs';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private api: ApiService, private route: ActivatedRoute, private dialog: MatDialog, private http: HttpClient) { }

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

    this.api.getDatas('blogs/category', 1, 10, 'name').pipe().subscribe(res => {
      dialogConfig.data = {
        id,
        category: res
      };
      this.dialog.open(BlogDialogComponent, dialogConfig).afterClosed()
        .subscribe(() => this.loadDatasPage());
    });
  }

  create() {
    this.api.getDatas('blogs/category', 1, 10).pipe().subscribe((res: any) => {
      this.dialog.open(BlogDialogComponent, res).afterClosed()
        .subscribe(() => this.loadDatasPage());
    });
  }
}
