import { DataSource } from '@angular/cdk/table';
import { Ladang, LadangRestResult } from './ladang';
import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { LadangService } from './ladang.service';

export class LadangDataSource implements DataSource<Ladang>{
    private ladangSubject = new BehaviorSubject<Ladang[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    private countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();

    constructor(private ladangService: LadangService) { }

    loadLadang(filter: string, sortColumn: string, sortDirection: string, pageIndex: number, pageSize: number) {
        this.loadingSubject.next(true);
        this.ladangService.findLadangDT(filter, sortColumn, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((data: LadangRestResult) => {
                this.ladangSubject.next(data.results);
                this.countSubject.next(data.count);
            });
    }

    connect(collectionViewer: CollectionViewer): Observable<Ladang[]> {
        console.log("Connecting data source");
        return this.ladangSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.ladangSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }
}