import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

export class DataSourceService implements DataSource<any> {

  private dataSubject = new BehaviorSubject<any[]>([]);
  private dataCount = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public _dataSubject = this.dataSubject.asObservable();

  constructor(private api: ApiService) { }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.dataCount.complete();
    this.loadingSubject.complete();
  }

  loadDatas(apiName, page, limit, select = '', sort = '') {
    this.loadingSubject.next(true);
    if (page === 0) {
      page = 1;
    } else {
      page = page + 1;
    }
    this.api.getDatas(apiName, page, limit,
      select, sort).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((data: any) => {
        this.dataSubject.next(data);
      });
  }

  loadCounts(apiName, page = 0, limit = 5, select = '', sort = '') {

  }
}
